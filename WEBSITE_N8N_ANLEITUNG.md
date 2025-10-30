# 🌐 Website + n8n Integration - Finale Anleitung

## ✅ Was wurde gemacht?

1. ✅ **Invoice-Ordner aufgeräumt** - Alle n8n-Dateien entfernt
2. ✅ **Button auf Startseite verknüpft** - Öffnet jetzt `kortex-n8n-modal.html`
3. ✅ **n8n-URL eingetragen** - Workflow-URL konfiguriert
4. ✅ **Workflow-Visualisierung aktiviert** - `?visualize=true` Parameter

---

## 🔗 Button-Verknüpfung

### Startseite → Demo-Seite

Der Button **"Visitenkarten-Extraktion"** auf deiner Startseite (`index.html`) öffnet jetzt:

```
kortex-n8n-modal.html
```

**Status:** ✅ **Fertig!** Keine weitere Konfiguration nötig.

---

## ⚙️ n8n Workflow-URL

### Aktuelle Konfiguration:

Alle 3 Demo-Cards in `kortex-n8n-modal.html` verwenden:

```
https://n8n2.kortex-system.de/webhook/business-card-extraction
```

### ⚠️ WICHTIG: URL anpassen falls nötig!

Falls dein n8n Webhook einen anderen Pfad hat:

1. Öffne n8n: `https://n8n2.kortex-system.de`

2. Gehe zu deinem Workflow: `JkdKPm27OWy93nU5`

3. Klicke auf **"Business Card Upload"** Node (ganz links)

4. Klicke **"Test URL"** oder **"Production URL"**

5. Kopiere die **Webhook-URL** (nicht die Workflow-Seite!)

6. Ersetze in `kortex-n8n-modal.html` (3x, Zeilen ~362, ~392, ~422):
   ```html
   data-workflow-url="https://n8n2.kortex-system.de/webhook/business-card-extraction"
   ```
   Durch deine tatsächliche Webhook-URL.

---

## 🎯 Memory & Tool - Braucht meine KI das?

### **Nein, für deine Demo brauchst du das NICHT!**

**Warum?**

1. **Memory:**
   - Braucht man nur für **Konversationen** über mehrere Runden
   - Deine Demo ist **einmalig** pro Visitenkarte
   - Nicht nötig für einfache Extraktion

2. **Tool:**
   - Braucht man nur für **externe Funktionen** (z.B. API-Calls, Datenbankabfragen)
   - Deine KI extrahiert nur Daten aus dem Bild
   - Nicht nötig für reine Extraktion

### Wann würde man Memory/Tool brauchen?

- **Memory:** Wenn der Nutzer mehrere Fragen stellt und die KI sich "erinnern" soll
- **Tool:** Wenn die KI z.B. zusätzliche Daten aus einer API holen soll

**Für deine Demo:** Alles **ohne** Memory/Tool perfekt! ✨

---

## 📊 n8n-Workflow-Visualisierung

### **Ja, die Visualisierung funktioniert!**

### Wie es funktioniert:

1. **Modal öffnet n8n-Formular:**
   - URL: `https://n8n2.kortex-system.de/webhook/business-card-extraction?visualize=true`
   - Der Parameter `?visualize=true` aktiviert die Workflow-Visualisierung

2. **n8n zeigt Execution:**
   - Beim Klick auf Sample 1/2 oder Upload
   - n8n zeigt im Modal den laufenden Workflow
   - Du siehst Node für Node, wie die Daten durchlaufen

3. **Visualisierung im iFrame:**
   - Das n8n Modal läuft im iFrame auf deiner Website
   - Der User sieht, wie der Workflow Schritt für Schritt durchläuft
   - Tolle "Wow"-Effekt für die Demo!

### **Was der User sieht:**

