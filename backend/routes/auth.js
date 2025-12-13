const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple Login - Just Phone & Name (No OTP)
router.post('/login', async (req, res) => {
  try {
    const { phone, name } = req.body;
    
    if (!phone || !name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number and name are required' 
      });
    }
    
    // Validate phone number format
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid 10-digit phone number' 
      });
    }
    
    // Find or create user
    let user = await User.findOne({ phone });
    
    if (user) {
      // Update name if changed
      if (user.name !== name) {
        user.name = name;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        name,
        phone,
        isVerified: true // Auto-verified for simple login
      });
    }
    
    // Create simple session token
    const sessionToken = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');
    
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        isVerified: user.isVerified
      },
      token: sessionToken
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-otp')
      .populate('orders');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const { name, email, addresses } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, addresses },
      { new: true, runValidators: true }
    ).select('-otp');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, data: user, message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

