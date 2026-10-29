const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for admin with password
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin });
};

module.exports = { login, getMe };
