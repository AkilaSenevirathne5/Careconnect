const CaregiverUser = require('../models/CaregiverUser');
const CarePackage = require('../models/CarePackage');

// Create a new user
// In userController.js
exports.createUser = async (req, res) => {
  try {
    // Validate required fields
    const { fullName, dateOfBirth, email, phoneNumber, healthCondition } = req.body;
    if (!fullName || !dateOfBirth || !email || !phoneNumber || !healthCondition) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate email
    const existingUser = await CaregiverUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new CaregiverUser(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await CaregiverUser.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await CaregiverUser.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await CaregiverUser.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await CaregiverUser.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Package controllers
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await CarePackage.find();
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPackageByName = async (req, res) => {
  try {
    const pkg = await CarePackage.findOne({ name: req.params.name });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const pkg = new CarePackage(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await CarePackage.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(updatedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await CarePackage.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Server error' });
  }
};