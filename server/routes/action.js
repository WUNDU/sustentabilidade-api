const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createAction, getActions, deleteAction, updateAction } = require('../controllers/actionController');

const router = express.Router();

router.post('/', authMiddleware, createAction);

router.get('/', authMiddleware, getActions);

router.put('/:id', authMiddleware, updateAction);

router.delete('/:id', authMiddleware, deleteAction);


module.exports = router;