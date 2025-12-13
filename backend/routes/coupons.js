const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Get all active coupons
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    });
    
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Validate coupon
router.post('/validate', async (req, res) => {
  try {
    const { code, orderValue } = req.body;
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invalid coupon code' 
      });
    }
    
    const validation = coupon.isValid(orderValue);
    
    if (!validation.valid) {
      return res.status(400).json({ 
        success: false, 
        message: validation.message 
      });
    }
    
    const discount = coupon.calculateDiscount(orderValue);
    
    res.json({ 
      success: true, 
      data: {
        coupon: {
          code: coupon.code,
          description: coupon.description,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue
        },
        discount,
        finalAmount: orderValue - discount
      },
      message: 'Coupon is valid' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create coupon (admin)
router.post('/', async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ 
      success: true, 
      data: coupon, 
      message: 'Coupon created successfully' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update coupon (admin)
router.put('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    
    res.json({ 
      success: true, 
      data: coupon, 
      message: 'Coupon updated successfully' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete coupon (admin)
router.delete('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Coupon deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

