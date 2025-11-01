# 🔴 500-Fehler Fix - Schritt für Schritt

## ❌ Problem: 500 Internal Server Error von n8n

Der n8n Workflow gibt einen **500-Fehler** zurück, wenn auf eine Visitenkarte geklickt wird.

---

## 🔍 Schritt 1: Console-Fehler analysieren

1. **Öffne die Website:** `https://karusocaminar.github.io/kortex-website/`
2. **Öffne die Browser-Konsole** (F12 → Console Tab)
3. **Klicke auf Sample 1** (Visitenkarte 1)
4. **Kopiere ALLE Fehler** aus der Konsole (Strg+A, Strg+C)
5. **Öffne:** `get-console-errors.html` (lokal oder auf GitHub Pages)
6. **Füge die Fehler ein** und klicke "Analysieren"

**Alternative:** Öffne direkt `read-website-logs.html` und exportiere die letzten Logs.

---

## 🔍 Schritt 2: In n8n prüfen - Welcher Node verursacht den 500-Fehler?

### A) Öffne die letzte Execution in n8n:

1. Gehe zu: `https://n8n2.kortex-system.de/workflow/JkdKPm27OWy93nU5`
2. Klicke oben auf den Reiter **"Executions"**
3. Klicke auf den **obersten Eintrag** (letzter Lauf)
4. Schaue, welcher **Node rot** ist (schlägt fehl)

### B) Prüfe "Lade Sample 1" Node (wichtigste Prüfung):

**Für Sample 1:**

1. Klicke auf **"Lade Sample 1"** Node
2. Klicke rechts im Panel auf den Reiter **"Output"**
3. **Prüfe:**
   - ✅ Ist ein **Binary-Tab** vorhanden?
   - ✅ Gibt es eine Datei (`bc-1.jpg`)?
   - ❌ **Wenn KEIN Binary-Tab vorhanden ist:** → Das ist das Problem!

**Wenn "Lade Sample 1" KEINE Binary-Daten zurückgibt:**

**Fix in n8n:**
1. Öffne **"Lade Sample 1"** Node
2. Klicke auf **"Options"** (unten)
3. Öffne **"Response"** → **"Response"**
4. Stelle sicher, dass **"Response Format"** auf **"File"** steht
5. **Speichere** und **aktiviere den Workflow neu**

**Wiederhole für:** "Lade Sample 2" und "Lade Sample 3"

---

### C) Prüfe "Setze Sample-Info" Node:

1. Klicke auf **"Setze Sample-Info"** Node
2. Klicke rechts im Panel auf den Reiter **"Input"**
3. **Prüfe:**
   - ✅ Gibt es ein **Binary-Tab**?
   - ❌ **Wenn KEIN Binary-Tab vorhanden ist:** → "Lade Sample X" gibt keine Binary-Daten zurück!

4. Klicke auf den Reiter **"Output"**
5. **Prüfe:**
   - ✅ Wenn Output vorhanden ist: Was steht in `json.type`?
   - ✅ Wenn `type: "error"`: → Binary-Daten fehlen (korrekt erkannt)
   - ❌ Wenn `[]` (leeres Array): → Code gibt `[]` zurück (verursacht 500-Fehler)

---

## 🔧 Schritt 3: Fix in n8n (wenn "Lade Sample X" keine Binary-Daten zurückgibt)

### Problem: HTTP Request Node gibt keine Binary-Daten zurück

**Fix:**

1. **"Lade Sample 1" Node öffnen**
2. **Options** → **Response** → **Response**
3. **Response Format:** Auf **"File"** setzen
4. **Speichern**
5. **Wiederhole für:** "Lade Sample 2" und "Lade Sample 3"
6. **Workflow aktivieren** (wenn nicht schon aktiviert)

---

## 🔧 Schritt 4: Fix in n8n (wenn "Setze Sample-Info" den Code nicht hat)

**Wenn "Setze Sample-Info" immer noch `[]` zurückgibt statt Error-Response:**

1. **"Setze Sample-Info" Node öffnen**
2. **Ersetze den gesamten Code** durch:

