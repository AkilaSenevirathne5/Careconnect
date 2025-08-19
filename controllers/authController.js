const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { username, name, email, password, role } = req.body;

    // Validate required fields
    if (!username || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      name,
      email,
      password: hashedPassword,
      role: role || 'client'
    });

    // Save user to database
    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser);

    // Create token
    const token = jwt.sign(
      { userId: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return success response
    res.status(201).json({
      success: true,
      id: savedUser._id,
      username: savedUser.username,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 