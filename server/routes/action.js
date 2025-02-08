const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createAction, getActions } = require('../controllers/actionController');

const router = express.Router();

router.use(authMiddleware);

router.post('/actions', createAction);
router.get('/actions', getActions);

module.exports = router;