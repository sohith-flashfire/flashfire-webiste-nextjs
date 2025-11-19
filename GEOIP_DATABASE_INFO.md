# GeoIP Database Information

## 🗄️ Which Database Does GeoIP Use?

**Database:** **MaxMind GeoLite2-Country Database**

**File Format:** `.mmdb` (MaxMind Database - binary format)

**File Location:** `flashfire-website-backend-main/Utils/GeoLite2-Country.mmdb`

**File Size:** ~9.4 MB

---

## 📋 Database Details

### What It Is:
- **Not a traditional database** (not MongoDB, PostgreSQL, MySQL, etc.)
- **Binary database file** (`.mmdb` format)
- Contains **IP address → Country mappings**
- Created and maintained by **MaxMind**

### What It Contains:
- IP address ranges
- Country codes (CA, US, GB, etc.)
- Country names
- Updated regularly with new IP assignments

### How It Works:
```
IP Address: 1.2.3.4
    ↓
Lookup in .mmdb file
    ↓
Returns: { countryCode: "CA", country: "Canada" }
```

---

## 🔧 Technical Details

### Package Used:
- **`@maxmind/geoip2-node`** (version 6.2.0)
- Node.js library to read MaxMind database files

### Database File:
- **Name:** `GeoLite2-Country.mmdb`
- **Type:** MaxMind Database (binary)
- **Format:** `.mmdb` (MaxMind Database)
- **Size:** 9.4 MB
- **Location:** `Utils/GeoLite2-Country.mmdb`

### How It's Loaded:
```javascript
// In Utils/GeoIP.js
const buffer = fs.readFileSync(dbPath);
geoReader = await Reader.openBuffer(buffer);
```

---

## 📍 Where the Database File Is Located

The code looks for the database in these locations (in order):

1. **Environment Variable:**
   ```env
   GEOIP_DB_PATH=/path/to/GeoLite2-Country.mmdb
   ```

2. **Project Root:**
   ```
   flashfire-website-backend-main/GeoLite2-Country.mmdb
   ```

3. **Utils Folder:** ✅ **CURRENTLY HERE**
   ```
   flashfire-website-backend-main/Utils/GeoLite2-Country.mmdb
   ```

4. **Sibling Project (if in monorepo):**
   ```
   ../IPBASED/backend/GeoLite2-Country.mmdb
   ```

**Current Status:** ✅ Database found at `Utils/GeoLite2-Country.mmdb`

---

## 🌐 About MaxMind GeoLite2

### What is MaxMind?
- **Company:** MaxMind, Inc.
- **Product:** GeoIP databases and services
- **Website:** https://www.maxmind.com

### GeoLite2-Country Database:
- **Free version** of MaxMind's GeoIP database
- Contains country-level data only
- Updated regularly (usually weekly)
- **License:** Creative Commons Attribution-ShareAlike 4.0

### What It Provides:
- IP address → Country code mapping
- IP address → Country name mapping
- Covers all public IP addresses
- IPv4 and IPv6 support

---

## 🔄 How the Lookup Works

### Step 1: Load Database
```javascript
// On server startup
initGeoIp();
    ↓
Reads: Utils/GeoLite2-Country.mmdb
    ↓
Loads into memory: geoReader
```

### Step 2: Lookup IP
```javascript
// When user visits
detectCountryFromIp("1.2.3.4")
    ↓
geoReader.country("1.2.3.4")
    ↓
Searches .mmdb file
    ↓
Returns: { countryCode: "CA", country: "Canada" }
```

### Step 3: Cache Result
```javascript
// Cache for 24 hours
ipCache.set("1.2.3.4", { 
  countryCode: "CA", 
  expiresAt: now + 24_hours 
});
```

---

## 📊 Database Structure

### What's Inside the .mmdb File:
```
GeoLite2-Country.mmdb
├── IP Range: 0.0.0.0 - 1.2.3.4 → Country: US
├── IP Range: 1.2.3.5 - 5.6.7.8 → Country: CA
├── IP Range: 5.6.7.9 - 10.11.12.13 → Country: GB
└── ... (millions of IP ranges)
```

### Example Lookups:
```
IP: 1.2.3.4 → Country: CA (Canada)
IP: 8.8.8.8 → Country: US (United States)
IP: 1.1.1.1 → Country: AU (Australia)
```

---

## 🔄 Updating the Database

### Why Update?
- New IP addresses assigned to countries
- More accurate results
- Better coverage

### How to Update:
1. **Sign up** at https://www.maxmind.com/en/accounts/current/geoip/downloads
2. **Download** "GeoLite2-Country" database
3. **Replace** `Utils/GeoLite2-Country.mmdb` file
4. **Restart** backend server

### Update Frequency:
- MaxMind updates: Usually weekly
- Recommended: Update monthly or quarterly
- Current file: November 6, 2024 (based on file date)

---

## ⚠️ Important Notes

### Not a Traditional Database:
- ❌ **NOT** MongoDB
- ❌ **NOT** PostgreSQL
- ❌ **NOT** MySQL
- ✅ **IS** a binary file (`.mmdb`)

### File Format:
- **`.mmdb`** = MaxMind Database format
- Binary format (not readable as text)
- Optimized for fast lookups
- Requires `@maxmind/geoip2-node` package to read

### Performance:
- **Fast:** Binary format optimized for lookups
- **Cached:** Results cached for 24 hours
- **In-Memory:** Database loaded into memory on startup

---

## 🧪 Testing the Database

### Check if Database is Loaded:
Look for this in backend logs:
```
✅ [GeoIP] Database loaded from: /path/to/Utils/GeoLite2-Country.mmdb
```

### Test a Lookup:
```bash
curl http://localhost:4001/api/geo
```

**Response:**
```json
{
  "success": true,
  "countryCode": "CA",
  "country": "Canada",
  "detectionMethod": "ip-geolocation"
}
```

---

## 📚 Additional Resources

### MaxMind Documentation:
- https://dev.maxmind.com/geoip/geoip2/geolite2/
- https://github.com/maxmind/GeoIP2-node

### Database Download:
- https://www.maxmind.com/en/accounts/current/geoip/downloads

### License:
- Creative Commons Attribution-ShareAlike 4.0
- Free for commercial use (with attribution)

---

## ✅ Summary

**Database Type:** MaxMind GeoLite2-Country (`.mmdb` file)

**File Location:** `Utils/GeoLite2-Country.mmdb` ✅

**File Size:** 9.4 MB

**Package:** `@maxmind/geoip2-node` v6.2.0

**Status:** ✅ **LOADED AND WORKING**

**What It Does:** Maps IP addresses to countries

**Not:** A traditional database (MongoDB, PostgreSQL, etc.)

**Is:** A binary database file optimized for IP lookups

