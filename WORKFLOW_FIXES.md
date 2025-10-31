# 🔧 Workflow-Fehler beheben

## Problem 1: test-workflows.html auf GitHub öffnen

### Lösung:

#### Option 1: Direkt auf GitHub Pages öffnen
Nach dem Pushen:
```
https://karusocaminar.github.io/kortex-website/test-workflows.html
```

#### Option 2: Lokal testen
1. Öffne die Datei `test-workflows.html` direkt im Browser
2. Oder: Rechtsklick → "Open with" → Browser

---

## Problem 2: "Failed to fetch" - Workflow-Fehler

### Ursachen:
1. **CORS-Problem**: n8n blockiert Anfragen von GitHub Pages
2. **Workflow ist nicht aktiviert** in n8n
3. **Falsche Webhook-URL**
4. **n8n Server ist offline**

### Lösung:

#### Schritt 1: n8n Workflow aktivieren
1. Öffne: `https://n8n2.kortex-system.de`
2. Gehe zu deinem Workflow: `Business Card Extraction`
3. Stelle sicher, dass der Workflow **"Active"** ist (oben rechts)

#### Schritt 2: CORS-Einstellungen prüfen
Im n8n Server (falls du Zugriff hast):
1. Prüfe `CORS_ALLOWED_ORIGINS` Umgebungsvariable
2. Sollte enthalten: `*` oder `https://karusocaminar.github.io`
3. Oder füge hinzu: `https://karusocaminar.github.io,https://kortex-system.de`

#### Schritt 3: Webhook-URL testen
Öffne direkt im Browser:
```
https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
```

**Erwartung:**
- ✅ JSON-Response mit extrahierten Daten
- ❌ 404 = Workflow ist nicht aktiviert oder URL ist falsch
- ❌ Timeout = n8n Server ist offline

---

## Problem 3: Bilder werden nicht im Workflow angezeigt

### Ursache:
Die Binary-Daten werden nicht korrekt vom HTTP Request Node zum AI Agent weitergegeben.

### Lösung:

#### Im n8n Workflow prüfen:

1. **"Lade Sample 1/2/3" Nodes:**
   - Stellen sicher, dass `Response Format: File` aktiviert ist
   - Binary Property Name sollte `data` oder leer sein (n8n nutzt automatisch `data`)

2. **"Setze Sample-Info" Node:**
   - Prüfe ob Binary-Daten korrekt weitergegeben werden
   - Sollte enthalten: `$binary` oder `$('Lade Sample X').binary`

3. **"AI Agent - Vertex AI" Node:**
   - Prüfe ob Attachments korrekt konfiguriert sind
   - Sollte nutzen: `$binary.data` oder ähnlich

#### Workflow-Logik prüfen:

**Für Sample 1:**
```
Webhook → Ist Sample? (Ja) → Sample 1? (Ja) → Lade Sample 1 → Setze Sample-Info → AI Agent
```

**Für Sample 2:**
```
Webhook → Ist Sample? (Ja) → Sample 1? (Nein) → Sample 2? (Ja) → Lade Sample 2 → Setze Sample-Info → AI Agent
```

**Für Sample 3:**
```
Webhook → Ist Sample? (Ja) → Sample 1? (Nein) → Sample 2? (Nein) → Sample 3? (Ja) → Lade Sample 3 → Setze Sample-Info → AI Agent
```

---

## Problem 4: Visitenkarte 3 funktioniert nicht

### Mögliche Ursachen:
1. **Sample 3 Check funktioniert nicht** - IF-Node für sample=3
2. **"Lade Sample 3" Node hat falsche URL**
3. **Binary-Daten werden nicht korrekt weitergegeben**

### Lösung:

#### 1. "Sample 3?" Node prüfen
Im n8n Workflow:
1. Klicke auf **"Sample 3?"** IF Node
2. Prüfe Condition:
   - `{{$json.query.sample}}` equals `"3"`
3. Stelle sicher, dass der Wert als **String** verglichen wird (nicht Number!)

#### 2. "Lade Sample 3" Node prüfen
1. Klicke auf **"Lade Sample 3"** HTTP Request Node
2. Prüfe URL: `https://karusocaminar.github.io/kortex-website/samples/bc-3.jpg`
3. Prüfe `Response Format: File` ist aktiviert
4. Teste Node direkt in n8n (klicke "Execute Node")

