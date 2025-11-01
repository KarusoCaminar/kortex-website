# 🚀 Clean Workflow Anleitung

## ✅ Der Clean Workflow: Bildanalyse & JSON-Rückgabe

Dieser vereinfachte Workflow verwendet **nur 4 Nodes** und beseitigt alle Fehlerquellen:

1. 🟢 **Webhook** (POST mit Binary-Daten)
2. 🤖 **AI Agent - Vertex AI** (Bildanalyse)
3. 💬 **Structured Output Parser** (JSON erzwingen)
4. ↩️ **Respond to Webhook** (JSON zurückgeben)

---

## 📋 Workflow-Struktur

```
Webhook (POST)
    ↓
AI Agent - Vertex AI
    ↓
Structured Output Parser
    ↓
Respond to Webhook
```

**Keine Code-Nodes, keine Route-Nodes, keine Sample-Nodes!**

---

## ✅ Schritt 1: Workflow importieren

1. **n8n öffnen:**
   - `https://n8n2.kortex-system.de`
   
2. **Workflow importieren:**
   - **Menü** → **Import** → **From File**
   - Datei wählen: `n8n-business-card-workflow-CLEAN.json`
   - **Import** klicken

3. **Workflow wird erstellt:**
   - Name: "Business Card Extraction - CLEAN"
   - 4 Nodes werden angezeigt

---

## ✅ Schritt 2: Google Vertex Chat Model konfigurieren

1. **"Google Vertex Chat Model" Node öffnen**

2. **Credentials prüfen:**
   - **Google Service Account:** Muss vorhanden sein
   - Falls nicht: **Credentials erstellen** → **Google Service Account** → Credentials auswählen

3. **Project ID prüfen:**
   - Sollte sein: `koretex-zugang`
   - Falls anders: Ändern zu `koretex-zugang`

4. **Speichern:** "Save" klicken

---

## ✅ Schritt 3: Webhook Node konfigurieren

1. **"Business Card Upload" Node öffnen**

2. **Parameters Tab prüfen:**

   **HTTP Method:**
   - Muss **"POST"** sein ✅
   
   **Path:**
   - Muss `business-card-extraction` sein ✅
   
   **Response Mode:**
   - Muss **"Last Node Finishes"** sein ✅
   
   **Binary Property Name:**
   - Muss `file` sein ✅ (passt zu `formData.append('file', ...)`)

3. **Options Tab prüfen:**
   - **Response Headers:**
     - `Access-Control-Allow-Origin: *` ✅
     - `Access-Control-Allow-Methods: POST, OPTIONS` ✅
     - `Access-Control-Allow-Headers: Content-Type, Accept` ✅

4. **Speichern:** "Save" klicken

---

## ✅ Schritt 4: AI Agent - Vertex AI konfigurieren

1. **"AI Agent - Vertex AI" Node öffnen**

2. **Parameters Tab prüfen:**

   **Prompt Type:**
   - Muss **"Define"** sein ✅
   
   **Text (User Message):**
   ```
   Extract all business contact details from this business card image. Return full name, job title, company name, phone number, email address, website, office address, and city/postal code. Verify and complete missing data through logical plausibility checks.
   ```
   
   **Options → System Message:**
   ```
   You are a smart assistant that extracts business contact information from business card images. Your role is to analyze the image, extract relevant details such as full name, job title, company name, phone number, email address, website, office address, and city. Verify data plausibility and complete missing information when possible. Return clean, structured JSON data.
   ```
   
   **Options → Automatically Passthrough Binary Images:**
   - **MUSS `{{ true }}` sein!** ✅
   - **KRITISCH:** Diese Option stellt sicher, dass Binary-Daten vom Webhook automatisch an den AI Agent weitergegeben werden

   **Options → Has Output Parser:**
   - Muss **aktiviert** sein ✅

3. **Connections Tab prüfen:**
   - **Language Model:** Muss mit "Google Vertex Chat Model" verbunden sein ✅
   - **Output Parser:** Muss mit "Structured Output Parser" verbunden sein ✅

4. **Speichern:** "Save" klicken

---

## ✅ Schritt 5: Structured Output Parser konfigurieren

1. **"Structured Output Parser" Node öffnen**

2. **Parameters Tab prüfen:**

   **JSON Schema Example:**
   ```json
   [{
     "name": "Oliver Krause",
     "job_title": "Externer Datenschutzbeauftragter (TÜV Pers. Cert.)",
     "company": "DSBOK",
     "phone": "+49 160 5384727",
     "phone_office": "+49 6144 402197",
     "email": "oliver.krause@dsbok.de",
     "website": "www.dsbok.de",
     "address": "Untergasse 2",
     "city": "65474 Bischofsheim",
     "verification_status": "verified",
     "confidence_score": 0.98
   }]
   ```

   **WICHTIG:** Die Felder im Schema müssen exakt den Feldern im Prompt entsprechen:
   - `name` (full name)
   - `job_title`
   - `company`
   - `phone`
   - `phone_office`
   - `email`
   - `website`
   - `address`
   - `city`
   - `verification_status`
   - `confidence_score`

3. **Connections Tab prüfen:**
   - Muss mit "AI Agent - Vertex AI" verbunden sein ✅

4. **Speichern:** "Save" klicken

---

## ✅ Schritt 6: Respond to Webhook konfigurieren

1. **"Respond to Webhook" Node öffnen**

