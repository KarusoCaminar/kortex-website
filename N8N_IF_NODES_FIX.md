# 🔧 KRITISCH: n8n IF Nodes Konfiguration Fix

## ❌ Problem:
Die "Ist Sample?", "Sample 1?", "Sample 2?", "Sample 3?" IF Nodes sind **NICHT korrekt konfiguriert**!

**Symptome:**
- Egal welche Visitenkarte geklickt wird, wird immer nur Sample 1 bearbeitet
- Die IF Nodes zeigen "value1" und "value2" als Platzhalter
- Die Conditions sind nicht richtig eingestellt

---

## 🔧 Lösung: n8n IF Nodes korrekt konfigurieren

### SCHRITT 1: "Ist Sample?" Node

1. Öffne n8n → Workflows → "Business Card Extraction Demo - Vertex AI"
2. Klicke auf **"Ist Sample?"** Node
3. Öffne **"Parameters"** Tab

4. **Conditions Section:**
   - **value1:** `={{$json.query.sample}}`
   - **Operator:** "is not empty" (ODER "is not empty")
   - **value2:** LASS LEER (oder entferne)

5. **Korrekte Konfiguration:**
   ```
   Conditions:
   ┌─────────────────┬──────────────┬──────────────┐
   │ value1          │ Operator     │ value2       │
   ├─────────────────┼──────────────┼──────────────┤
   │ {{$json.query.  │ is not empty │ (leer)       │
   │  sample}}       │              │              │
   └─────────────────┴──────────────┴──────────────┘
   ```

6. **WICHTIG:** 
   - `value1` MUSS `={{$json.query.sample}}` sein (mit `={{}}` für Expression!)
   - `value2` MUSS LEER sein
   - Operator: "is not empty" (ODER "not empty")

---

### SCHRITT 2: "Sample 1?" Node

1. Klicke auf **"Sample 1?"** Node
2. Öffne **"Parameters"** Tab

3. **Conditions Section:**
   - **value1:** `={{$json.query.sample}}`
   - **Operator:** "equals" (ODER "is equal to")
   - **value2:** `1` (als String!)

4. **Korrekte Konfiguration:**
   ```
   Conditions:
   ┌─────────────────┬──────────────┬──────────────┐
   │ value1          │ Operator     │ value2       │
   ├─────────────────┼──────────────┼──────────────┤
   │ {{$json.query.  │ equals       │ 1            │
   │  sample}}       │              │              │
   └─────────────────┴──────────────┴──────────────┘
   ```

---

### SCHRITT 3: "Sample 2?" Node

1. Klicke auf **"Sample 2?"** Node
2. Öffne **"Parameters"** Tab

3. **Conditions Section:**
   - **value1:** `={{$json.query.sample}}`
   - **Operator:** "equals"
   - **value2:** `2` (als String!)

4. **Korrekte Konfiguration:**
   ```
   Conditions:
   ┌─────────────────┬──────────────┬──────────────┐
   │ value1          │ Operator     │ value2       │
   ├─────────────────┼──────────────┼──────────────┤
   │ {{$json.query.  │ equals       │ 2            │
   │  sample}}       │              │              │
   └─────────────────┴──────────────┴──────────────┘
   ```

---

### SCHRITT 4: "Sample 3?" Node

1. Klicke auf **"Sample 3?"** Node
2. Öffne **"Parameters"** Tab

3. **Conditions Section:**
   - **value1:** `={{$json.query.sample}}`
   - **Operator:** "equals"
   - **value2:** `3` (als String!)

4. **Korrekte Konfiguration:**
   ```
   Conditions:
   ┌─────────────────┬──────────────┬──────────────┐
   │ value1          │ Operator     │ value2       │
   ├─────────────────┼──────────────┼──────────────┤
   │ {{$json.query.  │ equals       │ 3            │
   │  sample}}       │              │              │
   └─────────────────┴──────────────┴──────────────┘
   ```

---

## ✅ Checkliste für jede IF Node

- [ ] **value1:** `={{$json.query.sample}}` (mit `={{}}` Expression-Syntax!)
- [ ] **Operator:** "equals" (für Sample 1/2/3) oder "is not empty" (für "Ist Sample?")
- [ ] **value2:** `1`, `2`, oder `3` (als String, NICHT als Zahl!)
- [ ] **Keine Platzhalter:** "value1" und "value2" sollten NICHT als Platzhalter sichtbar sein
- [ ] **Expression-Toggle:** Stelle sicher, dass `={{}}` Syntax aktiviert ist (Expression-Modus)

