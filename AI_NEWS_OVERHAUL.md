# 🔄 AI-News Komponente - Kompletter Überhaul

## 🎯 Ziele

1. ✅ **Seriöse Quellen** (kein Reddit!)
   - Google AI Blog
   - OpenAI Blog
   - Anthropic Blog
   - n8n Blog
   - Microsoft AI Blog
   - AWS AI/ML Blog
   
2. ✅ **Branchenspezifische KI-Tools:**
   - **Bau:** PlanGrid AI, Procore, BIM 360
   - **Gewerbe:** Shopify AI, Square AI
   - **Handwerk:** Jobber AI, ServiceTitan AI
   - **Dienstleister:** Fireflies AI, Otter.ai, Gong.io
   - **Sales:** HubSpot AI, Salesforce Einstein, Pipedrive AI

3. ✅ **Große KI-Modelle & Plattformen:**
   - Google Gemini
   - OpenAI GPT
   - Anthropic Claude
   - Meta AI
   - Mistral AI

4. ✅ **Deutsch/Englisch Mix:**
   - Deutsche Quellen: BMWK, Bitkom, etc.
   - Englische Quellen: Hauptsächlich Tech-Blogs
   - Wechselnd anzeigen

5. ✅ **Aktuell & relevant:**
   - Was gerade gehypt wird
   - Auch weniger bekannte, aber relevante Tools
   - Ständig aktualisiert

---

## 🔧 Lösung 1: Seriöse RSS Feeds & APIs (Schnell)

### Quellen-Liste:

#### Tech-Blogs (Englisch):
- Google AI Blog: `https://ai.googleblog.com/feeds/posts/default`
- OpenAI Blog: `https://openai.com/blog/rss.xml`
- Anthropic Blog: `https://www.anthropic.com/blog/rss.xml`
- n8n Blog: `https://blog.n8n.io/rss.xml`
- Microsoft AI Blog: RSS Feed
- AWS AI/ML Blog: RSS Feed

#### Deutsche Quellen:
- BMWK KI: Aktuelle Nachrichten
- Bitkom KI: Aktuelle Nachrichten

#### Tool-spezifische Blogs:
- Fireflies AI Blog
- HubSpot AI Updates
- Salesforce Einstein Updates

---

## 🤖 Lösung 2: n8n Workflow für AI-News (Besser!)

### Workflow-Struktur:

```
1. Trigger (Cron): Alle 2 Stunden
   ↓
2. Sammle News von verschiedenen Quellen:
   - Google AI Blog RSS
   - OpenAI Blog RSS
   - Anthropic Blog RSS
   - n8n Blog RSS
   - KI-Tools Blogs (Fireflies, HubSpot, etc.)
   ↓
3. Filtere nach Relevanz:
   - KI-Tools
   - Workflow-Automatisierung
   - Branchenspezifische Lösungen
   ↓
4. Bereichere mit Kontext:
   - Welche Branche?
   - Welches Tool?
   - Was macht es?
   ↓
5. Speichere in Datenbank (optional)
   ↓
6. API-Endpoint für Website
```

---

## 📝 Implementierung

### Schritt 1: AI-News Komponente überarbeiten

Ersetze `fetchAINewsFromMultipleSources()` mit seriösen Quellen.

### Schritt 2: n8n Workflow erstellen (optional)

Falls gewünscht, erstelle ich einen n8n Workflow.

### Schritt 3: KI-Tools Kategorien

Kategorisiere News nach:
- **Große Modelle:** Google Gemini, OpenAI GPT, etc.
- **Branchentools:** Fireflies AI, HubSpot AI, etc.
- **Workflow-Tools:** n8n, Zapier AI, etc.

---

## ✅ Checkliste

- [ ] Reddit entfernt
- [ ] Hacker News entfernt (oder optional)
- [ ] Seriöse RSS Feeds hinzugefügt
- [ ] KI-Tools Kategorien implementiert
- [ ] Deutsch/Englisch Mix
- [ ] Branchenspezifische Tools integriert
- [ ] Aktuell & relevant gefiltert

