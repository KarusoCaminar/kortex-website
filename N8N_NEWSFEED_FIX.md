# 📰 Newsfeed Fix Guide

## Problem
The `n8n_news.json` file is empty, which means the newsfeed isn't working.

## Solutions

### ✅ Solution 1: GitHub Actions (RECOMMENDED - Fastest & Most Reliable)

I've created a GitHub Actions workflow that automatically updates the newsfeed every 2 hours. This is **the fastest solution** and doesn't require n8n to be running.

**Status:** ✅ Already implemented in `.github/workflows/update-newsfeed.yml`

**How it works:**
1. Runs automatically every 2 hours
2. Fetches RSS feeds from Google AI, OpenAI, The Decoder, TechCrunch
3. Filters for AI-relevant news
4. Updates `n8n_news.json` automatically
5. Commits and pushes to GitHub

**To activate:**
1. Go to your GitHub repository
2. Click on "Actions" tab
3. The workflow should appear as "Update AI News Feed"
4. It will run automatically every 2 hours
5. You can also trigger it manually by clicking "Run workflow"

**Benefits:**
- ✅ No n8n needed
- ✅ Free (GitHub Actions free tier: 2000 minutes/month)
- ✅ Reliable (runs on GitHub's infrastructure)
- ✅ Automatic (no manual intervention)

---

### Solution 2: Fix n8n Workflow

If you prefer to use n8n, here's how to fix it:

#### Step 1: Check if Workflow is Activated
1. Log into your n8n instance: `https://n8n2.kortex-system.de`
2. Go to "Workflows"
3. Find "AI News Aggregator - Kortex System"
4. Make sure it's **ACTIVATED** (toggle switch should be green)

#### Step 2: Configure GitHub Credentials
The workflow needs GitHub credentials to write to `n8n_news.json`:

1. In n8n, go to **Credentials** → **New**
2. Select **GitHub** 
3. Enter:
   - **Repository Owner**: `KarusoCaminar` (or your GitHub username)
   - **Repository Name**: `kortex-website`
   - **Personal Access Token**: Create one at https://github.com/settings/tokens
     - Permissions needed: `repo` (full control of private repositories)

4. Save credentials
5. In the workflow, click on the **"Write to GitHub"** node
6. Select your GitHub credentials from the dropdown

#### Step 3: Test the Workflow
1. Click "Execute Workflow" button
2. Check execution logs for errors
3. Verify that `n8n_news.json` is updated on GitHub

#### Step 4: Verify Cron Trigger
The workflow should run every 2 hours automatically. Check:
- "Alle 2 Stunden" node is configured correctly
- Workflow is activated

---

## Recommended n8n Templates (Alternative)

If you want to use existing templates instead of building from scratch, here are good options:

### Option 1: RSS Content with AI
**Template:** [Automate RSS Content with AI: Summarize, Notify & Archive](https://n8n.io/workflows/4503-automate-rss-content-with-ai-summarize-notify-and-archive/)
- Reads RSS feeds
- Uses AI to summarize
- Can be adapted to write to GitHub

### Option 2: AI-Powered News Monitoring
**Template:** [AI-Powered News Monitoring & Social Post Generator](https://n8n.io/workflows/9851-ai-powered-news-monitoring-and-social-post-generator-with-openai-and-upload-post/)
- Processes RSS feeds
- Filters by relevance
- Can be modified to output JSON

**To use templates:**
1. Import the template in n8n
2. Modify it to write to GitHub instead of social media
3. Adjust RSS feed URLs to match your sources

---

## Testing the Newsfeed

After fixing, test the newsfeed:

1. **Check GitHub file:**
   ```bash
   curl https://raw.githubusercontent.com/KarusoCaminar/kortex-website/main/n8n_news.json
   ```
   Should return JSON with news array

2. **Check website:**
   - Open your website
   - Check browser console (F12)
   - Look for "✅ [SCHRITT 1] GitHub n8n_news.json: X News geladen"

3. **Test webhook (if using n8n):**
   ```bash
   curl https://n8n2.kortex-system.de/webhook/ai-news-feed
   ```
   Should return JSON array of news

---

## Quick Decision Guide

**Use GitHub Actions if:**
- ✅ You want the fastest solution
- ✅ You don't want to maintain n8n
- ✅ You want reliability (GitHub infrastructure)

**Use n8n if:**
- ✅ You already have n8n running
- ✅ You want more control over filtering
- ✅ You want to add AI summarization later

---

## Current Status

- ✅ GitHub Actions workflow created
- ⚠️ n8n workflow needs GitHub credentials configured
- ✅ Website code is ready (falls back to RSS if GitHub is empty)

**Next Step:** Activate GitHub Actions workflow (recommended) or fix n8n credentials.

