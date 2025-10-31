# ✅ Test-Checkliste für Business Card Workflow

## 🎯 Was zu testen ist:

### 1. "Automatically Passthrough Binary Images" aktiviert ✅
   - Parameters Tab → Options → "Automatically Passthrough Binary Images" = ON

### 2. Tools entfernt ❌
   - Settings Tab → Tools → LEER (keine Tools!)

### 3. Chat Model konfiguriert ✅
   - Settings Tab → Chat Model → Google Vertex AI Gemini

---

## 🧪 Tests durchführen:

### Test 1: Sample 1 (bc-1.jpg)
1. **Öffne Website:**
   ```
   https://karusocaminar.github.io/kortex-website/
   ```

2. **Klicke auf "Sample 1" Karte**

3. **Erwartetes Ergebnis:**
   - ✅ Modal öffnet sich
   - ✅ Bild wird angezeigt
   - ✅ AI extrahiert Kontaktdaten
   - ✅ JSON Response kommt zurück
   - ✅ Daten werden im Modal angezeigt

4. **Prüfe Console (F12):**
   - ✅ Keine Fehler
   - ✅ Keine "Cannot read properties of undefined" Fehler

---

### Test 2: Sample 2 (bc-2.jpg)
1. **Klicke auf "Sample 2" Karte**

2. **Erwartetes Ergebnis:**
   - ✅ Modal öffnet sich
   - ✅ Bild wird angezeigt
   - ✅ AI extrahiert Kontaktdaten
   - ✅ Daten werden angezeigt

---

### Test 3: Sample 3 (bc-3.jpg)
1. **Klicke auf "Sample 3" Karte**

2. **Erwartetes Ergebnis:**
   - ✅ Modal öffnet sich
   - ✅ Bild wird angezeigt
   - ✅ AI extrahiert Kontaktdaten
   - ✅ Daten werden angezeigt

---

### Test 4: Upload (eigene Datei)
1. **Klicke auf "Upload" Option**

2. **Lade eine Visitenkarte hoch**

3. **Erwartetes Ergebnis:**
   - ✅ Upload-Dialog öffnet sich
   - ✅ Datei wird hochgeladen
   - ✅ AI extrahiert Kontaktdaten
   - ✅ Daten werden angezeigt

---

## 🔍 Falls Fehler auftreten:

### Fehler: "Cannot read properties of undefined (reading 'includes')"

**Lösung:**
1. ✅ Prüfe "Automatically Passthrough Binary Images" ist aktiviert
2. ✅ Prüfe Tools sind entfernt (Settings Tab → Tools → LEER)
3. ✅ Prüfe Chat Model ist konfiguriert

---

### Fehler: "Binary data missing"

**Lösung:**
1. ✅ Prüfe "Setze Sample-Info" Node gibt Binary weiter
2. ✅ Prüfe "Lade Sample X" Nodes haben `Response Format: File`
3. ✅ Prüfe Webhook Node hat Binary-Property aktiviert

---

### Fehler: "Chat Model not configured"

**Lösung:**
1. ✅ Settings Tab → Chat Model → "+"
2. ✅ Wähle "Google Vertex AI"
3. ✅ Konfiguriere Credentials

---

## ✅ Erfolg wenn:

- ✅ Alle 4 Tests funktionieren
- ✅ Keine Fehler in Console
- ✅ Kontaktdaten werden korrekt extrahiert
- ✅ Adresse ist vollständig (Straße + Hausnummer)
- ✅ Stadt enthält PLZ + Stadt
- ✅ JSON Response kommt zurück

---

## 📝 Test-Ergebnisse notieren:

### Sample 1:
- [ ] Funktioniert
- [ ] Fehler: _________________

### Sample 2:
- [ ] Funktioniert
- [ ] Fehler: _________________

### Sample 3:
- [ ] Funktioniert
- [ ] Fehler: _________________

### Upload:
- [ ] Funktioniert
- [ ] Fehler: _________________

---

## 🚀 Viel Erfolg beim Testen! 🎉

