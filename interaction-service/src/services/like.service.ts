import { Like } from '../models/Like';
import axios from 'axios';

// URL del servicio de posts
const POST_SERVICE_URL = process.env.POST_SERVICE_URL || process.env.POST_SERVICE_URL_P;

export const toggleLike = async (userId: number, postId: number) => {
    const existingLike = await Like.findOne({
        where: { userId, postId }
    });

    if (existingLike) {
        await existingLike.destroy();
        return {
            message: 'Like removido exitosamente',
            action: 'removed',
            likesChange: -1
        };
    }

    await Like.create({ userId, postId: Number(postId) });
    return {
        message: 'Like agregado exitosamente',
        action: 'added',
        likesChange: 1
    };
};

export const getLikesByPost = async (postId: number) => {
    return await Like.findAll({
        where: { postId }
    });
};

export const getLikesByUser = async (userId: number) => {
    return await Like.findAll({
        where: { userId }
    });
};

export const checkUserLike = async (userId: number, postId: number) => {
    const like = await Like.findOne({
        where: { userId, postId }
    });
    return !!like;
};

export const deleteLikesByPost = async (postId: number) => {
    await Like.destroy({ where: { postId } });
};

// Función para actualizar el contador de likes en el servicio de posts
export const updatePostLikesCount = async (postId: number, change: number) => {
    try {
        const updateUrl = `${POST_SERVICE_URL}/api/posts/${postId}/likes-count`;
        await axios.patch(updateUrl, { change });
    } catch (error: any) {
        console.error('Error al actualizar contador de likes:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
};
