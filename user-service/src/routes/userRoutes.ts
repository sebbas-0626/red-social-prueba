import { Router } from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/userController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/profile', authenticateToken, getProfile);
// router.get('/all', getAllUsers);
router.get('/users/all', getAllUsers);
router.get('/profile/:id', getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;