# 🐛 Debug: IF Nodes nehmen immer False Branch

## ❌ Problem:
**Workflow wird ausgeführt, aber landet immer im False Branch!**

---

## 🔍 Sofort-Debugging:

### SCHRITT 1: Welche Node nimmt False Branch?

1. **Öffne n8n → Executions**
2. **Öffne die letzte Execution**
3. **Prüfe jeden IF Node:**

**"Ist Sample?" Node:**
- Welcher Branch wurde genommen? (True/False)
- Wenn **False** → Parameter kommt nicht an!

**"Sample 1?" Node:**
- Welcher Branch wurde genommen? (True/False)
- Wenn **False** → Parameter ist nicht "1"!

**"Sample 2?" Node:**
- Welcher Branch wurde genommen? (True/False)
- Wenn **False** → Parameter ist nicht "2"!

**"Sample 3?" Node:**
- Welcher Branch wurde genommen? (True/False)
- Wenn **False** → Parameter ist nicht "3"!

---

### SCHRITT 2: INPUT prüfen

**Für jede IF Node:**

1. **Klicke auf die IF Node** (z.B. "Sample 1?")
2. **Gehe zu "INPUT" Tab**
3. **Prüfe was dort steht:**

**Erwartet:**
```json
{
  "query": {
    "sample": "1"  ← Muss String sein!
  }
}
```

**Oder:**
```json
{
  "query": {
    "sample": 1  ← Number - Problem!
  }
}
```

---

### SCHRITT 3: Expression testen

**Für jede IF Node:**

1. **Klicke auf die IF Node** (z.B. "Sample 1?")
2. **Klicke "Execute step"** (roter Button oben rechts)
3. **Prüfe OUTPUT:**
   - True Branch: Hat Daten?
   - False Branch: Hat Daten?

---

### SCHRITT 4: Expression direkt testen

**In n8n:**

1. **Öffne Code Node** (temporär erstellen)
2. **Code:**
   ```javascript
   const sample = $json.query?.sample;
   const sampleString = String($json.query?.sample || '');
   
   console.log('Sample Parameter:', sample);
   console.log('Sample Type:', typeof sample);
   console.log('Sample String:', sampleString);
   console.log('Sample === "1":', sample === "1");
   console.log('Sample == 1:', sample == 1);
   console.log('String(sample) === "1":', String(sample) === "1");
   
   return {
     json: {
       sample: sample,
       sampleType: typeof sample,
       sampleString: sampleString,
       equalsString1: sample === "1",
       equalsNumber1: sample == 1,
       stringEquals1: String(sample) === "1"
     }
   };
   ```
3. **Execute step**
4. **Prüfe OUTPUT:** Zeigt was der Parameter ist und wie er verglichen wird

---

## 🔧 Mögliche Fixes:

### Fix 1: Expression-Syntax prüfen

**Problem:** Expression zeigt nicht `={{String($json.query.sample)}}`

**Lösung:**
1. Öffne IF Node → Parameters → Conditions
2. Value 1: Klicke auf das Feld
3. Aktiviere Expression-Toggle (fx Symbol)
4. Tippe: `String($json.query.sample)`
5. Sollte zu `={{String($json.query.sample)}}` werden

---

### Fix 2: Operator prüfen

**Problem:** Operator ist nicht "equals"

**Lösung:**
1. Öffne IF Node → Parameters → Conditions
2. Operator-Dropdown: Wähle "equals" (ODER "is equal to")
3. Nicht "is not empty" (das ist für "Ist Sample?")

---

### Fix 3: Value 2 prüfen

**Problem:** Value 2 ist nicht korrekt

**Lösung:**
1. Öffne IF Node → Parameters → Conditions
2. Value 2: Tippe `1` (für Sample 1), `2` (für Sample 2), `3` (für Sample 3)
3. **WICHTIG:** Expression-Toggle NICHT aktivieren für Value 2!
4. Sollte einfach `1`, `2`, oder `3` sein (ohne `={{}}`)

