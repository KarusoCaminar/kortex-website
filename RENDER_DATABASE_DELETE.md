# 🗑️ Delete Render Database Guide

## Problem
You have a database on Render that keeps running out (expires after a few days on free tier) and you want to delete it.

## Important Note

⚠️ **Your invoice-extractor uses IN-MEMORY storage** - it doesn't need a database! The database on Render is likely from an old setup.

## Solution: Delete the Database

### Method 1: Via Render Dashboard (Easiest)

1. **Log into Render:**
   - Go to https://dashboard.render.com
   - Sign in with your account

2. **Find the Database:**
   - Click on "Databases" in the left sidebar
   - Find your PostgreSQL database (likely named something like "kortex-db" or "invoice-db")

3. **Delete the Database:**
   - Click on the database name
   - Scroll down to "Danger Zone"
   - Click "Delete Database"
   - Confirm deletion

**⚠️ Warning:** This will permanently delete all data. Make sure you don't need it!

---

### Method 2: Via Render CLI

If you have Render CLI installed:

```bash
# List all databases
render databases list

# Delete specific database (replace DATABASE_ID with actual ID)
render databases delete DATABASE_ID
```

---

### Method 3: Check if Database is Used

Before deleting, verify it's not used:

1. **Check your invoice-extractor:**
   - Look at `invoice-extractor/server/storage.ts`
   - It uses `InMemoryStorage` - no database needed ✅

2. **Check environment variables:**
   - In Render dashboard, check your services
   - If any service has `DATABASE_URL`, you might still need the database
   - But for invoice-extractor, you don't need it

---

## Why Delete It?

**Free Tier Limitations:**
- Render free tier databases expire after 90 days of inactivity
- They have limited storage
- They're not needed for your current setup

**Benefits of Deleting:**
- ✅ No more expiration warnings
- ✅ Cleaner dashboard
- ✅ No confusion about which database to use
- ✅ Your app works fine without it (uses in-memory storage)

---

## After Deletion

Your invoice-extractor will continue working because:
- ✅ Uses `InMemoryStorage` class
- ✅ No database dependencies in `package.json`
- ✅ All data stored in memory (lost on restart, which is fine for demo)

**Note:** If you need persistent storage later, you can:
1. Use a free tier database (Neon, Supabase, etc.)
2. Update `storage.ts` to use database instead of in-memory
3. But for now, in-memory is perfect for demos

---

## Prevent Future Issues

1. **Don't create databases on Render** unless you need persistent storage
2. **Use in-memory storage** for demos (like you're doing now)
3. **Use external databases** (Neon, Supabase) if you need persistence - they're more reliable

---

## Quick Checklist

- [ ] Login to Render dashboard
- [ ] Find database in "Databases" section
- [ ] Click "Delete Database"
- [ ] Confirm deletion
- [ ] Verify invoice-extractor still works (it should!)

**Done!** Your workflow will continue running without database issues.

