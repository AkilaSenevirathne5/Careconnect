const mongoose = require('mongoose');

const carePackageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  features: [String]
}, { collection: 'carepackage' });

module.exports = mongoose.model('CarePackage', carePackageSchema);