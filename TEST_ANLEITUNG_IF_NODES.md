# ✅ Test-Anleitung: IF Nodes nach Fix

## ✅ Nodes sind jetzt korrekt konfiguriert!

**Konfiguration bestätigt:**
- ✅ "Ist Sample?": `={{$json.query.sample}}` → "is not empty"
- ✅ "Sample 1?": `={{$json.query.sample}}` → "is equal to" → `1`
- ✅ "Sample 2?": `={{$json.query.sample}}` → "is equal to" → `2`
- ✅ "Sample 3?": `={{$json.query.sample}}` → "is equal to" → `3`

---

## 🧪 Test-Schritte:

### SCHRITT 1: Workflow speichern & aktivieren

1. **n8n öffnen** → Workflows → "Business Card Extraction Demo - Vertex AI"
2. **Workflow speichern** (Ctrl+S oder Save-Button)
3. **Workflow aktivieren** (grüner Toggle oben rechts)

---

### SCHRITT 2: Test in n8n (optional)

1. Klicke auf **"Business Card Upload"** Webhook Node
2. Klicke auf **"Test URL"** oder **"Copy URL"**
3. Öffne **Postman** oder **curl** und teste:

**Test Sample 1:**
```bash
curl "https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1"
```

**Test Sample 2:**
```bash
curl "https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=2"
```

**Test Sample 3:**
```bash
curl "https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=3"
```

4. **Prüfe Executions** in n8n:
   - Öffne "Executions" Tab
   - Klicke auf die letzte Execution
   - Prüfe:
     - "Ist Sample?" → sollte `true` sein
     - "Sample 1?" → sollte `true` sein (für `?sample=1`)
     - "Sample 2?" → sollte `true` sein (für `?sample=2`)
     - "Sample 3?" → sollte `true` sein (für `?sample=3`)

---

### SCHRITT 3: Test auf Website

1. **Öffne:** `https://karusocaminar.github.io/kortex-website/kortex-n8n-modal.html`
2. **Öffne Browser-Konsole** (F12)
3. **Klicke auf "Visitenkarte 1"** (Sample 1)
   - Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=1`
   - Modal sollte öffnen
   - Loading-Indicator sollte erscheinen
   - **Warte auf Antwort** (kann 10-30 Sekunden dauern)
   - Daten sollten in Tabelle erscheinen
   - Modal sollte nach 1.5 Sekunden automatisch schließen

4. **Klicke auf "Visitenkarte 2"** (Sample 2)
   - Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=2`
   - **WICHTIG:** Jetzt sollten Daten von **Sample 2** (Gabi Graßnick) kommen, NICHT Sample 1!
   - Prüfe ob korrekte Daten extrahiert werden

5. **Klicke auf "Visitenkarte 3"** (Sample 3)
   - Console sollte zeigen: `🌐 Final Webhook URL: ...?sample=3`
   - **WICHTIG:** Jetzt sollten Daten von **Sample 3** kommen, NICHT Sample 1!
   - Prüfe ob korrekte Daten extrahiert werden

6. **Teste Upload:**
   - Klicke auf "Eigene Visitenkarte hochladen"
   - Wähle eine Bilddatei aus
   - Console sollte zeigen: `🌐 Final Webhook URL: ...` (OHNE `?sample=`)
   - Daten sollten extrahiert werden

---

## ✅ Erwartetes Verhalten:

### ✅ Sample 1 (Oliver Krause):
- **Name:** "Oliver Krause"
- **Firma:** "DSBOK" oder ähnlich
- **Email:** "oliver.krause@dsbok.de"
- **Telefon:** "+49 160 5384727"

### ✅ Sample 2 (Gabi Graßnick):
- **Name:** "Gabi Graßnick" oder "Gabi Graßnick"
- **Firma:** "Graßnick Bau" oder ähnlich
- **Email:** Andere Email als Sample 1
- **Telefon:** Andere Nummer als Sample 1

### ✅ Sample 3:
- **Name:** Andere Person als Sample 1 & 2
- **Firma:** Andere Firma als Sample 1 & 2
- **Email:** Andere Email als Sample 1 & 2

---

## 🐛 Wenn es IMMER NOCH nicht funktioniert:

### Problem 1: Immer noch nur Sample 1

**Prüfe n8n Executions:**
1. Öffne n8n → Executions
2. Klicke auf letzte Execution (Sample 2 oder 3)
3. Klicke auf **"Sample 2?"** oder **"Sample 3?"** Node
4. Prüfe **INPUT:**
   - Zeigt `query: { sample: "2" }`? (für Sample 2)
   - Zeigt `query: { sample: "3" }`? (für Sample 3)
5. Prüfe **OUTPUT:**
   - Welcher Branch wurde genommen? (`true` oder `false`)
   - Stimmt das mit dem erwarteten Verhalten überein?

**Wenn INPUT leer ist oder falsch:**
- Problem liegt im Website-Code (`kortex-n8n-modal.html`)
- Prüfe Browser-Console: Zeigt `🌐 Final Webhook URL:` den korrekten Parameter?

**Wenn INPUT korrekt, aber OUTPUT falsch:**
- Problem liegt in der IF Node-Konfiguration
- Prüfe ob Expression-Syntax korrekt ist: `={{$json.query.sample}}`
- Prüfe ob Operator korrekt ist: "equals"
- Prüfe ob value2 korrekt ist: `2` oder `3` (als String)

---

### Problem 2: Workflow läuft, aber keine Daten kommen zurück

**Prüfe n8n Execution:**
1. Öffne Execution in n8n
2. Prüfe jeden Node:
   - "Ist Sample?" → sollte `true` sein
   - "Sample X?" → sollte `true` sein
   - "Lade Sample X" → sollte Binary-Daten enthalten
   - "Setze Sample-Info" → sollte Binary-Daten weitergeben
   - "AI Agent - Vertex AI" → sollte extrahierte Daten haben
   - "Parse AI Agent Response" → sollte JSON haben
   - "Formatiere für Website" → sollte Format haben
   - "Antwort an Website" → sollte Response haben

**Prüfe Webhook Response Mode:**
1. Klicke auf "Business Card Upload" Webhook Node
2. Öffne **Options** Tab
3. Prüfe **"Response Mode":**
   - ✅ Sollte sein: **"Respond When Last Node Finishes"**
   - ❌ NICHT: "Respond Immediately" oder "Respond When First Node Finishes"

---

## ✅ Erfolgskriterien:

- [ ] **Sample 1** → korrekte Daten (Oliver Krause)
- [ ] **Sample 2** → korrekte Daten (Gabi Graßnick) - NICHT Sample 1!
- [ ] **Sample 3** → korrekte Daten (andere Person) - NICHT Sample 1!
- [ ] **Upload** → funktioniert mit eigenen Bildern
- [ ] **Modal** schließt automatisch nach 1.5 Sekunden
- [ ] **Tabelle** scrollt automatisch zu den Ergebnissen
- [ ] **Loading-Bar** wird angezeigt während Verarbeitung

---

**Status:** ✅ **IF Nodes sind korrekt konfiguriert - jetzt testen!**

