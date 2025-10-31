# 📊 Logging - Schnell-Anleitung

## ✅ Was wurde implementiert:

### 1. **Website-Logging** (Browser Console)
- ✅ Gruppierte Logs mit eindeutiger ID
- ✅ Zeitstempel für jeden Schritt
- ✅ Performance-Tracking (Request-Duration)
- ✅ Detaillierte Response-Struktur Analyse
- ✅ Fehler-Logs mit vollständigem Stack-Trace

### 2. **n8n-Workflow-Logging**
- ✅ Logs in "Setze Sample-Info" Node
- ✅ Logs in "Parse AI Agent Response" Node
- ✅ Input/Output-Daten werden geloggt
- ✅ Fehler-Logs bei Problemen

---

## 🔍 So nutzt du das Logging:

### Auf der Website (Browser Console):

1. **Öffne Browser Console:**
   - Chrome/Edge: `F12` → "Console" Tab
   - Firefox: `F12` → "Console" Tab
   - Safari: `Cmd+Option+C`

2. **Teste Workflow:**
   - Klicke auf Sample 1/2/3 oder Upload
   - Watch Console für gruppierte Logs

3. **Was du siehst:**
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
   - Siehe Output der Code Nodes

4. **Was du siehst:**
   ```
   🔍 [Setze Sample-Info] Workflow gestartet
   ⏰ Zeitstempel: 2025-01-27T12:00:00.000Z
   📋 Input JSON: { query: { sample: '1' } }
   📝 Sample Parameter: 1
   ✅ [Setze Sample-Info] Binary-Daten gefunden: { hasBinary: true, ... }

   🔍 [Parse AI Agent Response] Starte Parsing
   ⏰ Zeitstempel: 2025-01-27T12:00:05.000Z
   📝 Metadaten: { source: 'Sample 1', sample: '1' }
   ✅ [Parse AI Agent Response] Extrahiert: { name: 'Max Mustermann', ... }
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

## 🎉 Viel Erfolg beim Debugging!

Mit diesem Logging kannst du genau sehen, was passiert bei jedem Workflow-Aufruf - sowohl auf der Website als auch in n8n!

