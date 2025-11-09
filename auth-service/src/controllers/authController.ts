import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

// Register function to create a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const result = await registerUser({ username, email, password });

    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === 'El usuario ya existe') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Login function to authenticate users
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.json(result);
  } catch (error: any) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};