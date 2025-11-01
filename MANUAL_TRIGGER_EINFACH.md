# 🎯 Manual Trigger - Einfach erklärt (wie für 5-Jährige)

## Was ist der Manual Trigger?

**Der Manual Trigger ist ein "Test-Knopf" in n8n!**

Du musst **NICHTS hochladen** - du gibst einfach **Test-Daten ein** (wie ein Formular).

---

## 📋 Schritt-für-Schritt:

### Schritt 1: Manual Trigger öffnen

1. **In n8n:** Workflow öffnen
2. **"Execute Workflow"** klicken (oben, großer Button)
3. **"Manual Trigger (Test)" Node** öffnen (klicken)

---

### Schritt 2: Test-Daten eingeben

**Du siehst jetzt ein Textfeld** (wie ein Notizblock).

**Dort steht bereits:**
```
{ "query": { "sample": "1" } }
```

**Das bedeutet:**
- Teste Sample 1 (die erste Visitenkarte)

**ODER du gibst andere Daten ein:**

**Für Sample 2:**
```
{ "query": { "sample": "2" } }
```

**Für Sample 3:**
```
{ "query": { "sample": "3" } }
```

**Für Upload (ohne Sample):**
```
{ "query": {} }
```

---

### Schritt 3: Execute klicken

1. **"Execute" oder "Ausführen"** Button klicken
2. **Workflow startet automatisch**
3. **Warte bis fertig**

---

## 🎯 Das war's!

**Keine Datei hochladen nötig!**

Du gibst einfach **Zahlen ein** (1, 2 oder 3) um zu testen:
- **1** = Teste Sample 1
- **2** = Teste Sample 2
- **3** = Teste Sample 3

---

## 💡 Beispiel:

1. **Manual Trigger öffnen**
2. **Textfeld sehen:** `{ "query": { "sample": "1" } }`
3. **"Execute" klicken**
4. **Fertig!** ✅

**So einfach ist das!** 😊

---

## ❓ Noch Fragen?

**Q: Muss ich eine Datei hochladen?**
**A:** NEIN! Du gibst nur Zahlen ein (1, 2 oder 3).

**Q: Was bedeutet "sample": "1"?**
**A:** Das bedeutet "Teste die erste Visitenkarte" (Sample 1).

**Q: Wo finde ich "Execute"?**
**A:** Oben rechts im Manual Trigger Fenster - großer Button.

**Q: Was passiert nach "Execute"?**
**A:** Der Workflow läuft automatisch und verarbeitet Sample 1.

---

**Das war's! Einfach Execute klicken und fertig!** 🚀

