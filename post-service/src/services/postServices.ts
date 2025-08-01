import { Post, PostAttributes } from '../models/Post';
import { Like } from '../models/Like';
import { Op } from 'sequelize';
import { PostInterface } from '../types/post.model';

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

export const like = async (userId: number, postId: number) => {
  const existingLike = await Like.findOne({
    where: { userId, postId }
  });

  if (existingLike) {
    await existingLike.destroy();
    await Post.decrement('likesCount', { where: { id: postId } });
    return { message: 'Like removido exitosamente' };
  }

  await Like.create({ userId, postId: Number(postId) });
  await Post.increment('likesCount', { where: { id: postId } });
  return { message: 'Like agregado exitosamente' };
};