const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.subscribed) {
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
      } else {
        existing.subscribed = true;
        await existing.save();
        return res.json({ success: true, message: 'Subscription reactivated successfully' });
      }
    }
    
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    res.status(201).json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await Newsletter.findOne({ email });
    
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }
    
    subscriber.subscribed = false;
    await subscriber.save();
    res.json({ success: true, message: 'Successfully unsubscribed' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;

