# 🔧 Structured Output Parser - FINALER FIX

## ❌ Problem im Screenshot:

1. **"Require Specific Output Format" Toggle ist OFF** (inaktiv)
2. **Structured Output Parser ist NICHT verbunden** (keine Verbindungslinie)

---

## ✅ So fixst du es in n8n (MANUELL):

### Schritt 1: "Require Specific Output Format" aktivieren

1. **"AI Agent - Vertex AI" Node öffnen** (klicken)
2. **Parameters Tab** (sollte bereits offen sein)
3. **Scroll runter zu "Require Specific Output Format"**
4. **Toggle aktivieren** ✅ (von OFF zu ON)
5. **Workflow speichern** (unten rechts: "Save")

**Nach dem Aktivieren:**
- Am AI Agent Node erscheint ein **neuer Anschluss** (Output Parser Port)
- Oft unten am Node mit Label "Output Parser"

---

### Schritt 2: Structured Output Parser als SUB-NODE hinzufügen

1. **Am AI Agent Node:** Klicke auf den **neuen Anschluss** (Output Parser Port)
2. **ODER:** Klicke auf das **"+"** Symbol neben dem Output Parser Label
3. **"Structured Output Parser" auswählen**
4. **Parser wird als SUB-NODE angehängt** (erscheint als kleiner Node direkt am AI Agent)

**WICHTIG:** Der Parser muss als **SUB-NODE** am AI Agent angehängt werden, nicht als separate Verbindung!

---

### Schritt 3: JSON Schema im SUB-NODE konfigurieren

1. **Am SUB-NODE "Structured Output Parser" klicken** (kleiner Node am AI Agent)
2. **Parameters Tab:**
   - **JSON Schema Example:** Einfügen:
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
3. **Speichern**

---

## ✅ Prüfen ob es funktioniert:

### Im Workflow prüfen:

1. **AI Agent Node öffnen**
2. **Prüfe:** Gibt es einen **SUB-NODE "Structured Output Parser"**? (kleiner Node direkt am AI Agent)
3. **Falls JA:** ✅ Korrekt!
4. **Falls NEIN:** Parser als SUB-NODE hinzufügen (Schritt 2)

### Struktur sollte sein:

```
AI Agent - Vertex AI
    ├─ [SUB-NODE:] Structured Output Parser (kleiner Node direkt am AI Agent)
    ├─ [Input:] Google Vertex Chat Model (ai_languageModel)
    └─ [Output:] Debug: AI Agent (main)
```

---

## ❌ Falls SUB-NODE nicht funktioniert:

### Alternative: Separater Node mit Verbindung

1. **Separater "Structured Output Parser" Node** vorhanden lassen (falls vorhanden)
2. **AI Agent Node öffnen:**
   - ✅ **"Has Output Parser" aktiviert** (in Options - sollte schon aktiv sein)
3. **Verbindung erstellen:**
   - **Vom "Structured Output Parser"** → **Zum "AI Agent"**
   - Verbindungslinie ziehen
   - **Rechtsklick auf Verbindung** → **Verbindungstyp:** `ai_outputParser` wählen
   - Verbindung sollte **GESTRICHELT** sein

---

## 🎯 Schnellcheck:

1. ✅ **"Require Specific Output Format" aktiviert?** (Toggle im AI Agent Node)
2. ✅ **Structured Output Parser vorhanden?** (SUB-NODE oder separater Node)
3. ✅ **Verbindung vorhanden?** (SUB-NODE angehängt ODER gestrichelte Linie)
4. ✅ **JSON Schema gesetzt?** (im Parser)

**Alles aktiviert?** → Workflow sollte funktionieren!

---

**WICHTIG:** Die Option `requireSpecificOutputFormat` kann NICHT über JSON gesetzt werden - sie muss in der n8n UI manuell aktiviert werden!

