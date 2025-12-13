const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId })
      .populate('items.product');
    
    if (!cart) {
      // Create empty cart if doesn't exist
      cart = await Cart.create({ 
        user: req.params.userId, 
        items: [] 
      });
    }
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    if (!product.inStock) {
      return res.status(400).json({ success: false, message: 'Product out of stock' });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ 
      success: true, 
      data: cart, 
      message: 'Product added to cart' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update item quantity
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be at least 1' 
      });
    }
    
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not in cart' });
    }
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ 
      success: true, 
      data: cart, 
      message: 'Cart updated' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove item from cart
router.delete('/remove', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ 
      success: true, 
      data: cart, 
      message: 'Item removed from cart' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Apply coupon to cart
router.post('/apply-coupon', async (req, res) => {
  try {
    const { userId, couponCode } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const coupon = await Coupon.findOne({ 
      code: couponCode.toUpperCase() 
    });
    
    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invalid coupon code' 
      });
    }
    
    // Validate coupon
    const validation = coupon.isValid(cart.subtotal);
    if (!validation.valid) {
      return res.status(400).json({ 
        success: false, 
        message: validation.message 
      });
    }
    
    // Calculate discount
    const discount = coupon.calculateDiscount(cart.subtotal);
    
    cart.discount = discount;
    cart.couponCode = coupon.code;
    await cart.save();
    
    res.json({ 
      success: true, 
      data: cart, 
      message: `Coupon applied! You saved ₹${discount}` 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove coupon
router.post('/remove-coupon', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.discount = 0;
    cart.couponCode = undefined;
    await cart.save();
    
    res.json({ 
      success: true, 
      data: cart, 
      message: 'Coupon removed' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.items = [];
    cart.discount = 0;
    cart.couponCode = undefined;
    await cart.save();
    
    res.json({ 
      success: true, 
      data: cart, 
      message: 'Cart cleared' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

