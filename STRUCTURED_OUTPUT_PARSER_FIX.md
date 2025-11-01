# 🔧 Structured Output Parser Verbindung korrigieren

## ❌ Problem im Screenshot:

Ich sehe im Screenshot:
- **Structured Output Parser** → direkt zum **AI Agent** (gestrichelte Linie)
- **Google Vertex Chat Model** → **AI Agent** (gestrichelte Linie)

**Das ist FALSCH!** ❌

---

## ✅ Richtig ist:

```
Structured Output Parser
    ↓ (GESTRICHELTE LINIE - ai_outputParser)
Google Vertex Chat Model
    ↓ (GESTRICHELTE LINIE - ai_languageModel)
AI Agent - Vertex AI
```

**Die Verbindung muss RÜCKWÄRTS sein:**
- **VOM** Structured Output Parser **ZU** Google Vertex Chat Model
- **NICHT** direkt zum AI Agent!

---

## 🔧 So korrigierst du es in n8n:

### Schritt 1: Falsche Verbindung löschen

1. **Rechtsklick auf die Verbindung** vom "Structured Output Parser" zum "AI Agent"
2. **"Delete" oder "Löschen"** klicken
3. Verbindung ist jetzt gelöscht

### Schritt 2: Richtige Verbindung erstellen

1. **"Structured Output Parser" Node** → Klicke auf den **Output-Punkt** (rechts)
2. **Ziehe eine Linie** zum **"Google Vertex Chat Model" Node** → zum **Input-Punkt** (links)
3. **WICHTIG:** Die Linie sollte **GESTRICHELT** sein (nicht durchgezogen!)
4. Falls die Linie **durchgezogen** ist:
   - **Rechtsklick auf die Verbindung**
   - **"Connection Type"** oder **"Verbindungstyp"** wählen
   - **`ai_outputParser`** auswählen
   - Die Linie wird dann **GESTRICHELT**

### Schritt 3: Prüfen

**Richtige Struktur:**
```
Structured Output Parser
    ↓ (GESTRICHELTE LINIE)
Google Vertex Chat Model
    ↓ (GESTRICHELTE LINIE am "Chat Model*" Port)
AI Agent - Vertex AI
```

**Beide Verbindungen sollten GESTRICHELT sein!**

---

## 📋 Checkliste:

1. ✅ **Structured Output Parser** → **Google Vertex Chat Model** (GESTRICHELTE LINIE)
2. ✅ **Google Vertex Chat Model** → **AI Agent** (GESTRICHELTE LINIE, am "Chat Model*" Port)
3. ✅ **KEINE direkte Verbindung** vom Structured Output Parser zum AI Agent

---

## 🧪 Test:

1. **Workflow speichern**
2. **"Execute Workflow"** klicken
3. **"Manual Trigger (Test)"** öffnen
4. **Test-Daten hinzufügen:**
   ```json
   {
     "query": {
       "sample": "1"
     }
   }
   ```
5. **Execute** → Workflow sollte durchlaufen

**Falls AI Agent Fehler gibt:**
- Structured Output Parser Verbindung ist noch falsch
- Prüfe ob beide Verbindungen GESTRICHELT sind

---

## 💡 Warum ist das so?

Der Structured Output Parser muss **VOR** dem Model Node sein, weil er dem Model sagt:
- "Gib mir Daten in DIESEM Format zurück!"

Das Model nutzt den Parser als "Vorlage" und gibt strukturierte Daten zurück.

Deshalb:
- **Parser** → **Model** (Parser sagt Model wie es antworten soll)
- **Model** → **AI Agent** (Model gibt strukturierte Daten an Agent)

**NICHT:**
- Parser → AI Agent direkt (das funktioniert nicht!)

---

**Bitte korrigiere die Verbindung in n8n und teste dann den Workflow!**

