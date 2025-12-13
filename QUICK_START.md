# ⚡ RAVYA Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites
- ✅ Node.js installed (v16+)
- ✅ MongoDB installed or Atlas account

## 🚀 Super Quick Setup

### Step 1: Install Everything
```bash
# Install all dependencies (backend + frontend)
npm run install-all
```

### Step 2: Configure Environment

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ravya
JWT_SECRET=ravya_secret_2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 3: Seed Database
```bash
npm run seed
```

### Step 4: Start Development Servers

**Terminal 1** - Start Backend:
```bash
npm run dev-backend
```

**Terminal 2** - Start Frontend:
```bash
npm run dev-frontend
```

### Step 5: Open Browser
Navigate to: **http://localhost:3000**

Done! 🎉

## 📝 Available Scripts

From the root directory:

```bash
npm run install-all      # Install all dependencies
npm run seed             # Seed database with products
npm run dev-backend      # Start backend dev server
npm run dev-frontend     # Start frontend dev server
npm run start-backend    # Start backend production
npm run start-frontend   # Start frontend production
npm run build-frontend   # Build frontend for production
```

## 🔧 Manual Setup (Alternative)

### Backend
```bash
cd backend
npm install
# Create .env file
node seed.js
npm run dev
```

### Frontend (in new terminal)
```bash
cd frontend
npm install
# Create .env.local file
npm run dev
```

## 📂 Project Structure

```
Ravya/
├── backend/          # Express API + MongoDB
├── frontend/         # Next.js React App
├── README.md         # Full documentation
├── SETUP_GUIDE.md    # Detailed setup
├── FEATURES.md       # Feature list
└── package.json      # Root scripts
```

## 🎨 What You'll See

- 🏠 Hero section with animated bottles
- 🌿 Product showcase (3 Ayurvedic drinks)
- ⭐ Customer reviews slider
- 📝 Contact form
- 📧 Newsletter signup
- ❓ FAQ section
- And much more!

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React 18
- CSS Modules
- Framer Motion

**Backend:**
- Express.js
- MongoDB
- Mongoose
- Node.js

## 📱 Products

1. **Golden Turmeric Immunity** (₹299)
   - Immune support
   - 10 Ayurvedic herbs

2. **Jamun Lemon Balance** (₹299)
   - Sugar control
   - Diabetes support

3. **Beetroot Heart Balance** (₹299)
   - Heart health
   - Blood circulation

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# For local MongoDB:
# Windows: Start MongoDB service
# Mac: brew services start mongodb-community
# Or use MongoDB Atlas (cloud)
```

### Port Already in Use
```bash
# Change PORT in backend/.env to 5001
# Update frontend/.env.local API URL accordingly
```

### Module Not Found
```bash
# Delete node_modules in both folders
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

## 📚 Documentation

- **README.md** - Complete documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **FEATURES.md** - Full feature list

## 🌐 Test API

Once backend is running, test:
```
http://localhost:5000/api/health
http://localhost:5000/api/products
http://localhost:5000/api/reviews
```

## 🎯 Next Steps

1. ✅ Customize product images
2. ✅ Update brand colors
3. ✅ Add real content
4. ✅ Configure email service
5. ✅ Set up payment gateway
6. ✅ Deploy to production

## 💬 Need Help?

- 📧 Email: hello@ravya.in
- 📖 Docs: See README.md
- 🐛 Issues: Create GitHub issue

---

**Happy Coding!** 💚 Built with wellness in mind.

