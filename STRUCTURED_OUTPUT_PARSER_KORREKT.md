# ✅ Structured Output Parser - KORREKTE Anleitung

## 🎯 WICHTIG: Structured Output Parser ist ein SUB-NODE!

**Der Structured Output Parser wird NICHT als separater Node mit Verbindung hinzugefügt!**

Stattdessen:
- **AI Agent Node öffnen**
- **"Require Specific Output Format" aktivieren** (ODER "Has Output Parser" = true)
- **Neuer Anschluss erscheint am AI Agent Node**
- **Dort klicken** → **"Structured Output Parser" hinzufügen**
- **Parser wird als SUB-NODE angehängt** (nicht als separater Node!)

---

## 📋 Schritt-für-Schritt (KORREKT):

### Schritt 1: AI Agent Node öffnen

1. **"AI Agent - Vertex AI" Node** öffnen (klicken)

### Schritt 2: "Require Specific Output Format" aktivieren

1. **Parameters Tab** öffnen
2. **Options** öffnen (falls vorhanden)
3. **"Require Specific Output Format" aktivieren** ✅
   - **ODER:** "Has Output Parser" = true (falls vorhanden)

### Schritt 3: Structured Output Parser hinzufügen

1. **Am AI Agent Node** erscheint jetzt ein **neuer Anschluss** (z.B. unten oder rechts)
2. **Auf den Anschluss klicken** → **"+"** oder **"Add Node"**
3. **"Structured Output Parser" auswählen**
4. **Parser wird als SUB-NODE angehängt** (erscheint als kleiner Node am AI Agent)

### Schritt 4: JSON Schema im Parser konfigurieren

1. **Am SUB-NODE "Structured Output Parser"** klicken
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

## ✅ Richtige Struktur:

```
AI Agent - Vertex AI
    ├─ [Sub-Node:] Structured Output Parser (angehängt)
    ├─ [Input:] Google Vertex Chat Model (ai_languageModel)
    └─ [Output:] Debug: AI Agent (main)
```

**Der Structured Output Parser ist ein SUB-NODE am AI Agent, KEINE separate Verbindung!**

---

## 🔧 Falls bereits ein separater Node vorhanden ist:

### Option 1: Als SUB-NODE am AI Agent hinzufügen

1. **Separaten "Structured Output Parser" Node löschen** (falls vorhanden)
2. **AI Agent Node öffnen**
3. **"Require Specific Output Format" aktivieren**
4. **Am AI Agent Node: Neuen Anschluss → Structured Output Parser hinzufügen**

### Option 2: Separater Node funktioniert auch (alte Methode)

**Falls n8n einen separaten Node erlaubt:**
- Structured Output Parser Node → **Verbindung zum AI Agent**
- Verbindungstyp: `ai_outputParser` (gestrichelte Linie)

**ABER:** Die offizielle Methode ist als SUB-NODE am AI Agent!

---

## 🧪 Test:

1. **AI Agent Node öffnen**
2. **Prüfe:** Gibt es einen **SUB-NODE "Structured Output Parser"**?
3. **Falls ja:** ✅ Korrekt!
4. **Falls nein:** Parser als SUB-NODE hinzufügen

---

## 💡 Warum als SUB-NODE?

Der Structured Output Parser ist **speziell für den AI Agent**:
- Er strukturiert die **Ausgabe** des AI Agent
- Er ist kein unabhängiger Node
- Er ist ein **Feature** des AI Agent Nodes

Deshalb wird er als **SUB-NODE** am AI Agent angehängt, nicht als separater Node!

---

**So ist es KORREKT! Der Structured Output Parser ist ein SUB-NODE am AI Agent Node, nicht eine separate Verbindung!**

