# ✅ Pre-Deployment Checklist

Complete this checklist before deploying RAVYA to production.

---

## 📦 Code Preparation

### Backend Files
- [x] `backend/server.js` - Keep-alive mechanism added
- [x] `backend/render.yaml` - Render configuration ready
- [x] `backend/.gitignore` - Environment files excluded
- [x] `backend/.env` - Has all required variables (don't commit!)
- [x] `backend/seed.js` - Database seeding script ready
- [x] `backend/seed-coupons.js` - Coupon seeding ready
- [x] All routes tested locally
- [x] Email service configured (Gmail)
- [x] MongoDB connection tested

### Frontend Files
- [x] `frontend/vercel.json` - Vercel configuration ready
- [x] `frontend/public/` - All images present
- [x] `frontend/.gitignore` - Environment files excluded
- [x] All components working locally
- [x] No console errors in browser
- [x] Mobile responsive tested

---

## 🌐 Third-Party Accounts Setup

### 1. MongoDB Atlas
- [ ] Account created: https://www.mongodb.com/cloud/atlas
- [ ] Free cluster created
- [ ] Database user created (username: ravya_admin)
- [ ] Password saved securely
- [ ] IP whitelist: 0.0.0.0/0
- [ ] Connection string copied

### 2. Vercel
- [ ] Account created: https://vercel.com
- [ ] GitHub connected
- [ ] Ready to import repository

### 3. Render
- [ ] Account created: https://render.com
- [ ] GitHub connected
- [ ] Ready to create web service

### 4. Gmail (Email Service)
- [x] Email: ravya.health@gmail.com
- [x] App password generated
- [x] Credentials ready

### 5. Razorpay (Payment Gateway)
- [x] Test keys available
- [x] Currently in Idea Stage (payment disabled)
- [ ] (Future) KYC completed for live keys

---

## 📝 Environment Variables Prepared

### Frontend (for Vercel)
```
NEXT_PUBLIC_API_URL = _________________________________
                      (Fill after deploying backend)
```

### Backend (for Render)
```
NODE_ENV            = production ✅
PORT                = 5000 ✅
MONGODB_URI         = _________________________________
FRONTEND_URL        = _________________________________
BACKEND_URL         = _________________________________
EMAIL_USER          = ravya.health@gmail.com ✅
EMAIL_PASSWORD      = efntusitdyuhmchx ✅
RAZORPAY_KEY_ID     = rzp_test_Rr5DyvaUQHSXTv ✅
RAZORPAY_KEY_SECRET = ceLT7Vr9s9P6BAiYafW2wGG3 ✅
```

---

## 🧪 Local Testing Complete

### Backend Tests
- [ ] Server starts: `cd backend && node server.js`
- [ ] Health check: http://localhost:5000/api/health
- [ ] Database connected
- [ ] Products API working: http://localhost:5000/api/products
- [ ] All routes responding
- [ ] No console errors

### Frontend Tests
- [ ] App starts: `cd frontend && npm run dev`
- [ ] Home page loads
- [ ] Products display correctly
- [ ] All images visible
- [ ] Login works (phone + name)
- [ ] Cart functionality works
- [ ] Checkout flow completes
- [ ] Thank you page displays
- [ ] No browser console errors

### Full Integration Test
- [ ] Frontend connects to local backend
- [ ] Can place test order
- [ ] Email received (customer)
- [ ] Email received (admin: ravya.health@gmail.com)
- [ ] Cart clears after order
- [ ] Database updated with order

---

## 🚀 Git Repository Ready

### Code Pushed to GitHub
- [ ] Git repository created
- [ ] All code committed
- [ ] `.env` files NOT committed (in .gitignore)
- [ ] Pushed to GitHub
- [ ] Repository is public or connected to Vercel/Render

### Commands to push:
```bash
cd F:\Startup\Ravya
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ravya.git
git push -u origin main
```

---

## 📱 Deployment Order

**Follow this exact order:**

### Step 1: MongoDB (5 mins)
- [ ] Create cluster
- [ ] Setup user & network access
- [ ] Get connection string
- [ ] Test connection locally

### Step 2: Backend on Render (10 mins)
- [ ] Create web service
- [ ] Connect GitHub repo
- [ ] Configure settings (root: backend)
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Wait for deployment to complete
- [ ] Copy backend URL
- [ ] Test health endpoint
- [ ] Seed database (Shell or local)

### Step 3: Frontend on Vercel (5 mins)
- [ ] Import GitHub repository
- [ ] Configure settings (root: frontend)
- [ ] Add environment variable (NEXT_PUBLIC_API_URL)
- [ ] Deploy
- [ ] Wait for deployment to complete
- [ ] Copy frontend URL

### Step 4: Update Cross-References (2 mins)
- [ ] Update Vercel env: NEXT_PUBLIC_API_URL with Render URL
- [ ] Redeploy frontend
- [ ] Update Render env: FRONTEND_URL with Vercel URL
- [ ] Let Render auto-redeploy

---

## ✅ Post-Deployment Verification

### Backend Checks
- [ ] Health endpoint: https://YOUR-BACKEND.onrender.com/api/health
- [ ] Products API: https://YOUR-BACKEND.onrender.com/api/products
- [ ] Returns 3 products
- [ ] Keep-alive logs visible in Render logs

### Frontend Checks
- [ ] Website loads: https://YOUR-FRONTEND.vercel.app
- [ ] All images display correctly
- [ ] Products load from backend
- [ ] No CORS errors in console
- [ ] Mobile view works

### Full Flow Test
1. [ ] Visit website
2. [ ] Click "Shop All Drinks"
3. [ ] Login (phone: 9999999999, name: Test User)
4. [ ] Add product to cart
5. [ ] Go to checkout
6. [ ] Fill delivery details (use real email for testing)
7. [ ] Place order
8. [ ] See thank you page with idea stage message
9. [ ] Check email (customer confirmation)
10. [ ] Check email (admin notification at ravya.health@gmail.com)
11. [ ] Verify order in database (Render Shell or MongoDB Atlas)

---

## 🔄 Keep-Alive Verification

### After 15 Minutes
- [ ] Visit backend URL again
- [ ] Should respond instantly (not wake from sleep)
- [ ] Check Render logs for self-ping entries
- [ ] Logs show: "✅ Self-ping successful: 200"

### Optional External Cron
- [ ] Setup cron-job.org
- [ ] Configure to ping every 10 minutes
- [ ] Verify cron job runs successfully

---

## 🐛 Troubleshooting Prepared

### Common Issues & Solutions
- [ ] Know how to check Vercel logs
- [ ] Know how to check Render logs
- [ ] Know how to check MongoDB Atlas metrics
- [ ] Have backup of all environment variables
- [ ] Can redeploy quickly if needed

---

## 📋 Documentation Review

- [ ] Read `DEPLOYMENT_GUIDE.md`
- [ ] Read `ENV_VARIABLES_GUIDE.md`
- [ ] Read `QUICK_DEPLOY.md`
- [ ] Understand keep-alive mechanism
- [ ] Know how to update environment variables

---

## 🎉 Ready to Deploy!

Once all checkboxes are marked:
1. ✅ Follow DEPLOYMENT_GUIDE.md step-by-step
2. ✅ Use QUICK_DEPLOY.md for quick reference
3. ✅ Refer to ENV_VARIABLES_GUIDE.md for variable details

---

## 💰 Cost Estimate

Current setup: **$0/month** (FREE) ✅
- Vercel: Free forever
- Render: Free tier
- MongoDB Atlas: Free tier (512MB)
- Gmail: Free
- Domain: $0 (using Vercel subdomain)

**Total: FREE!** 🎉

Optional upgrades:
- Render Pro: $7/month (no sleep, better performance)
- Custom domain: $10-15/year
- MongoDB paid: $9/month (more storage)

---

## 🚀 Post-Launch

After successful deployment:
- [ ] Save all URLs (frontend, backend, database)
- [ ] Test from multiple devices
- [ ] Share with friends/testers
- [ ] Monitor Render logs for errors
- [ ] Check email notifications working
- [ ] Prepare for scaling if needed

---

## 📞 Support

Issues during deployment?
- Check troubleshooting sections in guides
- Review Vercel/Render logs
- Verify environment variables
- Test each service independently

---

**Ready? Let's deploy! 🚀**

