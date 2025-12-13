require('dotenv').config();
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const coupons = [
  {
    code: 'WELCOME10',
    description: 'Welcome offer - 10% off on your first order',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 299,
    maxDiscount: 100,
    startDate: new Date(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    usageLimit: 1000,
    isActive: true
  },
  {
    code: 'SAVE50',
    description: 'Flat ₹50 off on orders above ₹500',
    discountType: 'fixed',
    discountValue: 50,
    minOrderValue: 500,
    startDate: new Date(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
    isActive: true
  },
  {
    code: 'AYURVEDA20',
    description: '20% off on all Ayurvedic drinks',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 600,
    maxDiscount: 200,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    usageLimit: 500,
    isActive: true
  },
  {
    code: 'HEALTH100',
    description: 'Flat ₹100 off on orders above ₹1000',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 1000,
    startDate: new Date(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
    isActive: true
  }
];

const seedCoupons = async () => {
  try {
    await connectDB();
    
    // Clear existing coupons
    await Coupon.deleteMany({});
    console.log('Existing coupons cleared');
    
    // Insert new coupons
    await Coupon.insertMany(coupons);
    console.log('Coupons seeded successfully');
    
    console.log('\nAvailable Coupons:');
    coupons.forEach(c => {
      console.log(`- ${c.code}: ${c.description}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedCoupons();

