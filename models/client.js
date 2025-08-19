const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  typeOfCare: {
    type: String,
    required: true
  },
  helpTiming: {
    type: String,
    required: true
  },
  hoursPerWeek: {
    type: String,
    required: true
  },
  durationOfHelp: {
    type: String,
    required: true
  },
  allergies: {
    type: String,
    default: ''
  },
  medicalConditions: {
    type: String,
    default: ''
  },
  careSchedule: {
    type: String,
    required: true
  },
  preferredCaregiverGender: {
    type: String,
    required: true
  },
  preferredCaregiverLanguage: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'clients'
});

module.exports = mongoose.model('Client', clientSchema); 