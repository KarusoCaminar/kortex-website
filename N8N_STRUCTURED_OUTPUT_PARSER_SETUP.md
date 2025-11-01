# ✅ Structured Output Parser Setup

## 🎯 Structured Output Parser ist ein SEPARATER Node!

**Kein Button im AI Agent!** Du musst einen **separaten Node** hinzufügen.

---

## 📋 Schritt-für-Schritt

### Schritt 1: Structured Output Parser Node hinzufügen

1. **In n8n:** Workflow öffnen
2. **Klicke auf "Google Vertex Chat Model" Node**
3. **Klicke auf "+" (Was passiert als Nächstes?)**
4. **Suche nach:** `structured` oder `Output Parser`
5. **Klicke auf "Structured Output Parser"** (Node mit `</>` Symbol)
6. **Node wird hinzugefügt**

---

### Schritt 2: JSON Schema konfigurieren

1. **"Structured Output Parser" Node öffnen**
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

### Schritt 3: Verbindung erstellen (WICHTIG!)

**Die Verbindung ist ANDERS als normal!**

1. **"Structured Output Parser" Node → "Google Vertex Chat Model" Node**
2. **Verbindung:** Ziehe vom Output-Punkt (rechts) zum Input-Punkt (links)
3. **WICHTIG:** Die Verbindung sollte als **gestrichelte Linie** erscheinen!
4. **Verbindungstyp:** Sollte `ai_outputParser` sein (NICHT `main`!)

**Falls die Verbindung nicht als gestrichelte Linie erscheint:**
- Rechtsklick auf Verbindungslinie → Verbindungstyp ändern
- Oder: Löschen und neu erstellen

---

### Schritt 4: AI Agent Node konfigurieren

1. **"AI Agent - Vertex AI" Node öffnen**
2. **Parameters Tab:**
   - **Options → Has Output Parser:** ✅ AKTIVIEREN
   - **Automatically Passthrough Binary Images:** ✅ AKTIVIEREN
3. **Speichern**

---

## ✅ Finale Struktur

```
Google Vertex Chat Model
    ↑ (ai_outputParser Verbindung - gestrichelt!)
Structured Output Parser
    ↓
AI Agent - Vertex AI
    ↓
Transform Output
```

---

## 🧪 Test

1. **Workflow aktivieren**
2. **Execute Workflow** klicken
3. **"Manual Trigger (Test)" öffnen**
4. **Test-Daten hinzufügen:**
   ```json
   {
     "query": {
       "sample": "1"
     }
   }
   ```
5. **Execute** → Sollte funktionieren!

---

**Das sollte jetzt funktionieren!**

