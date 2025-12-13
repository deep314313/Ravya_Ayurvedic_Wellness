# 🚀 Getting Started with RAVYA

Welcome to your RAVYA Ayurvedic Wellness Drinks ecommerce platform! This guide will help you get up and running in minutes.

---

## ✅ Pre-flight Checklist

Before starting, make sure you have:

- [ ] **Node.js** installed (v16 or higher) - [Download](https://nodejs.org/)
- [ ] **MongoDB** installed OR a MongoDB Atlas account - [Get MongoDB](https://www.mongodb.com/)
- [ ] **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)
- [ ] **Terminal/Command Prompt** access
- [ ] **Internet connection** (for npm packages)

---

## 🎯 Step-by-Step Setup (10 Minutes)

### Step 1: Verify Node.js Installation
Open terminal and run:
```bash
node --version
# Should show v16.x.x or higher

npm --version
# Should show 8.x.x or higher
```

### Step 2: Choose Your MongoDB Option

#### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account
3. Create cluster (free tier: M0)
4. Click "Connect" → "Connect your application"
5. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ravya
   ```
6. Replace `<password>` with your actual password

#### Option B: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows:** `net start MongoDB`
   - **Mac:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`
3. Connection string will be:
   ```
   mongodb://localhost:27017/ravya
   ```

### Step 3: Install Project Dependencies

Open terminal in project root (`F:\Startup\Ravya`) and run:

```bash
# This will install dependencies for both backend and frontend
npm run install-all
```

⏱️ This takes 2-3 minutes. You'll see packages being installed.

### Step 4: Configure Backend Environment

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Create `.env` file:
   - **Windows:** `copy .env.example .env`
   - **Mac/Linux:** `cp .env.example .env`

3. Edit `.env` file with your favorite text editor:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=ravya_secret_key_2024_change_this
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string

### Step 5: Configure Frontend Environment

1. Navigate to frontend folder:
   ```bash
   cd ../frontend
   ```

2. Create `.env.local` file:
   - **Windows:** `copy .env.local.example .env.local`
   - **Mac/Linux:** `cp .env.local.example .env.local`

3. Edit `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Step 6: Seed the Database

Navigate back to backend and seed initial data:

```bash
cd ../backend
node seed.js
```

✅ You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Products seeded successfully
Reviews seeded successfully
Database seeded successfully!
```

### Step 7: Start the Backend Server

From the backend directory:

```bash
npm run dev
```

✅ You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

**Keep this terminal running!**

### Step 8: Start the Frontend (New Terminal)

Open a **NEW terminal window** and navigate to frontend:

```bash
cd F:\Startup\Ravya\frontend
npm run dev
```

✅ You should see:
```
ready - started server on 0.0.0.0:3000
```

**Keep this terminal running too!**

### Step 9: Open Your Browser

Navigate to: **http://localhost:3000**

🎉 **You should now see the RAVYA landing page!**

---

## 🎨 What You'll See

### Hero Section
- Bold headline: "Sip Daily Ayurveda, Straight From the Bottle"
- 3 animated product bottles (Golden, Purple, Red)
- Floating ingredient circles
- Call-to-action buttons

### Scrollable Sections
- Trust badges (Ayurvedic, No Sugar, Cold-Pressed, etc.)
- Brand story with Ayurvedic promise
- 3 product cards (Turmeric, Jamun, Beetroot)
- How it works (3-step guide)
- Educational content
- Customer reviews slider
- FAQ accordion
- Contact form
- Footer with newsletter

---

## 🧪 Testing Your Setup

### Test 1: Backend Health Check
Open browser and go to:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "RAVYA API is running"
}
```

### Test 2: Products API
```
http://localhost:5000/api/products
```

Should return 3 products (Golden Turmeric, Jamun Lemon, Beetroot Heart)

### Test 3: Reviews API
```
http://localhost:5000/api/reviews
```

Should return 4 customer reviews

### Test 4: Frontend Navigation
On http://localhost:3000, try:
- Click navigation menu items (smooth scroll)
- Hover over product cards (animation)
- Click review slider arrows
- Expand FAQ items
- Submit contact form (with test data)
- Submit newsletter signup

---

## 🔧 Troubleshooting Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check if MongoDB service is running
- Verify connection string in `backend/.env`
- For Atlas, check if your IP is whitelisted
- Try connection string with quotes: `MONGODB_URI="mongodb://..."`

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in backend/.env to 5001
PORT=5001

# Update frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Issue: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
# In backend:
cd backend
rm -rf node_modules
npm install

# In frontend:
cd ../frontend
rm -rf node_modules
npm install
```

### Issue: Frontend shows "Failed to fetch products"
**Solution:**
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Test backend API directly in browser

### Issue: "seed.js" fails
**Solution:**
- Ensure MongoDB is connected
- Check MONGODB_URI in backend/.env
- Try deleting the database and re-running seed
- Check if ports are available

### Issue: Styles not loading correctly
**Solution:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Restart Next.js dev server
- Check browser console for CSS errors

---

## 📱 Mobile Testing

To test on your mobile device:

1. Find your computer's local IP address:
   - **Windows:** `ipconfig` (look for IPv4)
   - **Mac/Linux:** `ifconfig` (look for inet)

