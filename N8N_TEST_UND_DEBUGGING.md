# ✅ Test & Debugging Guide - Code Node Lösung

## 🧪 Schritt-für-Schritt Test

### Test 1: Sample 1 (sollte funktionieren)

1. **Workflow aktivieren**
2. **Execute Workflow** klicken (oben rechts)
3. **Webhook Test:**
   - Test URL kopieren: `https://n8n2.kortex-system.de/webhook-test/business-card-extraction`
   - Im Browser öffnen mit: `?sample=1`
   - ODER: Auf Website "Sample 1" klicken

4. **In n8n Executions Tab prüfen:**
   - Klicke auf die letzte Execution
   - **"Business Card Upload" Node:**
     - Output Tab → `query.sample` sollte `"1"` sein ✅
   - **"Route to Sample" Code Node:**
     - Output Tab → `route` sollte `"sample-1"` sein ✅
     - `sample` sollte `"1"` sein ✅
   - **"Route to Sample Nodes" Switch Node:**
     - Welcher Output wurde genommen?
     - Sollte zu `sample-1` Output gehen ✅
   - **"Lade Sample 1" Node:**
     - Wird ausgeführt? ✅
   - **"Setze Sample-Info" Node:**
     - Output Tab → `source` sollte `"Sample 1"` sein ✅
     - Binary-Daten vorhanden? ✅
   - **"AI Agent - Vertex AI" Node:**
     - Wird ausgeführt? ✅

---

### Test 2: Upload (ohne sample Parameter)

1. **Workflow aktivieren**
2. **Execute Workflow** klicken
3. **Webhook Test:**
   - POST Request senden (Binary-Datei anhängen)
   - **KEIN** `?sample=1` Parameter!

4. **In n8n Executions Tab prüfen:**
   - **"Business Card Upload" Node:**
     - Output Tab → `query.sample` sollte leer sein oder `undefined` ✅
     - Binary-Daten (`file`) vorhanden? ✅
   - **"Route to Sample" Code Node:**
     - Output Tab → `route` sollte `"upload"` sein ✅
     - `sample` sollte `""` sein ✅
   - **"Route to Sample Nodes" Switch Node:**
     - Welcher Output wurde genommen?
     - Sollte zu **Extra Output** (oder `upload` Output) gehen ✅
   - **"Setze Sample-Info" Node:**
     - Output Tab → `source` sollte `"Upload"` sein ✅
     - Binary-Daten vorhanden? ✅
   - **"AI Agent - Vertex AI" Node:**
     - Wird ausgeführt? ✅

---

## 🔍 Debugging - Falls es nicht funktioniert

### Problem 1: Code Node gibt falschen `route` Wert

**Symptom:**
- "Route to Sample" Code Node Output zeigt `route: undefined` oder falschen Wert

**Lösung:**
1. **Code Node öffnen**
2. **Code prüfen:** Sollte sein:
   ```javascript
   const sample = String($json.query?.sample || '').trim();
   const sampleStr = String(sample).trim();
   
   if (sampleStr === '1') {
       route = 'sample-1';
   }
   ```

3. **Input prüfen:**
   - Was steht in `$json.query.sample`?
   - Execute Workflow → Code Node Input Tab prüfen

**Debug-Code hinzufügen:**
```javascript
console.log('🔍 [DEBUG] Raw query:', $json.query);
console.log('🔍 [DEBUG] Sample parameter:', $json.query?.sample);
console.log('🔍 [DEBUG] Sample type:', typeof $json.query?.sample);
console.log('🔍 [DEBUG] SampleStr:', sampleStr);
console.log('🔍 [DEBUG] Route:', route);
```

---

### Problem 2: Switch Node geht zu falschem Output

**Symptom:**
- "Route to Sample Nodes" Switch Node geht nicht zu erwartetem Output

**Lösung:**
1. **Switch Node öffnen**
2. **Routing Rules prüfen:**
   - Rule 1: `$json.route` equals `sample-1` → Output: `sample-1` ✅
   - Rule 2: `$json.route` equals `sample-2` → Output: `sample-2` ✅
   - Rule 3: `$json.route` equals `sample-3` → Output: `sample-3` ✅
   - Fallback Output: `Extra Output` (nicht "None") ✅

3. **Input prüfen:**
   - Execute Workflow → Switch Node Input Tab
   - Was steht in `$json.route`?
   - Sollte `"sample-1"`, `"sample-2"`, `"sample-3"`, oder `"upload"` sein

4. **Value 1 Expression prüfen:**
   - Ist FX-Symbol aktiviert? ✅
   - Zeigt es `={{$json.route}}`? ✅

