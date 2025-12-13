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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'RAVYA API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Keep-alive mechanism for Render free tier
  if (process.env.NODE_ENV === 'production') {
    const https = require('https');
    const SELF_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
    
    console.log('🔄 Keep-alive service enabled');
    
    // Ping self every 10 minutes to prevent sleep
    setInterval(() => {
      const url = `${SELF_URL}/api/health`;
      console.log(`[${new Date().toISOString()}] Self-ping: ${url}`);
      
      const protocol = SELF_URL.startsWith('https') ? https : require('http');
      protocol.get(url, (res) => {
        console.log(`✅ Self-ping successful: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error('❌ Self-ping error:', err.message);
      });
    }, 10 * 60 * 1000); // Every 10 minutes
  }
});

