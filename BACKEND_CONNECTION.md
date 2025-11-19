# Backend Connection for Country Detection

## ✅ Yes, It's Connected!

The Canada/countries implementation **IS connected to your backend**. Here's how it works:

---

## 🔄 How It Works

### 1. **User Visits Website** (`/`)
```
User → Next.js Middleware → Backend API → GeoIP Database → Country Code
```

### 2. **Backend API Endpoint**
**Endpoint:** `GET /api/geo`

**Location:** `flashfire-website-backend-main/index.js` (line 892)

**What it does:**
- Receives user's IP address
- Uses MaxMind GeoIP2 database to detect country
- Returns country code (e.g., "CA" for Canada, "US" for US)
- Caches results for 24 hours

**Response Format:**
```json
{
  "success": true,
  "countryCode": "CA",
  "country": "Canada",
  "ip": "1.2.3.4",
  "detectionMethod": "ip-geolocation"
}
```

### 3. **Next.js Middleware** (`middleware.ts`)
**Location:** `flashfire-website-nextjs-main 2/middleware.ts`

**What it does:**
1. Intercepts requests to `/` (home page)
2. Extracts user's IP address from headers
3. Calls backend: `${NEXT_PUBLIC_API_BASE_URL}/api/geo`
4. Gets country code from backend
5. If country is "CA" → Redirects to `/en-ca`
6. Otherwise → Shows default (US) version

**Code:**
```typescript
async function fetchCountryFromBackend(ip: string): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4001';
  
  const response = await fetch(`${baseUrl}/api/geo`, {
    headers: {
      'x-forwarded-for': ip,
      'x-real-ip': ip,
      'ngrok-skip-browser-warning': 'true'
    }
  });
  
  const data = await response.json();
  return data?.countryCode || null;
}
```

---

## 🛡️ Fallback Mechanisms

### If Backend Fails:
1. **Browser Detection** - Uses Accept-Language header
   - If `fr-CA` (French Canadian) → Canada
   - Otherwise → US (default)

2. **Caching** - Results cached for 24 hours
   - Reduces backend calls
   - Faster response times

---

## 📊 Flow Diagram

```
┌─────────────┐
│   User      │
│  Visits /   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Next.js         │
│ Middleware      │
│ (middleware.ts) │
└──────┬──────────┘
       │
       │ 1. Extract IP
       │ 2. Check Cache
       │
       ▼
┌─────────────────┐
│  Backend API    │
│  GET /api/geo   │
│  (index.js)     │
└──────┬──────────┘
       │
       │ 3. Query GeoIP DB
       │ 4. Return Country
       │
       ▼
┌─────────────────┐
│  MaxMind        │
│  GeoIP2 Database │
│  (GeoIP.js)     │
└──────┬──────────┘
       │
       │ 5. Country Code
       │    (CA, US, etc.)
       │
       ▼
┌─────────────────┐
│  Middleware     │
│  Decision       │
└──────┬──────────┘
       │
       ├─ CA? → Redirect to /en-ca
       │
       └─ Other? → Show default (/)
```

---

## 🔧 Backend Files

### 1. **GeoIP Utility** (`Utils/GeoIP.js`)
- Handles IP to country conversion
- Uses MaxMind GeoIP2 database
- Implements caching (24 hour TTL)
- Handles localhost/development IPs

### 2. **API Route** (`index.js` - line 892)
```javascript
app.get('/api/geo', (req, res) => {
  const ip = getClientIp(req);
  const geo = detectCountryFromIp(ip);
  return res.json({
    success: true,
    countryCode: geo.countryCode,
    country: geo.country,
    ip: ip,
    detectionMethod: 'ip-geolocation'
  });
});
```

---

## 🌍 Environment Variables

### Frontend (`.env.local`):
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
# or
NEXT_PUBLIC_API_BASE_URL=https://api.flashfirejobs.com
```

### Backend:
- Uses MaxMind GeoIP2 database
- Database file location configured in backend
- Caching enabled (24 hours)

---

## ✅ Current Status

**Backend Connection:** ✅ **ACTIVE**

**What's Working:**
- ✅ Middleware calls backend `/api/geo` endpoint
- ✅ Backend uses GeoIP database to detect country
- ✅ Canadian users automatically redirected to `/en-ca`
- ✅ Fallback mechanism if backend fails
- ✅ Caching reduces backend load

**What Happens:**
1. User from Canada visits `/`
2. Middleware detects IP
3. Backend returns `countryCode: "CA"`
4. User redirected to `/en-ca`
5. User sees Canada-specific pricing and content

---

## 🧪 Testing

### Test Backend Connection:
```bash
# In browser console or terminal
curl http://localhost:4001/api/geo
# or
curl https://api.flashfirejobs.com/api/geo
```

**Expected Response:**
```json
{
  "success": true,
  "countryCode": "CA",  // or "US", etc.
  "country": "Canada",
  "ip": "your-ip-address",
  "detectionMethod": "ip-geolocation"
}
```

### Test with Specific IP:
```bash
curl "http://localhost:4001/api/geo?debugIp=1.2.3.4"
```

---

## 🔍 Debugging

### Check Middleware Logs:
Look for these in your Next.js console:
```
[Middleware] Redirecting to /en-ca for Canada user
[Middleware] Backend geo API not ok: 500
[Middleware] Failed to fetch country from backend: ...
```

### Check Backend Logs:
Look for these in your backend console:
```
[GeoAPI] Incoming /api/geo request
[GeoAPI] Resolved client IP: 1.2.3.4
[GeoIP] Lookup for 1.2.3.4: CA
[GeoAPI] Result: { countryCode: 'CA', country: 'Canada' }
```

---

## 🚀 Summary

**Yes, the Canada/countries feature is fully connected to your backend!**

- ✅ Backend API endpoint: `/api/geo`
- ✅ Uses MaxMind GeoIP2 database
- ✅ Automatic country detection
- ✅ Automatic redirect for Canadian users
- ✅ Fallback mechanisms in place
- ✅ Caching for performance

**Everything is working and connected!** 🎉

