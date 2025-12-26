// config.js - Zentrale Konfiguration für die Kortex System Website

// Bestimmt die Umgebung (development, production, etc.)
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Globale Konfigurationseinstellungen
window.appConfig = {
  // URLs für APIs und externe Dienste
  // Passen Sie diese an, wenn Sie Ihre eigenen Endpunkte haben
  n8nWebhookUrl: 'https://n8n2.kortex-system.de/webhook/016e0a41-9748-47c9-8ca9-debc40463598',
  newsApiUrl: '/n8n_news.json',

  // Google Analytics Konfiguration
  // Ersetzen Sie G-XXXXXXXXXX durch Ihre eigene Measurement ID
  gaMeasurementId: 'G-XXXXXXXXXX',

  // Facebook Pixel Konfiguration
  // Ersetzen Sie YOUR_PIXEL_ID durch Ihre eigene Pixel ID
  facebookPixelId: 'YOUR_PIXEL_ID',

  // Feature Flags
  // Aktivieren oder deaktivieren Sie hier einzelne Funktionen der Website
  features: {
    aiNewsPanel: true,      // Zeigt das KI-News-Panel an
    analytics: true,        // Aktiviert Google Analytics (wenn zugestimmt)
    facebookPixel: false,   // Aktiviert Facebook Pixel (wenn zugestimmt)
    contactForm: true       // Aktiviert das Kontaktformular
  },

  // Allgemeine Einstellungen
  settings: {
    // Wenn 'true', werden detaillierte Log-Nachrichten in der Konsole ausgegeben
    debugMode: isLocal
  }
};

// Log-Funktion, die nur im Debug-Modus Nachrichten ausgibt
function log(...args) {
  if (window.appConfig.settings.debugMode) {
    console.log('[Kortex System]', ...args);
  }
}

log('⚙️ Konfiguration geladen.', window.appConfig);
