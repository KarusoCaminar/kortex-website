# ✅ Verbindungen anpassen - Schritt für Schritt

## ✅ Was du bereits hast

- ✅ "Route to Sample" Code Node (erstellt)
- ✅ "Route to Sample Nodes" Switch Node (erstellt)
- ⚠️ Alte IF Nodes sind noch da (müssen entfernt/ersetzt werden)

---

## 📋 Schritt 1: Alte Verbindungen LÖSCHEN

### Alte Verbindungen entfernen:

1. **"Business Card Upload" → "Ist Sample?"** → LÖSCHEN
   - Rechtsklick auf die Verbindungslinie → Delete
   - ODER: Klicke auf die Verbindungslinie → Drücke Delete-Taste

2. **"Ist Sample?" → "Sample 1?"** → LÖSCHEN

3. **"Sample 1?" → "Lade Sample 1"** → LÖSCHEN

4. **"Sample 1?" → "Sample 2?"** → LÖSCHEN

5. **"Sample 2?" → "Lade Sample 2"** → LÖSCHEN

6. **"Sample 2?" → "Sample 3?"** → LÖSCHEN

7. **"Sample 3?" → "Lade Sample 3"** → LÖSCHEN

8. **"Ist Sample?" → "Setze Sample-Info"** → LÖSCHEN

---

## 📋 Schritt 2: Neue Verbindungen ERSTELLEN

### Neue Verbindungen hinzufügen:

1. **"Business Card Upload" → "Route to Sample"**
   - Klicke auf "Business Card Upload" Node
   - Ziehe vom **Output-Punkt** (rechts) zum **Input-Punkt** (links) von "Route to Sample"

2. **"Route to Sample" → "Route to Sample Nodes"**
   - Ziehe vom Output von "Route to Sample" zum Input von "Route to Sample Nodes"

3. **"Route to Sample Nodes" → "Lade Sample 1"**
   - Klicke auf "Route to Sample Nodes" Switch Node
   - **WICHTIG:** Ziehe vom **Output `sample-1`** (nicht vom Default Output!) zum Input von "Lade Sample 1"
   - Der Switch Node sollte mehrere Outputs haben - wähle den richtigen!

4. **"Route to Sample Nodes" → "Lade Sample 2"**
   - Ziehe vom **Output `sample-2`** zum Input von "Lade Sample 2"

5. **"Route to Sample Nodes" → "Lade Sample 3"**
   - Ziehe vom **Output `sample-3`** zum Input von "Lade Sample 3"

6. **"Route to Sample Nodes" → "Setze Sample-Info"**
   - Ziehe vom **Default Output** (oder Output `upload`) zum Input von "Setze Sample-Info"

7. **"Lade Sample 1" → "Setze Sample-Info"** → Bleibt bestehen ✅

8. **"Lade Sample 2" → "Setze Sample-Info"** → Bleibt bestehen ✅

9. **"Lade Sample 3" → "Setze Sample-Info"** → Bleibt bestehen ✅

---

## 📋 Schritt 3: Switch Node Routing Rules konfigurieren

### Switch Node Routing Rules hinzufügen:

1. **"Route to Sample Nodes" Node öffnen**
2. **Parameters Tab öffnen**
3. **Routing Rules hinzufügen:**

### Rule 1: Sample 1
- **Add Routing Rule** klicken
- **Value:** Klicke auf Feld → **FX-Symbol aktivieren** (blau!) → `$json.route`
- **Sollte zeigen:** `={{$json.route}}`
- **Operation:** `equals` (oder "is equal to")
- **Output Name:** `sample-1`

### Rule 2: Sample 2
- **Add Routing Rule** klicken
- **Value:** FX aktivieren → `$json.route`
- **Operation:** `equals`
- **Output Name:** `sample-2`

### Rule 3: Sample 3
- **Add Routing Rule** klicken
- **Value:** FX aktivieren → `$json.route`
- **Operation:** `equals`
- **Output Name:** `sample-3`

### Default Output:
- **Output Name:** `upload` (oder "default")

