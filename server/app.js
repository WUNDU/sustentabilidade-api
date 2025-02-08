const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/auth');
const actionRoutes = require('./routes/action');
const swaggerConfig = require('./swagger/swagger');
const connectToDatabase = require('./config/db')

dotenv.config()

const app = express()

swaggerConfig(app);
app.use(cors())
app.use(express.json())

swaggerConfig(app)

app.use('/api/auth', authRoutes);
app.use('/api/actions', actionRoutes);

connectToDatabase();

app.get('/', (req, res) => {
  res.send('API de Sustentabilidade Online!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

console.log('MongoDB URI:', process.env.MONGODB_URI);