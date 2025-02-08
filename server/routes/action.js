const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createAction, getActions, deleteAction, updateAction, getActionById } = require('../controllers/ActionController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ações Sustentáveis
 *   description: Gerenciamento de ações sustentáveis
 */

/**
 * @swagger
 * /api/actions:
 *   post:
 *     summary: Criar uma nova ação sustentável
 *     tags: [Ações Sustentáveis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Reciclagem, Energia, Água, Mobilidade]
 *               points:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ação criada com sucesso
 *       400:
 *         description: Erro ao criar ação
 */
router.post('/', authMiddleware, createAction);

/**
 * @swagger
 * /api/actions:
 *   get:
 *     summary: Lista todas as ações
 *     tags: [Ações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Action'
 */
router.get('/', authMiddleware, getActions);

router.get('/:id', authMiddleware, getActionById);

/**
 * @swagger
 * /api/auth/{id}:
 *   put:
 *     summary: Atualiza uma ação existente
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da ação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               points:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ação atualizada com sucesso
 */
router.put('/:id', authMiddleware, updateAction);

/**
 * @swagger
 * /api/auth/{id}:
 *   delete:
 *     summary: Deleta uma ação existente
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da ação
 *     responses:
 *       200:
 *         description: Ação deletada com sucesso
 */
router.delete('/:id', authMiddleware, deleteAction);

module.exports = router;