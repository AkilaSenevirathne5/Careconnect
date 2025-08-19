const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'caregiver', 'client', 'volunteer'], default: 'client' },
  approved: { type: Boolean, default: false }, // Tracks 6-month course certificate approval
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);