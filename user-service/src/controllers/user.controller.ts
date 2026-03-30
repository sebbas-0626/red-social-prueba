import { Request, Response } from 'express';
import { getUserProfile, updateUserProfile, getUsers, createUser, getUserByEmail, getUserCredentials } from '../services/user.service';
import { AuthRequest } from '../interfaces/user.interface';
// import { authenticateToken } from '../middlewares/auth'; // Si decides usar autenticación en este controlador, descomenta esta línea y el middleware en las rutas correspondientes
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
// Este endpoint es para uso exclusivo de auth-service, no debe ser expuesto públicamente ni documentado en Swagger para clientes externos
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
// Este endpoint es para uso exclusivo de auth-service, no debe ser expuesto públicamente ni documentado en Swagger para clientes externos
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Internal user creation (desde auth-service; recibe password ya hasheado)
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await createUser({ username, email, password });

    res.status(201).json({
      message: 'Usuario creado en user-service',
      user
    });
  } catch (error: any) {
    if (error.message === 'El usuario ya existe') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes('no permitido')) {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Get user by email (endpoint interno para auth-service)
export const getByEmail = async (req: Request, res: Response) => {
  // recibe email por params, retorna usuario CON password (para que auth-service lo valide)
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

// Endpoint interno seguro para auth-service
export const getAuthCredentials = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const credentials = await getUserCredentials(email);

    res.json(credentials);
  } catch (error: any) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error del servidor' });
  }
};