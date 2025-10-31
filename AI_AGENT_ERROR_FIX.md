# 🔧 AI Agent Fehler beheben: "Cannot read properties of undefined (reading 'includes')"

## Problem

Der Fehler `Cannot read properties of undefined (reading 'includes')` tritt im AI Agent Node auf, Zeile 313 im ToolsAgent Code.

**Ursache:** Der AI Agent Node hat Tools konfiguriert, aber die Tools-Konfiguration ist falsch oder undefined.

---

## Lösung 1: Tools im AI Agent Node entfernen (EMPFOHLEN)

### Warum?
Für die Visitenkarten-Extraktion werden **KEINE Tools** benötigt. Der AI Agent sollte direkt die Bilder verarbeiten.

### Schritte:

1. **Öffne n8n:** `https://n8n2.kortex-system.de`

2. **Öffne Workflow:** `Business Card Extraction`

3. **Klicke auf "AI Agent - Vertex AI" Node**

4. **Gehe zu "Settings" Tab** (oder "Options" Tab)

5. **Prüfe "Tools" Sektion:**
   - Falls Tools hinzugefügt sind: **ENTFERNE ALLE TOOLS**
   - Der AI Agent sollte **KEINE Tools** haben für diese Extraktion

6. **Klicke "Save"**

7. **Teste Workflow erneut**

---

## Lösung 2: Tools korrekt konfigurieren (falls benötigt)

Falls Tools wirklich benötigt werden:

### 1. Tool-Name prüfen
- Jedes Tool muss einen **Namen** haben
- Der Name darf **NICHT undefined** sein

### 2. Tool-Konfiguration prüfen
Im AI Agent Node → Settings → Tools:
- **Tool Name:** Muss vorhanden sein (z.B. "extract_text")
- **Tool Description:** Muss vorhanden sein
- **Tool Code:** Muss korrekt sein

### 3. Tool-Fehler prüfen
- Prüfe ob Tool-Code Syntax-Fehler hat
- Prüfe ob Tool auf undefined-Werte zugreift

---

## Problem 2: Adresse wird nicht extrahiert

### Ursache:
Der Prompt fordert zwar die Adresse an, aber die KI extrahiert sie nicht korrekt.

### Lösung: Prompt verbessern

Im **"AI Agent - Vertex AI" Node → Parameters Tab → Text:**

**Aktueller Prompt:**
```
Extrahiere alle Kontaktdaten aus dieser Visitenkarte...
- address: Straße und Hausnummer
- city: Postleitzahl und Stadt
```

**Verbesserter Prompt:**
```
Extrahiere alle Kontaktdaten aus dieser Visitenkarte und gib sie als strukturiertes JSON zurück.

WICHTIG: Achte besonders auf die vollständige Adresse!

Erforderliche Felder:
- name: Vollständiger Name (Vor- und Nachname)
- company: Firma/Unternehmen
- email: E-Mail-Adresse (vollständig mit @)
- phone: Haupttelefonnummer (Mobil bevorzugt, mit Vorwahl)
- phone_office: Bürotelefonnummer (optional, mit Vorwahl)
- address: VOLLSTÄNDIGE Straße und Hausnummer (z.B. "Musterstraße 12")
- city: Postleitzahl UND Stadt (z.B. "12345 Musterstadt" oder "12345, Musterstadt")
- website: Website-URL (optional, vollständig mit http:// oder https://)
- job_title: Berufsbezeichnung/Position (optional)

BESONDERS WICHTIG für Adresse:
- Wenn Adresse vorhanden ist, extrahiere SIE IMMER vollständig
- Kombiniere Straße und Hausnummer zu einem Feld "address"
- Kombiniere PLZ und Stadt zu einem Feld "city"
- Falls nur PLZ oder nur Stadt vorhanden, verwende das vorhandene Feld

Gib NUR valides JSON zurück, kein zusätzlicher Text, kein Markdown-Formatting.

Beispiel-Format:
{
  "name": "Max Mustermann",
  "company": "Beispiel GmbH",
  "email": "max@beispiel.de",
  "phone": "+49 123 456789",
  "address": "Musterstraße 12",
  "city": "12345 Musterstadt"
}
```

---

## Problem 3: Upload-Fenster funktioniert nicht

### Ursachen:
1. File Input wird nicht korrekt getriggert
2. Binary-Daten werden nicht korrekt weitergegeben
3. Webhook erwartet Binary-Daten aber erhält keine

### Lösung:

#### 1. File Input Handler prüfen
In `kortex-n8n-modal.html` prüfe den File Input Handler (ca. Zeile 924):

```javascript
if (fileInput) {
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validiere Datei
    if (!file.type.startsWith('image/')) {
      alert('⚠️ Bitte laden Sie nur Bilddateien (JPG, PNG) hoch!');
      fileInput.value = '';
      return;
    }
    
    // ... Rest des Codes
  });
}
```

**Prüfe:**
- ✅ File Input Element existiert: `document.getElementById('business-card-upload-input')`
- ✅ Event Listener ist korrekt registriert
- ✅ File wird korrekt validiert

