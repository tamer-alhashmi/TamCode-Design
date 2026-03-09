const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers, unsubscribe } = require('../controllers/subscribeController');
const { protect } = require('../middleware/auth');

router.post('/', subscribe);
router.get('/', protect, getSubscribers);
router.delete('/:id', protect, unsubscribe);

module.exports = router;
