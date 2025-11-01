# ✅ Upload-Pfad Erklärung - Eigene Visitenkarte hochladen

## Wie funktioniert der Upload-Pfad?

Wenn ein Benutzer eine eigene Visitenkarte hochlädt (ohne `sample` Parameter), funktioniert der Workflow so:

---

## 📋 Ablauf bei Upload

### Schritt 1: Business Card Upload Node

**Input:**
- POST Request mit Binary-Datei (Bild)
- `query.sample` ist **LEER** oder **nicht vorhanden**

**Output:**
- `query: { sample: "" }` oder `query: { sample: undefined }`
- Binary-Daten (`file`) sind vorhanden

---

### Schritt 2: Route to Sample Code Node

**Code-Logik:**
```javascript
const sample = String($json.query?.sample || '').trim();

// Wenn sample leer ist:
if (sampleStr === '') {
    route = 'upload';  // ← WICHTIG: route = 'upload'
    console.log('✅ Route: Upload (kein Sample)');
}

return [{
    json: {
        ...$json,
        route: 'upload',  // ← route wird auf 'upload' gesetzt
        sample: ''  // ← sample ist leer
    },
    // Binary-Daten werden weitergegeben
    binary: $binary  // ← Binary-Daten bleiben erhalten!
}];
```

**Output:**
- `route: "upload"` ✅
- `sample: ""` ✅
- Binary-Daten (`file`) sind vorhanden ✅

---

### Schritt 3: Route to Sample Nodes (Switch Node)

**Routing-Logik:**
- Switch Node prüft: `$json.route === "upload"`
- **Keine der Rules (sample-1, sample-2, sample-3) trifft zu!**
- **Default Output wird genommen** → `upload`

**Output:**
- Geht zu **Default Output** (nicht zu sample-1, sample-2, sample-3)
- Binary-Daten werden weitergegeben

---

### Schritt 4: Setze Sample-Info Code Node

**Code-Logik:**
```javascript
const sample = String($json.query?.sample || '').trim();

// Upload: Binary kommt direkt vom Webhook
if (!sample) {
    // Hole Binary vom Webhook
    binaryData = $binary;  // ← Binary-Daten vom Upload
}

return [{
    json: {
        ...$json,
        sample: '',
        source: 'Upload'  // ← source = 'Upload'
    },
    binary: binaryData  // ← Binary-Daten weitergeben
}];
```

**Output:**
- `source: "Upload"` ✅
- Binary-Daten vorhanden ✅

---

### Schritt 5: AI Agent - Vertex AI

**Input:**
- Binary-Daten vom Upload ✅
- `source: "Upload"`

**Output:**
- Extrahierte Daten aus der hochgeladenen Visitenkarte

---

## ✅ Zusammenfassung - Upload-Pfad

```
Business Card Upload (POST mit Binary-Datei)
    ↓ query.sample = "" oder undefined
Route to Sample Code Node
    ↓ route = "upload", sample = ""
Route to Sample Nodes Switch Node
    ↓ Default Output (upload)
Setze Sample-Info Code Node
    ↓ source = "Upload", Binary-Daten vorhanden
AI Agent - Vertex AI
    ↓ Extrahiert Daten aus hochgeladener Visitenkarte
Parse AI Agent Response
    ↓ Strukturierte Daten
Formatiere für Website
    ↓ Finales JSON
Antwort an Website
    ↓ Response mit extrahierten Daten
```

---

## 🔍 Wichtig: Switch Node Default Output

**Der Switch Node MUSS einen Default Output haben!**

### Konfiguration im Switch Node:

1. **"Route to Sample Nodes" Node öffnen**
2. **Parameters Tab → Routing Rules:**
   - Rule 1: `$json.route` equals `sample-1` → Output: `sample-1`
   - Rule 2: `$json.route` equals `sample-2` → Output: `sample-2`
   - Rule 3: `$json.route` equals `sample-3` → Output: `sample-3`
   - **Default Output:** `upload` (WICHTIG für Uploads!)

3. **Verbindung:**
   - **Default Output** → "Setze Sample-Info" Node

---

## 🧪 Test - Upload

### Test 1: Upload ohne Sample-Parameter

1. **Workflow aktivieren**
2. **Webhook Test:**
   - POST Request an Webhook
   - Binary-Datei anhängen
   - **KEIN** `?sample=1` Parameter!
3. **Prüfe in n8n Executions:**
   - "Route to Sample" Code Node Output: `route: "upload"` ✅
   - "Route to Sample Nodes" Switch Node: Geht zu **Default Output** (`upload`) ✅
   - "Setze Sample-Info" Node: `source: "Upload"` ✅
   - Binary-Daten vorhanden ✅
   - "AI Agent" Node: Wird ausgeführt ✅

### Test 2: Upload auf Website

1. **Auf Website:** "Eigene Visitenkarte hochladen" klicken
2. **Datei auswählen** und hochladen
3. **Prüfe in n8n Executions:**
   - Sollte denselben Pfad wie Test 1 nehmen ✅

---

## ✅ Erwartetes Ergebnis

**Bei Upload:**
- `route: "upload"` ✅
- `source: "Upload"` ✅
- Binary-Daten vorhanden ✅
- AI Agent extrahiert Daten aus hochgeladener Datei ✅

**Bei Sample 1/2/3:**
- `route: "sample-1"` / `"sample-2"` / `"sample-3"` ✅
- `source: "Sample 1"` / `"Sample 2"` / `"Sample 3"` ✅
- Binary-Daten werden von HTTP Request Node geladen ✅

---

## 🔧 Falls Upload nicht funktioniert

**Prüfe:**

1. **Switch Node Default Output:**
   - Ist Default Output auf `upload` gesetzt?
   - Geht Default Output zu "Setze Sample-Info"?

2. **Code Node Output:**
   - Was steht in `route`? (sollte `"upload"` sein bei Upload)
   - Sind Binary-Daten vorhanden?

3. **Setze Sample-Info Code Node:**
   - Wird `$binary` korrekt weitergegeben?
   - Ist `source: "Upload"` gesetzt?

---

**Der Upload-Pfad sollte so funktionieren!**

