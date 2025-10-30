# ✅ Finale Setup-Checkliste - Was du noch tun musst

## 📋 Status: Fast fertig!

**Was bereits gemacht ist:**
- ✅ Website-Integration (`kortex-n8n-modal.html`) ist im Repo
- ✅ Button auf Startseite verknüpft
- ✅ n8n-URL ist eingetragen (`https://n8n2.kortex-system.de/webhook/business-card-extraction`)
- ✅ Workflow-Visualisierung aktiviert (`?visualize=true`)

---

## 🎯 Was du noch tun musst (5 Minuten)

### Schritt 1: n8n Workflow aktivieren

1. Öffne n8n: `https://n8n2.kortex-system.de`

2. Gehe zu deinem Workflow: `Business Card Extraction Demo - Vertex AI`
   - URL: `https://n8n2.kortex-system.de/workflow/JkdKPm270Wy93nU5`

3. **Aktiviere den Workflow:**
   - Klicke oben rechts auf **"Inactive"** → wird zu **"Active"**
   - Oder: Klicke auf **"⚙️"** → **"Active"** → **"Save"**

✅ **Fertig:** Workflow ist jetzt aktiv!

---

### Schritt 2: Production URL kopieren

1. Klicke auf den **"Business Card Upload"** Node (ganz links im Workflow)

2. Im rechten Panel:
   - Klicke auf **"Production URL"** Tab
   - Oder: Klicke **"⚙️ Options"** → **"Production URL"**

3. **Kopiere die Production URL:**
   ```
   https://n8n2.kortex-system.de/webhook/business-card-extraction
   ```
   (Oder was auch immer n8n dir anzeigt)

---

### Schritt 3: Production URL in Website einfügen

1. Öffne: `C:\Users\Moritz\Desktop\kortex-projekt\kortex-website\kortex-n8n-modal.html`

2. **Suche nach (3x):**
   ```html
   data-workflow-url="https://n8n2.kortex-system.de/webhook/business-card-extraction"
   ```

3. **Ersetze mit deiner Production URL** (falls sie anders ist)

4. **Speichere die Datei**

---

### Schritt 4: Webhook Node konfigurieren (WICHTIG!)

1. Im n8n Workflow: Klicke auf **"Business Card Upload"** Node

2. Klicke **"⚙️ Options"** (Zahnrad-Symbol)

3. **WICHTIG:** Aktiviere:
   - ✅ **"Continue Workflow after Webhook Response"**
   
   **Ohne diese Einstellung funktioniert die Workflow-Visualisierung NICHT!**

4. Klicke **"Save"**

---

### Schritt 5: AI Agent Node prüfen

1. Klicke auf **"AI Agent - Vertex AI"** Node

2. Prüfe **"Chat Model *"**:
   - Sollte **"Google Vertex AI"** oder **"Google Gemini"** zeigen
   - Model sollte **"gemini-2.5-flash"** sein (oder was du gewählt hast)
   - Credentials sollten ausgewählt sein

3. Falls nicht konfiguriert:
   - Klicke **"+"** unter **"Chat Model *"**
   - Wähle **"Google Vertex AI"**
   - Model: `gemini-2.5-flash`
   - Deine Google API Credentials auswählen
   - **"Save"**

---

### Schritt 6: Sample-URLs prüfen

1. **"Lade Sample 1"** Node:
   - URL sollte sein: `https://karusocaminar.github.io/kortex-website/samples/bc-1.jpg`
   - (Oder deine eigene URL, wo die Bilder liegen)

2. **"Lade Sample 2"** Node:
   - URL sollte sein: `https://karusocaminar.github.io/kortex-website/samples/bc-2.jpg`

3. Falls Bilder noch nicht hochgeladen:
   - Lade sie in dein `kortex-website` GitHub Repo hoch
   - Unter: `samples/bc-1.jpg` und `samples/bc-2.jpg`

---

### Schritt 7: Testen

1. **Website testen:**
   - Öffne: `https://karusocaminar.github.io/kortex-website/index.html`
   - Klicke auf **"Visitenkarten-Extraktion"**
   - Modal sollte sich öffnen

2. **Sample 1 testen:**
   - Klicke auf **"Business Card – Sample 1"**
   - Modal öffnet sich mit n8n
   - Workflow sollte laufen
   - Ergebnisse sollten in Tabelle erscheinen

3. **Sample 2 testen:**
   - Gleicher Ablauf

4. **Upload testen:**
   - Klicke auf **"Eigene Visitenkarte hochladen"**
   - n8n-Formular sollte sich öffnen
   - Upload eine Visitenkarte
   - Ergebnisse sollten erscheinen

---

## ✅ Finale Checkliste

### n8n:
- [ ] Workflow ist **"Active"** (oben rechts grün)
- [ ] **"Continue Workflow after Webhook Response"** aktiviert
- [ ] Production URL kopiert
- [ ] AI Agent Node konfiguriert (Gemini 2.5 Flash)
- [ ] Chat Model zeigt Google Vertex AI
- [ ] Credentials ausgewählt
- [ ] Sample-URLs angepasst (falls nötig)

### Website:
- [ ] Production URL in `kortex-n8n-modal.html` eingetragen (3x)
- [ ] Keine Platzhalter mehr (`DEINE_N8N_...`)
- [ ] Bilder hochgeladen (bc-1.jpg, bc-2.jpg)
- [ ] Website deployed auf GitHub Pages

### Test:
- [ ] Button auf Startseite funktioniert
- [ ] Modal öffnet sich
- [ ] Sample 1 funktioniert
- [ ] Sample 2 funktioniert
- [ ] Upload funktioniert
- [ ] Workflow-Visualisierung erscheint
- [ ] Ergebnisse erscheinen in Tabelle
- [ ] CSV-Download funktioniert
- [ ] JSON-Download funktioniert

---

## 🎯 Zusammenfassung

**Du musst nur noch:**

1. ✅ Workflow aktivieren (oben rechts "Inactive" → "Active")
2. ✅ "Continue Workflow after Webhook Response" aktivieren (⚙️ Options)
3. ✅ Production URL kopieren (aus Webhook Node)
4. ✅ Production URL in Website einfügen (falls anders)
5. ✅ AI Agent Node prüfen (Chat Model + Credentials)
6. ✅ Sample-URLs prüfen (falls Bilder noch nicht hochgeladen)
7. ✅ Testen

**Das war's!** Dann sollte alles funktionieren! 🚀

---

## 🆘 Hilfe bei Problemen?

**Problem: "Workflow läuft nicht"**
- Prüfe Workflow ist "Active" (oben rechts)
- Prüfe Production URL ist korrekt

**Problem: "Workflow-Visualisierung erscheint nicht"**
- Prüfe "Continue Workflow after Webhook Response" ist aktiviert

**Problem: "Modal öffnet sich, aber n8n lädt nicht"**
- Prüfe Production URL ist korrekt in Website eingetragen
- Prüfe CORS-Einstellungen in n8n (falls nötig)

---

## 🎉 Fertig!

Wenn alle Punkte erledigt sind, sollte deine Demo perfekt funktionieren! ✨

