import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { Like } from '../models/Like';
import { create, getAll, getUser, like } from '../services/postServices';

interface AuthRequest extends Request {
  userId?: number;
}

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { content, imageUrl } = req.body;
    const userId = req.userId!;

    const post = await create({
      userId,
      content,
      imageUrl,
    } as Post);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const posts = await getUser(Number(userId));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.userId!;

    const {message} = await like(Number(userId), Number(postId));

    res.json({ message: message });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};