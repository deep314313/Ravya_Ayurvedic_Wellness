require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Review = require('./models/Review');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const products = [
  {
    name: 'Golden Turmeric Immunity',
    slug: 'golden-turmeric-immunity',
    tagline: 'Your Daily Immunity Shot',
    description: 'Boost your immune system naturally with turmeric, amla, and 10 powerful Ayurvedic herbs. Cold-pressed and ready to drink.',
    price: 69,
    color: '#F4B942',
    imageUrl: '/images/turmeric-bottle.png',
    benefits: [
      'Strengthens immune system',
      'Anti-inflammatory properties',
      'Rich in antioxidants',
      'Supports digestive health'
    ],
    keyIngredients: [
      'Turmeric (Curcumin)',
      'Amla (Indian Gooseberry)',
      'Ginger',
      'Black Pepper',
      'Tulsi',
      'Ashwagandha',
      'Giloy',
      'Neem'
    ],
    tag: 'Best for Immunity',
    inStock: true,
    nutritionalInfo: {
      servingSize: '250ml',
      calories: 45,
      protein: '1g',
      carbs: '10g',
      sugar: '6g',
      fiber: '2g'
    },
    featured: true
  },
  {
    name: 'Jamun Lemon Balance',
    slug: 'jamun-lemon-balance',
    tagline: 'Sugar Balance Support',
    description: 'Manage blood sugar levels naturally with jamun, karela, and powerful Ayurvedic herbs. A delicious daily drink for metabolic wellness.',
    price: 69,
    color: '#6B2E7A',
    imageUrl: '/images/jamun-bottle.png',
    benefits: [
      'Supports healthy blood sugar levels',
      'Improves metabolism',
      'Rich in antioxidants',
      'Digestive health support'
    ],
    keyIngredients: [
      'Jamun (Black Plum)',
      'Lemon',
      'Karela (Bitter Gourd)',
      'Fenugreek',
      'Tulsi',
      'Cinnamon',
      'Gudmar',
      'Neem'
    ],
    tag: 'Best for Sugar Balance',
    inStock: true,
    nutritionalInfo: {
      servingSize: '250ml',
      calories: 35,
      protein: '1g',
      carbs: '8g',
      sugar: '4g',
      fiber: '3g'
    },
    featured: true
  },
  {
    name: 'Beetroot Heart Balance',
    slug: 'beetroot-heart-balance',
    tagline: 'Heart Health Elixir',
    description: 'Support cardiovascular health with beetroot, pomegranate, and heart-loving Ayurvedic herbs. Delicious and good for your heart.',
    price: 69,
    color: '#C73E4A',
    imageUrl: '/images/beetroot-bottle.png',
    benefits: [
      'Supports heart health',
      'Improves blood circulation',
      'Rich in nitrates',
      'Enhances stamina'
    ],
    keyIngredients: [
      'Beetroot',
      'Pomegranate',
      'Hibiscus',
      'Arjuna',
      'Hawthorn',
      'Ginger',
      'Cinnamon',
      'Cardamom'
    ],
    tag: 'Best for Heart Health',
    inStock: true,
    nutritionalInfo: {
      servingSize: '250ml',
      calories: 50,
      protein: '2g',
      carbs: '11g',
      sugar: '8g',
      fiber: '2g'
    },
    featured: true
  }
];

const reviews = [
  {
    customerName: 'Priya Sharma',
    rating: 5,
    comment: 'The Golden Turmeric drink is amazing! I have been drinking it for 2 weeks and already feel more energetic. No artificial taste at all.',
    verified: true,
    helpful: 24
  },
  {
    customerName: 'Rajesh Kumar',
    rating: 5,
    comment: 'As a diabetic, the Jamun Lemon Balance has been a game changer. Helps me manage my sugar levels naturally. Highly recommend!',
    verified: true,
    helpful: 18
  },
  {
    customerName: 'Ananya Desai',
    rating: 4,
    comment: 'Love the Beetroot Heart Balance! Tastes great and I feel the difference in my stamina during workouts.',
    verified: true,
    helpful: 15
  },
  {
    customerName: 'Vikram Malhotra',
    rating: 5,
    comment: 'Finally, Ayurvedic drinks that actually taste good! The convenience of ready-to-drink format is perfect for my busy lifestyle.',
    verified: true,
    helpful: 22
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Product.deleteMany({});
    await Review.deleteMany({});
    
    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log('Products seeded successfully');
    
    // Add product references to reviews
    const reviewsWithProducts = reviews.map((review, index) => ({
      ...review,
      product: createdProducts[index % createdProducts.length]._id
    }));
    
    await Review.insertMany(reviewsWithProducts);
    console.log('Reviews seeded successfully');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();

