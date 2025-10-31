# 🔧 WEBSITE FIX: Sample Parameter wird nicht korrekt gesendet

## ❌ Problem:
**Die Website sendet einen leeren oder falschen `sample` Parameter an n8n!**

**Symptome:**
- n8n bekommt `query: { "sample": "" }` oder `query: { "sample": null }`
- Alle IF Nodes schlagen fehl
- Workflow landet immer im False Branch von "Sample 3?"

---

## 🔍 Debugging:

### SCHRITT 1: Browser-Console prüfen

1. **Öffne Website:** `https://karusocaminar.github.io/kortex-website/kortex-n8n-modal.html`
2. **Öffne Browser-Console** (F12)
3. **Klicke auf "Visitenkarte 1"**
4. **Prüfe Console-Logs:**

**Erwartete Logs:**
- `📋 Extra Params:` → sollte zeigen: `sample=1`
- `📝 Sample Parameter:` → sollte zeigen: `1`
- `🌐 Final Webhook URL:` → sollte zeigen: `...?sample=1` oder `...&sample=1`

**Wenn leer:**
- `📋 Extra Params:` → zeigt `""` (leer) ❌
- `📝 Sample Parameter:` → zeigt `null` ❌
- `🌐 Final Webhook URL:` → zeigt URL OHNE `?sample=1` ❌

---

## 🔧 Fix: Website-Logik prüfen und korrigieren

### Problem 1: Link wird nicht gefunden

**Ursache:** `activeLink` ist `null`, weil der Link nicht korrekt gefunden wird.

**Fix:** Prüfe ob `clickedLink` korrekt übergeben wird.

---

### Problem 2: data-params ist leer

**Ursache:** `data-params` Attribut ist leer oder fehlt.

**Fix:** Prüfe ob `data-params` korrekt im HTML gesetzt ist.

---

### Problem 3: extraParams wird nicht korrekt extrahiert

**Ursache:** `activeLink?.getAttribute('data-params')` gibt leer zurück.

**Fix:** Prüfe ob `data-params` korrekt ausgelesen wird.

---

## 🔧 Sofort-Fix:

### Prüfe Browser-Console:

1. **Klicke auf "Visitenkarte 1"**
2. **Prüfe Console:**
   - `🔍 Click auf Card:` → zeigt `sampleParam: "sample=1"`?
   - `📋 Extra Params:` → zeigt `sample=1`?
   - `🌐 Final Webhook URL:` → zeigt `...?sample=1`?

**Wenn etwas leer ist:**
- `❌ KRITISCH: Keine extraParams gefunden!` → Link wurde nicht gefunden!
- `🔍 Gefundener Link:` → zeigt `found: false`? → Link wurde nicht gefunden!

---

## 🔧 Fix: Link-Suche verbessern

**Problem:** Link wird nicht korrekt gefunden, deshalb sind `extraParams` leer.

**Lösung:** Verbessere die Link-Suche oder verwende `clickedLink` direkt.

---

## 📋 Checkliste:

**Browser-Console prüfen:**
- [ ] `🔍 Click auf Card:` zeigt korrekten `sampleParam`?
- [ ] `📋 Extra Params:` zeigt `sample=1`, `sample=2`, oder `sample=3`?
- [ ] `📝 Sample Parameter:` zeigt `1`, `2`, oder `3`?
- [ ] `🌐 Final Webhook URL:` zeigt URL MIT `?sample=1`?

**Wenn leer:**
- [ ] `❌ KRITISCH: Keine extraParams gefunden!` → Link wurde nicht gefunden!
- [ ] `🔍 Gefundener Link:` zeigt `found: false`? → Link wurde nicht gefunden!

---

**Status:** 🔍 **DEBUG ERFORDERLICH** - Bitte Browser-Console prüfen und Logs teilen!

