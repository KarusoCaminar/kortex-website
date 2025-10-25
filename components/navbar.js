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
        .cta-button{background:var(--p);color:#fff;padding:.5rem 1rem;border-radius:8px;font-weight:600;text-decoration:none}
        .cta-button:hover{background:var(--p-dark)}
        .mobile-menu-button{display:none;background:none;border:0;cursor:pointer;padding:.4rem;border-radius:6px}
        .mobile-menu-button:focus{outline:2px solid rgba(3,78,162,.12)}
        @media (max-width:768px){
          .nav-links{display:none;position:absolute;left:0;right:0;top:64px;background:white;flex-direction:column;padding:1rem;border-top:1px solid rgba(0,0,0,.04)}
          .nav-links.open{display:flex}
          .mobile-menu-button{display:block}
        }
      </style>

      <nav role="navigation" aria-label="Hauptnavigation">
        <div class="nav-container">
          <a href="index.html" class="logo" aria-label="Zur Startseite">
            <img src="./assets/logo.png" alt="Koretex System Logo">
            <span>Koretex System</span>
          </a>

          <ul class="nav-links" role="menubar">
            <li class="nav-link" role="none"><a role="menuitem" href="index.html">Start</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="produkte.html">Produkte</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="preise.html">Preise</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="ueber-uns.html">Über uns</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="faq.html">FAQ</a></li>
            <li class="nav-link" role="none"><a role="menuitem" href="demo.html" class="cta-button">Kostenlose Prüfung</a></li>
          </ul>

          <button class="mobile-menu-button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">
            <span class="menu-icon" data-feather="menu"></span>
          </button>
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
  }
}
customElements.define('custom-navbar', CustomNavbar);