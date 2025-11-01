# Automatisches Debugging-System für Visitenkarten-Workflow

## Übersicht

Dieses System automatisiert das Testen, Analysieren und Fixen des n8n Business Card Workflows.

**Funktionen:**
- ✅ Automatisches Testen (triggert n8n Webhook)
- ✅ Automatische Response-Analyse (identifiziert Fehler)
- ✅ Automatische JSON-Fixes (korrigiert Code-Nodes und Verbindungen)
- ✅ Vollautomatischer Debug-Loop (Test → Analyse → Fix → Test)

---

## Schnellstart

### Schritt 1: Automatisches Test-System

```bash
node auto-test-workflow.js
```

- Triggert n8n Webhook für Sample 1, 2, 3
- Erstellt `test-responses.json` und `test-report.json`

### Schritt 2: Response analysieren

```bash
node workflow-response-analyzer.js
```

- Analysiert `test-report.json`
- Identifiziert Fehler und generiert `analysis-report.json`

### Schritt 3: Automatische Fixes anwenden

```bash
node auto-fix-workflow.js
```

- Wendet automatische Fixes an
- Erstellt `n8n-business-card-workflow-vertex-FIXED.json`

### Schritt 4: Vollautomatischer Loop (optional)

```bash
node auto-debug-loop.js
```

- Läuft automatisch durch: Test → Analyse → Fix → Test
- Stoppt wenn: Keine Fehler mehr ODER max. 5 Iterationen

### Schritt 5: Manuelle Fixes in n8n

1. `n8n-business-card-workflow-vertex-FIXED.json` in n8n importieren
2. `MANUAL_FIXES_REQUIRED.md` befolgen:
   - "Require Specific Output Format" aktivieren
   - Structured Output Parser als SUB-NODE hinzufügen

---

## Dateien

### Test-Dateien

- **`auto-test-workflow.js`** - Triggert n8n Webhook und sammelt Responses
- **`test-responses.json`** - Gespeicherte Responses von Tests
- **`test-report.json`** - Zusammenfassung der Tests

### Analyse-Dateien

- **`workflow-response-analyzer.js`** - Analysiert Responses auf Fehler
- **`analysis-report.json`** - Analyse-Report mit Fix-Empfehlungen

### Fix-Dateien

- **`auto-fix-workflow.js`** - Wendet automatische Fixes an
- **`n8n-business-card-workflow-vertex-FIXED.json`** - Korrigierter Workflow

### Loop-Dateien

- **`auto-debug-loop.js`** - Vollautomatischer Debug-Loop
- **`debug-loop-log.json`** - Log des Debug-Loops

### Dokumentation

- **`MANUAL_FIXES_REQUIRED.md`** - Anleitung für manuelle Fixes in n8n UI

---

## Was kann automatisch gefixt werden?

### Automatisch (per JSON):

1. ✅ Code in "Setze Sample-Info" Node (Error-Response statt `throw Error`)
2. ✅ Code in "Transform Output" Node (Error-Handling verbessern)
3. ✅ Verbindungen korrigieren (`ai_outputParser` zeigt auf Chat Model)
4. ✅ Node-Parameter anpassen (Options, Settings)

### Muss manuell (n8n UI):

1. ❌ "Require Specific Output Format" Toggle aktivieren (AI Agent Node)
2. ❌ Structured Output Parser als SUB-NODE hinzufügen (am AI Agent)
3. ❌ JSON Schema im Parser konfigurieren (wenn SUB-NODE erstellt wird)

---

## Detaillierte Anleitung

### Phase 1: Automatisches Test-System

**Datei:** `auto-test-workflow.js`

**Funktionen:**
- `triggerWorkflowSample(sample)` - Triggert Sample 1/2/3
- `analyzeResponse(result)` - Analysiert Response auf Fehler
- `testAllSamples()` - Testet alle 3 Samples
- `generateReport(results)` - Erstellt Debug-Report

**Output:**
- `test-responses.json` - Alle Responses
- `test-report.json` - Zusammenfassung

### Phase 2: Automatische Response-Analyse

