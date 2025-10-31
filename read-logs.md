# 📊 Logs für AI-Assistenten lesen

## 🎯 So kann ich (AI-Assistent) die Fehler einsehen:

### Option 1: Exportiere Logs als JSON-Datei

1. **Öffne Browser Console** (`F12`)

2. **Gib ein:**
```javascript
downloadLogsJSON()
```

3. **Datei wird heruntergeladen:**
   - `workflow-logs-export-YYYY-MM-DD.json`
   - Diese Datei kann ich dann direkt lesen!

---

### Option 2: Nutze Log-Viewer

1. **Öffne `view-logs.html` im Browser**

2. **Klicke auf "🤖 Für AI exportieren" Button**

3. **Datei wird heruntergeladen:**
   - `workflow-errors-for-ai-YYYY-MM-DD.json`
   - Diese Datei ist AI-freundlich formatiert!

---

### Option 3: Zeige Fehler in Console

1. **Öffne Browser Console** (`F12`)

2. **Gib ein:**
```javascript
showLastRunErrorsForExport()
```

3. **Du siehst:**
   - Alle Fehler des letzten Runs
   - JSON-String zum Kopieren
   - Kannst du mir dann zeigen/paste

---

### Option 4: Fehler-Zusammenfassung

1. **Öffne Browser Console** (`F12`)

2. **Gib ein:**
```javascript
showErrorSummary()
```

3. **Du siehst:**
   - Text-Zusammenfassung aller Fehler
   - Wird automatisch in Clipboard kopiert
   - Kannst du mir dann zeigen/paste

---

## 📋 Was die exportierte Datei enthält:

### Vollständiger Export (`workflow-logs-export-*.json`):

```json
{
  "exportTimestamp": "2025-01-27T12:00:00.000Z",
  "totalLogs": 10,
  "summary": {
    "total": 10,
    "success": 7,
    "error": 2,
    "started": 1,
    "withErrors": 2
  },
  "lastRun": { ... },
  "lastRunErrors": [ ... ],
  "allErrors": [ ... ],
  "logs": [ ... ]
}
```

### AI-freundlicher Export (`workflow-errors-for-ai-*.json`):

```json
{
  "exportTimestamp": "2025-01-27T12:00:00.000Z",
  "summary": { ... },
  "lastRun": {
    "id": "workflow-1234567890-abc",
    "status": "error",
    "errors": [
      {
        "type": "http_error",
        "message": "HTTP 500: Internal Server Error",
        "status": 500
      }
    ]
  },
  "recentErrors": [ ... ],
  "allLogs": [ ... ]
}
```

---

## 🔍 Was ich (AI-Assistent) sehen kann:

### Aus dem Export:

1. **Letzter Run:**
   - ✅ Status (success, error, started)
   - ✅ Fehler (Typ, Nachricht, HTTP Status)
   - ✅ Events (Request, Response, etc.)
   - ✅ Response-Daten

2. **Alle Fehler:**
   - ✅ Fehler-Typ (http_error, exception, etc.)
   - ✅ Fehler-Nachricht
   - ✅ HTTP Status (falls vorhanden)
   - ✅ Response Body (falls vorhanden)
   - ✅ Stack Trace (falls vorhanden)

3. **Statistiken:**
   - ✅ Anzahl erfolgreicher Runs
   - ✅ Anzahl fehlerhafter Runs
   - ✅ Anzahl Runs mit Fehlern

---

## 💡 Tipps:

### 1. Nach jedem Test exportieren:

```javascript
// Teste Workflow, dann:
downloadLogsJSON()
// Oder:
exportForAI() // in view-logs.html
```

### 2. Automatischer Export bei Fehlern:

Du könntest einen Listener einrichten, der automatisch exportiert wenn ein Fehler auftritt:

```javascript
// In kortex-n8n-modal.html nach Fehler-Handling:
if (workflowLog.errors.length > 0) {
  console.log('⚠️ Fehler aufgetreten - nutze downloadLogsJSON() um Logs zu exportieren');
}
```

---

## ✅ Checkliste:

- [ ] `downloadLogsJSON()` funktioniert
- [ ] `exportForAI()` funktioniert (in view-logs.html)
- [ ] Exportierte Datei enthält alle Fehler
- [ ] Ich kann die Datei dann lesen und analysieren

---

## 🎉 Viel Erfolg!

Jetzt kannst du einfach die Logs exportieren und mir zeigen - dann kann ich direkt die Fehler analysieren und Lösungen vorschlagen!

