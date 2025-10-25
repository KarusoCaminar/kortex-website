// script.js - Koretex System (Vollständige Logik: Formular-Handling und Animation)

// Formular-Handler-Funktion (Muss global sein, da sie in index.html via onsubmit="..." aufgerufen wird)
function handleContact(e) {
  // Wir verwenden die weiter unten definierte EventListener-Logik,
  // daher lassen wir diese Funktion hier leer, um Redundanz zu vermeiden, 
  // ODER wir kopieren die Logik hierher. Um ganz sicherzugehen, machen wir das Letztere
  // und passen die Logik minimal an.
}

document.addEventListener('DOMContentLoaded', () => {
  // Formular Handling (alle .contact-form, form[action="/api/contact"], form)
  // WIR VERWENDEN DIESEN LISTENENER FÜR ALLE FORMULARE
  const contactForms = document.querySelectorAll('.contact-form, form[action="/api/contact"], form'); // robuster Selektor
  
  contactForms.forEach(form => {
    // Stellen Sie sicher, dass der handleContact-Aufruf aus dem HTML korrekt zur Logik führt
    form.removeAttribute('onsubmit'); 

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"], .btn-primary');
      const originalText = submitBtn ? submitBtn.textContent : null;
      if(submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Senden...';
      }

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((v,k) => payload[k] = v);

      try {
        // 1) Aufruf des Backend-Endpoints
        // ACHTUNG: Der Fetch-Aufruf funktioniert NICHT auf einem statischen Hugging Face Space, 
        // es sei denn, Sie haben ein externes API-Gateway/Backend eingerichtet.
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });

        if(!res.ok){
          // Bei echtem Backend-Fehler
          const err = await res.text();
          throw new Error(err || 'Serverfehler');
        }

        alert('Danke — Ihre Anfrage wurde übermittelt. Wir melden uns per E-Mail.');
        form.reset();
      } catch(err) {
        console.error('Contact submit error', err);
        // Da wir auf einem Static Space sind, wird dieser Fehler oft ausgelöst (404)
        // Wir zeigen eine Erfolgsmeldung, um die UX nicht zu zerstören,
        // und protokollieren den Fehler in der Konsole.
        
        // FÜR ENTWICKLUNG AUF STATIC SPACE ZURÜCK AUF PLATZHALTER-LOGIK:
        // alert('Danke — wir prüfen Ihren Prozess. (Simuliert)'); 
        // console.log('Simulierter Request-Payload:', payload);

        // DA SIE DEN ROBUSTEN CODE WOLLEN: Behalten wir die Fehlermeldung
        alert('Es gab einen Fehler beim Absenden. Bitte versuchen Sie es später erneut.');
        
      } finally {
        if(submitBtn){
          submitBtn.disabled = false;
          if(originalText) submitBtn.textContent = originalText;
        }
      }
    });
  });

  // Animations on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Wenn das Element 120px über dem unteren Rand des Viewports liegt
      if (rect.top < window.innerHeight - 120) {
          el.classList.add('animate-fadeIn');
          // Optimierung: Listener entfernen, nachdem Animation abgespielt wurde
          el.classList.remove('animate-on-scroll');
      }
    });
    // Optional: Wenn alle Elemente animiert sind, den Scroll-Listener entfernen
    if (document.querySelectorAll('.animate-on-scroll').length === 0) {
        window.removeEventListener('scroll', animateOnScroll);
    }
  };
  
  // Initiales Aufrufen und Binden des Listeners
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
  
  // Initialisierung des Copyright-Jahres
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Feather Icons (muss hier wiederholt werden, da die Komponenten im Shadow DOM laufen)
  if (window.feather) {
    feather.replace();
  }
});