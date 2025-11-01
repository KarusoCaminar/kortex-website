# ✅ Manueller Trigger für Tests

## 🎯 Was wurde hinzugefügt

**"Manual Trigger (Test)" Node** - Damit kannst du direkt in n8n testen!

---

## 🧪 Wie man testet

### Test 1: Sample 1 manuell testen

1. **Workflow öffnen**
2. **Execute Workflow** klicken (oben rechts)
3. **"Manual Trigger (Test)" Node öffnen**
4. **Test-Daten hinzufügen:**
   ```json
   {
     "query": {
       "sample": "1"
     }
   }
   ```
5. **Execute Workflow** → Sollte Sample 1 laden

---

### Test 2: Upload manuell testen

1. **Execute Workflow** klicken
2. **"Manual Trigger (Test)" Node öffnen**
3. **Test-Daten hinzufügen:**
   ```json
   {
     "query": {}
   }
   ```
   **ODER:** Binary-Datei im "Manual Trigger" Node anhängen
4. **Execute Workflow** → Sollte Upload-Pfad nehmen

---

### Test 3: Sample 2/3

**Test-Daten:**
```json
{
  "query": {
    "sample": "2"
  }
}
```
oder
```json
{
  "query": {
    "sample": "3"
  }
}
```

---

## ⚠️ Wichtig

**Für Produktion:** "Manual Trigger" Node NICHT aktivieren!
- Workflow von Website verwendet **"Business Card Upload" Webhook**
- "Manual Trigger" nur für Tests in n8n UI

---

## ✅ Verbindungen

```
Manual Trigger (Test)
    ↓
Route to Sample
    ↓
...rest des Workflows
```

**UND:**

```
Business Card Upload (Webhook)
    ↓
Route to Sample
    ↓
...rest des Workflows
```

**Beide Trigger funktionieren parallel!**

