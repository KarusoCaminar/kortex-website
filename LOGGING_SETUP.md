# 📊 Logging-Setup für Business Card Workflow

## ✅ Was wurde implementiert:

### 1. **Website-Logging** (kortex-n8n-modal.html)

**Verbessertes Console-Logging mit:**
- ✅ **Eindeutige Log-IDs** pro Workflow-Ausführung
- ✅ **Zeitstempel** für jeden Schritt
- ✅ **Gruppierte Logs** (console.group) für bessere Übersicht
- ✅ **Performance-Tracking** (Request-Dauer)
- ✅ **Detaillierte Response-Struktur** Analyse
- ✅ **Strukturierte Fehler-Logs** mit vollständigem Stack-Trace

**Beispiel-Output in Browser Console:**
```
🚀 Workflow gestartet [workflow-1234567890-abc123]
  ⏰ Zeitstempel: 2025-01-27T12:00:00.000Z
  🌐 Webhook URL: https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
  📝 Sample Parameter: sample=1
  📋 Workflow Titel: Visitenkarten Demo – Sample 1
  🌐 Sende Request: { method: 'GET', url: '...', duration: '123.45ms' }
  ✅ Response erhalten: { status: 200, duration: '123.45ms' }
  ✅ Workflow Response: { ... }
  ✅ Daten in Tabelle eingefügt: { name: 'Max Mustermann', ... }
```

---

### 2. **n8n-Workflow-Logging** (n8n-business-card-workflow-vertex.json)

**Logging in Code Nodes:**

#### "Setze Sample-Info" Node:
- ✅ Loggt Workflow-Start mit Zeitstempel
- ✅ Loggt Input JSON
- ✅ Loggt Sample-Parameter
- ✅ Loggt Binary-Daten Status
- ✅ Fehler-Logging bei fehlenden Binary-Daten

#### "Parse AI Agent Response" Node:
- ✅ Loggt Parsing-Start
- ✅ Loggt Input Response (vollständig)
- ✅ Loggt Metadaten (source, sample)
- ✅ Loggt extrahierte Daten (name, company, email, etc.)
- ✅ Fehler-Logging bei Parsing-Fehlern

**Beispiel-Output in n8n Execution Logs:**
```
🔍 [Setze Sample-Info] Workflow gestartet
⏰ Zeitstempel: 2025-01-27T12:00:00.000Z
📋 Input JSON: { query: { sample: '1' } }
📝 Sample Parameter: 1
✅ [Setze Sample-Info] Binary-Daten gefunden: { hasBinary: true, sample: '1', source: 'Sample 1' }

🔍 [Parse AI Agent Response] Starte Parsing
⏰ Zeitstempel: 2025-01-27T12:00:05.000Z
📝 Metadaten: { source: 'Sample 1', sample: '1' }
✅ [Parse AI Agent Response] Extrahiert: { name: 'Max Mustermann', company: 'Beispiel GmbH', ... }
```

---

## 🔍 So nutzt du das Logging:

### Auf der Website (Browser Console):

1. **Öffne Browser Console:**
   - Chrome/Edge: `F12` oder `Strg+Shift+J`
   - Firefox: `F12` oder `Strg+Shift+K`
   - Safari: `Cmd+Option+C`

2. **Teste Workflow:**
   - Klicke auf Sample 1/2/3 oder Upload
   - Watch Console für gruppierte Logs

3. **Was zu sehen ist:**
   - ✅ Alle Workflow-Schritte mit Zeitstempel
   - ✅ Request-Details (URL, Method, Body)
   - ✅ Response-Details (Status, Duration, Data)
   - ✅ Fehler mit vollständigem Stack-Trace

---

### In n8n (Execution Logs):

1. **Öffne n8n Workflow:**
   - Gehe zu deinem n8n Instance
   - Öffne "Business Card Extraction Demo - Vertex AI" Workflow

2. **Teste Workflow:**
   - Klicke auf "Execute Workflow" (oben rechts)
   - Oder triggere via Webhook von Website

3. **Sehe Execution Logs:**
   - Klicke auf die Execution in der History
   - Klicke auf einzelne Nodes → "Execution Data" Tab
   - Klicke auf "Logs" Tab (falls verfügbar)
   - Oder siehe Output der Code Nodes

4. **Was zu sehen ist:**
   - ✅ Logs von "Setze Sample-Info" Node
   - ✅ Logs von "Parse AI Agent Response" Node
   - ✅ Input/Output-Daten jedes Nodes
   - ✅ Fehler-Logs bei Problemen

---

## 📊 Log-Format:

### Website-Logs:
```
🚀 Workflow gestartet [workflow-{timestamp}-{random}]
  ⏰ Zeitstempel: {ISO-Date}
  🌐 Webhook URL: {url}
  📝 Sample Parameter: {sample or 'Upload'}
  📋 Workflow Titel: {title}
  🌐 Sende Request: {method, url, bodyType, duration}
  ✅ Response erhalten: {status, duration, timestamp}
  ✅ Workflow Response: {data}
  📊 Response Struktur: {type, hasPayload, isArray, keys}
  ✅ Daten in Tabelle eingefügt: {extracted-data}
```

### n8n-Logs:
```
🔍 [Node Name] Action startet
⏰ Zeitstempel: {ISO-Date}
📋 Input: {data}
✅ [Node Name] Ergebnis: {result}
```

---

## 🚨 Fehler-Logging:

### Website:
```
❌ Workflow Fehler
  ⏰ Zeitstempel: {ISO-Date}
  ❌ Fehler: {error}
  📋 Fehler Details: {message, name, stack, workflowUrl, sampleParam}
```

### n8n:
```
❌ [Node Name] Fehler: {error message}
📝 Sample: {sample}
📦 Binary: {binary data}
```

---

## 💡 Tipps:

### 1. Browser Console filtern:
- Nutze Filter-Box oben in Console
- Filter nach: `🚀`, `✅`, `❌`, `🔍` für verschiedene Log-Level
- Filter nach Workflow-ID für spezifische Ausführung

### 2. n8n Execution Logs:
- Prüfe **Execution Data** Tab für Input/Output
- Prüfe **Logs** Tab (falls verfügbar)
- Prüfe einzelne Nodes für detaillierte Logs

### 3. Performance-Tracking:
- Website-Logs zeigen Request-Duration
- Vergleiche verschiedene Samples
- Identifiziere langsame Requests

---

## ✅ Checkliste:

### Website-Logging:
- [ ] Console öffnen (F12)
- [ ] Workflow triggern (Sample oder Upload)
- [ ] Logs prüfen in Console
- [ ] Request-Details prüfen
- [ ] Response-Details prüfen
- [ ] Fehler-Logs prüfen (falls vorhanden)

### n8n-Logging:
- [ ] Workflow in n8n öffnen
- [ ] Workflow triggern (von Website oder manuell)
- [ ] Execution Logs prüfen
- [ ] "Setze Sample-Info" Node Output prüfen
- [ ] "Parse AI Agent Response" Node Output prüfen
- [ ] Fehler-Logs prüfen (falls vorhanden)

---

## 📝 Nächste Schritte:

1. **Teste alle Samples** und prüfe Logs
2. **Prüfe Performance** (Request-Duration)
3. **Identifiziere Probleme** anhand der Logs
4. **Optimiere Workflow** basierend auf Log-Daten

---

## 🎉 Viel Erfolg beim Debugging!

Mit diesem Logging kannst du genau sehen, was passiert bei jedem Workflow-Aufruf - sowohl auf der Website als auch in n8n!

