import { Request, Response } from 'express';
import { loginUser, refreshAccessToken, logoutUser, revokeAllUserTokens, registerUser } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser({ username, email, password });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user,
    });
  } catch (error: any) {
    if (error.message === 'El usuario ya existe') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Servicio temporalmente no disponible') {
      return res.status(503).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const device = req.headers['user-agent'];
    const ipAddress = req.ip || req.socket.remoteAddress;

    const result = await loginUser({ email, password }, device, ipAddress);

    res.json(result);
  } catch (error: any) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ message: error.message });
    }
    if (error.message === 'Servicio temporalmente no disponible') {
      return res.status(503).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const result = await refreshAccessToken({ refreshToken });

    res.json(result);
  } catch (error: any) {
    if (error.message === 'Refresh token inválido' || error.message === 'Refresh token expirado') {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    await logoutUser({ refreshToken });

    res.json({ message: 'Sesión cerrada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const revokeAll = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    await revokeAllUserTokens(userId);

    res.json({ message: 'Todas las sesiones han sido revocadas' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Valida que el accessToken sea correcto — útil para el gateway y otros microservicios
export const validate = (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  return res.json({
    message: 'Token válido',
    userId,
  });
};