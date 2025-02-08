const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Suporta "Bearer <token>"

    if ( !token ) {
        return res.status(401)
            .json( {error: 'Acesso negado. Token não fornecido.'} )
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId;
        next();
        
    } catch (err) {
        res.status(400)
            .json( {error: 'Token inválido.'} )
    }
}

module.exports = authMiddleware;