import { Request, Response } from 'express';
import { loginUser } from '../services/auth.service';

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
    if (error.message === 'Servicio temporalmente no disponible') {
      return res.status(503).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};