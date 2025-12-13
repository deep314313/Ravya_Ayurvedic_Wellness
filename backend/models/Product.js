const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  tagline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  benefits: [{
    type: String
  }],
  keyIngredients: [{
    type: String
  }],
  tag: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  nutritionalInfo: {
    servingSize: String,
    calories: Number,
    protein: String,
    carbs: String,
    sugar: String,
    fiber: String
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

