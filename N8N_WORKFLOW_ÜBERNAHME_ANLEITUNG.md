# ✅ Workflow Übernahme - Funktionierender Workflow als Basis

## 🎯 Ziel

**Funktionierenden Workflow als Basis nehmen und für unser Setup anpassen!**

Der gezeigte Workflow funktioniert, weil er:
- ✅ Structured Output Parser verwendet
- ✅ Korrekte AI Agent Konfiguration hat
- ✅ Transform Output Code Node richtig strukturiert ist

---

## 📋 Was wir übernehmen

### ✅ Übernehmen (funktioniert):

1. **Structured Output Parser Node**
   - Gibt strukturierte JSON-Daten zurück
   - Verhindert Parsing-Fehler

2. **AI Agent Konfiguration**
   - `hasOutputParser: true` ✅
   - `automaticallyPassthroughBinaryImages: true` ✅
   - System Message korrekt

3. **Transform Output Code Node**
   - Transformiert AI Output für Website
   - Handhabt Array-Output korrekt

---

## 📋 Was wir anpassen

### 1. Trigger: Webhook statt Form

**Übernehmen:**
- Unser Webhook Trigger ("Business Card Upload")
- Routing (Code Node + Switch Node)

### 2. AI Agent: Vertex AI statt OpenAI

**Übernehmen:**
- Structured Output Parser ✅
- AI Agent Konfiguration ✅
- Aber: Google Vertex AI statt GPT-4o

### 3. Output: Website Response statt Google Sheets

**Übernehmen:**
- Transform Output Code Node ✅
- Aber: "Antwort an Website" statt Google Sheets

---

## ✅ Schritt-für-Schritt Übernahme

### Schritt 1: Structured Output Parser hinzufügen

1. **In n8n:** Structured Output Parser Node hinzufügen
2. **Parameters Tab:**
   - **JSON Schema Example:** (siehe `n8n-business-card-workflow-vertex-FIXED.json`)
3. **Speichern**

### Schritt 2: AI Agent Node anpassen

1. **"AI Agent - Vertex AI" Node öffnen**
2. **Parameters Tab:**
   - **Prompt:** Bleibt gleich
   - **System Message:** Bleibt gleich
   - **Options:**
     - ✅ **Has Output Parser:** AKTIVIEREN
     - ✅ **Automatically Passthrough Binary Images:** AKTIVIEREN
3. **Speichern**

### Schritt 3: Verbindung Structured Output Parser → AI Agent

1. **Structured Output Parser Node → AI Agent Node**
   - Verbindung: `ai_outputParser` (gestrichelte Linie!)
   - NICHT die normale `main` Verbindung!

### Schritt 4: Transform Output Code anpassen

1. **"Transform Output" Code Node Code ersetzen:**
   ```javascript
   // Transform Output für Website
   const source = $json.source || 'Upload';
   const sample = $json.sample || '';
   
   // AI Agent gibt bereits strukturierte Daten zurück (durch Structured Output Parser)
   const contacts = Array.isArray($json.output) ? $json.output : [$json];
   
   const output = contacts.map(contact => ({
     json: {
       type: 'business-card-processed',
       payload: {
         name: contact.name || '',
         company: contact.company || '',
         email: contact.email || '',
         phone: contact.phone || contact.phone_mobile || '',
         phone_office: contact.phone_office || contact.phone_büro || '',
         address: contact.address || '',
         city: contact.city || '',
         website: contact.website || contact.www || '',
         job_title: contact.job_title || contact.position || '',
         verification_status: contact.verification_status || 'unverified',
         confidence_score: contact.confidence_score !== undefined ? contact.confidence_score : 0.5,
         source: source,
         sample: sample,
         timestamp: new Date().toISOString()
       }
     }
   }));
   
   return output;
   ```

2. **Speichern**

### Schritt 5: "Parse AI Agent Response" Node entfernen

**NICHT MEHR NÖTIG!** Structured Output Parser macht das automatisch!

1. **"Parse AI Agent Response" Code Node** → Löschen
2. **Verbindung:** "AI Agent" → "Transform Output" (direkt!)

---

## ✅ Neue Workflow-Struktur

```
Business Card Upload
    ↓
Route to Sample (Code Node)
    ↓
Route to Sample Nodes (Switch Node)
    ├─ sample-1 → Lade Sample 1 → Setze Sample-Info
    ├─ sample-2 → Lade Sample 2 → Setze Sample-Info
    ├─ sample-3 → Lade Sample 3 → Setze Sample-Info
    └─ upload → Setze Sample-Info
    ↓
AI Agent - Vertex AI
    ↑ (ai_outputParser Verbindung)
Structured Output Parser
    ↓ (main Verbindung)
Transform Output (Code Node)
    ↓
Antwort an Website
```

---

## 🧪 Test

1. **Workflow aktivieren**
2. **Execute Workflow** mit `?sample=1`
3. **Prüfe:**
   - "AI Agent - Vertex AI": Wird ausgeführt ✅
   - "Structured Output Parser": Gibt strukturierte Daten zurück ✅
   - "Transform Output": Transformiert Daten korrekt ✅
   - "Antwort an Website": Sendet JSON Response ✅

---

## ✅ Vorteile

1. **Structured Output Parser:** Garantiert strukturierte JSON-Daten ✅
2. **Keine Parsing-Fehler:** AI Output ist bereits strukturiert ✅
3. **Robuster:** Funktioniert mit verschiedenen AI Models ✅
4. **Einfacher:** Weniger Code Nodes nötig ✅

---

**Der funktionierende Workflow als Basis - sollte jetzt funktionieren!**

