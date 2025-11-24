import { Post } from '../models/Post';
import { PostInterface } from '../interfaces/post.interface';

export const create = async (data: PostInterface) => {
  return await Post.create(data);
};

export const getAll = async () => {
  return await Post.findAll({
    order: [['createdAt', 'DESC']],
    limit: 50,
  });
};

export const getUser = async (userId: number) => {
  return await Post.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
};

export const updateLikesCount = async (postId: number, change: number) => {
  if (change > 0) {
    await Post.increment('likesCount', { where: { id: postId } });
  } else {
    await Post.decrement('likesCount', { where: { id: postId } });
  }
};

export const deletePost = async (postId: number, userId: number) => {
  const post = await Post.findOne({ where: { id: postId, userId } });

  if (!post) {
    throw new Error('Post no encontrado o no tienes permisos para eliminarlo');
  }

  await post.destroy();

  return { message: 'Post eliminado exitosamente' };
};