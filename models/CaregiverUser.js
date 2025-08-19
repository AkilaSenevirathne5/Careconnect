const mongoose = require('mongoose');

const caregiverUserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true  // Add unique directly in schema
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  healthCondition: { 
    type: String, 
    required: true 
  },
  selectedPackage: { 
    type: String 
  }
}, { collection: 'caregiverusers' });

// Create index after schema definition
caregiverUserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('CaregiverUser', caregiverUserSchema);