2. **Parameters Tab prüfen:**

   **Response Mode:**
   - Muss **"Respond With"** sein ✅
   
   **Response Data:**
   - Muss **"Using Expression"** sein ✅
   
   **Expression:**
   - Muss sein: `={{JSON.stringify($json, null, 2)}}` ✅
   
   **WICHTIG:** Der Output des Structured Output Parsers wird direkt als JSON zurückgegeben

3. **Connections Tab prüfen:**
   - Muss mit "AI Agent - Vertex AI" verbunden sein ✅

4. **Speichern:** "Save" klicken

---

## ✅ Schritt 7: Workflow aktivieren

1. **Workflow aktivieren:**
   - **Oben rechts:** Toggle-Schalter "Active" → **GRÜN/AN** ✅
   - Status sollte **"Active"** sein

2. **Webhook URL notieren:**
   - Im "Business Card Upload" Node wird die **Production URL** angezeigt
   - Sollte sein: `https://n8n2.kortex-system.de/webhook/business-card-extraction`
   - **Verwende diese URL in der Website!**

---

## 🧪 Testen

### Test 1: Mit Website testen

1. **Website öffnen**
2. **"Eigene Visitenkarte hochladen" klicken**
3. **Bild auswählen** (JPG/PNG, max. 10 MB)
4. **Prüfe Browser-Konsole:**
   - `📎 Sende File: [filename] [size] bytes`
5. **Prüfe n8n Executions:**
   - Execution sollte erscheinen
   - Alle 4 Nodes sollten grün sein (erfolgreich)
   - "Respond to Webhook" sollte JSON zurückgeben

### Test 2: Mit curl testen

```bash
curl -X POST https://n8n2.kortex-system.de/webhook/business-card-extraction \
  -F "file=@/path/to/image.jpg"
```

**Erwartetes Ergebnis:**
- Status: 200 OK
- Response: JSON mit extrahierten Kontaktdaten

---

## ❌ Elimination der Fehlerquellen

Dieser neue, vereinfachte Workflow beseitigt:

✅ **Route to Sample Nodes:** Eliminiert ✅  
✅ **Lade Sample 1/2/3 Nodes:** Eliminiert ✅  
✅ **Setze Sample-Info Code Node:** Eliminiert ✅  
✅ **Transform Output Code Node:** Eliminiert ✅  
✅ **Debug Nodes:** Eliminiert ✅  
✅ **Switch Node für Routing:** Eliminiert ✅  
✅ **IF Nodes für Sample-Prüfung:** Eliminiert ✅  

**Nur 4 Nodes - garantiert einfach und funktioniert!**

---

## 🔍 Troubleshooting

### Problem: Binary-Daten kommen nicht an

**Prüfe:**
1. ✅ **Webhook Node:** `binaryPropertyName: "file"` gesetzt?
2. ✅ **AI Agent:** `automaticallyPassthroughBinaryImages: true` gesetzt?
3. ✅ **Website:** Sendet FormData mit `file` als Key?

### Problem: AI Agent erhält keine Binary-Daten

**Lösung:**
1. **AI Agent Node öffnen**
2. **Options Tab öffnen**
3. **"Automatically Passthrough Binary Images" prüfen:**
   - Muss `{{ true }}` sein (Expression, nicht Boolean!)
   - Falls leer oder `false`: Ändern zu `{{ true }}`
4. **Speichern**

### Problem: JSON-Schema passt nicht

**Prüfe:**
1. ✅ **Structured Output Parser:** Schema enthält alle Felder aus Prompt?
2. ✅ **AI Agent Prompt:** Erwähnt alle Felder im Schema?

### Problem: 500 Internal Server Error

**Prüfe:**
1. ✅ **n8n Execution Logs:** Welcher Node schlägt fehl?
2. ✅ **AI Agent:** Hat er Binary-Daten erhalten? (Check Input)
3. ✅ **Structured Output Parser:** Ist Output valid JSON?

---

## 📋 Checkliste

- [ ] Workflow importiert ✅
- [ ] Google Vertex Chat Model konfiguriert ✅
- [ ] Webhook Node: POST, Binary Property Name = `file` ✅
- [ ] AI Agent: `automaticallyPassthroughBinaryImages: true` ✅
- [ ] AI Agent: System Message und Prompt gesetzt ✅
- [ ] Structured Output Parser: JSON Schema gesetzt ✅
- [ ] Respond to Webhook: Expression gesetzt ✅
- [ ] Alle Nodes miteinander verbunden ✅
- [ ] Workflow aktiviert ✅
- [ ] Website sendet POST mit FormData (`file`) ✅
- [ ] Test erfolgreich ✅

---

## 🎯 Vorteile des Clean Workflows

✅ **Einfach:** Nur 4 Nodes  
✅ **Zuverlässig:** Keine Code-Nodes, keine Routing-Logik  
✅ **Schnell:** Direkter Pfad Webhook → AI → Response  
✅ **Wartbar:** Klare Struktur, leicht zu verstehen  
✅ **Debugbar:** Jeder Node hat klar definierte Input/Output  

---

## 📚 Referenzen

- **Workflow:** `n8n-business-card-workflow-CLEAN.json`
- **Website:** `kortex-n8n-modal.html` (Zeile ~1021-1027)
- **Webhook URL:** `https://n8n2.kortex-system.de/webhook/business-card-extraction`

