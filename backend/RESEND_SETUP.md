# 📧 Resend Email Setup Guide

Complete guide to set up Resend for RAVYA email notifications.

---

## 🚀 Why Resend?

- ✅ **3,000 emails/month FREE** (perfect for startup!)
- ✅ **No IP blocking** (works on all cloud providers)
- ✅ **99%+ delivery rate** (best in class)
- ✅ **Developer-friendly** (simple API)
- ✅ **Fast & reliable** (built for modern apps)
- ✅ **No timeout issues** (unlike Gmail SMTP)

---

## 📋 Step 1: Create Resend Account (3 mins)

1. **Go to:** https://resend.com/signup
2. **Sign up** with your email (use: ravya.health@gmail.com)
3. **Verify email** (check inbox)
4. **Complete onboarding** (skip if not needed)

---

## 🔑 Step 2: Get API Key (2 mins)

1. **Go to:** https://resend.com/api-keys
2. Click **Create API Key**
3. **Name:** `RAVYA Backend`
4. **Permissions:** Select **Sending access**
5. Click **Add**
6. **COPY THE API KEY** (shows only once!)
   ```
   Example: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
7. **SAVE IT SECURELY!** 🔒

---

## ✉️ Step 3: Add Domain (5 mins)

**Option 1: Use Default Domain (Quick Start)**

Resend provides a default domain for testing:
- ✅ Works immediately
- ✅ No verification needed
- ✅ Perfect for testing
- ⚠️ From address: `onboarding@resend.dev`

**Option 2: Add Your Domain (Production)**

1. **Go to:** https://resend.com/domains
2. Click **Add Domain**
3. **Domain:** `ravyahealth.in` (or your domain)
4. **Copy DNS records** shown
5. **Add to GoDaddy DNS:**
   ```
   Type: TXT
   Name: @
   Value: [Resend verification code]
   
   Type: MX
   Name: @
   Value: feedback-smtp.resend.com
   Priority: 10
   ```
6. **Wait for verification** (5-30 minutes)
7. ✅ **Verified!**

---

## 🔐 Step 4: Add API Key to Render (2 mins)

1. **Go to:** Render Dashboard → ravya-backend
2. Click **Environment** tab
3. **Add new variable:**
   ```
   Key: RESEND_API_KEY
   Value: re_your-actual-api-key-here
   ```
4. **Keep existing:**
   ```
   EMAIL_USER=ravya.health@gmail.com
   ```
   (Used as display name)
5. Click **Save Changes**
6. **Wait for redeploy** (3-5 minutes)

---

## 🧪 Step 5: Test Email (1 min)

**After redeploy:**

1. **Visit:** https://ravya-3n1w.onrender.com/api/test-email
2. **Should see:**
   ```json
   {
     "success": true,
     "message": "Test email sent successfully!",
     "sentTo": "ravya.health@gmail.com"
   }
   ```
3. **Check email inbox** - Email should arrive! ✅

---

## ✅ Step 6: Test Full Flow

1. **Place test order** on website
2. **Check customer email** (if provided)
3. **Check admin email:** ravya.health@gmail.com
4. **Both should arrive!** ✅

---

## 📊 Resend Dashboard

**Monitor emails:**
- Go to: https://resend.com/emails
- See all sent emails
- Check delivery status
- View analytics

**Free Tier Limits:**
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ Full API access
- ✅ Email analytics
- ✅ Webhooks support

---

## 🚨 Troubleshooting

### **Error: "RESEND_API_KEY not configured"**
**Fix:** Add API key to Render environment variables

### **Error: "Unauthorized"**
**Fix:** Check API key is correct (starts with `re_`)

### **Error: "Domain not verified"**
**Fix:** 
- Use default domain for testing: `onboarding@resend.dev`
- Or verify your domain in Resend dashboard

### **Emails not arriving**
**Check:**
1. Resend Dashboard → Emails (see delivery status)
2. Check spam folder
3. Verify domain is verified (if using custom domain)

---

## 💰 Pricing

**Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for startup! ✅

**Paid Plans:**
- $20/month = 50,000 emails
- Only needed when you scale!

---

## 🎯 What's Changed?

**Before (Gmail SMTP):**
- ❌ Connection timeout on Render
- ❌ IP blocking issues
- ❌ Unreliable

**After (Resend):**
- ✅ 100% reliable
- ✅ No timeout issues
- ✅ Better delivery (99%+)
- ✅ 3,000 emails/month FREE
- ✅ Simple API

---

## 📝 Environment Variables Summary

**Render Environment:**
```env
RESEND_API_KEY=re_your-api-key-here
EMAIL_USER=ravya.health@gmail.com
```

**That's it!** No EMAIL_PASSWORD needed anymore! ✅

---

## 🚀 After Setup:

1. ✅ Resend account created
2. ✅ API key generated
3. ✅ API key added to Render
4. ✅ Test email sent successfully
5. ✅ Production emails working!

---

## 💡 Pro Tips:

### **Use Default Domain for Quick Start:**
```
From: onboarding@resend.dev
```
Works immediately, no verification needed!

### **Add Custom Domain Later:**
When ready for production, add `ravyahealth.in` domain for professional emails.

### **Monitor Usage:**
Check Resend dashboard regularly to track email usage and delivery rates.

---

**Setup complete! Emails will work perfectly now!** 📧✨

**Resend is faster, simpler, and more reliable than Gmail SMTP!** 🚀


