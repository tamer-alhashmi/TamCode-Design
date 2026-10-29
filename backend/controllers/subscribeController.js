const Subscriber = require('../models/Subscriber');

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({ success: false, message: 'This email is already subscribed!' });
      }
      // Reactivate
      existing.isActive = true;
      await existing.save();
      return res.json({ success: true, message: 'Welcome back! You are subscribed again.' });
    }

    await Subscriber.create({ email });
    res.status(201).json({ success: true, message: 'You have been subscribed successfully!' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }
    res.status(500).json({ success: false, message: 'Server error, please try again' });
  }
};

// @desc    Get all subscribers (admin)
// @route   GET /api/subscribe
// @access  Private
const getSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const total = await Subscriber.countDocuments({ isActive: true });
    const subscribers = await Subscriber.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, total, page: parseInt(page), data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Unsubscribe
// @route   DELETE /api/subscribe/:id
// @access  Private
const unsubscribe = async (req, res) => {
  try {
    const sub = await Subscriber.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!sub) return res.status(404).json({ success: false, message: 'Subscriber not found' });
    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { subscribe, getSubscribers, unsubscribe };
