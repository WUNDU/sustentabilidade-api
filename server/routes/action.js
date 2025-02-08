const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createAction, getActions, deleteAction, updateAction } = require('../controllers/actionController');

const router = express.Router();

router.use(authMiddleware);

router.post('/actions', createAction);
router.get('/actions', getActions);
router.delete('/actions',deleteAction);
router.put('/actions',updateAction)

module.exports = router;