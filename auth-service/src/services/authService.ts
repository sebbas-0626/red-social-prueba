import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { RegisterData, LoginData, AuthResponse } from '../types/auth.types';

// Register a new user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const { username, email, password } = data;

    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
    );

    return {
        message: 'Usuario registrado exitosamente',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
};

// Login user
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
    }

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
};
