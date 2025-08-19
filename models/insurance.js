const mongoose = require('mongoose');

// Check if model already exists before defining it
let Payment;
try {
  Payment = mongoose.model('Payment');
} catch {
  const paymentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['credit_card', 'debit_card', 'bank_transfer']
    },
    cardNumber: {
      type: String,
      required: true
    },
    cardHolderName: {
      type: String,
      required: true
    },
    expiryDate: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  Payment = mongoose.model('Payment', paymentSchema);
}

module.exports = Payment;