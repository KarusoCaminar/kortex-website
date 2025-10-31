# 🔧 KRITISCH: n8n Workflow-Konfiguration

## ❌ Problem:
Der n8n Workflow antwortet mit `{"message":"Workflow was started"}` statt die extrahierten Daten zurückzugeben.

**Webhook URL:** `https://n8n2.kortex-system.de/webhook/business-card-extraction`

**Response:** `{"message":"Workflow was started"}` ❌

**Erwartete Response:** `{"type":"business-card-processed","payload":{...}}` ✅

---

## 🔧 Lösung: n8n Workflow KONFIGURIEREN

### SCHRITT 1: Webhook Node ("Business Card Upload")

1. Öffne n8n → Workflows → "Business Card Extraction Demo - Vertex AI"
2. Klicke auf **"Business Card Upload"** (Webhook Node)
3. Öffne **"Options"** (⚙️)

4. **KRITISCH:** Prüfe **"Response Mode"**:
   - ❌ **NICHT:** "Respond Immediately" oder "Respond When First Node Finishes"
   - ✅ **MUSS:** "Respond When Last Node Finishes" (lastNode)

5. **Prüfe "Binary Data":**
   - ✅ "Binary Data" muss aktiviert sein
   - ✅ "Binary Property Name": `file` (oder leer)

6. **Speichere** den Workflow

### SCHRITT 2: "Respond to Webhook" Node ("Antwort an Website")

1. Klicke auf **"Antwort an Website"** (Respond to Webhook Node)
2. Prüfe **"Response Format"**:
   - ✅ "Respond With": `json`
   - ✅ "Response Body": `={{$json}}`

3. **Prüfe Workflow-Verknüpfung:**
   - ✅ Der Node muss **direkt nach "Formatiere für Website"** kommen
   - ✅ Der Node muss **am Ende des Workflows** sein
   - ✅ Keine Nodes kommen nach diesem Node!

### SCHRITT 3: "Formatiere für Website" Node prüfen

Der Node sollte diese Struktur zurückgeben:
```javascript
{
  json: {
    type: 'business-card-processed',
    payload: {
      name: '...',
      company: '...',
      email: '...',
      phone: '...',
      // ...
    }
  }
}
```

### SCHRITT 4: Workflow-Verknüpfung prüfen

Der Workflow muss so aussehen:

```
Business Card Upload (Webhook)
  ↓
Ist Sample? (IF)
  ├─ Sample 1? → Lade Sample 1
  ├─ Sample 2? → Lade Sample 2
  └─ Sample 3? → Lade Sample 3
  ↓
Setze Sample-Info (Code)
  ↓
AI Agent - Vertex AI
  ↓
Parse AI Agent Response (Code)
  ↓
Formatiere für Website (Code)
  ↓
Antwort an Website (Respond to Webhook) ← DER LETZTE NODE!
```

**WICHTIG:** Nach "Antwort an Website" darf KEIN weiterer Node kommen!

---

## ✅ Prüfung in n8n

### 1. Workflow aktivieren:
- ✅ Workflow muss **aktiviert** sein (grüner Button oben rechts)

### 2. Test Execution:
1. Gehe zu n8n → **Executions**
2. Öffne die **letzte Execution** des Workflows
3. Prüfe:
   - ✅ Alle Nodes sind grün (erfolgreich)?
   - ✅ "Antwort an Website" Node wurde ausgeführt?
   - ✅ "Antwort an Website" Output zeigt die extrahierten Daten?

### 3. Webhook Response prüfen:
- Öffne die Execution
- Klicke auf **"Business Card Upload"** (Webhook Node)
- Prüfe **"Response"**:
  - ✅ Zeigt `{"type":"business-card-processed","payload":{...}}`?
  - ❌ Oder nur `{"message":"Workflow was started"}`?

---

## 🔧 Wenn es IMMER NOCH nicht funktioniert:

### Option A: Webhook Node komplett neu konfigurieren

1. **Lösche** den "Business Card Upload" Webhook Node
2. **Füge neuen Webhook Node** hinzu
3. **Konfiguriere:**
   - Path: `business-card-extraction`
   - Response Mode: **"Respond When Last Node Finishes"** (lastNode)
   - Binary Data: ✅ aktiviert
4. **Verbinde** wieder alle Nodes
5. **Speichere** und **aktiviere** Workflow

### Option B: "Respond to Webhook" Node prüfen

1. Öffne **"Antwort an Website"** Node
2. Prüfe **"Response Body":**
   - Aktuell: `={{$json}}`
   - Versuche: `={{JSON.stringify($json)}}` (falls nötig)

3. Prüfe **"Response Format":**
   - ✅ "Respond With": `json`
   - ❌ NICHT: `text` oder `file`

---

## 🐛 Debugging

### Browser Console (F12):
```
✅ Workflow Response: {...}
📊 Response Struktur: {...}
⚠️ Workflow läuft asynchron - warte auf finale Antwort...
```

### n8n Execution Logs:
1. Gehe zu n8n → Executions
2. Öffne letzte Execution
3. Prüfe "Antwort an Website" Node Output
4. Kopiere die Response

### Expected Response Format:
```json
{
  "json": {
    "type": "business-card-processed",
    "payload": {
      "name": "...",
      "company": "...",
      "email": "...",
      "phone": "...",
      "address": "...",
      "city": "...",
      "source": "Sample 1" | "Upload",
      "timestamp": "..."
    }
  }
}
```

**ODER direkt:**
```json
{
  "type": "business-card-processed",
  "payload": {
    "name": "...",
    "company": "...",
    "email": "...",
    "phone": "...",
    "address": "...",
    "city": "...",
    "source": "Sample 1" | "Upload",
    "timestamp": "..."
  }
}
```

---

## 📋 Checkliste

- [ ] Webhook Node: "Response Mode" = **"lastNode"**
- [ ] Webhook Node: "Binary Data" = **aktiviert**
- [ ] "Respond to Webhook" Node: Am **Ende** des Workflows
- [ ] "Respond to Webhook" Node: "Response Body" = `={{$json}}`
- [ ] Workflow ist **aktiviert** (grüner Button)
- [ ] Alle Nodes in Execution sind **grün** (erfolgreich)
- [ ] "Antwort an Website" Node wurde **ausgeführt**
- [ ] "Antwort an Website" Output zeigt **extrahierte Daten**

---

**Status:** ⚠️ **KRITISCH** - n8n Workflow-Konfiguration muss geprüft werden!

Der Code auf der Website ist korrekt, aber der n8n Workflow muss so konfiguriert sein, dass er die finalen Daten zurückgibt, nicht nur "Workflow was started".

