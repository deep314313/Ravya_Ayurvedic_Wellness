const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Coupon = require('../models/Coupon');
const { sendOrderConfirmationEmail, sendOrderNotificationToAdmin } = require('../utils/emailService');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { userId, shippingAddress } = req.body;
    
    // Get cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }
    
    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // No delivery charge - free delivery!
    const finalTotal = cart.total;
    
    // Create order in database
    const order = await Order.create({
      customerInfo: {
        name: shippingAddress.name || user.name,
        phone: shippingAddress.phone || user.phone,
        email: user.email || '',  // Optional email
        address: {
          street: shippingAddress.address || '',  // Complete address in street field
          city: '',  // Not required
          state: '',  // Not required
          pincode: '',  // Not required
          name: shippingAddress.name || user.name,
          phone: shippingAddress.phone || user.phone
        }
      },
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: finalTotal,
      status: 'confirmed', // IDEA STAGE: Directly confirmed
      paymentStatus: 'completed' // IDEA STAGE: Marked as completed (no real payment)
    });
    
    // Update user's orders
    await User.findByIdAndUpdate(userId, {
      $push: { orders: order._id }
    });
    
    // Clear cart
    cart.items = [];
    cart.discount = 0;
    cart.couponCode = undefined;
    cart.subtotal = 0;
    cart.total = 0;
    await cart.save();
    
    // Populate order with product details for email
    const populatedOrder = await Order.findById(order._id).populate('items.product');
    
    // Send emails (don't wait for them, run in background)
    // Send confirmation email to customer (only if email is provided)
    if (populatedOrder.customerInfo.email && populatedOrder.customerInfo.email.includes('@')) {
      sendOrderConfirmationEmail(
        populatedOrder.customerInfo.email,
        populatedOrder.customerInfo.name,
        populatedOrder._id
      ).catch(err => console.error('Customer email error:', err));
    }
    
    // Send notification to admin (always)
    sendOrderNotificationToAdmin(populatedOrder).catch(err => console.error('Admin email error:', err));
    
    res.json({
      success: true,
      data: {
        orderId: order._id
      },
      message: 'Order created successfully'
    });
    
    // RAZORPAY CODE - COMMENTED OUT FOR IDEA STAGE
    /*
    // Create real Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: finalTotal * 100, // Amount in paise
      currency: 'INR',
      receipt: order._id.toString()
    });
    
    res.json({
      success: true,
      data: {
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID
      },
      message: 'Order created successfully'
    });
    */
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify payment and update order
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = req.body;
    
    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');
    
    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
    
    // Update order status
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.status = 'confirmed';
    order.paymentStatus = 'completed';
    order.paymentDetails = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    };
    
    await order.save();
    
    // Get user ID from order (find user by phone since we don't store user ID in order)
    const orderUser = await User.findOne({ phone: order.customerInfo.phone });
    
    if (orderUser) {
      // Update user's orders
      await User.findByIdAndUpdate(orderUser._id, {
        $push: { orders: order._id }
      });
    }
    
    // Increment coupon usage if applied
    const cart = await Cart.findOne({ user: orderUser?._id });
    if (cart && cart.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: cart.couponCode },
        { $inc: { usedCount: 1 } }
      );
    }
    
    // Clear cart completely
    if (cart) {
      cart.items = [];
      cart.discount = 0;
      cart.couponCode = undefined;
      cart.subtotal = 0;
      cart.total = 0;
      await cart.save();
      console.log('Cart cleared successfully for user:', orderUser?._id);
    }
    
    // Send emails (don't wait for them, run in background)
    // Populate order with product details for email
    const populatedOrder = await Order.findById(orderId).populate('items.product');
    
    // Send confirmation email to customer (only if email is provided)
    if (populatedOrder.customerInfo.email && populatedOrder.customerInfo.email.includes('@')) {
      sendOrderConfirmationEmail(
        populatedOrder.customerInfo.email,
        populatedOrder.customerInfo.name,
        populatedOrder._id
      ).catch(err => console.error('Customer email error:', err));
    } else {
      console.log('No customer email provided, skipping customer notification');
    }
    
    // Send notification to admin (always)
    sendOrderNotificationToAdmin(populatedOrder).catch(err => console.error('Admin email error:', err));
    
    res.json({
      success: true,
      data: order,
      message: 'Payment verified successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// COMMENTED OUT FOR IDEA STAGE - NO PAYMENT GATEWAY
/*
// Payment failed
router.post('/payment-failed', async (req, res) => {
  try {
    const { orderId, error } = req.body;
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.status = 'cancelled';
    order.paymentStatus = 'failed';
    order.paymentError = error;
    
    await order.save();
    
    // Send failed payment notification to admin (don't wait)
    sendPaymentFailureNotificationToAdmin(order, error || 'Payment cancelled by user')
      .catch(err => console.error('Failed payment email error:', err));
    
    res.json({
      success: true,
      message: 'Payment failure recorded'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
*/

module.exports = router;