---

### Problem 3: Binary-Daten fehlen in "Setze Sample-Info"

**Symptom:**
- "Setze Sample-Info" Node gibt `[]` zurück (leeres Array)
- Fehler: "Binary-Daten fehlen"

**Lösung:**
1. **"Setze Sample-Info" Code Node öffnen**
2. **Code prüfen:** Sollte sein:
   ```javascript
   // 1. $binary vom aktuellen Item
   if ($binary && typeof $binary === 'object') {
       const keys = Object.keys($binary);
       if (keys.length > 0) {
           binaryData = $binary;
       }
   }
   
   // 2. Sample: Binary von "Lade Sample X" Node
   if (!binaryData && sample) {
       const nodeName = sample === '1' ? 'Lade Sample 1' : ...
       const node = $(nodeName);
       if (node?.binary) binaryData = node.binary;
   }
   
   // 3. Upload: Binary vom Webhook
   if (!binaryData && !sample) {
       const webhook = $('Business Card Upload');
       if (webhook?.binary) binaryData = webhook.binary;
   }
   ```

3. **Input prüfen:**
   - Execute Workflow → "Setze Sample-Info" Input Tab
   - Sind Binary-Daten vorhanden? (`$binary`)
   - Was steht in `query.sample`?

4. **Vorherige Node prüfen:**
   - **Für Samples:** "Lade Sample X" Node → Output Tab → Binary vorhanden?
   - **Für Upload:** "Business Card Upload" Node → Output Tab → Binary vorhanden?

---

### Problem 4: AI Agent Node bekommt keine Binary-Daten

**Symptom:**
- "AI Agent - Vertex AI" Node schlägt fehl
- Fehler: "No binary data" oder ähnlich

**Lösung:**
1. **"Setze Sample-Info" Node Output prüfen:**
   - Execute Workflow → "Setze Sample-Info" Output Tab
   - Sind Binary-Daten vorhanden? (`binary` Property)

2. **AI Agent Node Konfiguration prüfen:**
   - "AI Agent - Vertex AI" Node öffnen
   - Options Tab → "Automatically Passthrough Binary Images" sollte **aktiviert** sein ✅

3. **Verbindung prüfen:**
   - Geht "Setze Sample-Info" Output zu "AI Agent" Input?

---

## ✅ Checkliste - Alles korrekt?

### Code Node "Route to Sample":
- ✅ Mode: `Run Once for Each Item`
- ✅ Language: `JavaScript`
- ✅ Code: Korrekt (siehe `N8N_CODE_NODE_LÖSUNG_ANLEITUNG.md`)

### Switch Node "Route to Sample Nodes":
- ✅ Mode: `Rules`
- ✅ Rule 1: `$json.route` equals `sample-1` → Output: `sample-1`
- ✅ Rule 2: `$json.route` equals `sample-2` → Output: `sample-2`
- ✅ Rule 3: `$json.route` equals `sample-3` → Output: `sample-3`
- ✅ Fallback Output: `Extra Output` (nicht "None")
- ✅ Value 1: `={{$json.route}}` (FX aktiviert)

### Verbindungen:
- ✅ "Business Card Upload" → "Route to Sample"
- ✅ "Route to Sample" → "Route to Sample Nodes"
- ✅ "Route to Sample Nodes" Output `sample-1` → "Lade Sample 1"
- ✅ "Route to Sample Nodes" Output `sample-2` → "Lade Sample 2"
- ✅ "Route to Sample Nodes" Output `sample-3` → "Lade Sample 3"
- ✅ "Route to Sample Nodes" Extra Output → "Setze Sample-Info"
- ✅ "Lade Sample 1/2/3" → "Setze Sample-Info"
- ✅ "Setze Sample-Info" → "AI Agent - Vertex AI"

### Code Node "Setze Sample-Info":
- ✅ Mode: `Run Once for Each Item`
- ✅ Code: Korrekt (siehe oben)

---

## 🆘 Falls es immer noch nicht funktioniert

**Schicke mir:**
1. Screenshot vom "Route to Sample" Code Node Output (aus Execution)
2. Screenshot vom "Route to Sample Nodes" Switch Node Input (aus Execution)
3. Screenshot vom "Setze Sample-Info" Code Node Output (aus Execution)
4. Fehlermeldung (falls vorhanden)

**ODER:**
1. Exportiere die Logs aus der Execution
2. Schicke mir die Execution ID

---

**Test es jetzt! Ich bin gespannt ob es funktioniert! 🚀**

