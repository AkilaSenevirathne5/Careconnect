const Caregiver = require('../models/caregiver');

// Create new caregiver
exports.createCaregiver = async (req, res) => {
  try {
    const caregiver = new Caregiver({
      ...req.body,
      userId: req.user.userId // From auth middleware
    });
    await caregiver.save();
    res.status(201).json({
      success: true,
      data: caregiver
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all caregivers
exports.getAllCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find();
    res.status(200).json({
      success: true,
      count: caregivers.length,
      data: caregivers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get caregiver by ID
exports.getCaregiverById = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);
    if (!caregiver) {
      return res.status(404).json({
        success: false,
        error: 'Caregiver not found'
      });
    }
    res.status(200).json({
      success: true,
      data: caregiver
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update caregiver
exports.updateCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!caregiver) {
      return res.status(404).json({
        success: false,
        error: 'Caregiver not found'
      });
    }
    res.status(200).json({
      success: true,
      data: caregiver
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete caregiver
exports.deleteCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findByIdAndDelete(req.params.id);
    if (!caregiver) {
      return res.status(404).json({
        success: false,
        error: 'Caregiver not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 