// script.js - Kortex System (Finale Logik: Formular-Handling und Animation)

document.addEventListener('DOMContentLoaded', () => {

  // Rechnungsdatenextraktion: Sprache als Query-Parameter hinzufügen
  const invoiceLink = document.querySelector('a[href*="onrender.com"], a[href*="invoice"]');
  if (invoiceLink && invoiceLink.href && !invoiceLink.href.includes('[NEUE_STABILE_INVOICE_URL]')) {
    invoiceLink.addEventListener('click', (e) => {
      try {
        // Aktuelle Sprache abrufen
        const currentLang = window.i18n?.getCurrentLanguage() || 'de';
        
        // URL mit Sprach-Parameter erweitern
        const url = new URL(invoiceLink.href);
        url.searchParams.set('lang', currentLang);
        invoiceLink.href = url.toString();
        
        console.log('📋 Rechnungsdatenextraktion geöffnet mit Sprache:', currentLang, url.toString());
      } catch (error) {
        console.warn('⚠️ Fehler beim Erweitern der Invoice-URL:', error);
      }
    });
  }

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
          // Dynamische Sprache für "Senden..."
          const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'de';
          submitBtn.textContent = currentLang === 'en' ? 'Sending...' : 'Senden...';
      }

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((v,k) => payload[k] = v);

      try {
        // Lädt die Webhook-URL aus der zentralen Konfiguration
        const n8nWebhookUrl = window.appConfig?.n8nWebhookUrl;
        if (!n8nWebhookUrl) {
            throw new Error('n8n-Webhook-URL ist nicht konfiguriert.');
        }
        
        const res = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(payload)
        });

        if(!res.ok){
          const err = await res.text();
          throw new Error(err || 'Serverfehler');
        }

        // Analytics: Track form submission
        const formName = form.getAttribute('data-form-name') || 'Contact Form';
        const formLocation = window.location.pathname;
        
        // Track Google Analytics
        if (window.trackFormSubmission) {
          window.trackFormSubmission(formName, {
            form_location: formLocation
          });
        }
        
        // Track Facebook Pixel
        if (window.trackFacebookFormSubmission) {
          window.trackFacebookFormSubmission(formName, {
            content_name: formLocation
          });
        }
        
        // Erfolgs-Nachricht im Formular anzeigen
        const messageContainer = form.querySelector('#form-message');
        if (messageContainer) {
            const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'de';
            const successMsg = currentLang === 'en'
              ? 'Thank you! Your request has been submitted.'
              : 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.';
            messageContainer.textContent = successMsg;
            messageContainer.style.display = 'block';
            messageContainer.style.backgroundColor = '#d1fae5'; // Grün
            messageContainer.style.color = '#065f46'; // Dunkelgrün
        }
        form.reset();
        
      } catch(err) {
        console.error('Contact submit error', err);
        // Fehler-Nachricht im Formular anzeigen
        const messageContainer = form.querySelector('#form-message');
        if (messageContainer) {
            const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'de';
            const errorMsg = currentLang === 'en'
              ? 'Error submitting the form. Please try again.'
              : 'Fehler beim Senden des Formulars. Bitte versuchen Sie es erneut.';
            messageContainer.textContent = errorMsg;
            messageContainer.style.display = 'block';
            messageContainer.style.backgroundColor = '#fee2e2'; // Rot
            messageContainer.style.color = '#991b1b'; // Dunkelrot
        }
        
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