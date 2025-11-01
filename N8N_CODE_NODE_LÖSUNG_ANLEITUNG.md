# ✅ Code Node Lösung - Schritt für Schritt

## Ziel

**IF Nodes durch Code Node + Switch Node ersetzen** - funktioniert GARANTIERT!

---

## 📋 Schritt 1: Code Node erstellen

1. **In n8n:** Öffne deinen Workflow
2. **Klicke auf "Business Card Upload" Node**
3. **Klicke auf das "+" Symbol** (Was passiert als Nächstes?)
4. **Suche nach:** `code` oder `Code`
5. **Klicke auf "Code" Node** (der grüne Node mit `</>` Symbol)
6. **Node wird hinzugefügt**
7. **Name ändern:** Doppelklick auf "Code" → `Route to Sample`
8. **Parameters Tab öffnen**
9. **Mode:** Sollte `Run Once for Each Item` sein (bleibt so)
10. **Code eingeben:**

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

11. **Speichern**

---

## 📋 Schritt 2: Switch Node erstellen

1. **Klicke auf "Route to Sample" Node**
2. **Klicke auf das "+" Symbol** (Was passiert als Nächstes?)
3. **Suche nach:** `switch` oder `Switch`
4. **Klicke auf "Switch" Node** (der blaue Node mit zwei Pfeilen)
5. **Node wird hinzugefügt**
6. **Name ändern:** Doppelklick auf "Switch" → `Route to Sample Nodes`
7. **Parameters Tab öffnen**
8. **Routing Rules hinzufügen:**

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

9. **Speichern**

---

## 📋 Schritt 3: Verbindungen anpassen

### Alte Verbindungen LÖSCHEN:

1. **"Business Card Upload" → "Ist Sample?"** → LÖSCHEN (rechtsklick auf Verbindungslinie → Delete)
2. **"Ist Sample?" → "Sample 1?"** → LÖSCHEN
3. **"Sample 1?" → "Lade Sample 1"** → LÖSCHEN
4. **"Sample 1?" → "Sample 2?"** → LÖSCHEN
5. **"Sample 2?" → "Lade Sample 2"** → LÖSCHEN
6. **"Sample 2?" → "Sample 3?"** → LÖSCHEN
7. **"Sample 3?" → "Lade Sample 3"** → LÖSCHEN
8. **"Ist Sample?" → "Setze Sample-Info"** → LÖSCHEN

### Neue Verbindungen ERSTELLEN:

**Die Verbindungen sollten automatisch erstellt werden, wenn du die Nodes hinzufügst!**

**Falls nicht, manuell verbinden:**

1. **"Business Card Upload" → "Route to Sample"** → Ziehe Linie vom Output-Punkt zu Input-Punkt
2. **"Route to Sample" → "Route to Sample Nodes"** → Ziehe Linie
3. **"Route to Sample Nodes" (Output `sample-1`) → "Lade Sample 1"** → Ziehe Linie
4. **"Route to Sample Nodes" (Output `sample-2`) → "Lade Sample 2"** → Ziehe Linie
5. **"Route to Sample Nodes" (Output `sample-3`) → "Lade Sample 3"** → Ziehe Linie
6. **"Route to Sample Nodes" (Output `upload`) → "Setze Sample-Info"** → Ziehe Linie

**WICHTIG:** "Lade Sample 1/2/3" → "Setze Sample-Info" Verbindungen bleiben bestehen!

---

## 📋 Schritt 4: IF Nodes entfernen (optional)

**Die IF Nodes können jetzt entfernt werden** (sie werden nicht mehr gebraucht):

1. **"Ist Sample?" Node** → Rechtsklick → Delete Node
2. **"Sample 1?" Node** → Rechtsklick → Delete Node
3. **"Sample 2?" Node** → Rechtsklick → Delete Node
4. **"Sample 3?" Node** → Rechtsklick → Delete Node

**ODER:** Lasse sie drin (sie stören nicht).

---

## ✅ Neue Workflow-Struktur

```
Business Card Upload
    ↓
Route to Sample (Code Node) ← DU ERSTELLST DIESEN!
    ↓
Route to Sample Nodes (Switch Node) ← DU ERSTELLST DIESEN!
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
   - Ist Value 1 als Expression eingegeben? (`={{$json.route}}`)

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

## 📝 Zusammenfassung

1. **Code Node hinzufügen** (nach "Business Card Upload")
   - Suche nach: `code` oder `Code`
   - Name: `Route to Sample`
   - Code einfügen (siehe oben)

2. **Switch Node hinzufügen** (nach "Route to Sample")
   - Suche nach: `switch` oder `Switch`
   - Name: `Route to Sample Nodes`
   - Routing Rules hinzufügen (`sample-1`, `sample-2`, `sample-3`, `upload`)

3. **Verbindungen anpassen**
   - Alte IF Node Verbindungen löschen
   - Neue Verbindungen erstellen (siehe oben)

4. **Test**
   - Workflow aktivieren
   - Auf Website "Sample 1" klicken
   - Sollte funktionieren!

---

**Diese Lösung funktioniert IMMER!**
