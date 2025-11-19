# PostHog Data Coverage - Complete Analysis

## ✅ YES - You WILL Get All This Data in PostHog!

Based on your requirements, here's what's tracked and how to query it:

---

## 📊 Data Coverage Matrix

| Report/Query | Status | How to Get in PostHog |
|--------------|--------|----------------------|
| **1. getbuttonclicks** | ✅ **TRACKED** | Event: `button_click` |
| **2. GET_SITE_TRAFFIC** | ✅ **TRACKED** | Event: `$pageview` or `page_view` |
| **3. GET_REPORT_FORM_UTM_SOURCES** | ✅ **TRACKED** | Property: `utm_source` on all events |
| **4. GET_REPORT_FOR_SPECIFIC_SOURCE** | ✅ **TRACKED** | Filter by `utm_source` property |
| **5. Country_Wise_Visitor_Stats** | ✅ **TRACKED** | Property: `country_code` on all events |
| **6. Country_Wise_Visitor_Stats_Date_Wise** | ✅ **TRACKED** | Group by `country_code` + date |
| **7. Canada_Per_Day_Visitors** | ✅ **TRACKED** | Filter: `is_canada = true` or `country_code = CA` |
| **8. Blogsreadlast_30days** | ✅ **TRACKED** | Event: `blog_view` |

---

## 🎯 Detailed Breakdown

### 1. ✅ Button Clicks (`getbuttonclicks`)

**Event Name:** `button_click`

**Properties Tracked:**
- `button_text` - The text on the button
- `button_location` - Where the button is (hero_cta, navbar, pricing, etc.)
- `button_type` - Type (cta, secondary, link, icon)
- `country_code` - User's country
- `utm_source` - Traffic source
- `page_url` - Page where button was clicked
- `device_type` - Mobile/Tablet/Desktop

**PostHog Query:**
```
Event: button_click
Group by: properties.button_text, properties.button_location
Filter: Last 30 days
```

---

### 2. ✅ Site Traffic (`GET_SITE_TRAFFIC`)

**Event Name:** `$pageview` (automatic) + `page_view` (custom)

**Properties Tracked:**
- `$current_url` - Full URL
- `country_code` - User's country
- `utm_source` - Traffic source
- `utm_medium` - Traffic medium
- `utm_campaign` - Campaign name
- `device_type` - Mobile/Tablet/Desktop
- `is_canada` - Boolean for Canada pages

**PostHog Query:**
```
Event: $pageview
Group by: properties.country_code, properties.utm_source
Filter: Last 30 days
```

---

### 3. ✅ UTM Sources Report (`GET_REPORT_FORM_UTM_SOURCES`)

**Properties Tracked on ALL Events:**
- `utm_source` - Source (e.g., "google", "facebook", "direct")
- `utm_medium` - Medium (e.g., "website", "email", "social")
- `utm_campaign` - Campaign name
- `utm_content` - Content identifier
- `utm_term` - Term/keyword
- `lead_source` - Combined source (includes ref-code)

**PostHog Query:**
```
Event: Any event
Group by: properties.utm_source, properties.utm_medium
Filter: Last 30 days
Show: Unique users, Total events
```

---

### 4. ✅ Specific Source Report (`GET_REPORT_FOR_SPECIFIC_SOURCE`)

**How to Query:**
```
Event: Any event
Filter: 
  - properties.utm_source = "specific_source_name"
  - Date range: Last 30 days
Group by: properties.utm_campaign, properties.utm_medium
Show: 
  - Unique visitors
  - Total page views
  - Button clicks
  - Form submissions
  - Conversions
```

---

### 5. ✅ Country-Wise Visitor Stats (`Country_Wise_Visitor_Stats`)

**You have TWO options for country data:**

#### Option A: PostHog Automatic GeoIP (Recommended - What you're seeing)
PostHog automatically detects country from IP address:
- `$geoip_country_name` - Country name (e.g., "India", "United States")
- `$geoip_country_code` - Country code (e.g., "IN", "US", "CA")

**PostHog SQL Query (Exact match to your screenshot):**
```sql
SELECT
    properties.$geoip_country_name AS country_name,
    COUNT(DISTINCT distinct_id) AS unique_visitors,
    COUNT(*) AS total_events
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.$geoip_country_name
ORDER BY unique_visitors DESC
```

**This will work automatically** - PostHog detects country from IP on every event!

#### Option B: Custom Country Tracking (Additional data)
Our custom tracking adds:
- `country_code` - ISO country code (US, CA, IN, etc.)
- `country_name` - Full country name
- `is_canada` - Boolean flag for Canada pages
- `locale` - "en-ca" or "en-us"

**PostHog Query (Using custom properties):**
```
Event: $pageview
Group by: properties.country_code
Show: 
  - Unique visitors per country
  - Total page views per country
  - Average session duration per country
Filter: Last 30 days
```

**Recommendation:** Use `$geoip_country_name` (Option A) - it's automatic and matches your current query!

---

### 6. ✅ Country-Wise Stats Date-Wise (`Country_Wise_Visitor_Stats_Date_Wise`)

