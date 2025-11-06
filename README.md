# Kortex System Website

KI-gestützte Automatisierungslösungen für den deutschen Mittelstand.

## 🚀 Features

- **Mehrsprachig**: Deutsch und Englisch mit Sprachumschaltung
- **DSGVO-konform**: Cookie-Banner mit vollständiger Cookie-Liste
- **Analytics**: Google Analytics 4 Integration (optional)
- **Live-Demo**: YouTube-Video-Integration mit Autoplay
- **AI News Feed**: Automatisch aktualisierter News-Feed via GitHub Actions
- **Invoice Extractor**: KI-gestützte Rechnungsdatenextraktion (separate App)

## 📁 Projektstruktur

### Haupt-Website

```
├── index.html                 # Startseite
├── produkte.html              # Produktseite
├── kontakt.html               # Kontaktseite
├── faq.html                   # FAQ-Seite
├── ueber-uns.html            # Über uns
├── preise.html               # Preise
├── datenschutz.html          # Datenschutzerklärung (mit Cookie-Liste)
├── impressum.html            # Impressum
├── style.css                 # Haupt-Stylesheet
├── script.js                 # Haupt-JavaScript
├── translations.js           # Übersetzungen (DE/EN)
├── i18n.js                   # Internationalisierung
├── analytics-dashboard.html  # Analytics Dashboard
└── components/
    ├── navbar.js             # Navigation-Komponente
    ├── footer.js             # Footer-Komponente
    ├── cookie-banner.js      # Cookie-Banner (DSGVO-konform)
    ├── analytics.js          # Google Analytics Integration
    ├── facebook-pixel.js     # Facebook Pixel (optional)
    └── ai-news.js            # AI News Feed Komponente
```

### Invoice Extractor App

Separate React/TypeScript-Anwendung für Rechnungsdatenextraktion:

```
invoice-extractor/
├── client/                   # React Frontend
├── server/                   # Express Backend
├── shared/                   # Shared Types
├── render.yaml              # Render Deployment Config
└── README.md                # Detaillierte Dokumentation
```

### Assets

```
assets/
├── css/
│   └── demo-panel.css       # Demo-Panel Styles
├── js/
│   └── demo-panel.js        # YouTube Video Controller
├── products/                # Produktbilder
└── team/                    # Team-Fotos
```

### Konfiguration

```
├── .github/
│   └── workflows/
│       └── update-newsfeed.yml  # GitHub Actions für News-Feed
├── n8n_news.json            # News-Feed Daten (wird automatisch aktualisiert)
├── robots.txt               # SEO Robots
└── sitemap.xml              # SEO Sitemap
```

## 🛠️ Setup

### Lokale Entwicklung

1. **Repository klonen:**
   ```bash
   git clone https://github.com/your-username/kortex-website.git
   cd kortex-website
   ```

2. **Website öffnen:**
   - Einfach `index.html` im Browser öffnen
   - Oder lokalen Server starten:
     ```bash
     python -m http.server 8000
     # Oder
     npx serve .
     ```

3. **Invoice Extractor (optional):**
   ```bash
   cd invoice-extractor
   npm install
   npm run dev
   ```

## 📊 Analytics Setup

### Google Analytics 4

1. Erstellen Sie ein GA4-Konto auf [analytics.google.com](https://analytics.google.com)
2. Kopieren Sie Ihre Measurement ID (Format: `G-XXXXXXXXXX`)
3. Öffnen Sie `components/analytics.js`
4. Ersetzen Sie `G-XXXXXXXXXX` mit Ihrer Measurement ID
5. Analytics wird automatisch geladen, wenn Analytics-Cookies akzeptiert werden

**Dashboard:** `analytics-dashboard.html` bietet einen Überblick und Anleitungen.

### Facebook Pixel (Optional)

1. Erstellen Sie einen Pixel im [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Kopieren Sie Ihre Pixel ID
3. Öffnen Sie `components/facebook-pixel.js`
4. Ersetzen Sie `YOUR_PIXEL_ID` mit Ihrer Pixel ID
5. Aktivieren Sie das Script in `index.html` (entfernen Sie die Kommentare)

## 🍪 Cookie-Banner

Der Cookie-Banner ist DSGVO/TTDSG-konform implementiert:

- **Notwendige Cookies**: Automatisch aktiv (können nicht deaktiviert werden)
- **Analytics-Cookies**: Nur mit Einwilligung (Google Analytics)
- **Marketing-Cookies**: Nur mit Einwilligung (Facebook Pixel, YouTube)

**Vollständige Cookie-Liste:** Siehe `datenschutz.html` → "Vollständige Cookie-Liste"

## 📰 AI News Feed

Der News-Feed wird automatisch alle 6 Stunden via GitHub Actions aktualisiert:

- **Workflow:** `.github/workflows/update-newsfeed.yml`
- **Daten:** `n8n_news.json`
- **Quellen:** Deutsche und internationale KI-News-RSS-Feeds

## 🎬 Live Demo

Die Live-Demo-Section zeigt automatisch ein YouTube-Video:

- **Autoplay**: Startet automatisch
- **Loop**: Erste 20 Sekunden in Endlosschleife
- **Muted**: Stumm für bessere UX
- **Cookie-geschützt**: Wird nur geladen, wenn Marketing-Cookies akzeptiert werden

**Video ändern:** Bearbeiten Sie `index.html` → `<section id="demo">`

## 🌐 Deployment

### GitHub Pages

1. Repository auf GitHub pushen
2. Settings → Pages aktivieren
3. Branch `main` auswählen
4. Website ist unter `https://your-username.github.io/kortex-website` verfügbar

### Custom Domain

1. `CNAME`-Datei mit Ihrer Domain erstellen
2. DNS-Einträge bei Ihrem Domain-Provider konfigurieren
3. GitHub Pages Settings → Custom domain eintragen

### Invoice Extractor auf Render

Siehe `invoice-extractor/README.md` für detaillierte Anleitung.

## 📝 Wichtige Dateien

### HTML-Seiten
- `index.html` - Startseite mit Hero, Features, Demo
- `produkte.html` - Produktübersicht
- `kontakt.html` - Kontaktformular (n8n Webhook)
- `faq.html` - Häufige Fragen
- `datenschutz.html` - Datenschutzerklärung mit Cookie-Liste
- `impressum.html` - Impressum

### JavaScript-Komponenten
- `components/cookie-banner.js` - Cookie-Banner (DSGVO-konform)
- `components/analytics.js` - Google Analytics Integration
- `components/ai-news.js` - News-Feed Komponente
- `script.js` - Haupt-JavaScript (Formulare, Events)
- `i18n.js` - Internationalisierung

### Styles
- `style.css` - Haupt-Stylesheet
- `assets/css/demo-panel.css` - Demo-Panel Styles

### Konfiguration
- `translations.js` - Übersetzungen (DE/EN)
- `.github/workflows/update-newsfeed.yml` - GitHub Actions Workflow
- `n8n_news.json` - News-Feed Daten (automatisch aktualisiert)

## 🔒 Datenschutz

- **Cookie-Banner**: DSGVO/TTDSG-konform
- **Cookie-Liste**: Vollständig dokumentiert in `datenschutz.html`
- **Analytics**: Nur mit Einwilligung
- **Marketing**: Nur mit Einwilligung
- **IP-Anonymisierung**: Aktiviert in Google Analytics

## 📞 Support

Bei Fragen oder Problemen:
- **E-Mail**: info@kortex-system.com
- **Website**: https://www.kortex-system.com

## 📄 Lizenz

Alle Rechte vorbehalten. © 2025 Kortex System
