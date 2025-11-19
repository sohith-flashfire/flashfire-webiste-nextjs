# PostHog Country-Wise Stats Queries

## ✅ YES - You'll Get Data Exactly Like Your Screenshot!

After deployment, you can use the **exact same query** you're seeing in your PostHog dashboard. PostHog automatically detects country from IP address on every event.

---

## 🌍 Country-Wise Visitor Stats

### Query (Matches Your Screenshot):
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

**This will work automatically** - No code changes needed! PostHog adds `$geoip_country_name` to every event.

---

## 📊 Additional Country Queries

### 1. Country-Wise Stats with Date Breakdown
```sql
SELECT
    properties.$geoip_country_name AS country_name,
    toDate(timestamp) AS date,
    COUNT(DISTINCT distinct_id) AS unique_visitors,
    COUNT(*) AS total_events
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.$geoip_country_name, toDate(timestamp)
ORDER BY date DESC, unique_visitors DESC
```

### 2. Canada Per Day Visitors
```sql
SELECT
    toDate(timestamp) AS date,
    COUNT(DISTINCT distinct_id) AS unique_visitors,
    COUNT(*) AS total_events
FROM events
WHERE properties.$geoip_country_code = 'CA'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY toDate(timestamp)
ORDER BY date DESC
```

### 3. Country-Wise Button Clicks
```sql
SELECT
    properties.$geoip_country_name AS country_name,
    properties.button_text,
    COUNT(*) AS click_count,
    COUNT(DISTINCT distinct_id) AS unique_users
FROM events
WHERE event = 'button_click'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.$geoip_country_name, properties.button_text
ORDER BY click_count DESC
```

### 4. Country-Wise with UTM Source
```sql
SELECT
    properties.$geoip_country_name AS country_name,
    properties.utm_source,
    COUNT(DISTINCT distinct_id) AS unique_visitors,
    COUNT(*) AS total_events
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
GROUP BY properties.$geoip_country_name, properties.utm_source
ORDER BY unique_visitors DESC
```

---

## 🎯 PostHog Automatic Properties

PostHog automatically adds these properties to **every event**:

| Property | Description | Example |
|----------|-------------|---------|
| `$geoip_country_name` | Country name from IP | "India", "United States", "Canada" |
| `$geoip_country_code` | Country code from IP | "IN", "US", "CA" |
| `$geoip_city_name` | City name from IP | "Mumbai", "New York" |
| `$geoip_continent_name` | Continent name | "Asia", "North America" |
| `$geoip_continent_code` | Continent code | "AS", "NA" |

**These work automatically** - No configuration needed!

---

## 🔄 Custom Properties (Additional Data)

We also track custom country properties:

| Property | Description | Example |
|----------|-------------|---------|
| `country_code` | From our detection | "US", "CA", "IN" |
| `country_name` | Mapped name | "United States", "Canada" |
| `is_canada` | Boolean for Canada pages | true, false |
| `locale` | Page locale | "en-ca", "en-us" |

**Use these when you need:**
- Canada-specific page tracking (`is_canada`)
- Locale-based filtering (`locale`)
- Custom country detection logic

---

## ✅ Summary

**YES - You'll get data exactly like your screenshot!**

1. ✅ PostHog automatically detects country from IP
2. ✅ `$geoip_country_name` is available on every event
3. ✅ Your existing query will work without any changes
4. ✅ You'll see countries like India, United States, Canada, etc.
5. ✅ Unique visitors and total events per country

**After deployment, just run your query and you'll see the same results!** 🎉

