const Insurance = require('../models/insurance');

// Create new insurance
exports.createInsurance = async (req, res) => {
  try {
    const insurance = new Insurance({
      ...req.body,
      userId: req.user.userId // From auth middleware
    });
    await insurance.save();
    res.status(201).json({
      success: true,
      data: insurance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all insurance policies
exports.getAllInsurance = async (req, res) => {
  try {
    const insurance = await Insurance.find();
    res.status(200).json({
      success: true,
      count: insurance.length,
      data: insurance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get insurance by ID
exports.getInsuranceById = async (req, res) => {
  try {
    const insurance = await Insurance.findById(req.params.id);
    if (!insurance) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy not found'
      });
    }
    res.status(200).json({
      success: true,
      data: insurance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update insurance
exports.updateInsurance = async (req, res) => {
  try {
    const insurance = await Insurance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!insurance) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy not found'
      });
    }
    res.status(200).json({
      success: true,
      data: insurance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Upload insurance document
exports.uploadDocument = async (req, res) => {
  try {
    const insurance = await Insurance.findById(req.params.id);
    if (!insurance) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy not found'
      });
    }

    insurance.documents.push({
      name: req.file.originalname,
      url: req.file.path,
      uploadedAt: new Date()
    });

    await insurance.save();
    res.status(200).json({
      success: true,
      data: insurance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 