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
        // n8n Webhook Integration - Unbegrenzte Submissions + KI + E-Mail
        const n8nWebhookUrl = 'https://n8n2.kortex-system.de/webhook/016e0a41-9748-47c9-8ca9-debc40463598'; 
        
        const res = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(payload)
        });

        if(!res.ok){
          const err = await res.text();
          throw new Error(err || 'Serverfehler');
        }

        // Dynamische Sprache für Erfolgs-Nachricht
        const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'de';
        const successMsg = currentLang === 'en' 
          ? 'Thank you — Your request has been submitted. We will contact you by email.'
          : 'Danke — Ihre Anfrage wurde übermittelt. Wir melden uns per E-Mail.';
        alert(successMsg);
        form.reset();
        
      } catch(err) {
        console.error('Contact submit error', err);
        // Dynamische Sprache für Fehler-Nachricht
        const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'de';
        const errorMsg = currentLang === 'en'
          ? 'There was an error submitting. Please try again later or contact us directly: info@kortex-system.com'
          : 'Es gab einen Fehler beim Absenden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt: info@kortex-system.com';
        alert(errorMsg);
        
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