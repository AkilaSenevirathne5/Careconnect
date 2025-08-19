const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  profilePhoto: {
    type: String,
    required: false
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  language: {
    type: [String],
    default: []
  },
  qualifications: {
    type: [String],
    default: []
  },
  certifications: {
    type: [String],
    default: []
  },
  experience: {
    type: String,
    required: true
  },
  typeOfCare: {
    type: [String],
    default: []
  },
  availability: {
    type: String,
    required: true
  },
  workingHours: {
    type: String,
    required: true
  },
  daysAvailable: {
    type: [String],
    default: []
  },
  preferredWorkingHours: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  collection: 'caregivers'
});

module.exports = mongoose.model('Caregiver', caregiverSchema); 