#### 3. Binary-Daten-Weitergabe prüfen
Im **"Setze Sample-Info"** Node:
1. Prüfe ob Binary-Daten von allen "Lade Sample X" Nodes kommen
2. Code sollte enthalten:
   ```javascript
   // Für Sample 3
   const binaryData = $('Lade Sample 3').binary || $('Lade Sample 2').binary || $('Lade Sample 1').binary || $binary;
   ```

---

## 🔍 Debugging im n8n Workflow

### Workflow direkt in n8n testen:

#### Test mit Sample 1:
1. Klicke auf **"Execute Workflow"** (oben rechts)
2. Klicke auf **"Business Card Upload"** Webhook Node
3. Klicke **"Test URL"** oder füge Parameter hinzu:
   ```
   ?sample=1
   ```
4. Klicke **"Execute Node"**
5. Prüfe jeden Node einzeln:
   - **"Ist Sample?"**: Sollte `true` sein
   - **"Sample 1?"**: Sollte `true` sein
   - **"Lade Sample 1"**: Sollte Binary-Daten enthalten
   - **"Setze Sample-Info"**: Sollte Binary-Daten weitergeben
   - **"AI Agent"**: Sollte Bild als Attachment haben

#### Test mit Sample 3:
1. Führe gleiche Schritte aus, aber mit Parameter: `?sample=3`
2. Prüfe besonders:
   - **"Sample 1?"**: Sollte `false` sein
   - **"Sample 2?"**: Sollte `false` sein  
   - **"Sample 3?"**: Sollte `true` sein
   - **"Lade Sample 3"**: Sollte Binary-Daten enthalten

### Häufige Fehler:

#### Fehler: "Binary data is empty"
**Lösung:**
- Prüfe "Lade Sample X" Nodes haben `Response Format: File`
- Prüfe Binary-Daten werden korrekt weitergegeben in "Setze Sample-Info"

#### Fehler: "AI Agent has no attachment"
**Lösung:**
- Prüfe AI Agent Node → Attachments Tab
- Sollte nutzen: `$binary.data` oder `{{$binary}}`

#### Fehler: "Sample 3 check always false"
**Lösung:**
- Prüfe ob Query-Parameter als String verglichen wird (`"3"` nicht `3`)
- Prüfe ob `$json.query.sample` korrekt ist

---

## ✅ Checkliste

### test-workflows.html öffnen
- [ ] Datei gepusht zu GitHub
- [ ] GitHub Pages ist aktiviert
- [ ] URL getestet: `https://karusocaminar.github.io/kortex-website/test-workflows.html`

### "Failed to fetch" beheben
- [ ] n8n Workflow ist aktiviert
- [ ] Webhook-URL ist korrekt
- [ ] CORS ist konfiguriert (falls nötig)
- [ ] n8n Server ist online

### Bilder im Workflow anzeigen
- [ ] "Lade Sample X" Nodes haben `Response Format: File`
- [ ] Binary-Daten werden korrekt weitergegeben
- [ ] AI Agent Node hat Attachments konfiguriert

### Visitenkarte 3 funktioniert
- [ ] "Sample 3?" IF Node prüft `sample=3` korrekt
- [ ] "Lade Sample 3" Node hat korrekte URL
- [ ] Binary-Daten werden von "Lade Sample 3" zu "Setze Sample-Info" weitergegeben
- [ ] Workflow wurde mit `?sample=3` getestet

---

## 🚀 Schnell-Fix

### Falls nichts funktioniert:

1. **n8n Workflow neu importieren:**
   - Öffne `n8n-business-card-workflow-vertex.json`
   - Importiere in n8n
   - Aktiviere Workflow

2. **Webhook-URL neu kopieren:**
   - In n8n: Klicke auf "Business Card Upload" Node
   - Kopiere Production URL
   - Ersetze in `kortex-n8n-modal.html` (3x)

3. **CORS deaktivieren (für Testing):**
   - Falls du n8n Server-Zugriff hast:
   - Setze `CORS_ALLOWED_ORIGINS=*` (nur für Testing!)

