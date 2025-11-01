# 🔧 Webhook Aktivierungs-Anleitung

## ⚠️ Problem: Keine Executions trotz POST-Requests

Wenn POST-Requests von der Website nicht ankommen, liegt das Problem meist an:

1. **Workflow nicht aktiviert**
2. **Webhook Node falsch konfiguriert**
3. **HTTP Method nicht explizit gesetzt**

---

## ✅ Schritt 1: Workflow aktivieren

1. **n8n Workflow öffnen:**
   - `https://n8n2.kortex-system.de/workflow/JkdKPm27OWy93nU5`
   
2. **Workflow aktivieren:**
   - **Oben rechts:** Toggle-Schalter "Active" → **GRÜN/AN**
   - Status sollte **"Active"** sein (nicht "Inactive")

3. **Prüfen:**
   - Oben rechts sollte "Active" angezeigt werden
   - Falls "Inactive": Toggle aktivieren

---

## ✅ Schritt 2: Webhook Node konfigurieren

1. **"Business Card Upload" Node öffnen**

2. **Parameters Tab prüfen:**

   **HTTP Method:**
   - Muss **"POST"** sein (nicht "GET" oder leer)
   - Falls leer oder GET: Ändern zu **"POST"**

   **Path:**
   - Muss `business-card-extraction` sein

   **Response Mode:**
   - Sollte "Last Node" sein

   **Binary Property Name:**
   - Muss `file` sein

3. **Options Tab öffnen:**
   - **Response Headers:**
     - `Access-Control-Allow-Origin: *`
     - `Access-Control-Allow-Methods: POST, OPTIONS`
     - `Access-Control-Allow-Headers: Content-Type, Accept`

4. **Speichern:** "Save" klicken

---

## ✅ Schritt 3: Webhook URL prüfen

1. **Webhook Node öffnen**

2. **Webhook URL notieren:**
   - Sollte sein: `https://n8n2.kortex-system.de/webhook/business-card-extraction`
   - **WICHTIG:** Es gibt zwei URLs:
     - **Test URL:** Für manuelles Testen in n8n UI
     - **Production URL:** Für echte Requests von der Website
   - **Verwende die Production URL!**

3. **URL kopieren:**
   - Production URL kopieren
   - In Website einfügen

---

## ✅ Schritt 4: Manuell testen

### Test mit curl (Terminal):

```bash
curl -X POST https://n8n2.kortex-system.de/webhook/business-card-extraction \
  -H "Content-Type: application/json" \
  -d '{"query": {"sample": "2"}}'
```

**Erwartetes Ergebnis:**
- Response sollte nicht 404 sein
- Workflow sollte ausgeführt werden
- Execution sollte in n8n erscheinen

### Test mit Postman:

1. **Method:** POST
2. **URL:** `https://n8n2.kortex-system.de/webhook/business-card-extraction`
3. **Headers:**
   - `Content-Type: application/json`
4. **Body (raw JSON):**
   ```json
   {
     "query": {
       "sample": "2"
     }
   }
   ```
5. **Send** klicken

**Erwartetes Ergebnis:**
- Status sollte nicht 404 sein
- Workflow sollte ausgeführt werden

---

## ✅ Schritt 5: Executions prüfen

1. **n8n Workflow öffnen**

2. **"Executions" Tab öffnen** (oben)

3. **Prüfen:**
   - Sollten Executions erscheinen wenn POST-Request gesendet wurde
   - Falls keine Executions: Workflow ist nicht aktiviert oder Webhook Node falsch konfiguriert

4. **Execution öffnen:**
   - Klicke auf letzte Execution
   - Prüfe welche Nodes ausgeführt wurden
   - Prüfe ob Fehler auftreten

---

## 🔍 Troubleshooting

### Problem: "This webhook is not registered for GET requests"

**Ursache:** Browser macht GET-Request (normal wenn URL direkt geöffnet wird)

**Lösung:**
- Dies ist **NORMAL** - Browser macht immer GET
- **Wichtig:** POST-Requests von der Website sollten funktionieren
- Teste mit curl oder Postman (siehe Schritt 4)

---

### Problem: Keine Executions trotz POST-Requests

**Mögliche Ursachen:**

1. **Workflow nicht aktiviert:**
   - ✅ Lösung: Toggle "Active" aktivieren (siehe Schritt 1)

2. **HTTP Method nicht gesetzt:**
   - ✅ Lösung: Im Webhook Node "POST" explizit setzen (siehe Schritt 2)

3. **Falsche Webhook URL:**
   - ✅ Lösung: Production URL verwenden (siehe Schritt 3)

4. **CORS Problem:**
   - ✅ Lösung: Response Headers hinzufügen (siehe Schritt 2)

---

### Problem: 500 Internal Server Error

**Ursache:** Workflow läuft, aber ein Node schlägt fehl

**Lösung:**
1. Execution öffnen
2. Welcher Node ist rot? (schlägt fehl)
3. Input/Output des fehlgeschlagenen Nodes prüfen
4. Fehler beheben

---

## 📋 Checkliste

- [ ] Workflow ist aktiviert (Toggle "Active" ist GRÜN)
- [ ] Webhook Node hat `httpMethod: "POST"` gesetzt
- [ ] Webhook Node hat Path `business-card-extraction`
- [ ] Webhook Node hat Binary Property Name `file`
- [ ] Response Headers sind konfiguriert (CORS)
- [ ] Production URL wird verwendet (nicht Test URL)
- [ ] curl/Postman Test funktioniert
- [ ] Executions erscheinen in n8n

---

## 🆘 Support

Falls nichts funktioniert:

1. **Screenshot:** n8n Workflow mit "Business Card Upload" Node geöffnet
2. **Screenshot:** Executions Tab (falls Executions vorhanden)
3. **Test:** curl Command Output

Dann kann ich dir genau sagen, wo das Problem liegt!

