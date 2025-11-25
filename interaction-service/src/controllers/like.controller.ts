import { Response } from 'express';
import { toggleLike, getLikesByPost, checkUserLike, updatePostLikesCount, deleteLikesByPost } from '../services/like.service';
import { AuthRequest } from '../interfaces/like.interface';

// Controlador para dar like o quitar like a un post
export const likePost = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.userId!;

        const result = await toggleLike(Number(userId), Number(postId));

        // Actualizar el contador de likes en el servicio de posts
        try {
            await updatePostLikesCount(Number(postId), result.likesChange);
        } catch (error) {
            console.error('Error al actualizar contador de likes:', error);
            // No fallar la operación si solo falla la actualización del contador
        }

        res.json({ message: result.message });
    } catch (error) {
        console.error('Error en likePost:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Controlador para obtener todos los likes de un post
export const getPostLikes = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const likes = await getLikesByPost(Number(postId));

        res.json({
            postId: Number(postId),
            count: likes.length,
            likes
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Controlador para verificar si el usuario actual dio like al post
export const checkLike = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.userId!;

        const hasLiked = await checkUserLike(Number(userId), Number(postId));

        res.json({ hasLiked });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Controlador para eliminar todos los likes de un post (usado cuando se elimina el post)
export const deletePostLikes = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;

        await deleteLikesByPost(Number(postId));

        res.json({ message: 'Likes del post eliminados exitosamente' });
    } catch (error) {
        console.error('Error en deletePostLikes:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};