---

### Fix 4: Case Sensitivity prüfen

**Problem:** Case-Sensitivity ist aktiviert

**Lösung:**
1. Öffne IF Node → Parameters → Conditions → Options
2. Prüfe "Case Sensitive":
   - Sollte aktiviert sein (damit "1" genau "1" ist, nicht "1 ")

---

### Fix 5: Type Validation prüfen

**Problem:** Type Validation ist zu strikt

**Lösung:**
1. Öffne IF Node → Parameters → Conditions → Options
2. Prüfe "Type Validation":
   - Sollte "strict" sein (das ist OK)
   - ABER: Value 1 muss String sein mit `String()`!

---

## ✅ Korrekte Konfiguration:

### "Ist Sample?" Node:
- **Value 1:** `={{String($json.query.sample)}}`
- **Operator:** "is not empty"
- **Value 2:** (LEER)

### "Sample 1?" Node:
- **Value 1:** `={{String($json.query.sample)}}`
- **Operator:** "equals"
- **Value 2:** `1` (OHNE Expression!)

### "Sample 2?" Node:
- **Value 1:** `={{String($json.query.sample)}}`
- **Operator:** "equals"
- **Value 2:** `2` (OHNE Expression!)

### "Sample 3?" Node:
- **Value 1:** `={{String($json.query.sample)}}`
- **Operator:** "equals"
- **Value 2:** `3` (OHNE Expression!)

---

## 🧪 Test-Plan:

1. **"Sample 1?" Node direkt testen:**
   - Klicke auf "Sample 1?" Node
   - Klicke "Execute step"
   - Prüfe INPUT: Zeigt `query: { sample: "1" }`?
   - Prüfe OUTPUT: True Branch hat Daten?

2. **Workflow komplett testen:**
   - Öffne Workflow
   - Klicke "Execute Workflow"
   - Füge Parameter hinzu: `?sample=1`
   - Prüfe jede IF Node einzeln

3. **Website testen:**
   - Öffne Website
   - Klicke auf "Visitenkarte 1"
   - Prüfe n8n Execution
   - Welcher Branch wurde genommen?

---

## 📋 Debug-Checkliste:

**Welche Node nimmt False Branch?**
- [ ] "Ist Sample?" → False? → Parameter kommt nicht an!
- [ ] "Sample 1?" → False? → Parameter ist nicht "1"!
- [ ] "Sample 2?" → False? → Parameter ist nicht "2"!
- [ ] "Sample 3?" → False? → Parameter ist nicht "3"!

**INPUT prüfen:**
- [ ] "Ist Sample?" INPUT zeigt `query: { sample: "1" }`? (String)
- [ ] "Sample 1?" INPUT zeigt `query: { sample: "1" }`? (String)
- [ ] "Sample 2?" INPUT zeigt `query: { sample: "2" }`? (String)
- [ ] "Sample 3?" INPUT zeigt `query: { sample: "3" }`? (String)

**Expression prüfen:**
- [ ] "Ist Sample?" Value 1: `={{String($json.query.sample)}}`
- [ ] "Sample 1?" Value 1: `={{String($json.query.sample)}}`
- [ ] "Sample 2?" Value 1: `={{String($json.query.sample)}}`
- [ ] "Sample 3?" Value 1: `={{String($json.query.sample)}}`

**Operator prüfen:**
- [ ] "Ist Sample?" Operator: "is not empty"
- [ ] "Sample 1?" Operator: "equals"
- [ ] "Sample 2?" Operator: "equals"
- [ ] "Sample 3?" Operator: "equals"

**Value 2 prüfen:**
- [ ] "Sample 1?" Value 2: `1` (OHNE Expression!)
- [ ] "Sample 2?" Value 2: `2` (OHNE Expression!)
- [ ] "Sample 3?" Value 2: `3` (OHNE Expression!)

---

**Status:** 🐛 **DEBUG ERFORDERLICH** - Bitte prüfe welche Node den False Branch nimmt!

