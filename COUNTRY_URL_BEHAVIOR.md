# Country URL Behavior - What URL Shows for Each Country?

## 🌍 Current Behavior

### For Users from Germany (or any non-Canada country):

**URL Shown:** `/` (default/home page)

**What They See:**
- Default US version of the website
- US pricing (in USD: $199, $349, $599)
- Default content (not Canada-specific)

---

## 📋 How It Works

### Middleware Logic (middleware.ts):

```typescript
// Only redirects if country is Canada
if (countryCode === CANADA_CODE) {  // CANADA_CODE = 'CA'
  // Redirect to /en-ca
  return NextResponse.redirect('/en-ca');
}

// For ALL other countries (Germany, UK, India, etc.)
return NextResponse.next();  // Continue to default route (/)
```

### Current Flow:

```
User from Germany visits: /
    ↓
Backend detects: countryCode = "DE" (Germany)
    ↓
Middleware checks: Is it "CA"? → NO
    ↓
No redirect → Shows default URL: /
    ↓
User sees: US version with USD pricing
```

---

## 🗺️ Country URL Mapping

| Country | Country Code | URL Shown | Version | Pricing |
|---------|-------------|-----------|---------|---------|
| **Canada** | CA | `/en-ca` | Canada | CA$ (CAD) |
| **United States** | US | `/` | Default | $ (USD) |
| **Germany** | DE | `/` | Default | $ (USD) |
| **United Kingdom** | GB | `/` | Default | $ (USD) |
| **India** | IN | `/` | Default | $ (USD) |
| **Australia** | AU | `/` | Default | $ (USD) |
| **Any Other Country** | * | `/` | Default | $ (USD) |

---

## 🔍 Detailed Example: User from Germany

### Step 1: User Visits
```
User from Germany → Visits: https://flashfirejobs.com/
```

### Step 2: Backend Detection
```
Backend API: /api/geo
    ↓
GeoIP Database Lookup
    ↓
Returns: { countryCode: "DE", country: "Germany" }
```

### Step 3: Middleware Check
```typescript
// In middleware.ts (line 118-124)
if (countryCode === "CA") {  // Is Germany = Canada? NO
  // This block is NOT executed
  return NextResponse.redirect('/en-ca');
}

// This executes instead:
return NextResponse.next();  // Continue to default route
```

### Step 4: User Sees
```
URL: https://flashfirejobs.com/
Content: Default US version
Pricing: $199, $349, $599 (USD)
```

---

## ✅ Summary

### For Germany (or any non-Canada country):
- ✅ **URL:** `/` (root/home page)
- ✅ **Version:** Default US version
- ✅ **Pricing:** USD ($199, $349, $599)
- ✅ **Content:** Default content (not Canada-specific)

### Only Canada Gets Special Treatment:
- ✅ **URL:** `/en-ca`
- ✅ **Version:** Canada-specific version
- ✅ **Pricing:** CAD (CA$279, CA$489, CA$839)
- ✅ **Content:** Canada-specific content

---

## 🔮 Future: Adding More Countries

If you want to add Germany (or other countries) with their own URLs:

### Example: Add Germany Support

1. **Create Germany Home Component:**
   ```
   src/components/countries/de/Home.tsx
   ```

2. **Add Routes:**
   ```
   app/de/page.tsx
   app/de/pricing/page.tsx
   ```

3. **Update Middleware:**
   ```typescript
   const GERMANY_CODE = 'DE';
   
   if (countryCode === CANADA_CODE) {
     return NextResponse.redirect('/en-ca');
   }
   
   if (countryCode === GERMANY_CODE) {
     return NextResponse.redirect('/de');
   }
   ```

4. **Add Germany Pricing:**
   ```typescript
   // In pricingData.ts
   export const germanyPricingPlans: PricingPlan[] = [
     {
       price: "€179",
       // ... Germany-specific pricing
     }
   ];
   ```

---

## 📊 Current Implementation

**Special Countries:** Only Canada (`/en-ca`)

**Default for All Others:** `/` (US version)

**Countries Using Default:**
- Germany (DE)
- United Kingdom (GB)
- India (IN)
- Australia (AU)
- France (FR)
- Japan (JP)
- Brazil (BR)
- And all other countries...

---

## 🎯 Answer to Your Question

**Q: If the user is from Germany, which URL would be shown?**

**A: `/` (the default/home page)**

- They see the US version
- US pricing in USD
- Default content
- No redirect happens
- Only Canada users get redirected to `/en-ca`

