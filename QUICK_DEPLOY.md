# ⚡ Quick Deploy Commands

Fast reference for deploying RAVYA.

---

## 🚀 Deploy in 3 Steps

### Step 1: MongoDB Setup (5 mins)
```
1. Create free cluster: https://www.mongodb.com/cloud/atlas
2. Create database user: ravya_admin
3. Whitelist IP: 0.0.0.0/0
4. Copy connection string
```

### Step 2: Deploy Backend on Render (5 mins)
```
1. Go to: https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - Root: backend
   - Build: npm install
   - Start: node server.js
5. Add environment variables (see ENV_VARIABLES_GUIDE.md)
6. Deploy!
7. Copy URL: https://ravya-backend.onrender.com
```

### Step 3: Deploy Frontend on Vercel (3 mins)
```
1. Go to: https://vercel.com
2. Import GitHub repo
3. Settings:
   - Root: frontend
   - Framework: Next.js
4. Add env variable:
   NEXT_PUBLIC_API_URL=https://ravya-backend.onrender.com
5. Deploy!
```

---

## 🌱 Seed Database (Important!)

After backend is deployed:

### Option 1: Render Shell
```bash
# On Render Dashboard → Shell tab
node seed.js
node seed-coupons.js
```

### Option 2: Local Terminal
```bash
# Update backend/.env with production MongoDB URI
cd backend
node seed.js
node seed-coupons.js
```

---

## ✅ Test Deployment

### Backend Health Check
```bash
curl https://ravya-backend.onrender.com/api/health
# Should return: {"success": true, "message": "RAVYA API is running"}
```

### Frontend Check
```
Visit: https://ravya-xxx.vercel.app
Should see: Hero section, products, all working!
```

---

## 🔄 Keep-Alive (Prevent Sleep)

### Already Built-in! ✅
- Self-ping mechanism in `server.js`
- Pings every 10 minutes automatically

### Optional: External Cron
```
1. Go to: https://cron-job.org (free)
2. Create job:
   - URL: https://ravya-backend.onrender.com/api/health
   - Interval: Every 10 minutes
```

---

## 🐛 Quick Fixes

### Frontend not connecting to backend?
```bash
# Update Vercel env variable:
NEXT_PUBLIC_API_URL=https://YOUR-ACTUAL-BACKEND-URL.onrender.com

# Then redeploy:
Vercel Dashboard → Deployments → Redeploy
```

### Database connection error?
```bash
# Check MongoDB URI format:
mongodb+srv://username:password@cluster.mongodb.net/ravya

# Verify:
- Password is correct
- IP whitelist is 0.0.0.0/0
- Database name "ravya" is included
```

### CORS error?
```bash
# Update Render env variable:
FRONTEND_URL=https://YOUR-ACTUAL-VERCEL-URL.vercel.app

# Save → Auto redeploys
```

---

## 📱 Your Live URLs

After deployment, save these:

```
Frontend: https://ravya-xxx.vercel.app
Backend:  https://ravya-backend.onrender.com
Database: MongoDB Atlas cluster
```

---

## 📚 Full Guides

- **Complete deployment:** See `DEPLOYMENT_GUIDE.md`
- **Environment variables:** See `ENV_VARIABLES_GUIDE.md`
- **Project overview:** See `README.md`

---

## 🎉 Done!

Your RAVYA app is live and ready for users! 🚀

Test the full flow:
1. Visit website ✅
2. Login with phone/name ✅
3. Add product to cart ✅
4. Checkout & place order ✅
5. See thank you page ✅
6. Check email notifications ✅

---

Need help? Issues? Let me know! 💪

