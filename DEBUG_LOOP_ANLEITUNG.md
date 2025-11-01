# Automatisierter Debug-Loop System - Anleitung

## Übersicht

Vollautomatisiertes Debug-System für n8n Business Card Workflow:
1. N8n schreibt Debug-JSON automatisch
2. Lokaler HTTP-Server stellt JSON bereit
3. Cursor-KI analysiert JSON automatisch
4. Cursor-KI generiert Fixes und aktualisiert Workflow-JSON
5. Loop läuft bis keine Fehler mehr vorhanden

---

## Setup

### 1. Dependencies installieren

```bash
npm install
```

**ODER manuell:**
```bash
npm install express cors axios
```

### 2. Debug-Server starten

**Terminal 1:**
```bash
npm run debug-server
# ODER: node debug-server.js
```

**Server läuft auf:** `http://localhost:3000`

**Endpoints:**
- `GET http://localhost:3000/debug/workflow.json` - Liefert Debug-Daten
- `POST http://localhost:3000/debug/save` - Speichert Debug-Daten
- `GET http://localhost:3000/debug/status` - Server-Status

---

## N8n Workflow Setup

### 1. Workflow importieren

**Datei:** `n8n-business-card-workflow-vertex-DEBUG.json`

- In n8n: Workflows → Import from File
- Workflow importieren

### 2. Credentials prüfen

- **Google Vertex Chat Model:** Credentials setzen
- **💾 Save Debug Data Node:** Optional deaktivieren wenn Debug-Server nicht läuft

### 3. Workflow aktivieren

- Workflow aktivieren
- **Wichtig:** Debug-Server muss laufen für automatisches Speichern!

---

## Debug-Loop nutzen

### Option 1: CLI-Tool (Interaktiv)

```bash
node debug-loop-cli.js
```

**Menü:**
- Optionen wählen (Sample 1/2/3, Upload, oder Manuell)
- Max Iterationen eingeben
- Loop startet automatisch

### Option 2: Direkt (Command Line)

```bash
# Sample 1
node debug-loop-controller.js sample 1

# Sample 2
node debug-loop-controller.js sample 2

# Upload
node debug-loop-controller.js upload ./samples/bc-1.jpg
```

### Option 3: Manueller Loop

```bash
# Nur Loop, kein Trigger
node debug-loop-controller.js
```

---

## Ablauf

1. **Debug-Server starten** (Terminal 1)
2. **Workflow in n8n aktivieren**
3. **Debug-Loop starten** (Terminal 2)
4. **Loop läuft automatisch:**
   - Trigger Workflow (Sample/Upload)
   - Lädt Debug-Daten von `http://localhost:3000/debug/workflow.json`
   - Analysiert Fehler
   - Wendet Fixes an (aktualisiert Workflow-JSON)
   - Wartet 2 Sekunden
   - Wiederholt bis keine Fehler mehr oder max Iterationen

---

## Auto-Fix Funktionen

### 1. Binary-Daten fehlen

**Erkannt:** `hasBinary: false` in "Setze Sample-Info"

**Fix:** Erweitert Code mit Fallback zu allen möglichen Binary-Quellen

**Aktualisiert:** `n8n-business-card-workflow-vertex-DEBUG.json` → "Setze Sample-Info" Node

### 2. AI Agent Output fehlt

**Erkannt:** `hasOutput: false` in "AI Agent - Vertex AI"

**Fix:**
- Aktiviert `hasOutputParser: true`
- Aktiviert `automaticallyPassthroughBinaryImages: true`
- Prüft Structured Output Parser Verbindung

**Aktualisiert:** `n8n-business-card-workflow-vertex-DEBUG.json` → "AI Agent - Vertex AI" Node

### 3. Routing-Fehler

**Erkannt:** Routing funktioniert nicht

**Fix:** Korrigiert Code-Logik in "Route to Sample" Node

**Aktualisiert:** `n8n-business-card-workflow-vertex-DEBUG.json` → "Route to Sample" Node

---

## Sicherheit

- **Backup:** Vor jeder Änderung wird Backup erstellt (`*.backup.{timestamp}.json`)
- **Max Iterationen:** 5 (verhindert Endlosschleifen)
- **Error-Handling:** Loop bricht ab bei kritischen Fehlern

---

## Troubleshooting

### Debug-Server läuft nicht

**Fehler:** `Debug-Server läuft nicht auf localhost:3000`

**Lösung:**
```bash
npm run debug-server
```

### Debug-Daten werden nicht gespeichert

**Fehler:** `Debug-Datei nicht gefunden`

**Lösung:**
1. Prüfe ob "💾 Save Debug Data" Node aktiv ist
2. Prüfe ob Debug-Server läuft
3. Manuell: Kopiere Debug-Response aus n8n → Speichere als `workflow-debug.json`

### Workflow-Fixes werden nicht angewendet

**Fehler:** `Keine Fixes angewendet`

**Lösung:**
1. Prüfe ob Workflow-JSON korrekt ist
2. Prüfe ob Fehler bereits behoben sind
3. Manuell prüfen: `node workflow-debug-analyzer.js`

---

## Beispiel-Output

```
🚀 Debug-Loop Controller gestartet
📋 Test-Daten: { sample: '1' }

🔍 Prüfe Debug-Server...
✅ Debug-Server erreichbar

🧪 Trigger Workflow...
✅ Workflow getriggert mit Sample 1

⏳ Warte 3 Sekunden auf Debug-Daten...

🔍 Debug-Loop gestartet (max 5 Iterationen)
📊 Debug-URL: http://localhost:3000/debug/workflow.json
⏱️  Delay zwischen Iterationen: 2000ms

--- Iteration 1/5 ---
📥 Lade Debug-Daten...
📊 Status: error
   Nodes: 3 (2 erfolgreich, 1 fehlgeschlagen)
❌ Fehler gefunden: 1
   - Setze Sample-Info: Binary-Daten fehlen
🔧 Wende Fixes an...
✅ 1 Fix(es) angewendet:
   - binary-missing in Setze Sample-Info
📁 Backup: n8n-business-card-workflow-vertex-DEBUG.backup.1730486400000.json

⏳ Warte 2000ms vor nächster Iteration...

--- Iteration 2/5 ---
📥 Lade Debug-Daten...
📊 Status: success
   Nodes: 3 (3 erfolgreich, 0 fehlgeschlagen)
✅ Keine Fehler mehr! Debug-Loop erfolgreich abgeschlossen.
```

---

## Dateien

### Core:
- `debug-server.js` - Lokaler HTTP-Server
- `workflow-debug-analyzer.js` - Debug-Analyzer + Auto-Fix Funktionen
- `debug-loop-controller.js` - Loop-Controller
- `test-workflow.js` - Workflow-Trigger Script
- `debug-loop-cli.js` - CLI-Tool (interaktiv)

### Workflow:
- `n8n-business-card-workflow-vertex-DEBUG.json` - Debug-Workflow mit Auto-Save

### Config:
- `package.json` - Dependencies

---

**Das System ist jetzt vollständig implementiert!**

