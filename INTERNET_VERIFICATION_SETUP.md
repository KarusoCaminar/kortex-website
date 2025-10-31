# 🔍 Internet-Verifizierung und Plausibilitätsprüfung

## 📋 Übersicht

Der AI Agent kann jetzt:
1. ✅ **Internet-Recherche** nach Person und Firma durchführen
2. ✅ **Daten verifizieren** (passen Name und Firma zusammen?)
3. ✅ **Daten ergänzen** (fehlende Adressen, PLZ, etc.)
4. ✅ **Plausibilität prüfen** (ist die E-Mail plausibel?)

## ❓ Braucht man Memory oder Tools?

### **Memory: NEIN! ❌**
- Memory ist nur für **Konversationen über mehrere Runden**
- Eine Visitenkarten-Extraktion ist **einmalig pro Bild**
- Memory ist hier **nicht nötig**

### **Tools: OPTIONAL ⚠️**
- **Mit Tools:** Kann direkt Web-Search durchführen (z.B. Google Search API)
- **Ohne Tools:** Nutzt Gemini's eingebautes Wissen und Training
- **Empfehlung:** Erst OHNE Tools testen (funktioniert meist gut genug)

---

## 🚀 Lösung 1: OHNE Tools (EMPFOHLEN)

### Funktioniert mit:
- ✅ Gemini's eingebautem Trainingswissen
- ✅ Logische Plausibilitätsprüfungen
- ✅ Prompt-Anweisungen für Verifizierung

### Vorteile:
- ✅ **Einfacher** - keine zusätzliche Konfiguration
- ✅ **Schneller** - keine externen API-Calls
- ✅ **Kostenloser** - keine zusätzlichen API-Kosten

### Was der AI Agent macht:
1. Extrahiert Daten aus der Visitenkarte
2. Nutzt **Trainingswissen** (hat Millionen von Firmen und Personen in Training)
3. Prüft **Plausibilität**:
   - E-Mail-Format korrekt?
   - Telefonnummer passt zum Land?
   - Firma existiert wahrscheinlich?
   - Website-Domain passt zur Firma?

---

## 🔧 Lösung 2: MIT Tools (für bessere Verifizierung)

### Wenn du Internet-Suche brauchst:

#### Option A: Google Search Tool hinzufügen

1. **Öffne n8n:** `https://n8n2.kortex-system.de`

2. **Öffne Workflow:** `Business Card Extraction`

3. **Klicke auf "AI Agent - Vertex AI" Node**

4. **Gehe zu "Settings" Tab**

5. **Klicke auf "+" unter "Tools"**

6. **Wähle "Web Search" oder "Google Search"**

7. **Konfiguriere Tool:**
   - **Name:** `web_search` oder `google_search`
   - **API Key:** Deine Google Search API Key
   - **Engine ID:** Deine Custom Search Engine ID

8. **Klicke "Save"**

9. **Aktiviere Tool im AI Agent:**
   - Im "Settings" Tab: Stelle sicher, dass Tool aktiviert ist

#### Option B: Custom Tool mit HTTP Request

1. **Erstelle neuen HTTP Request Node** (vor dem AI Agent)

2. **Konfiguriere für Google Search API:**
   ```
   Method: GET
   URL: https://www.googleapis.com/customsearch/v1
   Query Parameters:
   - key: Deine API Key
   - cx: Deine Engine ID
   - q: {{ $json.name + " " + $json.company }}
   ```

3. **Verbinde mit AI Agent Node**

4. **AI Agent kann dann auf Search-Ergebnisse zugreifen**

---

## 📝 Verbesserter Prompt (bereits implementiert)

Der Prompt wurde bereits erweitert um:

### 1. Internet-Recherche-Anweisung:
```
- Suche im Internet nach der Person (Name + Firma)
- Prüfe ob Name und Firma zusammenpassen
- Verifiziere ob die Firma existiert
- Prüfe ob E-Mail-Domain zur Firma passt
```

### 2. Plausibilitätsprüfung:
```
- Ist die E-Mail-Adresse plausibel?
- Passt die Telefonnummer zum Land?
- Ist die Adresse vollständig und plausibel?
- Passt die Website zur Firma?
```

### 3. Daten-Ergänzung:
```
- Falls Adresse unvollständig: Suche nach vollständiger Adresse
- Falls PLZ fehlt: Suche PLZ zur Stadt
- Falls Website fehlt: Suche offizielle Website
```

