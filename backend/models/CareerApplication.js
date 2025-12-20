const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true,
    default: 'Video Editor Intern'
  },
  resume: {
    fileName: String,
    cloudinaryUrl: String, // Cloudinary URL
    publicId: String, // Cloudinary public ID
    fileType: String
  },
  coverLetter: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);

