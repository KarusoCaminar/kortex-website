# 🔧 FIX: Sample 1 nimmt immer False Branch

## ❌ Problem:
**Parameter kommt an:** `"sample": "1"` (String) ✅
**Aber:** "Sample 1?" Node nimmt **False Branch** ❌

**Folge:** Workflow geht weiter zu "Sample 2?" → "Sample 3?" → landet im False Branch von "Sample 3?"

---

## 🔧 Lösung: "Sample 1?" Node direkt testen

### SCHRITT 1: "Sample 1?" Node öffnen

1. Öffne n8n → Workflows → "Business Card Extraction Demo - Vertex AI"
2. Klicke auf **"Sample 1?"** Node
3. **Klicke "Execute step"** (roter Button oben rechts)

---

### SCHRITT 2: INPUT prüfen

1. **Gehe zu "INPUT" Tab**
2. **Prüfe was dort steht:**

**Sollte sein:**
```json
{
  "query": {
    "sample": "1"  ← String "1"
  }
}
```

**Oder:**
```json
{
  "query": {
    "sample": 1  ← Number 1 (Problem!)
  }
}
```

---

### SCHRITT 3: Expression direkt testen

**Wenn INPUT zeigt `"sample": "1"` (String):**

1. **Gehe zu "Parameters" Tab → Conditions**
2. **Value 1:** Muss sein: `={{String($json.query.sample)}}`
3. **Prüfe Expression:**
   - Expression-Toggle muss aktiviert sein (fx Symbol)
   - Wenn nicht: Aktiviere Expression-Toggle
   - Tippe: `String($json.query.sample)`
   - Sollte zu `={{String($json.query.sample)}}` werden

4. **Operator:** Muss sein: "equals"
5. **Value 2:** Muss sein: `1` (OHNE Expression-Toggle!)

---

### SCHRITT 4: Expression manuell testen

**In n8n:**

1. **Erstelle temporären Code Node** nach "Business Card Upload"
2. **Code:**
   ```javascript
   const sample = $json.query?.sample;
   const sampleString = String($json.query?.sample || '');
   
   console.log('Sample Parameter:', sample);
   console.log('Sample Type:', typeof sample);
   console.log('Sample String:', sampleString);
   console.log('Sample === "1":', sample === "1");
   console.log('String(sample) === "1":', String(sample) === "1");
   
   return {
     json: {
       originalSample: sample,
       sampleType: typeof sample,
       sampleString: sampleString,
       equalsString1: sample === "1",
       stringEquals1: String(sample) === "1"
     }
   };
   ```
3. **Execute step**
4. **Prüfe OUTPUT:** Zeigt was der Parameter ist

---

### SCHRITT 5: IF Node Expression ändern (ALTERNATIVE)

**Wenn String() nicht funktioniert, versuche:**

**Option A: Ohne String() (wenn Parameter bereits String ist):**
- **Value 1:** `={{$json.query.sample}}`
- **Operator:** "equals"
- **Value 2:** `1` (OHNE Expression!)

**Option B: Mit trim() (falls Leerzeichen):**
- **Value 1:** `={{String($json.query.sample).trim()}}`
- **Operator:** "equals"
- **Value 2:** `1` (OHNE Expression!)

**Option C: Typ-unabhängiger Vergleich:**
- **Value 1:** `={{$json.query.sample}}`
- **Operator:** "equals"
- **Value 2:** `={{1}}` (als Expression!)

---

## ✅ Korrekte Konfiguration für "Sample 1?" Node:

### Konfiguration 1: Mit String() (EMPFOHLEN)
```
Value 1: ={{String($json.query.sample)}}
Operator: equals
Value 2: 1
```

### Konfiguration 2: Ohne String() (ALTERNATIVE)
```
Value 1: ={{$json.query.sample}}
Operator: equals
Value 2: 1
```

### Konfiguration 3: Value 2 als Expression (ALTERNATIVE)
```
Value 1: ={{$json.query.sample}}
Operator: equals
Value 2: ={{1}}
```

---

## 🧪 Test-Plan:

1. **"Sample 1?" Node direkt testen:**
   - Klicke auf "Sample 1?" Node
   - Klicke "Execute step"
   - Prüfe INPUT: Zeigt `query: { sample: "1" }`?
   - Prüfe OUTPUT: True Branch hat Daten?

2. **Expression manuell testen:**
   - Erstelle Code Node
   - Teste Expression
   - Prüfe OUTPUT

3. **Workflow komplett testen:**
   - Öffne Workflow
   - Klicke "Execute Workflow"
   - Füge Parameter hinzu: `?sample=1`
   - Prüfe jede IF Node einzeln

---

## 📋 Debug-Checkliste:

**"Sample 1?" Node:**
- [ ] INPUT zeigt `query: { sample: "1 } }` oder `"1"`?
- [ ] Value 1: `={{String($json.query.sample)}}` oder `={{$json.query.sample}}`?
- [ ] Expression-Toggle aktiviert? (fx Symbol)
- [ ] Operator: "equals"?
- [ ] Value 2: `1` (OHNE Expression!) oder `={{1}}` (mit Expression)?

**Expression testen:**
- [ ] Code Node erstellt?
- [ ] Expression getestet?
- [ ] OUTPUT zeigt korrekten Typ?

**Workflow testen:**
- [ ] "Sample 1?" Node direkt getestet?
- [ ] True Branch hat Daten?
- [ ] False Branch hat Daten?

---

## 🔧 Wenn es IMMER NOCH nicht funktioniert:

### Option 1: Value 2 als Expression

**"Sample 1?" Node:**
1. Value 1: `={{String($json.query.sample)}}`
2. Operator: "equals"
3. **Value 2:** Aktiviere Expression-Toggle!
4. Tippe: `1`
5. Sollte zu `={{1}}` werden

### Option 2: Operator ändern

**"Sample 1?" Node:**
1. Value 1: `={{String($json.query.sample)}}`
2. Operator: Wähle "is equal to" (statt "equals")
3. Value 2: `1`

### Option 3: Type Validation ändern

**"Sample 1?" Node:**
1. Parameters → Conditions → Options
2. Type Validation: Ändere von "strict" zu "loose"
3. Speichere

---

**Status:** 🐛 **DEBUG ERFORDERLICH** - Bitte teste "Sample 1?" Node direkt und prüfe Expression!

