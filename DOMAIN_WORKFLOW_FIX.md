# 🔧 Domain & Workflow-Fehler beheben

## Problem 1: Domain-Redirect (kortex-system.de statt GitHub Pages)

### Ursache
Browser oder DNS haben die alte Custom Domain noch im Cache.

### Lösung

#### 1. Browser-Cache löschen
- **Chrome/Edge**: `Ctrl + Shift + Delete` → "Cached images and files" → "Clear data"
- **Oder**: Inkognito-Modus verwenden (`Ctrl + Shift + N`)

#### 2. DNS-Cache leeren (Windows)
```powershell
ipconfig /flushdns
```

#### 3. GitHub Pages Settings prüfen
1. Gehe zu: `https://github.com/KarusoCaminar/kortex-website/settings/pages`
2. Stelle sicher, dass **keine Custom Domain** eingetragen ist
3. Falls doch: **Entfernen** und 1-2 Minuten warten

#### 4. GitHub Pages neu deployen
Falls nötig:
1. Ändere eine kleine Datei (z.B. Kommentar hinzufügen in `index.html`)
2. Committe und pushe:
   ```bash
   git add .
   git commit -m "Force redeploy"
   git push
   ```
3. Warte 2-3 Minuten

#### 5. Korrekte URL testen
Direkt aufrufen:
```
https://karusocaminar.github.io/kortex-website/
```

**Erwartung:** Website sollte laden, NICHT auf kortex-system.de umleiten

---

## Problem 2: Visitenkarten-Workflow-Fehler

### Mögliche Ursachen
1. n8n Workflow ist nicht aktiviert
2. Falsche Webhook-URL
3. CORS-Fehler
4. n8n Server ist nicht erreichbar

### Lösung

#### Schritt 1: n8n Workflow prüfen
1. Öffne: `https://n8n2.kortex-system.de`
2. Gehe zu deinem Workflow: `Business Card Extraction`
3. Stelle sicher, dass der Workflow **"Active"** ist (oben rechts)

#### Schritt 2: Webhook-URL prüfen
1. Klicke auf den **"Business Card Upload"** Node (erster Node im Workflow)
2. Klicke auf **"Production URL"** Tab
3. Kopiere die vollständige URL
4. Teste die URL direkt im Browser:
   ```
   https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
   ```
   **Erwartung:** JSON-Response oder Error-Page (nicht 404!)

#### Schritt 3: Workflow-URL in Website aktualisieren
Öffne: `kortex-n8n-modal.html`

**Suche nach (3x, Zeilen ~325, ~352, ~379):**
```html
data-workflow-url="https://n8n2.kortex-system.de/webhook/business-card-extraction"
```

**Ersetze mit deiner tatsächlichen Production URL** (falls anders)

#### Schritt 4: Webhook-Node konfigurieren
Im n8n Workflow:
1. Klicke auf **"Business Card Upload"** Node
2. Klicke **"⚙️ Options"** (Zahnrad)
3. Aktiviere:
   - ✅ **"Continue Workflow after Webhook Response"**
   - ✅ **"Response Mode": "Last Node"**

#### Schritt 5: CORS prüfen
Falls CORS-Fehler in der Browser-Console:
- n8n muss CORS für deine GitHub Pages Domain erlauben
- Prüfe n8n Server-Einstellungen: `CORS_ALLOWED_ORIGINS` sollte `*` oder deine GitHub Pages URL enthalten

---

## Problem 3: Rechnungs-Extraktions-Workflow-Fehler

### Aktuelle URL
```
https://koretex-invoice-db.onrender.com
```

### Mögliche Probleme
1. Render.com App ist nicht aktiv (schlafen nach Inaktivität)
2. URL ist falsch
3. CORS-Fehler

### Lösung

#### Schritt 1: URL testen
Öffne direkt im Browser:
```
https://koretex-invoice-db.onrender.com
```

**Erwartung:** 
- ✅ App lädt (evtl. nach 30-60 Sekunden, wenn sie "schlief")
- ❌ 404 = URL ist falsch
- ❌ Timeout = App ist offline

#### Schritt 2: Render.com App prüfen
1. Gehe zu: `https://dashboard.render.com`
2. Prüfe Status der App: `koretex-invoice-db`
3. Falls "Sleeping": Klicke "Manual Deploy" oder warte bis jemand die App aufruft

#### Schritt 3: URL in Website aktualisieren
Öffne: `index.html`

**Suche nach (Zeile ~145):**
```html
<a href="https://koretex-invoice-db.onrender.com" 
```

**Ersetze mit korrekter URL** (falls anders)

---

## 🔍 Fehler-Debugging

### Browser Console öffnen
1. Drücke `F12` oder `Ctrl + Shift + I`
2. Gehe zu Tab **"Console"**
3. Prüfe rote Fehlermeldungen

### Häufige Fehler

#### `Failed to fetch` oder `CORS error`
- **Problem:** n8n blockiert Anfragen von GitHub Pages
- **Lösung:** n8n CORS-Einstellungen prüfen

#### `404 Not Found`
- **Problem:** Webhook-URL ist falsch oder Workflow ist nicht aktiviert
- **Lösung:** n8n Production URL nochmal prüfen

#### `503 Service Unavailable`
- **Problem:** n8n Server ist offline oder überlastet
- **Lösung:** n8n Server-Status prüfen

#### `ERR_BLOCKED_BY_CLIENT`
- **Problem:** Browser-Extension blockiert (Ad-Blocker, Privacy-Tool)
- **Lösung:** Normal, kann ignoriert werden (nur Analytics)

---

## ✅ Checkliste

### Domain-Problem
- [ ] Browser-Cache gelöscht
- [ ] DNS-Cache geleert (`ipconfig /flushdns`)
- [ ] GitHub Pages Settings geprüft (keine Custom Domain)
- [ ] GitHub Pages neu deployed (kleine Änderung + commit)
- [ ] Inkognito-Modus getestet

### Visitenkarten-Workflow
- [ ] n8n Workflow ist **"Active"**
- [ ] Webhook-URL ist korrekt (Production URL kopiert)
- [ ] `kortex-n8n-modal.html` hat korrekte URLs (3x)
- [ ] Webhook-Node hat **"Continue Workflow after Webhook Response"** aktiviert
- [ ] Workflow-URL direkt im Browser getestet

### Rechnungs-Extraktion
- [ ] Render.com App ist online
- [ ] URL ist korrekt in `index.html`
- [ ] App lädt (evtl. nach Wartezeit wenn "schlief")

---

## 📞 Weitere Hilfe

Falls Probleme weiterhin bestehen:

1. **Browser Console**: Screenshot von Fehlermeldungen machen
2. **Network Tab**: Prüfe welche Requests fehlschlagen (`F12` → `Network`)
3. **n8n Logs**: Prüfe n8n Server-Logs für Fehler
4. **GitHub Pages Logs**: Prüfe GitHub Pages Build-Logs

