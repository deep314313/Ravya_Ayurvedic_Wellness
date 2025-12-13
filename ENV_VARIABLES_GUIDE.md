# 🔐 Environment Variables Guide

Complete list of environment variables needed for deployment.

---

## 🎨 Frontend (Vercel)

Add these in **Vercel Dashboard** → **Settings** → **Environment Variables**

```env
NEXT_PUBLIC_API_URL=https://ravya-backend.onrender.com
```

**Important:**
- Replace `ravya-backend` with your actual Render service name
- No trailing slash
- Must start with `NEXT_PUBLIC_` to be accessible in browser

---

## ⚙️ Backend (Render)

Add these in **Render Dashboard** → **Environment** tab

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://ravya_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ravya?retryWrites=true&w=majority

# CORS & URLs
FRONTEND_URL=https://ravya-xxx.vercel.app
BACKEND_URL=https://ravya-backend.onrender.com

# Email Service (Gmail)
EMAIL_USER=ravya.health@gmail.com
EMAIL_PASSWORD=efntusitdyuhmchx

# Payment Gateway (Razorpay Test Keys)
RAZORPAY_KEY_ID=rzp_test_Rr5DyvaUQHSXTv
RAZORPAY_KEY_SECRET=ceLT7Vr9s9P6BAiYafW2wGG3
```

---

## 📝 How to Get Each Variable

### 1. MONGODB_URI
**Source:** MongoDB Atlas

Steps:
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Setup database user with password
3. Get connection string from **Connect** → **Connect your application**
4. Replace `<password>` with actual password
5. Add `/ravya` after `.net` to specify database name

Example:
```
mongodb+srv://ravya_admin:MyP@ssw0rd@cluster0.ab123.mongodb.net/ravya?retryWrites=true&w=majority
```

---

### 2. FRONTEND_URL
**Source:** Vercel deployment

Steps:
1. Deploy frontend on Vercel first
2. Copy the URL from deployment (e.g., `https://ravya-abc123.vercel.app`)
3. Use this URL in backend environment

---

### 3. BACKEND_URL
**Source:** Render deployment

Steps:
1. Deploy backend on Render
2. Copy the URL from Render dashboard (e.g., `https://ravya-backend.onrender.com`)
3. Use this URL in:
   - Backend `BACKEND_URL` variable (for self-ping)
   - Frontend `NEXT_PUBLIC_API_URL` variable

---

### 4. EMAIL_USER & EMAIL_PASSWORD
**Already provided:** ✅
```
EMAIL_USER=ravya.health@gmail.com
EMAIL_PASSWORD=efntusitdyuhmchx
```

**Note:** This is Gmail App Password (not regular password)

To create new app password:
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate new password for "Mail"
5. Use that 16-character password

---

### 5. RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET
**Already provided (Test Mode):** ✅
```
RAZORPAY_KEY_ID=rzp_test_Rr5DyvaUQHSXTv
RAZORPAY_KEY_SECRET=ceLT7Vr9s9P6BAiYafW2wGG3
```

**Note:** Currently commented out (Idea Stage mode)

To get your own keys:
1. Create account at https://razorpay.com
2. Complete KYC (for live keys)
3. Get test keys from Dashboard → Settings → API Keys
4. Use test keys for testing
5. Switch to live keys for production

---

## ✅ Checklist

Before deploying, make sure:

**Frontend:**
- [x] `NEXT_PUBLIC_API_URL` points to Render backend URL

**Backend:**
- [x] `MONGODB_URI` is correct and database is accessible
- [x] `FRONTEND_URL` matches Vercel URL
- [x] `BACKEND_URL` matches Render URL (for keep-alive)
- [x] `EMAIL_USER` and `EMAIL_PASSWORD` are set
- [x] `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set (even if commented out in code)
- [x] `NODE_ENV` is set to `production`
- [x] `PORT` is set to `5000`

---

## 🔄 Updating Environment Variables

### On Vercel:
1. Go to project → **Settings** → **Environment Variables**
2. Edit or add variable
3. Click **Save**
4. Go to **Deployments** → Click **Redeploy** on latest deployment

### On Render:
1. Go to service → **Environment** tab
2. Edit or add variable
3. Click **Save Changes**
4. Service will automatically redeploy

---

## 🚨 Security Best Practices

1. **Never commit `.env` files to Git** ✅ (already in .gitignore)
2. **Use different credentials for production** (when going live)
3. **Rotate API keys periodically**
4. **Use strong passwords** for MongoDB user
5. **Keep email app passwords secure**
6. **Switch Razorpay to live keys** only after KYC completion

---

## 🐛 Common Issues

### Issue: "Cannot connect to database"
**Fix:**
- Check MongoDB URI is correct
- Verify IP whitelist is 0.0.0.0/0
- Ensure password has no unescaped special characters
- Add `/ravya` database name at the end

### Issue: "CORS policy error"
**Fix:**
- Ensure `FRONTEND_URL` in backend matches exact Vercel URL
- No trailing slash in URLs
- Redeploy backend after changing

### Issue: "API calls failing"
**Fix:**
- Check `NEXT_PUBLIC_API_URL` is correct in Vercel
- Redeploy frontend after changing env variables
- Test backend URL directly: `https://your-backend.onrender.com/api/health`

---

Need help? Check DEPLOYMENT_GUIDE.md for full deployment steps! 🚀

