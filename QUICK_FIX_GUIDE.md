# 🚀 Quick Fix Guide - Structured Output Parser & Debug-Loop

## 📍 Structured Output Parser - Wo er hinmuss:

### ✅ In deinem Workflow (bereits korrekt!):

```
Structured Output Parser (oben/links)
    ↓ (GESTRICHELTE LINIE - ai_outputParser Verbindung)
Google Vertex Chat Model
    ↓ (normale Verbindung)
AI Agent - Vertex AI
```

**Die Verbindung ist bereits in der JSON!** Zeile 267-268:
```json
"Structured Output Parser": {
  "ai_outputParser": [[{"node": "Google Vertex Chat Model", "type": "ai_outputParser", "index": 0}]]
}
```

### 🔍 So prüfst du es in n8n:

1. **"Structured Output Parser" Node finden** (sollte sichtbar sein im Workflow)
2. **Verbindung prüfen:**
   - Vom "Structured Output Parser" zum "Google Vertex Chat Model"
   - **Sollte eine GESTRICHELTE LINIE sein** (nicht durchgezogen!)
3. **Falls keine gestrichelte Linie sichtbar:**
   - Alte Verbindung löschen
   - Neue Verbindung ziehen: Von "Structured Output Parser" → "Google Vertex Chat Model"
   - Rechtsklick auf Verbindung → Verbindungstyp: `ai_outputParser` wählen

---

## 🔧 Was der Structured Output Parser macht:

**Einfach erklärt:**
- **Ohne Parser:** AI gibt Text zurück → "Oliver Krause, DSBOK, ..."
- **Mit Parser:** AI gibt direkt JSON zurück → `[{ "name": "Oliver Krause", ... }]`

**Das macht es robuster!** Kein manuelles Parsen nötig.

---

## 🚀 Jetzt Debug-Loop starten:

### Schritt 1: Terminal öffnen (NEU - nach Node.js Installation!)

1. **Terminal/PowerShell SCHLIESSEN**
2. **NEU öffnen** (wichtig - damit Node.js erkannt wird!)
3. **In Projektordner wechseln:**
   ```powershell
   cd C:\Users\Moritz\Desktop\kortex-projekt\kortex-website
   ```
4. **Prüfen ob Node.js funktioniert:**
   ```powershell
   node --version
   npm --version
   ```

### Schritt 2: Dependencies installieren

```powershell
npm install
```

### Schritt 3: Debug-Server starten (Terminal 1)

```powershell
node debug-server.js
```

**ODER:**
```powershell
npm run debug-server
```

**Server läuft dann auf:** `http://localhost:3000`

**NICHT SCHLIESSEN!** Terminal offen lassen.

### Schritt 4: Debug-Loop starten (Terminal 2 - NEUES TERMINAL!)

**Neues Terminal/PowerShell öffnen:**

```powershell
cd C:\Users\Moritz\Desktop\kortex-projekt\kortex-website
node debug-loop-cli.js
```

**ODER direkt Sample 1 testen:**
```powershell
node debug-loop-controller.js sample 1
```

---

## 🔍 Was der Debug-Loop macht:

1. **Triggert Workflow** (sendet Request an n8n Webhook)
2. **Wartet auf Debug-Daten** (von n8n Workflow)
3. **Analysiert Fehler** (Binary fehlt? AI Output fehlt? Routing falsch?)
4. **Wendet Fixes automatisch an** (aktualisiert Workflow-JSON)
5. **Wiederholt** bis keine Fehler mehr

---

## 📋 Website-Integration prüfen:

Die Website sendet Requests an:
```
https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
```

**Prüfe in n8n:**
1. **"Business Card Upload" Node** → Webhook aktiviert?
2. **URL:** `https://n8n2.kortex-system.de/webhook/business-card-extraction`
3. **Workflow oben rechts:** "Active" Toggle aktiviert?

---

## ✅ Checkliste vor Debug-Loop:

1. ✅ **Google Vertex Credentials gesetzt?**
   - "Google Vertex Chat Model" Node → Credentials

2. ✅ **Webhook aktiv?**
   - "Business Card Upload" Node → "Listen for Production" aktiviert
   - ODER: Workflow oben rechts → "Active"

3. ✅ **Structured Output Parser verbunden?**
   - Vom "Structured Output Parser" zum "Google Vertex Chat Model"
   - Gestrichelte Linie? (ai_outputParser)

4. ✅ **AI Agent Options:**
   - "Has Output Parser" aktiviert?
   - "Automatically Passthrough Binary Images" aktiviert?

5. ✅ **💾 Save Debug Data Node:**
   - Aktiv lassen (wenn Debug-Server läuft)
   - ODER deaktivieren (wenn Debug-Server nicht läuft)

---

## 🎯 Nächste Schritte:

1. **Terminal neu starten** → Node.js sollte dann funktionieren
2. **Debug-Server starten** (Terminal 1)
3. **Debug-Loop starten** (Terminal 2)
4. **Ergebnis prüfen** → Loop zeigt welche Fixes angewendet wurden

**Falls der Loop Fehler findet und behebt:**
- Workflow-JSON ist dann korrigiert (`n8n-business-card-workflow-vertex-DEBUG.json`)
- In n8n neu importieren oder manuell die Fixes anwenden

---

**Structured Output Parser ist bereits in der JSON korrekt verbunden! Du musst nur prüfen ob die Verbindung in n8n sichtbar ist (gestrichelte Linie).**

