import { User } from '../models/user.model';
import { UpdateProfileData, RegisterData } from '../interfaces/user.interface';

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

// Crear usuario (utilizado desde auth-service, recibe password ya hasheado)
export const createUser = async (data: RegisterData) => {
    const { username, email, password } = data;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    // Crear usuario con password (supuesto ya hasheado por auth-service)
    const user = await User.create({
        username,
        email,
        password,
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

// Endpoint interno seguro para auth-service
export const getUserCredentials = async (email: string) => {
    const user = await User.findOne({
        where: { email },
        attributes: ['id', 'username', 'email', 'password']
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        passwordHash: user.password
    };
};
