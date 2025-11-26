import { Post } from '../models/Post';
import { PostInterface } from '../interfaces/post.interface';

// Crea un nuevo post
export const create = async (data: PostInterface) => {
  return await Post.create(data);
};
// Obtiene todos los posts, ordenados por fecha de creación descendente, limitando a 50
export const getAll = async () => {
  return await Post.findAll({
    order: [['createdAt', 'DESC']],
    limit: 50,
  });
};
// Obtiene todos los posts de un usuario específico, ordenados por fecha de creación descendente
export const getUser = async (userId: number) => {
  return await Post.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
};
// Elimina un post por su ID y el ID del usuario (para asegurar que solo el dueño pueda eliminarlo)
export const deletePost = async (postId: number, userId: number) => {
  const post = await Post.findOne({ where: { id: postId, userId } });

  if (!post) {
    throw new Error('Post no encontrado o no tienes permisos para eliminarlo');
  }

  await post.destroy();

  return { message: 'Post eliminado exitosamente' };
};

// Actualiza el contenido de un post (solo el dueño puede hacerlo)
export const updatePost = async (postId: number, userId: number, content: string, imageUrl?: string) => {
  const post = await Post.findOne({ where: { id: postId, userId } });

  if (!post) {
    throw new Error('Post no encontrado o no tienes permisos para editarlo');
  }

  await post.update({
    content: content.trim(),
    imageUrl: imageUrl || post.imageUrl
  });

  return post;
};

// Actualiza el contador de likes de un post
export const updateLikesCounter = async (postId: number, change: number) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    throw new Error('Post no encontrado');
  }

  const currentLikes = post.likesCount || 0;
  const newLikesCount = Math.max(0, currentLikes + change);

  await post.update({ likesCount: newLikesCount });

  return { likesCount: newLikesCount };
};
