# PostHog Blog Tracking - Complete Guide

## ✅ YES - All Blogs Are Trackable!

Your query will work perfectly because we track blogs in **multiple ways**:

---

## 📊 Blog Tracking Methods

### Method 1: Custom `blog_view` Event (Recommended)
**Event:** `blog_view`

**Properties Tracked:**
- `blog_slug` - Blog URL slug (e.g., "how-to-write-a-resume-that-gets-interviews")
- `blog_id` - Blog post ID
- `blog_title` - Blog title
- `blog_category` - Blog category
- `blog_read_time` - Estimated read time
- `blog_date` - Publication date
- `page_url` - Full URL

**Code:** `blogsPage.tsx` lines 36-44

### Method 2: Automatic `$pageview` with URL (Your Query Method)
**Event:** `$pageview` (automatic from PostHog)

**Properties Available:**
- `$pathname` - URL path (e.g., "/blog/how-to-write-a-resume-that-gets-interviews")
- `$current_url` - Full URL
- `country_code` - User's country
- `utm_source` - Traffic source

**This is automatic** - PostHog tracks every page view!

---

## 🎯 Your Query Will Work!

Your exact query extracts blog slugs from URLs:

```sql
SELECT
    toDate(timestamp) AS day,
    replaceRegexpOne(
        coalesce(properties.$pathname, properties.$current_url),
        '^.*?/blog/([^/?#]+).*',
        '$1'
    ) AS blog_slug,
    COUNT(*) AS total_visits,
    COUNT(DISTINCT distinct_id) AS unique_visits
FROM events
WHERE event = '$pageview'
  AND (
    properties.$pathname LIKE '%/blog/%'
    OR properties.$current_url LIKE '%/blog/%'
  )
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY 
    toDate(timestamp),
    blog_slug
ORDER BY day DESC, total_visits DESC
```

**This will work because:**
1. ✅ PostHog automatically tracks `$pageview` for every page
2. ✅ Blog URLs are like `/blog/slug-name`
3. ✅ `$pathname` contains the URL path
4. ✅ Regex extracts the slug from the URL

---

## 📋 Alternative Query (Using Custom Event)

You can also use the custom `blog_view` event:

```sql
SELECT
    toDate(timestamp) AS day,
    properties.blog_slug AS blog_slug,
    COUNT(*) AS total_visits,
    COUNT(DISTINCT distinct_id) AS unique_visits
FROM events
WHERE event = 'blog_view'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY 
    toDate(timestamp),
    properties.blog_slug
ORDER BY day DESC, total_visits DESC
```

**Benefits:**
- ✅ More reliable (doesn't depend on URL parsing)
- ✅ Includes additional blog metadata (title, category, etc.)
- ✅ Already has `blog_slug` property

---

## 🔍 Additional Blog Metrics Tracked

### 1. Scroll Depth
**Event:** `scroll_depth`

**Properties:**
- `scroll_depth` - 25, 50, 75, or 100
- `blog_slug` - Blog slug
- `section` - "blog_detail"

**Shows:** How far users read each blog

### 2. Time on Page
**Event:** `time_on_page`

**Properties:**
- `time_spent` - Seconds spent reading
- `blog_slug` - Blog slug
- `page_name` - "blog_detail"

**Shows:** Engagement time per blog

### 3. Blog List Clicks
**Event:** `button_click`

**Properties:**
- `button_text` - "Read Blog"
- `button_location` - "blogs_list_card"
- `blog_id`, `blog_slug`, `blog_title` - Blog details

**Shows:** Which blogs users click from the list

---

## 📊 Complete Blog Analytics Queries

### 1. Most Read Blogs (Last 30 Days)
```sql
SELECT
    properties.blog_slug,
    properties.blog_title,
    COUNT(*) AS total_views,
    COUNT(DISTINCT distinct_id) AS unique_readers,
    AVG(properties.time_spent) AS avg_time_seconds
FROM events
WHERE event = 'blog_view'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.blog_slug, properties.blog_title
ORDER BY total_views DESC
```

### 2. Blog Reads by Country
```sql
SELECT
    properties.blog_slug,
    properties.$geoip_country_name AS country_name,
    COUNT(*) AS total_views,
    COUNT(DISTINCT distinct_id) AS unique_readers
FROM events
WHERE event = 'blog_view'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.blog_slug, properties.$geoip_country_name
ORDER BY total_views DESC
```

### 3. Blog Reads by UTM Source
```sql
SELECT
    properties.blog_slug,
    properties.utm_source,
    COUNT(*) AS total_views,
    COUNT(DISTINCT distinct_id) AS unique_readers
FROM events
WHERE event = 'blog_view'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.blog_slug, properties.utm_source
ORDER BY total_views DESC
```

### 4. Blog Completion Rate (Scroll Depth)
```sql
SELECT
    properties.blog_slug,
    COUNT(CASE WHEN properties.scroll_depth = 100 THEN 1 END) AS completed_reads,
    COUNT(*) AS total_reads,
    ROUND(COUNT(CASE WHEN properties.scroll_depth = 100 THEN 1 END) * 100.0 / COUNT(*), 2) AS completion_rate
FROM events
WHERE event = 'scroll_depth'
  AND properties.section = 'blog_detail'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.blog_slug
ORDER BY completion_rate DESC
```

---

## ✅ Summary

**YES - All blogs are trackable!**

1. ✅ **Custom `blog_view` event** - Tracks every blog view with slug
2. ✅ **Automatic `$pageview`** - Tracks every page (including blogs) with URL
3. ✅ **Your query will work** - Extracts slugs from `$pathname` or `$current_url`
4. ✅ **Additional metrics** - Scroll depth, time on page, clicks from list

**After deployment, your exact query will work and show all blog reads!** 🎉