```javascript
// Setze Sample-Info - Binary-Daten konsolidieren
const sample = String($json.query?.sample || '').trim();
let binaryData = null;

// 1. $binary vom aktuellen Item (direkt)
if ($binary && typeof $binary === 'object') {
    const keys = Object.keys($binary);
    if (keys.length > 0) binaryData = $binary;
}

// 2. Sample: Binary von "Lade Sample X" Node (ALLE Methoden)
if (!binaryData && sample) {
    try {
        const nodeName = sample === '1' ? 'Lade Sample 1' : sample === '2' ? 'Lade Sample 2' : 'Lade Sample 3';
        const node = $(nodeName);
        
        // Prüfe ALLE möglichen Binary-Strukturen
        if (node?.binary) {
            binaryData = node.binary;
        } else if (node?.item?.binary) {
            binaryData = node.item.binary;
        } else if (node?.item?.binary?.data) {
            binaryData = node.item.binary;
        } else if (node?.item?.binary?.file) {
            binaryData = { data: node.item.binary.file };
        } else if (node?.all && Array.isArray(node.all) && node.all.length > 0) {
            // Prüfe ob Binary in allen Items vorhanden ist
            const firstItem = node.all[0];
            if (firstItem?.binary) {
                binaryData = firstItem.binary;
            } else if (firstItem?.json?.binary) {
                binaryData = firstItem.json.binary;
            }
        }
    } catch (e) {
        console.error('Fehler beim Holen von Lade Sample:', e);
    }
}

// 3. Upload: Binary vom Webhook (ALLE Methoden)
if (!binaryData && !sample) {
    try {
        const webhook = $('Business Card Upload');
        if (webhook?.binary) {
            binaryData = webhook.binary;
        } else if (webhook?.item?.binary) {
            binaryData = webhook.item.binary;
        } else if (webhook?.item?.binary?.data) {
            binaryData = webhook.item.binary;
        } else if (webhook?.item?.binary?.file) {
            binaryData = { data: webhook.item.binary.file };
        } else if (webhook?.all && Array.isArray(webhook.all) && webhook.all.length > 0) {
            const firstItem = webhook.all[0];
            if (firstItem?.binary) {
                binaryData = firstItem.binary;
            }
        }
    } catch (e) {
        console.error('Fehler beim Holen vom Webhook:', e);
    }
}

// 4. Fallback: $binary (wenn noch nichts gefunden)
if (!binaryData && $binary) {
    binaryData = $binary;
}

// KRITISCH: Wenn KEINE Binary-Daten → FEHLER-RESPONSE senden statt [] oder throw
if (!binaryData || (typeof binaryData === 'object' && Object.keys(binaryData).length === 0)) {
    console.error('❌ Binary-Daten fehlen für Sample:', sample || 'Upload');
    // Sende Fehler-Response anstatt [] um 500-Fehler zu verhindern
    return [{
        json: {
            type: 'error',
            error: 'Binary-Daten fehlen',
            message: `Keine Binary-Daten gefunden für ${sample ? 'Sample ' + sample : 'Upload'}. Prüfe ob "Lade Sample ${sample}" Node Binary-Daten zurückgibt.`,
            sample: sample,
            source: sample ? `Sample ${sample}` : 'Upload',
            timestamp: new Date().toISOString()
        }
    }];
}

// Erfolg: Binary-Daten gefunden
return [{
    json: {
        ...$json,
        sample: sample,
        source: sample ? `Sample ${sample}` : 'Upload'
    },
    binary: binaryData
}];
```

3. **Speichern**
4. **Workflow testen** (Execute Workflow)

---

## ✅ Schritt 5: Testen

1. **Gehe zur Website:** `https://karusocaminar.github.io/kortex-website/`
2. **Klicke auf Sample 1** (Visitenkarte 1)
3. **Prüfe:**
   - ✅ Modal öffnet sich
   - ✅ Loading-Indicator erscheint
   - ✅ Kein 500-Fehler in der Konsole
   - ✅ Daten werden extrahiert und angezeigt

**Wenn immer noch 500-Fehler:**

→ **Screenshot der n8n Execution** machen und zeigen:
- Welcher Node ist rot?
- Was steht im Output von "Lade Sample 1"?
- Was steht im Input/Output von "Setze Sample-Info"?

---

## 🎯 Zusammenfassung der häufigsten Ursachen:

1. **"Lade Sample X" Nodes:** `responseFormat: "file"` ist NICHT gesetzt → **Fix:** In n8n auf "File" setzen
2. **"Setze Sample-Info" Node:** Gibt `[]` zurück statt Error-Response → **Fix:** Code ersetzen (siehe oben)
3. **Workflow nicht aktiviert:** → **Fix:** Workflow in n8n aktivieren

---

## 📋 Checkliste:

- [ ] "Lade Sample 1" Node hat `responseFormat: "file"` ✅
- [ ] "Lade Sample 2" Node hat `responseFormat: "file"` ✅
- [ ] "Lade Sample 3" Node hat `responseFormat: "file"` ✅
- [ ] "Setze Sample-Info" Node sendet Error-Response (nicht `[]`) ✅
- [ ] Workflow ist aktiviert ✅
- [ ] Website testet ohne 500-Fehler ✅

