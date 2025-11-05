# 🚀 Render Deployment Guide für Invoice Extractor

## Problem
Die URL `[NEUE_STABILE_INVOICE_URL]` in `index.html` ist noch nicht durch die echte Render-URL ersetzt.

## Lösung: Render App deployen und URL konfigurieren

### Schritt 1: Render App erstellen/deployen

1. **Gehen Sie zu Render Dashboard:**
   - https://dashboard.render.com
   - Klicken Sie auf "New +" → "Web Service"

2. **Repository verbinden:**
   - Wählen Sie "Connect GitHub"
   - Wählen Sie das Repository: `KarusoCaminar/kortex-website`
   - Branch: `main`
   - Root Directory: `invoice-extractor`

3. **Build-Einstellungen:**
   - **Name:** `kortex-invoice-extractor` (oder wie Sie möchten)
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

4. **Environment Variables setzen:**
   - `GOOGLE_CLOUD_CREDENTIALS` → Ihr Google Cloud Service Account JSON (als String)
   - `GOOGLE_CLOUD_LOCATION` → `us-central1` (oder Ihre Region)
   - `ALLOWED_ORIGINS` → `https://www.kortex-system.com,https://kortex-system.com,https://karusocaminar.github.io`
   - `PORT` → Wird automatisch von Render gesetzt (nicht ändern)

5. **Deploy starten:**
   - Klicken Sie auf "Create Web Service"
   - Warten Sie, bis der Build fertig ist (kann 5-10 Minuten dauern)

### Schritt 2: Render URL finden

Nach dem Deployment:
1. Gehen Sie zu Ihrer Render App
2. Die URL sollte sein: `https://kortex-invoice-extractor.onrender.com` (oder ähnlich)
3. Kopieren Sie diese URL

### Schritt 3: URL in index.html eintragen

Ersetzen Sie `[NEUE_STABILE_INVOICE_URL]` durch Ihre Render-URL:

```html
<!-- Vorher: -->
<a href="[NEUE_STABILE_INVOICE_URL]" 

<!-- Nachher (Beispiel): -->
<a href="https://kortex-invoice-extractor.onrender.com"
```

### Schritt 4: Testen

1. Öffnen Sie: https://www.kortex-system.com
2. Klicken Sie auf den Invoice-Extractor-Link
3. Die App sollte jetzt von Render geladen werden

---

## Troubleshooting

### Problem: 404 Error
- **Lösung:** Überprüfen Sie, ob die URL in `index.html` korrekt ist
- Prüfen Sie, ob die Render-App läuft (Status: "Live")

### Problem: CORS Error
- **Lösung:** Fügen Sie Ihre Website-Domain zu `ALLOWED_ORIGINS` in Render hinzu

### Problem: Build schlägt fehl
- **Lösung:** 
  - Prüfen Sie die Build-Logs in Render
  - Stellen Sie sicher, dass `GOOGLE_CLOUD_CREDENTIALS` korrekt gesetzt ist
  - Root Directory muss `invoice-extractor` sein

### Problem: App startet nicht
- **Lösung:**
  - Prüfen Sie die Logs in Render
  - Überprüfen Sie, ob `npm start` korrekt ist (siehe `package.json`)

---

## Alternative: Lokale URL für Testing

Wenn Sie lokal testen möchten:
```bash
cd invoice-extractor
npm install
npm run dev
```

Dann in `index.html`:
```html
<a href="http://localhost:5000"
```

---

## Nächste Schritte

1. ✅ Render App deployen
2. ✅ URL in `index.html` eintragen
3. ✅ Commit und Push zu GitHub
4. ✅ Testen auf der Live-Website

