# 🚀 Complete Command Guide for RAVYA

All commands you need to run the full ecommerce platform with cart, auth, and payment features.

---

## 📦 First Time Setup (One-Time)

### Step 1: Install All Dependencies

**From project root:**
```bash
# Install both backend and frontend
npm run install-all
```

**OR install separately:**

**Terminal 1 - Backend:**
```bash
cd backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

---

### Step 2: Configure Environment

**Backend .env:**
```bash
cd backend
copy .env.example .env      # Windows
# OR
cp .env.example .env        # Mac/Linux
```

**Edit `backend/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ravya
JWT_SECRET=ravya_secret_key_2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Get these from https://dashboard.razorpay.com/ (use Test mode)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_test_secret_key
```

**Frontend .env.local:**
```bash
cd frontend
copy .env.local.example .env.local      # Windows
# OR
cp .env.local.example .env.local        # Mac/Linux
```

**Contents (should already be correct):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Step 3: Seed Database

**Seed Products:**
```bash
cd backend
node seed.js
```

✅ Expected output: "Database seeded successfully!"

**Seed Coupons:**
```bash
node seed-coupons.js
```

✅ Expected output: Lists 4 coupon codes (WELCOME10, SAVE50, etc.)

---

## ▶️ Running the Application

You need **TWO terminal windows** running at the same time.

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

✅ **Expected output:**
```
[nodemon] starting `node server.js`
MongoDB Connected: localhost:27017
Server running on port 5000
```

**Keep this terminal running!** ⚠️

---

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

✅ **Expected output:**
```
ready - started server on 0.0.0.0:3000
○ Compiling / ...
✓ Compiled / in XXXms
```

**Keep this terminal running too!** ⚠️

---

### 🌐 Access the Website

Open browser: **http://localhost:3000**

---

## 🧪 Testing Commands

### Test Backend API

**Health check:**
```
http://localhost:5000/api/health
```

**Get products:**
```
http://localhost:5000/api/products
```

**Get coupons:**
```
http://localhost:5000/api/coupons
```

**Get reviews:**
```
http://localhost:5000/api/reviews
```

---

## 🔄 Quick Commands (If Already Set Up)

### Super Fast Start

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm run dev
```

---

### From Project Root

**Start backend:**
```bash
npm run dev-backend
```

**Start frontend:**
```bash
npm run dev-frontend
```

---

## 🛑 Stop Servers

Press **`Ctrl + C`** in each terminal window.

---

## 🔧 Troubleshooting Commands

### Issue: Port Already in Use

**Kill port 5000 (Backend):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Kill port 3000 (Frontend):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

### Issue: MongoDB Connection Failed

**Start MongoDB:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Check if running:**
```bash
# Windows
sc query MongoDB

# Mac/Linux
ps aux | grep mongod
```

---

### Issue: Module Not Found

**Clean reinstall backend:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Clean reinstall frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json .next
npm install
```

---

### Issue: Clear Cache

**Frontend:**
```bash
cd frontend
rm -rf .next
npm run dev
```

---

## 📊 Database Commands

### Reset Database

**Clear all data and reseed:**
```bash
cd backend

# Delete everything (careful!)
mongo ravya --eval "db.dropDatabase()"

# Reseed
node seed.js
node seed-coupons.js
```

---

### View Database

**Using MongoDB Compass:**
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Open database: `ravya`

**Using Mongo Shell:**
```bash
mongo ravya

# List collections
show collections

# View products
db.products.find().pretty()

# View coupons
db.coupons.find().pretty()

# View orders
db.orders.find().pretty()

# View users
db.users.find().pretty()
```

---

## 🚀 Production Build Commands

### Build Frontend

```bash
cd frontend
npm run build
```

This creates optimized production build in `.next/` folder.

### Start Production Frontend

```bash
npm start
```

---

### Start Production Backend

```bash
cd backend
npm start
```

(No build needed for backend)

---

## 📦 Dependency Management

### Update All Dependencies

**Backend:**
```bash
cd backend
npm update
```

**Frontend:**
```bash
cd frontend
npm update
```

---

### Add New Package

**Backend:**
```bash
cd backend
npm install package-name
```

**Frontend:**
```bash
cd frontend
npm install package-name
```

---

## 🎯 Complete Flow for Fresh Start

```bash
# 1. Install everything
cd backend && npm install
cd ../frontend && npm install

