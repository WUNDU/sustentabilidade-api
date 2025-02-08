const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Reciclagem', 'Energia', 'Água', 'Mobilidade'], required: true },
  points: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Action', actionSchema);