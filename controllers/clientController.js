const Client = require('../models/client');

// Create new client
exports.createClient = async (req, res) => {
  try {
    const client = new Client({
      ...req.body,
      userId: req.user.userId // From auth middleware
    });
    await client.save();
    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }
    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }
    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
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