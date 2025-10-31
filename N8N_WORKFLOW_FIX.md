# 🔧 n8n Workflow - Komplette Fehlerbehebung

## Problem 1: "Cannot read properties of undefined (reading 'includes')"

### Im n8n Workflow beheben:

1. **Öffne n8n:** `https://n8n2.kortex-system.de`

2. **Öffne Workflow:** `Business Card Extraction`

3. **Klicke auf "AI Agent - Vertex AI" Node**

4. **Gehe zu "Settings" Tab**

5. **Prüfe "Tools" Sektion:**
   - Falls Tools vorhanden: **ENTFERNE ALLE TOOLS** ❌
   - Der AI Agent sollte **KEINE Tools** haben ✅

6. **Klicke "Save"**

**Warum?** Der Fehler kommt von Tools-Konfiguration im AI Agent Node. Für Visitenkarten-Extraktion werden keine Tools benötigt.

---

## Problem 2: Adresse wird nicht extrahiert

### Prompt verbessern im AI Agent Node:

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Gehe zu "Parameters" Tab**

3. **Ersetze den Prompt durch:**

```
Extrahiere alle Kontaktdaten aus dieser Visitenkarte und gib sie als strukturiertes JSON zurück.

WICHTIG: Achte besonders auf die vollständige Adresse! Wenn eine Adresse auf der Visitenkarte zu sehen ist, extrahiere sie IMMER komplett.

Erforderliche Felder:
- name: Vollständiger Name (Vor- und Nachname)
- company: Firma/Unternehmen
- email: E-Mail-Adresse (vollständig mit @)
- phone: Haupttelefonnummer (Mobil bevorzugt, mit Vorwahl)
- phone_office: Bürotelefonnummer (optional, mit Vorwahl)
- address: VOLLSTÄNDIGE Straße und Hausnummer (z.B. "Musterstraße 12")
- city: Postleitzahl UND Stadt (z.B. "12345 Musterstadt")
- website: Website-URL (optional)
- job_title: Berufsbezeichnung/Position (optional)

BESONDERS WICHTIG für Adresse:
- Wenn Adresse vorhanden ist, extrahiere sie IMMER vollständig
- Kombiniere Straße und Hausnummer zu "address"
- Kombiniere PLZ und Stadt zu "city"
- Falls nur PLZ oder nur Stadt vorhanden, verwende das vorhandene Feld

Gib NUR valides JSON zurück, kein zusätzlicher Text, kein Markdown.

Beispiel:
{
  "name": "Max Mustermann",
  "company": "Beispiel GmbH",
  "email": "max@beispiel.de",
  "phone": "+49 123 456789",
  "address": "Musterstraße 12",
  "city": "12345 Musterstadt"
}
```

4. **Klicke "Save"**

---

## Problem 3: Upload-Fenster funktioniert nicht

### Im n8n Workflow prüfen:

#### 1. Webhook Binary-Property:
1. **Klicke auf "Business Card Upload" Webhook Node**
2. **Prüfe "Binary Data" Option:**
   - ✅ **"Binary Data"** muss aktiviert sein
   - **Binary Property Name:** `file` (oder leer lassen)
3. **Klicke "Options" (⚙️):**
   - ✅ **"Continue Workflow after Webhook Response"** aktiviert

#### 2. "Setze Sample-Info" Node verbessern:
1. **Klicke auf "Setze Sample-Info" Code Node**
2. **Ersetze den Code durch:**

```javascript
// Setze Sample-Nummer für nachfolgende Verarbeitung
const sample = $json.query?.sample || '';

// WICHTIG: Binary-Daten explizit weitergeben!
let binaryData = $binary;

// Für Upload: Binary kommt direkt vom Webhook
// Für Samples: Binary kommt vom HTTP Request Node
if (!binaryData || (typeof binaryData === 'object' && Object.keys(binaryData || {}).length === 0)) {
  try {
    // Für Upload: Hole Binary vom Webhook
    if (!sample) {
      const webhookNode = $('Business Card Upload');
      if (webhookNode && webhookNode.binary) {
        binaryData = webhookNode.binary;
      } else if (webhookNode && webhookNode.item && webhookNode.item.binary) {
        binaryData = webhookNode.item.binary;
      } else if (webhookNode && webhookNode.item && webhookNode.item.binary && webhookNode.item.binary.file) {
        binaryData = { data: webhookNode.item.binary.file };
      }
    }
    
    // Für Samples: Hole Binary vom HTTP Request Node
    if (sample === '1') {
      const sampleNode = $('Lade Sample 1');
      if (sampleNode && sampleNode.binary) {
        binaryData = sampleNode.binary;
      } else if (sampleNode && sampleNode.item && sampleNode.item.binary) {
        binaryData = sampleNode.item.binary;
      }
    } else if (sample === '2') {
      const sampleNode = $('Lade Sample 2');
      if (sampleNode && sampleNode.binary) {
        binaryData = sampleNode.binary;
      } else if (sampleNode && sampleNode.item && sampleNode.item.binary) {
        binaryData = sampleNode.item.binary;
      }
    } else if (sample === '3') {
      const sampleNode = $('Lade Sample 3');
      if (sampleNode && sampleNode.binary) {
        binaryData = sampleNode.binary;
      } else if (sampleNode && sampleNode.item && sampleNode.item.binary) {
        binaryData = sampleNode.item.binary;
      }
    }
  } catch (e) {
    console.error('Fehler beim Laden der Binary-Daten:', e);
  }
}

// Stelle sicher, dass Binary vorhanden ist
if (!binaryData || (typeof binaryData === 'object' && Object.keys(binaryData || {}).length === 0)) {
  console.error('❌ Binary-Daten fehlen!');
  console.error('Sample:', sample);
  console.error('Binary:', binaryData);
  throw new Error('Binary-Daten fehlen! Prüfe Webhook oder HTTP Request Node.');
}

return {
  json: {
    sample: sample,
    source: sample ? `Sample ${sample}` : 'Upload'
  },
  // Binary explizit weitergeben - WICHTIG für AI Agent!
  binary: binaryData
};
```

