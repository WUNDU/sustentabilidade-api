const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createAction, getActions, deleteAction, updateAction } = require('../controllers/actionController');

router.post('/', auth, createAction);
router.get('/', auth, getActions);
router.put('/:id', auth, updateAction);
router.delete('/:id', auth, deleteAction);

module.exports = router;