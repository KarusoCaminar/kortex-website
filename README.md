# Kortex System Website

KI-gestützte Automatisierungslösungen für den deutschen Mittelstand.

## 🌍 Mehrsprachigkeit

Die Website unterstützt Deutsch (DE) und Englisch (EN) mit Sprachumschaltung über Flaggen-Buttons oben rechts.

### Sprache ändern
- Klicke auf 🇩🇪 für Deutsch
- Klicke auf 🇬🇧 für Englisch
- Die Sprachpräferenz wird im LocalStorage gespeichert

## 🎬 Live Demo Section

### Übersicht
Ein integrierter Demo-Bereich im "Live-Demo" Section mit **AUTOPLAY VIDEO**:
- **🔥 Autoplay**: Video startet automatisch - keine Klicks nötig!
- **🔄 Endlos-Loop**: Läuft die ersten 20 Sekunden in Endlosschleife 🔁
- **🔇 Muted**: Stumm (perfekt für kurzen Loop ohne Ablenkung)
- **🎥 1080p HD**: Hochauflösende Qualität
- **⚡ Schnell**: Nur 20 Sekunden - zeigt dynamische Workflows
- **📱 Responsive**: Grid-Layout (Desktop) → Stack (Mobile)
- **🎨 Professionell**: Sieht aus wie eingebettete Premium-Werbung

### Aktuelles Video

