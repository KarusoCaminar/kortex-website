# 🔧 n8n POST JSON-Body Fix

## Problem: 500 Internal Server Error

Die Website sendet jetzt POST mit JSON-Body `{"query": {"sample": "1"}}`, aber n8n gibt einen 500-Fehler zurück.

---

## Ursache

Wenn ein n8n Webhook Node einen POST-Request mit JSON-Body erhält, muss der Body korrekt geparst werden. In n8n ist der JSON-Body **direkt als `$json` verfügbar**.

**Das bedeutet:**
- Request Body: `{"query": {"sample": "1"}}`
- In n8n: `$json.query.sample` = `"1"` ✅

---

## Lösung: Code Node nach Webhook einfügen (falls nötig)

Falls der Switch Node die Daten nicht korrekt erhält, füge einen Code Node zwischen Webhook und Switch Node ein:

### Code Node "Parse POST Body"

**Position:** Direkt nach "Business Card Upload" Webhook Node

**Code:**
```javascript
// Parse POST Body - Für POST mit JSON-Body
// Der Webhook Node gibt den Body direkt als $json zurück
// Aber wir müssen sicherstellen, dass query.sample vorhanden ist

let query = $json.query || {};

// Falls Body direkt query enthält (z.B. {"query": {"sample": "1"}})
if ($json.query && $json.query.sample) {
    query = $json.query;
}

// Falls Body direkt sample enthält (z.B. {"sample": "1"})
if ($json.sample && !query.sample) {
    query = { sample: $json.sample };
}

// Falls query leer ist, aber Body andere Struktur hat
if (!query.sample && $json.body) {
    try {
        const parsedBody = typeof $json.body === 'string' ? JSON.parse($json.body) : $json.body;
        if (parsedBody.query) {
            query = parsedBody.query;
        }
    } catch (e) {
        console.error('Fehler beim Parsen des Bodies:', e);
    }
}

// Gebe konsolidiertes JSON zurück
return [{
    json: {
        ...$json,
        query: query
    }
}];
```

---

## ALTERNATIVE: Switch Node direkt verwenden

**Falls der Switch Node bereits `$json.query.sample` prüft:**

Der Switch Node sollte funktionieren, wenn:
1. ✅ POST-Request kommt an
2. ✅ JSON-Body wird als `$json` verfügbar
3. ✅ `$json.query.sample` ist verfügbar

**Prüfe in n8n Execution:**
- Öffne letzte Execution
- Öffne "Business Card Upload" Webhook Node → Output Tab
- Prüfe ob `json.query.sample` vorhanden ist
- Falls NEIN → Code Node einfügen (siehe oben)
- Falls JA → Prüfe "Route to Sample Nodes" Switch Node

---

## Manuelle Prüfung in n8n

1. **Öffne letzte Execution:**
   - `https://n8n2.kortex-system.de/workflow/JkdKPm27OWy93nU5`
   - Executions Tab → letzter Eintrag

2. **Prüfe "Business Card Upload" Node:**
   - Output Tab → JSON Tab
   - Sollte enthalten: `{"query": {"sample": "1"}}`
   - Falls NEIN → Webhook Node konfiguriert nicht korrekt

3. **Prüfe "Route to Sample Nodes" Switch Node:**
   - Input Tab → JSON Tab
   - Was steht in `$json.query.sample`?
   - Sollte sein: `"1"`, `"2"`, oder `"3"`

4. **Prüfe welcher Output genommen wurde:**
   - Fallback Output → Switch Node Rules funktionieren nicht
   - Output 0/1/2 → Rules funktionieren

---

## Schnelltest: Workflow manuell in n8n testen

1. **"Execute Workflow" klicken**
2. **"Manual Trigger (Test)" Node:**
   - Input: `{"query": {"sample": "1"}}`
3. **Execute**
4. **Prüfe ob es zu "Lade Sample 1" routet**

Wenn das funktioniert, aber die Website nicht:
→ Problem liegt am Webhook Node (bekommt POST-Body nicht korrekt)

---

## Webhook Node Konfiguration prüfen

**"Business Card Upload" Webhook Node:**

1. **HTTP Method:** Sollte `GET` und `POST` erlauben (oder nur `POST`)
2. **Response Mode:** Sollte `Respond When Last Node Finishes` sein
3. **Binary Property Name:** Sollte `file` sein (für Uploads)

**Falls Webhook Node nicht richtig konfiguriert ist:**
- POST-Requests werden nicht korrekt verarbeitet
- JSON-Body wird nicht geparst
- `$json.query` ist nicht verfügbar

---

## Fix-Anleitung für n8n UI

1. **"Business Card Upload" Webhook Node öffnen**
2. **HTTP Method prüfen:**
   - Sollte `GET` und `POST` erlauben
   - Oder nur `POST` (für reine POST-Requests)

3. **Response Mode prüfen:**
   - Sollte `Respond When Last Node Finishes` sein

4. **Speichern und Workflow aktivieren**

5. **Testen:**
   - Website → Sample 1 klicken
   - Prüfe ob 500-Fehler verschwindet

