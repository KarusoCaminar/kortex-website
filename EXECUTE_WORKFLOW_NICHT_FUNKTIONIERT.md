# ❌ Execute Workflow funktioniert nicht - FIXES

## 🔧 Schnell-Fixes:

### Problem 1: Workflow nicht aktiviert

**Symptom:** "Execute Workflow" klicken → nichts passiert

**Lösung:**
1. **Oben rechts im Workflow:** "Active" Toggle aktivieren ✅
2. **ODER:** "Business Card Upload" Node → "Listen for Production" aktivieren
3. **Nochmal:** "Execute Workflow" klicken

---

### Problem 2: Manual Trigger nicht richtig konfiguriert

**Symptom:** Button klicken → Fenster öffnet sich nicht

**Lösung:**
1. **"Manual Trigger (Test)" Node öffnen** (im Workflow klicken)
2. **Settings Tab:**
   - ✅ "Always Output Data" aktivieren (Toggle)
3. **Workflow speichern**
4. **Nochmal:** "Execute Workflow" klicken

---

### Problem 3: Node nicht verbunden

**Symptom:** Button klicken → Fehlermeldung "No starting node"

**Lösung:**
1. **Prüfe Verbindungen:**
   - "Manual Trigger (Test)" → muss verbunden sein mit "Route to Sample"
2. **Falls keine Verbindung:**
   - Verbindungslinie ziehen: Manual Trigger → Route to Sample

---

### Problem 4: Browser-Cache

**Symptom:** Button klicken → nichts passiert, keine Reaktion

**Lösung:**
1. **Browser neu laden:** F5 oder Strg+F5 (Hard Reload)
2. **ODER:** n8n komplett neu laden
3. **ODER:** Anderen Browser verwenden

---

### Problem 5: Workflow-Fehler

**Symptom:** Button klicken → Fehlermeldung erscheint

**Lösung:**
1. **Fehlermeldung lesen** (was steht da?)
2. **"Executions" Tab öffnen** (oben im Workflow)
3. **Letzte Execution öffnen**
4. **Fehler finden** → Node öffnen → Fehler sehen

---

## 🚀 Alternative: Webhook direkt testen

**Wenn "Execute Workflow" nicht funktioniert:**

### Methode 1: Browser-URL

1. **Workflow aktivieren** (oben rechts: "Active" Toggle)
2. **Browser öffnen:**
   ```
   https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
   ```
3. **Prüfe:** Sollte JSON-Response zurückgeben

### Methode 2: Terminal (curl)

```powershell
curl "https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1"
```

**ODER mit PowerShell:**
```powershell
Invoke-WebRequest -Uri "https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1"
```

---

## 🔍 Debugging-Schritte:

### Schritt 1: Prüfe Workflow-Status

1. **Workflow öffnen**
2. **Oben rechts:** Ist "Active" aktiviert? ✅
3. **Falls NEIN:** Toggle aktivieren

### Schritt 2: Prüfe Manual Trigger Node

1. **"Manual Trigger (Test)" Node öffnen** (klicken)
2. **Settings Tab öffnen:**
   - ✅ "Always Output Data" aktiviert?
   - ✅ "Execute Once" deaktiviert (off)?
   - ✅ "Retry On Fail" deaktiviert (off)?
3. **Falls nicht:** Einstellungen korrigieren
4. **Workflow speichern**

### Schritt 3: Prüfe Verbindungen

1. **"Manual Trigger (Test)" Node:**
   - Gibt es eine Verbindungslinie nach rechts?
   - Verbunden mit "Route to Sample"?
2. **Falls NEIN:**
   - Verbindungslinie ziehen: Manual Trigger → Route to Sample

### Schritt 4: Prüfe Executions

1. **"Executions" Tab öffnen** (oben im Workflow)
2. **Letzte Execution öffnen** (falls vorhanden)
3. **Prüfe:** Welcher Fehler ist aufgetreten?
4. **Fehler-Node öffnen** → Fehlermeldung lesen

---

## ❌ Häufige Fehlermeldungen:

### "No starting node"

**Problem:** Manual Trigger nicht verbunden

**Lösung:** Verbindungslinie ziehen: Manual Trigger → Route to Sample

### "Workflow is not active"

**Problem:** Workflow deaktiviert

**Lösung:** Oben rechts: "Active" Toggle aktivieren ✅

### "Node execution failed"

**Problem:** Node hat einen Fehler

**Lösung:** 
1. Execution öffnen
2. Fehler-Node öffnen
3. Fehlermeldung lesen
4. Node korrigieren

---

## 🎯 Schnelltest (ohne Execute Workflow):

### Test 1: Webhook direkt

```
https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
```

**Falls das funktioniert:**
- Workflow ist OK
- Problem liegt am Manual Trigger
- Nutze Webhook-Methode statt Manual Trigger

### Test 2: Executions Tab

1. **Webhook aufrufen** (Browser-URL oben)
2. **n8n:** "Executions" Tab öffnen
3. **Letzte Execution öffnen**
4. **Prüfe:** Workflow läuft durch?

**Falls JA:**
- Workflow funktioniert!
- Manual Trigger ist das Problem
- Nutze Webhook statt Manual Trigger

---

## 💡 Empfehlung:

**Wenn "Execute Workflow" nicht funktioniert:**

1. **Workflow aktivieren** (oben rechts: "Active" Toggle) ✅
2. **Webhook direkt testen** (Browser-URL)
3. **Falls das funktioniert:** Workflow ist OK! ✅
4. **Manual Trigger nicht nötig** → Webhook reicht zum Testen

---

**Probiere erstmal: Workflow aktivieren + Webhook im Browser testen!**

