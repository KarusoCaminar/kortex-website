# ✅ AI Agent Output Parser - KORREKTE Setup-Methode

## 🎯 Zwei Methoden (beide möglich):

### Methode 1: SUB-NODE am AI Agent (EMPFOHLEN)

**Der Structured Output Parser ist ein SUB-NODE am AI Agent:**

1. **AI Agent Node öffnen**
2. **Options Tab:**
   - ✅ **"Require Specific Output Format"** aktivieren
   - **ODER:** ✅ **"Has Output Parser"** = true
3. **Am AI Agent Node erscheint ein neuer Anschluss**
4. **Klicken** → **"Structured Output Parser" hinzufügen**
5. **Parser wird als SUB-NODE angehängt**

**Vorteil:** Parser ist direkt am AI Agent angehängt, keine separate Verbindung nötig.

---

### Methode 2: Separater Node (ALT/MÖGLICH)

**Der Structured Output Parser ist ein SEPARATER Node:**

1. **Structured Output Parser Node** hinzufügen (als separater Node)
2. **AI Agent Node öffnen:**
   - ✅ **"Has Output Parser"** = true (in Options)
3. **Verbindung erstellen:**
   - **Vom Structured Output Parser** → **Zum AI Agent**
   - Verbindungstyp: `ai_outputParser` (gestrichelte Linie)

**Vorteil:** Parser ist sichtbar als separater Node im Workflow.

---

## 📋 Welche Methode nutzt dein Workflow?

**Prüfe in n8n:**

1. **AI Agent Node öffnen**
2. **Prüfe:** Gibt es einen **SUB-NODE** (kleiner Node am AI Agent)?
3. **ODER:** Gibt es einen **separaten "Structured Output Parser" Node**?

**Beide Methoden funktionieren!** Wichtig ist nur:
- ✅ **AI Agent "Has Output Parser"** = true
- ✅ **Structured Output Parser** ist konfiguriert (SUB-NODE oder separater Node)

---

## 🔧 Falls es nicht funktioniert:

### Problem: "Kein Anschluss am AI Agent"

**Lösung:**
1. **AI Agent Node öffnen**
2. **Options Tab öffnen** (wenn vorhanden)
3. **"Require Specific Output Format" aktivieren** ✅
4. **ODER:** **"Has Output Parser" aktivieren** ✅
5. **Workflow speichern**
6. **Prüfe:** Erscheint jetzt ein Anschluss?

### Problem: "Verbindung kann nicht erstellt werden"

**Lösung:**
- **Als SUB-NODE hinzufügen** (Methode 1) statt als separater Node
- **ODER:** Prüfe ob AI Agent "Has Output Parser" aktiviert ist

---

## ✅ Checkliste:

1. ✅ **AI Agent "Has Output Parser" aktiviert?** (in Options)
2. ✅ **Structured Output Parser vorhanden?** (SUB-NODE oder separater Node)
3. ✅ **JSON Schema Example gesetzt?** (im Parser)
4. ✅ **Workflow gespeichert?**

---

**Wichtig:** Beide Methoden funktionieren! Wähle die Methode die in deiner n8n-Version verfügbar ist.

