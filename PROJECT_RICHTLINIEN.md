# 📋 Projekt-Richtlinien und Regeln

## 1. Internationalisierung (i18n)

### Priorität für Sprache:
1. **URL-Query-Parameter** (`?lang=en` oder `?lang=de`) hat **höchste Priorität**
2. **localStorage** (gespeicherte Sprache)
3. **Browser-Sprache** (nur als Fallback)

### Implementierung:
- Alle hardcodierten Texte wurden durch `window.i18n?.t()`-Aufrufe ersetzt
- Sprache wird automatisch erkannt und gespeichert
- **Sprachübergabe:**
  - ✅ **Wird übergeben:** An den Rechnungsdaten-Extraktor (Invoice Extractor)
  - ❌ **Wird NICHT übergeben:** An den Business Card n8n Workflow

### Dateien:
- `i18n.js` - Zentrale i18n-Logik
- `translations.js` - Alle Übersetzungen (DE/EN)

---

## 2. Mobile Optimierung

### Responsive Design:
- **Results-Tabelle:** Wurde für mobile Geräte optimiert
- **Karten-Layout:** Daten werden auf Mobile als Karten angezeigt
- **SVG Icons:** Emojis wurden durch SVG-Icons ersetzt für bessere Skalierbarkeit

### CSS:
- Mobile-First Approach
- Media Queries für verschiedene Bildschirmgrößen
- Touch-optimierte Buttons und Interaktionen

---

## 3. SEO Optimierung

### URL-Struktur:
- `kortex-n8n-modal.html` → `visitenkarten-ki-extraktion.html` (SEO-freundlich)
- 301-Weiterleitung von alter zu neuer URL

### Meta-Tags:
- **Title Tag:** SEO-optimiert mit Keywords
- **Meta Description:** Relevante Beschreibung
- **Keywords:** Relevante Keywords
- **Canonical URL:** Korrekte Canonical-URL
- **Open Graph:** OG-Tags für Social Media
- **Twitter Cards:** Twitter-spezifische Meta-Tags

### Content:
- **Problem/Solution:** 600+ Wörter relevanter Content
- **FAQ:** Häufig gestellte Fragen
- **ROI:** Return on Investment Informationen
- **DSGVO:** Datenschutzinformationen
- **Technologie:** Technische Details

### Schema Markup:
- `HowTo` Schema für Anleitungen
- `FAQPage` Schema für FAQs
- `BreadcrumbList` Schema für Navigation

### Technische SEO:
- `sitemap.xml` im Root-Verzeichnis
- `robots.txt` korrekt konfiguriert
- Interne Verlinkung optimiert

---

## 4. Newsfeed Zuverlässigkeit & Debugging

### Fallback-Hierarchie:
1. **n8n Webhook** (Hauptquelle)
   - URL: `https://n8n2.kortex-system.de/webhook/ai-news-feed`
   - Direkter Zugriff auf aktuelle News
2. **GitHub Fallback** (`n8n_news.json`)
   - URL: `https://raw.githubusercontent.com/KarusoCaminar/kortex-website/main/n8n_news.json`
   - Wird vom n8n Cron-Workflow alle 2 Stunden aktualisiert
3. **RSS-Feeds** (direkt)
   - Nur als Notfall-Fallback
   - CORS-freundliche Feeds
4. **Statische Fallback-News**
   - Nur als letzter Fallback
   - Wenn alle anderen Quellen fehlschlagen

### Caching:
- **localStorage:** News werden 2 Minuten gecacht
- **Cache-Löschung:** Bei manuellem Refresh oder Sprachänderung
- **Cache-Key:** `ai-news-cache`

### Debug Logging:
- Umfangreiches Debug-Logging in `components/ai-news.js`
- Loggt: n8n Response, Cache-Status, News-Daten, Übersetzungen
- Console-Logs für Troubleshooting