3. **Klicke "Save"**

---

## Problem 4: Visitenkarte 3 funktioniert nicht

### 1. "Sample 3?" IF Node prüfen:
1. **Klicke auf "Sample 3?" IF Node**
2. **Prüfe Condition:**
   - **Field:** `{{$json.query.sample}}`
   - **Operation:** `equals`
   - **Value:** `"3"` (als **String**, NICHT `3`)
3. **Teste Node:** Klicke "Execute Node" mit `sample=3` Parameter

### 2. "Lade Sample 3" Node prüfen:
1. **Klicke auf "Lade Sample 3" HTTP Request Node**
2. **Prüfe URL:** `https://karusocaminar.github.io/kortex-website/samples/bc-3.jpg`
3. **Prüfe `Response Format: File`** ist aktiviert
4. **Teste Node:** Klicke "Execute Node"
5. **Prüfe Output:** Sollte Binary-Daten enthalten

### 3. Workflow-Logik prüfen:
Der Workflow sollte so aussehen:

```
Webhook → Ist Sample? (Ja) → Sample 1? (Nein) → Sample 2? (Nein) → Sample 3? (Ja) → Lade Sample 3 → Setze Sample-Info → AI Agent
```

**Prüfe jeden IF Node einzeln:**
- ✅ "Ist Sample?": Prüft ob `query.sample` vorhanden ist
- ✅ "Sample 1?": Prüft ob `sample === "1"`
- ✅ "Sample 2?": Prüft ob `sample === "2"`
- ✅ "Sample 3?": Prüft ob `sample === "3"`

---

## Problem 5: AI Agent Attachments

### Prüfe AI Agent Node Attachments:

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Gehe zu "Parameters" Tab**

3. **Prüfe "Attachments" Sektion:**

**Sollte sein:**
```javascript
{
  "name": "business-card",
  "data": "={{ $binary.data || $binary.file || $binary }}",
  "mimeType": "={{ $binary.data?.mimeType || $binary.file?.mimeType || $binary.mimeType || 'image/jpeg' }}"
}
```

**Falls nicht vorhanden:**
1. Klicke auf "Add Attachment"
2. Name: `business-card`
3. Data: `={{ $binary.data || $binary.file || $binary }}`
4. MIME Type: `={{ $binary.data?.mimeType || $binary.file?.mimeType || $binary.mimeType || 'image/jpeg' }}`

5. **Klicke "Save"**

---

## ✅ Vollständige Checkliste

### AI Agent:
- [ ] Tools entfernt (falls vorhanden)
- [ ] Prompt verbessert (siehe Problem 2)
- [ ] Attachments konfiguriert
- [ ] Chat Model ist konfiguriert (Vertex AI Gemini)

### Binary-Daten:
- [ ] Webhook Binary-Property ist `file`
- [ ] "Setze Sample-Info" Node gibt Binary weiter (siehe Problem 3)
- [ ] AI Agent Attachments nutzen `$binary`

### Workflow-Logik:
- [ ] "Ist Sample?" IF Node prüft korrekt
- [ ] "Sample 1/2/3?" IF Nodes prüfen Strings (`"1"`, `"2"`, `"3"`)
- [ ] "Lade Sample 1/2/3" Nodes haben korrekte URLs
- [ ] "Lade Sample X" Nodes haben `Response Format: File`

### Tests:
- [ ] Test mit `?sample=1` → funktioniert
- [ ] Test mit `?sample=2` → funktioniert
- [ ] Test mit `?sample=3` → funktioniert
- [ ] Test mit Upload → funktioniert
- [ ] Adresse wird extrahiert (in allen Tests)

---

## 🚀 Test-Anleitung

### 1. Einzelne Nodes testen:
In n8n:
1. Klicke "Execute Workflow" (oben rechts)
2. Klicke auf Node
3. Klicke "Execute Node"
4. Prüfe Output

### 2. Vollständiger Workflow-Test:
1. Teste Webhook direkt im Browser:
   ```
   https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
   ```
2. Prüfe Response: Sollte JSON mit Kontaktdaten sein

### 3. Upload-Test:
1. Öffne `kortex-n8n-modal.html`
2. Klicke auf "Eigene Visitenkarte hochladen"
3. Wähle Datei
4. Prüfe ob Workflow läuft

---

## 📞 Falls nichts funktioniert:

1. **Workflow neu importieren:**
   - Öffne `n8n-business-card-workflow-vertex.json`
   - In n8n: File → Import
   - Aktiviere Workflow
   - Konfiguriere Chat Model neu

2. **Einzeln testen:**
   - Teste jeden Node einzeln
   - Prüfe Execution Logs
   - Schaue in Browser Console (F12)

