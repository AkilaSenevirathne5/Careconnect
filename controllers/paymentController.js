const Payment = require('../models/payment');

// Create new payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment({
      ...req.body,
      userId: req.user.userId // From auth middleware
    });
    await payment.save();
    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true
      }
    );
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 