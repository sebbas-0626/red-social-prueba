import { Router } from "express";
import {
    getProfile,
    updateProfile,
    getAllUsers,
    createUserController,
    getByEmail,
    getAuthCredentials,
} from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /users/internal/create:
 *   post:
 *     summary: Crear usuario desde auth-service (interno)
 *     description: Endpoint interno utilizado únicamente por auth-service para crear un usuario (password ya viene hasheado).
 *     tags: [Internal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevo_usuario"
 *               email:
 *                 type: string
 *                 example: "correo@example.com"
 *               password:
 *                 type: string
 *                 example: "$2b$10$hashhasheado"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: El usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/users/internal/auth/user:
 *   post:
 *     summary: Obtener credenciales de usuario (INTERNO - solo auth-service)
 *     tags: [Internal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                  
 *     responses:
 *       200:
 *         description: Credenciales del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
// Este endpoint es para uso exclusivo de auth-service, no debe ser expuesto públicamente ni documentado en Swagger para clientes externos
router.post("/internal/auth/user", getAuthCredentials);

/**
 * @swagger
 * /users/internal/by-email/{email}:
 *   get:
 *     summary: Obtener usuario por email (interno)
     tags: [Internal]
  response:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
     */
router.get("/internal/by-email/:email", getByEmail);

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
router.get("/profile", authenticateToken, getProfile);

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
router.get("/users/all", getAllUsers);

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
router.get("/profile/:id", getProfile);

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
router.put("/profile", authenticateToken, updateProfile);

export default router;
