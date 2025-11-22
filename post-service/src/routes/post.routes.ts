import { Router } from 'express';
import { createPost, getAllPosts, getUserPosts, likePost, deletePostController } from '../controllers/post.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - content
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del post
 *         content:
 *           type: string
 *           description: Contenido del post
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen (opcional)
 *         userId:
 *           type: integer
 *           description: ID del usuario que creó el post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
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
 * /api/posts:
 *   post:
 *     summary: Crear un nuevo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del post
 *               imageUrl:
 *                 type: string
 *                 description: URL de la imagen (opcional)
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error del servidor
 */
router.post('/', authenticateToken, createPost);
router.get('/', getAllPosts);

/**
 * @swagger
 * /api/posts/user/{userId}:
 *   get:
 *     summary: Obtener posts de un usuario específico
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de posts del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error del servidor
 */
router.get('/user/:userId', getUserPosts);

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Dar like a un post
 *     tags: [Likes]
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
router.post('/:postId/like', authenticateToken, likePost);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Eliminar un post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del post a eliminar
 *     responses:
 *       200:
 *         description: Post eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *       404:
 *         description: Post no encontrado o sin permisos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:postId', authenticateToken, deletePostController);

export default router;