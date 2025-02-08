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
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api', actionRoutes);
app.use(cors())


const uri = process.env.MONGODB_URI;

async function run() {
  if (!uri) {
    throw new Error('A URI do MongoDB não foi definida. Verifique o arquivo .env.');
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Conectado ao MongoDB');
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('API de Sustentabilidade Online!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

console.log('MongoDB URI:', process.env.MONGODB_URI);