**Datei:** `workflow-response-analyzer.js`

**Funktionen:**
- `loadTestData()` - Liest test-responses.json oder test-report.json
- `analyzeTestData(data)` - Identifiziert konkrete Fehler

**Identifizierte Fehler:**
- `type: 'error'` Responses (von "Setze Sample-Info")
- Fehlende AI-Output (`output` ist leer)
- Binary-Daten fehlen (bei Samples)
- Routing-Fehler (falsches Sample geladen)

**Output:**
- `analysis-report.json` - Analyse mit Fix-Empfehlungen

### Phase 3: Automatische JSON-Fixes

**Datei:** `auto-fix-workflow.js`

**Funktionen:**
- `fixSetzeSampleInfoNode(workflow)` - Korrigiert Error-Handling
- `fixConnections(workflow)` - Korrigiert `ai_outputParser` Verbindungen
- `fixTransformOutputNode(workflow)` - Verbessertes Error-Handling

**Fixes:**
1. **Fix 1:** "Setze Sample-Info" Node - Error-Response statt `throw Error`
2. **Fix 2:** Verbindungen korrigieren (`ai_outputParser` zeigt auf Chat Model)
3. **Fix 3:** "Transform Output" Node - Besseres Error-Handling

**Output:**
- `n8n-business-card-workflow-vertex-FIXED.json` - Korrigierter Workflow

### Phase 4: Vollautomatischer Debug-Loop

**Datei:** `auto-debug-loop.js`

**Ablauf:**
1. Triggert Workflow (Sample 1/2/3)
2. Analysiert Response
3. Wenn Fehler: Wendet automatische Fixes an
4. Wiederholt bis Erfolg oder max. Iterationen

**Output:**
- `debug-loop-log.json` - Log des Debug-Loops

---

## Konfiguration

### Umgebungsvariablen

```bash
# n8n Webhook URL
export N8N_WEBHOOK_URL="https://n8n2.kortex-system.de/webhook/business-card-extraction"
```

**Standard:** `https://n8n2.kortex-system.de/webhook/business-card-extraction`

---

## Beispiel-Ablauf

### Kompletter Ablauf (manuell):

```bash
# 1. Testen
node auto-test-workflow.js

# 2. Analysieren
node workflow-response-analyzer.js

# 3. Fixen
node auto-fix-workflow.js

# 4. Nochmal testen
node auto-test-workflow.js
```

### Kompletter Ablauf (automatisch):

```bash
# Vollautomatischer Loop
node auto-debug-loop.js
```

---

## Erwartetes Ergebnis

### Nach automatischen Fixes:

- ✅ Workflow JSON enthält korrekte Code-Nodes
- ✅ Verbindungen sind korrekt
- ✅ Response-Analyse identifiziert verbleibende Probleme

### Nach manuellen Fixes in n8n:

- ✅ "Require Specific Output Format" ist aktiviert
- ✅ Structured Output Parser ist als SUB-NODE verbunden
- ✅ Workflow funktioniert vollständig

---

## Troubleshooting

### Problem: "Workflow-Datei nicht gefunden"

**Lösung:** Stelle sicher, dass `n8n-business-card-workflow-vertex-DEBUG.json` im aktuellen Verzeichnis liegt.

### Problem: "Webhook URL nicht erreichbar"

**Lösung:** Prüfe ob n8n Workflow aktiviert ist und Webhook URL korrekt ist.

### Problem: "Keine Responses erhalten"

**Lösung:** Prüfe ob n8n Workflow läuft und keine Fehler hat. Teste Webhook manuell im Browser.

---

## Nächste Schritte

1. ✅ Automatisches Test-System starten (`auto-test-workflow.js`)
2. ✅ Response analysieren (`workflow-response-analyzer.js`)
3. ✅ Automatische Fixes anwenden (`auto-fix-workflow.js`)
4. ✅ Vollautomatischen Loop testen (`auto-debug-loop.js`)
5. ✅ Manuelle Fixes in n8n (`MANUAL_FIXES_REQUIRED.md`)

---

**Nach allen Schritten sollte der Workflow vollständig funktionieren!**

