const User = require('../models/User')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const user = new User( {username, email, password} )
        await user.save()

        res.status(201).json( 
            { message: 'Usuário registrado com sucesso!' }
        )

    } catch ( err ) {
        res.status(400)
            .json( { error: err.message} )
    }
}

const login = async (req, res) => {
    const { username, password } = req.body

    try {

        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Credenciais inválidas' });
        }

        const token = JWT.sign( { userId: user._id}, 
            process.env.JWT_SECRET, { expiresIn: '1h' }
        )
        
        res.json({ token })
    } catch (err) {
        res.status(400)
            .json( { error: err.message } )
    }
}

const listUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclui o campo `password` na resposta
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
}

module.exports = { register, login, listUsers }