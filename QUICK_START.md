# 🚀 Quick Start - Debug-Loop System starten

## Voraussetzungen

Node.js muss installiert sein. Falls nicht installiert:
- Download: https://nodejs.org/
- Installieren und Terminal neu starten

## Schnellstart (3 Schritte)

### Schritt 1: Dependencies installieren

```bash
npm install
```

### Schritt 2: Debug-Server starten (Terminal 1)

```bash
npm run debug-server
```

**ODER:**
```bash
node debug-server.js
```

Server läuft dann auf: `http://localhost:3000`

### Schritt 3: Debug-Loop starten (Terminal 2 - NEUES Terminal!)

```bash
node debug-loop-cli.js
```

**ODER direkt:**
```bash
node debug-loop-controller.js sample 1
```

---

## Was passiert dann?

1. Debug-Server läuft auf Port 3000
2. Loop triggert den n8n Workflow automatisch
3. Debug-Daten werden gespeichert
4. Cursor-KI analysiert automatisch
5. Fixes werden automatisch angewendet
6. Loop wiederholt bis keine Fehler mehr

---

## Alternative: Manuell testen

### Nur Server starten:

```bash
node debug-server.js
```

### Nur Workflow triggern (ohne Loop):

```bash
node test-workflow.js sample 1
```

### Nur Debug-Daten analysieren:

```bash
node workflow-debug-analyzer.js
```

---

## Troubleshooting

### "npm is not recognized"

- Node.js nicht installiert → Installieren von https://nodejs.org/
- Terminal neu starten nach Installation

### "node is not recognized"

- Node.js nicht im PATH → Vollständigen Pfad verwenden
- Oder: Node.js neu installieren

### Port 3000 bereits belegt

- Anderen Port verwenden → In `debug-server.js` ändern (Zeile 10)
- Oder: Andere Anwendung beenden die Port 3000 nutzt

### Debug-Server läuft nicht

- Prüfe ob Dependencies installiert sind: `npm install`
- Prüfe ob Port frei ist
- Prüfe Firewall-Einstellungen

---

## Nächste Schritte nach erfolgreichem Debug-Loop

1. **Workflow in n8n neu importieren:**
   - `n8n-business-card-workflow-vertex-DEBUG.json` öffnen
   - In n8n: Workflows → Import from File
   - Google Vertex Credentials setzen
   - Workflow aktivieren

2. **Website testen:**
   - `https://karusocaminar.github.io/kortex-website/` öffnen
   - Visitenkarten-Extraktion testen
   - Prüfe ob Daten korrekt ankommen

3. **Fertig!** 🎉

