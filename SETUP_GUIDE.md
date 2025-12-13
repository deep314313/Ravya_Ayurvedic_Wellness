# RAVYA Setup Guide

Complete step-by-step guide to get the RAVYA Ayurvedic Wellness Drinks website up and running.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16.0 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - [MongoDB Community Edition (local)](https://www.mongodb.com/try/download/community)
  - [MongoDB Atlas (cloud)](https://www.mongodb.com/cloud/atlas/register) - Recommended for beginners
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## Quick Start (5 minutes)

### 1. Install MongoDB

#### Option A: MongoDB Atlas (Cloud - Easier)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/ravya`)

#### Option B: Local MongoDB
1. Download MongoDB Community Edition
2. Install and start MongoDB service
3. Connection string will be: `mongodb://localhost:27017/ravya`

### 2. Backend Setup

Open a terminal and run:

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

Edit the `.env` file with your favorite text editor and update:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=ravya_secret_key_2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Seed the database with initial products:

```bash
node seed.js
```

You should see: "Database seeded successfully!"

Start the backend server:

```bash
npm run dev
```

You should see: "Server running on port 5000" and "MongoDB Connected"

### 3. Frontend Setup

Open a NEW terminal window and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
# On Windows:
copy .env.local.example .env.local

# On Mac/Linux:
cp .env.local.example .env.local
```

Edit the `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

You should see: "ready - started server on 0.0.0.0:3000"

### 4. Open the Website

Open your browser and go to: **http://localhost:3000**

You should see the RAVYA landing page! 🎉

## Detailed Setup

### Backend Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/                  # Database schemas
│   ├── Product.js          # Product model
│   ├── Order.js            # Order model
│   ├── Review.js           # Review model
│   ├── Newsletter.js       # Newsletter subscribers
│   └── Contact.js          # Contact form submissions
├── routes/                 # API routes
│   ├── products.js         # Product endpoints
│   ├── orders.js           # Order endpoints
│   ├── reviews.js          # Review endpoints
│   ├── newsletter.js       # Newsletter endpoints
│   └── contact.js          # Contact form endpoints
├── server.js               # Main server file
├── seed.js                 # Database seeding script
├── package.json            # Dependencies
└── .env                    # Environment variables (create this)
```

### Frontend Structure

```
frontend/
├── components/             # React components
│   ├── Navbar.js          # Navigation bar
│   ├── Hero.js            # Hero section with bottles
│   ├── TrustStrip.js      # Benefits strip
│   ├── Story.js           # Brand story
│   ├── Products.js        # Product showcase
│   ├── HowItWorks.js      # Usage instructions
│   ├── AyurvedicScience.js # Educational content
│   ├── Reviews.js         # Customer reviews
│   ├── FAQ.js             # FAQ accordion
│   ├── Contact.js         # Contact form
│   └── Footer.js          # Footer with newsletter
├── pages/
│   ├── _app.js            # App wrapper
│   ├── _document.js       # HTML document
│   └── index.js           # Main landing page
├── styles/                # CSS modules
├── utils/
│   └── api.js             # API utility functions
├── public/                # Static assets
├── package.json           # Dependencies
└── .env.local            # Environment variables (create this)
```

## Testing the API

You can test the backend API using these URLs in your browser or Postman:

### Health Check
```
GET http://localhost:5000/api/health
```

### Get All Products
```
GET http://localhost:5000/api/products
```

### Get All Reviews
```
GET http://localhost:5000/api/reviews
```

### Submit Newsletter (Use Postman or curl)
```
POST http://localhost:5000/api/newsletter/subscribe
Body: { "email": "test@example.com" }
```

## Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution**: 
- Check if MongoDB service is running (if using local)
- Verify your connection string in `.env`
- For Atlas, check if your IP is whitelisted

### Issue 2: "Port 5000 already in use"
**Solution**: 
- Change the PORT in backend `.env` to something else (e.g., 5001)
- Or stop other processes using port 5000

### Issue 3: "Module not found" errors
**Solution**: 
- Delete `node_modules` folder
- Run `npm install` again
- Make sure you're in the correct directory (backend or frontend)

### Issue 4: Frontend not connecting to backend
**Solution**: 
- Check if backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Check browser console for CORS errors

### Issue 5: "seed.js" fails
**Solution**: 
- Make sure MongoDB is connected
- Check your MONGODB_URI in `.env`
- Try deleting the database and running seed.js again

## Development Workflow

### Making Changes

1. **Edit a component**: 
   - Go to `frontend/components/[ComponentName].js`
   - Make your changes
   - Save - Next.js will hot-reload automatically

2. **Edit styles**: 
   - Go to `frontend/styles/[ComponentName].module.css`
   - Make your changes
   - Save - changes apply instantly

3. **Edit API routes**: 
   - Go to `backend/routes/[routeName].js`
   - Make your changes
   - Save - nodemon will restart the server

### Adding New Products

1. Edit `backend/seed.js`
2. Add your new product to the `products` array
3. Run: `node seed.js`

Or use the API:
```bash
POST http://localhost:5000/api/products
Body: {
  "name": "New Product",
  "slug": "new-product",
  "tagline": "Your tagline",
  "description": "Description here",
  "price": 299,
  "color": "#FF5733",
  "imageUrl": "/images/product.png",
  "benefits": ["Benefit 1", "Benefit 2"],
  "keyIngredients": ["Ingredient 1", "Ingredient 2"],
  "tag": "Best for X"
}
```

## Production Deployment

### Deploy Backend (Railway/Render/Heroku)

1. Create an account on Railway/Render
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL=your_frontend_url`
4. Deploy!

### Deploy Frontend (Vercel)

1. Create an account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Select "frontend" as root directory
4. Set environment variable:
   - `NEXT_PUBLIC_API_URL=your_backend_url/api`
5. Deploy!

## Scripts Reference

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
node seed.js       # Seed database with initial data
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## Need Help?

- **Email**: hello@ravya.in
- **Documentation**: Check README.md for API details
- **Issues**: Create an issue on GitHub

## Next Steps

1. ✅ Customize product images (add to `frontend/public/images/`)
2. ✅ Update brand colors in `frontend/styles/globals.css`
3. ✅ Add real lifestyle photos
4. ✅ Configure email service for contact form
5. ✅ Set up payment gateway (Razorpay/Stripe)
6. ✅ Add Google Analytics
7. ✅ Configure domain name
8. ✅ Set up SSL certificate

---

**Congratulations!** 🎉 Your RAVYA website is now running. Start customizing and building your Ayurvedic wellness brand!

