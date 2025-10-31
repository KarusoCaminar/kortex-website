# 🔧 n8n Sample Parameter Type Fix

## ❌ Problem:
Der `sample` Parameter kommt als **Number** `1` an, aber die IF Nodes prüfen auf **String** `"1"`, `"2"`, `"3"`.

**n8n zeigt im INPUT:**
```
params
  query
    sample
      1  ← Number, nicht String "1"
```

**IF Nodes prüfen:**
- `={{$json.query.sample}}` equals `"1"` (String)
- `={{$json.query.sample}}` equals `"2"` (String)
- `={{$json.query.sample}}` equals `"3"` (String)

---

## ✅ Lösung:

### Option A: IF Nodes auf Number umstellen (NICHT empfohlen)

**Problem:** n8n IF Nodes können sowohl String als auch Number vergleichen, ABER:
- Wenn URL-Parameter als Number kommen, funktioniert der Vergleich trotzdem
- ABER: Es ist besser, konsistent Strings zu verwenden

### Option B: Parameter als String forcieren (EMPFOHLEN)

**Fix:** In den IF Nodes `value1` anpassen, um den Parameter als String zu konvertieren:

**"Sample 1?" Node:**
- Value 1: `={{String($json.query.sample)}}` (statt `={{$json.query.sample}}`)
- Operator: "equals"
- Value 2: `1` (bleibt als String)

**"Sample 2?" Node:**
- Value 1: `={{String($json.query.sample)}}`
- Operator: "equals"
- Value 2: `2`

**"Sample 3?" Node:**
- Value 1: `={{String($json.query.sample)}}`
- Operator: "equals"
- Value 2: `3`

---

## ✅ Alternative: Parameter in "Setze Sample-Info" Node konvertieren

**Fix:** In der "Setze Sample-Info" Code Node den Parameter als String forcieren:

```javascript
// Aktuell:
const sample = $json.query?.sample || '';

// Fix:
const sample = String($json.query?.sample || '');
```

**ABER:** Das hilft nicht bei den IF Nodes, da diese VOR "Setze Sample-Info" laufen.

---

## ✅ Beste Lösung: IF Nodes anpassen

### SCHRITT 1: "Sample 1?" Node

1. Öffne n8n → Workflows → "Business Card Extraction Demo - Vertex AI"
2. Klicke auf **"Sample 1?"** Node
3. **Parameters** Tab → **Conditions** Section

4. **Value 1 ändern:**
   - Aktuell: `={{$json.query.sample}}`
   - Neu: `={{String($json.query.sample)}}`
   - Expression-Toggle muss aktiviert sein (fx Symbol)

5. **Value 2:** `1` (bleibt als String, OHNE Expression)
6. **Operator:** "equals"
7. **Speichere**

---

### SCHRITT 2: "Sample 2?" Node

1. Klicke auf **"Sample 2?"** Node
2. **Parameters** Tab → **Conditions** Section

3. **Value 1 ändern:**
   - Aktuell: `={{$json.query.sample}}`
   - Neu: `={{String($json.query.sample)}}`
   - Expression-Toggle muss aktiviert sein (fx Symbol)

4. **Value 2:** `2` (bleibt als String, OHNE Expression)
5. **Operator:** "equals"
6. **Speichere**

---

### SCHRITT 3: "Sample 3?" Node

1. Klicke auf **"Sample 3?"** Node
2. **Parameters** Tab → **Conditions** Section

3. **Value 1 ändern:**
   - Aktuell: `={{$json.query.sample}}`
   - Neu: `={{String($json.query.sample)}}`
   - Expression-Toggle muss aktiviert sein (fx Symbol)

4. **Value 2:** `3` (bleibt als String, OHNE Expression)
5. **Operator:** "equals"
6. **Speichere**

---

## ✅ ODER: Operator auf Number-Vergleich ändern

**Alternative:** Statt String-Konvertierung können wir den Operator ändern:

**"Sample 1?" Node:**
- Value 1: `={{$json.query.sample}}` (bleibt Number)
- Operator: "equals" (funktioniert mit Number und String)
- Value 2: `={{1}}` (als Expression, als Number)

**ABER:** Dies ist NICHT empfohlen, da URL-Parameter normalerweise als String kommen sollten.

---

## ✅ Testen:

1. **Workflow speichern**
2. **Workflow aktivieren**
3. **Teste auf Website:**
   - Klicke auf "Visitenkarte 1" → sollte Sample 1 laden
   - Klicke auf "Visitenkarte 2" → sollte Sample 2 laden
   - Klicke auf "Visitenkarte 3" → sollte Sample 3 laden

4. **Prüfe n8n Executions:**
   - "Sample 1?" Node → sollte True Branch nehmen (für `sample=1`)
   - "Sample 2?" Node → sollte True Branch nehmen (für `sample=2`)
   - "Sample 3?" Node → sollte True Branch nehmen (für `sample=3`)

---

## 📋 Checkliste:

**Option A: String-Konvertierung (EMPFOHLEN):**
- [ ] "Sample 1?" Value 1: `={{String($json.query.sample)}}`
- [ ] "Sample 2?" Value 1: `={{String($json.query.sample)}}`
- [ ] "Sample 3?" Value 1: `={{String($json.query.sample)}}`
- [ ] Alle Value 2 bleiben: `1`, `2`, `3` (als String)

**Option B: Number-Vergleich (ALTERNATIVE):**
- [ ] "Sample 1?" Value 2: `={{1}}` (als Expression)
- [ ] "Sample 2?" Value 2: `={{2}}` (als Expression)
- [ ] "Sample 3?" Value 2: `={{3}}` (als Expression)

---

**Status:** ⚠️ **KONVERTIERUNG ERFORDERLICH** - Parameter kommt als Number an, IF Nodes prüfen auf String!

**Empfehlung:** String-Konvertierung in IF Nodes (Option A) ist die sicherste Lösung!

