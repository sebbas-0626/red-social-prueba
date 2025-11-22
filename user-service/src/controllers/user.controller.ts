import { Request, Response } from 'express';
import { getUserProfile, updateUserProfile, getUsers, createUserInService, registerUser, getUserByEmail } from '../services/user.service';
import { AuthRequest } from '../interfaces/user.interface';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id || req.userId;
    
    const user = await getUserProfile(Number(userId));

    res.json(user);
  } catch (error: any) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { bio, avatar } = req.body;

    const updatedUser = await updateUserProfile(userId, { bio, avatar });

    res.json(updatedUser);
  } catch (error: any) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Create user in user-service 
export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId, username, email } = req.body;

    const user = await createUserInService({ userId, username, email });

    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === 'El usuario ya existe en user-service') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error en user-service al crear el usuario', error });
  }
};

// Register new user (endpoint público)
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser({ username, email, password });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user
    });
  } catch (error: any) {
    if (error.message === 'El usuario ya existe') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Get user by email (endpoint interno para auth-service)
export const getByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const user = await getUserByEmail(email);

    // Retornar usuario CON password (para que auth-service lo valide)
    res.json(user);
  } catch (error: any) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};