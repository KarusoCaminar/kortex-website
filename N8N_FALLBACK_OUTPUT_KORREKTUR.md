# ✅ Fallback Output Korrektur - Switch Node

## ⚠️ Problem

**Fallback Output ist auf "None (default)" gesetzt!** ❌

Das bedeutet: Items werden ignoriert, wenn keine Rule matched (z.B. bei Uploads).

---

## ✅ Lösung

### Option 1: Fallback Output auf "Extra Output" setzen

1. **"Route to Sample Nodes" Switch Node öffnen**
2. **Parameters Tab:**
   - Scrolle zu "Fallback Output" Sektion
   - **Fallback Output Dropdown:** Ändere von `None (default)` zu **`Extra Output`** ✅
3. **Speichern**

**Warum:** "Extra Output" ist ein separater Output für Items, die keine Rule matched haben.

**Verbindung:**
- **"Extra Output"** (oder "Output upload") vom Switch Node → "Setze Sample-Info"

---

### Option 2: Regel für "upload" hinzufügen (Alternative)

**Falls "Extra Output" nicht funktioniert:**

1. **"Route to Sample Nodes" Switch Node öffnen**
2. **Parameters Tab:**
   - **Add Routing Rule** klicken
   - **Rule 4:**
     - **Value:** FX aktivieren → `$json.route`
     - **Operation:** `equals`
     - **Output Name:** `upload`
3. **Speichern**

**Verbindung:**
- **Output `upload`** vom Switch Node → "Setze Sample-Info"

---

## ✅ Prüfung: Alle Rules vorhanden?

**Stelle sicher, dass alle 3 Sample Rules vorhanden sind:**

1. **Rule 1:** `$json.route` equals `sample-1` → Output: `sample-1` ✅
2. **Rule 2:** `$json.route` equals `sample-2` → Output: `sample-2` ✅ (sichtbar im Screenshot)
3. **Rule 3:** `$json.route` equals `sample-3` → Output: `sample-3` ✅ (sichtbar im Screenshot)
4. **Rule 4 (ODER Fallback):** `route = "upload"` → Output: `upload` oder Extra Output

**Falls Rule 1 (`sample-1`) fehlt:**

1. **Add Routing Rule** klicken
2. **Rule für sample-1 hinzufügen:**
   - Value: `={{$json.route}}` (FX aktiviert)
   - Operation: `equals`
   - Output: `sample-1`

---

## ✅ Finale Konfiguration

### Switch Node Konfiguration:

**Routing Rules:**
- Rule 1: `$json.route` = `sample-1` → Output: `sample-1`
- Rule 2: `$json.route` = `sample-2` → Output: `sample-2`
- Rule 3: `$json.route` = `sample-3` → Output: `sample-3`
- Fallback Output: `Extra Output` (ODER Rule 4 für `upload`)

**Verbindungen:**
- Output `sample-1` → "Lade Sample 1"
- Output `sample-2` → "Lade Sample 2"
- Output `sample-3` → "Lade Sample 3"
- **Extra Output (ODER `upload` Output)** → "Setze Sample-Info" ✅

---

## 🧪 Test

### Test 1: Sample 1

1. **Workflow aktivieren**
2. **Execute Workflow** mit `?sample=1`
3. **Prüfe:**
   - "Route to Sample": `route: "sample-1"` ✅
   - "Route to Sample Nodes": Geht zu `sample-1` Output ✅
   - "Lade Sample 1": Wird ausgeführt ✅

### Test 2: Upload (KEIN Sample)

1. **Workflow aktivieren**
2. **Execute Workflow** mit POST Request (Binary-Datei, KEIN `sample` Parameter)
3. **Prüfe:**
   - "Route to Sample": `route: "upload"` ✅
   - "Route to Sample Nodes": Geht zu **Extra Output** (ODER `upload` Output) ✅
   - "Setze Sample-Info": Wird ausgeführt ✅
   - Binary-Daten vorhanden ✅

---

## ✅ Zusammenfassung

**Was du jetzt machen musst:**

1. **Fallback Output ändern:**
   - Von `None (default)` zu **`Extra Output`** ✅
   - **ODER:** Regel 4 für `upload` hinzufügen

2. **Verbindung erstellen:**
   - **Extra Output** (ODER `upload` Output) → "Setze Sample-Info"

3. **Rule 1 prüfen:**
   - Falls `sample-1` Rule fehlt → hinzufügen

4. **Test:**
   - Workflow aktivieren
   - Test mit Upload (ohne `sample` Parameter)

---

**Das sollte jetzt funktionieren!**

