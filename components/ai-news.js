// AI News Panel Component - Wiederverwendbar für alle Seiten
(function() {
  'use strict';

  // --- CONFIGURATION ---
  const NEWS_URL_KEY = 'newsFeedUrl'; // Key from the global `config` object
  const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

  // --- DATA FETCHING LOGIC ---

  /**
   * Fetches AI news from the configured URL.
   * If the fetch fails, it returns a static list of demo news.
   * @returns {Promise<Array>} A promise that resolves to an array of news articles.
   */
  async function fetchAINews() {
    if (!window.config || !window.config[NEWS_URL_KEY]) {
      console.error(`❌ News feed URL is not defined in config.${NEWS_URL_KEY}`);
      return getDemoNewsData();
    }

    const newsUrl = window.config[NEWS_URL_KEY];
    console.log(`🔄 Fetching AI news from: ${newsUrl}`);

    try {
      const response = await fetch(newsUrl, {
        cache: 'no-cache', // Let the server/browser decide on caching strategy
        signal: AbortSignal.timeout(8000) // 8-second timeout
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !Array.isArray(data.news) || data.news.length === 0) {
        console.warn('⚠️ Primary news source returned no items. Using static fallback.');
        return getDemoNewsData();
      }

      return processNews(data.news);

    } catch (error) {
      console.error('❌ Error fetching AI news:', error.message);
      console.log('⚠️ Falling back to static demo news.');
      return getDemoNewsData();
    }
  }

  /**
   * Processes raw news data: filters old items, sorts by date, and limits the count.
   * @param {Array} news - The array of news articles to process.
   * @returns {Array} The processed and sorted array of news articles.
   */
  function processNews(news) {
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

    const validNews = news.filter(item => {
      if (!item.title || !item.link) return false;
      const itemDate = new Date(item.date || item.pubDate).getTime();
      const age = now - itemDate;
      return age <= maxAge && age >= 0;
    });

    return validNews
      .sort((a, b) => new Date(b.date || b.pubDate) - new Date(a.date || a.pubDate))
      .slice(0, 15); // Show up to 15 articles
  }

  /**
   * Provides a static list of demo news articles as a fallback.
   * @returns {Array} An array of demo news articles.
   */
  function getDemoNewsData() {
    const lang = window.i18n?.getCurrentLanguage() || 'de';
    return [
      {
        title: lang === 'de' ? 'Gemini 2.5 Flash: KI für den Mittelstand' : 'Gemini 2.5 Flash: AI for SMEs',
        description: lang === 'de' ? 'Google\'s Gemini 2.5 Flash ermöglicht schnelle und kosteneffiziente KI-Verarbeitung für deutsche KMUs.' : 'Google\'s Gemini 2.5 Flash enables fast and cost-effective AI processing for SMEs.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        link: 'https://deepmind.google/technologies/gemini/',
        source: 'Google AI',
        category: 'große-modelle',
      },
      {
        title: lang === 'de' ? 'Fireflies AI: Meeting-Transkription & Analyse' : 'Fireflies AI: Meeting Transcription & Analysis',
        description: lang === 'de' ? 'Fireflies AI automatisiert Meeting-Aufzeichnungen und extrahiert wichtige Punkte für Sales- und Projektteams.' : 'Fireflies AI automates meeting recordings and extracts key points for sales and project teams.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        link: 'https://fireflies.ai',
        source: 'Fireflies AI',
        category: 'sales-tools',
      },
    ];
  }

  // --- UI RENDERING LOGIC ---

  /**
   * Injects the CSS for the AI News Panel into the document head.
   */
  function injectStyles() {
    if (document.getElementById('ai-news-panel-styles')) return;
    const style = document.createElement('style');
    style.id = 'ai-news-panel-styles';
    style.textContent = `
      /* KI Tools News Feed Styles */
      .ai-news-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 340px;
        max-width: calc(100vw - 40px);
        max-height: 70vh;
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        border: 1px solid #e2e8f0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      .ai-news-panel.collapsed {
        width: 60px; height: 60px; border-radius: 30px; cursor: pointer;
      }
      .ai-news-panel-header {
        background: linear-gradient(135deg, #034EA2 0%, #1e40af 100%);
        color: white; padding: 1rem; display: flex; align-items: center; justify-content: space-between;
        cursor: pointer; user-select: none;
      }
      .collapsed .ai-news-panel-header {
        width: 60px; height: 60px; padding: 0; justify-content: center; border-radius: 30px;
      }
      .ai-news-panel-header h3 { font-size: 1rem; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 0.5rem; }
      .collapsed .ai-news-panel-header h3 span:not(.ai-icon-robot) { display: none; }
      .collapsed .ai-news-refresh-btn { display: none; }
      .ai-news-panel-content { overflow-y: auto; padding: 0.5rem 1rem; flex: 1; }
      .collapsed .ai-news-panel-content { display: none; }
      .ai-news-item { background: #f8fafc; border-radius: 10px; padding: 0.9rem; margin: 0.75rem 0; border-left: 3px solid #034EA2; cursor: pointer; transition: all 0.2s ease; }
      .ai-news-item:hover { background: #f1f5f9; transform: translateX(2px); }
      .ai-news-item h4 { font-size: 0.9rem; font-weight: 700; color: #09182F; margin: 0 0 0.4rem 0; line-height: 1.4; }
      .ai-news-item p { color: #475569; margin: 0; font-size: 0.8rem; }
      .ai-news-item .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-top: 0.6rem; font-size: 0.75rem; color: #64748b; }
      .ai-news-refresh-btn { background: rgba(255, 255, 255, 0.2); border: none; cursor: pointer; padding: 0.5rem; border-radius: 8px; color: white; transition: all 0.2s ease; }
      .ai-news-refresh-btn:hover { background: rgba(255, 255, 255, 0.3); transform: rotate(180deg); }
      .ai-news-loading, .ai-news-error { text-align: center; padding: 2rem 1rem; color: #64748b; }
    `;
    document.head.appendChild(style);
  }

  /**
   * Creates the main HTML structure for the AI News Panel.
   */
  function createAIPanel() {
    if (document.getElementById('ai-news-panel')) return;
    
    const panel = document.createElement('div');
    panel.id = 'ai-news-panel';
    panel.className = 'ai-news-panel collapsed'; // Start collapsed
    panel.innerHTML = `
      <div class="ai-news-panel-header">
        <h3>
          <span class="ai-icon-robot">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>
          </span>
          <span data-i18n="news.panel.title">KI-News</span>
        </h3>
        <button class="ai-news-refresh-btn" aria-label="Refresh News">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
        </button>
      </div>
      <div class="ai-news-panel-content">
        <div id="ai-news-container" class="ai-news-loading" data-i18n="news.panel.loading">Lade...</div>
      </div>
    `;
    document.body.appendChild(panel);
    return panel;
  }

  /**
   * Renders the news articles into the container.
   * @param {Array} newsData - An array of news articles to display.
   */
  function displayNews(newsData) {
    const container = document.getElementById('ai-news-container');
    if (!container) return;
    
    if (!newsData || newsData.length === 0) {
      container.className = 'ai-news-error';
      container.textContent = window.i18n?.t('news.panel.noNews') || 'Keine aktuellen News gefunden.';
      return;
    }

    container.className = '';
    container.innerHTML = newsData.map(item => `
      <div class="ai-news-item" onclick="window.open('${escapeHtml(item.link)}', '_blank')">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml((item.description || '').substring(0, 100))}...</p>
        <div class="meta">
          <span>${formatDate(item.date)}</span>
          <span>${escapeHtml(item.source)}</span>
        </div>
      </div>
    `).join('');
  }

  // --- EVENT HANDLING & INITIALIZATION ---

  /**
   * Main function to load and display news.
   */
  async function loadAndDisplayNews() {
    const container = document.getElementById('ai-news-container');
    if (container) {
      container.className = 'ai-news-loading';
      container.textContent = window.i18n?.t('news.panel.loading') || 'Lade...';
    }
    
    const news = await fetchAINews();
    displayNews(news);
  }

  /**
   * Sets up event listeners for the panel.
   * @param {HTMLElement} panel - The main panel element.
   */
  function setupEventListeners(panel) {
    const header = panel.querySelector('.ai-news-panel-header');
    const refreshBtn = panel.querySelector('.ai-news-refresh-btn');

    header.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
      // Load news when expanding for the first time
      if (!panel.classList.contains('collapsed') && !panel.dataset.loaded) {
        loadAndDisplayNews();
        panel.dataset.loaded = 'true';
      }
    });

    refreshBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      loadAndDisplayNews();
    });
  }
  
  /**
   * Initializes the entire component.
   */
  function init() {
    injectStyles();
    const panel = createAIPanel();
    if (panel) {
      setupEventListeners(panel);
      // Automatically refresh news periodically
      setInterval(loadAndDisplayNews, REFRESH_INTERVAL);
      // Update translations
      window.addEventListener('languagechange', loadAndDisplayNews);
      if (window.i18n) window.i18n.updateTranslations();
    }
  }

  // --- UTILITY FUNCTIONS ---
  function escapeHtml(str) { return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m])); }
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const diffDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return window.i18n?.t('date.today') || 'Heute';
    if (diffDays === 1) return window.i18n?.t('date.yesterday') || 'Gestern';
    return `${diffDays} ${window.i18n?.t('date.daysAgo') || 'Tage her'}`;
  }

  // --- START ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