**Video:** n8n in 100 Seconds (Fireship)  
**YouTube ID:** `RpjQTGKm-ok`  
**Clip:** 0:00 - 0:20 (erste 20 Sekunden in Loop)  
**Mode:** Autoplay + **Endlos-Loop** 🔄 + Muted 🔇  
**Qualität:** 1080p (HD)  
**Zeigt:** Schnelle, dynamische Workflow-Automatisierung  
**Quelle:** [Offizielles n8n YouTube](https://youtu.be/RpjQTGKm-ok)

### Video-Einstellungen ändern

#### Video-ID und Timestamps bearbeiten
In `index.html` unter `<section id="demo">`:

```html
<div class="video-wrapper video-autoplay" 
     data-video-id="RpjQTGKm-ok" 
     data-start="0" 
     data-end="20"
     data-autoplay="true"
     data-loop="true"
     data-muted="true"
     data-quality="hd1080">
```

**Parameter:**
- `data-video-id`: YouTube Video ID (z.B. `RpjQTGKm-ok`)
- `data-start`: Start-Timestamp in Sekunden (z.B. `0` = Anfang)
- `data-end`: End-Timestamp in Sekunden (z.B. `20` = 20 Sekunden)
- `data-autoplay`: `"true"` = Video startet automatisch beim Laden
- `data-loop`: `"true"` = Video läuft in Endlosschleife 🔄
- `data-muted`: `"true"` = Stumm 🔇 | `"false"` = MIT TON 🔊
- `data-quality`: `"hd1080"` = 1080p HD | `"hd720"` = 720p | `"large"` = 480p
- `class="video-autoplay"`: CSS-Klasse für eingebetteten Look

**Empfohlene Alternative Videos (alle offiziell von n8n):**
```html
<!-- Option 1: n8n in 100 Sekunden (ultra-kurz, dynamisch) -->
<div class="video-wrapper" 
     data-video-id="RpjQTGKm-ok" 
     data-start="5" 
     data-end="45">

<!-- Option 2: Invoice Extraction Demo (konkreter Use Case) -->
<div class="video-wrapper" 
     data-video-id="8FsvuGeWxEQ" 
     data-start="90" 
     data-end="120">

<!-- Option 3: 10 n8n Workflows Showcase -->
<div class="video-wrapper" 
     data-video-id="PhVTDydFGo0" 
     data-start="10" 
     data-end="50">
```

#### Video-Thumbnail ändern
Das Thumbnail wird automatisch von YouTube geladen:
```html
<img src="https://img.youtube.com/vi/JIaxjH2CoKo/maxresdefault.jpg">
```

Ändere `JIaxjH2CoKo` zur neuen Video-ID.

### CTA-Links ändern

#### Business Card Extraction (CTA 1)
```html
<a href="https://n8n.io/workflows/6840-extract-contacts-from-business-cards-to-google-sheets-with-gpt4o/">
```

#### Invoice Data Extraction (CTA 2)
```html
<a href="https://n8n.io/workflows/2463-ai-agent-invoice-data-extraction-chatgpt/">
```

**Weitere n8n Templates:**
- [n8n Workflow Library](https://n8n.io/workflows/)
- Suche nach "AI", "extraction", "automation"

### Texte übersetzen

Alle Demo-Panel-Texte sind mehrsprachig in `translations.js`:

```javascript
// Deutsch (de)
'demo.panel.title': 'Live Demo: KI-Automatisierung in Aktion',
'demo.panel.videoTitle': '10 n8n Workflows zur Automatisierung',
'demo.panel.cta1.title': 'Visitenkarten-Extraktion',

// Englisch (en)
'demo.panel.title': 'Live Demo: AI Automation in Action',
'demo.panel.videoTitle': '10 n8n Workflows for Automation',
'demo.panel.cta1.title': 'Business Card Extraction',
```

### Features

✅ **🔥 Autoplay**: Video startet automatisch - wie Promo-Werbung  
✅ **🔄 Endlos-Loop**: Läuft 20 Sekunden in Schleife (0 → 20 → 0 🔁)  
✅ **🔇 Muted**: Stumm für nicht-ablenkenden Loop  
✅ **🎥 1080p HD**: Hochauflösende Qualität für perfekte Darstellung  
✅ **⚡ Schnell**: Zeigt die besten 20 Sekunden - dynamisch!  
✅ **📱 Responsive Design**: Grid-Layout (Desktop) → Stack-Layout (Mobile)  
✅ **♿ Accessibility**: ARIA-Labels, Keyboard-Navigation  
✅ **🌍 Mehrsprachig**: DE/EN Übersetzungen für alle Texte  
✅ **💼 Professionell**: Offizielles n8n Video eingebettet  


## 🚀 Lokaler Server

```bash
python -m http.server 8000
```

Dann öffne: http://localhost:8000

## 📁 Dateistruktur

```
koretex-website/
├── assets/
│   ├── css/
│   │   └── demo-panel.css       # Demo-Panel Styles
│   ├── js/
│   │   └── demo-panel.js        # Demo-Panel Controller
│   ├── logo.png
│   ├── products/
│   └── team/
├── components/
│   ├── navbar.js                # Navigation mit Sprachumschaltung
│   └── footer.js                # Footer mit Übersetzungen
├── translations.js              # Alle DE/EN Übersetzungen
├── i18n.js                      # Sprachumschaltungs-Logik
├── style.css                    # Haupt-Styles
├── index.html                   # Startseite mit Demo-Panel
├── produkte.html
├── preise.html
├── ueber-uns.html
├── kontakt.html
├── faq.html
└── README.md
```

## 🎨 Farben & Branding

```css
--primary: #034EA2
--primary-dark: #09182F
```

## 📝 Neue Übersetzungen hinzufügen

1. **Translation Key in `translations.js` hinzufügen:**
```javascript
de: {
  'mein.neuer.key': 'Deutscher Text',
}
en: {
  'mein.neuer.key': 'English Text',
}
```

2. **HTML markieren:**
```html
<p data-i18n="mein.neuer.key">Deutscher Text</p>
```

3. **Fertig!** Die Übersetzung wird automatisch angewendet.

## 📸 Screenshots

### Desktop
- Demo-Panel am unteren Rand (360px Höhe)
- YouTube-Video links, CTAs rechts
- Collapse-Button zum Einklappen

### Mobile
- Vollbild-Modal
- Touch-optimiert
- Focus Trap für Accessibility

## 🔗 Live-Website

https://karusocaminar.github.io/koretex-website/

---

**Entwickelt von Kortex System**  
© 2025 Alle Rechte vorbehalten.
