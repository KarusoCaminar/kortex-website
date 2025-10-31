# 🚀 Schnell-Fix für Workflow-Probleme

## 1. test-workflows.html öffnen

### Auf GitHub Pages:
```
https://karusocaminar.github.io/kortex-website/test-workflows.html
```

**Oder lokal:**
- Doppelklick auf `test-workflows.html` im Windows Explorer
- Oder: Rechtsklick → "Öffnen mit" → Browser

---

## 2. "Failed to fetch" beheben

### Häufigste Ursachen:

#### ✅ Workflow ist nicht aktiviert
1. Öffne: `https://n8n2.kortex-system.de`
2. Gehe zu Workflow: `Business Card Extraction`
3. Aktiviere Workflow (oben rechts: "Inactive" → "Active")

#### ✅ CORS-Problem
Falls du n8n Server-Zugriff hast:
- Setze `CORS_ALLOWED_ORIGINS=*` in n8n Umgebungsvariablen
- Oder füge hinzu: `https://karusocaminar.github.io`

#### ✅ Webhook-URL ist falsch
1. In n8n: Klicke auf "Business Card Upload" Node
2. Kopiere Production URL
3. Ersetze in `kortex-n8n-modal.html` Zeilen 325, 352, 379, 942

---

## 3. Bilder werden nicht angezeigt

### Im n8n Workflow prüfen:

#### "Lade Sample 1/2/3" Nodes:
1. Klicke auf Node (z.B. "Lade Sample 1")
2. Prüfe `Response Format: File` ist aktiviert
3. Teste Node: Klicke "Execute Node"
4. Prüfe ob Binary-Daten vorhanden sind

#### "Setze Sample-Info" Node:
1. Klicke auf "Setze Sample-Info" Node
2. Prüfe Code:
   ```javascript
   const binaryData = $('Lade Sample 1').binary || $('Lade Sample 2').binary || $('Lade Sample 3').binary || $binary;
   ```
3. Stelle sicher, dass Binary weitergegeben wird:
   ```javascript
   return {
     json: { ... },
     binary: binaryData // WICHTIG!
   };
   ```

#### "AI Agent - Vertex AI" Node:
1. Klicke auf "AI Agent - Vertex AI" Node
2. Gehe zu "Attachments" Tab
3. Prüfe ob Binary-Daten verwendet werden:
   - `$binary.data` oder
   - `{{$binary}}` oder
   - `{{$('Setze Sample-Info').binary}}`

---

## 4. Visitenkarte 3 funktioniert nicht

### Mögliche Probleme:

#### ❌ "Sample 3?" IF Node prüft falsch
1. Klicke auf "Sample 3?" IF Node
2. Prüfe Condition:
   - `{{$json.query.sample}}` equals `"3"` (als String!)
   - NICHT: `3` (als Number!)

#### ❌ "Lade Sample 3" Node hat falsche URL
1. Klicke auf "Lade Sample 3" HTTP Request Node
2. Prüfe URL: `https://karusocaminar.github.io/kortex-website/samples/bc-3.jpg`
3. Teste URL direkt im Browser (sollte Bild laden)

#### ❌ Binary-Daten werden nicht weitergegeben
1. Klicke auf "Setze Sample-Info" Node
2. Prüfe ob Code Binary von "Lade Sample 3" holt:
   ```javascript
   const binaryFromSample3 = $('Lade Sample 3').binary;
   const binaryData = binaryFromSample3 || $('Lade Sample 2').binary || $('Lade Sample 1').binary || $binary;
   ```

---

## 5. Workflow direkt in n8n testen

### Test mit Sample 3:
1. Öffne Workflow in n8n
2. Klicke "Execute Workflow" (oben rechts)
3. Klicke auf "Business Card Upload" Node
4. Klicke "Test URL"
5. Füge Parameter hinzu: `?sample=3`
6. Klicke "Execute Node"
7. Prüfe jeden Node einzeln:
   - ✅ "Ist Sample?": `true`
   - ✅ "Sample 1?": `false`
   - ✅ "Sample 2?": `false`
   - ✅ "Sample 3?": `true`
   - ✅ "Lade Sample 3": Hat Binary-Daten
   - ✅ "Setze Sample-Info": Hat Binary-Daten
   - ✅ "AI Agent": Hat Attachment

---

## ✅ Checkliste

- [ ] n8n Workflow ist aktiviert
- [ ] Webhook-URL ist korrekt
- [ ] "Lade Sample X" Nodes haben `Response Format: File`
- [ ] "Setze Sample-Info" gibt Binary-Daten weiter
- [ ] "AI Agent" hat Attachments konfiguriert
- [ ] "Sample 3?" prüft `sample=3` als String
- [ ] "Lade Sample 3" URL ist korrekt
- [ ] Workflow wurde mit `?sample=3` getestet

---

## 📞 Falls nichts funktioniert:

### 1. Workflow neu importieren:
- Öffne `n8n-business-card-workflow-vertex.json`
- Importiere in n8n (File → Import)
- Aktiviere Workflow

### 2. Einfacher Test:
- Teste direkt in n8n mit "Execute Workflow"
- Prüfe jeden Node einzeln
- Schaue in die Execution-Logs

### 3. Debug-Modus:
- Öffne Browser Console (`F12`)
- Prüfe Network Tab für Requests
- Prüfe Console Tab für Fehler

