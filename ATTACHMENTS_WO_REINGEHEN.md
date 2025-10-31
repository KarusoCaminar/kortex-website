# 📍 Attachments konfigurieren - Genau wo?

## 🎯 Wo sind die Attachments im AI Agent Node?

### Im Parameters Tab:

1. **Klicke auf "AI Agent - Vertex AI" Node**

2. **Gehe zu "Parameters" Tab** (oben im Panel)

3. **Du siehst jetzt:**
   - **"Prompt (User Message)"** - Das große Textfeld (der Prompt)
   - **"System Message"** - Das Textfeld darunter
   - **⬇️ WEITER NACH UNTEN SCROLLEN ⬇️**
   - **"Attachments"** Sektion - **DAS IST WO ES REINGEHEN MUSS!**

---

## 📝 Schritt-für-Schritt:

### Schritt 1: Attachments-Sektion finden

Im **Parameters Tab** des AI Agent Nodes:

1. **Du siehst "Prompt (User Message)"** ← Das große Textfeld oben
2. **Du siehst "System Message"** ← Das Textfeld darunter
3. **⬇️ SCROLLE NACH UNTEN ⬇️**
4. **Du findest "Attachments"** ← **DA IST ES!**

---

### Schritt 2: Attachments konfigurieren

In der **"Attachments"** Sektion:

1. **Klicke auf "Add Attachment"** (falls noch kein Attachment vorhanden)
   - Oder klicke auf das bestehende Attachment

2. **Es öffnet sich ein Dialog oder ein Formular**

3. **Fülle aus:**

   ```
   Name: business-card
   
   Data: ={{ $('Setze Sample-Info').binary || $binary }}
   
   MIME Type: image/jpeg
   ```

4. **Klicke "Save"** oder "Apply"

---

## 🔍 Falls du die Attachments-Sektion nicht siehst:

### Mögliche Gründe:

1. **Du bist im falschen Tab:**
   - ❌ Du bist im "Settings" Tab
   - ✅ Du musst im **"Parameters" Tab** sein!

2. **Attachments-Sektion ist ausgeblendet:**
   - Klicke auf "▶️ Attachments" oder ähnliches um es aufzuklappen
   - Manchmal sind Sektionen zusammengeklappt

3. **Version-Unterschied:**
   - Ältere n8n Versionen haben Attachments woanders
   - Prüfe ob du "Attachments" im Parameters Tab siehst

---

## 📸 Was du im Parameters Tab sehen solltest:

```
┌─────────────────────────────────────┐
│ Parameters Tab                      │
├─────────────────────────────────────┤
│                                     │
│ Prompt (User Message)              │
│ ┌─────────────────────────────────┐ │
│ │ Extrahiere alle Kontaktdaten...│ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ System Message                      │
│ ┌─────────────────────────────────┐ │
│ │ Du bist ein Experte...         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⬇️ SCROLLE NACH UNTEN ⬇️          │
│                                     │
│ Attachments                         │
│ ┌─────────────────────────────────┐ │
│ │ Name: [business-card]           │ │
│ │ Data: [{{ $binary }}]          │ │  ← DA!
│ │ MIME Type: [image/jpeg]        │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ Korrekte Konfiguration:

### Im Attachments-Formular:

**Name:**
```
business-card
```

**Data:**
```
={{ $('Setze Sample-Info').binary || $binary }}
```

**ODER (falls das nicht funktioniert):**
```
={{ $binary }}
```

**MIME Type:**
```
image/jpeg
```

---

## 🔧 Alternative: Falls Attachments nicht sichtbar ist

### Option A: Im Parameters Tab suchen

1. **Parameters Tab** → Scrolle ganz nach unten
2. Suche nach **"Attachments"** oder **"Files"** oder **"Media"**

### Option B: In Settings Tab prüfen

Manchmal sind Attachments auch unter **Settings Tab**:
1. **Settings Tab** → Suche nach **"Attachments"** oder **"Input Attachments"**

### Option C: Node-Optionen prüfen

1. **Klicke auf "⚙️ Options"** (falls vorhanden)
2. Suche nach **"Attachments"** oder **"Binary Data"**

---

## 🚨 WICHTIG: Nochmal zusammenfassend

### Im AI Agent Node:

1. **Parameters Tab** öffnen
2. **Nach unten scrollen** (unter System Message)
3. **"Attachments"** Sektion finden
4. **Attachment hinzufügen/bearbeiten:**
   - Name: `business-card`
   - Data: `={{ $('Setze Sample-Info').binary || $binary }}`
   - MIME Type: `image/jpeg`
5. **Save**

### DANN:

1. **Settings Tab** öffnen
2. **Tools** Sektion → **ALLE Tools entfernen** ❌
3. **Chat Model** → Google Vertex AI konfiguriert ✅
4. **Save**

---

## ✅ Checkliste:

- [ ] Parameters Tab geöffnet
- [ ] Nach unten gescrollt
- [ ] Attachments-Sektion gefunden
- [ ] Attachment hinzugefügt/bearbeitet
- [ ] Data: `={{ $('Setze Sample-Info').binary || $binary }}`
- [ ] MIME Type: `image/jpeg`
- [ ] Settings Tab → Tools entfernt
- [ ] Save geklickt

