# ✅ AI Agent Node - RICHTIGE Anleitung

## 🎯 WICHTIG: In neueren n8n Versionen gibt es KEINE "Attachments" Sektion!

Stattdessen gibt es die Option: **"Automatically Passthrough Binary Images"**

---

## 📝 Schritt-für-Schritt - SO machst du es richtig:

### 1. AI Agent Node öffnen

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Gehe zu "Parameters" Tab**

---

### 2. "Automatically Passthrough Binary Images" aktivieren

1. **Im Parameters Tab siehst du:**
   - "Prompt (User Message)" ✅ (das große Textfeld)
   - "System Message" ✅ (das Textfeld darunter)
   - **"Options" Dropdown** ← **DA IST ES!**

2. **Klicke auf "Options" Dropdown** (das Dropdown-Menü)

3. **Im Dropdown siehst du:**
   - Max Iterations
   - Return Intermediate Steps
   - **"Automatically Passthrough Binary Images"** ← **DA!**
   - Batch Processing
   - Enable Streaming

4. **Aktiviere "Automatically Passthrough Binary Images":**
   - ✅ **Klicke auf den Toggle/Switch** um es zu aktivieren
   - ✅ **Es sollte "ON" oder grün sein**

5. **Klicke "Save"**

---

### 3. Tools entfernen (WICHTIG!)

1. **Gehe zu "Settings" Tab**

2. **Scroll zu "Tools" Sektion**

3. **Falls Tools vorhanden:**
   - **ENTFERNE ALLE TOOLS** ❌
   - Tools Liste muss **LEER** sein

4. **Klicke "Save"**

---

### 4. Chat Model prüfen

1. **Im Settings Tab:**

2. **"Chat Model *"** muss konfiguriert sein:
   - ✅ Sollte zeigen: "Google Vertex AI" oder ähnlich
   - ✅ Sollte gemini-2.5-flash oder gemini-2.5-pro sein

3. **Falls NICHT konfiguriert:**
   - Klicke auf "+"
   - Wähle "Google Vertex AI"
   - Konfiguriere Credentials

---

## ✅ Das war's!

**Du musst NICHTS in "Attachments" eintragen - das gibt es gar nicht!**

Stattdessen:
1. ✅ **"Automatically Passthrough Binary Images" aktivieren** (im Options Dropdown)
2. ✅ **Tools entfernen** (im Settings Tab)
3. ✅ **Chat Model konfigurieren** (im Settings Tab)

---

## 🔍 Wie sieht es aus?

Im **Parameters Tab**:

```
┌─────────────────────────────────────┐
│ Parameters Tab                      │
├─────────────────────────────────────┤
│ Prompt (User Message)              │
│ [Das große Textfeld]               │
│                                     │
│ System Message                      │
│ [Das Textfeld darunter]            │
│                                     │
│ Options ▼                          │  ← Dropdown klicken!
│                                     │
│ [Wenn Dropdown geöffnet:]          │
│   ☐ Max Iterations                 │
│   ☐ Return Intermediate Steps      │
│   ☑ Automatically Passthrough      │  ← DAS aktivieren!
│     Binary Images                  │
│   ☐ Batch Processing               │
│   ☐ Enable Streaming               │
└─────────────────────────────────────┘
```

---

## ⚠️ WICHTIG: Nochmal zusammengefasst

### Im Parameters Tab:

1. **"Options" Dropdown öffnen**
2. **"Automatically Passthrough Binary Images" aktivieren** ✅
3. **Save**

### Im Settings Tab:

1. **Tools entfernen** ❌ (alle entfernen!)
2. **Chat Model prüfen** ✅ (Google Vertex AI)

**FERTIG!** Keine "Attachments" Sektion nötig!

