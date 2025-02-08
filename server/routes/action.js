const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createAction, getActions, deleteAction, updateAction } = require('../controllers/actionController');

const router = express.Router();

router.use(authMiddleware);

// Rota para criar uma nova ação
router.post('/', authMiddleware, createAction);

// Rota para obter todas as ações do usuário
router.get('/', authMiddleware, getActions);

// Rota para atualizar uma ação existente
router.put('/:id', authMiddleware, updateAction);

// Rota para deletar uma ação
router.delete('/:id', authMiddleware, deleteAction);

module.exports = router;