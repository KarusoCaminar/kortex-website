# 🔍 OUTPUT-Check: "Sample 1?" Node

## ✅ INPUT ist korrekt:
```json
{
  "query": {
    "sample": "1"  ← String "1" ✅
  }
}
```

---

## 🔍 JETZT prüfen: OUTPUT

### SCHRITT 1: OUTPUT Tab öffnen

1. **Im "Sample 1?" Node:**
   - Du bist bereits im Node
   - Klicke auf **"OUTPUT"** Tab (oben rechts, neben "INPUT" und "Parameters")

---

### SCHRITT 2: Branches prüfen

Im OUTPUT Tab siehst du zwei Branches:

1. **"True Branch"** (grün/top) - sollte Daten haben wenn `sample === "1"`
2. **"False Branch"** (rot/bottom) - sollte leer sein wenn `sample === "1"`

**Frage:**
- Welcher Branch hat Daten? (True oder False?)
- Welcher Branch ist leer? (True oder False?)

---

## 🔧 Wenn False Branch Daten hat:

Das bedeutet: Die Bedingung schlägt fehl!

**Prüfe jetzt:**

### 1. Value 1 Expression prüfen:

1. **Gehe zu "Parameters" Tab → Conditions**
2. **Value 1:** Was steht dort genau?
   - Muss sein: `={{String($json.query.sample)}}` oder `={{$json.query.sample}}`
   - Expression-Toggle muss aktiviert sein (fx Symbol)
   - NICHT: `$json.query.sample` (ohne `={{}}`)
   - NICHT: `{{String($json.query.sample)}}` (ohne `=`)

### 2. Operator prüfen:

**Operator:** Muss sein: **"equals"** oder **"is equal to"**
- NICHT: "is not empty" (das ist für "Ist Sample?")

### 3. Value 2 prüfen:

**Value 2:** Was steht dort genau?
- Muss sein: `1` (OHNE Expression-Toggle!)
- NICHT: `={{1}}` (mit Expression-Toggle)
- NICHT: `"1"` (mit Anführungszeichen)
- NICHT: `1` (als Number, wenn Expression-Toggle aktiviert ist)

---

## ✅ Korrekte Konfiguration:

### "Sample 1?" Node - Parameters → Conditions:

```
Value 1:  ={{String($json.query.sample)}}
           ↑ Expression-Toggle aktiviert (fx Symbol)

Operator: equals
           ↑ ODER "is equal to"

Value 2:  1
           ↑ OHNE Expression-Toggle! Einfach "1" tippen
```

---

## 🔧 Mögliche Fixes:

### Fix 1: Expression-Syntax korrigieren

**Wenn Value 1 nicht korrekt ist:**

1. Klicke auf **Value 1** Feld
2. **Aktiviere Expression-Toggle** (fx Symbol) - muss aktiviert sein!
3. Tippe: `String($json.query.sample)`
4. Sollte automatisch zu `={{String($json.query.sample)}}` werden
5. **Speichere**

---

### Fix 2: Value 2 korrigieren

**Wenn Value 2 nicht korrekt ist:**

1. Klicke auf **Value 2** Feld
2. **DEAKTIVIERE Expression-Toggle** (fx Symbol) - muss DEAKTIVIERT sein!
3. Lösche alles im Feld
4. Tippe einfach: `1` (nur die Zahl!)
5. NICHT: `"1"` (ohne Anführungszeichen!)
6. NICHT: `={{1}}` (ohne Expression!)
7. **Speichere**

---

### Fix 3: Operator korrigieren

**Wenn Operator nicht korrekt ist:**

1. Klicke auf **Operator** Dropdown
2. Wähle: **"equals"** (ODER "is equal to")
3. NICHT: "is not empty" (das ist falsch!)
4. **Speichere**

---

### Fix 4: Ohne String() versuchen (ALTERNATIVE)

**Wenn String() nicht funktioniert:**

1. **Value 1:** Ändere zu `={{$json.query.sample}}` (ohne String())
2. **Operator:** "equals"
3. **Value 2:** `1` (OHNE Expression)
4. **Speichere**

---

## 📋 Checkliste:

**"Sample 1?" Node - OUTPUT:**
- [ ] True Branch hat Daten? (Wenn JA → Node funktioniert!)
- [ ] False Branch hat Daten? (Wenn JA → Node schlägt fehl!)

**"Sample 1?" Node - Parameters → Conditions:**
- [ ] Value 1: `={{String($json.query.sample)}}` oder `={{$json.query.sample}}`?
- [ ] Expression-Toggle aktiviert? (fx Symbol muss aktiviert sein!)
- [ ] Operator: "equals" oder "is equal to"?
- [ ] Value 2: `1` (OHNE Expression-Toggle!)?
- [ ] Value 2: NICHT `={{1}}` (OHNE Expression!)?

---

**Status:** 🔍 **OUTPUT CHECK ERFORDERLICH** - Bitte prüfe welcher Branch Daten hat!

