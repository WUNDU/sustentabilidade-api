const User = require('../models/User')
const JWT = require('jsonwebtoken')

const register = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = new User( { email, password} )
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
    const { email, password } = req.body

    try {

        const user = await User.findOne( ( email ) )

        if ( user || !(await bcrypt.compare(password, user.password)) ) {
            return res.status(400)
                .json( { error: 'Credenciais inválidas' } )
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

module.exports = { register, login }