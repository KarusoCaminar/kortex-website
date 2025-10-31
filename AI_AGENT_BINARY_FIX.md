# 🔧 AI Agent Binary-Daten Fehler beheben

## ❌ Problem: "Cannot read properties of undefined (reading 'includes')"

### Ursache:
1. **Attachments-Konfiguration ist falsch** - Binary-Daten-Struktur passt nicht
2. **Tools sind noch konfiguriert** - AI Agent Node hat Tools aktiviert
3. **Binary-Daten kommen nicht korrekt an** - Struktur passt nicht zu erwarteter Format

---

## ✅ Lösung 1: Attachments im AI Agent Node korrigieren

### Im n8n Workflow:

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Gehe zu "Parameters" Tab**

3. **Prüfe "Attachments" Sektion:**

**AKTUELL (FALSCH):**
```javascript
{
  "name": "business-card",
  "data": "={{ $binary.data || $binary.file || $binary }}",
  "mimeType": "={{ $binary.data?.mimeType || $binary.file?.mimeType || $binary.mimeType || 'image/jpeg' }}"
}
```

**KORREKT (wähle eine der Optionen):**

#### Option A: Direkt Binary Property
```javascript
{
  "name": "business-card",
  "data": "={{ $binary }}",
  "mimeType": "image/jpeg"
}
```

#### Option B: Binary mit Property Name
```javascript
{
  "name": "business-card",
  "data": "={{ $binary.data }}",
  "mimeType": "={{ $binary.data.mimeType || 'image/jpeg' }}"
}
```

#### Option C: Binary vom vorherigen Node
```javascript
{
  "name": "business-card",
  "data": "={{ $('Setze Sample-Info').binary || $binary }}",
  "mimeType": "={{ $('Setze Sample-Info').binary?.data?.mimeType || $binary?.data?.mimeType || 'image/jpeg' }}"
}
```

**EMPFOHLEN: Option C** (holt Binary direkt vom vorherigen Node)

---

## ✅ Lösung 2: Tools entfernen

### WICHTIG: Alle Tools entfernen!

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Gehe zu "Settings" Tab**

3. **Prüfe "Tools" Sektion:**
   - Falls Tools vorhanden: **ENTFERNE ALLE** ❌
   - Der AI Agent sollte **KEINE Tools** haben ✅

4. **Klicke "Save"**

---

## ✅ Lösung 3: "Setze Sample-Info" Node verbessern

Der Node muss Binary-Daten in der richtigen Struktur weitergeben.

### Aktueller Code:
```javascript
return {
  json: { ... },
  binary: binaryData || $binary
};
```

### Verbesserter Code (ersetzt im Workflow JSON):
Siehe `n8n-business-card-workflow-vertex.json` - wird aktualisiert

---

## 🔍 Debugging: Binary-Daten prüfen

### Im n8n Workflow:

1. **Klicke auf "Setze Sample-Info" Node**

2. **Klicke "Execute Node"**

3. **Prüfe Output:**
   - Tab "Binary" sollte Datei zeigen
   - Tab "JSON" sollte `sample` und `source` zeigen

4. **Prüfe Binary-Struktur:**
   - Sollte sein: `{ data: { ... } }` oder `{ file: { ... } }`
   - NICHT leer sein!

---

## 📝 Was in n8n konfiguriert werden muss:

### AI Agent Node - Parameters Tab:

1. **Prompt:** (sollte bereits eingetragen sein)

2. **Attachments:**
   ```
   Name: business-card
   Data: ={{ $('Setze Sample-Info').binary || $binary }}
   MIME Type: image/jpeg
   ```

3. **System Message:** (sollte bereits eingetragen sein)

### AI Agent Node - Settings Tab:

1. **Tools:** KEINE Tools! ❌
2. **Chat Model:** Google Vertex AI Gemini ✅
3. **Memory:** NICHT nötig ❌

---

## 🚀 Schnell-Fix:

### Schritt 1: Workflow JSON aktualisieren
Ich aktualisiere jetzt das JSON mit korrigierten Attachments.

### Schritt 2: In n8n
1. Importiere aktualisiertes JSON
2. Prüfe AI Agent Node → Attachments
3. Entferne alle Tools
4. Teste erneut

