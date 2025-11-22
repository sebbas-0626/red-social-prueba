import { Router } from 'express';
import { likePost, getPostLikes, checkLike } from '../controllers/interaction.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - userId
 *         - postId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del like
 *         userId:
 *           type: integer
 *           description: ID del usuario que dio like
 *         postId:
 *           type: integer
 *           description: ID del post que recibió like
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del like
 */

/**
 * @swagger
 * /api/interactions/posts/{postId}/like:
 *   post:
 *     summary: Dar o quitar like a un post
 *     tags: [Interactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Like procesado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/posts/:postId/like', authenticateToken, likePost);

/**
 * @swagger
 * /api/interactions/posts/{postId}/likes:
 *   get:
 *     summary: Obtener todos los likes de un post
 *     tags: [Interactions]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Lista de likes del post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: integer
 *                 count:
 *                   type: integer
 *                 likes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Like'
 *       500:
 *         description: Error del servidor
 */
router.get('/posts/:postId/likes', getPostLikes);

/**
 * @swagger
 * /api/interactions/posts/{postId}/check-like:
 *   get:
 *     summary: Verificar si el usuario actual dio like al post
 *     tags: [Interactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Estado del like
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasLiked:
 *                   type: boolean
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/posts/:postId/check-like', authenticateToken, checkLike);

export default router;
