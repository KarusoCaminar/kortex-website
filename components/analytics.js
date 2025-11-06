/**
 * Google Analytics 4 (GA4) Integration
 * 
 * This script loads Google Analytics only after user consent.
 * It tracks page views, events, and user interactions.
 * 
 * Setup:
 * 1. Replace 'G-XXXXXXXXXX' with your GA4 Measurement ID
 * 2. The script will automatically load when analytics cookies are accepted
 */

(function() {
  'use strict';

  // ⚠️ WICHTIG: Ersetzen Sie dies mit Ihrer GA4 Measurement ID
  // Finden Sie diese in: Google Analytics > Admin > Data Streams > Web Stream
  const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Ihre GA4 Measurement ID hier eintragen

  let ga4Loaded = false;

  /**
   * Initialize Google Analytics 4
   */
  function initGoogleAnalytics() {
    if (ga4Loaded) {
      console.log('Google Analytics already loaded');
      return;
    }

    if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('⚠️ Google Analytics: Bitte GA4 Measurement ID in components/analytics.js eintragen!');
      return;
    }

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
      // Privacy-friendly settings
      anonymize_ip: true,
      allow_google_signals: false, // Disable Google Signals for better privacy
      allow_ad_personalization_signals: false
    });

    ga4Loaded = true;
    console.log('✅ Google Analytics 4 initialized:', GA4_MEASUREMENT_ID);

    // Track initial page view
    trackPageView();
  }

  /**
   * Track page view
   */
  function trackPageView() {
    if (window.gtag && GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      const path = window.location.pathname + window.location.search;
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title
      });
    }
  }

  /**
   * Track custom event
   * Usage: window.trackEvent('button_click', { button_name: 'contact_form' });
   */
  window.trackEvent = function(eventName, eventParams = {}) {
    if (window.gtag && GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      window.gtag('event', eventName, eventParams);
      console.log('📊 Event tracked:', eventName, eventParams);
    }
  };

  /**
   * Track form submission
   */
  window.trackFormSubmission = function(formName, formData = {}) {
    trackEvent('form_submit', {
      form_name: formName,
      ...formData
    });
  };

  /**
   * Track button click
   */
  window.trackButtonClick = function(buttonName, buttonLocation = '') {
    trackEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation
    });
  };

  /**
   * Track download
   */
  window.trackDownload = function(fileName, fileType = '') {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType
    });
  };

  /**
   * Track video play
   */
  window.trackVideoPlay = function(videoTitle, videoId = '') {
    trackEvent('video_play', {
      video_title: videoTitle,
      video_id: videoId
    });
  };

  // Listen for cookie consent
  window.addEventListener('cookieConsent', (e) => {
    if (e.detail && e.detail.categories && e.detail.categories.analytics) {
      initGoogleAnalytics();
    }
  });

  // Check if consent already given
  if (window.CookieBanner && window.CookieBanner.hasConsent('analytics')) {
    initGoogleAnalytics();
  }

  // Track page views on navigation (for SPAs)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      trackPageView();
    }
  }, 1000);
})();

