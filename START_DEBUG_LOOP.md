# 🚀 Debug-Loop System starten - Schritt für Schritt

## ⚠️ WICHTIG: Node.js muss installiert sein!

Falls Node.js nicht installiert ist:

1. **Node.js herunterladen:**
   - Gehe zu: https://nodejs.org/
   - Download "LTS Version" (empfohlen)
   - Installieren

2. **Terminal NEU STARTEN** (wichtig!)
   - Aktuelles Terminal schließen
   - Neues Terminal/PowerShell öffnen
   - In Projektordner wechseln:
     ```powershell
     cd C:\Users\Moritz\Desktop\kortex-projekt\kortex-website
     ```

3. **Prüfen ob Node.js funktioniert:**
   ```powershell
   node --version
   npm --version
   ```
   
   Sollte beide Versionen anzeigen (z.B. `v20.10.0` und `10.2.3`)

---

## 🎯 Schnellstart (3 Terminal-Fenster)

### Terminal 1: Debug-Server starten

```powershell
cd C:\Users\Moritz\Desktop\kortex-projekt\kortex-website
npm install
npm run debug-server
```

**ODER falls npm nicht funktioniert:**
```powershell
node debug-server.js
```

**Erwartetes Output:**
```
🚀 Debug-Server läuft auf http://localhost:3000
📊 Endpoints:
   GET  http://localhost:3000/debug/workflow.json
   POST http://localhost:3000/debug/save
   GET  http://localhost:3000/debug/status
```

**Server muss laufen bleiben!** (Nicht schließen!)

---

### Terminal 2: Debug-Loop starten

**NEUES Terminal öffnen!**

```powershell
cd C:\Users\Moritz\Desktop\kortex-projekt\kortex-website
node debug-loop-cli.js
```

**ODER direkt Sample 1 testen:**
```powershell
node debug-loop-controller.js sample 1
```

**Erwartetes Output:**
```
🚀 Debug-Loop Controller gestartet
📋 Test-Daten: { sample: '1' }
🔍 Prüfe Debug-Server...
✅ Debug-Server erreichbar
🧪 Trigger Workflow...
...
```

---

## 📋 Was passiert im Detail?

1. **Debug-Server startet** (Terminal 1)
   - Läuft auf `http://localhost:3000`
   - Empfängt Debug-Daten von n8n

2. **Debug-Loop startet** (Terminal 2)
   - Prüft ob Server läuft
   - Sendet Request an n8n Webhook (`https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1`)
   - Wartet auf Debug-Daten

3. **N8n Workflow läuft**
   - Verarbeitet Sample 1
   - Generiert Debug-Daten
   - Sendet Debug-Daten an `http://localhost:3000/debug/save` (💾 Save Debug Data Node)

4. **Debug-Loop analysiert**
   - Lädt Debug-Daten von `http://localhost:3000/debug/workflow.json`
   - Analysiert Fehler:
     - Binary-Daten fehlen?
     - AI Agent Output fehlt?
     - Routing-Fehler?

5. **Auto-Fixes werden angewendet**
   - Wenn Fehler gefunden → Fixes automatisch in `n8n-business-card-workflow-vertex-DEBUG.json`
   - Backup wird erstellt (`*.backup.{timestamp}.json`)

6. **Loop wiederholt** (bis keine Fehler mehr oder max 5 Iterationen)

---

## ✅ Nach erfolgreichem Debug-Loop

### 1. Workflow in n8n neu importieren

1. **In n8n:** Workflows → Import from File
2. **Datei:** `n8n-business-card-workflow-vertex-DEBUG.json`
3. **Credentials setzen:**
   - Google Vertex Chat Model: Credentials setzen
4. **💾 Save Debug Data Node:**
   - Aktiv lassen (wenn Debug-Server läuft)
   - ODER deaktivieren (wenn Debug-Server nicht läuft)
5. **Workflow aktivieren**

### 2. Website testen

1. **Öffne:** `https://karusocaminar.github.io/kortex-website/`
2. **Klicke:** "Visitenkarten-Extraktion"
3. **Klicke:** Sample 1, 2 oder 3
4. **Prüfe:** Ob Daten korrekt in Tabelle erscheinen

---

## 🔧 Troubleshooting

### "npm is not recognized"

- **Problem:** Node.js nicht installiert oder nicht im PATH
- **Lösung:** 
  1. Node.js von https://nodejs.org/ installieren
  2. Terminal NEU starten
  3. `npm --version` prüfen

### "node is not recognized"

- **Problem:** Node.js nicht im PATH
- **Lösung:**
  1. Node.js neu installieren
  2. Bei Installation: "Add to PATH" aktivieren
  3. Terminal NEU starten

### Port 3000 bereits belegt

- **Problem:** Andere Anwendung nutzt Port 3000
- **Lösung:**
  1. Andere Anwendung beenden
  2. ODER Port ändern in `debug-server.js` (Zeile 10)

### Debug-Server läuft nicht

- **Problem:** Dependencies nicht installiert
- **Lösung:** `npm install` ausführen

### Debug-Daten werden nicht gespeichert

- **Problem:** 💾 Save Debug Data Node schlägt fehl (Server nicht erreichbar)
- **Lösung:**
  1. Prüfe ob Debug-Server läuft
  2. Prüfe Firewall-Einstellungen
  3. Node kann auch deaktiviert werden → Debug-Daten kommen dann nur via Response

### Workflow-Trigger schlägt fehl

- **Problem:** n8n Webhook nicht erreichbar oder Workflow nicht aktiv
- **Lösung:**
  1. Prüfe ob Workflow in n8n aktiv ist
  2. Prüfe Webhook-URL: `https://n8n2.kortex-system.de/webhook/business-card-extraction`
  3. Prüfe in n8n: Workflows → Aktiv?

---

## 🎯 Alternative: Ohne Debug-Loop (manuell)

### Schritt 1: Debug-Server starten

```powershell
node debug-server.js
```

### Schritt 2: Workflow manuell in n8n ausführen

1. In n8n: Workflow öffnen
2. "Execute Workflow" klicken
3. Sample 1/2/3 oder Upload wählen
4. Warten bis Workflow durchgelaufen ist

### Schritt 3: Debug-Daten analysieren

```powershell
node workflow-debug-analyzer.js
```

**Zeigt:**
- Welche Fehler gefunden wurden
- Welche Fixes vorgeschlagen werden
- Status-Übersicht

---

## 📞 Support

Falls Probleme auftreten:
1. Prüfe ob Debug-Server läuft (`http://localhost:3000/debug/status`)
2. Prüfe n8n Execution Logs
3. Prüfe Terminal Output (Fehlermeldungen)

