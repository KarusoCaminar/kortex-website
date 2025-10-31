# 🧪 Test: "Sample 1?" Node direkt ausführen

## ✅ Konfiguration sieht korrekt aus:
- **Value 1:** `={{String($json.query.sample)}}` ✅
- **Operator:** "is equal to" ✅
- **Value 2:** `1` ✅

**ABER:** Workflow landet trotzdem im False Branch!

---

## 🔍 JETZT TESTEN:

### SCHRITT 1: "Sample 1?" Node direkt ausführen

1. **Im "Sample 1?" Node:**
   - Du bist bereits im Node
   - **Klicke auf "Execute step"** (roter Button oben rechts)

---

### SCHRITT 2: OUTPUT prüfen

1. **Nach "Execute step":**
   - **Gehe zu "OUTPUT" Tab** (oben rechts, neben "INPUT" und "Parameters")

2. **Prüfe Branches:**
   - **True Branch:** Hat Daten? (sollte haben!)
   - **False Branch:** Hat Daten? (sollte leer sein!)

---

### SCHRITT 3: Value 2 Expression-Toggle prüfen

**KRITISCH:** Value 2 darf KEINEN Expression-Toggle haben!

1. **Gehe zu "Parameters" Tab → Conditions**
2. **Klicke auf Value 2 Feld**
3. **Prüfe:**
   - Expression-Toggle (fx Symbol) ist DEAKTIVIERT? ✅
   - ODER Expression-Toggle (fx Symbol) ist aktiviert? ❌ (Problem!)

**Wenn Expression-Toggle aktiviert ist:**
1. **DEAKTIVIERE Expression-Toggle** (klicke auf fx Symbol)
2. **Lösche alles im Feld**
3. **Tippe einfach:** `1`
4. **Speichere**

---

## 🔧 Mögliche Fixes:

### Fix 1: Value 2 Expression-Toggle deaktivieren

**Problem:** Value 2 hat Expression-Toggle aktiviert (zeigt `={{1}}` statt `1`)

**Lösung:**
1. Klicke auf **Value 2** Feld
2. **DEAKTIVIERE Expression-Toggle** (fx Symbol)
3. Lösche alles
4. Tippe: `1` (nur die Zahl!)
5. **Speichere**

---

### Fix 2: Operator ändern

**Problem:** Operator "is equal to" funktioniert vielleicht nicht

**Lösung:**
1. Klicke auf **Operator** Dropdown
2. Wähle: **"equals"** (statt "is equal to")
3. **Speichere**

---

### Fix 3: Ohne String() versuchen

**Problem:** String() funktioniert vielleicht nicht wie erwartet

**Lösung:**
1. **Value 1:** Ändere zu `={{$json.query.sample}}` (ohne String())
2. **Operator:** "equals"
3. **Value 2:** `1` (OHNE Expression-Toggle!)
4. **Speichere**

---

### Fix 4: Value 2 als Expression (ALTERNATIVE)

**Problem:** Value 2 ohne Expression funktioniert vielleicht nicht

**Lösung:**
1. **Value 1:** `={{String($json.query.sample)}}`
2. **Operator:** "equals"
3. **Value 2:** Aktiviere Expression-Toggle!
4. Tippe: `1`
5. Sollte zu `={{1}}` werden
6. **Speichere**

---

## ✅ Korrekte Konfigurationen:

### Konfiguration 1: Value 2 OHNE Expression (EMPFOHLEN)
```
Value 1:  ={{String($json.query.sample)}}
           ↑ Expression-Toggle AKTIVIERT

Operator: equals
           ↑ ODER "is equal to"

Value 2:  1
           ↑ OHNE Expression-Toggle!
           ↑ Expression-Toggle DEAKTIVIERT!
```

### Konfiguration 2: Value 2 MIT Expression (ALTERNATIVE)
```
Value 1:  ={{String($json.query.sample)}}
           ↑ Expression-Toggle AKTIVIERT

Operator: equals
           ↑ ODER "is equal to"

Value 2:  ={{1}}
           ↑ MIT Expression-Toggle!
           ↑ Expression-Toggle AKTIVIERT!
```

---

## 🧪 Test-Plan:

1. **"Sample 1?" Node direkt testen:**
   - Klicke auf "Sample 1?" Node
   - Klicke "Execute step"
   - Prüfe OUTPUT: True Branch hat Daten? (sollte haben!)
   - False Branch ist leer? (sollte leer sein!)

2. **Value 2 Expression-Toggle prüfen:**
   - Ist Value 2 Expression-Toggle aktiviert oder deaktiviert?
   - Wenn aktiviert: Deaktivieren und nur `1` eintragen
   - Wenn deaktiviert: Versuche aktivieren und `={{1}}` eintragen

3. **Workflow komplett testen:**
   - Workflow speichern
   - Workflow aktivieren
   - Auf Website "Visitenkarte 1" klicken
   - In n8n Execution prüfen: "Sample 1?" sollte True Branch nehmen

---

## 📋 Checkliste:

**"Sample 1?" Node - Parameters → Conditions:**
- [ ] Value 1: `={{String($json.query.sample)}}`?
- [ ] Value 1 Expression-Toggle AKTIVIERT? (fx Symbol aktiviert?)
- [ ] Operator: "equals" oder "is equal to"?
- [ ] Value 2: `1` (OHNE Expression) ODER `={{1}}` (MIT Expression)?
- [ ] Value 2 Expression-Toggle korrekt? (entweder aktiviert ODER deaktiviert, nicht beides!)

**"Sample 1?" Node - OUTPUT nach "Execute step":**
- [ ] True Branch hat Daten? (sollte haben!)
- [ ] False Branch ist leer? (sollte leer sein!)

---

**Status:** 🧪 **TEST ERFORDERLICH** - Bitte "Execute step" klicken und OUTPUT prüfen!

