# 🔍 WICHTIG: True Branch vs False Branch prüfen

## ✅ OUTPUT zeigt Daten

Das ist **normal** - n8n IF Nodes geben beide Branches aus!

**ABER:** Im OUTPUT Tab solltest du **zwei Branches** sehen!

---

## 🔍 OUTPUT Tab prüfen:

### Im "Sample 1?" Node OUTPUT Tab:

1. **Oben im OUTPUT Tab siehst du zwei Buttons/Tabs:**
   - **"True Branch"** (oder "True") - grün/links
   - **"False Branch"** (oder "False") - rot/rechts

2. **Prüfe:**
   - **Welcher Branch ist aktiv/ausgewählt?**
   - **Welcher Branch hat Daten?**
   - **Welcher Branch ist leer?**

---

## ✅ Erwartetes Verhalten:

**Wenn `sample: "1"` ist:**

### True Branch:
- **Hat Daten?** ✅ JA (sollte haben!)
- **Führt zu:** "Lade Sample 1" Node

### False Branch:
- **Hat Daten?** ✅ JA (hat auch Daten, ABER...)
- **Führt zu:** "Sample 2?" Node (sollte NICHT passieren!)

---

## 🔧 Problem:

**Wenn beide Branches Daten haben:**

Das ist **normal** bei n8n IF Nodes - beide Branches bekommen die Daten!

**ABER:** n8n muss wissen, welcher Branch **weitergeführt** wird!

---

## 🔧 Fix: Expression-Syntax prüfen

**Problem könnte sein:** Die Expression wird nicht richtig ausgewertet!

### SCHRITT 1: Expression testen

1. **Erstelle temporären Code Node** nach "Business Card Upload"
2. **Code:**
   ```javascript
   const sample = $json.query?.sample;
   const sampleString = String($json.query?.sample || '');
   const result = String($json.query?.sample || '') === "1";
   
   console.log('Sample:', sample);
   console.log('Sample Type:', typeof sample);
   console.log('Sample String:', sampleString);
   console.log('String(sample) === "1":', String(sample) === "1");
   console.log('Result:', result);
   
   return {
     json: {
       sample: sample,
       sampleType: typeof sample,
       sampleString: sampleString,
       equalsString1: sample === "1",
       stringEquals1: String(sample) === "1",
       result: result
     }
   };
   ```
3. **Execute step**
4. **Prüfe OUTPUT:** Zeigt `result: true`?

---

### SCHRITT 2: "Sample 1?" Node Expression ändern

**Wenn String() nicht funktioniert, versuche:**

#### Option A: Ohne String() (wenn Parameter bereits String ist)
```
Value 1:  ={{$json.query.sample}}
           ↑ Expression-Toggle AKTIVIERT

Operator: equals

Value 2:  1
           ↑ OHNE Expression-Toggle!
```

#### Option B: Value 2 als Expression
```
Value 1:  ={{String($json.query.sample)}}
           ↑ Expression-Toggle AKTIVIERT

Operator: equals

Value 2:  ={{1}}
           ↑ MIT Expression-Toggle!
           ↑ Expression-Toggle AKTIVIERT!
```

#### Option C: Beide als String
```
Value 1:  ={{String($json.query.sample)}}
           ↑ Expression-Toggle AKTIVIERT

Operator: equals

Value 2:  ={{String(1)}}
           ↑ MIT Expression-Toggle!
           ↑ Expression-Toggle AKTIVIERT!
```

---

## 🧪 Test-Plan:

1. **"Sample 1?" Node OUTPUT Tab prüfen:**
   - Siehst du zwei Branches? (True und False)
   - Welcher Branch ist ausgewählt/aktiv?
   - Welcher Branch hat Daten?

2. **Code Node erstellen:**
   - Erstelle temporären Code Node
   - Teste Expression
   - Prüfe OUTPUT: `result: true`?

3. **"Sample 1?" Node Expression ändern:**
   - Versuche verschiedene Konfigurationen
   - Teste jedes Mal mit "Execute step"
   - Prüfe welcher Branch Daten hat

---

## 📋 Checkliste:

**"Sample 1?" Node - OUTPUT Tab:**
- [ ] Siehst du zwei Branches? (True und False)
- [ ] Welcher Branch ist ausgewählt/aktiv?
- [ ] Welcher Branch hat Daten?
- [ ] Welcher Branch führt weiter? (True → "Lade Sample 1"?)

**"Sample 1?" Node - Expression testen:**
- [ ] Code Node erstellt?
- [ ] Expression getestet?
- [ ] OUTPUT zeigt `result: true`?

**"Sample 1?" Node - Alternative Konfigurationen:**
- [ ] Option A getestet? (ohne String())
- [ ] Option B getestet? (Value 2 als Expression)
- [ ] Option C getestet? (beide als String)

---

**Status:** 🔍 **BRANCHES PRÜFEN** - Bitte prüfe welcher Branch Daten hat und weitergeführt wird!

