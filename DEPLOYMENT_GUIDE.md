# 🚀 RAVYA Deployment Guide

Complete step-by-step guide to deploy RAVYA on Vercel (Frontend) and Render (Backend).

---

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Vercel account (free): https://vercel.com
- ✅ Render account (free): https://render.com
- ✅ MongoDB Atlas account (free): https://www.mongodb.com/cloud/atlas

---

## 🗂️ Part 1: Setup MongoDB Atlas

### Step 1: Create Database
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create a **Free Shared Cluster**
4. Choose **AWS** as provider
5. Choose region closest to you
6. Click **Create Cluster**

### Step 2: Setup Database Access
1. Click **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `ravya_admin`
5. Password: (generate strong password) - **SAVE THIS!**
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### Step 3: Setup Network Access
1. Click **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### Step 4: Get Connection String
1. Click **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Click **Connect your application**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://ravya_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. **SAVE THIS CONNECTION STRING!**

---

## 🎨 Part 2: Deploy Frontend on Vercel

### Step 1: Push Code to GitHub
```bash
# If not already done
cd F:\Startup\Ravya
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ravya.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Step 3: Set Environment Variables
Click **Environment Variables** and add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```
*(You'll update this after deploying backend)*

### Step 4: Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://ravya-xxx.vercel.app`
4. **SAVE THIS URL!**

---

## ⚙️ Part 3: Deploy Backend on Render

### Step 1: Prepare Backend for Deployment
Your backend is already configured! Just push to GitHub if not done.

### Step 2: Create Web Service on Render
1. Go to https://render.com
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure service:
   - **Name:** `ravya-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`

### Step 3: Set Environment Variables
Click **Environment** tab and add these variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://ravya_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ravya?retryWrites=true&w=majority
FRONTEND_URL=https://ravya-xxx.vercel.app
BACKEND_URL=https://ravya-backend.onrender.com
EMAIL_USER=ravya.health@gmail.com
EMAIL_PASSWORD=efntusitdyuhmchx
RAZORPAY_KEY_ID=rzp_test_Rr5DyvaUQHSXTv
RAZORPAY_KEY_SECRET=ceLT7Vr9s9P6BAiYafW2wGG3
```

**Important:**
- Replace `YOUR_PASSWORD` with your MongoDB password
- Replace `https://ravya-xxx.vercel.app` with your actual Vercel URL
- Replace `https://ravya-backend.onrender.com` with your actual Render URL (you'll get this after deployment)

### Step 4: Deploy
1. Click **Create Web Service**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://ravya-backend.onrender.com`
4. **SAVE THIS URL!**

### Step 5: Test Backend
Visit: `https://ravya-backend.onrender.com/api/health`

You should see:
```json
{"success": true, "message": "RAVYA API is running"}
```

---

## 🔗 Part 4: Connect Frontend to Backend

### Step 1: Update Vercel Environment Variable
1. Go to Vercel Dashboard
2. Click your project → **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_API_URL`:
   ```
   NEXT_PUBLIC_API_URL=https://ravya-backend.onrender.com
   ```
4. Click **Save**

### Step 2: Redeploy Frontend
1. Go to **Deployments** tab
2. Click on latest deployment
3. Click **⋯** → **Redeploy**
4. Wait 2-3 minutes

### Step 3: Update Backend CORS
1. Go to Render Dashboard
2. Click **ravya-backend** → **Environment**
3. Update `FRONTEND_URL` with your actual Vercel URL
4. Click **Save Changes**
5. Service will auto-redeploy

---

## 🌱 Part 5: Seed Database (IMPORTANT!)

After backend is deployed, seed your database with products:

### Option 1: Using Render Shell
1. Go to Render Dashboard → **ravya-backend**
2. Click **Shell** tab
3. Run:
   ```bash
   node seed.js
   node seed-coupons.js
   ```

### Option 2: Using Local Terminal
1. Update `backend/.env` with production MongoDB URI
2. Run locally:
   ```bash
   cd backend
   node seed.js
   node seed-coupons.js
   ```

You should see:
```
✅ Database seeded successfully!
✅ 3 products added
✅ 5 reviews added
✅ Coupons seeded successfully!
```

---

## 🔄 Part 6: Fix Render Sleep Issue

**Problem:** Render free tier sleeps after 15 minutes of inactivity.

**Solution Already Implemented:** ✅
- Self-ping mechanism added to `server.js`
- Pings itself every 10 minutes
- Keeps server awake automatically

**Additional Solution (External Cron):**
Use cron-job.org for external pinging:

1. Go to https://cron-job.org (free)
2. Create account
3. Create new cron job:
   - **Title:** RAVYA Keep Alive
   - **URL:** `https://ravya-backend.onrender.com/api/health`
   - **Schedule:** Every 10 minutes
   - **HTTP method:** GET
4. Save and enable

---

## ✅ Part 7: Final Checks

### Test Frontend
Visit: `https://ravya-xxx.vercel.app`

Should see:
- ✅ Hero section with banner
- ✅ Products loading
- ✅ All images visible
- ✅ No console errors

### Test Backend APIs
```bash
# Health check
curl https://ravya-backend.onrender.com/api/health

# Products
curl https://ravya-backend.onrender.com/api/products

# Should return 3 products
```

### Test Full Flow
1. ✅ Visit website
2. ✅ Click "Shop All Drinks"
3. ✅ Login (phone + name)
4. ✅ Add item to cart
5. ✅ Checkout
6. ✅ Fill delivery details
7. ✅ Place order
8. ✅ See thank you page
9. ✅ Check email (customer + admin)

---

## 📝 Environment Variables Summary

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://ravya-backend.onrender.com
```

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://ravya_admin:PASSWORD@cluster.mongodb.net/ravya
FRONTEND_URL=https://ravya-xxx.vercel.app
BACKEND_URL=https://ravya-backend.onrender.com
EMAIL_USER=ravya.health@gmail.com
EMAIL_PASSWORD=efntusitdyuhmchx
RAZORPAY_KEY_ID=rzp_test_Rr5DyvaUQHSXTv
RAZORPAY_KEY_SECRET=ceLT7Vr9s9P6BAiYafW2wGG3
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem:** "Failed to fetch products"
- ✅ Check `NEXT_PUBLIC_API_URL` is correct
- ✅ Redeploy frontend after env change
- ✅ Check browser console for errors

**Problem:** Images not loading
- ✅ All images in `frontend/public` folder?
- ✅ Paths use `/image.png` format?
- ✅ Check Vercel build logs

### Backend Issues

**Problem:** "Database connection failed"
- ✅ Check MongoDB URI is correct
- ✅ Password has no special characters unescaped
- ✅ IP whitelist is 0.0.0.0/0

**Problem:** "CORS error"
- ✅ Check `FRONTEND_URL` in backend env
- ✅ Update with exact Vercel URL (no trailing slash)
- ✅ Redeploy backend

**Problem:** Server sleeping after 15 mins
- ✅ Self-ping is enabled (already in code)
- ✅ Setup external cron job (cron-job.org)
- ✅ Upgrade to paid Render plan ($7/month)

---

## 🚀 Deployment Complete!

Your RAVYA app is now live:
- **Frontend:** https://ravya-xxx.vercel.app
- **Backend:** https://ravya-backend.onrender.com
- **Keep-alive:** Automatic ✅
- **Email notifications:** Working ✅
- **Order flow:** Idea stage mode ✅

---

## 📱 Share Your Site

Website URL format:
```
https://ravya.vercel.app
```

Custom domain (optional):
1. Buy domain (GoDaddy, Namecheap)
2. Add to Vercel: Settings → Domains
3. Update DNS records
4. Done! (ravya.com)

---

## 💰 Costs

Current setup: **FREE** ✅
- Vercel: Free forever (hobby plan)
- Render: Free tier (with 15-min sleep, but we fixed it)
- MongoDB Atlas: Free tier (512MB)

Upgrade options:
- Render Pro: $7/month (no sleep, better performance)
- Vercel Pro: $20/month (analytics, more bandwidth)
- MongoDB: $9/month (more storage)

---

Need help? Issues? Let me know! 🙌

