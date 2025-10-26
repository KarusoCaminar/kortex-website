class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { --p: var(--primary, #034EA2); --p-dark: var(--primary-dark, #09182F); --muted: rgba(156,163,175,1); }
        footer { background: var(--p-dark); color: #fff; padding: 2.5rem 1rem; }
        .footer-container { max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem;align-items:start }
        .footer-logo{font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:.6rem}
        .footer-links h3{font-size:1rem;margin:0 0 .6rem;color:#fff}
        .footer-links ul{list-style:none;padding:0;margin:0}
        .footer-links a{color:var(--muted);text-decoration:none;display:block;margin-bottom:.5rem}
        .footer-links a:hover{color:#fff}
        .newsletter input{padding:.5rem;border-radius:6px;border:1px solid rgba(255,255,255,.08);background:transparent;color:#fff}
        .newsletter button{background:var(--p);color:#fff;padding:.55rem;border-radius:6px;border:0;font-weight:600;cursor:pointer}
        .copyright{margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:rgba(255,255,255,.75);font-size:.9rem;display:flex;align-items:center;justify-content:center;gap:.6rem;flex-wrap:wrap}
        .copyright img{height:24px;width:auto;opacity:0.9}
      </style>
      <footer>
        <div class="footer-container">
          <div>
            <div class="footer-logo">
              <img src="./assets/logo.png" alt="Kortex System" style="height:28px;width:auto;display:block" />
              <span>Kortex System</span>
            </div>
            <p style="color:rgba(255,255,255,.85);margin:.6rem 0 .2rem" data-i18n-footer="footer.tagline">KI-gestützte Automatisierung für den deutschen Mittelstand.</p>
          </div>
          <div class="footer-links" aria-labelledby="prod-heading">
            <h3 id="prod-heading" data-i18n-footer="footer.products">Produkte</h3>
            <ul>
              <li><a href="produkte.html#ki-kundensupport" data-i18n-footer="product1.title">KI-Kundensupport</a></li>
              <li><a href="produkte.html#datenverarbeitung" data-i18n-footer="product2.title">Datenverarbeitung</a></li>
              <li><a href="produkte.html#prozessautomatisierung" data-i18n-footer="product3.title">Prozessautomatisierung</a></li>
            </ul>
          </div>
          <div class="footer-links" aria-labelledby="company-heading">
            <h3 id="company-heading" data-i18n-footer="footer.company">Unternehmen</h3>
            <ul>
              <li><a href="ueber-uns.html" data-i18n-footer="nav.ueberuns">Über uns</a></li>
            </ul>
          </div>
          <div class="footer-links" aria-labelledby="legal-heading">
            <h3 id="legal-heading" data-i18n-footer="footer.legal">Rechtliches</h3>
            <ul>
              <li><a href="impressum.html" data-i18n-footer="footer.impressum">Impressum</a></li>
              <li><a href="datenschutz.html" data-i18n-footer="footer.datenschutz">Datenschutz</a></li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          <img src="./assets/logo.png" alt="Kortex System Logo" />
          <p style="margin:0">&copy; ${new Date().getFullYear()} Kortex System. <span data-i18n-footer="footer.copyright">Alle Rechte vorbehalten.</span></p>
        </div>
      </footer>
    `;
    
    // Listen to language change events and update footer translations
    window.addEventListener('languagechange', () => {
      this.updateFooterTranslations();
    });
    
    // Initial translation update
    setTimeout(() => this.updateFooterTranslations(), 100);
  }
  
  updateFooterTranslations() {
    if (!window.i18n) return;
    
    const footerElements = this.shadowRoot.querySelectorAll('[data-i18n-footer]');
    footerElements.forEach(element => {
      const key = element.getAttribute('data-i18n-footer');
      element.textContent = window.i18n.t(key);
    });
  }
  // small inline svg for footer logo (no dependency on feather inside shadow)
  _svgCpu(){
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" stroke-opacity="0.9" stroke-width="1.2"></rect>
      <rect x="8" y="8" width="8" height="8" rx="1" fill="white" fill-opacity="0.12"></rect>
    </svg>`;
  }
}
customElements.define('custom-footer', CustomFooter);