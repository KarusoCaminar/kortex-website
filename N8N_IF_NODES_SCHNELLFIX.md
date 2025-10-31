# ⚡ SCHNELLFIX: n8n IF Nodes - "Immer nur Sample 1" Problem

## ❌ Problem:
**Egal welche Visitenkarte geklickt wird, wird immer nur Sample 1 bearbeitet!**

**Ursache:** Die IF Nodes ("Ist Sample?", "Sample 1?", "Sample 2?", "Sample 3?") zeigen "value1" und "value2" als Platzhalter statt der korrekten Werte.

---

## 🔧 SCHNELLFIX (5 Minuten):

### SCHRITT 1: "Ist Sample?" Node

1. Öffne n8n → Workflows → "Business Card Extraction Demo - Vertex AI"
2. Klicke auf **"Ist Sample?"** Node
3. **Parameters** Tab → **Conditions** Section

4. **Klicke auf "value1" Feld:**
   - Aktiviere **Expression-Toggle** (FX Symbol) 🔵
   - Tippe: `$json.query.sample`
   - Sollte automatisch zu `={{$json.query.sample}}` werden

5. **Operator-Dropdown:**
   - Wähle: **"is not empty"** (ODER "notEmpty")

6. **"value2" Feld:**
   - **LASS LEER!** (oder entferne die Condition)

7. **Speichere**

---

### SCHRITT 2: "Sample 1?" Node

1. Klicke auf **"Sample 1?"** Node
2. **Parameters** Tab → **Conditions** Section

3. **"value1" Feld:**
   - Aktiviere **Expression-Toggle** (FX Symbol) 🔵
   - Tippe: `$json.query.sample`
   - Sollte zu `={{$json.query.sample}}` werden

4. **Operator-Dropdown:**
   - Wähle: **"equals"**

5. **"value2" Feld:**
   - **NICHT** Expression-Toggle aktivieren! ⚪
   - Tippe einfach: `1` (als Text/String)

6. **Speichere**

---

### SCHRITT 3: "Sample 2?" Node

1. Klicke auf **"Sample 2?"** Node
2. **Parameters** Tab → **Conditions** Section

3. **"value1" Feld:**
   - Aktiviere **Expression-Toggle** (FX Symbol) 🔵
   - Tippe: `$json.query.sample`
   - Sollte zu `={{$json.query.sample}}` werden

4. **Operator-Dropdown:**
   - Wähle: **"equals"**

5. **"value2" Feld:**
   - **NICHT** Expression-Toggle aktivieren! ⚪
   - Tippe einfach: `2` (als Text/String)

6. **Speichere**

---

### SCHRITT 4: "Sample 3?" Node

1. Klicke auf **"Sample 3?"** Node
2. **Parameters** Tab → **Conditions** Section

3. **"value1" Feld:**
   - Aktiviere **Expression-Toggle** (FX Symbol) 🔵
   - Tippe: `$json.query.sample`
   - Sollte zu `={{$json.query.sample}}` werden

4. **Operator-Dropdown:**
   - Wähle: **"equals"**

5. **"value2" Feld:**
   - **NICHT** Expression-Toggle aktivieren! ⚪
   - Tippe einfach: `3` (als Text/String)

6. **Speichere**

---

## ✅ Prüfung nach Fix:

### Test in n8n:

1. **Workflow speichern**
2. **Workflow aktivieren** (grüner Button oben rechts)
3. **Testen:**
   - Klicke auf **"Test URL"** im "Business Card Upload" Webhook Node
   - Füge Query Parameter hinzu: `?sample=1`
   - Klicke "Send Test Request"
   - Prüfe Execution → "Sample 1?" sollte `true` sein
   - Wiederhole mit `?sample=2` und `?sample=3`

### Test auf Website:

1. Öffne: `https://karusocaminar.github.io/kortex-website/kortex-n8n-modal.html`
2. Öffne Browser-Konsole (F12)
3. Klicke auf **"Visitenkarte 1"** → Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=1`
4. Klicke auf **"Visitenkarte 2"** → Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=2`
5. Klicke auf **"Visitenkarte 3"** → Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=3`

---

## 🐛 Häufige Fehler:

### ❌ Fehler 1: Expression-Toggle vergessen
**Problem:** `value1` zeigt "value1" statt `={{$json.query.sample}}`

**Lösung:** Klicke auf `value1` → Aktiviere Expression-Toggle (FX Symbol) → Tippe `$json.query.sample`

---

### ❌ Fehler 2: value2 mit Expression
**Problem:** `value2` hat Expression-Toggle aktiviert und zeigt `={{}}`

**Lösung:** Deaktiviere Expression-Toggle für `value2` → Tippe einfach `1`, `2`, oder `3`

---

### ❌ Fehler 3: Falscher Operator
**Problem:** Operator zeigt "T is equal to" oder unbekannten Wert

**Lösung:** Wähle aus Dropdown: **"equals"** (oder "is equal to")

---

## 📋 Checkliste:

**"Ist Sample?":**
- [ ] value1: `={{$json.query.sample}}` (mit Expression-Toggle 🔵)
- [ ] Operator: "is not empty"
- [ ] value2: (LEER)

**"Sample 1?":**
- [ ] value1: `={{$json.query.sample}}` (mit Expression-Toggle 🔵)
- [ ] Operator: "equals"
- [ ] value2: `1` (OHNE Expression-Toggle ⚪)

**"Sample 2?":**
- [ ] value1: `={{$json.query.sample}}` (mit Expression-Toggle 🔵)
- [ ] Operator: "equals"
- [ ] value2: `2` (OHNE Expression-Toggle ⚪)

**"Sample 3?":**
- [ ] value1: `={{$json.query.sample}}` (mit Expression-Toggle 🔵)
- [ ] Operator: "equals"
- [ ] value2: `3` (OHNE Expression-Toggle ⚪)

---

**Status:** 🔧 **FIX IN N8N ERFORDERLICH!**

Die Website sendet die korrekten Parameter, aber die n8n IF Nodes müssen diese auch richtig lesen!

