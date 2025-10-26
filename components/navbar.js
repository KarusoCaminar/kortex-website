class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { --p: var(--primary, #034EA2); --p-dark: var(--primary-dark, #09182F); --text: var(--text, #1F2937); }
        nav {
          background: white;
          padding: 1rem 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
        .logo{font-size:1.05rem;font-weight:700;color:var(--p-dark);text-decoration:none;display:flex;align-items:center;gap:.6rem}
        .logo img{height:36px;width:auto;display:block}
        .nav-links{display:flex;gap:1.25rem;align-items:center;margin:0;padding:0;list-style:none}
        .nav-link a{color:rgba(31,41,55,.85);text-decoration:none;font-weight:500;padding:.5rem 0;transition:color .16s}
        .nav-link a:hover{color:var(--p)}
        .cta-button{background:linear-gradient(135deg, var(--p) 0%, #6A1B9A 100%);color:white !important;padding:.65rem 1.25rem;border-radius:10px;font-weight:600;text-decoration:none;box-shadow:0 4px 12px rgba(3,78,162,.18);transition:all .2s ease}
        .cta-button:hover{background:linear-gradient(135deg, #09182F 0%, #220835 100%);color:white !important;transform:translateY(-1px);box-shadow:0 6px 16px rgba(3,78,162,.25)}
        .mobile-menu-button{display:none;background:none;border:0;cursor:pointer;padding:.4rem;border-radius:6px}
        .mobile-menu-button:focus{outline:2px solid rgba(3,78,162,.12)}
        
        /* Language Switcher */
        .lang-switcher{display:flex;gap:0.5rem;align-items:center;margin-left:1rem}
        .lang-btn{background:none;border:2px solid transparent;cursor:pointer;padding:0.25rem 0.4rem;border-radius:6px;font-size:1.5rem;transition:all .2s;line-height:1}
        .lang-btn:hover{border-color:var(--p);transform:scale(1.1)}
        .lang-btn.active{border-color:var(--p);background:rgba(3,78,162,.08)}
        
        @media (max-width:768px){
          .nav-links{display:none;position:absolute;left:0;right:0;top:64px;background:white;flex-direction:column;padding:1rem;border-top:1px solid rgba(0,0,0,.04)}
          .nav-links.open{display:flex}
          .mobile-menu-button{display:block}
          .lang-switcher{margin-left:0.5rem}
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

          <div style="display:flex;align-items:center">
            <div class="lang-switcher">
              <button class="lang-btn lang-de" aria-label="Deutsch" title="Deutsch">🇩🇪</button>
              <button class="lang-btn lang-en" aria-label="English" title="English">🇬🇧</button>
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