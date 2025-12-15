const { Resend } = require('resend');

// Initialize Resend
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!resend) {
  console.warn('⚠️ RESEND_API_KEY not found in environment variables');
}

// Send thank you email to customer (Idea Stage)
const sendOrderConfirmationEmail = async (customerEmail, customerName, orderId) => {
  try {
    if (!resend) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #F4B942 0%, #F9D67A 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .logo { font-size: 42px; font-weight: 900; color: #1a1a1a; margin-bottom: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Arial Black', sans-serif; }
    .tagline { color: #666; font-size: 14px; font-weight: 500; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .message { font-size: 16px; margin-bottom: 20px; }
    .highlight { background: #fff5e1; padding: 20px; border-left: 4px solid #F4B942; margin: 20px 0; border-radius: 5px; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; padding: 12px 30px; background: #F4B942; color: #1a1a1a; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
    .order-id { font-weight: bold; color: #F4B942; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">RAVYA</div>
      <div class="tagline">Ayurvedic Wellness Drinks</div>
    </div>
    
    <div class="content">
      <h2 style="color: #1a1a1a;">Dear ${customerName},</h2>
      
      <p class="message">
        <strong>Thank you so much for trusting RAVYA!</strong> 🙏
      </p>
      
      <p class="message">
        Your order <span class="order-id">#${orderId}</span> has been received.
      </p>
      
      <div class="highlight">
        <h3 style="margin-top: 0; color: #F4B942;">🚀 We're in Idea Stage!</h3>
        <p style="margin-bottom: 0;">
          We want to be completely transparent with you. RAVYA is currently in the <strong>idea and validation stage</strong>. 
          We are gathering feedback from early supporters like you to bring our Ayurvedic wellness drinks to life.
        </p>
      </div>
      
      <p class="message">
        <strong>Important:</strong> Your payment will be <strong>fully refunded</strong> within 5-7 business days. 
        This order was placed to help us understand customer interest and gather valuable feedback.
      </p>
      
      <p class="message">
        Your trust and support mean everything to us! We're working hard to turn RAVYA into reality, 
        and early believers like you are helping us shape something truly special.
      </p>
      
      <p class="message">
        <strong>What's Next?</strong>
        <ul>
          <li>✅ Your refund will be processed soon</li>
          <li>📧 We'll keep you updated on our journey</li>
          <li>🎁 Special launch offers for early supporters</li>
          <li>💬 Your feedback is invaluable to us</li>
        </ul>
      </p>
      
      <p class="message">
        Have questions or feedback? We'd love to hear from you! Just reply to this email.
      </p>
      
      <p style="margin-top: 30px;">
        With gratitude,<br>
        <strong>Team RAVYA</strong><br>
        <em>Ancient Ayurveda, Modern Convenience</em>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>RAVYA - Ayurvedic Wellness Drinks</strong></p>
      <p>New Delhi, India</p>
      <p>📧 ravya.health@gmail.com | 📞 +91 98683 14313</p>
      <p style="margin-top: 15px; color: #999;">
        © 2026 RAVYA. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'RAVYA - Ayurvedic Wellness <onboarding@resend.dev>',
      to: customerEmail,
      subject: '🙏 Thank You for Your Trust - RAVYA (Idea Stage)',
      html: htmlContent
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Order confirmation email sent to:', customerEmail);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending order confirmation email:', error.message);
    return { success: false, error: error.message };
  }
};

// Send order notification to admin
const sendOrderNotificationToAdmin = async (orderDetails) => {
  try {
    if (!resend) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const itemsList = orderDetails.items.map(item => 
      `<li>${item.product.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>`
    ).join('');
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
    .header { background: #27ae60; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
    .section { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; }
    .label { font-weight: bold; color: #666; }
    .value { color: #1a1a1a; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px; background: white; margin: 5px 0; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">🎉 New Order Received!</h2>
    </div>
    
    <div class="content">
      <div class="section">
        <p><span class="label">Order ID:</span> <span class="value">#${orderDetails._id}</span></p>
        <p><span class="label">Status:</span> <span class="value">${orderDetails.status}</span></p>
        <p><span class="label">Payment:</span> <span class="value">${orderDetails.paymentStatus}</span></p>
      </div>
      
      <div class="section">
        <h3>Customer Details</h3>
        <p><span class="label">Name:</span> ${orderDetails.customerInfo.name}</p>
        <p><span class="label">Phone:</span> ${orderDetails.customerInfo.phone}</p>
        <p><span class="label">Email:</span> ${orderDetails.customerInfo.email || 'Not provided'}</p>
      </div>
      
      <div class="section">
        <h3>Delivery Address</h3>
        <p style="white-space: pre-line;">${orderDetails.customerInfo.address.street || 'Address not provided'}</p>
      </div>
      
      <div class="section">
        <h3>Order Items</h3>
        <ul>
          ${itemsList}
        </ul>
      </div>
      
      <div class="section">
        <h3 style="color: #27ae60;">Total Amount: ₹${orderDetails.totalAmount}</h3>
      </div>
      
      <p style="margin-top: 20px; padding: 15px; background: #fff5e1; border-radius: 5px;">
        <strong>⚠️ Remember:</strong> This is an idea stage order. Process refund within 5-7 days.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'RAVYA System <onboarding@resend.dev>',
      to: 'ravya.health@gmail.com',
      subject: `🎉 New Order Received - #${orderDetails._id}`,
      html: htmlContent
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Order notification sent to admin');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending admin notification:', error.message);
    return { success: false, error: error.message };
  }
};

// Send contact form notification to admin
const sendContactNotificationToAdmin = async (contactData) => {
  try {
    if (!resend) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
    .header { background: #3498db; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
    .section { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; }
    .label { font-weight: bold; color: #666; display: block; margin-bottom: 5px; }
    .value { color: #1a1a1a; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #3498db; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">📩 New Contact Form Submission</h2>
    </div>
    
    <div class="content">
      <div class="section">
        <span class="label">Name:</span>
        <span class="value">${contactData.name}</span>
      </div>
      
      <div class="section">
        <span class="label">Email:</span>
        <span class="value">${contactData.email}</span>
      </div>
      
      <div class="section">
        <span class="label">Phone:</span>
        <span class="value">${contactData.phone || 'Not provided'}</span>
      </div>
      
      <div class="section">
        <span class="label">Subject:</span>
        <span class="value">${contactData.subject}</span>
      </div>
      
      <div class="section">
        <span class="label">Message:</span>
        <div class="message-box">
          ${contactData.message}
        </div>
      </div>
      
      <div class="section">
        <span class="label">Submitted:</span>
        <span class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
      </div>
      
      <p style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 5px;">
        💡 <strong>Action Required:</strong> Please respond to this inquiry at the earliest.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'RAVYA Contact Form <onboarding@resend.dev>',
      to: 'ravya.health@gmail.com',
      subject: `📩 New Contact Form Submission - ${contactData.subject}`,
      html: htmlContent
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Contact form notification sent to admin');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending contact notification:', error.message);
    return { success: false, error: error.message };
  }
};

// Send failed payment notification to admin
const sendPaymentFailureNotificationToAdmin = async (orderDetails, errorReason) => {
  try {
    if (!resend) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
    .header { background: #e74c3c; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
    .section { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; }
    .label { font-weight: bold; color: #666; }
    .value { color: #1a1a1a; }
    .error-box { background: #ffebee; padding: 15px; border-left: 4px solid #e74c3c; border-radius: 5px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">⚠️ Payment Failed</h2>
    </div>
    
    <div class="content">
      <div class="section">
        <p><span class="label">Order ID:</span> <span class="value">#${orderDetails._id}</span></p>
        <p><span class="label">Status:</span> <span class="value">${orderDetails.status}</span></p>
        <p><span class="label">Payment:</span> <span class="value" style="color: #e74c3c;">FAILED</span></p>
      </div>
      
      <div class="error-box">
        <h3 style="margin-top: 0; color: #e74c3c;">Failure Reason:</h3>
        <p style="margin-bottom: 0;">${errorReason}</p>
      </div>
      
      <div class="section">
        <h3>Customer Details</h3>
        <p><span class="label">Name:</span> ${orderDetails.customerInfo.name}</p>
        <p><span class="label">Phone:</span> ${orderDetails.customerInfo.phone}</p>
        <p><span class="label">Email:</span> ${orderDetails.customerInfo.email || 'Not provided'}</p>
      </div>
      
      <div class="section">
        <h3>Delivery Address</h3>
        <p style="white-space: pre-line;">${orderDetails.customerInfo.address.street || 'Address not provided'}</p>
      </div>
      
      <div class="section">
        <h3 style="color: #e74c3c;">Attempted Amount: ₹${orderDetails.totalAmount}</h3>
      </div>
      
      <p style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 5px;">
        <strong>📋 Action Required:</strong> Follow up with customer if needed. No refund required as payment was not completed.
      </p>
      
      <p style="margin-top: 10px; font-size: 12px; color: #666;">
        Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'RAVYA System <onboarding@resend.dev>',
      to: 'ravya.health@gmail.com',
      subject: `⚠️ Payment Failed - Order #${orderDetails._id}`,
      html: htmlContent
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Payment failure notification sent to admin');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending payment failure notification:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendOrderNotificationToAdmin,
  sendContactNotificationToAdmin,
  sendPaymentFailureNotificationToAdmin
};

