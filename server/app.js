const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/auth');
const actionRoutes = require('./routes/action');
const swaggerConfig = require('./swagger/swagger');

dotenv.config()

const app = express()

swaggerConfig(app);
app.use('/api/auth', authRoutes);
app.use('/api', actionRoutes);
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log('Conectado ao MongoDB') )
    .catch( err => console.error('Erro ao conectar ao MongoDB:', err) )


app.get('/', (req, res) => {
    res.send('API de Sustentabilidade Online!');
  });
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});