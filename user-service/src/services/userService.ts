import { User } from '../models/User';
import { UpdateProfileData, CreateUserData } from '../types/user.types';

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
    });

    return user;
};
