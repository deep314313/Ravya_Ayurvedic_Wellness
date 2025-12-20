require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/coupons', require('./routes/coupons'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/careers', require('./routes/careers'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'RAVYA API is running' });
});

// Test email endpoint (for debugging) - GET for easy browser testing
app.get('/api/test-email', async (req, res) => {
  try {
    const { sendOrderConfirmationEmail } = require('./utils/emailService');
    const testEmail = req.query.email || 'ravya.health@gmail.com';
    
    console.log('🧪 Testing email to:', testEmail);
    const result = await sendOrderConfirmationEmail(testEmail, 'Test User', 'TEST123');
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Test email sent successfully!',
        sentTo: testEmail
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error,
        message: 'Email sending failed. Check server logs for details.'
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// POST endpoint also available
app.post('/api/test-email', async (req, res) => {
  try {
    const { sendOrderConfirmationEmail } = require('./utils/emailService');
    const testEmail = req.body.email || 'ravya.health@gmail.com';
    
    const result = await sendOrderConfirmationEmail(testEmail, 'Test User', 'TEST123');
    
    if (result.success) {
      res.json({ success: true, message: 'Test email sent successfully!', sentTo: testEmail });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Keep-alive mechanism for Render free tier
  // Works in both production and if BACKEND_URL is set (for Render)
  const SELF_URL = process.env.BACKEND_URL;
  const isProduction = process.env.NODE_ENV === 'production' || SELF_URL;
  
  if (isProduction && SELF_URL) {
    const https = require('https');
    const http = require('http');
    
    // Ping self every 5 minutes to prevent sleep (Render sleeps after 15 min)
    const pingInterval = 5 * 60 * 1000; // 5 minutes
    
    const pingServer = () => {
      const url = `${SELF_URL}/api/health`;
      const protocol = SELF_URL.startsWith('https') ? https : http;
      
      protocol.get(url, (res) => {
        // Success - server is awake
      }).on('error', () => {
        // Silent fail - don't log errors
      });
    };
    
    // Initial ping after 1 minute
    setTimeout(pingServer, 60 * 1000);
    
    // Then ping every 5 minutes
    setInterval(pingServer, pingInterval);
  }
});

