# Pricing Customization Guide

## ✅ Current Setup

Your pricing system **already supports** different pricing for Canada and US (default). It's fully automated!

### How It Works:
1. **Automatic Detection**: Component detects locale from URL (`/en-ca` = Canada, `/` = US)
2. **Separate Data**: Each country has its own pricing data
3. **Auto-Switching**: Component automatically shows the right pricing

---

## 🎯 How to Customize Pricing

### Step 1: Open Pricing Data File
```
src/data/pricingData.ts
```

### Step 2: Edit Pricing for Each Country

#### For US (Default) Pricing:
```typescript
export const usPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    price: "$199",           // ← Change price here
    oldPrice: "$299",        // ← Change old price here
    paymentLink: "...",     // ← Change PayPal link here
    features: [...],         // ← Add/remove features here
    // ... other fields
  },
  // ... other plans
];
```

#### For Canada Pricing:
```typescript
export const canadaPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    price: "CA$279",         // ← Change price here
    oldPrice: "CA$389",      // ← Change old price here
    paymentLink: "...",     // ← Change PayPal link here
    features: [...],         // ← Add/remove features here
    // ... other fields
  },
  // ... other plans
];
```

---

## 📝 What You Can Customize

### 1. **Prices**
```typescript
price: "$199",        // Current price
oldPrice: "$299",     // Strikethrough price (optional)
```

### 2. **Payment Links**
```typescript
paymentLink: "https://www.paypal.com/ncp/payment/XXXXX",
```

### 3. **Features**
```typescript
features: [
  "Feature 1",
  "Feature 2",
  "Add new feature here",  // ← Add new features
  // Remove features by deleting lines
],
```

### 4. **Plan Details**
```typescript
title: "IGNITE",                    // Plan name
subTitle: "250 Applications",       // Subtitle
description: "Perfect for...",      // Description
tag: "MOST POPULAR",                // Badge/tag (optional)
highlight: true,                    // Highlight this plan
```

---

## 🌍 Adding a New Country

### Step 1: Add Pricing Data
In `src/data/pricingData.ts`:
```typescript
export const ukPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    price: "£149",
    oldPrice: "£199",
    // ... rest of plan
  },
  // ... other plans
];
```

### Step 2: Update Component
In `src/components/homePagePricingPlans/homePagePricingPlans.tsx`:
```typescript
import { usPricingPlans, canadaPricingPlans, ukPricingPlans } from "@/src/data/pricingData";

export default function HomePagePricingPlans() {
  const pathname = usePathname();
  
  // Detect locale
  let pricingPlans;
  if (pathname.startsWith("/en-uk")) {
    pricingPlans = ukPricingPlans;
  } else if (pathname.startsWith("/en-ca")) {
    pricingPlans = canadaPricingPlans;
  } else {
    pricingPlans = usPricingPlans; // Default
  }
  
  // ... rest of component
}
```

### Step 3: Add Routes
Create routes in `app/en-uk/` (similar to `app/en-ca/`)

---

## 💡 Examples

### Example 1: Change US Ignite Price
```typescript
// In usPricingPlans array
{
  title: "IGNITE",
  price: "$149",      // Changed from $199
  oldPrice: "$249",    // Changed from $299
  // ... rest stays same
}
```

### Example 2: Add Feature to Canada Professional Plan
```typescript
// In canadaPricingPlans array
{
  title: "PROFESSIONAL",
  features: [
    "Everything in Ignite",
    "Priority job matching",
    "Advance analytics & insights",
    "LinkedIn profile optimization",
    "Interview preparation tips",
    "New feature here!",  // ← Added new feature
  ],
  // ... rest stays same
}
```

### Example 3: Change Payment Link
```typescript
{
  title: "EXECUTIVE",
  paymentLink: "https://www.paypal.com/ncp/payment/NEW_LINK",  // ← Updated link
  // ... rest stays same
}
```

---

## ✅ Current Pricing Summary

### US Pricing (Default):
- **IGNITE**: $199 (was $299) - 250 applications
- **PROFESSIONAL**: $349 (was $449) - 500 applications
- **EXECUTIVE**: $599 (was $699) - 1200 applications

### Canada Pricing:
- **IGNITE**: CA$279 (was CA$389) - 250 applications
- **PROFESSIONAL**: CA$489 (was CA$619) - 500 applications
- **EXECUTIVE**: CA$839 (was CA$949) - 1200 applications

---

## 🚀 Quick Tips

1. **Always test** after changing prices
2. **Update payment links** when creating new PayPal buttons
3. **Keep features consistent** unless intentionally different
4. **Use proper currency symbols**: `$` for USD, `CA$` for CAD, `£` for GBP, etc.
5. **Both countries are independent** - change one without affecting the other

---

## 📍 File Locations

- **Pricing Data**: `src/data/pricingData.ts`
- **Pricing Component**: `src/components/homePagePricingPlans/homePagePricingPlans.tsx`
- **Pricing Card**: `src/components/homePagePricingPlans/pricingCard.tsx`

---

## ❓ Need Help?

If you need to:
- Add a new pricing tier → Add new object to the array
- Remove a plan → Delete the object from the array
- Change plan order → Reorder objects in the array
- Add country-specific features → Edit features array for that country

Everything is already set up and ready to customize! 🎉