### 4. Qualitätssicherung:
```
- verification_status: "verified", "partial", "unverified"
- confidence_score: 0.0-1.0
```

---

## ✅ Was wurde implementiert

### Im `n8n-business-card-workflow-vertex.json`:

1. **Prompt erweitert** um Internet-Recherche-Anweisungen
2. **System Message erweitert** um Verifizierungs-Fähigkeiten
3. **Neue Felder hinzugefügt:**
   - `verification_status`: Status der Verifizierung
   - `confidence_score`: Vertrauenswert (0.0-1.0)

---

## 🧪 Testen

### Test mit Sample 1/2/3:

1. **Führe Workflow aus** mit `?sample=1`

2. **Prüfe Response:**
   ```json
   {
     "name": "Oliver Krause",
     "company": "DSBOK",
     "email": "ok@dsbok.de",
     "verification_status": "verified",
     "confidence_score": 0.95
   }
   ```

3. **Prüfe ob:**
   - ✅ `verification_status` vorhanden ist
   - ✅ `confidence_score` vorhanden ist
   - ✅ Daten plausibel sind

---

## 📊 Response-Format

### Erweiterte Response-Struktur:

```json
{
  "name": "Max Mustermann",
  "company": "Beispiel GmbH",
  "email": "max@beispiel.de",
  "phone": "+49 123 456789",
  "phone_office": "+49 123 456788",
  "address": "Musterstraße 12",
  "city": "12345 Musterstadt",
  "website": "https://beispiel.de",
  "job_title": "Geschäftsführer",
  "verification_status": "verified",
  "confidence_score": 0.95
}
```

### Verification Status Werte:

- **`verified`**: Daten wurden verifiziert (hohe Wahrscheinlichkeit korrekt)
- **`partial`**: Teilweise verifiziert (manche Daten verifiziert)
- **`unverified`**: Nicht verifiziert (nur aus Visitenkarte extrahiert)

### Confidence Score:

- **0.9-1.0**: Sehr hoch (Daten sehr wahrscheinlich korrekt)
- **0.7-0.9**: Hoch (Daten wahrscheinlich korrekt)
- **0.5-0.7**: Mittel (Daten könnten korrekt sein)
- **0.0-0.5**: Niedrig (Unsicher ob Daten korrekt)

---

## 🔧 Anpassungen im Parse Node

Falls du die neuen Felder auch parsen willst:

Im **"Parse AI Agent Response" Node** Code:

```javascript
// Füge hinzu:
verification_status: extractedData.verification_status || 'unverified',
confidence_score: extractedData.confidence_score || 0.5
```

---

## 💡 Wichtige Hinweise

### 1. **Datenschutz:**
- Internet-Recherche könnte DSGVO-Probleme verursachen
- Prüfe ob das für deinen Use Case OK ist
- Eventuell nur mit Zustimmung des Nutzers

### 2. **Performance:**
- Mit Tools (Web Search): Langsamer (API-Calls)
- Ohne Tools: Schneller (nur Trainingswissen)
- Trade-off zwischen Genauigkeit und Geschwindigkeit

### 3. **Kosten:**
- Mit Tools: Zusätzliche API-Kosten (Google Search API)
- Ohne Tools: Nur Gemini API-Kosten
- Empfehlung: Erst OHNE Tools testen

---

## ✅ Checkliste

### Prompt-Verbesserung:
- [ ] Prompt erweitert um Internet-Recherche-Anweisungen
- [ ] System Message erweitert
- [ ] Neue Felder (`verification_status`, `confidence_score`) hinzugefügt

### Optional: Tools hinzufügen:
- [ ] Google Search Tool hinzugefügt (falls benötigt)
- [ ] Tool korrekt konfiguriert
- [ ] Tool im AI Agent aktiviert

### Testing:
- [ ] Test mit Sample 1 → `verification_status` vorhanden?
- [ ] Test mit Sample 2 → Daten plausibel?
- [ ] Test mit Sample 3 → `confidence_score` vorhanden?
- [ ] Test mit Upload → Funktioniert Verifizierung?

---

## 🚀 Nächste Schritte

1. **Workflow neu importieren** (oder Prompt manuell anpassen)
2. **Testen** mit Samples 1/2/3
3. **Prüfen** ob `verification_status` und `confidence_score` vorhanden sind
4. **Optional:** Tools hinzufügen falls mehr Verifizierung benötigt wird

