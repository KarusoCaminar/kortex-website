# 🔧 FIX: Sample 1 nimmt False Branch obwohl sample="1" ist

## ❌ Problem:
**"Sample 2?" Node bekommt:** `"sample": "1"` (sollte nicht passieren!)
**Das bedeutet:** "Sample 1?" Node nimmt **False Branch**, obwohl `sample: "1"` ist!

**Workflow-Fluss:**
```
Business Card Upload
  ↓
Ist Sample? → True ✅
  ↓
Sample 1? → False ❌ (FALSCH! Sollte True sein!)
  ↓
Sample 2? → bekommt sample: "1" → False ✅ (korrekt, weil nicht "2")
  ↓
Sample 3? → bekommt sample: "1" → False ✅ (korrekt, weil nicht "3")
  ↓
LANDET IM FALSE BRANCH VON SAMPLE 3 ❌
```

---

## 🔧 Lösung: "Sample 1?" Node-Konfiguration prüfen

### SCHRITT 1: "Sample 1?" Node öffnen

1. Öffne n8n → Workflows → "Business Card Extraction Demo - Vertex AI"
2. Klicke auf **"Sample 1?"** Node
3. **Gehe zu "Parameters" Tab → Conditions Section**

---

### SCHRITT 2: Konfiguration prüfen

**Aktuelle Konfiguration prüfen:**

1. **Value 1:**
   - Was steht dort genau?
   - Sollte sein: `={{String($json.query.sample)}}` oder `={{$json.query.sample}}`
   - Expression-Toggle muss aktiviert sein (fx Symbol muss aktiviert sein!)

2. **Operator:**
   - Was steht dort genau?
   - Muss sein: **"equals"** oder **"is equal to"**
   - NICHT: "is not empty" (das ist für "Ist Sample?")

3. **Value 2:**
   - Was steht dort genau?
   - Muss sein: `1` (OHNE Expression-Toggle!)
   - NICHT: `={{1}}` (mit Expression-Toggle)
   - NICHT: `"1"` (mit Anführungszeichen)

---

### SCHRITT 3: Konfiguration korrigieren

**Wenn etwas falsch ist:**

#### Fix 1: Value 1 korrigieren

1. **Klicke auf Value 1 Feld**
2. **Aktiviere Expression-Toggle** (fx Symbol) - muss aktiviert sein!
3. **Lösche alles im Feld**
4. **Tippe:** `String($json.query.sample)`
5. **Sollte automatisch zu:** `={{String($json.query.sample)}}` werden
6. **ODER** (wenn String() nicht funktioniert): `$json.query.sample` → `={{$json.query.sample}}`
7. **Speichere**

---

#### Fix 2: Operator korrigieren

1. **Klicke auf Operator Dropdown**
2. **Wähle:** "equals" (ODER "is equal to")
3. **NICHT:** "is not empty"
4. **Speichere**

---

#### Fix 3: Value 2 korrigieren

1. **Klicke auf Value 2 Feld**
2. **DEAKTIVIERE Expression-Toggle** (fx Symbol) - muss DEAKTIVIERT sein!
3. **Lösche alles im Feld**
4. **Tippe einfach:** `1` (nur die Zahl!)
5. **NICHT:** `"1"` (ohne Anführungszeichen!)
6. **NICHT:** `={{1}}` (ohne Expression!)
7. **Speichere**

---

## ✅ Korrekte Konfiguration:

### "Sample 1?" Node - Parameters → Conditions:

```
┌─────────────────────────────────────────────┐
│ Conditions                                  │
├─────────────────────────────────────────────┤
│ Value 1:  ={{String($json.query.sample)}}  │
│           ↑ Expression-Toggle AKTIVIERT    │
│           ↑ (fx Symbol muss aktiviert sein)│
├─────────────────────────────────────────────┤
│ Operator: equals                            │
│           ↑ ODER "is equal to"              │
├─────────────────────────────────────────────┤
│ Value 2:  1                                 │
│           ↑ OHNE Expression-Toggle!        │
│           ↑ (fx Symbol muss DEAKTIVIERT sein)│
└─────────────────────────────────────────────┘
```

---

## 🧪 Testen:

1. **"Sample 1?" Node direkt testen:**
   - Klicke auf "Sample 1?" Node
   - Klicke "Execute step" (roter Button oben rechts)
   - Prüfe INPUT: Zeigt `query: { sample: "1" }`?
   - Prüfe OUTPUT: True Branch hat Daten? (sollte haben!)
   - False Branch ist leer? (sollte leer sein!)

2. **Workflow komplett testen:**
   - Öffne Workflow
   - Klicke "Execute Workflow"
   - Füge Parameter hinzu: `?sample=1`
   - Prüfe Execution:
     - "Sample 1?" → sollte True Branch nehmen
     - "Sample 2?" → sollte NICHT erreicht werden (weil Sample 1 True ist)

---

## 📋 Checkliste:

**"Sample 1?" Node - Parameters → Conditions:**
- [ ] Value 1: `={{String($json.query.sample)}}` oder `={{$json.query.sample}}`?
- [ ] Expression-Toggle AKTIVIERT? (fx Symbol muss aktiviert sein!)
- [ ] Operator: "equals" oder "is equal to"?
- [ ] Operator NICHT: "is not empty"?
- [ ] Value 2: `1` (OHNE Expression-Toggle!)?
- [ ] Value 2 NICHT: `={{1}}` (ohne Expression!)?
- [ ] Value 2 NICHT: `"1"` (ohne Anführungszeichen!)?

**"Sample 1?" Node - OUTPUT nach "Execute step":**
- [ ] True Branch hat Daten? (sollte haben!)
- [ ] False Branch ist leer? (sollte leer sein!)

---

## 🔧 Alternative Fix: Ohne String()

**Wenn String() nicht funktioniert, versuche:**

1. **Value 1:** `={{$json.query.sample}}` (ohne String())
2. **Operator:** "equals"
3. **Value 2:** `1` (OHNE Expression-Toggle!)
4. **Speichere**

---

**Status:** 🔧 **KONFIGURATION PRÜFEN** - Bitte prüfe "Sample 1?" Node-Konfiguration und korrigiere!

