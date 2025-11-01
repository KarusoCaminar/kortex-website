# ✅ IF Nodes Manuelle Anpassung (OHNE JSON Import!)

## Ziel

**Nur die IF Nodes anpassen, ohne die komplette JSON zu importieren!**

Damit bleiben alle deine manuellen Einstellungen erhalten (Credentials, Webhooks, etc.).

---

## 📋 Schritt-für-Schritt Anleitung

### Schritt 1: "Ist Sample?" Node anpassen

1. **In n8n:** Öffne deinen Workflow
2. **Klicke auf "Ist Sample?" Node**
3. **Parameters Tab öffnen**
4. **Conditions Sektion:**
   - **Value 1:** Klicke auf das Feld
   - **FX-Symbol aktivieren** (blau, falls nicht aktiv)
   - **Lösche:** `String($json.query.sample)`
   - **Tippe:** `$json.query.sample`
   - **Sollte zeigen:** `={{$json.query.sample}}`
   - ✅ **Value 2:** bleibt `""` (leer)
   - ✅ **Operator:** bleibt `notEmpty`
5. **Options Sektion:**
   - **Type Validation:** Ändere von `strict` zu `loose`
6. **Speichern**

---

### Schritt 2: "Sample 1?" Node anpassen

1. **Klicke auf "Sample 1?" Node**
2. **Parameters Tab öffnen**
3. **Conditions Sektion:**
   - **Value 1:** Klicke auf das Feld
     - **FX-Symbol aktivieren** (blau)
     - **Lösche:** `String($json.query.sample)`
     - **Tippe:** `$json.query.sample`
     - **Sollte zeigen:** `={{$json.query.sample}}`
   - **Value 2:** Klicke auf das Feld
     - **FX-Symbol AKTIVIEREN** (blau!) ← **WICHTIG!**
     - **Tippe:** `"1"` (mit Anführungszeichen!)
     - **Sollte zeigen:** `={{ "1" }}`
   - ✅ **Operator:** bleibt `equals`
4. **Options Sektion:**
   - **Type Validation:** Ändere von `strict` zu `loose`
5. **Speichern**

---

### Schritt 3: "Sample 2?" Node anpassen

1. **Klicke auf "Sample 2?" Node**
2. **Parameters Tab öffnen**
3. **Conditions Sektion:**
   - **Value 1:**
     - FX aktivieren → `={{$json.query.sample}}`
   - **Value 2:**
     - **FX-Symbol AKTIVIEREN** (blau!)
     - **Tippe:** `"2"` (mit Anführungszeichen!)
     - **Sollte zeigen:** `={{ "2" }}`
   - ✅ **Operator:** `equals`
4. **Options Sektion:**
   - **Type Validation:** `loose`
5. **Speichern**

---

### Schritt 4: "Sample 3?" Node anpassen

1. **Klicke auf "Sample 3?" Node**
2. **Parameters Tab öffnen**
3. **Conditions Sektion:**
   - **Value 1:**
     - FX aktivieren → `={{$json.query.sample}}`
   - **Value 2:**
     - **FX-Symbol AKTIVIEREN** (blau!)
     - **Tippe:** `"3"` (mit Anführungszeichen!)
     - **Sollte zeigen:** `={{ "3" }}`
   - ✅ **Operator:** `equals`
4. **Options Sektion:**
   - **Type Validation:** `loose`
5. **Speichern**

---

## ✅ Zusammenfassung der Änderungen

| Node | Value 1 (ALT) | Value 1 (NEU) | Value 2 (ALT) | Value 2 (NEU) | Type Validation |
|------|---------------|---------------|---------------|---------------|-----------------|
| **Ist Sample?** | `={{String($json.query.sample)}}` | `={{$json.query.sample}}` | `""` | `""` (bleibt) | `strict` → `loose` |
| **Sample 1?** | `={{String($json.query.sample)}}` | `={{$json.query.sample}}` | `1` (ohne FX) | `={{ "1" }}` (MIT FX!) | `strict` → `loose` |
| **Sample 2?** | `={{String($json.query.sample)}}` | `={{$json.query.sample}}` | `2` (ohne FX) | `={{ "2" }}` (MIT FX!) | `strict` → `loose` |
| **Sample 3?** | `={{String($json.query.sample)}}` | `={{$json.query.sample}}` | `3` (ohne FX) | `={{ "3" }}` (MIT FX!) | `strict` → `loose` |

---

## 🧪 Test

1. **Workflow aktivieren**
2. **Execute Workflow** mit `sample=1`
3. **Prüfe:**
   - "Ist Sample?" → True Branch ✅
   - "Sample 1?" → True Branch ✅
   - "Lade Sample 1" → Wird ausgeführt ✅

---

## ⚠️ WICHTIG: Value 2 als Expression!

**Der kritische Punkt:** Value 2 MUSS als **Expression** eingegeben werden (FX-Symbol aktiviert!), damit die Anführungszeichen korrekt behandelt werden.

**Richtig:**
- Value 2: FX aktiviert → `={{ "1" }}`

**Falsch:**
- Value 2: FX deaktiviert → `1` (ohne Anführungszeichen) → wird als Number behandelt!

---

## 🆘 Falls Probleme

**Wenn Value 2 keine Expression akzeptiert:**

1. **Value 2:** FX aktivieren
2. **Value 2:** Tippe: `"1"` (mit Anführungszeichen)
3. **ODER:** `String(1)` → wird zu `={{String(1)}}`

---

**Das sollte funktionieren, ohne die JSON zu importieren!**

