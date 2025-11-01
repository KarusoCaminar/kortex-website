# 🔧 Manuelle Fixes in n8n UI erforderlich

## Übersicht

Diese Fixes **können nicht automatisch** über JSON angewendet werden und müssen **manuell in der n8n UI** gemacht werden.

---

## Fix 1: "Require Specific Output Format" aktivieren

### Problem:
- "Require Specific Output Format" Toggle im AI Agent Node ist **nicht aktiviert**
- Ohne diesen Toggle erscheint kein Anschluss für den Structured Output Parser

### Lösung:

1. **"AI Agent - Vertex AI" Node öffnen** (klicken)
2. **Parameters Tab** öffnen (sollte bereits offen sein)
3. **Scroll runter** zu **"Require Specific Output Format"**
4. **Toggle aktivieren** ✅ (von OFF zu ON)
5. **Workflow speichern** (unten rechts: "Save")

**Nach dem Aktivieren:**
- Am AI Agent Node erscheint ein **neuer Anschluss** (Output Parser Port)
- Oft unten am Node mit Label "Output Parser" oder ähnlich

**Screenshot-Hinweis:**
- Links: Toggle OFF (grau)
- Rechts: Toggle ON (blau/grün)

---

## Fix 2: Structured Output Parser als SUB-NODE hinzufügen

### Problem:
- Structured Output Parser existiert als **separater Node**, aber ist **nicht als SUB-NODE** am AI Agent angehängt
- Ohne SUB-NODE-Verbindung funktioniert der Parser nicht korrekt

### Lösung:

**WICHTIG:** Der Parser muss als **SUB-NODE** am AI Agent angehängt werden, nicht als separate Verbindung!

#### Schritt 1: Prüfe ob "Require Specific Output Format" aktiviert ist

- Falls nicht: Befolge **Fix 1** zuerst
- Nach Aktivierung erscheint ein **neuer Anschluss** am AI Agent Node

#### Schritt 2: Structured Output Parser als SUB-NODE hinzufügen

1. **Am AI Agent Node:** Klicke auf den **neuen Anschluss** (Output Parser Port)
2. **ODER:** Klicke auf das **"+"** Symbol neben dem Output Parser Label
3. **"Structured Output Parser" auswählen**
4. **Parser wird als SUB-NODE angehängt** (erscheint als kleiner Node direkt am AI Agent)

**Visualisierung:**
```
AI Agent - Vertex AI
    ├─ [SUB-NODE:] Structured Output Parser (kleiner Node direkt am AI Agent)
    ├─ [Input:] Google Vertex Chat Model (ai_languageModel)
    └─ [Output:] Debug: AI Agent (main)
```

---

## Fix 3: JSON Schema im SUB-NODE konfigurieren

### Problem:
- JSON Schema im Structured Output Parser ist nicht konfiguriert oder falsch

### Lösung:

1. **Am SUB-NODE "Structured Output Parser" klicken** (kleiner Node am AI Agent)
2. **Parameters Tab** öffnen
3. **JSON Schema Example:** Einfügen:
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
4. **Speichern** (unten rechts: "Save")

---

## Prüfen ob alles korrekt ist

### Checkliste:

- ✅ **"Require Specific Output Format" aktiviert?** (Toggle im AI Agent Node)
- ✅ **Structured Output Parser vorhanden?** (SUB-NODE am AI Agent)
- ✅ **JSON Schema gesetzt?** (im Parser SUB-NODE)

**Alles aktiviert?** → Workflow sollte funktionieren!

---

## Schritt-für-Schritt Anleitung (komplett)

### 1. Workflow JSON importieren

1. **n8n öffnen**
2. **Workflows** → **Import from File**
3. **`n8n-business-card-workflow-vertex-FIXED.json`** auswählen
4. **Import**

### 2. "Require Specific Output Format" aktivieren

1. **"AI Agent - Vertex AI" Node öffnen**
2. **Parameters Tab**
3. **Scroll runter** zu **"Require Specific Output Format"**
4. **Toggle aktivieren** ✅
5. **Workflow speichern**

### 3. Structured Output Parser als SUB-NODE hinzufügen

1. **Am AI Agent Node:** Neuen **Output Parser Anschluss** finden (nach Schritt 2 sichtbar)
2. **Auf Anschluss klicken** → **"+"** oder **"Add Node"**
3. **"Structured Output Parser" auswählen**
4. **Parser erscheint als SUB-NODE** (kleiner Node am AI Agent)

### 4. JSON Schema konfigurieren

1. **Am SUB-NODE "Structured Output Parser" klicken**
2. **Parameters Tab**
3. **JSON Schema Example:** JSON-Schema einfügen (siehe Fix 3)
4. **Speichern**

### 5. Workflow aktivieren und testen

1. **Oben rechts:** **"Active" Toggle aktivieren** ✅
2. **Workflow speichern**
3. **Website testen:** `https://karusocaminar.github.io/kortex-website/`
4. **"Visitenkarten-Extraktion" klicken**
5. **Sample 1/2/3 testen**

---

## Häufige Fehler

### Fehler 1: "Kein Anschluss am AI Agent"

**Problem:** "Require Specific Output Format" ist nicht aktiviert

**Lösung:** Fix 1 befolgen

### Fehler 2: "Parser ist nicht verbunden"

**Problem:** Parser existiert als separater Node, aber nicht als SUB-NODE

**Lösung:** Fix 2 befolgen - Parser als SUB-NODE hinzufügen

### Fehler 3: "AI Output fehlt"

**Problem:** Structured Output Parser ist nicht korrekt konfiguriert

**Lösung:** Fix 2 und 3 befolgen - SUB-NODE hinzufügen und JSON Schema setzen

---

## Warum müssen diese Fixes manuell gemacht werden?

1. **SUB-NODE Verbindungen:** n8n speichert SUB-NODES nicht als separate Verbindungen in der JSON, sondern als Teil des Parent-Nodes. Diese Struktur kann nicht per JSON gesetzt werden.

2. **UI-Toggles:** "Require Specific Output Format" ist ein UI-Toggle, der nur in der n8n UI aktiviert werden kann. Die Option existiert nicht als JSON-Parameter.

3. **JSON Schema:** Wird zwar in der JSON gespeichert, aber der SUB-NODE muss zuerst manuell erstellt werden (siehe Punkt 1).

---

**Nach allen manuellen Fixes sollte der Workflow vollständig funktionieren!**

