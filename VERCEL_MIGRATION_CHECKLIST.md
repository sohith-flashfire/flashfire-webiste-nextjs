# 🚀 Vercel Migration Checklist - Flashfire Next.js Project

## 📋 Pre-Deployment Checklist

### 1. ✅ Environment Variables Setup
**In Vercel Dashboard → Project Settings → Environment Variables:**

Add these environment variables (same as old project):
```
NEXT_PUBLIC_API_BASE_URL=https://api.flashfirejobs.com
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Backend Environment Variables (if needed):**
- Check your backend `.env` file and ensure all required variables are set in Vercel

### 2. ✅ Domain Configuration
**In Vercel Dashboard → Project Settings → Domains:**

1. **Add Domain:**
   - Primary: `www.flashfirejobs.com`
   - Also add: `flashfirejobs.com` (without www)

2. **DNS Settings (if managing DNS):**
   - Ensure DNS records point to Vercel:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
   - For root domain (flashfirejobs.com):
     - Type: `A`
     - Value: Vercel's IP (check Vercel dashboard)

3. **SSL Certificate:**
   - Vercel automatically provisions SSL certificates
   - Ensure "Force HTTPS" is enabled

### 3. ✅ SEO Files (Already Created)
- ✅ `public/robots.txt` - Created
- ✅ `app/sitemap.ts` - Created (Next.js will generate `/sitemap.xml` automatically)
- ✅ `app/layout.tsx` - Has all meta tags, Open Graph, Twitter Cards

### 4. ✅ Analytics Verification

**Google Analytics:**
- ✅ Already added in `layout.tsx` with ID: `G-4P890VGD8D`
- Verify tracking works after deployment

**PostHog:**
- ✅ Already configured in `PostHogProvider.tsx`
- Ensure `NEXT_PUBLIC_POSTHOG_KEY` is set in Vercel

**Freshworks CRM:**
- ✅ Already added in `layout.tsx`

### 5. ✅ Route Verification

**Ensure all routes match old site:**
- `/` - Home page ✅
- `/pricing` - Pricing page ✅
- `/blogs` - Blogs listing ✅
- `/blog/[slug]` - Individual blog posts ✅
- `/faq` - FAQ page ✅
- `/feature` - Features page ✅
- `/testimonials` - Testimonials ✅
- `/employers` - Employers page ✅
- `/contact-us` - Contact page ✅
- `/privacy-policy` - Privacy policy ✅
- `/terms-of-service` - Terms of service ✅
- `/refund-policy` - Refund policy ✅
- `/payment-policy` - Payment policy ✅
- `/en-ca` - Canada home page ✅
- `/en-ca/*` - Canada routes ✅

### 6. ✅ Build Configuration

**In Vercel Dashboard → Project Settings → General:**

1. **Framework Preset:** Next.js (auto-detected)
2. **Build Command:** `npm run build` (default)
3. **Output Directory:** `.next` (default)
4. **Install Command:** `npm install` (default)
5. **Root Directory:** Leave empty (or set if project is in subfolder)

### 7. ✅ Performance Optimization

**Next.js Config (`next.config.ts`):**
- ✅ Image optimization configured
- ✅ Remote patterns set for external images

**Check:**
- [ ] Enable Vercel Analytics (optional but recommended)
- [ ] Enable Vercel Speed Insights (optional but recommended)

---

## 🚀 Deployment Steps

### Step 1: Connect Repository to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Select the `flashfire-webiste-frontend-nextjs-main` project

### Step 2: Configure Project
1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** Leave empty (or `flashfire-webiste-frontend-nextjs-main` if needed)
3. **Build Command:** `npm run build`
4. **Output Directory:** `.next` (default)

### Step 3: Add Environment Variables
1. Go to Project Settings → Environment Variables
2. Add all required variables (see section 1 above)
3. Add for: Production, Preview, and Development

### Step 4: Add Domain
1. Go to Project Settings → Domains
2. Add `www.flashfirejobs.com`
3. Add `flashfirejobs.com` (root domain)
4. Follow DNS instructions if needed

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Test the deployment URL first

### Step 6: Test Before Going Live
**Test these URLs:**
- [ ] `https://your-deployment-url.vercel.app/` - Home page
- [ ] `https://your-deployment-url.vercel.app/pricing` - Pricing
- [ ] `https://your-deployment-url.vercel.app/blogs` - Blogs
- [ ] `https://your-deployment-url.vercel.app/en-ca` - Canada page
- [ ] Check Google Analytics is tracking
- [ ] Check PostHog is tracking
- [ ] Check all forms work
- [ ] Check Calendly modal works
- [ ] Check mobile responsiveness

### Step 7: Switch DNS (When Ready)
1. **Option A: Keep old site running temporarily**
   - Deploy new site to a different Vercel project
   - Test thoroughly
   - Then switch DNS

2. **Option B: Direct switch**
   - Point DNS to new Vercel project
   - Old site will stop working immediately

**Recommended: Option A for zero downtime**

---

## 🔍 Post-Deployment Verification

### 1. SEO Checks
- [ ] Verify `robots.txt` is accessible: `https://www.flashfirejobs.com/robots.txt`
- [ ] Verify `sitemap.xml` is accessible: `https://www.flashfirejobs.com/sitemap.xml`
- [ ] Check Google Search Console for crawl errors
- [ ] Verify meta tags in page source (View → Developer → View Source)
- [ ] Test Open Graph tags: [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Cards: [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 2. Analytics Verification
- [ ] Google Analytics: Check real-time reports
- [ ] PostHog: Check events are being tracked
- [ ] Freshworks: Verify widget loads

### 3. Performance Checks
- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Check Core Web Vitals
- [ ] Test page load speed
- [ ] Verify images are optimized

### 4. Functionality Checks
- [ ] All forms submit correctly
- [ ] Calendly booking works
- [ ] UTM parameters are captured
- [ ] Country detection works (Canada redirect)
- [ ] All internal links work
- [ ] Mobile navigation works
- [ ] All buttons/CTAs work

### 5. Google Search Console
1. **Submit new sitemap:**
   - Go to Google Search Console
   - Sitemaps → Add new sitemap
   - Enter: `https://www.flashfirejobs.com/sitemap.xml`

2. **Request re-indexing:**
   - Go to URL Inspection
   - Enter homepage URL
   - Click "Request Indexing"

3. **Monitor:**
   - Check for crawl errors
   - Monitor indexing status
   - Check for any warnings

---

## 🔄 Migration Strategy (Zero Downtime)

### Option 1: Blue-Green Deployment (Recommended)
1. Deploy new Next.js site to a NEW Vercel project
2. Test thoroughly on the new deployment URL
3. Once verified, switch DNS to point to new project
4. Keep old project running for 24-48 hours as backup
5. Monitor for any issues
6. Delete old project after confirming everything works

### Option 2: Direct Replacement
1. Rename old Vercel project (add `-old` suffix)
2. Deploy new Next.js site with same project name
3. DNS will automatically point to new deployment
4. Monitor closely for first 24 hours

---

## ⚠️ Important Notes

### 1. **URL Structure**
- Ensure all URLs match the old site exactly
- Check for any trailing slashes differences
- Verify case sensitivity (URLs should be lowercase)

### 2. **Canonical URLs**
- Already set in `layout.tsx` metadata
- Ensure all pages have correct canonical URLs

### 3. **301 Redirects (if needed)**
If you have any old URLs that changed, add redirects in `next.config.ts`:
```typescript
async redirects() {
  return [
    {
      source: '/old-url',
      destination: '/new-url',
      permanent: true, // 301 redirect
    },
  ]
}
```

### 4. **Backend API**
- Ensure backend is running and accessible
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct
- Test API endpoints are working

### 5. **Monitoring**
- Set up Vercel monitoring/alerts
- Monitor error logs in Vercel dashboard
- Set up uptime monitoring (optional)

---

## 📊 Success Metrics to Monitor

After deployment, monitor for 1-2 weeks:
- [ ] Google Search Console: No increase in crawl errors
- [ ] Google Analytics: Traffic levels maintained
- [ ] Page load times: Same or better
- [ ] Conversion rates: Same or better
- [ ] Bounce rates: Same or lower
- [ ] Search rankings: No drop in positions

---

## 🆘 Rollback Plan

If something goes wrong:
1. **Quick Rollback:**
   - In Vercel Dashboard → Deployments
   - Find previous working deployment
   - Click "..." → "Promote to Production"

2. **DNS Rollback:**
   - Point DNS back to old Vercel project
   - This may take a few minutes to propagate

3. **Emergency:**
   - Keep old project running for at least 48 hours
   - Don't delete until you're 100% confident

---

## ✅ Final Checklist Before Going Live

- [ ] All environment variables set
- [ ] Domain configured in Vercel
- [ ] DNS records updated (if needed)
- [ ] Test deployment on preview URL
- [ ] All pages load correctly
- [ ] Analytics tracking verified
- [ ] Forms and CTAs work
- [ ] Mobile responsive
- [ ] SEO files accessible (robots.txt, sitemap.xml)
- [ ] Google Search Console updated
- [ ] Backup/rollback plan ready
- [ ] Team notified of deployment

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Google Search Console:** https://search.google.com/search-console
- **Vercel Support:** support@vercel.com

---

**Last Updated:** [Current Date]
**Status:** Ready for Deployment ✅

