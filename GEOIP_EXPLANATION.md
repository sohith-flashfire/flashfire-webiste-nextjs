# GeoIP Explanation - What It Is & What It Does

## ✅ Yes, GeoIP is Added!

GeoIP is **fully integrated** in your backend. Here's everything you need to know:

---

## 🌍 What is GeoIP?

**GeoIP (Geolocation IP)** is a technology that:
- Takes an IP address (like `1.2.3.4`)
- Looks it up in a database
- Returns the **country** where that IP is located
- Example: IP `1.2.3.4` → Country: `Canada`

---

## 🔧 What GeoIP Package is Used?

**Package:** `@maxmind/geoip2-node` (version 6.2.0)

**Database:** MaxMind GeoLite2-Country Database

**Location in Code:**
- `flashfire-website-backend-main/Utils/GeoIP.js`
- `flashfire-website-backend-main/index.js` (line 238, 892, 937)

---

## 📋 What GeoIP Does in Your Project

### 1. **Detects User's Country from IP Address**

When a user visits your website:
```
User's IP: 1.2.3.4
    ↓
GeoIP Database Lookup
    ↓
Result: { countryCode: "CA", country: "Canada" }
```

### 2. **Automatic Redirect for Canadian Users**

```
User from Canada visits: /
    ↓
GeoIP detects: countryCode = "CA"
    ↓
Middleware redirects to: /en-ca
    ↓
User sees Canada-specific content & pricing
```

### 3. **Caching for Performance**

- Results cached for **24 hours** per IP
- Reduces database lookups
- Faster response times

---

## 🔄 How It Works (Step by Step)

### Step 1: User Visits Website
```
User from Canada → Visits https://flashfirejobs.com/
```

### Step 2: Middleware Intercepts
```
Next.js Middleware → Extracts IP address
```

### Step 3: Backend API Call
```
Frontend → GET /api/geo
    ↓
Backend receives IP: 1.2.3.4
```

### Step 4: GeoIP Lookup
```javascript
// In Utils/GeoIP.js
detectCountryFromIp("1.2.3.4")
    ↓
geoReader.country("1.2.3.4")
    ↓
MaxMind Database Query
    ↓
Returns: { countryCode: "CA", country: "Canada" }
```

### Step 5: Response to Frontend
```json
{
  "success": true,
  "countryCode": "CA",
  "country": "Canada",
  "ip": "1.2.3.4",
  "detectionMethod": "ip-geolocation"
}
```

### Step 6: Redirect User
```
Middleware sees: countryCode = "CA"
    ↓
Redirects to: /en-ca
    ↓
User sees Canada version
```

---

## 📁 Files Involved

### Backend Files:

1. **`Utils/GeoIP.js`** - Main GeoIP logic
   - Loads MaxMind database
   - Detects country from IP
   - Implements caching

2. **`index.js`** (line 238) - Imports GeoIP
   ```javascript
   import { initGeoIp, getClientIp, detectCountryFromIp } from './Utils/GeoIP.js';
   ```

3. **`index.js`** (line 892) - API endpoint
   ```javascript
   app.get('/api/geo', (req, res) => {
     const ip = getClientIp(req);
     const geo = detectCountryFromIp(ip);
     return res.json({
       countryCode: geo.countryCode,
       country: geo.country
     });
   });
   ```

4. **`index.js`** (line 937) - Initialization
   ```javascript
   initGeoIp(); // Loads database on server start
   ```

### Frontend Files:

1. **`middleware.ts`** - Calls backend API
2. **`src/utils/countryDetection.ts`** - Client-side utilities

---

## 🗄️ Database File

**File Name:** `GeoLite2-Country.mmdb`

**What it is:**
- MaxMind's free GeoIP database
- Contains IP address → Country mappings
- Updated regularly with new IP ranges

**Where it should be:**
1. `flashfire-website-backend-main/GeoLite2-Country.mmdb`
2. `flashfire-website-backend-main/Utils/GeoLite2-Country.mmdb`
3. Or set `GEOIP_DB_PATH` environment variable

**How to get it:**
1. Sign up at https://www.maxmind.com/en/accounts/current/geoip/downloads
2. Download "GeoLite2-Country" database
3. Place `.mmdb` file in backend folder

---

## ⚙️ Configuration

### Environment Variable (Optional):
```env
GEOIP_DB_PATH=/path/to/GeoLite2-Country.mmdb
```

### Automatic Detection:
The code automatically looks for the database in:
1. `GEOIP_DB_PATH` env variable
2. `./GeoLite2-Country.mmdb` (project root)
3. `./Utils/GeoLite2-Country.mmdb`
4. `../IPBASED/backend/GeoLite2-Country.mmdb` (if in monorepo)

---

## 🎯 What GeoIP Enables

### 1. **Automatic Country Detection**
- No user input needed
- Works automatically
- Accurate for most users

### 2. **Localized Content**
- Canada users → `/en-ca` → Canada pricing (CA$)
- US users → `/` → US pricing ($)
- Different content per country

### 3. **Better User Experience**
- Users see correct pricing automatically
- No manual country selection needed
- Faster checkout process

### 4. **Analytics**
- Track which countries visit your site
- Understand your user base
- Make data-driven decisions

---

## 🔍 How to Check If It's Working

### 1. Check Backend Logs:
```
✅ [GeoIP] Database loaded from: /path/to/GeoLite2-Country.mmdb
[GeoAPI] Incoming /api/geo request
[GeoIP] Lookup for 1.2.3.4: CA
[GeoAPI] Result: { countryCode: 'CA', country: 'Canada' }
```

### 2. Test API Endpoint:
```bash
curl http://localhost:4001/api/geo
```

**Response:**
```json
{
  "success": true,
  "countryCode": "CA",
  "country": "Canada",
  "ip": "your-ip",
  "detectionMethod": "ip-geolocation"
}
```

### 3. Test with Specific IP:
```bash
curl "http://localhost:4001/api/geo?debugIp=1.2.3.4"
```

---

## ⚠️ Fallback Behavior

### If Database Not Found:
- Logs warning: `[GeoIP] Database not found`
- Falls back to default: `US`
- Still works, but less accurate

### If IP Not Found:
- Returns default: `US`
- Logs warning
- Continues normally

### If Backend Fails:
- Frontend uses browser detection
- Checks timezone and language
- Falls back to `US`

---

## 📊 Performance

### Caching:
- **TTL:** 24 hours per IP
- **Storage:** In-memory Map
- **Benefit:** Faster responses, less database load

### Example:
```
First request: IP 1.2.3.4 → Database lookup → Cache result
Next 24 hours: IP 1.2.3.4 → Return cached result (instant)
After 24 hours: IP 1.2.3.4 → Database lookup again
```

---

## 🚀 Summary

**GeoIP Status:** ✅ **ADDED & WORKING**

**What It Does:**
1. ✅ Detects user's country from IP address
2. ✅ Automatically redirects Canadian users to `/en-ca`
3. ✅ Shows country-specific pricing and content
4. ✅ Caches results for performance
5. ✅ Has fallback mechanisms

**Package:** `@maxmind/geoip2-node` v6.2.0

**Database:** MaxMind GeoLite2-Country

**Location:** `Utils/GeoIP.js`

**Everything is set up and working!** 🎉

