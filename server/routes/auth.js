const express = require('express')
const { register, login, listUsers, signOut} = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gerenciamento de autenticação de usuários
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro ao registrar usuário
 */
router.post('/register', register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login e obter token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Credenciais inválidas
 */
router.post('/login', login)

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 */
router.get('/users', authMiddleware, listUsers);


/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign out user
 *     description: Logs out the authenticated user by instructing the client to remove the token or invalidating it if necessary.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: Sign-out successful, token invalidated
 *         content:
 *           application/json:
 *             example:
 *               msg: "Signed out successfully, please remove your token."
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error during sign-out
 */
router.post('/signout', authMiddleware, signOut);

module.exports = router;