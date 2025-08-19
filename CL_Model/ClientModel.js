// CL_Model/ClientModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    // Personal Details
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
        required: false
    },
    location: {
        type: String,
        required: true
    },
    
    // Care Needs
    typeOfCare: {
        type: String,
        enum: ['Personal Helper', 'Companion', 'Home Helper'],
        required: true
    },
    helpTiming: {
        type: String,
        enum: ['immediately', 'within 2 weeks', 'within one month'],
        required: true
    },
    hoursPerWeek: {
        type: String,
        enum: ['1-10 hours', '10-20 hours'],
        required: true
    },
    durationOfHelp: {
        type: String,
        enum: ['1-4 weeks', '1-6 months', '6+ months'],
        required: true
    },
    
    // Medical History
    allergies: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    medicalConditions: {
        type: String,
        enum: ['none', 'post surgery care', 'cancer recovery', 'Dementia', 'Hospital care', 'vision disorders'],
        required: true
    },
    
    // Care Preferences
    careSchedule: {
        type: String,
        enum: ['flexible schedule', 'fixed schedule'],
        required: true
    },
    preferredCaregiverGender: {
        type: String,
        enum: ['any gender', 'female', 'male'],
        required: true
    },
    preferredCaregiverLanguage: {
        type: String,
        enum: ['english', 'sinhala'],
        required: true
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Client", ClientSchema);