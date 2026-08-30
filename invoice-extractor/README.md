# 📄 Rechnungsextraktion - AI-Powered Invoice Processing

**Automatische Extraktion von Rechnungsdaten mit Google Gemini 2.5 Flash**

Eine moderne Web-App zur automatischen Verarbeitung von Rechnungen (JPG, PNG, PDF) mit KI-gestützter Datenextraktion, Validierung und Export-Funktionen.

---

## ✨ Features

- 📤 **Drag & Drop Upload** - Einfaches Hochladen von Rechnungen
- 🤖 **AI-Extraktion** - Automatische Erkennung aller Rechnungsdaten
- ✅ **VAT-Validierung** - Deutsche & EU-USt-IdNr. Prüfung
- 📊 **Dashboard** - Übersicht über alle verarbeiteten Rechnungen
- 📥 **Export** - CSV & JSON Export
- 🎨 **Moderne UI** - Responsive Design mit Dark Mode
- 🔗 **Website-Integration** - Einfach in bestehende Websites einbindbar

---

## 🚀 Quick Start

### Option 1: Replit (Empfohlen)

**Setup in 10 Minuten:**

1. **Projekt in Replit importieren**
2. **PostgreSQL aktivieren** (Tools → Database)
3. **Google Cloud Credentials hinzufügen** (Tools → Secrets)
4. **Migration ausführen:** `npm run db:push`
5. **Run klicken** ✅

### Option 2: Lokale Entwicklung

```bash
# Repository klonen
git clone <repo-url>
cd invoice-extractor

# Dependencies installieren
npm install

# Environment Variables setzen
# Erstellen Sie .env mit DATABASE_URL und GOOGLE_CLOUD_CREDENTIALS

# Database Migration
npm run db:push

# Development Server starten
npm run dev
```

App läuft auf: `http://localhost:5000`

---

## 📋 Voraussetzungen

### Erforderlich:
- **Node.js 20+**
- **PostgreSQL 16+** Datenbank
- **Google Cloud Account** mit:
  - Vertex AI API aktiviert
  - Service Account mit "Vertex AI User" Rolle

### Optional:
- Replit Account (für einfaches Hosting)

---

## 🌐 Website-Integration

Die App kann einfach in Ihre bestehende Website eingebunden werden.

### Quick Integration:

```html
<!-- Button auf Ihrer Website -->
<button onclick="openInvoice()">📄 Invoice Data Extraction</button>

<!-- iFrame Modal -->
<div id="invoice-modal" style="display:none;">
  <iframe src="https://your-repl.repl.co/upload"></iframe>
</div>

<script>
  function openInvoice() {
    document.getElementById('invoice-modal').style.display = 'block';
  }
</script>
```

---

## 🔧 Konfiguration

### Environment Variables

| Variable | Beschreibung | Erforderlich |
|----------|--------------|--------------|
| `DATABASE_URL` | PostgreSQL Connection String | ✅ Ja |
| `GOOGLE_CLOUD_CREDENTIALS` | Service Account JSON | ✅ Ja |
| `GOOGLE_CLOUD_LOCATION` | Vertex AI Region (default: us-central1) | ⭕ Optional |
| `ALLOWED_ORIGINS` | CORS Origins für iframe-Embedding | ⭕ Optional |
| `PORT` | Server Port (default: 5000) | ⭕ Optional |

### Replit Secrets

In Replit werden Environment Variables als **Secrets** gespeichert:

**Tools → Secrets:**
- `DATABASE_URL` → Automatisch von PostgreSQL
- `GOOGLE_CLOUD_CREDENTIALS` → Manuell hinzufügen
- `ALLOWED_ORIGINS` → `http://localhost:8000,https://ihre-website.com`

---

## 🎯 Architektur

### Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (Build Tool)
- TailwindCSS + shadcn/ui
- TanStack Query (State Management)
- Wouter (Routing)

**Backend:**
- Node.js + Express
- Drizzle ORM
- PostgreSQL (Neon)
- Google Vertex AI (Gemini 2.5 Flash)

**Deployment:**
- Replit (Primary)
- Docker-fähig

---
... (rest of the file is the same)
