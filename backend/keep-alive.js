// Keep-Alive Script to prevent Render free tier from sleeping
const https = require('https');

const BACKEND_URL = process.env.BACKEND_URL || 'https://your-backend-url.onrender.com';

function pingServer() {
  const url = `${BACKEND_URL}/api/health`;
  
  console.log(`[${new Date().toISOString()}] Pinging server: ${url}`);
  
  https.get(url, (res) => {
    console.log(`✅ Server responded with status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('❌ Error pinging server:', err.message);
  });
}

// Ping every 10 minutes (600000 ms)
setInterval(pingServer, 10 * 60 * 1000);

// Initial ping
pingServer();

console.log('🔄 Keep-alive service started. Pinging every 10 minutes...');

