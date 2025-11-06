class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { --p: var(--primary, #034EA2); --p-dark: var(--primary-dark, #09182F); --text: var(--text, #1F2937); --secondary: #6A1B9A; }
        nav {
          background: linear-gradient(90deg, var(--p) 0%, var(--secondary) 100%);
          padding: 1rem 1rem;
          box-shadow: 0 4px 16px rgba(3,78,162,.2);
          display: flex;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 80;
        }
        .nav-container {
          width:100%;
          max-width:1200px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:1rem;
        }
        .logo{font-size:1.05rem;font-weight:700;color:#fff;text-decoration:none;display:flex;align-items:center;gap:.6rem}
        .logo img{height:36px;width:auto;display:block;border-radius:6px;padding:2px;background:rgba(255,255,255,0.2);border:2px solid rgba(255,255,255,0.3);}
        .nav-links{display:flex;gap:1.25rem;align-items:center;margin:0;padding:0;list-style:none}
        .nav-link a{color:rgba(255,255,255,.95);text-decoration:none;font-weight:500;padding:.5rem 0;transition:all .16s}
        .nav-link a:hover{color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.1)}
        .cta-button{background:#fff;color:var(--p) !important;padding:.65rem 1.25rem;border-radius:10px;font-weight:700;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,.2);transition:all .2s ease;border:2px solid rgba(255,255,255,.3)}
        .cta-button:hover{background:rgba(255,255,255,.95);color:var(--p) !important;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.3);border-color:rgba(255,255,255,.5)}
        .mobile-menu-button{display:none;background:none;border:0;cursor:pointer;padding:.4rem;border-radius:6px;color:#fff}
        .mobile-menu-button:focus{outline:2px solid rgba(255,255,255,.3)}
        .mobile-menu-button svg{stroke:#fff}
        
        /* Language Switcher */
        .nav-right{display:flex;align-items:center;gap:1rem}
        .lang-switcher{display:flex !important;gap:0.5rem;align-items:center;background:rgba(255,255,255,.15);padding:0.25rem;border-radius:8px;backdrop-filter:blur(10px)}
        .lang-btn{background:transparent;border:2px solid transparent;cursor:pointer;padding:0.4rem 0.6rem;border-radius:6px;font-weight:normal;transition:all .2s;line-height:1;display:inline-flex !important;visibility:visible !important;align-items:center;justify-content:center;min-width:44px;height:36px}
        .lang-btn .flag-icon{width:28px;height:18px;display:block;flex-shrink:0;border-radius:2px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.2)}
        .lang-btn:hover{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.2);transform:scale(1.1);backdrop-filter:blur(10px)}
        .lang-btn.active{border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.25);box-shadow:inset 0 1px 2px rgba(0,0,0,.1);backdrop-filter:blur(10px)}
        
        @media (max-width:768px){
          .lang-btn .flag-icon{width:26px;height:16px}
          .nav-links{display:none;position:absolute;left:0;right:0;top:64px;background:linear-gradient(90deg, var(--p) 0%, var(--secondary) 100%);flex-direction:column;padding:1rem;border-top:1px solid rgba(255,255,255,.1);box-shadow:0 4px 16px rgba(0,0,0,.2)}
          .nav-links.open{display:flex}
          .mobile-menu-button{display:block;color:#fff}
          .lang-switcher{display:flex !important;gap:0.5rem}
          .nav-right{gap:0.5rem}
        }
      </style>

      <nav role="navigation" aria-label="Hauptnavigation">
        <div class="nav-container">
          <a href="index.html" class="logo" aria-label="Zur Startseite">
            <img src="./assets/logo.png" alt="Kortex System Logo">
            <span>Kortex System</span>
          </a>

          <ul class="nav-links" role="menubar">
            <li class="nav-link" role="none"><a role="menuitem" href="index.html" data-i18n="nav.start">Start</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="produkte.html" data-i18n="nav.produkte">Produkte</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="preise.html" data-i18n="nav.preise">Preise</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="ueber-uns.html" data-i18n="nav.ueberuns">Über uns</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="faq.html" data-i18n="nav.faq">FAQ</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="kontakt.html" class="cta-button" data-i18n="nav.cta">Kostenlose Prüfung</a></li>
          </ul>

          <div class="nav-right">
            <div class="lang-switcher">
              <button class="lang-btn lang-de" aria-label="Deutsch" title="Deutsch">
                <svg class="flag-icon" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                  <rect width="5" height="3" fill="#000000"/>
                  <rect y="1" width="5" height="1" fill="#DD0000"/>
                  <rect y="2" width="5" height="1" fill="#FFCE00"/>
                </svg>
              </button>
              <button class="lang-btn lang-en" aria-label="English" title="English">
                <svg class="flag-icon" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                  <rect width="60" height="30" fill="#012169"/>
                  <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="6"/>
                  <path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="4"/>
                  <path d="M0 0l60 30M60 0L0 30" stroke="#fff" stroke-width="4"/>
                  <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" stroke-width="2.5"/>
                </svg>
              </button>
            </div>
            <button class="mobile-menu-button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">
              <span class="menu-icon" data-feather="menu"></span>
            </button>
          </div>
        </div>
      </nav>
    `;

    // Rest des Codes bleibt unverändert
    const replaceIcons = () => {
      const icons = this.shadowRoot.querySelectorAll('[data-feather]');
      icons.forEach(el => {
        try {
          const name = el.getAttribute('data-feather');
          // WICHTIG: window.feather muss in script.js geladen sein, damit das funktioniert
          if (window.feather && feather.icons && feather.icons[name]) {
            el.outerHTML = feather.icons[name].toSvg({ width: 18, height: 18 });
          }
        } catch (e) { /* ignore */ }
      });
    };
    replaceIcons();

    // Mobile menu toggle
    const btn = this.shadowRoot.querySelector('.mobile-menu-button');
    const links = this.shadowRoot.querySelector('.nav-links');
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // close mobile menu when clicking outside (accessibility)
    document.addEventListener('click', (ev) => {
      if (!this.shadowRoot) return;
      const target = ev.target;
      if (!this.contains(target) && links.classList.contains('open')) {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Update Nav Translations
    const updateNavTranslations = () => {
      if (!window.i18n) return;
      this.shadowRoot.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = window.i18n.t(key);
        if (translation) el.textContent = translation;
      });
    };
    
    // Language Switcher
    const langDE = this.shadowRoot.querySelector('.lang-de');
    const langEN = this.shadowRoot.querySelector('.lang-en');
    
    const updateActiveLang = () => {
      const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'de';
      langDE.classList.toggle('active', currentLang === 'de');
      langEN.classList.toggle('active', currentLang === 'en');
      updateNavTranslations();
    };
    
    langDE.addEventListener('click', () => {
      if (window.i18n) {
        window.i18n.setLanguage('de');
        updateActiveLang();
      }
    });
    
    langEN.addEventListener('click', () => {
      if (window.i18n) {
        window.i18n.setLanguage('en');
        updateActiveLang();
      }
    });
    
    // Initial update
    setTimeout(() => {
      updateActiveLang();
      updateNavTranslations();
    }, 100);
    
    // Listen to language changes
    window.addEventListener('languagechange', updateActiveLang);
  }
}
customElements.define('custom-navbar', CustomNavbar);