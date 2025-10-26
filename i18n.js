// i18n.js - Internationalisierungssystem für Kortex System
// Verwaltet Sprachumschaltung zwischen Deutsch und Englisch

(function() {
  'use strict';

  // Standard-Sprache
  const DEFAULT_LANG = 'de';
  const STORAGE_KEY = 'kortex_language';

  // Aktuelle Sprache aus LocalStorage oder Browser-Einstellung
  function getInitialLanguage() {
    // Prüfe LocalStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'de' || stored === 'en')) {
      return stored;
    }
    
    // Fallback auf Browser-Sprache
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('de')) {
      return 'de';
    }
    
    return DEFAULT_LANG;
  }

  let currentLanguage = getInitialLanguage();

  // Funktion zum Abrufen der Übersetzung
  function t(key, lang = currentLanguage) {
    if (!window.translations || !window.translations[lang]) {
      console.warn(`Translations not loaded for language: ${lang}`);
      return key;
    }
    
    const translation = window.translations[lang][key];
    if (translation === undefined) {
      console.warn(`Translation not found for key: ${key} in language: ${lang}`);
      return key;
    }
    
    return translation;
  }

  // Funktion zum Setzen der Sprache
  function setLanguage(lang) {
    if (lang !== 'de' && lang !== 'en') {
      console.error(`Invalid language: ${lang}`);
      return;
    }
    
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    
    // HTML lang-Attribut aktualisieren
    document.documentElement.setAttribute('lang', lang);
    
    // Alle übersetzten Elemente aktualisieren
    updateTranslations();
    
    // Custom Event für andere Komponenten (z.B. Web Components)
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
  }

  // Funktion zum Aktualisieren aller Übersetzungen auf der Seite
  function updateTranslations() {
    // Alle Elemente mit data-i18n Attribut
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = t(key);
    });
    
    // Alle Elemente mit data-i18n-placeholder Attribut
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.setAttribute('placeholder', t(key));
    });
    
    // Alle Elemente mit data-i18n-title Attribut
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      element.setAttribute('title', t(key));
    });
    
    // Alle Elemente mit data-i18n-aria-label Attribut
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria-label');
      element.setAttribute('aria-label', t(key));
    });
    
    // Alle Elemente mit data-i18n-html (für HTML-Inhalte)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      element.innerHTML = t(key);
    });
  }

  // Funktion zum Abrufen der aktuellen Sprache
  function getCurrentLanguage() {
    return currentLanguage;
  }

  // Initialisierung nach dem Laden der Seite
  function init() {
    // Initiale Übersetzungen anwenden
    updateTranslations();
    
    // HTML lang-Attribut setzen
    document.documentElement.setAttribute('lang', currentLanguage);
  }

  // Bei DOM-Ready initialisieren
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // API exportieren
  window.i18n = {
    t: t,
    setLanguage: setLanguage,
    getCurrentLanguage: getCurrentLanguage,
    updateTranslations: updateTranslations
  };

})();

