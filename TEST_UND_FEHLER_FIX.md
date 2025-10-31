# 🧪 Test & Fehler-Fix Anleitung

## 🚀 Schritt 1: Workflow testen

### Im Browser:

1. **Öffne die Website:**
   ```
   https://karusocaminar.github.io/kortex-website/
   ```
   ODER lokal: `index.html` öffnen

2. **Teste alle Samples:**
   - ✅ **Sample 1** - Klicke auf erste Demo-Card
   - ✅ **Sample 2** - Klicke auf zweite Demo-Card
   - ✅ **Sample 3** - Klicke auf dritte Demo-Card
   - ✅ **Upload** - Klicke auf "Eigene Visitenkarte hochladen"

3. **Prüfe in Browser Console (F12):**
   - ✅ Keine Fehler (rot)
   - ✅ Logs werden angezeigt (gruppiert)
   - ✅ Request wird gesendet
   - ✅ Response kommt zurück

---

## 🔍 Schritt 2: Logs prüfen

### Option A: Log-Viewer öffnen

1. **Öffne `view-logs.html` im Browser:**
   ```
   https://karusocaminar.github.io/kortex-website/view-logs.html
   ```
   ODER lokal: `view-logs.html` öffnen

2. **Siehst du:**
   - ✅ Alle Workflow-Runs mit Status
   - ✅ Statistiken (Gesamt, Erfolgreich, Fehler)
   - ✅ Fehler werden rot hervorgehoben

3. **Klicke auf "❌ Fehler-Zusammenfassung" Button:**
   - Zeigt alle Fehler aus allen Runs
   - Wird automatisch in Clipboard kopiert

---

### Option B: Browser Console nutzen

1. **Öffne Browser Console** (`F12`)

2. **Zeige Fehler des letzten Runs:**
   ```javascript
   showLastRunErrorsForExport()
   ```

3. **Oder zeige alle Fehler:**
   ```javascript
   showErrorSummary()
   ```

---

## 🐛 Schritt 3: Falls Fehler auftreten

### So zeigst du mir die Fehler:

#### Option 1: Exportiere Logs als JSON (EMPFOHLEN)

1. **In Log-Viewer (`view-logs.html`):**
   - Klicke auf **"🤖 Für AI exportieren"** Button
   - Datei wird heruntergeladen: `workflow-errors-for-ai-YYYY-MM-DD.json`
   - **Teile mir die Datei** - ich kann sie dann direkt lesen!

2. **ODER in Browser Console:**
   ```javascript
   downloadLogsJSON()
   ```
   - Datei wird heruntergeladen: `workflow-logs-export-YYYY-MM-DD.json`
   - **Teile mir die Datei**

---

#### Option 2: Zeige Fehler in Console

1. **Öffne Browser Console** (`F12`)

2. **Gib ein:**
   ```javascript
   showLastRunErrorsForExport()
   ```

3. **Du siehst:**
   - Alle Fehler des letzten Runs
   - JSON-String in der Console
   - **Kopiere den JSON-String** und zeige mir

---

#### Option 3: Fehler-Zusammenfassung

1. **Öffne Browser Console** (`F12`)

2. **Gib ein:**
   ```javascript
   showErrorSummary()
   ```

3. **Du siehst:**
   - Text-Zusammenfassung aller Fehler
   - Wird automatisch in Clipboard kopiert
   - **Paste mir die Zusammenfassung**

---

## ✅ Checkliste - Was zu prüfen ist:

### Im Browser:
- [ ] Sample 1 funktioniert
- [ ] Sample 2 funktioniert
- [ ] Sample 3 funktioniert
- [ ] Upload funktioniert
- [ ] Keine Fehler in Console (rot)
- [ ] Logs werden angezeigt (gruppiert)

### In Log-Viewer:
- [ ] Logs werden angezeigt
- [ ] Letzter Run ist sichtbar
- [ ] Status ist korrekt (success/error)
- [ ] Fehler werden angezeigt (falls vorhanden)

### Falls Fehler:
- [ ] Exportiere Logs ("🤖 Für AI exportieren")
- [ ] Teile mir die JSON-Datei
- [ ] Oder kopiere Fehler aus Console

---

## 🔧 Schritt 4: Fehler fixen

### Sobald du mir die Fehler zeigst:

1. **Ich analysiere die Logs:**
   - ✅ Welche Fehler sind aufgetreten?
   - ✅ In welchem Workflow-Schritt?
   - ✅ Was ist die Ursache?

2. **Ich gebe dir Lösungen:**
   - ✅ Konkrete Fixes für n8n Workflow
   - ✅ Code-Änderungen falls nötig
   - ✅ Schritt-für-Schritt Anleitung

3. **Wir testen erneut:**
   - ✅ Fixes implementieren
   - ✅ Erneut testen
   - ✅ Prüfen ob Fehler behoben sind

---

## 📊 Was die Logs enthalten:

### Für mich (AI-Assistent) sichtbar:

1. **Letzter Run:**
   - ✅ Status (success/error/started)
   - ✅ Fehler (Typ, Nachricht, HTTP Status)
   - ✅ Events (Request, Response, etc.)
   - ✅ Response-Daten

2. **Alle Fehler:**
   - ✅ Fehler-Typ (http_error, exception, etc.)
   - ✅ Fehler-Nachricht
   - ✅ HTTP Status (falls vorhanden)
   - ✅ Response Body (falls vorhanden)
   - ✅ Stack Trace (falls vorhanden)

3. **Statistiken:**
   - ✅ Anzahl erfolgreicher Runs
   - ✅ Anzahl fehlerhafter Runs
   - ✅ Performance-Daten

---

## 🎯 Zusammenfassung:

### Test-Prozess:

1. **Teste Workflow** → Sample 1, 2, 3, Upload
2. **Prüfe Console** → Fehler? Logs?
3. **Öffne Log-Viewer** → `view-logs.html`
4. **Exportiere Logs** → "🤖 Für AI exportieren" Button
5. **Teile mir die Datei** → Ich analysiere Fehler
6. **Wir fixen zusammen** → Lösungen implementieren

---

## 💡 Tipps:

### Automatische Fehler-Erkennung:

Du kannst einen Listener einrichten, der automatisch warnt:

```javascript
// Prüfe alle 10 Sekunden auf neue Fehler
setInterval(() => {
  const lastRun = getLastRun();
  if (lastRun && lastRun.errors && lastRun.errors.length > 0) {
    console.warn('⚠️ NEUER FEHLER! Exportiere Logs mit: downloadLogsJSON()');
    alert('⚠️ Fehler aufgetreten! Exportiere Logs mit "🤖 Für AI exportieren" Button');
  }
}, 10000);
```

---

## ✅ Viel Erfolg beim Testen! 🎉

Falls Fehler auftreten:
1. **Exportiere Logs** ("🤖 Für AI exportieren")
2. **Teile mir die JSON-Datei**
3. **Ich analysiere und gebe Lösungen**

Dann fixen wir die Fehler zusammen! 🚀