4. **Speichern**

---

## 📋 Schritt 4: Code Node Code prüfen

1. **"Route to Sample" Node öffnen**
2. **Parameters Tab → Code:**
3. **Stelle sicher, dass dieser Code drin ist:**

```javascript
// Route to Sample - GARANTIERT FUNKTIONIERT!
const sample = String($json.query?.sample || '').trim();

console.log('🔍 [Route to Sample] Sample Parameter:', sample);
console.log('📋 Raw query:', $json.query);

// Konvertiere zu String (sicher)
const sampleStr = String(sample).trim();

// Route basierend auf Sample
let route = 'upload'; // Default: Upload
let loadSampleNode = null;

if (sampleStr === '1') {
    route = 'sample-1';
    loadSampleNode = 'Lade Sample 1';
    console.log('✅ Route: Sample 1');
} else if (sampleStr === '2') {
    route = 'sample-2';
    loadSampleNode = 'Lade Sample 2';
    console.log('✅ Route: Sample 2');
} else if (sampleStr === '3') {
    route = 'sample-3';
    loadSampleNode = 'Lade Sample 3';
    console.log('✅ Route: Sample 3');
} else {
    route = 'upload';
    console.log('✅ Route: Upload (kein Sample)');
}

return [{
    json: {
        ...$json,
        route: route,
        loadSampleNode: loadSampleNode,
        sample: sampleStr
    }
}];
```

4. **Speichern**

---

## 📋 Schritt 5: IF Nodes entfernen (optional)

**Die IF Nodes werden jetzt nicht mehr gebraucht:**

1. **"Ist Sample?" Node** → Rechtsklick → Delete Node
2. **"Sample 1?" Node** → Rechtsklick → Delete Node
3. **"Sample 2?" Node** → Rechtsklick → Delete Node
4. **"Sample 3?" Node** → Rechtsklick → Delete Node

**ODER:** Lasse sie drin (sie stören nicht, werden nur nicht verwendet).

---

## ✅ Neue Workflow-Struktur

```
Business Card Upload
    ↓
Route to Sample (Code Node) ← ERSTELLT ✅
    ↓
Route to Sample Nodes (Switch Node) ← ERSTELLT ✅
    ├─ sample-1 → Lade Sample 1 → Setze Sample-Info
    ├─ sample-2 → Lade Sample 2 → Setze Sample-Info
    ├─ sample-3 → Lade Sample 3 → Setze Sample-Info
    └─ upload → Setze Sample-Info → AI Agent
```

---

## 🧪 Test

1. **Workflow speichern**
2. **Workflow aktivieren** (Toggle oben rechts)
3. **Execute Workflow** (oben rechts klicken)
4. **Test mit sample=1:**
   - Im Webhook Test: `?sample=1` hinzufügen
   - Oder auf der Website "Sample 1" klicken
5. **Prüfe in n8n Executions:**
   - "Route to Sample" Code Node Output: `route: "sample-1"` ✅
   - "Route to Sample Nodes" Switch Node: Geht zu `sample-1` Output ✅
   - "Lade Sample 1" Node: Wird ausgeführt ✅
   - "Setze Sample-Info" Node: Wird ausgeführt ✅

---

## 🔍 Falls es nicht funktioniert

**Prüfe:**

1. **Code Node Output:**
   - Was steht in `route`? (`sample-1`, `sample-2`, `sample-3`, oder `upload`?)
   - Was steht in `sample`? (sollte `"1"`, `"2"`, `"3"` oder `""` sein)

2. **Switch Node:**
   - Welche Routing Rules sind vorhanden?
   - Sind die Output-Namen korrekt? (`sample-1`, `sample-2`, `sample-3`, `upload`)
   - Ist Value 1 als Expression eingegeben? (`={{$json.route}}`)

3. **Verbindungen:**
   - Geht "Route to Sample Nodes" Output `sample-1` zu "Lade Sample 1"?
   - Geht "Route to Sample Nodes" Output `upload` zu "Setze Sample-Info"?

---

**Das sollte funktionieren!**

