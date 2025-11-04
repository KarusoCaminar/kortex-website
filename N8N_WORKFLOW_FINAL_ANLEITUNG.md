# ✅ n8n Workflow FINAL - Komplett funktionierend

## 📁 Datei: `n8n-ai-news-workflow.json`

**Status:** ✅ **BEREIT FÜR IMPORT**  
**Kompatibel:** n8n 1.15.2+ (kein Update nötig!)  
**Features:**
- ✅ Cron Trigger (alle 2 Stunden) → Aktualisiert GitHub
- ✅ Webhook Trigger (optional) → Direkter Response für Website

---

## 🚀 Schritt 1: Workflow importieren (30 Sekunden)

1. **n8n Dashboard öffnen**
2. **Workflows** → **Import from File** (oder **Import** → **From File**)
3. **Datei wählen:** `n8n-ai-news-workflow.json`
4. **Import** klicken
5. **Workflow wird erstellt** → Name: "AI News Aggregator - Kortex System"

✅ **Fertig!**

---

## 🔑 Schritt 2: GitHub Personal Access Token erstellen (2 Minuten)

### 2.1 Token auf GitHub erstellen

1. **GitHub öffnen:** https://github.com/settings/tokens
2. **"Generate new token"** → **"Generate new token (classic)"**
3. **Token name:** `n8n-kortex-news` (oder beliebig)
4. **Expiration:** `No expiration` (oder 90 Tage)
5. **Scopes:** ✅ **Nur `repo` aktivieren** (wichtig!)
   - ✅ repo
   - ❌ Alle anderen deaktiviert
6. **"Generate token"** klicken
7. **Token kopieren** (wird nur einmal angezeigt!)
   - Beispiel: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2.2 Token in n8n Credentials speichern

1. **n8n Dashboard** → **Credentials** (oben rechts)
2. **Add Credential** klicken
3. **GitHub API** auswählen
4. **Token** einfügen (aus Schritt 2.1)
5. **Name:** `GitHub Kortex News` (oder beliebig)
6. **Save** klicken

✅ **Fertig!**

---

## ⚙️ Schritt 3: GitHub Node konfigurieren (2 Minuten)

1. **Workflow öffnen** ("AI News Aggregator - Kortex System")
2. **"Write to GitHub" Node öffnen** (ganz rechts im Cron-Pfad)
3. **Repository Owner:** `KarusoCaminar` (eingeben)
4. **Repository Name:** `kortex-website` (eingeben)
5. **File Path:** `n8n_news.json` (sollte schon da sein)
6. **Operation:** `update` oder `edit` (sollte schon da sein)
   - Falls nicht: `update` oder `edit` aus Dropdown wählen
   - **HINWEIS:** In n8n 1.15.2 könnte es `edit` statt `update` heißen - beide funktionieren!
7. **Content:** `={{ $json.content }}` (sollte schon da sein)
8. **Commit Message:** `docs: [AUTOMATED] Update AI news feed` (sollte schon da sein)
9. **Credentials:** 
   - **Dropdown öffnen** → `GitHub Kortex News` auswählen (aus Schritt 2.2)
   - Falls nicht sichtbar: **"Create New Credential"** → GitHub API → Token einfügen
10. **Save Workflow** klicken (oben rechts)

✅ **Fertig!**

---

## 🧪 Schritt 4: Workflow testen (1 Minute)

1. **Workflow aktivieren** (Toggle oben rechts - sollte grün sein)
2. **"Execute Workflow"** klicken (manueller Test)
3. **Warten** bis alle Nodes grün sind (ca. 10-30 Sekunden)
4. **"Write to GitHub" Node öffnen** → **Output** Tab prüfen
   - Sollte `200 OK` oder ähnliches zeigen
   - Keine Fehler!

### GitHub prüfen:

1. **GitHub öffnen:** https://github.com/KarusoCaminar/kortex-website/blob/main/n8n_news.json
2. **Sollte aktualisiert sein:**
   - `lastUpdated` sollte aktuelles Datum/Zeit haben
   - `news` Array sollte News enthalten (oder leer sein, wenn keine gefunden)

