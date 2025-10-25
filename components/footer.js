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
        .copyright{margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:rgba(255,255,255,.75);font-size:.9rem}
      </style>
      <footer>
        <div class="footer-container">
          <div>
            <div class="footer-logo">
              <span aria-hidden="true">${this._svgCpu()}</span>
              <span>Koretex System</span>
            </div>
            <p style="color:rgba(255,255,255,.85);margin:.6rem 0 .2rem">KI-gestützte Automatisierung für den deutschen Mittelstand.</p>
          </div>
          <div class="footer-links" aria-labelledby="prod-heading">
            <h3 id="prod-heading">Produkte</h3>
            <ul>
              <li><a href="produkte.html#ki-kundensupport">KI-Kundensupport</a></li>
              <li><a href="produkte.html#datenverarbeitung">Datenverarbeitung</a></li>
              <li><a href="produkte.html#prozessautomatisierung">Prozessautomatisierung</a></li>
            </ul>
          </div>
          <div class="footer-links" aria-labelledby="company-heading">
            <h3 id="company-heading">Unternehmen</h3>
            <ul>
              <li><a href="ueber-uns.html">Über uns</a></li>
              <li><a href="karriere.html">Karriere</a></li>
              <li><a href="blog.html">Blog</a></li>
            </ul>
          </div>
          <div class="newsletter" aria-labelledby="newsletter-heading">
            <h3 id="newsletter-heading">Newsletter</h3>
            <p style="color:rgba(255,255,255,.85);margin:0 0 .6rem">Bleiben Sie auf dem Laufenden.</p>
            <input type="email" placeholder="Ihre E-Mail-Adresse" aria-label="E-Mail für Newsletter">
            <button type="button">Anmelden</button>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; ${new Date().getFullYear()} Koretex System GmbH. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    `;
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