# ⚡ Quick Start - Fix Both Issues in 5 Minutes

## 🎯 Goal
Fix newsfeed and delete Render database - **FASTEST PATH**

---

## ✅ Step 1: Fix Newsfeed (2 minutes)

### Option A: GitHub Actions (RECOMMENDED - Already Implemented!)

1. **Go to GitHub:**
   - Navigate to: https://github.com/KarusoCaminar/kortex-website
   - Click on **"Actions"** tab

2. **Enable Workflow:**
   - If workflows are disabled, click **"I understand my workflows, enable them"**
   - You should see **"Update AI News Feed"** workflow

3. **Test it:**
   - Click on **"Update AI News Feed"**
   - Click **"Run workflow"** → **"Run workflow"** (green button)
   - Wait ~30 seconds
   - Check if `n8n_news.json` was updated

**✅ Done!** The workflow will now run automatically every 2 hours.

---

### Option B: Fix n8n (If you prefer)

See `N8N_NEWSFEED_FIX.md` for detailed instructions.

**Quick version:**
1. Go to n8n: https://n8n2.kortex-system.de
2. Activate workflow "AI News Aggregator - Kortex System"
3. Add GitHub credentials to "Write to GitHub" node
4. Test workflow

---

## ✅ Step 2: Delete Render Database (2 minutes)

1. **Login to Render:**
   - Go to: https://dashboard.render.com
   - Sign in

2. **Find Database:**
   - Click **"Databases"** in left sidebar
   - Find your PostgreSQL database

3. **Delete it:**
   - Click on database name
   - Scroll to **"Danger Zone"**
   - Click **"Delete Database"**
   - Confirm

**✅ Done!** Your invoice-extractor uses in-memory storage, so it doesn't need a database.

---

## ✅ Step 3: Test Everything (1 minute)

1. **Test Newsfeed:**
   - Open your website
   - Check if newsfeed panel shows news
   - Open browser console (F12) - should see "✅ [SCHRITT 1] GitHub n8n_news.json: X News geladen"

2. **Test Invoice Extractor:**
   - Upload an invoice
   - Should work normally (uses in-memory storage)

**✅ All Done!**

---

## 📊 Summary

**Total Time:** ~5 minutes

**What was fixed:**
- ✅ Newsfeed: GitHub Actions workflow created (runs every 2 hours automatically)
- ✅ Database: Safe to delete (not needed for invoice-extractor)

**Status:** 🟢 **Website is finished!**

---

## 🆘 Need Help?

- **Newsfeed not working?** See `N8N_NEWSFEED_FIX.md`
- **Database questions?** See `RENDER_DATABASE_DELETE.md`
- **Full status report?** See `PROJECT_STATUS_REPORT.md`

---

## 🎉 You're Done!

Your website is complete. The newsfeed will update automatically every 2 hours via GitHub Actions, and you don't need the Render database anymore.