**PostHog SQL Query (Using PostHog's automatic geoIP):**
```sql
SELECT 
  properties.$geoip_country_name AS country_name,
  toDate(timestamp) as date,
  COUNT(DISTINCT distinct_id) as unique_visitors,
  COUNT(*) as page_views
FROM events
WHERE event = '$pageview'
  AND timestamp >= now() - toIntervalDay(30)
GROUP BY properties.$geoip_country_name, toDate(timestamp)
ORDER BY date DESC, unique_visitors DESC
```

**Alternative using custom properties:**
```sql
SELECT 
  properties.country_code,
  toDate(timestamp) as date,
  COUNT(DISTINCT distinct_id) as unique_visitors,
  COUNT(*) as page_views
FROM events
WHERE event = '$pageview'
  AND timestamp >= now() - toIntervalDay(30)
GROUP BY properties.country_code, toDate(timestamp)
ORDER BY date DESC, unique_visitors DESC
```

---

### 7. ✅ Canada Per Day Visitors (`Canada_Per_Day_Visitors`)

**PostHog SQL Query (Using PostHog's automatic geoIP - Recommended):**
```sql
SELECT 
  toDate(timestamp) as date,
  COUNT(DISTINCT distinct_id) as unique_visitors,
  COUNT(*) as total_events
FROM events
WHERE properties.$geoip_country_code = 'CA'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY toDate(timestamp)
ORDER BY date DESC
```

**Alternative using custom properties:**
```sql
SELECT 
  toDate(timestamp) as date,
  COUNT(DISTINCT distinct_id) as unique_visitors,
  COUNT(*) as total_events
FROM events
WHERE (properties.is_canada = true 
   OR properties.country_code = 'CA'
   OR properties.locale = 'en-ca'
   OR $current_url LIKE '%/en-ca%')
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY toDate(timestamp)
ORDER BY date DESC
```

**Properties Available:**
- `$geoip_country_code` - "CA" (automatic from PostHog)
- `is_canada` - Boolean (true for /en-ca pages)
- `country_code` - "CA" for Canada
- `locale` - "en-ca" for Canada pages

---

### 8. ✅ Blog Reads Last 30 Days (`Blogsreadlast_30days`)

**Event Name:** `blog_view`

**Properties Tracked:**
- `blog_id` - Blog post ID
- `blog_slug` - Blog URL slug
- `blog_title` - Blog title
- `blog_category` - Blog category
- `blog_read_time` - Estimated read time
- `blog_date` - Publication date
- `country_code` - User's country
- `utm_source` - Traffic source

**PostHog Query:**
```
Event: blog_view
Filter: Last 30 days
Group by: 
  - properties.blog_slug
  - properties.blog_title
Show: 
  - Total views per blog
  - Unique readers per blog
  - Average time on page
```

**Additional Blog Metrics:**
- `scroll_depth` - How far users scroll (25%, 50%, 75%, 100%)
- `time_on_page` - Time spent reading
- `page_view` - Also tracked for blog pages

---

## 🔍 How to Access This Data in PostHog

### Method 1: PostHog Dashboard (UI)
1. Go to **Insights** → **New Insight**
2. Select event (e.g., `button_click`, `$pageview`)
3. Add filters (e.g., `country_code = CA`)
4. Group by properties (e.g., `utm_source`, `country_code`)
5. Set date range (Last 30 days)

### Method 2: PostHog SQL (Advanced)
1. Go to **Data Management** → **SQL**
2. Write SQL queries using the examples above
3. Export results as CSV/JSON

### Method 3: PostHog API
```javascript
// Get button clicks
POST https://us.i.posthog.com/api/projects/{project_id}/query/
{
  "query": {
    "kind": "EventsQuery",
    "select": ["*"],
    "event": "button_click",
    "dateRange": {
      "date_from": "-30d"
    }
  }
}
```

---

## 📈 Example Queries

### Get All Button Clicks by Country
```
Event: button_click
Group by: properties.country_code, properties.button_text
Show: Count, Unique users
```

### Get Canada Visitors Per Day
```
Event: $pageview
Filter: properties.is_canada = true
Group by: Date
Show: Unique visitors, Total events
```

### Get UTM Source Performance
```
Event: $pageview
Group by: properties.utm_source
Filter: properties.utm_source != "direct"
Show: Unique visitors, Total events, Conversion rate
```

### Get Blog Read Stats
```
Event: blog_view
Group by: properties.blog_slug
Filter: Last 30 days
Show: Total views, Unique readers
```

---

## ✅ Summary

**ALL 8 data points are tracked!** You can get:

1. ✅ Button clicks - `button_click` event
2. ✅ Site traffic - `$pageview` event
3. ✅ UTM sources - `utm_source` property on all events
4. ✅ Specific source reports - Filter by `utm_source`
5. ✅ Country stats - `country_code` property on all events
6. ✅ Country stats by date - Group by `country_code` + date
7. ✅ Canada daily visitors - Filter by `is_canada` or `country_code = CA`
8. ✅ Blog reads - `blog_view` event

**Everything is ready to query in PostHog!** 🎉

