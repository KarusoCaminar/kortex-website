# 📊 Logs anzeigen und Fehler auslesen

## ✅ Was wurde implementiert:

### 1. **Persistentes Logging** (localStorage)
- ✅ Alle Workflow-Runs werden in `localStorage` gespeichert
- ✅ Logs enthalten: Request, Response, Events, Fehler, Performance-Daten
- ✅ Letzte 50 Runs werden gespeichert
- ✅ Automatisches Cleanup (ältere Logs werden entfernt)

### 2. **Log-Viewer** (`view-logs.html`)
- ✅ Grafische Oberfläche zum Anzeigen aller Logs
- ✅ Filter nach Status (success, error, started)
- ✅ Detaillierte Fehler-Anzeige
- ✅ Events-Übersicht
- ✅ Download-Funktion (JSON)
- ✅ Auto-Refresh alle 5 Sekunden

### 3. **JavaScript-Funktionen** (`get-last-logs.js`)
- ✅ `getLastRun()` - Ruft letzten Run ab
- ✅ `getLastRunErrors()` - Ruft Fehler des letzten Runs ab
- ✅ `showLastRunErrors()` - Zeigt Fehler in Console an
- ✅ `showAllErrors()` - Zeigt alle Fehler aus letzten 50 Runs

---

## 🔍 So nutzt du die Logs:

### Option 1: Log-Viewer öffnen

1. **Öffne `view-logs.html` im Browser:**
   ```
   https://karusocaminar.github.io/kortex-website/view-logs.html
   ```
   ODER lokal: Öffne `view-logs.html` Datei

2. **Siehst du:**
   - ✅ Alle Workflow-Runs mit Status
   - ✅ Statistiken (Gesamt, Erfolgreich, Fehler)
   - ✅ Klick auf einen Run → Detaillierte Ansicht
   - ✅ Fehler werden rot hervorgehoben

3. **Funktionen:**
   - 🔄 **Aktualisieren** - Lädt Logs neu
   - 💾 **Download** - Download als JSON
   - 🗑️ **Löschen** - Löscht alle Logs
   - 👁️ **Letzter Run** - Zeigt letzten Run mit Fehlern

---

### Option 2: Browser Console nutzen

1. **Öffne Browser Console:**
   - Chrome/Edge: `F12` → "Console" Tab
   - Firefox: `F12` → "Console" Tab

2. **Nutze JavaScript-Funktionen:**

```javascript
// Zeigt Fehler des letzten Runs
showLastRunErrors();

// Ruft letzten Run ab
const lastRun = getLastRun();
console.log(lastRun);

// Ruft Fehler ab
const errors = getLastRunErrors();
console.log(errors);

// Zeigt alle Fehler
showAllErrors();

// Öffnet Log-Viewer
openLogViewer();
```

---

### Option 3: Direkt aus localStorage

1. **Öffne Browser Console** (`F12`)

2. **Gib ein:**
```javascript
// Alle Logs abrufen
const logs = JSON.parse(localStorage.getItem('workflowLogs') || '[]');

// Letzter Run
const lastRun = logs[0];

// Fehler des letzten Runs
const errors = lastRun?.errors || [];

// Zeige Fehler
console.log('Fehler:', errors);
```

---

## 📋 Beispiel-Output:

### showLastRunErrors() Ausgabe:

```
🔍 Letzter Run: workflow-1234567890-abc123
  ⏰ Zeitstempel: 2025-01-27T12:00:00.000Z
  📝 Sample Parameter: sample=1
  🌐 Webhook URL: https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
  📊 Status: error
  ⏱️ Dauer: 123.45ms
  ❌ Fehler:
    Fehler 1:
      Typ: http_error
      Nachricht: HTTP 500: Internal Server Error
      HTTP Status: 500
      Response Body: { ... }
  📋 Events:
    1. request (2025-01-27T12:00:00.000Z) { method: 'GET', url: '...' }
    2. response (2025-01-27T12:00:05.000Z) { status: 500, ... }
    3. error (2025-01-27T12:00:05.000Z) { type: 'http_error', ... }
```

---

## 💡 Tipps:

### 1. Automatische Fehler-Benachrichtigung:

Du kannst einen Listener einrichten der automatisch Fehler anzeigt:

```javascript
// Prüfe alle 10 Sekunden auf neue Fehler
setInterval(() => {
  const lastRun = getLastRun();
  if (lastRun && lastRun.errors && lastRun.errors.length > 0) {
    console.warn('⚠️ Neuer Fehler im letzten Run!');
    showLastRunErrors();
  }
}, 10000);
```

### 2. Logs exportieren:

```javascript
// Exportiere als JSON
const logs = JSON.parse(localStorage.getItem('workflowLogs') || '[]');
const jsonStr = JSON.stringify(logs, null, 2);
const blob = new Blob([jsonStr], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'workflow-logs.json';
a.click();
```

### 3. Spezifische Logs filtern:

```javascript
// Nur Fehler-Logs
const logs = JSON.parse(localStorage.getItem('workflowLogs') || '[]');
const errorLogs = logs.filter(log => log.errors && log.errors.length > 0);

// Nur Sample 1 Logs
const sample1Logs = logs.filter(log => log.sampleParam === 'sample=1');

// Nur Logs mit bestimmter Dauer
const slowLogs = logs.filter(log => {
  const duration = parseFloat(log.duration?.replace('ms', '') || '0');
  return duration > 5000; // Mehr als 5 Sekunden
});
```

---

## 🔧 Troubleshooting:

### Problem: Keine Logs sichtbar

**Lösung:**
- Prüfe ob localStorage aktiviert ist (Browser-Einstellungen)
- Prüfe ob Workflow-Runs getriggert wurden
- Prüfe Browser Console für Fehler

### Problem: Logs werden nicht gespeichert

**Lösung:**
- Prüfe Browser Console für Fehler
- Prüfe ob `kortex-n8n-modal.html` das Logging enthält
- Prüfe ob localStorage Quota nicht überschritten ist

### Problem: Fehler werden nicht angezeigt

**Lösung:**
- Prüfe `workflowLog.errors` Array
- Prüfe ob Fehler korrekt gespeichert wurden
- Prüfe Log-Viewer für detaillierte Fehler

---

## ✅ Checkliste:

- [ ] `view-logs.html` öffnen
- [ ] Logs werden angezeigt
- [ ] `showLastRunErrors()` in Console testen
- [ ] Fehler werden korrekt angezeigt
- [ ] Logs können exportiert werden

---

## 🎉 Viel Erfolg beim Debugging!

Mit diesem System kannst du:
- ✅ Alle Workflow-Runs sehen
- ✅ Fehler sofort erkennen
- ✅ Performance-Tracking
- ✅ Logs exportieren
- ✅ Automatische Fehler-Erkennung

