# ✅ Website File-Upload Konfiguration

## 📋 Status: KORREKT KONFIGURIERT ✅

Die Website ist bereits korrekt konfiguriert, um:
- ✅ POST-Requests an den n8n Webhook zu senden
- ✅ Bilder als Binärdaten unter dem Namen `file` anzuhängen

---

## 🔍 Aktuelle Konfiguration

### 1. POST-Methode
**Datei:** `kortex-n8n-modal.html`  
**Zeile:** ~1004

```javascript
const method = 'POST'; // IMMER POST VERWENDEN
```

✅ **Status:** Korrekt - Immer POST verwendet

---

### 2. FormData für File-Upload
**Datei:** `kortex-n8n-modal.html`  
**Zeile:** ~1023-1027

```javascript
if (fileToUpload) {
    // FALL 1: Datei-Upload
    const formData = new FormData();
    formData.append('file', fileToUpload);  // ✅ File als 'file' angehängt
    fetchOptions.body = formData;
    fetchOptions.headers = {}; // FormData setzt Content-Type automatisch
    console.log('📎 Sende File:', fileToUpload.name, fileToUpload.size, 'bytes');
    
    // WICHTIG: Webhook URL für Upload darf KEINE extraParams haben
    webhookUrl = workflowUrl;
}
```

✅ **Status:** Korrekt - FormData wird korrekt erstellt und File als `file` angehängt

---

### 3. File Input Handler
**Datei:** `kortex-n8n-modal.html`  
**Zeile:** ~1824-1855

```javascript
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
        console.log('⚠️ Keine Datei ausgewählt');
        return;
    }
    
    // Validiere Datei
    if (!file.type.startsWith('image/')) {
        alert('⚠️ Bitte laden Sie nur Bilddateien (JPG, PNG) hoch!');
        fileInput.value = '';
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        alert('⚠️ Die Datei ist zu groß (max. 10 MB)!');
        fileInput.value = '';
        return;
    }
    
    const workflowUrl = 'https://n8n2.kortex-system.de/webhook/business-card-extraction';
    console.log('📤 Upload gestartet:', { workflowUrl, fileName: file.name, fileSize: file.size });
    
    // Öffne Modal und übergebe File direkt
    await openWorkflowModal(workflowUrl, 'Eigene Visitenkarte hochladen', file);
    
    // Reset File Input nach Upload
    fileInput.value = '';
});
```

✅ **Status:** Korrekt - File wird validiert und an `openWorkflowModal()` übergeben

---

## 🔗 Integration mit n8n Workflow

### n8n Webhook Node Konfiguration

**Erwartete Konfiguration im n8n Workflow:**

1. **HTTP Method:** `POST` ✅
2. **Path:** `business-card-extraction` ✅
3. **Binary Property Name:** `file` ✅ (passt zu `formData.append('file', ...)`)

**Workflow:** `n8n-business-card-workflow-vertex-FIXED.json`

```json
{
  "parameters": {
    "httpMethod": "POST",
    "path": "business-card-extraction",
    "responseMode": "lastNode",
    "binaryPropertyName": "file"
  }
}
```

✅ **Status:** Korrekt - n8n erwartet `file` als Binary Property Name

---

## 📊 Request-Struktur

### Was die Website sendet:

**POST Request:**
```
Method: POST
URL: https://n8n2.kortex-system.de/webhook/business-card-extraction
Headers: {
    Content-Type: multipart/form-data (automatisch von FormData gesetzt)
}
Body: FormData {
    file: [Binary Image Data]
}
```

### Was n8n empfängt:

**n8n Webhook Node:**
```
$binary.file = [Binary Image Data]
$json = [Weitere Request-Daten, falls vorhanden]
```

✅ **Status:** Korrekt - Request-Struktur entspricht n8n Erwartungen

---

## ✅ Checkliste

- [x] **POST-Methode verwendet** ✅
- [x] **FormData erstellt** ✅
- [x] **File als 'file' angehängt** ✅
- [x] **Content-Type automatisch gesetzt** (FormData) ✅
- [x] **File-Validierung implementiert** ✅
- [x] **Webhook URL korrekt** ✅
- [x] **n8n Binary Property Name = 'file'** ✅

---

## 🧪 Testen

### Test 1: File Upload testen

1. **Öffne Website**
2. **Klicke auf "Eigene Visitenkarte hochladen"**
3. **Wähle ein Bild aus** (JPG/PNG, max. 10 MB)
4. **Prüfe Browser-Konsole:**
   - `📎 Sende File: [filename] [size] bytes`
5. **Prüfe n8n Executions:**
   - Execution sollte erscheinen
   - "Business Card Upload" Node sollte Binary-Daten haben
   - Binary Tab sollte `file` enthalten

### Test 2: Mit curl testen

```bash
curl -X POST https://n8n2.kortex-system.de/webhook/business-card-extraction \
  -F "file=@/path/to/image.jpg"
```

**Erwartetes Ergebnis:**
- Status sollte nicht 404/500 sein
- Workflow sollte ausgeführt werden

---

## 📝 Zusammenfassung

**Die Website ist bereits korrekt konfiguriert:**

✅ POST-Requests werden verwendet  
✅ Bilder werden als Binärdaten unter dem Namen `file` angehängt  
✅ FormData wird korrekt verwendet  
✅ Content-Type wird automatisch gesetzt (multipart/form-data)  
✅ File-Validierung ist implementiert  

**Keine weiteren Änderungen erforderlich!**

---

## 🔧 Falls Probleme auftreten

### Problem: File wird nicht empfangen

**Prüfe:**
1. n8n Webhook Node hat `binaryPropertyName: "file"` ✅
2. n8n Webhook Node hat `httpMethod: "POST"` ✅
3. Workflow ist aktiviert ✅
4. Webhook URL ist korrekt ✅

### Problem: 500 Internal Server Error

**Prüfe:**
1. n8n Execution Logs → Welcher Node schlägt fehl?
2. "Setze Sample-Info" Node → Hat Binary-Daten?
3. AI Agent Node → Erhält Binary-Daten?

---

## 📚 Referenzen

- **Website Code:** `kortex-n8n-modal.html` (Zeile ~1021-1027)
- **n8n Workflow:** `n8n-business-card-workflow-vertex-FIXED.json`
- **Webhook Node:** Zeile ~35-64
- **Binary Property Name:** `file` (Zeile 57)

