# 🚀 Quick Start Guide - Vercel Deployment

## ✅ What's Already Done

1. **SEO Files Created:**
   - ✅ `public/robots.txt` - Tells search engines what to crawl
   - ✅ `app/sitemap.ts` - Auto-generates `/sitemap.xml` for Google

2. **Analytics Configured:**
   - ✅ Google Analytics (G-4P890VGD8D) in `layout.tsx`
   - ✅ PostHog tracking in `PostHogProvider.tsx`
   - ✅ Freshworks CRM widget in `layout.tsx`

3. **SEO Meta Tags:**
   - ✅ Complete Open Graph tags
   - ✅ Twitter Card tags
   - ✅ Canonical URLs
   - ✅ All favicons

## 🎯 What You Need to Do

### Step 1: Push to Git Repository
```bash
cd flashfire-webiste-frontend-nextjs-main
git add .
git commit -m "Ready for Vercel deployment"
git push
```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click "Add New Project"**
3. **Import your Git repository**
4. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: Leave empty
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_API_BASE_URL=https://api.flashfirejobs.com
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Add for:** Production, Preview, Development

### Step 4: Add Domain

1. Go to **Project Settings → Domains**
2. Add: `www.flashfirejobs.com`
3. Add: `flashfirejobs.com`
4. Follow DNS instructions (if needed)

### Step 5: Deploy & Test

1. Click **"Deploy"**
2. Wait for build to complete
3. **Test the preview URL first** before switching DNS
4. Verify:
   - ✅ All pages load
   - ✅ Analytics tracking works
   - ✅ Forms work
   - ✅ Mobile responsive

### Step 6: Switch DNS (When Ready)

**Option A (Recommended - Zero Downtime):**
1. Deploy to a NEW Vercel project first
2. Test thoroughly
3. Then switch DNS to new project
4. Keep old project as backup for 24-48 hours

**Option B (Direct Switch):**
1. Point DNS to new Vercel project
2. Old site stops immediately

### Step 7: Post-Deployment

1. **Google Search Console:**
   - Submit new sitemap: `https://www.flashfirejobs.com/sitemap.xml`
   - Request re-indexing of homepage

2. **Verify:**
   - Check `https://www.flashfirejobs.com/robots.txt`
   - Check `https://www.flashfirejobs.com/sitemap.xml`
   - Test Open Graph: [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - Check Google Analytics real-time reports

## 📋 Full Checklist

See `VERCEL_MIGRATION_CHECKLIST.md` for complete detailed checklist.

## ⚠️ Important Notes

1. **Don't delete old Vercel project** until new one is confirmed working
2. **Monitor for 24-48 hours** after DNS switch
3. **Keep same URLs** - all routes match old site
4. **Test everything** on preview URL before going live

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Vercel Support:** support@vercel.com

---

**You're all set! 🎉**

