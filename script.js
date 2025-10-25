// script.js - Koretex System

document.addEventListener('DOMContentLoaded', () => {
  // Formular Handling (alle .contact-form)
  const contactForms = document.querySelectorAll('.contact-form, form[action="/api/contact"], form'); // robust selector
  contactForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"], .btn-primary');
      const originalText = submitBtn ? submitBtn.textContent : null;
      if(submitBtn) submitBtn.disabled = true;

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((v,k) => payload[k] = v);

      try {
        // 1) Optional: call your backend endpoint which proxies to Vertex AI.
        // Replace '/api/contact' with your real serverless endpoint.
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });

        if(!res.ok){
          const err = await res.text();
          throw new Error(err || 'Serverfehler');
        }

        // Optional: kick off an async Vertex AI job via your backend:
        // await fetch('/api/ai', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({process: payload.process, email: payload.email}) });

        alert('Danke — Ihre Anfrage wurde übermittelt. Wir melden uns per E-Mail.');
        form.reset();
      } catch(err) {
        console.error('Contact submit error', err);
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
      if (rect.top < window.innerHeight - 120) el.classList.add('animate-fadeIn');
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});
