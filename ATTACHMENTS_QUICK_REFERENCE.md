# 📍 Attachments - Schnellreferenz

## Wo ist es?

**Parameters Tab → Nach unten scrollen → "Attachments" Sektion**

---

## Was genau eintragen?

### Im Attachments-Formular:

```
Name: business-card

Data: ={{ $('Setze Sample-Info').binary || $binary }}

MIME Type: image/jpeg
```

---

## Falls es nicht funktioniert:

### Vereinfachte Version:

```
Name: business-card

Data: ={{ $binary }}

MIME Type: image/jpeg
```

---

## ⚠️ WICHTIG:

1. **Tools entfernen** (Settings Tab → Tools → ALLE entfernen) ❌
2. **Attachments konfigurieren** (Parameters Tab → Attachments → Data eintragen) ✅
3. **Chat Model** konfiguriert (Settings Tab → Chat Model → Google Vertex AI) ✅

