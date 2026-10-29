const Contact = require('../models/Contact');

// @desc    Submit contact/discount form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message, type } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const contact = await Contact.create({ name, email, phone, message, type: type || 'contact' });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will contact you soon.',
      data: { id: contact._id },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: Object.values(err.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error, please try again' });
  }
};

// @desc    Get all contacts (admin)
// @route   GET /api/contact
// @access  Private
const getContacts = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, total, page: parseInt(page), data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id
// @access  Private
const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { submitContact, getContacts, updateContactStatus, deleteContact };