### n8n Workflow:
- **Trigger Type:** Wird in `$workflow.data.currentTriggerType` gespeichert
- **Parse RSS & Filter:** Verwendet `triggerType` aus Workflow-Daten
- **GitHub Node:** Verwendet `Edit` Operation für Updates
- **Commit Message:** `docs: [AUTOMATED] Update AI news feed`

---

## 5. Code-Qualität & Wartbarkeit

### Clean Code:
- **Lesbarkeit:** Code ist gut strukturiert und kommentiert
- **Wartbarkeit:** Modulare Funktionen, keine Code-Duplikation
- **Error Handling:** Try-Catch für alle kritischen Operationen
- **Type Safety:** TypeScript oder JSDoc wo möglich

### Git:
- **`.gitignore`:** Korrekt konfiguriert
  - `node_modules/`
  - `.env` Dateien
  - Build-Ordner
  - System-Dateien (`.DS_Store`, `Thumbs.db`)
  - Editor-Dateien (`.vscode/`, `.idea/`)
  - Log-Dateien
  - Temporäre Dateien
- **Commits:** Aussagekräftige Commit-Messages
- **Branches:** Klare Branch-Strategie

### Repository Cleanup:
- Unnötige Dateien entfernt
- Dokumentation aktualisiert
- README.md aktuell
- Repository ist produktionsbereit

---

## 6. Deployment (Render)

### Invoice Extractor App:
- **Subfolder:** `invoice-extractor/`
- **Root Directory:** `invoice-extractor/`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Environment Variables:** Korrekt konfiguriert

### Website:
- **Root Directory:** `/` (Hauptverzeichnis)
- **Build Command:** Nicht erforderlich (statische Website)
- **Start Command:** Nicht erforderlich (statische Website)

---

## 7. Datei-Struktur

```
kortex-website/
├── components/              # Website-Komponenten
│   ├── ai-news.js          # AI Newsfeed
│   └── ...
├── invoice-extractor/       # Invoice Extractor App (Subfolder)
│   ├── client/
│   ├── server/
│   └── shared/
├── index.html               # Hauptseite
├── visitenkarten-ki-extraktion.html  # SEO-optimierte Landing Page
├── i18n.js                  # i18n-Logik
├── translations.js          # Übersetzungen
├── n8n_news.json            # News-Fallback (vom n8n Workflow geschrieben)
├── sitemap.xml             # Sitemap
├── robots.txt              # Robots.txt
└── .gitignore              # Git Ignore
```

---

## 8. Best Practices

### Performance:
- **Lazy Loading:** Bilder und Inhalte werden bei Bedarf geladen
- **Caching:** News werden gecacht für bessere Performance
- **Minimierung:** CSS/JS minimiert wo möglich

### Sicherheit:
- **XSS-Schutz:** `escapeHtml()` für alle User-Inputs
- **CORS:** Korrekte CORS-Konfiguration
- **Environment Variables:** Sensible Daten nicht im Code

### Accessibility:
- **ARIA-Labels:** Alle interaktiven Elemente haben ARIA-Labels
- **Semantisches HTML:** Korrekte HTML-Struktur
- **Keyboard Navigation:** Alle Funktionen per Tastatur erreichbar

---

## 9. Testing & Debugging

### Browser Console:
- **Debug-Logs:** Alle wichtigen Operationen werden geloggt
- **Error-Logs:** Fehler werden detailliert geloggt
- **Performance:** Timing-Informationen wo relevant

### n8n Workflow:
- **Execution Logs:** Alle Workflow-Executions werden geloggt
- **Debug Nodes:** Code Nodes für Debugging
- **Error Handling:** Try-Catch in Code Nodes

---

## 10. Dokumentation

### Code-Dokumentation:
- **Comments:** Wichtige Funktionen sind kommentiert
- **JSDoc:** Funktionen haben JSDoc-Kommentare wo relevant
- **README:** README.md ist aktuell und informativ

### Workflow-Dokumentation:
- **n8n Workflow:** Notizen in n8n Nodes
- **Troubleshooting:** Debugging-Guides erstellt

---

**Status:** ✅ Alle Richtlinien sind implementiert und dokumentiert.

