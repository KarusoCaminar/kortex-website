# ✅ Fallback Output Setup - Switch Node

## ✅ Gefunden: "Fallback Output" Option

**Im Switch Node "Route to Sample Nodes" gibt es die Option "Fallback Output"!**

Das ist genau das, was du brauchst für den Upload-Pfad!

---

## 📋 Schritt-für-Schritt Setup

### Schritt 1: Fallback Output hinzufügen

1. **"Route to Sample Nodes" Switch Node öffnen**
2. **Parameters Tab:**
   - Scrolle nach unten zu "Add option" Button
   - Klicke auf **"Add option"** (Dropdown öffnet sich)
   - Wähle **"Fallback Output"** ✅

3. **Fallback Output Name:**
   - Ein neues Feld erscheint
   - **Output Name:** `upload` (oder "default")

4. **Speichern**

---

### Schritt 2: Verbindung erstellen

1. **"Route to Sample Nodes" Switch Node anzeigen**
2. **Rechts vom Switch Node** siehst du jetzt mehrere Outputs:
   - `sample-2` (Rule 1)
   - `sample-3` (Rule 2)
   - `upload` (Fallback Output) ✅

3. **Verbindung erstellen:**
   - Ziehe vom **Output `upload`** (Fallback Output) zum **Input von "Setze Sample-Info"**
   - Diese Verbindung ist für Uploads wichtig!

---

### Schritt 3: Routing Rules prüfen

**Stelle sicher, dass alle 3 Rules vorhanden sind:**

1. **Rule 1:**
   - Value: `={{$json.route}}` (FX aktiviert)
   - Operation: `equals`
   - Output: `sample-1` ✅

2. **Rule 2:**
   - Value: `={{$json.route}}` (FX aktiviert)
   - Operation: `equals`
   - Output: `sample-2` ✅

3. **Rule 3:**
   - Value: `={{$json.route}}` (FX aktiviert)
   - Operation: `equals`
   - Output: `sample-3` ✅

4. **Fallback Output:**
   - Output: `upload` ✅

---

## ✅ Finale Workflow-Struktur

```
Business Card Upload
    ↓
Route to Sample (Code Node)
    ↓ route = "sample-1" / "sample-2" / "sample-3" / "upload"
Route to Sample Nodes (Switch Node)
    ├─ Rule 1: route = "sample-1" → Output: sample-1 → Lade Sample 1
    ├─ Rule 2: route = "sample-2" → Output: sample-2 → Lade Sample 2
    ├─ Rule 3: route = "sample-3" → Output: sample-3 → Lade Sample 3
    └─ Fallback Output: route = "upload" → Output: upload → Setze Sample-Info
```

**WICHTIG:** Fallback Output wird genommen, wenn **KEINE Rule matched**!

---

## ✅ "Setze Sample-Info" Code Review

**Dein Code ist KORREKT und robust!** ✅

### Warum der Code gut ist:

1. **Flexible Sample Parameter Handling:**
   - `const sample = String($json.query?.sample || '').trim();` ✅
   - Handhabt `null`, `undefined`, und leere Strings korrekt

2. **Prioritized Binary Data Retrieval:**
   - Prüft `$binary` vom aktuellen Item (direkt) ✅
   - Holt Binary von "Lade Sample X" Nodes (wenn `sample` vorhanden) ✅
   - Holt Binary vom Webhook (wenn kein `sample` = Upload) ✅
   - Fallback zu `$binary` ✅

3. **Robust Node Data Access:**
   - Prüft verschiedene Binary-Strukturen (`node?.binary`, `node?.item?.binary`, etc.) ✅
   - Funktioniert mit verschiedenen n8n Binary-Formaten ✅

4. **CRITICAL: Crash Prevention:**
   ```javascript
   if (!binaryData || (typeof binaryData === 'object' && Object.keys(binaryData).length === 0)) {
       return [];  // Verhindert 500 Error!
   }
   ```
   - Gibt `[]` zurück statt Error zu werfen ✅
   - Verhindert "No item to return was found" Fehler ✅

5. **Correct Output Structure:**
   - Gibt `json` (mit `sample` und `source`) und `binary` zurück ✅
   - Korrekt für AI Agent Node ✅

---

## 🧪 Test

### Test 1: Sample 1

1. **Workflow aktivieren**
2. **Execute Workflow** mit `?sample=1`
3. **Prüfe:**
   - "Route to Sample": `route: "sample-1"` ✅
   - "Route to Sample Nodes": Geht zu `sample-1` Output ✅
   - "Lade Sample 1": Wird ausgeführt ✅
   - "Setze Sample-Info": `source: "Sample 1"` ✅

### Test 2: Upload (KEIN Sample)

1. **Workflow aktivieren**
2. **Execute Workflow** mit POST Request (Binary-Datei, KEIN `sample` Parameter)
3. **Prüfe:**
   - "Route to Sample": `route: "upload"` ✅
   - "Route to Sample Nodes": Geht zu **Fallback Output** (`upload`) ✅
   - "Setze Sample-Info": `source: "Upload"`, Binary-Daten vorhanden ✅
   - "AI Agent": Wird ausgeführt ✅

---

## ✅ Zusammenfassung

1. **Fallback Output hinzufügen:**
   - "Add option" → "Fallback Output"
   - Output Name: `upload`

2. **Verbindung erstellen:**
   - Fallback Output (`upload`) → "Setze Sample-Info"

3. **"Setze Sample-Info" Code:**
   - ✅ Code ist korrekt und robust
   - ✅ Keine Änderungen nötig!

---

**Alles sollte jetzt funktionieren!**

