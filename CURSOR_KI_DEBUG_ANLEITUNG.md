# 🤖 Anleitung für Cursor-KI - Business Card Workflow Debugger

## 🎯 Ziel

**Cursor-KI soll automatisch Workflow-Debug-Daten analysieren und Fixes generieren!**

---

## 📋 System-Architektur

### 1. N8n Workflow → Debug-Daten generieren

**Datei:** `n8n-business-card-workflow-vertex-DEBUG.json`

**Funktion:**
- Debug-Nodes sammeln Input/Output
- Debug Aggregator erstellt JSON-Summary
- Debug-Daten werden im Response zurückgegeben

### 2. Debug-Daten speichern

**Option A: Via Website (empfohlen)**
- Website empfängt Response mit Debug-Daten
- Website speichert `workflow-debug.json` im Projektordner

**Option B: Via HTTP Request**
- Debug Aggregator sendet HTTP POST an lokalen Endpoint
- Endpoint speichert JSON-Datei

**Option C: Via Manual Export**
- User kopiert Debug-Response aus n8n
- Speichert als `workflow-debug.json`

---

## 📁 Datei-Struktur

### `workflow-debug.json` (wird von n8n generiert)

```json
{
  "timestamp": "2025-11-01T12:00:00.000Z",
  "debugSummary": {
    "totalDebugNodes": 3,
    "nodes": ["Route to Sample", "Setze Sample-Info", "AI Agent - Vertex AI"],
    "hasErrors": true,
    "timestamp": "2025-11-01T12:00:00.000Z"
  },
  "debugData": [
    {
      "debugNode": "Route to Sample",
      "timestamp": "2025-11-01T12:00:00.000Z",
      "input": {...},
      "output": {...}
    },
    {
      "debugNode": "Setze Sample-Info",
      "timestamp": "2025-11-01T12:00:00.000Z",
      "input": {...},
      "output": {...},
      "hasBinary": false,
      "binaryInfo": null,
      "sample": "1",
      "source": "Sample 1"
    },
    {
      "debugNode": "AI Agent - Vertex AI",
      "timestamp": "2025-11-01T12:00:00.000Z",
      "input": {...},
      "output": {...},
      "hasOutput": false,
      "outputType": "object",
      "outputIsArray": false,
      "outputLength": null
    }
  ]
}
```

---

## 🤖 Cursor-KI Analyse-Strategie

### Schritt 1: Datei lesen

```javascript
const workflowDebug = require('./workflow-debug-analyzer.js');
const analysis = workflowDebug.analyzeWorkflowDebug();
```

### Schritt 2: Fehler erkennen

**Prüfe `analysis.errors[]`:**
- `binary-missing` → Binary-Daten fehlen
- `ai-agent-no-output` → AI Agent gibt keine Daten zurück
- `routing-issue` → Routing funktioniert nicht

### Schritt 3: Automatische Fixes generieren

**Basierend auf Fehler-Typ:**

1. **Binary-Missing:**
   - Fix: Code in "Setze Sample-Info" anpassen
   - Fallback zu anderen Binary-Quellen hinzufügen

2. **AI-Agent-No-Output:**
   - Fix: Structured Output Parser prüfen
   - Fix: AI Agent "Has Output Parser" aktivieren

3. **Routing-Issue:**
   - Fix: Code in "Route to Sample" prüfen
   - Fix: Switch Node Rules prüfen

### Schritt 4: Code-Änderungen vorschlagen

**Cursor-KI kann direkt:**

1. **Code-Nodes anpassen:**
   - `n8n-business-card-workflow-vertex-DEBUG.json` bearbeiten
   - Code in `jsCode` Parameter anpassen

2. **Konfiguration korrigieren:**
   - JSON-Parameter für Nodes anpassen
   - Verbindungen korrigieren

3. **Neue Nodes hinzufügen:**
   - Falls nötig, zusätzliche Debug-Nodes oder Fix-Nodes einfügen

---

## 🔧 Implementierung für Cursor-KI

### Funktion: `analyzeWorkflowAndFix()`

```javascript
async function analyzeWorkflowAndFix() {
    // 1. Debug-Daten analysieren
    const analysis = analyzeWorkflowDebug();
    
    if (analysis.status === 'success') {
        return { status: 'ok', message: 'Workflow funktioniert' };
    }
    
    // 2. Für jeden Fehler Fix generieren
    const fixes = [];
    analysis.errors.forEach(error => {
        if (error.fix.type === 'binary-missing') {
            fixes.push(fixBinaryMissing(error));
        }
        if (error.fix.type === 'ai-agent-no-output') {
            fixes.push(fixAIAgentOutput(error));
        }
    });
    
    // 3. Workflow JSON anpassen
    const workflowJson = readWorkflowJson();
    fixes.forEach(fix => {
        applyFixToWorkflow(workflowJson, fix);
    });
    
    // 4. Neue JSON speichern
    saveWorkflowJson(workflowJson);
    
    return { status: 'fixed', fixes: fixes.length };
}
```

---

## 📊 Beispiel-Analyse-Output

### Erfolg:
```json
{
  "status": "success",
  "errors": [],
  "warnings": [],
  "summary": {
    "totalNodes": 3,
    "successfulNodes": 3,
    "failedNodes": 0
  }
}
```

### Fehler:
```json
{
  "status": "error",
  "errors": [
    {
      "node": "Setze Sample-Info",
      "issue": "Binary-Daten fehlen",
      "severity": "critical",
      "fix": {
        "type": "binary-missing",
        "suggestion": "Prüfe ob Lade Sample Node Binary-Daten zurückgibt",
        "code": "const binaryData = $binary || $('Lade Sample 1').binary;"
      }
    }
  ],
  "fixes": [
    {
      "node": "Setze Sample-Info",
      "type": "code-fix",
      "code": "...",
      "description": "Binary-Daten Fallback hinzufügen"
    }
  ]
}
```

---

## 🧪 Test-Strategie

### 1. Workflow ausführen
```json
{
  "query": {
    "sample": "1"
  }
}
```

### 2. Debug-Daten extrahieren
- In n8n: "🔍 Debug Aggregator" Output kopieren
- Als `workflow-debug.json` speichern

### 3. Cursor-KI analysiert
```bash
node workflow-debug-analyzer.js
```

### 4. Cursor-KI generiert Fixes
- Analysiert Fehler
- Generiert Code-Änderungen
- Aktualisiert Workflow JSON

### 5. Workflow erneut testen
- Neuen Workflow importieren
- Erneut testen

---

## ✅ Checkliste für Cursor-KI

Wenn `workflow-debug.json` vorhanden ist:

1. ✅ Datei lesen
2. ✅ `analysis.errors[]` prüfen
3. ✅ Für jeden Fehler Fix generieren
4. ✅ Workflow JSON anpassen
5. ✅ Neue JSON speichern
6. ✅ User informieren: "Workflow wurde angepasst, bitte erneut testen"

---

## 💡 Beispiel-Workflow für Cursor-KI

```javascript
// Cursor-KI kann direkt ausführen:
const analysis = require('./workflow-debug-analyzer.js').analyzeWorkflowDebug();

if (analysis.status === 'error') {
    console.log('🔍 Fehler gefunden:');
    analysis.errors.forEach(error => {
        console.log(`❌ ${error.node}: ${error.issue}`);
        console.log(`   Fix: ${error.fix.suggestion}`);
    });
    
    // Automatisch Fixes anwenden
    applyFixes(analysis.fixes);
}
```

---

**Jetzt kann Cursor-KI automatisch Workflow-Fehler erkennen und fixen!**

