const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect( process.env.MONGODB_URI)
    .then( () => console.log('Conectado ao MongoDB') )
    .catch( err => console.error('Erro ao conectar ao MongoDB:', err) )


app.get('/', (req, res) => {
    res.send('API de Sustentabilidade Online!');
  });
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});