# ✅ Code Node + Switch Node - Konfigurationskorrekturen

## ⚠️ Gefundene Probleme

### Problem 1: Code Node Mode

**Aktuell:** `Run Once for All Items` ❌

**Sollte sein:** `Run Once for Each Item` ✅

**Warum:** Wenn mehrere Items verarbeitet werden sollen (z.B. mehrere Uploads), muss der Code Node für jedes Item einzeln ausgeführt werden.

---

### Problem 2: Switch Node Default Output

**Aktuell:** Kein Default Output konfiguriert ❌

**Sollte sein:** Default Output für `upload` ✅

**Warum:** Wenn `route = "upload"` (kein Sample), muss der Switch Node einen Default Output haben, der zu "Setze Sample-Info" führt.

---

## ✅ Korrekturen

### Korrektur 1: Code Node Mode ändern

1. **"Route to Sample" Code Node öffnen**
2. **Parameters Tab:**
   - **Mode Dropdown:** Ändere von `Run Once for All Items` zu `Run Once for Each Item`
3. **Speichern**

---

### Korrektur 2: Switch Node Default Output hinzufügen

1. **"Route to Sample Nodes" Switch Node öffnen**
2. **Parameters Tab:**
   - **Mode:** Sollte `Rules` sein (ist bereits so ✅)
   - **Routing Rules:** 3 Rules sind vorhanden (sample-1, sample-2, sample-3) ✅
   - **WICHTIG:** Suche nach "Default Output" oder "Fallback" Sektion
   - **Default Output Name:** `upload` (oder "default")

**Falls "Default Output" nicht sichtbar ist:**

1. **Scrolle im Parameters Tab nach unten**
2. **Suche nach "Add Output" oder "Default" Button**
3. **ODER:** In manchen n8n Versionen muss man einen Button klicken: "Add Default Output"
4. **Default Output Name:** `upload`

**Falls es keinen Default Output gibt:**

1. **Die Switch Node wird automatisch einen Default Output erstellen**, wenn keine Rule matched
2. **Verbindung:** Ziehe vom Default Output (rechts vom Switch Node) zu "Setze Sample-Info"
3. **ODER:** Füge eine 4. Rule hinzu:
   - Rule 4: `$json.route` equals `upload` → Output: `upload`

---

### Korrektur 3: Switch Node Rule für Upload (Alternative)

**Falls Default Output nicht funktioniert, füge eine explizite Rule hinzu:**

1. **"Route to Sample Nodes" Switch Node öffnen**
2. **Parameters Tab:**
   - **Add Routing Rule** klicken
   - **Rule 4:**
     - **Value:** FX aktivieren → `$json.route`
     - **Operation:** `equals`
     - **Output Name:** `upload`
3. **Speichern**

**ODER (wenn Rule für "upload" nicht funktioniert):**

1. **Code Node ändern:** Setze `route = "default"` statt `route = "upload"` bei Upload
2. **Switch Node Rule hinzufügen:**
   - Rule 4: `$json.route` equals `default` → Output: `default`
3. **Verbindung:** `default` Output → "Setze Sample-Info"

---

## ✅ Überprüfung der Verbindungen

### Pfad für Samples (sample-1, sample-2, sample-3):

1. **"Business Card Upload" → "Route to Sample"** ✅
2. **"Route to Sample" → "Route to Sample Nodes"** ✅
3. **"Route to Sample Nodes" Output `sample-1` → "Lade Sample 1"** ✅
4. **"Route to Sample Nodes" Output `sample-2` → "Lade Sample 2"** ✅
5. **"Route to Sample Nodes" Output `sample-3` → "Lade Sample 3"** ✅
6. **"Lade Sample 1/2/3" → "Setze Sample-Info"** ✅

### Pfad für Upload:

1. **"Business Card Upload" → "Route to Sample"** ✅
2. **"Route to Sample" → "Route to Sample Nodes"** ✅
3. **"Route to Sample Nodes" Default Output (oder `upload` Output) → "Setze Sample-Info"** ❓ (MUSS GEPRÜFT WERDEN!)

---

## 🧪 Test

### Test 1: Sample 1

1. **Workflow aktivieren**
2. **Execute Workflow** mit `?sample=1`
3. **Prüfe:**
   - "Route to Sample" Code Node Output: `route: "sample-1"` ✅
   - "Route to Sample Nodes" Switch Node: Geht zu `sample-1` Output ✅
   - "Lade Sample 1" Node: Wird ausgeführt ✅

### Test 2: Upload (KEIN Sample Parameter)

1. **Workflow aktivieren**
2. **Execute Workflow** mit POST Request (Binary-Datei, KEIN `sample` Parameter)
3. **Prüfe:**
   - "Route to Sample" Code Node Output: `route: "upload"` ✅
   - "Route to Sample Nodes" Switch Node: Geht zu **Default Output** (oder `upload` Output) ✅
   - "Setze Sample-Info" Node: Wird ausgeführt ✅
   - Binary-Daten vorhanden ✅

---

## 🔍 Falls Upload nicht funktioniert

**Prüfe:**

1. **Code Node Output:**
   - Was steht in `route`? (sollte `"upload"` sein bei Upload)
   - Sind Binary-Daten vorhanden?

2. **Switch Node:**
   - Gibt es einen Default Output?
   - ODER: Gibt es eine Rule für `upload`?
   - Geht der Default Output (oder `upload` Output) zu "Setze Sample-Info"?

3. **Setze Sample-Info Code Node:**
   - Werden Binary-Daten vom Upload empfangen?
   - Ist `source: "Upload"` gesetzt?

---

**Diese Korrekturen sollten das Problem lösen!**

