# ✅ Debug-Workflow Anleitung

## 🎯 Was wurde hinzugefügt

**3 Debug-Nodes + 1 Debug-Aggregator** - Zeigt automatisch alle Debug-Daten!

---

## 📋 Debug-Nodes

### 1. 🔍 Debug: Route to Sample
- **Position:** Nach "Route to Sample"
- **Speichert:** Input, Output, `route`, `sample`, Binary-Status

### 2. 🔍 Debug: Setze Sample-Info
- **Position:** Nach "Setze Sample-Info"
- **Speichert:** Input, Output, Binary-Info, Sample, Source

### 3. 🔍 Debug: AI Agent
- **Position:** Nach "AI Agent - Vertex AI"
- **Speichert:** Input, Output, Has-Output-Status, Output-Typ

### 4. 🔍 Debug Aggregator
- **Position:** Vor "Antwort an Website"
- **Sammelt:** Alle Debug-Daten
- **Generiert:** HTML-Debug-Output + JSON-Summary

---

## 🧪 Test

### Test 1: Sample 1

1. **Workflow aktivieren**
2. **Execute Workflow** klicken
3. **"Manual Trigger (Test)" öffnen**
4. **Test-Daten hinzufügen:**
   ```json
   {
     "query": {
       "sample": "1"
     }
   }
   ```
5. **Execute**

### Ergebnis prüfen:

1. **In n8n Executions:** Klicke auf die letzte Execution
2. **"🔍 Debug Aggregator" Node öffnen**
3. **Output Tab:** JSON-Summary + HTML-Binary
4. **HTML herunterladen:** Binary-Datei `debug-output.html` öffnen
5. **HTML zeigt:**
   - Alle Debug-Nodes
   - Input/Output jedes Nodes
   - Fehler-Markierungen (rot/grün)
   - Binary-Status
   - Output-Status

---

## 📊 Debug-Daten Format

### JSON-Format pro Debug-Node:

```json
{
  "_debug": {
    "debugNode": "Node Name",
    "timestamp": "2025-11-01T12:00:00.000Z",
    "input": {...},
    "output": {...},
    "hasBinary": true/false,
    "binaryInfo": {...},
    "hasOutput": true/false
  }
}
```

---

## 🔍 Fehler erkennen

**Im HTML-Output werden Fehler markiert:**

- ❌ **Rot (Error):** 
  - "Setze Sample-Info" ohne Binary-Daten
  - "AI Agent" ohne Output

- ✅ **Grün (Success):**
  - Alle Daten vorhanden
  - Workflow funktioniert

---

## 📋 Debug-Summary JSON

```json
{
  "debugSummary": {
    "totalDebugNodes": 3,
    "nodes": ["Route to Sample", "Setze Sample-Info", "AI Agent - Vertex AI"],
    "hasErrors": false,
    "timestamp": "2025-11-01T12:00:00.000Z"
  },
  "debugData": [...]
}
```

---

## ✅ Vorteile

1. **Automatisch:** Keine manuelle Node-Prüfung nötig
2. **Visuell:** HTML-Output zeigt alles übersichtlich
3. **JSON:** Strukturierte Daten für KI-Analyse
4. **Fehler-Erkennung:** Automatische Markierung

---

**Import:** `n8n-business-card-workflow-vertex-DEBUG.json`

**Jetzt kannst du direkt sehen, wo Fehler auftreten!**

