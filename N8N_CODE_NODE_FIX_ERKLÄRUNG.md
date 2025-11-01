# ✅ Code Node Fix - $json Property Error

## ❌ Problem

**Fehler:** `A 'json' property isn't an object [item 0]`

**Ursache:** `$json` wird falsch verwendet im Object Literal!

**Falscher Code:**
```javascript
return [{
    json: {
        $json,  // ❌ FALSCH! Das funktioniert nicht!
        route: route,
        ...
    }
}];
```

**Problem:** `$json` ist ein n8n spezieller Ausdruck und kann nicht einfach so in einem Object Literal verwendet werden.

---

## ✅ Lösung

### Fix 1: Spread Operator verwenden

**Korrigierter Code:**
```javascript
return [{
    json: {
        ...$json,  // ✅ RICHTIG! Spread operator kopiert alle Properties!
        route: route,
        loadSampleNode: loadSampleNode,
        sample: sampleStr
    }
}];
```

**Warum:** Der Spread Operator (`...`) kopiert alle Properties von `$json` in das neue Objekt.

---

### Fix 2: Alternative - Manuell kopieren

**Falls Spread Operator nicht funktioniert:**

```javascript
return [{
    json: {
        query: $json.query || {},
        headers: $json.headers || {},
        params: $json.params || {},
        route: route,
        loadSampleNode: loadSampleNode,
        sample: sampleStr
    }
}];
```

**ODER:**

```javascript
// Kopiere alle Properties von $json manuell
const jsonData = {
    ...($json.json || $json || {}),
    route: route,
    loadSampleNode: loadSampleNode,
    sample: sampleStr
};

return [{
    json: jsonData
}];
```

---

## ✅ Korrigierter Code (COMPLETE)

```javascript
// Route to Sample - KORRIGIERT!

const sample = String($json.query?.sample || '').trim();

console.log('🔍 [Route to Sample] Sample Parameter:', sample);
console.log('📋 Raw query:', $json.query);

// Konvertiere zu String (sicher)
const sampleStr = String(sample).trim();

// Route basierend auf Sample
let route = 'upload'; // Default: Upload
let loadSampleNode = null;

if (sampleStr === '1') {
    route = 'sample-1';
    loadSampleNode = 'Lade Sample 1';
    console.log('✅ Route: Sample 1');
} else if (sampleStr === '2') {
    route = 'sample-2';
    loadSampleNode = 'Lade Sample 2';
    console.log('✅ Route: Sample 2');
} else if (sampleStr === '3') {
    route = 'sample-3';
    loadSampleNode = 'Lade Sample 3';
    console.log('✅ Route: Sample 3');
} else {
    route = 'upload';
    console.log('✅ Route: Upload (kein Sample)');
}

// KRITISCH: Spread operator verwenden!
return [{
    json: {
        ...$json,  // ← Spread operator kopiert alle Properties!
        route: route,
        loadSampleNode: loadSampleNode,
        sample: sampleStr
    }
}];
```

---

## 📋 Schritt-für-Schritt Fix

1. **"Route to Sample" Code Node öffnen**
2. **Code ersetzen:**
   - Finde die Zeile: `$json,`
   - Ändere zu: `...$json,` (Spread operator hinzufügen!)
3. **Speichern**
4. **Test:** Execute Workflow → Sollte jetzt funktionieren!

---

## 🧪 Test

### Test 1: Code Node Output prüfen

1. **Workflow aktivieren**
2. **Execute Workflow** mit `?sample=1`
3. **"Route to Sample" Code Node Output prüfen:**
   - `json` sollte ein Objekt sein ✅
   - `json.route` sollte `"sample-1"` sein ✅
   - `json.sample` sollte `"1"` sein ✅
   - Alle anderen Properties von `$json` sollten vorhanden sein ✅

---

## ✅ Zusammenfassung

**Problem:**
- `$json,` direkt im Object Literal → Funktioniert nicht!

**Lösung:**
- `...$json,` mit Spread Operator → Funktioniert!

**Das sollte den Fehler beheben!**

