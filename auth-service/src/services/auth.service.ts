import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    LoginData,
    AuthResponse,
    UserCredentials,
    RefreshTokenData,
    RefreshTokenResponse,
    LogoutData,
} from "../interfaces/auth.interface";
import axios from "axios";
import { RefreshToken } from "../models/refresh-token.model";
import { TokenBlacklist } from "../models/token-blacklist.model";
import crypto from "crypto";

const isDocker =
    process.env.NODE_ENV === "production" || process.env.DOCKER === "true";
const USER_SERVICE_URL = isDocker
    ? process.env.USER_SERVICE_URL || "http://user-service:3002"
    : process.env.USER_SERVICE_URL || "http://localhost:3002";

console.log(
    `🔗 User Service URL: ${USER_SERVICE_URL} (${isDocker ? "Docker" : "Local"})`
);
// 
const generateAccessToken = (userId: number, email: string): string => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" } // Access token corto
    );
};
// 
const generateRefreshToken = (): string => {
    return crypto.randomBytes(64).toString('hex');
};
// 
export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterData) => {
    const { username, email, password } = data;

    // Verificar si el usuario ya existe
    try {
        await axios.get(`${USER_SERVICE_URL}/api/users/internal/by-email/${encodeURIComponent(email)}`, { timeout: 5000 });
        throw new Error('El usuario ya existe');
    } catch (error: any) {
        if (error.response?.status !== 404) {
            if (error.message === 'El usuario ya existe') {
                throw error;
            }
            // Si no es 404, hay otro problema con user-service.
            console.error('❌ Error verificando usuario en user-service:', error.message);
            throw new Error('Servicio temporalmente no disponible');
        }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createResponse = await axios.post(
        `${USER_SERVICE_URL}/api/users/internal/create`,
        { username, email, password: passwordHash },
        { timeout: 5000 }
    );

    return createResponse.data.user;
};

export const loginUser = async (data: LoginData, device?: string, ipAddress?: string): Promise<AuthResponse> => {
    const { email, password } = data;

    try {
        // Solicitud interna segura al user-service
        const response = await axios.post<UserCredentials>(
            `${USER_SERVICE_URL}/api/users/internal/auth/user`,
            { email },
            { timeout: 5000 }
        );
        // Si el user-service responde con éxito, validamos la contraseña
        const { id, username, email: userEmail, passwordHash } = response.data;

        // Validar password
        const isValidPassword = await bcrypt.compare(password, passwordHash);

        if (!isValidPassword) {
            throw new Error("Credenciales inválidas");
        }

        // Generar tokens
        const accessToken = generateAccessToken(id, userEmail);
        const refreshToken = generateRefreshToken();

        // Guardar refresh token en BD
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 días

        await RefreshToken.create({
            userId: id,
            token: refreshToken,
            expiresAt,
            revoked: false,
            device,
            ipAddress,
        });

        return {
            message: "Inicio de sesión exitoso",
            accessToken,
            refreshToken,
            user: { id, username, email: userEmail },
        };
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error("Credenciales inválidas");
        }
        if (error.code === "ECONNREFUSED") {
            console.error("❌ No se pudo conectar con user-service");
            throw new Error("Servicio temporalmente no disponible");
        }
        throw error;
    }
};

export const refreshAccessToken = async (data: RefreshTokenData): Promise<RefreshTokenResponse> => {
    const { refreshToken } = data;

    // Buscar refresh token en BD
    const tokenRecord = await RefreshToken.findOne({
        where: { token: refreshToken, revoked: false },
    });

    if (!tokenRecord) {
        throw new Error("Refresh token inválido");
    }

    // Verificar si expiró
    if (new Date() > tokenRecord.expiresAt) {
        throw new Error("Refresh token expirado");
    }

    // Obtener datos del usuario desde user-service
    const response = await axios.get(
        `${USER_SERVICE_URL}/api/users/profile/${tokenRecord.userId}`
    );

    const user = response.data;

    // Generar nuevo access token
    const accessToken = generateAccessToken(user.id, user.email);

    // Generar nuevo refresh token (rotación)
    const newRefreshToken = generateRefreshToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Revocar el anterior
    await tokenRecord.update({ revoked: true });

    // Crear nuevo refresh token
    await RefreshToken.create({
        userId: tokenRecord.userId,
        token: newRefreshToken,
        expiresAt,
        revoked: false,
        device: tokenRecord.device,
        ipAddress: tokenRecord.ipAddress,
    });

    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
};
// Nota: En este ejemplo, el refresh token es un string aleatorio almacenado en la base de datos. No es un JWT, por lo que no se puede decodificar para obtener información. Esto mejora la seguridad, ya que el token no contiene datos sensibles y solo se valida su existencia y estado en la base de datos.
export const logoutUser = async (data: LogoutData): Promise<void> => {
    const { refreshToken } = data;

    // Revocar refresh token
    const tokenRecord = await RefreshToken.findOne({
        where: { token: refreshToken },
    });

    if (tokenRecord) {
        await tokenRecord.update({ revoked: true });
    }
};
// Al cerrar sesión, revocamos el refresh token para que no pueda ser utilizado nuevamente. Esto no afecta al access token, que seguirá siendo válido hasta su expiración (15 minutos). Sin embargo, como el refresh token ya no se puede usar para obtener nuevos access tokens, el usuario tendrá que iniciar sesión nuevamente después de que expire el access token actual.
export const revokeAllUserTokens = async (userId: number): Promise<void> => {
    // Revocar todos los refresh tokens del usuario
    await RefreshToken.update(
        { revoked: true },
        { where: { userId, revoked: false } }
    );
};
// Esta función puede ser útil en casos como cambio de contraseña o sospecha de compromiso de cuenta, donde queremos invalidar todos los tokens activos del usuario para forzar un nuevo inicio de sesión.
export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    const blacklisted = await TokenBlacklist.findOne({
        where: { token },
    });

    return !!blacklisted;
};
// 
export const addTokenToBlacklist = async (token: string, userId: number, reason?: string): Promise<void> => {
    // Decodificar token para obtener expiración
    const decoded: any = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);

    await TokenBlacklist.create({
        token,
        userId,
        reason,
        expiresAt,
    });
};
