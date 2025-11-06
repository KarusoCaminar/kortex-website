// i18n.js - Kortex System Sprachumschaltung
// WICHTIG: Texte im HTML bleiben als Fallback!

(function() {
  'use strict';

  const DEFAULT_LANG = 'de';
  const STORAGE_KEY = 'kortex_language';

  // Sprache aus URL-Query-Parameter (höchste Priorität)
  function getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'en' || langParam === 'de') {
      return langParam;
    }
    return null;
  }

  // Aktuelle Sprache initialisieren
  // PRIORITÄT: URL Query-Parameter > LocalStorage > Default
  let currentLanguage;
  
  // Prüfe URL-Parameter zuerst (höchste Priorität)
  const urlLang = getLanguageFromURL();
  if (urlLang) {
    // URL-Parameter hat Priorität - setze und speichere in localStorage
    currentLanguage = urlLang;
    localStorage.setItem(STORAGE_KEY, urlLang);
  } else {
    // Falls kein URL-Parameter: LocalStorage oder Default
    currentLanguage = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  // Übersetzungsfunktion mit Fallback
  function t(key, lang = currentLanguage) {
    // Prüfe ob translations verfügbar ist
    if (typeof translations === 'undefined') {
      console.warn('translations.js not loaded');
      return null; // Kein Key zurückgeben, null = behalte HTML-Text
    }
    
    if (!translations[lang] || !translations[lang][key]) {
      return null; // Behalte HTML-Text
    }
    
    return translations[lang][key];
  }

  // Sprache setzen
  function setLanguage(lang) {
    if (lang !== 'de' && lang !== 'en') {
      console.error(`Invalid language: ${lang}`);
      return;
    }
    
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    
    updateTranslations();
    
    // Event für andere Komponenten
    window.dispatchEvent(new CustomEvent('languagechange', { 
      detail: { language: lang } 
    }));
  }

  // Alle Übersetzungen auf der Seite aktualisieren
  function updateTranslations() {
    // Elemente mit data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = t(key);
      if (translation) {
        // Check if translation contains HTML tags
        if (translation.includes('<')) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // Placeholder-Attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      if (translation) {
        element.setAttribute('placeholder', translation);
      }
    });
    
    // Aria-Label-Attribute
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria-label');
      const translation = t(key);
      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });
  }

  // Aktuelle Sprache abrufen
  function getCurrentLanguage() {
    return currentLanguage;
  }

  // Initialisierung
  function init() {
    // Übersetzungen anwenden wenn nicht Deutsch
    if (currentLanguage !== 'de') {
      updateTranslations();
    }
    
    document.documentElement.setAttribute('lang', currentLanguage);
  }

  // API exportieren
  window.i18n = {
    t: t,
    setLanguage: setLanguage,
    getCurrentLanguage: getCurrentLanguage,
    updateTranslations: updateTranslations
  };

  // Init nach DOM-Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

