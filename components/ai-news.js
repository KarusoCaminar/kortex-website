// AI News Panel Component - Wiederverwendbar für alle Seiten
(function() {
  'use strict';
  
  // CSS Styles für AI News Panel (wird dynamisch injiziert)
  const aiNewsStyles = `
    /* KI Tools News Feed Styles - Floating Panel - Mobile Optimized */
    .ai-news-panel {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 100%;
      max-width: 420px;
      max-height: 60vh;
      background: white;
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15), 0 -4px 16px rgba(3, 78, 162, 0.1);
      border: 1px solid rgba(3, 78, 162, 0.1);
      border-bottom: none;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .ai-news-panel-header {
      background: linear-gradient(135deg, #034EA2 0%, #1e40af 100%);
      color: white;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      cursor: move;
      flex-shrink: 0;
    }
    
    .ai-news-panel-header h3 {
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .ai-news-panel-content {
      overflow-y: auto;
      padding: 1rem;
      flex: 1;
      -webkit-overflow-scrolling: touch;
    }
    
    .ai-news-panel-content::-webkit-scrollbar {
      width: 6px;
    }
    
    .ai-news-panel-content::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 3px;
    }
    
    .ai-news-panel-content::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    
    .ai-news-panel-content::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    
    .ai-news-item {
      background: linear-gradient(135deg, rgba(3, 78, 162, 0.03) 0%, rgba(30, 64, 175, 0.02) 100%);
      border-radius: 10px;
      padding: 0.9rem;
      margin-bottom: 0.75rem;
      border-left: 3px solid var(--primary, #034EA2);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .ai-news-item:hover {
      background: linear-gradient(135deg, rgba(3, 78, 162, 0.08) 0%, rgba(30, 64, 175, 0.05) 100%);
      transform: translateX(2px);
      box-shadow: 0 2px 8px rgba(3, 78, 162, 0.1);
    }
    
    .ai-news-item:active {
      transform: translateX(1px);
    }
    
    .ai-news-item h4 {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--primary-dark, #09182F);
      margin: 0 0 0.4rem 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .ai-news-item p {
      color: rgba(30, 41, 59, 0.65);
      margin: 0.4rem 0;
      line-height: 1.5;
      font-size: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .ai-news-item .meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.6rem;
      font-size: 0.75rem;
      color: rgba(30, 41, 59, 0.55);
      flex-wrap: wrap;
    }
    
    .ai-news-item .meta a {
      color: var(--primary, #034EA2);
      text-decoration: none;
      font-weight: 500;
      margin-left: auto;
    }
    
    .ai-news-item .meta a:hover {
      text-decoration: underline;
    }
    
    .ai-news-loading {
      text-align: center;
      padding: 2rem 1rem;
      color: rgba(30, 41, 59, 0.6);
      font-size: 0.85rem;
    }
    
    .ai-news-error {
      text-align: center;
      padding: 2rem 1rem;
      color: #ef4444;
      font-size: 0.85rem;
    }
    
    /* Desktop: Rechts positioniert */
    @media (min-width: 769px) {
      .ai-news-panel {
        top: 50%;
        right: 20px;
        bottom: auto;
        transform: translateY(-50%);
        max-width: 360px;
        max-height: 80vh;
        border-radius: 16px;
        border: 1px solid rgba(3, 78, 162, 0.1);
      }
      
      .ai-news-panel:hover {
        box-shadow: 0 24px 72px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(3, 78, 162, 0.15);
        transform: translateY(-50%) translateX(-4px);
      }
    }
    
    /* Mobile: Unten fixiert, immer sichtbar */
    @media (max-width: 768px) {
      .ai-news-panel {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        max-width: 100%;
        max-height: 50vh;
        border-radius: 16px 16px 0 0;
        border-left: none;
        border-right: none;
        border-bottom: none;
        box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
      }
      
      .ai-news-panel-header {
        padding: 0.85rem 1rem;
      }
      
      .ai-news-panel-header h3 {
        font-size: 0.9rem;
      }
      
      .ai-news-panel-content {
        padding: 0.85rem;
      }
      
      .ai-news-item {
        padding: 0.75rem;
        margin-bottom: 0.6rem;
      }
      
      .ai-news-item h4 {
        font-size: 0.85rem;
      }
      
      .ai-news-item p {
        font-size: 0.75rem;
      }
      
      .ai-news-item .meta {
        font-size: 0.7rem;
      }
    }
    
    /* Tablet: Mittlere Größe */
    @media (min-width: 769px) and (max-width: 1024px) {
      .ai-news-panel {
        max-width: 320px;
      }
    }
  `;
  
  // Inject CSS
  function injectStyles() {
    if (!document.getElementById('ai-news-panel-styles')) {
      const style = document.createElement('style');
      style.id = 'ai-news-panel-styles';
      style.textContent = aiNewsStyles;
      document.head.appendChild(style);
    }
  }
  
  // Create AI News Panel HTML
  function createAIPanel() {
    if (document.getElementById('ai-news-panel')) {
      return; // Already exists
    }
    
    const panel = document.createElement('div');
    panel.id = 'ai-news-panel';
    panel.className = 'ai-news-panel';
    panel.innerHTML = `
      <div class="ai-news-panel-header">
        <h3>
          <span>🤖</span>
          <span data-i18n="news.panel.title">KI-News</span>
        </h3>
      </div>
      <div class="ai-news-panel-content">
        <div id="ai-news-container" class="ai-news-loading" data-i18n="news.panel.loading">
          Lade aktuelle KI-News...
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
  }
  
  // Load AI News
  async function loadAINews() {
    const container = document.getElementById('ai-news-container');
    if (!container) return;
    
    try {
      const newsData = await fetchAINewsFromMultipleSources();
      
      if (newsData && newsData.length > 0) {
        const readMoreText = window.i18n?.t('news.item.readMore') || '→';
        container.innerHTML = newsData.map(item => `
          <div class="ai-news-item" onclick="window.open('${item.link || '#'}', '_blank')">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml((item.description || item.summary || '').substring(0, 120))}${(item.description || item.summary || '').length > 120 ? '...' : ''}</p>
            <div class="meta">
              <span>📅 ${formatDate(item.date || item.pubDate || new Date())}</span>
              ${item.source ? `<span>📰 ${escapeHtml(item.source)}</span>` : ''}
              ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>` : ''}
            </div>
          </div>
        `).join('');
      } else {
        container.innerHTML = getDemoAINews();
      }
    } catch (error) {
      console.error('Fehler beim Laden der KI-News:', error);
      container.className = 'ai-news-error';
      const errorText = window.i18n?.t('news.panel.error') || '⚠️ News konnten nicht geladen werden. Bitte versuchen Sie es später erneut.';
      container.innerHTML = errorText;
    }
  }
  
  async function fetchAINewsFromMultipleSources() {
    const news = [];
    
    // Reddit r/MachineLearning (International)
    try {
      const redditResponse = await fetch('https://www.reddit.com/r/MachineLearning/hot.json?limit=5');
      if (redditResponse.ok) {
        const redditData = await redditResponse.json();
        const redditPosts = redditData.data.children.slice(0, 2).map(post => ({
          title: post.data.title,
          description: (post.data.selftext || '').substring(0, 120) + '...',
          date: new Date(post.data.created_utc * 1000),
          link: `https://reddit.com${post.data.permalink}`,
          source: 'Reddit ML'
        }));
        news.push(...redditPosts);
      }
    } catch (e) {
      console.warn('Reddit API Fehler:', e);
    }
    
    // Hacker News (AI-relevante Stories)
    try {
      const hnResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      if (hnResponse.ok) {
        const storyIds = await hnResponse.json();
        const topStories = await Promise.all(
          storyIds.slice(0, 5).map(async id => {
            try {
              const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
              if (storyResponse.ok) {
                const story = await storyResponse.json();
                if (story.title && story.url && (
                  story.title.toLowerCase().includes('ai') || 
                  story.title.toLowerCase().includes('machine learning') || 
                  story.title.toLowerCase().includes('llm') ||
                  story.title.toLowerCase().includes('automation') ||
                  story.title.toLowerCase().includes('gemini') ||
                  story.title.toLowerCase().includes('gpt')
                )) {
                  return {
                    title: story.title,
                    description: `Tech News: ${story.url.split('/')[2]}`,
                    date: new Date(story.time * 1000),
                    link: story.url,
                    source: 'Hacker News'
                  };
                }
              }
            } catch (e) {
              return null;
            }
            return null;
          })
        );
        news.push(...topStories.filter(s => s !== null && s.link).slice(0, 2));
      }
    } catch (e) {
      console.warn('Hacker News API Fehler:', e);
    }
    
    // Entferne Duplikate und sortiere nach Datum
    const uniqueNews = news.filter((item, index, self) => 
      index === self.findIndex(t => t.link === item.link)
    );
    
    return uniqueNews.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  }
  
  function getDemoAINews() {
    const lang = window.i18n?.getCurrentLanguage() || 'de';
    const readMoreText = window.i18n?.t('news.item.readMore') || '→';
    
    if (lang === 'en') {
      return `
        <div class="ai-news-item" onclick="window.open('https://deepmind.google/technologies/gemini/', '_blank')">
          <h4>Gemini 2.5 Flash: Google's New Multimodal Model</h4>
          <p>Google's Gemini 2.5 Flash offers fast and efficient AI processing for text, images, and audio – perfect for business automation.</p>
          <div class="meta">
            <span>📅 Latest</span>
            <span>📰 Google AI</span>
            <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
        <div class="ai-news-item" onclick="window.open('https://openai.com/research', '_blank')">
          <h4>OpenAI: Latest AI Research & Models</h4>
          <p>Stay updated with OpenAI's latest research and models that enable powerful automation workflows for businesses.</p>
          <div class="meta">
            <span>📅 Latest</span>
            <span>📰 OpenAI</span>
            <a href="https://openai.com/research" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
        <div class="ai-news-item" onclick="window.open('https://n8n.io/blog', '_blank')">
          <h4>n8n Workflow Automation: AI Agents</h4>
          <p>The workflow automation platform n8n integrates AI Agents directly into automation workflows for intelligent process automation.</p>
          <div class="meta">
            <span>📅 Latest</span>
            <span>📰 n8n Blog</span>
            <a href="https://n8n.io/blog" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
        <div class="ai-news-item" onclick="window.open('https://cloud.google.com/blog/products/ai-machine-learning', '_blank')">
          <h4>Google Cloud AI: Enterprise Solutions</h4>
          <p>Google Cloud AI solutions help businesses automate processes and leverage AI for competitive advantage.</p>
          <div class="meta">
            <span>📅 Latest</span>
            <span>📰 Google Cloud</span>
            <a href="https://cloud.google.com/blog/products/ai-machine-learning" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="ai-news-item" onclick="window.open('https://deepmind.google/technologies/gemini/', '_blank')">
          <h4>Gemini 2.5 Flash: KI für den Mittelstand</h4>
          <p>Google's Gemini 2.5 Flash ermöglicht schnelle und kosteneffiziente KI-Verarbeitung für Text, Bilder und Audio – ideal für KMU-Automatisierung.</p>
          <div class="meta">
            <span>📅 Aktuell</span>
            <span>📰 Google AI</span>
            <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
        <div class="ai-news-item" onclick="window.open('https://www.bmwk.de/Redaktion/DE/Dossier/kuenstliche-intelligenz.html', '_blank')">
          <h4>KI-Förderung für Mittelstand</h4>
          <p>Das BMWK informiert über KI-Förderprogramme und Digitalisierungsunterstützung speziell für deutsche Mittelständler.</p>
          <div class="meta">
            <span>📅 Aktuell</span>
            <span>📰 BMWK</span>
            <a href="https://www.bmwk.de/Redaktion/DE/Dossier/kuenstliche-intelligenz.html" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
        <div class="ai-news-item" onclick="window.open('https://n8n.io/blog', '_blank')">
          <h4>n8n: Workflow-Automatisierung mit KI</h4>
          <p>Die Workflow-Plattform n8n integriert KI-Agenten direkt in Automatisierungsworkflows – perfekt für deutsche KMUs.</p>
          <div class="meta">
            <span>📅 Aktuell</span>
            <span>📰 n8n Blog</span>
            <a href="https://n8n.io/blog" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
        <div class="ai-news-item" onclick="window.open('https://cloud.google.com/blog/products/ai-machine-learning', '_blank')">
          <h4>Google Cloud AI: Enterprise-Lösungen</h4>
          <p>Google Cloud AI hilft Unternehmen bei der Automatisierung von Prozessen und dem Einsatz von KI für Wettbewerbsvorteile.</p>
          <div class="meta">
            <span>📅 Aktuell</span>
            <span>📰 Google Cloud</span>
            <a href="https://cloud.google.com/blog/products/ai-machine-learning" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
        <div class="ai-news-item" onclick="window.open('https://www.bmwi.de/Redaktion/DE/Artikel/Digitale-Welt/kuenstliche-intelligenz.html', '_blank')">
          <h4>BMWi: KI-Strategie Deutschland</h4>
          <p>Die Bundesregierung fördert den KI-Einsatz im Mittelstand mit konkreten Programmen und Fördermitteln.</p>
          <div class="meta">
            <span>📅 Aktuell</span>
            <span>📰 BMWi</span>
            <a href="https://www.bmwi.de/Redaktion/DE/Artikel/Digitale-Welt/kuenstliche-intelligenz.html" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>
          </div>
        </div>
      `;
    }
  }
  
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  function formatDate(date) {
    if (!date) return window.i18n?.t('news.date.unknown') || 'Unbekannt';
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    const lang = window.i18n?.getCurrentLanguage() || 'de';
    
    if (lang === 'en') {
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hrs ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      return d.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } else {
      if (diffMins < 60) return `vor ${diffMins} Min`;
      if (diffHours < 24) return `vor ${diffHours} Std`;
      if (diffDays < 7) return `vor ${diffDays} Tag${diffDays > 1 ? 'en' : ''}`;
      return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  }
  
  // Initialize on DOM ready
  function init() {
    injectStyles();
    createAIPanel();
    loadAINews();
    
    // Refresh every 30 minutes
    setInterval(loadAINews, 30 * 60 * 1000);
    
    // Reload news when language changes
    window.addEventListener('languagechange', () => {
      loadAINews();
    });
    
    // Update translations when i18n is ready
    if (window.i18n) {
      window.i18n.updateTranslations();
    }
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

