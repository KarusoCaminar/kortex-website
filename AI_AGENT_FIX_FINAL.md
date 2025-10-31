# ✅ AI Agent Node - FINALE Lösung

## 🎯 Das Problem:

"Cannot read properties of undefined (reading 'includes')"  
→ Das Bild wird nicht erkannt

---

## ✅ Die Lösung:

### 1. "Automatically Passthrough Binary Images" aktivieren

**Im Parameters Tab:**

1. **Öffne "Options" Dropdown** (unter System Message)
2. **Aktiviere "Automatically Passthrough Binary Images"** ✅
3. **Save**

**Das war's!** Keine "Attachments" nötig!

---

### 2. Tools entfernen (WICHTIG!)

**Im Settings Tab:**

1. **Tools Sektion** → **ALLE Tools entfernen** ❌
2. **Tools Liste muss LEER sein**
3. **Save**

---

### 3. Chat Model prüfen

**Im Settings Tab:**

1. **Chat Model *"** muss konfiguriert sein:
   - ✅ Google Vertex AI Gemini
   - ✅ gemini-2.5-flash oder gemini-2.5-pro

---

## 📝 Nochmal Schritt-für-Schritt:

### Im n8n Workflow:

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Parameters Tab:**

   - **Options Dropdown öffnen** (unter System Message)
   - **"Automatically Passthrough Binary Images" aktivieren** ✅
   - **Save**

3. **Settings Tab:**

   - **Tools → ALLE entfernen** ❌
   - **Chat Model → Google Vertex AI** ✅
   - **Save**

4. **Teste Workflow** mit `?sample=1`

---

## ✅ Checkliste:

- [ ] "Automatically Passthrough Binary Images" aktiviert (Parameters Tab → Options)
- [ ] Tools entfernt (Settings Tab → Tools → LEER)
- [ ] Chat Model konfiguriert (Settings Tab → Chat Model → Google Vertex AI)
- [ ] Workflow getestet → funktioniert!

---

## 🔍 Falls es immer noch nicht funktioniert:

### Prüfe "Setze Sample-Info" Node:

1. **Klicke auf "Setze Sample-Info" Node**
2. **Klicke "Execute Node"**
3. **Prüfe Tab "Binary":** Sollte Datei zeigen (bc-1.jpg)
4. **Falls leer:** Prüfe "Lade Sample 1" Node → sollte Binary-Daten liefern

---

## 🚨 WICHTIG:

**Es gibt KEINE "Attachments" Sektion in neueren n8n Versionen!**

Die Lösung ist:
- ✅ **"Automatically Passthrough Binary Images" aktivieren**
- ✅ **Tools entfernen**
- ✅ **Binary-Daten werden automatisch übergeben**

Das war's! Viel einfacher als gedacht! 🎉

