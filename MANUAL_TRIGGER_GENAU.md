# 🎯 Manual Trigger - GENAU erklärt

## ❓ Du fragst dich: "Wo klicke ich genau?"

**Ganz einfach:** Du klickst auf den **roten Button unten**!

---

## ✅ Schritt-für-Schritt (GENAU):

### Schritt 1: Rote Button klicken

**Unten im Workflow siehst du einen roten Button:**
```
"Execute workflow from Business Card Upload"
```

**ODER (falls sichtbar):**
```
"Execute Workflow"
```

**→ Klicke darauf!** 🖱️

---

### Schritt 2: Manual Trigger öffnet sich automatisch

**Nach dem Klick:**
- Ein Fenster öffnet sich automatisch
- **"Manual Trigger (Test)" Node** wird angezeigt
- Dort siehst du ein **Textfeld**

---

### Schritt 3: Test-Daten eingeben (oder vorhandene nutzen)

**Im Textfeld steht bereits:**
```
{ "query": { "sample": "1" } }
```

**Das ist FERTIG!** Du musst **NICHTS ändern** - einfach so lassen!

**ODER** für Sample 2 ändern zu:
```
{ "query": { "sample": "2" } }
```

---

### Schritt 4: Execute klicken

**Im Manual Trigger Fenster:**
- **"Execute" oder "Ausführen" Button** klicken
- **Fertig!** ✅

---

## 🎯 Zwei Wege zum Testen:

### Weg 1: Manual Trigger (für Tests)

1. **"Execute Workflow"** klicken (roter Button unten)
2. **"Manual Trigger (Test)"** öffnet sich
3. **Test-Daten eingeben** (oder vorhandene nutzen)
4. **"Execute"** klicken
5. **Workflow läuft!**

### Weg 2: Direkt über Webhook (für Produktion)

1. **Workflow aktivieren** (oben rechts: "Active" Toggle)
2. **Browser öffnen:**
   ```
   https://n8n2.kortex-system.de/webhook/business-card-extraction?sample=1
   ```
3. **Workflow läuft automatisch!**

---

## 💡 Einfach gesagt:

**Manual Trigger:**
- Rote Button unten → "Execute Workflow" klicken
- Manual Trigger Fenster öffnet sich
- Test-Daten eingeben (oder so lassen wie sie sind)
- "Execute" klicken
- **Fertig!** ✅

**Kein Manual Trigger nötig:**
- Workflow aktivieren
- Direkt Webhook aufrufen im Browser
- **Fertig!** ✅

---

## 📍 Wo finde ich was?

1. **"Execute Workflow" Button:** Unten im Workflow (rot, groß)
2. **Manual Trigger Fenster:** Öffnet sich automatisch nach "Execute Workflow" Klick
3. **Test-Daten:** Im Manual Trigger Fenster im Textfeld

---

## 🚀 Schnelltest:

1. **"Execute Workflow"** klicken (roter Button unten)
2. **Manual Trigger Fenster:** Test-Daten sind schon da (`{ "query": { "sample": "1" } }`)
3. **"Execute"** klicken
4. **Warten** → Workflow läuft durch
5. **Fertig!** ✅

**Das war's! So einfach ist das!** 😊

