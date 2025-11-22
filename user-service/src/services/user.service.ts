import { User } from '../models/user.model';
import { UpdateProfileData, CreateUserData, RegisterData } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';

// Get user profile by ID
export const getUserProfile = async (userId: number) => {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'username', 'email', 'bio', 'avatar', 'followersCount', 'followingCount', 'createdAt']
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user;
};

// Update user profile
export const updateUserProfile = async (userId: number, data: UpdateProfileData) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    await user.update(data);

    const updatedUser = await User.findByPk(userId, {
        attributes: ['id', 'username', 'email', 'bio', 'avatar', 'followersCount', 'followingCount']
    });

    return updatedUser;
};

// Get all users
export const getUsers = async () => {
    return await User.findAll({
        attributes: ['id', 'username', 'bio', 'avatar', 'followersCount', 'followingCount'],
        limit: 20
    });
};

// Create user in user-service (called from auth-service)
export const createUserInService = async (data: CreateUserData) => {
    const { userId, username, email } = data;

    const existingUser = await User.findByPk(userId);

    if (existingUser) {
        throw new Error('El usuario ya existe en user-service');
    }

    const user = await User.create({
        id: userId,
        username,
        email,
        password: '', // Password vacío para usuarios creados desde auth-service (legacy)
    });

    return user;
};

// Register new user with password (endpoint público)
export const registerUser = async (data: RegisterData) => {
    const { username, email, password } = data;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Retornar sin password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
};

// Get user by email (para auth-service)
export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user;
};
