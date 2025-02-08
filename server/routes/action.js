const express = require('express');
const auth = require('../middleware/authMiddleware');
const { createAction, getActions, deleteAction, updateAction } = require('../controllers/actionController');

const router = express.Router();
router.post('/', auth, createAction);
router.get('/', auth, getActions);
router.put('/:id', auth, updateAction);
router.delete('/:id', auth, deleteAction);

module.exports = router;