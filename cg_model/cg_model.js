const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caregiverSchema = new Schema({
  profilePhoto: {
    type: String,
    required: false
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ]
  },
  address: {
    type: String,
    required: true
  },
  language: {
    type: [String],
    enum: ["English", "Sinhala", "Tamil"],
    required: true
  },
  qualifications: {
    type: [String],
    enum: ["CNA", "HHA", "LPN", "RN", "BSN"],
    required: true
  },
  certifications: {
    type: [String],
    enum: ["CPR", "First Aid", "Alzheimer's Care Specialist", "Elder Care", "Dementia Care"],
    required: false
  },
  experience: {
    type: Number,
    enum: [3, 5, 8],
    required: true
  },
  typeOfCare: {
    type: [String],
    enum: ["Medical Care", "Mental Health Support", "Senior Care", "Disability Care", "Post-Surgery Care"],
    required: true
  },
  availability: {
    type: String,
    enum: ["Immediately (within 24 hours)", "Within a week", "Available for future opportunities"],
    required: true
  },
  workingHours: {
    type: String,
    required: false
  },
  daysAvailable: {
    type: [String],
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true
  },
  preferredWorkingHours: {
    type: [String],
    enum: [
      "Weekdays (9 AM–5 PM)",
      "Evenings (5 PM–10 PM)",
      "Overnight (10 PM–6 AM)",
      "Weekends",
      "Flexible hours"
    ],
    required: true
  }
});

// Change the model name to 'Caregiver' and collection name to 'caregivers'
module.exports = mongoose.model("Caregiver", caregiverSchema, "caregivers");