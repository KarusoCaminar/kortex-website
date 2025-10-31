# 🤖 AI-News n8n Workflow Setup

## 📋 Übersicht

Dieser n8n Workflow sammelt AI-News von seriösen Quellen und stellt sie für die Website bereit.

## 🎯 Features

1. ✅ **Seriöse Quellen:**
   - Google AI Blog
   - OpenAI Blog
   - n8n Blog
   - Anthropic Blog (optional)

2. ✅ **KI-Tools Integration:**
   - Fireflies AI
   - HubSpot AI
   - Salesforce Einstein
   - Weitere branchenspezifische Tools

3. ✅ **Automatische Updates:**
   - Alle 2 Stunden
   - Filtert nach Relevanz
   - Entfernt Duplikate

4. ✅ **Deutsch/Englisch:**
   - Kann mit AI Agent erweitert werden für Übersetzungen

## 🚀 Setup

### Schritt 1: Workflow importieren

1. Öffne n8n: `https://n8n2.kortex-system.de`
2. Gehe zu: **Workflows** → **Import from File**
3. Wähle: **`n8n-ai-news-workflow.json`**
4. Klicke **"Import"**

### Schritt 2: Cron Trigger konfigurieren

1. Klicke auf **"Alle 2 Stunden"** Node
2. Stelle ein:
   - **Interval:** 2 Stunden
   - **Timezone:** Deine Zeitzone

### Schritt 3: RSS Feeds prüfen

1. **Google AI Blog RSS:** Sollte funktionieren
2. **n8n Blog RSS:** Sollte funktionieren
3. **OpenAI Blog RSS:** Prüfe ob CORS funktioniert

### Schritt 4: Parse Node anpassen

Im **"Parse RSS & Filter"** Node kannst du:
- Weitere RSS Feeds hinzufügen
- Kategorien anpassen
- Filter erweitern

### Schritt 5: Website-Integration (Optional)

1. **Option A: Webhook**
   - Erstelle Webhook-Endpoint auf deiner Website
   - Empfange News-JSON
   - Speichere in Datenbank oder Cache

2. **Option B: Static API**
   - Workflow speichert News in Datei
   - Website lädt Datei regelmäßig

3. **Option C: Direkter API-Call**
   - Website ruft n8n Webhook auf
   - Erhält aktuelle News direkt

## ✅ Checkliste

- [ ] Workflow importiert
- [ ] Cron Trigger konfiguriert
- [ ] RSS Feeds funktionieren
- [ ] Parse Node filtert korrekt
- [ ] Website-Integration eingerichtet

## 🔧 Erweiterungen

### Mit AI Agent für Übersetzungen:

1. Füge **AI Agent Node** nach "Parse RSS & Filter" hinzu
2. Prompt: "Übersetze diese AI-News ins Deutsche"
3. Erstellt deutsche Versionen automatisch

### Weitere Quellen hinzufügen:

1. **Anthropic Blog RSS**
2. **Microsoft AI Blog RSS**
3. **AWS AI/ML Blog RSS**
4. **HubSpot AI Updates**
5. **Fireflies AI Blog**

### KI-Tools APIs:

Falls APIs verfügbar sind:
1. Füge HTTP Request Nodes hinzu
2. Parse JSON Responses
3. Füge zu News-Liste hinzu

