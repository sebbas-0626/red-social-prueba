import { Request, Response } from 'express';
import { create, getAll, getUser, deletePost, updatePost, updateLikesCounter } from '../services/post.services';
import { AuthRequest } from '../interfaces/post.interface';

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { content, imageUrl } = req.body;
    const userId = req.userId!;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'El contenido del post es requerido' });
    }

    const post = await create({
      userId,
      content: content.trim(),
      imageUrl: imageUrl || undefined,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
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

export const deletePostController = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.userId!;

    const { message } = await deletePost(Number(postId), userId);

    res.json({ message });
  } catch (error: any) {
    if (error.message === 'Post no encontrado o no tienes permisos para eliminarlo') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error del servidor', error });
    }
  }
};

export const updatePostController = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, imageUrl } = req.body;
    const userId = req.userId!;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'El contenido del post es requerido' });
    }

    const updatedPost = await updatePost(Number(postId), userId, content, imageUrl);

    res.json({
      message: 'Post actualizado exitosamente',
      post: updatedPost
    });
  } catch (error: any) {
    if (error.message === 'Post no encontrado o no tienes permisos para editarlo') {
      res.status(404).json({ message: error.message });
    } else {
      console.error('Error en updatePostController:', error);
      res.status(500).json({ message: 'Error del servidor', error });
    }
  }
};

export const updateLikesCount = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { change } = req.body;

    if (typeof change !== 'number') {
      return res.status(400).json({ message: 'El campo "change" debe ser un número' });
    }

    const result = await updateLikesCounter(Number(postId), change);

    res.json({ 
      message: 'Contador de likes actualizado', 
      postId: Number(postId), 
      likesCount: result.likesCount 
    });
  } catch (error: any) {
    if (error.message === 'Post no encontrado') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error del servidor', error });
    }
  }
};