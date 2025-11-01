# 📥 Workflow JSON Import - Schritt-für-Schritt Anleitung

## Welches JSON musst du importieren?

### Schritt 1: Erstes JSON importieren (DEBUG)

**Datei:** `n8n-business-card-workflow-vertex-DEBUG.json`

1. **n8n öffnen**
2. **Workflows** → **Import from File**
3. **`n8n-business-card-workflow-vertex-DEBUG.json`** auswählen
4. **Import**

**Das ist das JSON mit Debug-Nodes zum Testen.**

---

### Schritt 2: Automatische Fixes anwenden

**Jetzt fixe das JSON automatisch:**

```bash
node auto-fix-workflow.js
```

- Wendet automatische Fixes an
- Erstellt `n8n-business-card-workflow-vertex-FIXED.json`

---

### Schritt 3: Gefixtes JSON importieren

**Datei:** `n8n-business-card-workflow-vertex-FIXED.json`

1. **n8n öffnen**
2. **Workflows** → **Import from File**
3. **`n8n-business-card-workflow-vertex-FIXED.json`** auswählen
4. **Import** (überschreibt das vorherige)

**ODER:** Du kannst auch das gefixte JSON direkt importieren (überspringt Schritt 2).

---

### Schritt 4: Workflow aktivieren

1. **Oben rechts:** **"Active" Toggle aktivieren** ✅
2. **Workflow speichern**

---

### Schritt 5: Manuelle Fixes in n8n UI (WICHTIG!)

**Befolge:** `MANUAL_FIXES_REQUIRED.md`

1. **"Require Specific Output Format" aktivieren** (AI Agent Node)
2. **Structured Output Parser als SUB-NODE hinzufügen** (am AI Agent)
3. **JSON Schema im Parser konfigurieren**

---

### Schritt 6: Testen starten

**Automatisches Test-System:**

```bash
node auto-test-workflow.js
```

- Triggert n8n Webhook für Sample 1, 2, 3
- Erstellt `test-responses.json` und `test-report.json`

**ODER: Vollautomatischer Loop:**

```bash
node auto-debug-loop.js
```

- Test → Analyse → Fix → Test (automatisch)

---

## Zusammenfassung

### Reihenfolge:

1. ✅ **`n8n-business-card-workflow-vertex-DEBUG.json`** in n8n importieren
2. ✅ **Automatische Fixes anwenden:** `node auto-fix-workflow.js`
3. ✅ **`n8n-business-card-workflow-vertex-FIXED.json`** in n8n importieren
4. ✅ **Workflow aktivieren** (Active Toggle)
5. ✅ **Manuelle Fixes** (siehe `MANUAL_FIXES_REQUIRED.md`)
6. ✅ **Testen:** `node auto-test-workflow.js` oder `node auto-debug-loop.js`

---

## Welches JSON solltest du importieren?

### Option 1: Direkt das gefixte JSON (empfohlen)

**`n8n-business-card-workflow-vertex-FIXED.json`**

- Enthält bereits alle automatischen Fixes
- Direkt einsatzbereit

### Option 2: Erst DEBUG, dann fixen

1. **`n8n-business-card-workflow-vertex-DEBUG.json`** importieren
2. **`node auto-fix-workflow.js`** ausführen
3. **`n8n-business-card-workflow-vertex-FIXED.json`** importieren

---

**Wichtig:** Nach dem Import musst du **immer die manuellen Fixes** in n8n UI machen (siehe `MANUAL_FIXES_REQUIRED.md`)!

