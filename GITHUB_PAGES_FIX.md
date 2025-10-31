# GitHub Pages Hostinger-Problem beheben

## Problem
Die Website leitet auf Hostinger um oder zeigt die Hostinger-Seite an.

## Lösung: GitHub Pages-Einstellungen prüfen

### 1. GitHub Repository öffnen
Gehe zu: `https://github.com/KarusoCaminar/kortex-website`

### 2. Settings → Pages öffnen
- Klicke auf **"Settings"** (oben im Repository)
- Scrolle zu **"Pages"** (links im Menü)

### 3. Custom Domain entfernen
- Suche nach **"Custom domain"** oder **"Domain"**
- Falls eine Domain eingetragen ist (z.B. `kortex-system.de` oder ähnlich):
  - **LÖSCHE die Domain komplett**
  - Klicke auf **"Remove"** oder **"X"**
  - Warte bis die Änderung gespeichert ist

### 4. Branch und Folder prüfen
- Stelle sicher, dass:
  - **Source**: `Deploy from a branch` ist
  - **Branch**: `main` ausgewählt ist
  - **Folder**: `/ (root)` ist

### 5. Speichern und warten
- Klicke auf **"Save"**
- Warte 1-2 Minuten bis GitHub Pages neu deployed ist

### 6. Website-URL prüfen
Die korrekte GitHub Pages URL sollte sein:
```
https://karusocaminar.github.io/kortex-website/
```

**NICHT:**
- `https://kortex-system.de` (falls das noch funktioniert)
- Eine Hostinger-URL
- Eine andere Custom Domain

### 7. Falls Problem weiterhin besteht
1. **Browser-Cache leeren:**
   - Chrome/Edge: `Ctrl + Shift + Delete` → Cache leeren
   - Oder: Inkognito-Modus verwenden

2. **DNS-Cache leeren (Windows):**
   ```powershell
   ipconfig /flushdns
   ```

3. **Prüfe ob Hostinger-DNS noch aktiv ist:**
   - Falls du bei Hostinger eine Domain hast, die auf GitHub zeigen soll:
     - Gehe zu Hostinger DNS-Einstellungen
     - Entferne oder aktualisiere CNAME/A-Records, die auf GitHub zeigen sollten

## Verifizierung
Nach den Änderungen sollte:
- ✅ Die GitHub Pages URL (`https://karusocaminar.github.io/kortex-website/`) funktionieren
- ✅ Keine Redirects zu Hostinger mehr auftreten
- ✅ Die "Visit page" Button im GitHub Repository zur korrekten GitHub Pages URL führen


