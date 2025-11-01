# ✅ DEFINITIVE LÖSUNG - IF Nodes False Branch Problem

## ✅ Bestätigung

**Im "Business Card Upload" Node Output steht:**
```json
"query": {
  "sample": "1"  // ← String "1" (mit Anführungszeichen!)
}
```

Das ist korrekt - der Parameter kommt als **String** an.

---

## ❌ Das Problem

**Trotzdem landen alle IF Nodes im False Branch!**

Das bedeutet: Die Expression `={{String($json.query.sample)}}` wird entweder:
1. **Nicht evaluiert** (Expression-Toggle ist nicht richtig aktiviert)
2. **Value 2 wird als Number behandelt** (trotz Anführungszeichen)
3. **n8n verwendet strict comparison** (`===` statt `==`)

---

## ✅ DEFINITIVE LÖSUNG: Beide Seiten als String vergleichen

### Schritt 1: Value 1 Expression ändern

**Problem:** Die Expression wird möglicherweise nicht korrekt evaluiert.

**Lösung:** Vereinfache die Expression:

1. **"Sample 1?" Node öffnen** → Parameters Tab
2. **Value 1:** Klicke auf das Feld
3. **FX-Symbol AKTIVIEREN** (blau)
4. **Lösche:** `String($json.query.sample)`
5. **Tippe:** `$json.query.sample` (OHNE String()!)
6. **Sollte zu:** `={{$json.query.sample}}` werden
7. **Speichern**

**Warum:** n8n behandelt Query-Parameter manchmal automatisch als String. Das `String()` könnte das Problem verursachen.

---

### Schritt 2: Value 2 als Expression (GARANTIERT String)

**Problem:** Value 2 wird möglicherweise als Number behandelt, auch mit Anführungszeichen.

**Lösung:** Verwende Expression für Value 2:

1. **Value 2:** Klicke auf das Feld
2. **FX-Symbol AKTIVIEREN** (blau!) ← **WICHTIG: Das ist anders als vorher!**
3. **Value 2:** Tippe: `"1"` (mit Anführungszeichen im Expression)
4. **Sollte zu:** `={{ "1" }}` werden
5. **Speichern**

**ODER (falls das nicht funktioniert):**
- **Value 2 (Expression):** `String(1)` oder `"1"` oder `'1'`
- **Sollte zu:** `={{String(1)}}` oder `={{ "1" }}` werden

---

### Schritt 3: Alternative - Beide als Number vergleichen

**Falls String-Vergleich nicht funktioniert:**

1. **Value 1 (Expression):** `Number($json.query.sample)` oder `parseInt($json.query.sample)`
2. **Sollte zu:** `={{Number($json.query.sample)}}` werden
3. **Value 2 (Expression DEAKTIVIERT):** `1` (ohne Anführungszeichen, als Number)
4. **ODER Value 2 (Expression AKTIVIERT):** `Number(1)` → `={{Number(1)}}`

---

## 🔧 SOFORT-TEST: Prüfe was wirklich passiert

### Test 1: Execution prüfen

1. **In n8n:** Executions Tab → Letzte Execution
2. **"Sample 1?" Node klicken**
3. **Input Tab:** Was steht dort?
4. **Output Tab:** Welcher Branch wurde genommen?

### Test 2: Expression testen

1. **Temporärer Code Node** VOR "Sample 1?":
```javascript
const sample = $json.query?.sample;
const sampleString = String(sample);
const sampleNumber = Number(sample);

console.log('🔍 Sample:', sample, 'Type:', typeof sample);
console.log('String():', sampleString, 'Type:', typeof sampleString);
console.log('Number():', sampleNumber, 'Type:', typeof sampleNumber);
console.log('sample === "1":', sample === "1");
console.log('sample === 1:', sample === 1);
console.log('String(sample) === "1":', String(sample) === "1");
console.log('Number(sample) === 1:', Number(sample) === 1);

return [{
    json: {
        ...$json,
        debug: {
            sample,
            sampleType: typeof sample,
            sampleString,
            sampleNumber,
            equalsString1: sample === "1",
            equalsNumber1: sample === 1,
            stringEquals1: String(sample) === "1",
            numberEquals1: Number(sample) === 1
        }
    }
}];
```

2. **Execute** → Output prüfen: Was zeigt `debug`?

---

## ✅ BESTE LÖSUNG: Code Node Routing (funktioniert IMMER)

**Wenn IF Nodes einfach nicht funktionieren:**

Siehe: `N8N_WORKFLOW_ALTERNATIVE_LÖSUNG.md`

Diese Lösung umgeht alle IF Node Probleme komplett!

---

## 📋 Was du jetzt machen solltest

1. **Prüfe "Sample 1?" Node Input** in der Execution:
   - Was steht in `query.sample`?
   - Welcher Branch wurde genommen (True/False)?

2. **Probiere diese Fixes aus:**
   - **Option A:** Value 1: `={{$json.query.sample}}` (ohne String())
   - **Option B:** Value 2: `={{ "1" }}` (mit Expression!)
   - **Option C:** Beide als Number: `={{Number($json.query.sample)}}` und `1`

3. **ODER:** Nutze die Code Node Lösung (funktioniert garantiert!)

---

**Schicke mir bitte:**
- Screenshot vom "Sample 1?" Node Input (aus Execution)
- Screenshot vom "Sample 1?" Node Output (welcher Branch?)
- Screenshot vom "Sample 1?" Node Konfiguration (Value 1, Operator, Value 2)

Dann kann ich dir genau sagen, was falsch ist!

