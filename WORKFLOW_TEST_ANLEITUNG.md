# ✅ Workflow Test - Schritt für Schritt

## 🎯 Jetzt testen wir den Workflow!

Nachdem der Structured Output Parser korrekt konfiguriert ist, gibt es **3 Test-Möglichkeiten**:

---

## Option 1: Schnelltest in n8n (2 Minuten)

### Schritt 1: Workflow aktivieren

1. **In n8n:** Workflow-Editor öffnen
2. **Oben rechts:** "Active" Toggle aktivieren
3. **ODER:** "Business Card Upload" Node → "Listen for Production" aktivieren

### Schritt 2: Manual Trigger Test

1. **"Execute Workflow"** klicken (oben)
2. **"Manual Trigger (Test)" Node** öffnen
3. **Test-Daten hinzufügen:**
   ```json
   {
     "query": {
       "sample": "1"
     }
   }
   ```
4. **Execute** klicken
5. **Prüfe:** Workflow sollte durchlaufen ohne Fehler

### Schritt 3: Prüfe Output

1. **"Antwort an Website" Node** öffnen
2. **Output Tab** → **JSON** anschauen
3. **Sollte enthalten:**
   - `type: "business-card-processed"`
   - `payload` mit Name, Company, Email, etc.
   - `debugSummary` und `debugData` (wenn Debug aktiv)

**Falls Fehler:**
- Prüfe "AI Agent - Vertex AI" Node → Output
- Prüfe "Structured Output Parser" → JSON Schema
- Prüfe "Setze Sample-Info" → Binary-Daten vorhanden?

---

## Option 2: Webhook-Test (3 Minuten)

### Schritt 1: Workflow aktivieren

1. **Workflow oben rechts:** "Active" Toggle aktivieren ✅

### Schritt 2: Webhook im Browser testen

1. **Browser öffnen:**
   ```
   https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
   ```
2. **Prüfe:** Sollte JSON-Response zurückgeben
3. **Falls Fehler:** Prüfe Execution Logs in n8n

### Schritt 3: Alle Samples testen

- Sample 1: `?sample=1`
- Sample 2: `?sample=2`
- Sample 3: `?sample=3`

**Alle sollten funktionieren!**

---

## Option 3: Debug-Loop Test (5 Minuten)

### Schritt 1: Terminal öffnen (NEU!)

1. **Terminal/PowerShell SCHLIESSEN**
2. **NEU öffnen** (wichtig - damit Node.js erkannt wird!)
3. **In Projektordner:**
   ```powershell
   cd C:\Users\Moritz\Desktop\kortex-projekt\kortex-website
   ```
4. **Prüfe Node.js:**
   ```powershell
   node --version
   npm --version
   ```

### Schritt 2: Dependencies installieren

```powershell
npm install
```

**Sollte installieren:** express, cors, axios

### Schritt 3: Debug-Server starten (Terminal 1)

```powershell
node debug-server.js
```

**ODER:**
```powershell
npm run debug-server
```

**Erwartetes Output:**
```
🚀 Debug-Server läuft auf http://localhost:3000
📊 Endpoints:
   GET  http://localhost:3000/debug/workflow.json
   POST http://localhost:3000/debug/save
   GET  http://localhost:3000/debug/status
```

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

**Der Loop:**
1. Triggert Workflow automatisch
2. Lädt Debug-Daten
3. Analysiert Fehler
4. Wendet Fixes an (falls nötig)
5. Wiederholt bis keine Fehler mehr

---

## Option 4: Website-Test (5 Minuten)

### Schritt 1: Workflow aktivieren

1. **In n8n:** Workflow oben rechts auf "Active" stellen ✅

### Schritt 2: Website öffnen

```
https://karusocaminar.github.io/kortex-website/
```

### Schritt 3: Visitenkarten-Extraktion testen

1. **"Visitenkarten-Extraktion" Button** klicken
2. **Sample 1, 2 oder 3** klicken
3. **Prüfe:**
   - Modal öffnet sich
   - Loading-Indicator erscheint
   - Nach einigen Sekunden: Daten erscheinen in Tabelle
   - Modal schließt automatisch (nach 1.5 Sekunden)

### Schritt 4: Upload testen

1. **"Eigene Visitenkarte hochladen"** klicken
2. **Bild auswählen** (JPG/PNG)
3. **Prüfe:** Daten erscheinen in Tabelle

---

## ❌ Häufige Fehler & Lösungen

### Fehler: "Credentials missing"

**Problem:** Google Vertex Credentials nicht gesetzt

**Lösung:**
1. "Google Vertex Chat Model" Node öffnen
2. Credentials wählen oder neu erstellen
3. Project ID prüfen: `koretex-zugang`

### Fehler: "Binary-Daten fehlen"

**Problem:** "Setze Sample-Info" Node bekommt keine Binary-Daten

**Lösung:**
1. "Lade Sample 1/2/3" Nodes prüfen → Binary-Daten vorhanden?
2. "Setze Sample-Info" Node → Code prüfen
3. Debug-Loop laufen lassen → Auto-Fix

### Fehler: "AI Agent gibt keine Daten zurück"

**Problem:** Structured Output Parser nicht korrekt konfiguriert

**Lösung:**
1. AI Agent Node → Options → "Has Output Parser" aktiviert? ✅
2. Structured Output Parser → SUB-NODE vorhanden?
3. JSON Schema Example prüfen

### Fehler: "Webhook not active"

**Problem:** Workflow nicht aktiviert

**Lösung:**
1. Workflow oben rechts → "Active" Toggle aktivieren ✅
2. ODER: "Business Card Upload" Node → "Listen for Production" aktivieren

---

## ✅ Erfolgreich wenn:

1. ✅ **Manual Trigger** → Workflow läuft durch ohne Fehler
2. ✅ **Webhook** → Gibt JSON-Response zurück
3. ✅ **Website** → Daten erscheinen in Tabelle
4. ✅ **Debug-Loop** → Keine Fehler gefunden

---

## 🎯 Empfohlene Reihenfolge:

1. **Option 1** (Schnelltest in n8n) → Schnellste Methode
2. **Option 2** (Webhook-Test) → Prüft externe Verbindung
3. **Option 4** (Website-Test) → Prüft komplette Integration
4. **Option 3** (Debug-Loop) → Nur wenn Probleme auftreten

---

## 🚀 Los geht's!

**Starte mit Option 1** (Schnelltest in n8n) - das geht am schnellsten!

Falls Probleme auftreten → Debug-Loop (Option 3) oder melde dich mit den Fehlermeldungen!

