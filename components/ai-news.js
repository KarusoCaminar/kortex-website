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
    
    .ai-news-item .category-badge {
      background: rgba(3, 78, 162, 0.1);
      color: var(--primary, #034EA2);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 500;
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
    
    /* Mobile: Diskret an der Seite, ausblendbar */
    @media (max-width: 768px) {
      .ai-news-panel {
        position: fixed;
        bottom: 16px;
        right: 16px;
        left: auto;
        width: 320px;
        max-width: calc(100vw - 32px);
        max-height: 60vh;
        border-radius: 16px;
        border: 1px solid rgba(3, 78, 162, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        transform: translateY(0);
        transition: all 0.3s ease;
        z-index: 999;
      }
      
      /* Minimiert: Nur Button sichtbar */
      .ai-news-panel.collapsed {
        width: 56px;
        height: 56px;
        border-radius: 28px;
        overflow: visible;
      }
      
      .ai-news-panel.collapsed .ai-news-panel-content {
        display: none;
      }
      
      .ai-news-panel.collapsed .ai-news-panel-header {
        padding: 0;
        border-radius: 28px;
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .ai-news-panel.collapsed .ai-news-panel-header h3 {
        font-size: 1.5rem;
      }
      
      .ai-news-panel.collapsed .ai-news-panel-header h3 span:not(:first-child) {
        display: none;
      }
      
      /* Expandiert: Vollständiges Panel */
      .ai-news-panel:not(.collapsed) {
        width: 320px;
        max-width: calc(100vw - 32px);
      }
      
      .ai-news-panel-header {
        padding: 0.85rem 1rem;
        cursor: pointer;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
      }
      
      .ai-news-panel-header h3 {
        font-size: 0.9rem;
        margin: 0;
        flex: 1;
      }
      
      .ai-news-refresh-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        font-size: 1rem;
        transition: all 0.2s;
        opacity: 0.6;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 28px;
        height: 28px;
      }
      
      .ai-news-refresh-btn:hover {
        opacity: 1;
        background: rgba(3, 78, 162, 0.1);
        transform: rotate(180deg);
      }
      
      .ai-news-refresh-btn:active {
        transform: rotate(360deg);
      }
      
      .ai-news-panel-content {
        padding: 0.85rem;
        max-height: calc(60vh - 60px);
        overflow-y: auto;
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
    
    // Auf Mobile standardmäßig minimiert
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      panel.classList.add('collapsed');
    }
    
    panel.innerHTML = `
      <div class="ai-news-panel-header" id="ai-news-toggle">
        <h3>
          <span>🤖</span>
          <span data-i18n="news.panel.title">KI-News</span>
        </h3>
        <button class="ai-news-refresh-btn" id="ai-news-refresh" title="Aktualisieren" aria-label="News aktualisieren">🔄</button>
      </div>
      <div class="ai-news-panel-content">
        <div id="ai-news-container" class="ai-news-loading" data-i18n="news.panel.loading">
          Lade aktuelle KI-News...
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    // Toggle-Funktionalität für Mobile
    setupMobileToggle();
    
    // Refresh-Button Funktionalität
    const refreshBtn = document.getElementById('ai-news-refresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Verhindere Toggle beim Klick auf Refresh
        console.log('🔄 Manueller Refresh gestartet...');
        loadAINews(true); // Force refresh - löscht Cache
      });
    }
    
    // Bei Resize prüfen
    window.addEventListener('resize', () => {
      const isMobileNow = window.innerWidth <= 768;
      if (isMobileNow && !panel.classList.contains('collapsed')) {
        // Auf Mobile, wenn nicht explizit geöffnet, minimieren
        // (nur wenn vorher Desktop war)
        if (window.innerWidth <= 768) {
          // panel.classList.add('collapsed');
        }
      }
    });
  }
  
  // Mobile Toggle-Funktionalität
  function setupMobileToggle() {
    const toggleBtn = document.getElementById('ai-news-toggle');
    const panel = document.getElementById('ai-news-panel');
    
    if (!toggleBtn || !panel) return;
    
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Auf Mobile: Toggle collapsed state
        panel.classList.toggle('collapsed');
        
        // Wenn geöffnet wird, News laden falls noch nicht geladen
        if (!panel.classList.contains('collapsed')) {
          loadAINews();
        }
      }
    });
    
    // Klick außerhalb schließt auf Mobile
    if (window.innerWidth <= 768) {
      document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !panel.classList.contains('collapsed')) {
          panel.classList.add('collapsed');
        }
      });
    }
  }
  
  // Load AI News (mit Caching für bessere Performance)
  async function loadAINews(forceRefresh = false) {
    const container = document.getElementById('ai-news-container');
    if (!container) return;
    
    // Wenn manuelles Refresh: Cache löschen
    if (forceRefresh) {
      localStorage.removeItem('ai-news-cache');
      console.log('🔄 Manuelles Refresh - Cache gelöscht');
    }
    
    // Prüfe Cache (5 Minuten) - nur wenn kein forceRefresh
    if (!forceRefresh) {
      const cacheKey = 'ai-news-cache';
      const cacheTime = 5 * 60 * 1000; // 5 Minuten
      const cached = localStorage.getItem(cacheKey);
      const now = Date.now();
      
      if (cached) {
        try {
          const cacheData = JSON.parse(cached);
          if (now - cacheData.timestamp < cacheTime && cacheData.news && cacheData.news.length > 0) {
            // Verwende gecachte News
            displayNews(cacheData.news, container);
            // Lade im Hintergrund neue News
            fetchAndCacheNews(container);
            return;
          }
        } catch (e) {
          console.warn('Fehler beim Laden aus Cache:', e);
        }
      }
    }
    
    // Lade neue News
    await fetchAndCacheNews(container);
  }
  
  // Manuelles Aktualisieren (public API)
  window.refreshAINews = function() {
    console.log('🔄 Manuelles Aktualisieren des AI-Newsfeeds...');
    loadAINews(true);
  };
  
  // Lade News und cache sie
  async function fetchAndCacheNews(container) {
    try {
      // Zeige Loading-Indikator
      container.innerHTML = '<div class="ai-news-loading">🔄 Lade aktuelle AI-News...</div>';
      
      const newsData = await fetchAINewsFromMultipleSources();
      
      // Cache die News
      if (newsData && newsData.length > 0) {
        const cacheData = {
          news: newsData,
          timestamp: Date.now()
        };
        localStorage.setItem('ai-news-cache', JSON.stringify(cacheData));
        console.log(`✅ ${newsData.length} News geladen und gecacht`);
      } else {
        console.warn('⚠️ Keine News-Daten erhalten');
      }
      
      if (newsData && newsData.length > 0) {
        displayNews(newsData, container);
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
  
  // Zeige News an
  function displayNews(newsData, container) {
    const readMoreText = window.i18n?.t('news.item.readMore') || '→';
    container.className = 'ai-news-panel-content';
    container.innerHTML = newsData.map(item => `
      <div class="ai-news-item" onclick="window.open('${item.link || '#'}', '_blank')">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml((item.description || item.summary || '').substring(0, 120))}${(item.description || item.summary || '').length > 120 ? '...' : ''}</p>
        <div class="meta">
          <span>📅 ${formatDate(item.date || item.pubDate || new Date())}</span>
          ${item.source ? `<span>📰 ${escapeHtml(item.source)}</span>` : ''}
          ${item.category ? `<span class="category-badge">${getCategoryEmoji(item.category)} ${getCategoryName(item.category, window.i18n?.getCurrentLanguage() || 'de')}</span>` : ''}
          ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">${readMoreText}</a>` : ''}
        </div>
      </div>
    `).join('');
  }
  
  // RSS Feed Parser Funktion
  function parseRSSFeed(xmlText, source, maxItems = 5) {
    const news = [];
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      
      items.forEach((item, index) => {
        if (index < maxItems) {
          const title = item.querySelector('title')?.textContent?.trim() || '';
          const description = item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '').trim().substring(0, 200) || '';
          const link = item.querySelector('link')?.textContent?.trim() || '';
          const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
          
          // Filtere nur relevante AI-News
          const titleLower = title.toLowerCase();
          const descLower = description.toLowerCase();
          
          // Erweiterte Keywords für AI, KMU und Branchenrelevanz
          const aiKeywords = [
            'ai', 'artificial intelligence', 'machine learning', 'llm', 'gemini', 'gpt', 'claude', 
            'automation', 'workflow', 'neural', 'deep learning', 'ki', 'kuenstliche intelligenz',
            'mittelstand', 'kmu', 'sme', 'digitalisierung', 'industrie 4.0', 'prozessautomatisierung',
            'rpa', 'robot process automation', 'chatbot', 'assistenzsystem', 'assistenzsysteme',
            'datenanalyse', 'predictive analytics', 'computer vision', 'nlp', 'natural language processing'
          ];
          const isRelevant = aiKeywords.some(keyword => titleLower.includes(keyword) || descLower.includes(keyword));
          
          if (isRelevant && title && link) {
            // Bestimme Kategorie (erweitert für KMU und Branchen)
            let category = 'große-modelle';
            if (titleLower.includes('workflow') || titleLower.includes('n8n') || titleLower.includes('automation') || titleLower.includes('prozessautomatisierung')) {
              category = 'workflow-tools';
            } else if (titleLower.includes('sales') || titleLower.includes('hubspot') || titleLower.includes('crm') || titleLower.includes('vertrieb')) {
              category = 'sales-tools';
            } else if (titleLower.includes('mittelstand') || titleLower.includes('kmu') || titleLower.includes('sme') || titleLower.includes('unternehmen')) {
              category = 'kmu-relevanz';
            } else if (titleLower.includes('industrie') || titleLower.includes('produktion') || titleLower.includes('manufacturing')) {
              category = 'industrie-4.0';
            } else if (titleLower.includes('dienstleistung') || titleLower.includes('service') || titleLower.includes('beratung')) {
              category = 'dienstleister-tools';
            }
            
            news.push({
              title: title,
              description: description,
              date: pubDate ? new Date(pubDate) : new Date(),
              link: link,
              source: source,
              category: category,
              language: 'en'
            });
          }
        }
      });
    } catch (e) {
      console.warn(`Fehler beim Parsen von ${source}:`, e);
    }
    return news;
  }
  
  async function fetchAINewsFromMultipleSources() {
    const news = [];
    const lang = window.i18n?.getCurrentLanguage() || 'de';
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 Tage
    const fallbackTimeout = 12 * 60 * 60 * 1000; // 12 Stunden - Fallback wenn n8n länger als 12h keine Daten hat
    
    // ===== SCHRITT 1: n8n Webhook (PRIORITÄT) =====
    // n8n Workflow ist die Hauptquelle - wird zuerst versucht
    let n8nSuccess = false;
    try {
      const n8nNewsUrl = 'https://n8n2.kortex-system.de/webhook/ai-news-feed';
      console.log('🔄 [PRIORITÄT] Lade n8n AI-News...', n8nNewsUrl);
      
      const n8nResponse = await fetch(n8nNewsUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-cache',
        signal: AbortSignal.timeout(10000) // 10 Sekunden Timeout
      });
      
      console.log('📡 n8n Response Status:', n8nResponse.status, n8nResponse.statusText);
      
      if (n8nResponse.ok) {
        const responseText = await n8nResponse.text();
        console.log('📋 n8n Response Text (roh):', responseText.substring(0, 200));
        
        if (!responseText || responseText.trim().length === 0) {
          console.warn('⚠️ n8n Response ist LEER - Workflow gibt keine Daten zurück, nutze Fallback');
        } else {
          let n8nData;
          try {
            n8nData = JSON.parse(responseText);
          } catch (parseError) {
            console.warn('⚠️ n8n Response ist kein gültiges JSON:', parseError.message);
            console.warn('📋 Nutze Fallback RSS-Feeds');
          }
          
          if (n8nData && Array.isArray(n8nData) && n8nData.length > 0) {
            const now = Date.now();
            const validNews = n8nData
              .filter(item => {
                if (!item.title || !item.link) return false;
                if (!item.date && !item.pubDate) return false;
                const itemDate = new Date(item.date || item.pubDate).getTime();
                const age = now - itemDate;
                return age <= maxAge && age >= 0;
              })
              .map(item => ({
                title: item.title.trim(),
                description: item.description || '',
                link: item.link.trim(),
                date: item.date || item.pubDate || new Date().toISOString(),
                source: item.source || 'n8n Feed',
                category: item.category || 'ai-news',
                language: item.language || lang
              }));
            
            if (validNews.length >= 3) {
              // n8n liefert genug News (> 3) - verwende diese und überspringe Fallback
              console.log(`✅ n8n erfolgreich: ${validNews.length} gültige News gefunden - nutze n8n Daten`);
              news.push(...validNews);
              n8nSuccess = true;
            } else if (validNews.length > 0) {
              // n8n liefert zu wenige News (< 3) - nutze Fallback zusätzlich
              console.log(`⚠️ n8n liefert nur ${validNews.length} News (< 3) - nutze zusätzlich Fallback RSS-Feeds`);
              news.push(...validNews);
              // Weiter zu Fallback
            } else {
              console.warn('⚠️ n8n Response hat keine gültigen News - nutze Fallback RSS-Feeds');
            }
          } else {
            console.warn('⚠️ n8n Response ist kein Array oder leer - nutze Fallback RSS-Feeds');
          }
        }
      } else {
        const errorText = await n8nResponse.text().catch(() => '');
        console.warn(`⚠️ n8n Response nicht OK (${n8nResponse.status}): ${n8nResponse.statusText} - nutze Fallback RSS-Feeds`);
      }
    } catch (n8nError) {
      // Timeout, Network Error, etc. - nutze Fallback
      console.warn('⚠️ n8n Webhook Fehler:', n8nError.message, '- nutze Fallback RSS-Feeds');
    }
    
    // ===== SCHRITT 2: RSS-Feed Fallback (nur wenn n8n fehlschlägt oder zu wenige News liefert) =====
    // RSS-Feeds werden NUR als Fallback geladen wenn:
    // - n8n fehlschlägt (n8nSuccess === false)
    // - n8n zu wenige News liefert (< 3 News)
    if (!n8nSuccess || news.length < 3) {
      console.log('🔄 [FALLBACK] Lade direkte RSS-Feeds (nur bei n8n Fehler oder zu wenigen News)');
      
      // RSS Feed Quellen für Fallback
      // HINWEIS: Diese werden nur geladen wenn n8n nicht verfügbar ist
      // RSS Feed Quellen definieren (nur für Fallback)
      const rssFeeds = [
        {
          url: 'https://blog.n8n.io/rss.xml',
          source: 'n8n Blog',
          category: 'workflow-tools',
          corsFriendly: true // Einziger CORS-freundlicher Feed
        }
        // Alle anderen Feeds haben CORS-Probleme und sollten über n8n geladen werden
        // Diese sind nur als letzter Fallback definiert
      ];
      
      // Versuche CORS-freundliche Feeds direkt zu laden
      const feedPromises = rssFeeds
        .filter(feed => feed.corsFriendly === true)
        .map(async (feed) => {
          try {
            const response = await fetch(feed.url, {
              method: 'GET',
              headers: { 'Accept': 'application/rss+xml, application/xml, text/xml' },
              mode: 'cors',
              signal: AbortSignal.timeout(5000) // 5 Sekunden Timeout
            });
            
            if (response.ok) {
              const xmlText = await response.text();
              const feedNews = parseRSSFeed(xmlText, feed.source, 5);
              
              const now = Date.now();
              const recentNews = feedNews.filter(item => {
                const itemDate = new Date(item.date).getTime();
                const age = now - itemDate;
                return age <= maxAge && age >= 0;
              });
              
              if (recentNews.length > 0) {
                console.log(`✅ [FALLBACK] ${feed.source}: ${recentNews.length} News geladen`);
              }
              
              return recentNews;
            }
          } catch (e) {
            console.warn(`⚠️ [FALLBACK] Fehler beim Laden von ${feed.source}:`, e.message);
          }
          return [];
        });
      
      const feedResults = await Promise.allSettled(feedPromises);
      feedResults.forEach((result) => {
        if (result.status === 'fulfilled' && Array.isArray(result.value) && result.value.length > 0) {
          news.push(...result.value);
        }
      });
    }
    
    // ===== SCHRITT 3: Statische Fallback-News (nur wenn keine echten News vorhanden) =====
    // Nur hinzufügen wenn weniger als 3 echte Nachrichten vorhanden sind
    // WICHTIG: Diese News werden NUR angezeigt wenn sowohl n8n als auch RSS-Feeds fehlschlagen
    if (news.length < 3) {
      console.log(`⚠️ Nur ${news.length} echte News gefunden - füge Fallback-News hinzu (n8n-Daten könnten fehlen)`);
      const aitoolsNews = [
        {
          title: lang === 'de' ? 'Fireflies AI: Meeting-Transkription & Analyse' : 'Fireflies AI: Meeting Transcription & Analysis',
          description: lang === 'de' ? 'Fireflies AI automatisiert Meeting-Aufzeichnungen und extrahiert wichtige Punkte für Sales- und Projektteams.' : 'Fireflies AI automates meeting recordings and extracts key points for sales and project teams.',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          link: 'https://fireflies.ai',
          source: 'Fireflies AI',
          category: 'sales-tools',
          language: lang
        },
        {
          title: lang === 'de' ? 'HubSpot AI: Automatisierte Lead-Bewertung' : 'HubSpot AI: Automated Lead Scoring',
          description: lang === 'de' ? 'HubSpot AI bewertet Leads automatisch und priorisiert die besten Verkaufschancen für Ihr Sales-Team.' : 'HubSpot AI automatically scores leads and prioritizes the best sales opportunities.',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          link: 'https://www.hubspot.com/products/ai',
          source: 'HubSpot AI',
          category: 'sales-tools',
          language: lang
        },
        {
          title: lang === 'de' ? 'Gemini 2.5 Flash: KI für den Mittelstand' : 'Gemini 2.5 Flash: AI for SMEs',
          description: lang === 'de' ? 'Google\'s Gemini 2.5 Flash ermöglicht schnelle und kosteneffiziente KI-Verarbeitung für deutsche KMUs.' : 'Google\'s Gemini 2.5 Flash enables fast and cost-effective AI processing for SMEs.',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          link: 'https://deepmind.google/technologies/gemini/',
          source: 'Google AI',
          category: 'große-modelle',
          language: lang
        },
        {
          title: lang === 'de' ? 'Otter.ai: KI-gestützte Meeting-Notizen' : 'Otter.ai: AI-Powered Meeting Notes',
          description: lang === 'de' ? 'Otter.ai erstellt automatisch Transkripte, Zusammenfassungen und Action Items aus Meetings.' : 'Otter.ai automatically creates transcripts, summaries, and action items from meetings.',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          link: 'https://otter.ai',
          source: 'Otter.ai',
          category: 'dienstleister-tools',
          language: lang
        },
        {
          title: lang === 'de' ? 'Salesforce Einstein: Predictive Analytics' : 'Salesforce Einstein: Predictive Analytics',
          description: lang === 'de' ? 'Salesforce Einstein nutzt KI für Vorhersageanalysen und automatisiert Sales-Prozesse.' : 'Salesforce Einstein uses AI for predictive analytics and automates sales processes.',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          link: 'https://www.salesforce.com/products/einstein/overview/',
          source: 'Salesforce',
          category: 'sales-tools',
          language: lang
        }
      ];
      
      // Filtere nach Sprache und füge hinzu (nur bis wir 5 Nachrichten haben)
      aitoolsNews
        .filter(item => item.language === lang)
        .slice(0, Math.max(0, 5 - news.length))
        .forEach(item => news.push(item));
    }
    
    // 5. Deutsche KMU-relevante Quellen (falls Deutsch) - nur als Fallback wenn zu wenige News
    if (lang === 'de' && news.length < 5) {
      const deutscheKmuNews = [
        {
          title: 'BMWK: KI-Förderung für Mittelstand',
          description: 'Das BMWK informiert über KI-Förderprogramme und Digitalisierungsunterstützung für deutsche Mittelständler.',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          link: 'https://www.bmwk.de/Redaktion/DE/Dossier/kuenstliche-intelligenz.html',
          source: 'BMWK',
          category: 'kmu-relevanz',
          language: 'de'
        },
        {
          title: 'Mittelstand Digital: KI in der Produktion',
          description: 'Wie KMUs KI für Prozessautomatisierung und Effizienzsteigerung in der Produktion einsetzen können.',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          link: 'https://www.digitale-technologien.de',
          source: 'Mittelstand Digital',
          category: 'industrie-4.0',
          language: 'de'
        }
      ];
      
      deutscheKmuNews
        .slice(0, Math.max(0, 5 - news.length))
        .forEach(item => news.push(item));
    }
    
    // Entferne Duplikate (nach Link)
    const uniqueNews = news.filter((item, index, self) => 
      index === self.findIndex(t => t.link === item.link)
    );
    
    // Filtere alte Nachrichten heraus (max. 30 Tage alt)
    const maxAgeFinal = 30 * 24 * 60 * 60 * 1000; // 30 Tage in Millisekunden
    const now = Date.now();
    const recentNews = uniqueNews.filter(item => {
      const itemDate = new Date(item.date || item.pubDate || new Date()).getTime();
      const age = now - itemDate;
      return age <= maxAgeFinal && age >= 0; // Nur aktuelle News (nicht in der Zukunft)
    });
    
    // Sortiere nach Datum (neueste zuerst) und limitiere auf 5
    const sortedNews = recentNews.sort((a, b) => {
      const dateA = new Date(a.date || a.pubDate || new Date()).getTime();
      const dateB = new Date(b.date || b.pubDate || new Date()).getTime();
      return dateB - dateA; // Neueste zuerst
    }).slice(0, 5);
    
    return sortedNews;
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
  
  function getCategoryEmoji(category) {
    const emojis = {
      'große-modelle': '🤖',
      'workflow-tools': '⚙️',
      'sales-tools': '💼',
      'dienstleister-tools': '🔧',
      'bau-tools': '🏗️',
      'gewerbe-tools': '🛒',
      'handwerk-tools': '🔨',
      'deutsche-quellen': '🇩🇪',
      'kmu-relevanz': '🏢',
      'industrie-4.0': '🏭'
    };
    return emojis[category] || '📰';
  }
  
  function getCategoryName(category, lang) {
    const names = {
      de: {
        'große-modelle': 'Große KI-Modelle',
        'workflow-tools': 'Workflow-Tools',
        'sales-tools': 'Sales-Tools',
        'dienstleister-tools': 'Dienstleister-Tools',
        'bau-tools': 'Bau-Tools',
        'gewerbe-tools': 'Gewerbe-Tools',
        'handwerk-tools': 'Handwerk-Tools',
        'deutsche-quellen': 'Deutsche Quelle',
        'kmu-relevanz': 'KMU-relevant',
        'industrie-4.0': 'Industrie 4.0'
      },
      en: {
        'große-modelle': 'Large AI Models',
        'workflow-tools': 'Workflow Tools',
        'sales-tools': 'Sales Tools',
        'dienstleister-tools': 'Service Tools',
        'bau-tools': 'Construction Tools',
        'gewerbe-tools': 'Commerce Tools',
        'handwerk-tools': 'Trade Tools',
        'deutsche-quellen': 'German Source',
        'kmu-relevanz': 'SME-relevant',
        'industrie-4.0': 'Industry 4.0'
      }
    };
    return names[lang]?.[category] || category;
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
    
    // Refresh every 10 minutes (für aktuelle News)
    setInterval(() => {
      // Lösche Cache und lade neue News
      localStorage.removeItem('ai-news-cache');
      loadAINews();
    }, 10 * 60 * 1000);
    
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

