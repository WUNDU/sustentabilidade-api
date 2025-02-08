const express = require('express')
const { register, login, listUsers} = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register)
router.post('/login', login)

router.get('/users', authMiddleware, listUsers);

module.exports = router;