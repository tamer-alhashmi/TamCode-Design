const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone cannot exceed 20 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  type: {
    type: String,
    enum: ['discount', 'contact', 'general'],
    default: 'contact',
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', ContactSchema);
