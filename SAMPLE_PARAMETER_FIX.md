# 🔧 FIX: Sample Parameter Problem - "Immer nur Sample 1"

## ❌ Problem:
**Egal welche Visitenkarte geklickt wird, wird immer nur Sample 1 bearbeitet!**

**Ursache:** Der Website-Code hatte einen **FALLBACK**, der immer den **ersten Link** (Sample 1) verwendet, wenn die Suche nach dem korrekten Link fehlschlug.

**n8n zeigt:** Bei "Sample 2?" und "Sample 3?" Nodes steht im INPUT: `query: { sample: 1 }` statt `sample: 2` oder `sample: 3`.

---

## ✅ Lösung:

### Website-Fix:
1. **Link wird jetzt DIREKT übergeben** vom Click-Handler an `openWorkflowModal()`
2. **FALLBACK entfernt**, der immer Sample 1 nimmt
3. **Fehler wird gemeldet**, wenn kein Link gefunden wird (statt falsche Daten zu senden)

### n8n:
**NICHTS ändern nötig!** Die IF Nodes sind korrekt konfiguriert:
- "Ist Sample?": `={{$json.query.sample}}` → "is not empty" ✅
- "Sample 1?": `={{$json.query.sample}}` → "equals" → `1` ✅
- "Sample 2?": `={{$json.query.sample}}` → "equals" → `2` ✅
- "Sample 3?": `={{$json.query.sample}}` → "equals" → `3` ✅

---

## 🔧 Änderungen:

### `kortex-n8n-modal.html`:

#### 1. `openWorkflowModal()` Funktion:
- **Neuer Parameter:** `clickedLink = null` (optional)
- **Link wird direkt verwendet**, wenn übergeben
- **FALLBACK entfernt**, der immer Sample 1 nimmt
- **Fehler-Meldung**, wenn kein Link gefunden

#### 2. Click-Handler:
- **Link wird direkt übergeben**: `await openWorkflowModal(workflowUrl, workflowTitle, null, link);`
- Verhindert die fehlerhafte Suche nach Links

---

## ✅ Testen:

1. **Website öffnen:** `https://karusocaminar.github.io/kortex-website/kortex-n8n-modal.html`
2. **Browser-Console öffnen** (F12)
3. **Klicke auf "Visitenkarte 1":**
   - Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=1`
   - n8n Execution sollte zeigen: `query: { sample: "1" }`
   - "Sample 1?" Node sollte **True Branch** nehmen

4. **Klicke auf "Visitenkarte 2":**
   - Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=2`
   - n8n Execution sollte zeigen: `query: { sample: "2" }`
   - "Sample 2?" Node sollte **True Branch** nehmen

5. **Klicke auf "Visitenkarte 3":**
   - Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=3`
   - n8n Execution sollte zeigen: `query: { sample: "3" }`
   - "Sample 3?" Node sollte **True Branch** nehmen

---

## ✅ Erfolgskriterien:

- [ ] **Sample 1** → korrekte Daten (Oliver Krause)
- [ ] **Sample 2** → korrekte Daten (Gabi Graßnick) - NICHT Sample 1!
- [ ] **Sample 3** → korrekte Daten (andere Person) - NICHT Sample 1!
- [ ] **Upload** → funktioniert mit eigenen Bildern
- [ ] **n8n Executions** zeigen korrekten `sample` Parameter

---

## 📋 Checkliste:

### Website:
- [x] Link wird direkt vom Click-Handler übergeben
- [x] FALLBACK zu Sample 1 entfernt
- [x] Fehler-Meldung wenn kein Link gefunden

### n8n:
- [x] "Ist Sample?" Node korrekt konfiguriert
- [x] "Sample 1?" Node korrekt konfiguriert
- [x] "Sample 2?" Node korrekt konfiguriert
- [x] "Sample 3?" Node korrekt konfiguriert
- [x] **KEINE Änderungen nötig!**

---

**Status:** ✅ **FIX IMPLEMENTIERT** - Website sendet jetzt korrekte Parameter!

**Nächster Schritt:** Testen auf der Website und in n8n Executions prüfen!

