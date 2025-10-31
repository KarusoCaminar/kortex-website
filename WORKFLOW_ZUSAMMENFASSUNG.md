# 📋 Workflow-Zusammenfassung: Visitenkarten-Extraktion

## 🎯 Ziel
**Einfacher Workflow:**
1. Nutzer klickt auf Visitenkarte (Sample oder Upload)
2. Modal öffnet sich mit Loading-Indicator
3. n8n Workflow analysiert Visitenkarte
4. Extrahierte Daten werden in Tabelle eingefügt
5. Modal schließt sich automatisch nach 2 Sekunden

---

## 🔄 Ablauf

### 1. Nutzer klickt auf Visitenkarte

**Samples (1, 2, 3):**
- GET Request an: `https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1`
- Workflow lädt Sample-Bild von GitHub
- AI Agent extrahiert Daten
- Daten werden zurückgegeben

**Upload:**
- POST Request mit FormData (Bilddatei)
- An: `https://n8n2.kortex-system.de/webhook/business-card-extraction`
- Workflow verwendet hochgeladene Datei
- AI Agent extrahiert Daten
- Daten werden zurückgegeben

### 2. Modal öffnet sich

```javascript
openWorkflowModal(workflowUrl, workflowTitle, uploadFile = null)
```

- Modal wird angezeigt
- Loading-Indicator: "🔄 KI-Extraktion startet..."
- Request wird gesendet (mit 30s Timeout)

### 3. Response-Verarbeitung

**Erfolgreiche Response:**
```json
{
  "type": "business-card-processed",
  "payload": {
    "name": "...",
    "company": "...",
    "email": "...",
    "phone": "...",
    "address": "...",
    "city": "...",
    "source": "Sample 1" | "Upload",
    "timestamp": "..."
  }
}
```

**Oder verschachtelt:**
```json
{
  "json": {
    "type": "business-card-processed",
    "payload": { ... }
  }
}
```

**Oder Array:**
```json
[
  {
    "type": "business-card-processed",
    "payload": { ... }
  }
]
```

### 4. Daten in Tabelle einfügen

- Daten werden zu `extractedResults` hinzugefügt
- Tabelle wird aktualisiert (`renderResults()`)
- Loading-Indicator wird versteckt

### 5. Auto-Close Modal

- **Nach 2 Sekunden** wird `closeWorkflowModal()` aufgerufen
- Modal schließt sich automatisch
- Nutzer sieht die Daten in der Tabelle

---

## 🔧 Implementierung

### Auto-Close Trigger:

1. **Direkte Response:**
   ```javascript
   if (responseType === 'business-card-processed' && responsePayload) {
     // Daten einfügen
     // ...
     setTimeout(() => closeWorkflowModal(), 2000);
   }
   ```

2. **Array Response:**
   ```javascript
   if (Array.isArray(responseData) && responseData.length > 0) {
     // Daten einfügen
     // ...
     setTimeout(() => closeWorkflowModal(), 2000);
   }
   ```

3. **PostMessage Event:**
   ```javascript
   window.addEventListener('message', (event) => {
     if (event.data?.type === 'business-card-processed') {
       // Daten einfügen
       // ...
       setTimeout(() => closeWorkflowModal(), 2000);
     }
   });
   ```

4. **Workflow Complete Event:**
   ```javascript
   if (event.data.type === 'workflow-complete') {
     setTimeout(() => closeWorkflowModal(), 2000);
   }
   ```

---

## ⚠️ Asynchroner Workflow ("Workflow was started")

Wenn n8n antwortet mit:
```json
{ "message": "Workflow was started" }
```

**Dann:**
- Loading-Indicator bleibt sichtbar
- Workflow-Screenshot wird angezeigt
- **Wartet auf finale Antwort** vom "Respond to Webhook" Node
- Daten kommen über **PostMessage** Event
- Dann: Auto-Close nach 2 Sekunden

---

## ✅ Erfolgreicher Workflow

1. ✅ Klick auf Visitenkarte
2. ✅ Modal öffnet sich
3. ✅ Loading-Indicator sichtbar
4. ✅ Request wird gesendet
5. ✅ Response wird empfangen
6. ✅ Daten werden extrahiert
7. ✅ Daten werden in Tabelle eingefügt
8. ✅ Loading-Indicator wird versteckt
9. ✅ Modal schließt sich nach 2 Sekunden automatisch

---

## 🐛 Debugging

**Browser Console (F12):**
- Alle Workflow-Events werden geloggt
- Response-Struktur wird angezeigt
- Auto-Close Events werden geloggt

**view-logs.html:**
- Vollständige Logs aller Workflow-Runs
- Kann exportiert werden für Analyse

**localStorage:**
- Logs werden in `localStorage.setItem('workflowLogs', ...)` gespeichert
- Maximal 50 Einträge

---

## 📊 Status

✅ **Auto-Close implementiert** - Modal schließt sich nach erfolgreicher Extraktion
✅ **Verschachtelte Response-Strukturen** unterstützt
✅ **PostMessage Events** werden verarbeitet
✅ **Loading-Indicator** bleibt sichtbar während Workflow läuft
✅ **Einfacher Workflow** - Klick → Analyse → Daten → Auto-Close

---

**Zuletzt aktualisiert:** Nach erfolgreicher Extraktion schließt sich das Modal automatisch nach 2 Sekunden.

