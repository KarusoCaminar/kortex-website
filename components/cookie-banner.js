// Cookie Banner Component - DSGVO/TTDSG konform
(function() {
  'use strict';

  const COOKIE_CONSENT_KEY = 'cookie_consent';
  const COOKIE_CONSENT_EXPIRY_DAYS = 365;

  // Cookie-Kategorien
  const COOKIE_CATEGORIES = {
    necessary: {
      id: 'necessary',
      name: {
        de: 'Notwendige Cookies',
        en: 'Necessary Cookies'
      },
      description: {
        de: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
        en: 'These cookies are essential for the basic functions of the website and cannot be disabled.'
      },
      required: true,
      enabled: true // Immer aktiv
    },
    analytics: {
      id: 'analytics',
      name: {
        de: 'Statistik-Cookies',
        en: 'Analytics Cookies'
      },
      description: {
        de: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen anonym gesammelt werden.',
        en: 'These cookies help us understand how visitors interact with the website by collecting information anonymously.'
      },
      required: false,
      enabled: false
    },
    marketing: {
      id: 'marketing',
      name: {
        de: 'Marketing-Cookies',
        en: 'Marketing Cookies'
      },
      description: {
        de: 'Diese Cookies werden verwendet, um Besuchern auf anderen Websites relevante Werbung und Marketingkampagnen anzuzeigen.',
        en: 'These cookies are used to show visitors relevant advertisements and marketing campaigns on other websites.'
      },
      required: false,
      enabled: false
    }
  };

  // CSS Styles für Cookie Banner
  const cookieBannerStyles = `
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      padding: 1.5rem;
      max-height: 90vh;
      overflow-y: auto;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
    
    .cookie-banner.show {
      transform: translateY(0);
    }
    
    .cookie-banner-content {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .cookie-banner-header {
      margin-bottom: 1rem;
    }
    
    .cookie-banner-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      color: var(--primary-dark, #09182F);
    }
    
    .cookie-banner-header p {
      margin: 0;
      color: rgba(30, 41, 59, 0.7);
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    .cookie-banner-categories {
      margin: 1.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .cookie-category {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 1rem;
      background: #f8f9fa;
    }
    
    .cookie-category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .cookie-category-header h4 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      color: var(--primary-dark, #09182F);
    }
    
    .cookie-category-toggle {
      position: relative;
      width: 44px;
      height: 24px;
      background: #ccc;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .cookie-category-toggle.active {
      background: var(--primary, #034EA2);
    }
    
    .cookie-category-toggle.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    .cookie-category-toggle::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      top: 2px;
      left: 2px;
      transition: transform 0.3s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .cookie-category-toggle.active::after {
      transform: translateX(20px);
    }
    
    .cookie-category-description {
      font-size: 0.85rem;
      color: rgba(30, 41, 59, 0.7);
      line-height: 1.5;
      margin: 0;
    }
    
    .cookie-banner-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
    }
    
    .cookie-banner-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
      min-width: 120px;
    }
    
    .cookie-banner-btn-primary {
      background: var(--primary, #034EA2);
      color: white;
    }
    
    .cookie-banner-btn-primary:hover {
      background: var(--primary-dark, #09182F);
    }
    
    .cookie-banner-btn-secondary {
      background: transparent;
      color: var(--primary, #034EA2);
      border: 2px solid var(--primary, #034EA2);
    }
    
    .cookie-banner-btn-secondary:hover {
      background: rgba(3, 78, 162, 0.1);
    }
    
    .cookie-banner-link {
      color: var(--primary, #034EA2);
      text-decoration: underline;
    }
    
    .cookie-banner-link:hover {
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .cookie-banner {
        padding: 1rem;
      }
      
      .cookie-banner-actions {
        flex-direction: column;
      }
      
      .cookie-banner-btn {
        width: 100%;
      }
    }
  `;

  // Inject CSS
  function injectStyles() {
    if (!document.getElementById('cookie-banner-styles')) {
      const style = document.createElement('style');
      style.id = 'cookie-banner-styles';
      style.textContent = cookieBannerStyles;
      document.head.appendChild(style);
    }
  }

  // Get current language
  function getCurrentLanguage() {
    return window.i18n?.getCurrentLanguage() || 'de';
  }

  // Get consent from localStorage
  function getConsent() {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent) {
        return JSON.parse(consent);
      }
    } catch (e) {
      console.warn('Fehler beim Laden des Cookie-Consents:', e);
    }
    return null;
  }

  // Save consent to localStorage
  function saveConsent(consent) {
    try {
      const consentData = {
        ...consent,
        timestamp: Date.now(),
        expires: Date.now() + (COOKIE_CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
      };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
      
      // Also set a cookie for server-side access
      const expiryDate = new Date(consentData.expires).toUTCString();
      document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expiryDate}; path=/; SameSite=Lax`;
    } catch (e) {
      console.warn('Fehler beim Speichern des Cookie-Consents:', e);
    }
  }

  // Check if consent is valid
  function hasValidConsent() {
    const consent = getConsent();
    if (!consent) return false;
    
    // Check if consent has expired
    if (consent.expires && Date.now() > consent.expires) {
      return false;
    }
    
    return true;
  }

  // Get consent for specific category
  function hasConsentForCategory(categoryId) {
    const consent = getConsent();
    if (!consent) return false;
    
    // Necessary cookies are always allowed
    if (categoryId === 'necessary') return true;
    
    return consent.categories && consent.categories[categoryId] === true;
  }

  // Load tracking scripts based on consent
  function loadTrackingScripts(consent) {
    // Analytics (Google Analytics, etc.)
    if (consent.categories.analytics) {
      // Google Analytics wird automatisch geladen, wenn analytics.js eingebunden ist
      console.log('✅ Analytics-Cookies aktiviert');
    }
    
    // Marketing (Facebook Pixel, etc.)
    if (consent.categories.marketing) {
      // Facebook Pixel wird automatisch geladen, wenn facebook-pixel.js eingebunden ist
      console.log('✅ Marketing-Cookies aktiviert');
    }
    
    // YouTube Videos werden immer geladen, unabhängig von Cookie-Einstellungen
    // (nur Info-Meldung wird angezeigt, wenn Marketing-Cookies nicht akzeptiert wurden)
  }

  // Create cookie banner HTML
  function createCookieBanner() {
    if (document.getElementById('cookie-banner')) {
      return; // Already exists
    }

    const lang = getCurrentLanguage();
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    
    const categoriesHtml = Object.values(COOKIE_CATEGORIES).map(category => {
      const isRequired = category.required;
      const isEnabled = category.enabled;
      
      return `
        <div class="cookie-category">
          <div class="cookie-category-header">
            <h4>${category.name[lang]}</h4>
            <div class="cookie-category-toggle ${isEnabled ? 'active' : ''} ${isRequired ? 'disabled' : ''}" 
                 data-category="${category.id}"
                 ${isRequired ? 'title="Diese Kategorie ist erforderlich"' : ''}>
            </div>
          </div>
          <p class="cookie-category-description">${category.description[lang]}</p>
        </div>
      `;
    }).join('');

    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-header">
          <h3>${lang === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings'}</h3>
          <p>
            ${lang === 'de' 
              ? 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Einige Cookies sind für den Betrieb der Website erforderlich, während andere uns helfen, diese Website und die Nutzererfahrung zu verbessern (Tracking-Cookies). Sie können selbst entscheiden, ob Sie die Cookies zulassen möchten. Bitte beachten Sie, dass bei einer Ablehnung womöglich nicht mehr alle Funktionalitäten der Website zur Verfügung stehen.'
              : 'We use cookies to provide you with the best possible experience on our website. Some cookies are necessary for the operation of the website, while others help us improve this website and the user experience (tracking cookies). You can decide for yourself whether you want to allow the cookies. Please note that if you reject them, not all functionalities of the website may be available.'}
            <a href="datenschutz.html" class="cookie-banner-link" target="_blank">
              ${lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
            </a>
          </p>
        </div>
        
        <div class="cookie-banner-categories">
          ${categoriesHtml}
        </div>
        
        <div class="cookie-banner-actions">
          <button class="cookie-banner-btn cookie-banner-btn-secondary" id="cookie-banner-reject">
            ${lang === 'de' ? 'Nur notwendige' : 'Necessary only'}
          </button>
          <button class="cookie-banner-btn cookie-banner-btn-secondary" id="cookie-banner-settings" style="display: none;">
            ${lang === 'de' ? 'Einstellungen' : 'Settings'}
          </button>
          <button class="cookie-banner-btn cookie-banner-btn-primary" id="cookie-banner-accept">
            ${lang === 'de' ? 'Alle akzeptieren' : 'Accept all'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Event listeners
    setupEventListeners(banner);
  }

  // Setup event listeners
  function setupEventListeners(banner) {
    const lang = getCurrentLanguage();
    
    // Show/hide settings button
    let showSettings = false;
    const settingsBtn = document.getElementById('cookie-banner-settings');
    const categoriesDiv = banner.querySelector('.cookie-banner-categories');
    
    if (settingsBtn && categoriesDiv) {
      // Initially hide categories
      categoriesDiv.style.display = 'none';
      
      settingsBtn.addEventListener('click', () => {
        showSettings = !showSettings;
        categoriesDiv.style.display = showSettings ? 'flex' : 'none';
        settingsBtn.textContent = showSettings 
          ? (lang === 'de' ? 'Einstellungen ausblenden' : 'Hide settings')
          : (lang === 'de' ? 'Einstellungen' : 'Settings');
      });
      
      // Show settings button
      settingsBtn.style.display = 'block';
    }
    
    // Toggle category switches
    const toggles = banner.querySelectorAll('.cookie-category-toggle:not(.disabled)');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const categoryId = toggle.dataset.category;
        const category = COOKIE_CATEGORIES[categoryId];
        
        if (category && !category.required) {
          toggle.classList.toggle('active');
        }
      });
    });

    // Accept all button
    const acceptBtn = document.getElementById('cookie-banner-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        // Get current toggle states if settings are open
        const consent = {
          accepted: true,
          categories: {
            necessary: true,
            analytics: showSettings 
              ? banner.querySelector('[data-category="analytics"]')?.classList.contains('active') || false
              : true,
            marketing: showSettings
              ? banner.querySelector('[data-category="marketing"]')?.classList.contains('active') || false
              : true
          }
        };
        saveConsent(consent);
        loadTrackingScripts(consent);
        hideBanner();
        dispatchConsentEvent(consent);
      });
    }

    // Reject all (only necessary) button
    const rejectBtn = document.getElementById('cookie-banner-reject');
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        const consent = {
          accepted: true,
          categories: {
            necessary: true,
            analytics: false,
            marketing: false
          }
        };
        saveConsent(consent);
        loadTrackingScripts(consent);
        hideBanner();
        dispatchConsentEvent(consent);
      });
    }
  }

  // Hide banner
  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  // Dispatch consent event (for other scripts to listen)
  function dispatchConsentEvent(consent) {
    const event = new CustomEvent('cookieConsent', {
      detail: consent
    });
    window.dispatchEvent(event);
  }

  // Show banner if no valid consent
  function showBannerIfNeeded() {
    if (!hasValidConsent()) {
      injectStyles();
      createCookieBanner();
      
      // Show banner with animation
      setTimeout(() => {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
          banner.classList.add('show');
        }
      }, 100);
    } else {
      // Load scripts based on existing consent
      const consent = getConsent();
      if (consent) {
        loadTrackingScripts(consent);
      }
    }
  }

  // Public API
  window.CookieBanner = {
    hasConsent: hasConsentForCategory,
    getConsent: getConsent,
    showBanner: showBannerIfNeeded,
    reset: () => {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      document.cookie = `${COOKIE_CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      showBannerIfNeeded();
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBannerIfNeeded);
  } else {
    showBannerIfNeeded();
  }

  // Listen for language changes
  window.addEventListener('languagechange', () => {
    // Reload banner if visible
    if (document.getElementById('cookie-banner')) {
      const banner = document.getElementById('cookie-banner');
      banner.remove();
      showBannerIfNeeded();
    }
  });
})();

