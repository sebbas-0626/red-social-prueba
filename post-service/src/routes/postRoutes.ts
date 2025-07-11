import { Router } from 'express';
import { createPost, getAllPosts, getUserPosts, likePost } from '../controllers/postController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/', authenticateToken, createPost);
router.get('/', getAllPosts);
router.get('/user/:userId', getUserPosts);
router.post('/:postId/like', authenticateToken, likePost);

export default router;