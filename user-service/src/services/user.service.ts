import { User } from '../models/user.model';
import { UpdateProfileData, RegisterData } from '../interfaces/user.interface';
import { Op } from 'sequelize';
import { AppError } from '../utils/AppError';

// Perfil público
export const getUserProfile = async (userId: number) => {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'username', 'bio', 'avatar', 'createdAt']
    });

    if (!user) throw new AppError(404, 'Usuario no encontrado');

    return user;
};

// Perfil del usuario autenticado
export const getOwnProfile = async (userId: number) => {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'username', 'email', 'bio', 'avatar', 'createdAt']
    });

    if (!user) throw new AppError(404, 'Usuario no encontrado');

    return user;
};

export const updateUserProfile = async (userId: number, data: UpdateProfileData) => {
    const user = await User.findByPk(userId);

    if (!user) throw new AppError(404, 'Usuario no encontrado');

    const updated = await user.update(data);

    return updated;
};

// Listado de usuarios
export const getUsers = async (limit = 20, offset = 0) => {
    return User.findAll({
        attributes: ['id', 'username', 'bio', 'avatar'],
        limit,
        offset
    });
};

// Crear usuario (solo llamado desde auth-service)
export const createUser = async (data: RegisterData) => {
    const { username, email, password: hashedPassword } = data;

    const existing = await User.findOne({
        where: { [Op.or]: [{ email }, { username }] }
    });

    if (existing) throw new AppError(400, 'Usuario ya existe');

    const user = await User.create({ username, email, password: hashedPassword });

    const { password: _, ...clean } = user.toJSON();
    return clean;
};

// Busqueda interna por email (solo auth-service)
export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new AppError(404, 'Usuario no encontrado');

    return user;
};

// Solo auth-service necesita el hash de la contraseña para autenticación
export const getUserCredentials = async (email: string) => {
    const user = await User.findOne({
        where: { email },
        attributes: ['id', 'username', 'email', 'password']
    });

    if (!user) throw new AppError(404, 'Usuario no encontrado');

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        passwordHash: user.password
    };
};