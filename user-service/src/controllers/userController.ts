import { Request, Response } from 'express';
import { User } from '../models/User';

interface AuthRequest extends Request {
  userId?: number;
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id || req.userId;
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'bio', 'avatar', 'followersCount', 'followingCount', 'createdAt']
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { bio, avatar } = req.body;

    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.update({ bio, avatar });

    const updatedUser = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'bio', 'avatar', 'followersCount', 'followingCount']
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'bio', 'avatar', 'followersCount', 'followingCount'],
      limit: 20
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Create user in user-service 
export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId, username, email } = req.body;

    const existingUser = await User.findByPk(userId);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe en user-service' });
    }

    const user = await User.create({
      id: userId,
      username,
      email,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en user-service al crear el usuario' });
  }
};