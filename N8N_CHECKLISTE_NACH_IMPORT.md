# ✅ n8n Checkliste nach Workflow-Import

## 🎯 Schnellcheck (5 Minuten)

Nach dem Import der `n8n-business-card-workflow-vertex-DEBUG.json` musst du folgendes prüfen/konfigurieren:

---

## 1. ✅ Google Vertex AI Credentials

**Node:** "Google Vertex Chat Model"

1. **Node öffnen** (klicken auf "Google Vertex Chat Model")
2. **Credentials Tab prüfen:**
   - Sollte bereits gesetzt sein: `Google Service Account Moritz`
   - **Falls nicht:** 
     - "Create New Credential" klicken
     - Google Service Account Credentials eingeben
     - Project ID: `koretex-zugang`

✅ **Status:** Muss gesetzt sein, sonst schlägt AI Agent fehl!

---

## 2. ✅ Webhook aktivieren

**Node:** "Business Card Upload"

1. **Node öffnen** (klicken auf "Business Card Upload")
2. **Prüfe:**
   - Webhook URL sollte sein: `https://n8n2.kortex-system.de/webhook/business-card-extraction`
   - **"Listen for Production" aktivieren** (Toggle oben rechts am Node)
   - **ODER:** Workflow oben rechts auf "Active" stellen

✅ **Status:** Webhook muss aktiv sein, sonst funktioniert Website-Integration nicht!

---

## 3. ⚠️ 💾 Save Debug Data Node (Optional)

**Node:** "💾 Save Debug Data"

**WICHTIG:** Dieser Node sendet Debug-Daten an `http://localhost:3000/debug/save`

**Option A: Debug-Server läuft** → Node aktiv lassen
- Debug-Daten werden automatisch gespeichert
- Debug-Loop kann laufen

**Option B: Debug-Server läuft NICHT** → Node deaktivieren oder Error-Handling aktivieren
- Node kann deaktiviert werden (Toggle rechts oben am Node)
- **ODER:** Node bleibt aktiv, aber schlägt fehl wenn Server nicht läuft
  - Workflow läuft trotzdem weiter (Error wird ignoriert)

✅ **Status:** Optional! Nur wichtig wenn Debug-Loop genutzt werden soll.

---

## 4. ✅ Structured Output Parser Verbindung

**Node:** "Structured Output Parser"

1. **Node öffnen** (klicken auf "Structured Output Parser")
2. **Prüfe Verbindung:**
   - Sollte verbunden sein mit "Google Vertex Chat Model"
   - Verbindungstyp: `ai_outputParser` (gestrichelte Linie!)
   - **NICHT** die normale `main` Verbindung!

✅ **Status:** Muss verbunden sein, sonst gibt AI Agent keine strukturierten Daten zurück!

---

## 5. ✅ AI Agent Options

**Node:** "AI Agent - Vertex AI"

1. **Node öffnen** (klicken auf "AI Agent - Vertex AI")
2. **Options Tab öffnen** (falls sichtbar)
3. **Prüfe:**
   - ✅ **"Has Output Parser"** sollte aktiviert sein
   - ✅ **"Automatically Passthrough Binary Images"** sollte aktiviert sein

✅ **Status:** Sollte bereits in JSON gesetzt sein, aber prüfen!

---

## 6. ✅ Workflow aktivieren

**Oben rechts im Workflow-Editor:**

1. **Toggle "Active" aktivieren** (Workflow soll laufen)
2. **ODER:** Jeder Node mit Webhook einzeln aktivieren

✅ **Status:** Workflow muss aktiv sein, sonst funktioniert Website-Integration nicht!

---

## 7. 🧪 Schnelltest

### Test 1: Manual Trigger (in n8n)

1. **"Execute Workflow"** klicken (oben)
2. **"Manual Trigger (Test)" Node öffnen**
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

### Test 2: Webhook (von Website)

1. **Workflow aktivieren** (wenn noch nicht)
2. **Browser öffnen:**
   ```
   https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
   ```
3. **Prüfe:** Sollte JSON-Response zurückgeben

### Test 3: Website-Integration

1. **Website öffnen:**
   ```
   https://karusocaminar.github.io/kortex-website/
   ```
2. **"Visitenkarten-Extraktion" klicken**
3. **Sample 1/2/3 klicken**
4. **Prüfe:** Daten sollten in Tabelle erscheinen

---

## ❌ Häufige Fehler

### Fehler: "Credentials missing"

- **Problem:** Google Vertex Credentials nicht gesetzt
- **Lösung:** Siehe Schritt 1

### Fehler: "Webhook not active"

- **Problem:** Webhook Node nicht aktiviert
- **Lösung:** Webhook Node aktivieren (Toggle) + Workflow aktivieren

### Fehler: "No item to return was found"

- **Problem:** Binary-Daten fehlen in "Setze Sample-Info"
- **Lösung:** Debug-Daten prüfen oder Debug-Loop laufen lassen

### Fehler: "AI Agent gibt keine Daten zurück"

- **Problem:** Structured Output Parser nicht verbunden oder Options nicht gesetzt
- **Lösung:** Siehe Schritt 4 und 5

---

## 🎯 Nächste Schritte

### Option A: Mit Debug-Loop (automatisch)

1. Node.js installieren (falls noch nicht)
2. Terminal öffnen → `npm install`
3. Debug-Server starten: `node debug-server.js`
4. Debug-Loop starten: `node debug-loop-cli.js`
5. Loop behebt Fehler automatisch

### Option B: Ohne Debug-Loop (manuell)

1. Workflow in n8n ausführen
2. Execution Logs prüfen
3. Fehler manuell beheben
4. Website testen

---

**Alles sollte jetzt funktionieren! 🎉**

