# ✅ Schnell-Test-Anleitung - Visitenkarten-Workflow

## 🚀 So testest du:

### 1. Öffne die Website
```
https://karusocaminar.github.io/kortex-website/
```

ODER lokal:
```
Öffne index.html im Browser
```

---

## 🧪 Tests durchführen:

### Test 1: Sample 1 (bc-1.jpg)
1. **Klicke auf die erste Demo-Card** ("Business Card – Sample 1")
2. **Erwartetes Ergebnis:**
   - ✅ Modal öffnet sich
   - ✅ Loading-Spinner wird angezeigt ("🔄 KI-Extraktion startet...")
   - ✅ KEINE Demo-Daten werden sofort eingefügt
   - ✅ Nach ein paar Sekunden: Echte AI-Response kommt und wird in Tabelle angezeigt
   - ✅ Nur EIN Eintrag in der Tabelle (keine Doppelten!)

### Test 2: Sample 2 (bc-2.jpg)
1. **Klicke auf die zweite Demo-Card** ("Business Card – Sample 2")
2. **Erwartetes Ergebnis:**
   - ✅ Modal öffnet sich
   - ✅ Loading-Spinner wird angezeigt
   - ✅ KEINE Demo-Daten werden sofort eingefügt
   - ✅ Echte AI-Response kommt und wird angezeigt
   - ✅ Nur EIN Eintrag pro Sample

### Test 3: Sample 3 (bc-3.jpg)
1. **Klicke auf die dritte Demo-Card** ("Business Card – Sample 3")
2. **Erwartetes Ergebnis:**
   - ✅ Modal öffnet sich
   - ✅ Loading-Spinner wird angezeigt
   - ✅ KEINE Placeholder-Daten werden eingefügt
   - ✅ Echte AI-Response kommt und wird angezeigt

### Test 4: Upload (eigene Datei)
1. **Klicke auf "Eigene Visitenkarte hochladen"**
2. **Wähle eine Bilddatei** (jpg, png)
3. **Erwartetes Ergebnis:**
   - ✅ Upload-Dialog öffnet sich
   - ✅ Datei wird hochgeladen
   - ✅ Loading-Spinner wird angezeigt
   - ✅ Echte AI-Response kommt und wird angezeigt

---

## ✅ Was du prüfen solltest:

### Im Browser (F12 Console):
- ✅ Keine Fehler beim Klicken auf Samples
- ✅ Fetch-Request wird gesendet an: `https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1`
- ✅ Response kommt zurück vom n8n Workflow
- ✅ Console zeigt: "✅ Workflow Response:" mit JSON-Daten
- ✅ Console zeigt: "✅ Daten in Tabelle eingefügt"

### In der Tabelle:
- ✅ KEINE Demo-Daten (Oliver Krause, Gabi Graßnick) werden angezeigt
- ✅ Nur echte AI-Responses werden angezeigt
- ✅ KEINE doppelten Einträge (Demo + echte Response)
- ✅ Kontaktdaten sind korrekt extrahiert:
  - Name
  - Firma
  - E-Mail
  - Telefon
  - Adresse (falls vorhanden)
  - Stadt (falls vorhanden)

---

## 🔍 Falls Fehler auftreten:

### Fehler: "Cannot read properties of undefined (reading 'includes')"
**Lösung:**
- Prüfe in n8n: "Automatically Passthrough Binary Images" aktiviert
- Prüfe in n8n: Tools sind entfernt (Settings Tab → Tools → LEER)
- Prüfe in n8n: Chat Model ist konfiguriert

### Fehler: "Failed to fetch" oder CORS-Fehler
**Lösung:**
- Prüfe ob n8n Workflow aktiviert ist
- Prüfe ob Webhook-URL korrekt ist: `https://n8n2.kortex-system.de/webhook/business-card-extraction`
- Prüfe ob n8n Server online ist

### Fehler: Keine Response kommt zurück
**Lösung:**
- Prüfe n8n Workflow Execution Logs
- Prüfe ob AI Agent Node konfiguriert ist
- Prüfe ob Binary-Daten korrekt weitergegeben werden

---

## 📝 Test-Ergebnisse notieren:

### Sample 1:
- [ ] Funktioniert ✅
- [ ] Fehler: _________________

### Sample 2:
- [ ] Funktioniert ✅
- [ ] Fehler: _________________

### Sample 3:
- [ ] Funktioniert ✅
- [ ] Fehler: _________________

### Upload:
- [ ] Funktioniert ✅
- [ ] Fehler: _________________

### Doppelte Einträge:
- [ ] KEINE Doppelten ✅
- [ ] Problem: _________________

---

## ✅ Checkliste - Was funktionieren sollte:

- [ ] Modal öffnet sich beim Klick auf Sample/Upload
- [ ] Loading-Spinner wird angezeigt
- [ ] KEINE Demo-Daten werden sofort eingefügt
- [ ] Echte AI-Response kommt nach ein paar Sekunden
- [ ] Response wird in Tabelle angezeigt
- [ ] KEINE doppelten Einträge
- [ ] Modal bleibt offen (schließt nicht automatisch)
- [ ] Console zeigt keine Fehler

---

## 🎉 Viel Erfolg beim Testen!

Falls Probleme auftreten, sag Bescheid - dann schauen wir uns das zusammen an!

