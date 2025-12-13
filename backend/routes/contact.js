const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactNotificationToAdmin } = require('../utils/emailService');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    // Send notification to admin (don't wait for it)
    sendContactNotificationToAdmin(req.body).catch(err => console.error('Contact email error:', err));
    
    res.status(201).json({ success: true, message: 'Message sent successfully. We will get back to you soon!' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

