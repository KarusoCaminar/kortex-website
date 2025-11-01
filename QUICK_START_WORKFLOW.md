# 🚀 Quick Start - Workflow Testen

## Schritt 1: JSON in n8n importieren

**Welches JSON?**

### Option A: Gefixtes JSON direkt (empfohlen)

**`n8n-business-card-workflow-vertex-FIXED.json`**

1. **n8n öffnen**
2. **Workflows** → **Import from File**
3. **`n8n-business-card-workflow-vertex-FIXED.json`** auswählen
4. **Import**

### Option B: Erst DEBUG, dann fixen

1. **`n8n-business-card-workflow-vertex-DEBUG.json`** importieren
2. **`node auto-fix-workflow.js`** ausführen
3. **`n8n-business-card-workflow-vertex-FIXED.json`** importieren

---

## Schritt 2: Workflow aktivieren

1. **Oben rechts:** **"Active" Toggle aktivieren** ✅
2. **Workflow speichern**

---

## Schritt 3: Manuelle Fixes in n8n UI (WICHTIG!)

**Befolge:** `MANUAL_FIXES_REQUIRED.md`

1. **"Require Specific Output Format" aktivieren** (AI Agent Node)
2. **Structured Output Parser als SUB-NODE hinzufügen** (am AI Agent)
3. **JSON Schema im Parser konfigurieren**

---

## Schritt 4: Testen starten

### Option A: Automatisches Test-System

```bash
node auto-test-workflow.js
```

- Triggert n8n Webhook für Sample 1, 2, 3
- Erstellt `test-responses.json` und `test-report.json`

### Option B: Vollautomatischer Loop

```bash
node auto-debug-loop.js
```

- Test → Analyse → Fix → Test (automatisch)

---

## Schritt 5: Website-Logs auslesen (optional)

### Methode 1: HTML-Seite

1. **`read-website-logs.html`** im Browser öffnen
2. **Auf derselben Domain wie die Kortex-Website**
3. **"📥 Logs laden"** klicken
4. **"💾 Als JSON exportieren"** klicken

### Methode 2: Browser-Konsole

```javascript
// In Browser-Konsole (F12) auf der Kortex-Website:
const logs = JSON.parse(localStorage.getItem('workflowLogs') || '[]');
console.log('Website Logs:', logs);
// Kopiere die Logs aus der Konsole
```

---

## Zusammenfassung

1. ✅ **JSON importieren** (`n8n-business-card-workflow-vertex-FIXED.json`)
2. ✅ **Workflow aktivieren** (Active Toggle)
3. ✅ **Manuelle Fixes** (`MANUAL_FIXES_REQUIRED.md`)
4. ✅ **Testen:** `node auto-test-workflow.js`
5. ✅ **Website-Logs lesen** (optional): `read-website-logs.html`

---

**Dann sollte alles funktionieren!**

