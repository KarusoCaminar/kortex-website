// script.js - Koretex System (Finale Logik: Formular-Handling und Animation)

document.addEventListener('DOMContentLoaded', () => {

  // Formular Handling: Bindet den 'submit'-Listener an alle Formulare
  const contactForms = document.querySelectorAll('.contact-form, form[action="/api/contact"], form');
  
  contactForms.forEach(form => {
    // Falls das HTML noch 'onsubmit' enthält, entfernen wir es zur Sicherheit.
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
        // ACHTUNG: Dieser Fetch-Aufruf führt auf statischen Spaces ohne Backend zu einem Fehler (404).
        // Wir lassen ihn, da Sie die robuste Logik wünschen.
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });

        if(!res.ok){
          const err = await res.text();
          throw new Error(err || 'Serverfehler');
        }

        alert('Danke — Ihre Anfrage wurde übermittelt. Wir melden uns per E-Mail.');
        form.reset();
        
      } catch(err) {
        console.error('Contact submit error', err);
        // Da der Fehler fast immer ein fehlendes Backend ist, wird hier die Fehlermeldung ausgelöst.
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
      if (rect.top < window.innerHeight - 120) {
          el.classList.add('animate-fadeIn');
          el.classList.remove('animate-on-scroll');
      }
    });
    if (document.querySelectorAll('.animate-on-scroll').length === 0) {
        window.removeEventListener('scroll', animateOnScroll);
    }
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
    
  // Initialisierung des Copyright-Jahres
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Feather Icons
  if (window.feather) {
    feather.replace();
  }
});