const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  categoria: { type: String, enum: ['Reciclagem', 'Energia', 'Água', 'Mobilidade'], required: true },
  pontos: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Action', ActionSchema);