#### 2. Webhook Binary-Property prüfen
Im n8n Workflow:

1. **Klicke auf "Business Card Upload" Webhook Node**

2. **Prüfe "Binary Data" Option:**
   - ✅ **"Binary Data"** muss aktiviert sein
   - **Binary Property Name:** `file` (oder leer für automatisch)

3. **Prüfe "Options" (⚙️):**
   - ✅ **"Continue Workflow after Webhook Response"** aktiviert

#### 3. Binary-Daten-Weitergabe prüfen
Im **"Setze Sample-Info" Node:**

**Aktueller Code:**
```javascript
let binaryData = $binary;

if (!binaryData || (typeof binaryData === 'object' && Object.keys(binaryData || {}).length === 0)) {
  const prevNode = $('Lade Sample 1') || $('Lade Sample 2') || $('Lade Sample 3') || $('Business Card Upload');
  if (prevNode && prevNode.binary) {
    binaryData = prevNode.binary;
  }
}

return {
  json: { ... },
  binary: binaryData || $binary
};
```

**Verbesserter Code:**
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
      }
    }
    
    // Für Samples: Hole Binary vom HTTP Request Node
    if (sample) {
      const sampleNode = sample === '1' ? $('Lade Sample 1') : 
                         sample === '2' ? $('Lade Sample 2') : 
                         sample === '3' ? $('Lade Sample 3') : null;
      
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
  throw new Error('Binary-Daten fehlen! Prüfe Webhook oder HTTP Request Node.');
}

return {
  json: {
    sample: sample,
    source: sample ? `Sample ${sample}` : 'Upload'
  },
  // Binary explizit weitergeben
  binary: binaryData
};
```

---

## Problem 4: Visitenkarte 3 funktioniert nicht

### Ursachen:
1. "Sample 3?" IF Node prüft falsch
2. "Lade Sample 3" Node hat falsche URL oder lädt nicht
3. Binary-Daten werden nicht weitergegeben

### Lösung:

#### 1. "Sample 3?" IF Node prüfen
Im n8n Workflow:

1. **Klicke auf "Sample 3?" IF Node**

2. **Prüfe Condition:**
   - **Field:** `{{$json.query.sample}}`
   - **Operation:** `equals`
   - **Value:** `"3"` (als **String**, NICHT `3` als Number!)

3. **Teste Node:** Klicke "Execute Node" mit `sample=3` Parameter

#### 2. "Lade Sample 3" Node prüfen
1. **Klicke auf "Lade Sample 3" HTTP Request Node**

2. **Prüfe URL:**
   ```
   https://karusocaminar.github.io/kortex-website/samples/bc-3.jpg
   ```

3. **Prüfe `Response Format: File`** ist aktiviert

4. **Teste Node:** Klicke "Execute Node" - sollte Binary-Daten enthalten

#### 3. Binary-Daten-Weitergabe prüfen
Siehe "Problem 3: Upload-Fenster" → Lösung 3

---

## ✅ Checkliste

### AI Agent Fehler beheben:
- [ ] Tools im AI Agent Node entfernt (falls vorhanden)
- [ ] Workflow wurde neu getestet
- [ ] Fehler "Cannot read properties of undefined" ist behoben

### Adresse-Extraktion:
- [ ] Prompt wurde verbessert (siehe Lösung 2)
- [ ] Prompt fordert explizit vollständige Adresse an
- [ ] Test mit Sample 1/2/3 → Adresse wird extrahiert

### Upload-Fenster:
- [ ] File Input Handler ist korrekt
- [ ] Webhook Binary-Property ist `file`
- [ ] "Setze Sample-Info" Node gibt Binary korrekt weiter
- [ ] Upload wurde getestet → funktioniert

### Visitenkarte 3:
- [ ] "Sample 3?" IF Node prüft `sample=3` als String
- [ ] "Lade Sample 3" Node hat korrekte URL
- [ ] Binary-Daten werden korrekt weitergegeben
- [ ] Test mit `?sample=3` → funktioniert

---

## 🚀 Schnell-Fix

### Falls nichts funktioniert:

1. **AI Agent Node zurücksetzen:**
   - Lösche alle Tools im AI Agent Node
   - Aktiviere "Continue Workflow after Webhook Response" im Webhook Node
   - Teste erneut

2. **Workflow neu importieren:**
   - Öffne `n8n-business-card-workflow-vertex.json`
   - Importiere in n8n (überschreibt bestehenden Workflow)
   - Aktiviere Workflow
   - Konfiguriere Chat Model neu

3. **Einzeln testen:**
   - Teste Sample 1: `?sample=1`
   - Teste Sample 2: `?sample=2`
   - Teste Sample 3: `?sample=3`
   - Teste Upload: Datei hochladen

4. **Debug-Logs prüfen:**
   - Öffne Browser Console (`F12`)
   - Prüfe Network Tab für Requests
   - Prüfe n8n Execution Logs

