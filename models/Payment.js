const mongoose = require('mongoose');

// Check if the model already exists before defining it
let Payment;
try {
  Payment = mongoose.model('Payment');
} catch {
  const paymentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    cardNumber: {
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
    address: {
      type: String,
      required: true
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true
    },
    refundStatus: {
      type: Boolean,
      default: false
    },
    refundReason: {
      type: String,
      default: ''
    },
    refundDate: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  Payment = mongoose.model('Payment', paymentSchema);
}

module.exports = Payment;