# 2. Configure .env files (manually edit)
# backend/.env - Add MongoDB URI, Razorpay keys
# frontend/.env.local - Should be ready

# 3. Seed database
cd backend
node seed.js
node seed-coupons.js

# 4. Start backend (Terminal 1)
npm run dev

# 5. Start frontend (Terminal 2 - new window)
cd ../frontend
npm run dev

# 6. Open browser
# http://localhost:3000
```

---

## 🧹 Cleanup Commands

### Remove Build Artifacts

```bash
# Frontend
cd frontend
rm -rf .next out

# Backend (if any)
cd backend
rm -rf dist build
```

---

### Remove All Dependencies

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json

# Frontend
cd frontend
rm -rf node_modules package-lock.json
```

Then reinstall:
```bash
npm install
```

---

## 📝 Git Commands (If Using Version Control)

### Initialize Git

```bash
git init
git add .
git commit -m "Initial RAVYA ecommerce setup with cart, auth, payment"
```

---

### Push to GitHub

```bash
git remote add origin YOUR_GITHUB_URL
git branch -M main
git push -u origin main
```

---

## 🔍 Useful Check Commands

### Check Node Version

```bash
node --version
# Should be v16.x.x or higher
```

---

### Check npm Version

```bash
npm --version
# Should be 8.x.x or higher
```

---

### Check MongoDB Status

```bash
# Mac
brew services list | grep mongodb

# Windows
sc query MongoDB

# Linux
systemctl status mongod
```

---

### Check Running Processes

```bash
# Backend (port 5000)
lsof -i :5000        # Mac/Linux
netstat -ano | findstr :5000    # Windows

# Frontend (port 3000)
lsof -i :3000        # Mac/Linux
netstat -ano | findstr :3000    # Windows
```

---

## 💡 Pro Tips

### Run Backend in Background

**Mac/Linux:**
```bash
cd backend
nohup npm run dev > backend.log 2>&1 &
```

**Check log:**
```bash
tail -f backend.log
```

**Kill process:**
```bash
pkill -f "node server.js"
```

---

### Auto-restart on File Change

Backend already uses `nodemon` for auto-restart.

Frontend uses Next.js hot-reload automatically.

---

### View Real-time Logs

**Backend:**
Terminal output shows all API requests

**Frontend:**
Browser console shows client-side logs

---

## 🆘 Emergency Commands

### Complete Reset

```bash
# 1. Stop all servers (Ctrl+C in terminals)

# 2. Clear everything
cd backend
rm -rf node_modules package-lock.json
cd ../frontend
rm -rf node_modules package-lock.json .next

# 3. Reinstall
cd ../backend && npm install
cd ../frontend && npm install

# 4. Reseed database
cd ../backend
node seed.js
node seed-coupons.js

# 5. Restart servers
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

---

## 📞 Need Help?

If commands aren't working:

1. Check you're in the correct directory (`pwd` or `cd`)
2. Check Node.js is installed (`node --version`)
3. Check MongoDB is running
4. Check ports 3000 and 5000 are free
5. Read error messages carefully
6. Check `.env` files are configured

---

## ✅ Quick Reference

| Action | Command |
|--------|---------|
| **Install All** | `npm run install-all` (from root) |
| **Seed Products** | `node seed.js` (from backend) |
| **Seed Coupons** | `node seed-coupons.js` (from backend) |
| **Start Backend** | `npm run dev` (from backend) |
| **Start Frontend** | `npm run dev` (from frontend) |
| **Stop Server** | `Ctrl + C` in terminal |
| **Clear Cache** | Delete `.next/` folder |
| **Reset DB** | Run seed scripts again |
| **View Logs** | Check terminal output |

---

**That's it! You're ready to build and test the complete RAVYA ecommerce platform!** 🎉🛒💳

