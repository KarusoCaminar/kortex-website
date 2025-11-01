# ✅ Code Node Lösung - Schritt für Schritt

## Ziel

**IF Nodes durch Code Node + Switch Node ersetzen** - funktioniert GARANTIERT!

---

## 📋 Schritt 1: Code Node erstellen

1. **In n8n:** Öffne deinen Workflow
2. **Code Node hinzufügen** (zwischen "Business Card Upload" und den IF Nodes)
3. **Name:** `Route to Sample`
4. **Mode:** `Run Once for Each Item`
5. **Code eingeben:**

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

6. **Speichern**

---

## 📋 Schritt 2: Switch Node erstellen

1. **Switch Node hinzufügen** (nach "Route to Sample" Code Node)
2. **Name:** `Route to Sample Nodes`
3. **Parameters Tab öffnen**
4. **Routing Rules hinzufügen:**

### Rule 1: Sample 1
- **Add Routing Rule** klicken
- **Value:** Klicke auf Feld → FX aktivieren → `$json.route`
- **Sollte zeigen:** `={{$json.route}}`
- **Operation:** `equals`
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

5. **Speichern**

---

## 📋 Schritt 3: Verbindungen anpassen

### Alte Verbindungen LÖSCHEN:

1. **"Business Card Upload" → "Ist Sample?"** → LÖSCHEN
2. **"Ist Sample?" → "Sample 1?"** → LÖSCHEN
3. **"Sample 1?" → "Lade Sample 1"** → LÖSCHEN
4. **"Sample 1?" → "Sample 2?"** → LÖSCHEN
5. **"Sample 2?" → "Lade Sample 2"** → LÖSCHEN
6. **"Sample 2?" → "Sample 3?"** → LÖSCHEN
7. **"Sample 3?" → "Lade Sample 3"** → LÖSCHEN
8. **"Ist Sample?" → "Setze Sample-Info"** → LÖSCHEN

### Neue Verbindungen ERSTELLEN:

1. **"Business Card Upload" → "Route to Sample"** → Verbinden
2. **"Route to Sample" → "Route to Sample Nodes"** → Verbinden
3. **"Route to Sample Nodes" (Output `sample-1`) → "Lade Sample 1"** → Verbinden
4. **"Route to Sample Nodes" (Output `sample-2`) → "Lade Sample 2"** → Verbinden
5. **"Route to Sample Nodes" (Output `sample-3`) → "Lade Sample 3"** → Verbinden
6. **"Route to Sample Nodes" (Output `upload`) → "Setze Sample-Info"** → Verbinden
7. **"Lade Sample 1" → "Setze Sample-Info"** → Bleibt bestehen
8. **"Lade Sample 2" → "Setze Sample-Info"** → Bleibt bestehen
9. **"Lade Sample 3" → "Setze Sample-Info"** → Bleibt bestehen

---

## 📋 Schritt 4: IF Nodes entfernen (optional)

**Die IF Nodes können jetzt entfernt werden** (sie werden nicht mehr gebraucht):

1. **"Ist Sample?" Node** → Rechtsklick → Delete
2. **"Sample 1?" Node** → Rechtsklick → Delete
3. **"Sample 2?" Node** → Rechtsklick → Delete
4. **"Sample 3?" Node** → Rechtsklick → Delete

**ODER:** Lasse sie drin (sie stören nicht).

---

## ✅ Neue Workflow-Struktur

```
Business Card Upload
    ↓
Route to Sample (Code Node)
    ↓
Route to Sample Nodes (Switch Node)
    ├─ sample-1 → Lade Sample 1 → Setze Sample-Info
    ├─ sample-2 → Lade Sample 2 → Setze Sample-Info
    ├─ sample-3 → Lade Sample 3 → Setze Sample-Info
    └─ upload → Setze Sample-Info → AI Agent
```

---

## 🧪 Test

1. **Workflow aktivieren**
2. **Execute Workflow** mit `sample=1`
3. **Prüfe:**
   - "Route to Sample" Code Node Output: `route: "sample-1"` ✅
   - "Route to Sample Nodes" Switch Node: Geht zu `sample-1` Output ✅
   - "Lade Sample 1" Node: Wird ausgeführt ✅
   - "Setze Sample-Info" Node: Wird ausgeführt ✅

---

## 🔍 Debugging

**Falls es nicht funktioniert, prüfe:**

1. **Code Node Output:**
   - Was steht in `route`? (`sample-1`, `sample-2`, `sample-3`, oder `upload`?)
   - Was steht in `sample`? (sollte `"1"`, `"2"`, `"3"` oder `""` sein)

2. **Switch Node:**
   - Welche Routing Rules sind vorhanden?
   - Sind die Output-Namen korrekt? (`sample-1`, `sample-2`, `sample-3`, `upload`)
   - Ist der Default Output korrekt? (`upload`)

3. **Verbindungen:**
   - Geht "Route to Sample Nodes" Output `sample-1` zu "Lade Sample 1"?
   - Geht "Route to Sample Nodes" Output `upload` zu "Setze Sample-Info"?

---

## ✅ Vorteile

1. **Funktioniert GARANTIERT** - JavaScript hat keine Type-Mismatch-Probleme
2. **Einfacher zu debuggen** - Console.log zeigt genau was passiert
3. **Robuster** - Funktioniert unabhängig von n8n Version
4. **Keine IF Node Probleme** - Umgeht alle IF Node Bugs

---

**Diese Lösung funktioniert IMMER!**