2. On your phone's browser, navigate to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

3. Make sure phone and computer are on same WiFi network

---

## 🎯 Next Steps

### Immediate Customizations

#### 1. Add Product Images
```bash
# Create images folder
mkdir frontend/public/images

# Add your bottle images:
# - turmeric-bottle.png
# - jamun-bottle.png
# - beetroot-bottle.png
```

Update image paths in `backend/seed.js`

#### 2. Customize Brand Colors
Edit `frontend/styles/globals.css`:
```css
:root {
  --color-turmeric: #F4B942;  /* Change to your yellow */
  --color-jamun: #6B2E7A;     /* Change to your purple */
  --color-beetroot: #C73E4A;  /* Change to your red */
  --color-cream: #FBF8F3;     /* Background color */
}
```

#### 3. Update Content
- Edit product descriptions in `backend/seed.js`
- Update brand story in `frontend/components/Story.js`
- Customize FAQ in `frontend/components/FAQ.js`
- Update contact info in `frontend/components/Contact.js`

#### 4. Add Real Images
Replace placeholders in:
- `frontend/components/Story.js` (lifestyle image)
- `frontend/public/` (add product photos)
- `frontend/components/Hero.js` (update bottle visuals)

---

## 📚 Documentation Guide

Where to find what:

| Need | File | Description |
|------|------|-------------|
| **Quick Setup** | `QUICK_START.md` | 5-minute setup |
| **Detailed Setup** | `SETUP_GUIDE.md` | Step-by-step guide |
| **Features** | `FEATURES.md` | Complete feature list |
| **API Docs** | `README.md` | All API endpoints |
| **Project Overview** | `PROJECT_SUMMARY.md` | Status & overview |
| **File Structure** | `FILE_STRUCTURE.md` | Directory map |
| **This Guide** | `GETTING_STARTED.md` | You are here! |

---

## 🚀 Development Workflow

### Making Changes

1. **Edit Component:**
   ```
   frontend/components/[Component].js
   ```
   Save → Hot reload in browser

2. **Edit Styles:**
   ```
   frontend/styles/[Component].module.css
   ```
   Save → Instant style update

3. **Edit API:**
   ```
   backend/routes/[route].js
   ```
   Save → Server auto-restarts (nodemon)

4. **Edit Database Schema:**
   ```
   backend/models/[Model].js
   ```
   Then re-run: `node seed.js`

### Git Workflow (Once Ready)

```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial RAVYA ecommerce setup"

# Connect to GitHub
git remote add origin YOUR_GITHUB_URL

# Push
git push -u origin main
```

---

## 🌐 Deployment Guide

### Deploy Backend (Railway - Recommended)

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repository
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL=your_vercel_url`
6. Deploy!

Backend will be at: `https://your-app.railway.app`

### Deploy Frontend (Vercel - Recommended)

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Framework: Next.js
5. Root Directory: `frontend`
6. Add environment variable:
   - `NEXT_PUBLIC_API_URL=your_railway_url/api`
7. Deploy!

Frontend will be at: `https://your-app.vercel.app`

---

## 🎓 Learning Resources

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)

### Express & MongoDB
- [Express Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Docs](https://mongoosejs.com/docs/)

### CSS Modules
- [CSS Modules Guide](https://github.com/css-modules/css-modules)

---

## 💡 Pro Tips

### Performance
- ✅ Use Next.js Image component for product images
- ✅ Lazy load components below the fold
- ✅ Enable caching for API responses
- ✅ Compress images before upload

### SEO
- ✅ Add meta descriptions to each section
- ✅ Use semantic HTML
- ✅ Add structured data (JSON-LD)
- ✅ Create sitemap.xml

### Security
- ✅ Never commit .env files
- ✅ Use environment variables
- ✅ Validate all user inputs
- ✅ Sanitize database queries
- ✅ Use HTTPS in production

---

## 📞 Getting Help

### Resources
- 📖 Documentation in project root
- 💬 Create GitHub issue
- 📧 Email: hello@ravya.in

### Community
- Stack Overflow (tag: next.js, express, mongodb)
- Next.js Discord
- MongoDB Community Forums

---

## ✨ Advanced Features (Future)

Want to add more? Here's what you can build next:

- [ ] Shopping cart functionality
- [ ] User authentication & login
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] Order tracking system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Inventory management
- [ ] Product search & filters
- [ ] Customer accounts
- [ ] Subscription model

See `FEATURES.md` for detailed roadmap.

---

## 🎉 Congratulations!

You now have a fully functional, modern ecommerce landing page for RAVYA!

**What you've accomplished:**
✅ Full-stack application running
✅ Backend API with 13 endpoints
✅ Frontend with 11 components
✅ Database with products & reviews
✅ Responsive mobile design
✅ Contact & newsletter forms
✅ Customer review system

**Project Status:** ✅ **Ready for Development & Customization**

---

**Questions?** Check the other documentation files or create an issue.

**Ready to launch?** See deployment guide above.

**Need to customize?** See "Next Steps" section.

---

Built with 💚 for Ayurvedic wellness and modern web development.

**Happy Building! 🚀**

