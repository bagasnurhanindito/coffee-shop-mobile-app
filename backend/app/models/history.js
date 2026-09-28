const mongoose = require('mongoose');

// Define the History schema
const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to Order
  transactionDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash'], required: true },
  status: { type: String, enum: ['completed', 'refunded'], default: 'completed' },
});

module.exports = mongoose.model('History', historySchema);
