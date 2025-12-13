# RAVYA - Ayurvedic Wellness Drinks

A modern, conversion-focused ecommerce landing page for RAVYA, a functional Ayurvedic wellness drinks brand. Built with Next.js (frontend) and Express/MongoDB (backend).

## 🚀 Quick Deploy

**Ready to deploy?** Start here:
1. 📋 **[Pre-Deployment Checklist](PRE_DEPLOYMENT_CHECKLIST.md)** - Verify you're ready
2. 📚 **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Complete step-by-step instructions
3. ⚡ **[Quick Deploy](QUICK_DEPLOY.md)** - Fast reference commands
4. 🔐 **[Environment Variables Guide](ENV_VARIABLES_GUIDE.md)** - All env variables explained
5. 📊 **[Deployment Summary](DEPLOYMENT_SUMMARY.md)** - Overview and keep-alive setup

**Keep-Alive Mechanism:** ✅ Built-in! Backend automatically pings itself every 10 minutes to prevent Render free tier from sleeping.

## 🌿 About RAVYA

RAVYA offers three ready-to-drink Ayurvedic wellness beverages:

1. **Golden Turmeric Immunity** - Immune system support with turmeric, amla, and 10 Ayurvedic herbs
2. **Jamun Lemon Balance** - Sugar control and diabetes management support
3. **Beetroot Heart Balance** - Heart health and blood circulation support

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - UI library
- **CSS Modules** - Scoped styling
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📁 Project Structure

```
Ravya/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   ├── Newsletter.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── reviews.js
│   │   ├── newsletter.js
│   │   └── contact.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── TrustStrip.js
│   │   ├── Story.js
│   │   ├── Products.js
│   │   ├── HowItWorks.js
│   │   ├── AyurvedicScience.js
│   │   ├── Reviews.js
│   │   ├── FAQ.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   └── index.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── [component].module.css
│   ├── utils/
│   │   └── api.js
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   └── .env.local.example
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configurations:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ravya
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Seed the database with initial data:
```bash
node seed.js
```

6. Start the backend server:
```bash
npm run dev
```

The backend API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.local.example`:
```bash
cp .env.local.example .env.local
```

4. Update the `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

## 🎨 Design Features

### Inspired by Poppi Prebiotic Soda
- Playful, clean, and minimal design
- Soft rounded shapes and asymmetrical sections
- Floating fruits and decorative elements
- Bold, bubbly headlines with display fonts
- Smooth animations and transitions

### Color Palette
- **Golden Turmeric**: `#F4B942` (warm yellow)
- **Jamun Purple**: `#6B2E7A` (deep purple)
- **Beetroot Red**: `#C73E4A` (rich red)
- **Cream Background**: `#FBF8F3`
- **Dark Text**: `#1A1A1A`

### Typography
- **Display Font**: Fredoka (playful, rounded)
- **Body Font**: Inter (clean, readable)

## 📄 Pages & Sections

### Landing Page Sections

1. **Sticky Navigation**
   - Logo, menu items, and CTA button
   - Smooth scroll navigation

2. **Hero Section**
   - Compelling headline and subheadline
   - Product bottles with floating ingredients
   - Primary and secondary CTAs
   - Key statistics

3. **Trust Strip**
   - 5 key benefit icons
   - Ayurvedic formulations, no added sugar, etc.

4. **Story/Brand Section**
   - Brand narrative
   - Ayurvedic promise bullets
   - Lifestyle imagery placeholder

5. **Product Showcase**
   - 3 product cards with hover effects
   - Benefits, ingredients, pricing
   - Individual Buy Now CTAs

6. **How It Works**
   - 3-step process
   - Visual connectors
   - Medical disclaimer

7. **Ayurvedic Science**
   - Educational content
   - Herb illustrations
   - Certification badges

8. **Reviews**
   - Customer testimonials slider
   - Star ratings
   - Social proof metrics

9. **FAQ**
   - Accordion-style questions
   - Safety, usage, shipping info

10. **Contact**
    - Contact form
    - Business information
    - Real-time validation

11. **Footer**
    - Newsletter signup
    - Quick links
    - Social media icons

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get single product
- `POST /api/products` - Create product (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get all orders (admin)

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Submit review

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)

## 🚢 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set up environment variables
2. Connect MongoDB Atlas
3. Deploy from GitHub or CLI

### Frontend Deployment (Vercel)
1. Connect GitHub repository
2. Set environment variables
3. Auto-deploy on push

## 📱 Responsive Design

- **Desktop**: Full grid layouts, side-by-side sections
- **Tablet**: Adjusted grid columns, optimized spacing
- **Mobile**: Single column, stacked sections, hamburger menu

## ✨ Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Order tracking
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Admin dashboard
- [ ] Product inventory management
- [ ] Email notifications
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] A/B testing

## 🤝 Contributing

This is a client project for RAVYA. For contributions or modifications, please contact the development team.

## 📄 License

Proprietary - RAVYA Ayurvedic Wellness Drinks

## 📞 Support

For support, email: hello@ravya.in

---

Built with 💚 for wellness and Ayurveda

