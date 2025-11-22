import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginData, AuthResponse } from '../interfaces/auth.interface';
import axios from 'axios';

// Detecta automáticamente si está en Docker o desarrollo local
const isDocker = process.env.NODE_ENV === 'production' || process.env.DOCKER === 'true';
const USER_SERVICE_URL = isDocker
    ? process.env.USER_SERVICE_URL || 'http://user-service:3002'  // Para Docker
    : process.env.USER_SERVICE_URL || 'http://localhost:3002';    // Para desarrollo local

console.log(`🔗 User Service URL configurada: ${USER_SERVICE_URL} (${isDocker ? 'Docker' : 'Local'})`);

// Login user - Consulta user-service
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const { email, password } = data;

    try {
        // Consultar user-service para obtener usuario por email
        const response = await axios.get(`${USER_SERVICE_URL}/api/users/by-email/${email}`, {
            timeout: 5000,
        });

        const user = response.data;

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // Validar password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Credenciales inválidas');
        }

        // Generar JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        return {
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        };
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error('Credenciales inválidas');
        }
        
        if (error.code === 'ECONNREFUSED') {
            console.error('❌ No se pudo conectar con user-service');
            throw new Error('Servicio temporalmente no disponible');
        }

        throw error;
    }
};