---

## 🐛 Häufige Fehler

### Fehler 1: Expression-Syntax vergessen
❌ **Falsch:**
```
value1: $json.query.sample
```

✅ **Richtig:**
```
value1: ={{$json.query.sample}}
```

### Fehler 2: value2 als Zahl statt String
❌ **Falsch:**
```
value2: 1 (als Zahl)
```

✅ **Richtig:**
```
value2: "1" (als String)
```

### Fehler 3: Falscher Operator
❌ **Falsch:**
```
Operator: "T is equal to" (unbekannter Operator)
```

✅ **Richtig:**
```
Operator: "equals" oder "is equal to"
```

### Fehler 4: value2 bei "Ist Sample?" nicht leer
❌ **Falsch:**
```
Ist Sample? → value2: "something"
```

✅ **Richtig:**
```
Ist Sample? → value2: (leer)
Operator: "is not empty"
```

---

## 📋 Prüfung in n8n

### 1. Node öffnen:
1. Klicke auf die IF Node ("Ist Sample?", "Sample 1?", etc.)
2. Öffne **"Parameters"** Tab
3. Prüfe **"Conditions"** Section

### 2. Erwartete Werte:

**"Ist Sample?":**
- value1: `={{$json.query.sample}}`
- Operator: "is not empty"
- value2: (leer)

**"Sample 1?":**
- value1: `={{$json.query.sample}}`
- Operator: "equals"
- value2: `1`

**"Sample 2?":**
- value1: `={{$json.query.sample}}`
- Operator: "equals"
- value2: `2`

**"Sample 3?":**
- value1: `={{$json.query.sample}}`
- Operator: "equals"
- value2: `3`

---

## 🔧 Manuelle Fix-Anleitung

### Für "Ist Sample?" Node:

1. Öffne Node → Parameters
2. **Conditions:**
   - Klicke auf **value1** Feld
   - Aktiviere **Expression-Toggle** (FX Symbol)
   - Tippe: `$json.query.sample`
   - Sollte automatisch zu `={{$json.query.sample}}` werden
3. **Operator:** Wähle "is not empty"
4. **value2:** LASS LEER oder entferne
5. **Speichere**

### Für "Sample 1/2/3?" Nodes:

1. Öffne Node → Parameters
2. **Conditions:**
   - Klicke auf **value1** Feld
   - Aktiviere **Expression-Toggle** (FX Symbol)
   - Tippe: `$json.query.sample`
   - Sollte automatisch zu `={{$json.query.sample}}` werden
3. **Operator:** Wähle "equals"
4. **value2:**
   - **NICHT** Expression-Toggle aktivieren!
   - Tippe: `1` (für Sample 1), `2` (für Sample 2), oder `3` (für Sample 3)
5. **Speichere**

---

## ✅ Testen

1. **Speichere** den Workflow
2. **Aktiviere** den Workflow (grüner Button oben rechts)
3. Teste auf der Website:
   - Klicke auf "Visitenkarte 1" → Sollte Sample 1 laden
   - Klicke auf "Visitenkarte 2" → Sollte Sample 2 laden
   - Klicke auf "Visitenkarte 3" → Sollte Sample 3 laden

---

## 🐛 Wenn es IMMER NOCH nicht funktioniert:

### Prüfe n8n Execution Logs:

1. Gehe zu n8n → **Executions**
2. Öffne die **letzte Execution** des Workflows
3. Klicke auf **"Ist Sample?"** Node
4. Prüfe **INPUT:**
   - Zeigt `query: { sample: "1" }`? (für Sample 1)
   - Zeigt `query: { sample: "2" }`? (für Sample 2)
   - Zeigt `query: { sample: "3" }`? (für Sample 3)
5. Prüfe **OUTPUT:**
   - Welcher Branch wurde genommen? (true/false)
   - Stimmt das mit der geklickten Karte überein?

### Prüfe Browser Console:

1. Öffne Browser-Konsole (F12)
2. Klicke auf eine Visitenkarte
3. Prüfe Logs:
   - `🔍 Click auf Card:` → Zeigt korrekten `sampleParam`?
   - `🌐 Final Webhook URL:` → Enthält `?sample=1`, `?sample=2`, oder `?sample=3`?

---

**Status:** ⚠️ **KRITISCH** - n8n IF Nodes müssen korrekt konfiguriert werden!

Die Website sendet die korrekten Parameter (`?sample=1`, `?sample=2`, `?sample=3`), aber die n8n IF Nodes müssen diese auch richtig lesen!

