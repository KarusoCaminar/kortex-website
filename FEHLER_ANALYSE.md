# ❌ Fehler-Analyse - So zeigst du mir die Logs

## 🔍 Schritt 1: Öffne diese Seite

**Öffne diese Datei im Browser:**
```
show-logs-in-console.html
```

**ODER öffne Browser Console (F12) und gib ein:**

```javascript
// Zeige Fehler des letzten Runs
showLastRunErrors()

// Oder alle Logs aus localStorage
const logs = JSON.parse(localStorage.getItem('workflowLogs') || '[]');
console.log('Alle Logs:', logs);
console.log('Letzter Run:', logs[0]);
console.log('Fehler:', logs[0]?.errors || []);
```

---

## 📋 Schritt 2: Kopiere mir die Logs

### Option A: Direkt aus Console kopieren

1. **Öffne Browser Console** (`F12`)
2. **Gib ein:**
```javascript
const logs = JSON.parse(localStorage.getItem('workflowLogs') || '[]');
console.log(JSON.stringify(logs, null, 2));
```
3. **Kopiere den JSON-String** aus der Console
4. **Paste mir den String hier**

---

### Option B: Exportiere als Datei

1. **Öffne Browser Console** (`F12`)
2. **Gib ein:**
```javascript
// Erstelle Download
const logs = JSON.parse(localStorage.getItem('workflowLogs') || '[]');
const jsonStr = JSON.stringify(logs, null, 2);
const blob = new Blob([jsonStr], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'workflow-logs.json';
a.click();
```
3. **Datei wird heruntergeladen**
4. **Öffne die Datei** und kopiere den Inhalt
5. **Paste mir den Inhalt hier**

---

### Option C: Zeige mir Screenshots

1. **Öffne Browser Console** (`F12`)
2. **Gib ein:**
```javascript
showLastRunErrors()
```
3. **Mache Screenshot** der Console
4. **Zeige mir den Screenshot**

---

## 🔧 Schritt 3: Prüfe auch diese Dinge

### Im Browser Console:

1. **Sind Logs vorhanden?**
```javascript
localStorage.getItem('workflowLogs')
```
   - Sollte JSON-String zurückgeben
   - Falls `null` → Logs werden nicht gespeichert

2. **Welche Fehler erscheinen?**
   - Prüfe rote Fehler-Meldungen in Console
   - Kopiere mir die Fehler-Meldungen

3. **Was passiert beim Klick?**
   - Prüfe ob Request gesendet wird
   - Prüfe ob Response kommt
   - Prüfe ob Fehler auftreten

---

## ❓ Häufige Probleme:

### Problem 1: "localStorage.getItem('workflowLogs')" gibt null zurück

**Mögliche Ursachen:**
- Logs werden nicht gespeichert (Bug im Code)
- localStorage ist deaktiviert
- Anderer Browser/Private Mode

**Lösung:**
- Prüfe Browser Console für Fehler
- Prüfe ob `kortex-n8n-modal.html` Logging enthält

---

### Problem 2: Keine Logs werden angezeigt

**Mögliche Ursachen:**
- Workflow wurde nicht getriggert
- Logging-Funktion ist nicht aufgerufen
- JavaScript-Fehler verhindert Logging

**Lösung:**
- Prüfe Browser Console für JavaScript-Fehler
- Prüfe ob `workflowLog` Variable existiert

---

### Problem 3: Fehler aber keine Details

**Mögliche Ursachen:**
- Fehler werden nicht korrekt gespeichert
- Fehler-Format ist falsch

**Lösung:**
- Prüfe `workflowLog.errors` Array
- Prüfe ob Fehler korrekt gespeichert werden

---

## ✅ Checkliste:

- [ ] Browser Console geöffnet (F12)
- [ ] `localStorage.getItem('workflowLogs')` prüft ob Logs vorhanden
- [ ] Logs werden angezeigt (falls vorhanden)
- [ ] Fehler werden angezeigt (falls vorhanden)
- [ ] Logs kopiert oder exportiert
- [ ] Mir gezeigt/geteilt

---

## 🎯 Nächste Schritte:

1. **Zeige mir die Logs** (eine der Optionen oben)
2. **Ich analysiere** die Fehler
3. **Ich gebe Lösungen** und Fixes
4. **Wir implementieren** die Fixes
5. **Erneut testen**

---

## 💡 Schnell-Check:

**Kopiere und füge in Browser Console ein:**

```javascript
// Prüfe ob Logs vorhanden
const hasLogs = localStorage.getItem('workflowLogs');
console.log('Logs vorhanden:', !!hasLogs);

if (hasLogs) {
  const logs = JSON.parse(hasLogs);
  console.log('Anzahl Logs:', logs.length);
  console.log('Letzter Run:', logs[0]);
  if (logs[0]?.errors) {
    console.log('Fehler im letzten Run:', logs[0].errors);
  }
} else {
  console.log('❌ KEINE LOGS GEFUNDEN! Logging funktioniert nicht.');
}
```

**Zeige mir dann die Ausgabe!**