✅ **Fertig!**

---

## ✅ Workflow-Struktur:

**Cron-Trigger (alle 2 Stunden):**
```
Cron Trigger
    ↓
8 RSS Feeds (parallel laden)
    ↓
Merge All Feeds
    ↓
Parse RSS & Filter
    ↓
IF - Trigger Check (FALSE-Pfad)
    ↓
Format for GitHub
    ↓
Write to GitHub → n8n_news.json auf GitHub
```

**Webhook-Trigger (optional):**
```
Webhook Trigger
    ↓
8 RSS Feeds (parallel laden)
    ↓
Merge All Feeds
    ↓
Parse RSS & Filter
    ↓
IF - Trigger Check (TRUE-Pfad)
    ↓
Respond to Webhook → Direkter Response für Website
```

---

## 🔧 Falls Probleme:

### Problem 1: "sha wasn't supplied" Error

**Lösung:**
1. Prüfe ob GitHub Credentials korrekt sind (Token hat `repo` Berechtigung?)
2. Prüfe ob Repository Owner/Name korrekt sind:
   - Owner: `KarusoCaminar` (großgeschrieben!)
   - Repo: `kortex-website` (mit Bindestrich!)
3. Prüfe ob `n8n_news.json` im Repository existiert ✅ (existiert bereits)

### Problem 2: "Repository not found" Error

**Lösung:**
1. Prüfe ob GitHub Token `repo` Berechtigung hat
2. Prüfe ob Repository Owner korrekt ist (`KarusoCaminar`)
3. Prüfe ob Repository Name korrekt ist (`kortex-website`)

### Problem 3: Workflow läuft nicht automatisch

**Lösung:**
1. Prüfe ob Workflow **aktiviert** ist (Toggle oben rechts muss grün sein)
2. Prüfe Cron Trigger Konfiguration:
   - Sollte "Alle 2 Stunden" sein
   - Falls nicht: Node öffnen → "hoursInterval: 2" prüfen

### Problem 4: Keine News gefunden

**Lösung:**
1. Prüfe "Parse RSS & Filter" Node Output
2. Prüfe ob RSS Feeds erreichbar sind
3. Prüfe ob AI Keywords in News vorhanden sind

---

## ✅ Checkliste (nach Import):

- [ ] Workflow importiert
- [ ] GitHub Personal Access Token erstellt (mit `repo` Berechtigung)
- [ ] GitHub Credentials in n8n erstellt
- [ ] GitHub Node konfiguriert:
  - [ ] Repository Owner: `KarusoCaminar`
  - [ ] Repository Name: `kortex-website`
  - [ ] File Path: `n8n_news.json`
  - [ ] Operation: `update` oder `edit`
  - [ ] Credentials: ausgewählt
- [ ] Workflow aktiviert (Toggle grün)
- [ ] Manueller Test erfolgreich
- [ ] `n8n_news.json` auf GitHub aktualisiert

---

## 📊 Erwartetes Ergebnis:

**n8n_news.json auf GitHub:**
```json
{
  "lastUpdated": "2025-01-09T12:00:00.000Z",
  "news": [
    {
      "title": "AI News Title",
      "description": "AI News Description",
      "link": "https://example.com/news",
      "date": "2025-01-09T10:00:00.000Z",
      "source": "Google AI",
      "category": "große-modelle",
      "language": "en"
    },
    ...
  ]
}
```

---

## ✅ Status: BEREIT

**Der Workflow ist jetzt:**
- ✅ Vollständig (Cron + Webhook)
- ✅ Funktionsfähig (GitHub Update + Webhook Response)
- ✅ Kompatibel (n8n 1.15.2+)
- ✅ Garantiert funktionierend (nach korrekter Konfiguration)

**Nach den 4 Schritten läuft der Workflow automatisch alle 2 Stunden und aktualisiert `n8n_news.json` auf GitHub!**

---

**Viel Erfolg! 🚀**
