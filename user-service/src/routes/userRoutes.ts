import { Router } from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/userController';
import { authenticateToken } from '../middlewares/auth';
import { createUser } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *         bio:
 *           type: string
 *           description: Biografía del usuario
 *         avatar:
 *           type: string
 *           description: URL del avatar del usuario
 *         followersCount:
 *           type: integer
 *           description: Número de seguidores
 *         followingCount:
 *           type: integer
 *           description: Número de usuarios que sigue
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la cuenta
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/profile', authenticateToken, getProfile);

/**
 * @swagger
 * /api/users/users/all:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 */
router.get('/users/all', getAllUsers);

/**
 * @swagger
 * /api/users/profile/{id}:
 *   get:
 *     summary: Obtener perfil de un usuario específico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/profile/:id', getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 description: Nueva biografía del usuario
 *               avatar:
 *                 type: string
 *                 description: Nueva URL del avatar
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/profile', authenticateToken, updateProfile);

router.post('/', createUser);

export default router;