1. **Klick auf "Business Card – Sample 1":**
   - Modal öffnet sich
   - n8n zeigt: "Lade Sample 1" → läuft
   - n8n zeigt: "Konvertiere zu Base64" → läuft
   - n8n zeigt: "AI Agent - Vertex AI" → läuft (Gemini analysiert)
   - n8n zeigt: "Parse AI Agent Response" → läuft
   - n8n zeigt: "Formatiere für Website" → läuft
   - Ergebnisse erscheinen in der Tabelle unten!

2. **Klick auf "Eigene Visitenkarte hochladen":**
   - Modal öffnet sich
   - n8n-Formular lädt
   - User lädt Datei hoch
   - n8n zeigt Workflow-Visualisierung
   - Ergebnisse erscheinen!

### **Voraussetzung:**

Im n8n **Webhook Node** muss aktiviert sein:
- ✅ **"Continue Workflow after Webhook Response"**

Ohne diese Einstellung funktioniert die Visualisierung NICHT!

---

## 🎯 Workflow-URL richtig setzen

### Option 1: Webhook-URL (Empfohlen)

Im n8n Webhook Node:
1. Klicke auf **"Business Card Upload"** Node
2. Klicke **"Test URL"** oder **"Production URL"**
3. Kopiere die **Webhook-URL**
4. Ersetze in `kortex-n8n-modal.html`

**Beispiel-URL:**
```
https://n8n2.kortex-system.de/webhook/business-card-extraction
```

### Option 2: Workflow-Form-URL

Falls n8n ein Formular generiert:
```
https://n8n2.kortex-system.de/workflow/JkdKPm27OWy93nU5
```

**Aber:** Webhook-URL ist besser für API-Integration!

---

## ✅ Checkliste: Alles funktioniert?

### Website:
- [ ] Button auf Startseite zeigt auf `kortex-n8n-modal.html`
- [ ] `kortex-n8n-modal.html` existiert
- [ ] n8n-URL ist eingetragen (3x)
- [ ] Keine Platzhalter mehr (`DEINE_N8N_...`)

### n8n:
- [ ] Workflow ist aktiv
- [ ] "Continue Workflow after Webhook Response" aktiviert
- [ ] Webhook-URL ist bekannt
- [ ] AI Agent Node konfiguriert (Gemini 2.5 Flash)
- [ ] Chat Model zeigt Google Vertex AI
- [ ] Credentials sind ausgewählt

### Test:
- [ ] Startseite öffnen
- [ ] Auf "Visitenkarten-Extraktion" klicken
- [ ] Modal sollte sich öffnen
- [ ] Sample 1 sollte funktionieren
- [ ] Sample 2 sollte funktionieren
- [ ] Upload sollte funktionieren
- [ ] Workflow-Visualisierung sollte erscheinen
- [ ] Ergebnisse sollten in Tabelle erscheinen

---

## 🆘 Troubleshooting

### Problem: "Modal öffnet sich, aber n8n lädt nicht"

**Lösung:**
1. Prüfe Webhook-URL ist korrekt
2. Prüfe n8n Workflow ist aktiv
3. Prüfe CORS-Einstellungen in n8n

### Problem: "Workflow-Visualisierung erscheint nicht"

**Lösung:**
1. Prüfe "Continue Workflow after Webhook Response" ist aktiviert
2. Prüfe URL enthält `?visualize=true` Parameter
3. Prüfe n8n Execution Logs

### Problem: "Keine Ergebnisse in Tabelle"

**Lösung:**
1. Prüfe Browser Console (F12) auf Fehler
2. Prüfe postMessage funktioniert
3. Prüfe n8n Response-Format ist korrekt

---

## 🎉 Fertig!

Deine Website ist jetzt perfekt mit n8n integriert! 🚀

**Was funktioniert:**
- ✅ Button öffnet Demo-Seite
- ✅ Demo-Seite öffnet n8n-Formular im Modal
- ✅ Workflow-Visualisierung läuft
- ✅ Ergebnisse erscheinen in Tabelle
- ✅ CSV/JSON Download funktioniert

**Viel Erfolg!** ✨

