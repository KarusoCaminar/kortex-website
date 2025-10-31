# 🔧 AI Agent Node - Manuelle Konfiguration in n8n

## ⚠️ WICHTIG: Diese Einstellungen MÜSSEN korrekt sein!

---

## 📝 Schritt-für-Schritt Anleitung:

### 1. AI Agent Node öffnen

1. **Klicke auf "AI Agent - Vertex AI" Node** (in der Mitte des Workflows)

2. **Das Panel öffnet sich rechts**

---

### 2. Parameters Tab - Attachments korrigieren

1. **Gehe zu "Parameters" Tab**

2. **Scroll zu "Attachments" Sektion**

3. **Klicke auf das Attachment** (oder "Add Attachment" falls leer)

4. **Konfiguriere folgendermaßen:**

   ```
   Name: business-card
   
   Data: ={{ $('Setze Sample-Info').binary || $binary.data || $binary.file || $binary }}
   
   MIME Type: image/jpeg
   ```

   **ODER noch einfacher (falls das nicht funktioniert):**

   ```
   Name: business-card
   
   Data: ={{ $binary }}
   
   MIME Type: image/jpeg
   ```

5. **Klicke "Save"**

---

### 3. Settings Tab - Tools entfernen

1. **Gehe zu "Settings" Tab**

2. **Scroll zu "Tools" Sektion**

3. **Falls Tools vorhanden sind:**
   - **Klicke auf jedes Tool**
   - **Klicke auf das "X" oder "Remove" Button**
   - **ENTFERNE ALLE TOOLS** ❌

4. **Stelle sicher:**
   - ✅ **Tools Liste ist LEER**
   - ✅ **Keine Tools hinzugefügt**

5. **Klicke "Save"**

---

### 4. Settings Tab - Chat Model prüfen

1. **Scroll zu "Chat Model *"** (mit Stern = Pflichtfeld!)

2. **Prüfe ob Google Vertex AI konfiguriert ist:**
   - ✅ Sollte zeigen: "Google Vertex AI" oder ähnlich
   - ✅ Sollte gemini-2.5-flash oder gemini-2.5-pro sein

3. **Falls NICHT konfiguriert:**
   - Klicke auf "+"
   - Wähle "Google Vertex AI"
   - Konfiguriere (siehe `AI_AGENT_VERTEX_SETUP.md`)

---

### 5. Settings Tab - Memory

1. **Prüfe "Memory" Sektion:**
   - ❌ **Sollte LEER sein** (kein Memory nötig!)
   - Falls Memory hinzugefügt: **ENTFERNE es**

---

### 6. Prompt prüfen

1. **Gehe zurück zu "Parameters" Tab**

2. **Prüfe "Text" (Prompt):**
   - ✅ Sollte langen Prompt enthalten
   - ✅ Sollte "Extrahiere alle Kontaktdaten" enthalten

3. **Falls Prompt leer oder falsch:**
   - Kopiere Prompt aus `AI_AGENT_ERROR_FIX.md` oder
   - Nutze den Prompt aus dem Workflow JSON

---

## 🔍 Debugging: Binary-Daten testen

### Test 1: "Setze Sample-Info" Node prüfen

1. **Klicke auf "Setze Sample-Info" Code Node**

2. **Klicke "Execute Node"** (oben rechts)

3. **Prüfe Output:**
   - **Tab "Binary":** Sollte Datei zeigen (bc-1.jpg oder ähnlich)
   - **Tab "JSON":** Sollte `{ sample: "1", source: "Sample 1" }` zeigen

4. **Falls Binary leer:**
   - Prüfe "Lade Sample 1" Node Output
   - Prüfe ob HTTP Request Node Binary-Daten liefert

### Test 2: AI Agent Node Input prüfen

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Klicke "Execute Node"** (oben rechts)

3. **Prüfe Input:**
   - **Tab "Binary":** Sollte Datei zeigen
   - **Tab "JSON":** Sollte `{ sample: "1", source: "Sample 1" }` zeigen

4. **Falls Binary leer:**
   - Prüfe Attachments-Konfiguration
   - Prüfe ob Binary-Daten vom vorherigen Node ankommen

---

## ✅ Checkliste

### AI Agent Node Konfiguration:
- [ ] **Tools entfernt** (Settings Tab → Tools → LEER)
- [ ] **Attachments konfiguriert** (Parameters Tab → Attachments → Data: `$('Setze Sample-Info').binary`)
- [ ] **Chat Model konfiguriert** (Settings Tab → Chat Model → Google Vertex AI)
- [ ] **Memory leer** (Settings Tab → Memory → LEER)
- [ ] **Prompt vorhanden** (Parameters Tab → Text → sollte lang sein)

### Binary-Daten:
- [ ] **"Setze Sample-Info" Node** gibt Binary weiter
- [ ] **"Lade Sample X" Nodes** liefern Binary-Daten
- [ ] **Webhook Node** gibt Binary für Upload weiter
- [ ] **AI Agent Node** empfängt Binary-Daten

### Test:
- [ ] Test mit `?sample=1` → funktioniert
- [ ] Test mit `?sample=2` → funktioniert
- [ ] Test mit `?sample=3` → funktioniert
- [ ] Test mit Upload → funktioniert

---

## 🚨 Häufige Fehler:

### Fehler: "Cannot read properties of undefined (reading 'includes')"

**Lösung:**
1. ✅ Tools entfernen (Settings Tab)
2. ✅ Attachments Data-Konfiguration korrigieren
3. ✅ Binary-Daten-Struktur prüfen

### Fehler: "Binary data is empty"

**Lösung:**
1. ✅ "Setze Sample-Info" Node gibt Binary weiter
2. ✅ "Lade Sample X" Nodes haben `Response Format: File`
3. ✅ Webhook Node hat Binary-Property aktiviert

### Fehler: "Chat Model not configured"

**Lösung:**
1. ✅ Settings Tab → Chat Model → "+"
2. ✅ Wähle "Google Vertex AI"
3. ✅ Konfiguriere Credentials

---

## 📞 Falls nichts funktioniert:

1. **Workflow neu importieren:**
   - Importiere aktualisiertes `n8n-business-card-workflow-vertex.json`
   - Aktiviere Workflow
   - Teste erneut

2. **AI Agent Node zurücksetzen:**
   - Lösche alle Tools
   - Lösche alle Attachments
   - Füge Attachment neu hinzu mit korrekter Data-Konfiguration

3. **Einzeln testen:**
   - Teste "Lade Sample 1" Node → Prüfe Binary
   - Teste "Setze Sample-Info" Node → Prüfe Binary
   - Teste "AI Agent" Node → Prüfe Input Binary

