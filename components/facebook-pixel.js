/**
 * Facebook Pixel Integration (Optional)
 * 
 * This script loads Facebook Pixel only after user consent for marketing cookies.
 * 
 * Setup:
 * 1. Replace 'YOUR_PIXEL_ID' with your Facebook Pixel ID
 * 2. Find your Pixel ID in: Facebook Events Manager > Data Sources > Pixels
 * 
 * When to use Facebook Pixel:
 * - You want to run Facebook/Instagram ads
 * - You want to track conversions from ads
 * - You want to create custom audiences for retargeting
 * - You want to track events (form submissions, button clicks, etc.)
 * 
 * For B2B services (like process automation), Facebook Pixel is useful for:
 * - Retargeting website visitors with ads
 * - Tracking ad performance and ROI
 * - Building lookalike audiences based on your customers
 * - Tracking specific events (e.g., form submissions, demo requests)
 */

(function() {
  'use strict';

  // ⚠️ WICHTIG: Ersetzen Sie dies mit Ihrer Facebook Pixel ID
  // Finden Sie diese in: Facebook Events Manager > Data Sources > Pixels
  const FACEBOOK_PIXEL_ID = 'YOUR_PIXEL_ID'; // TODO: Ihre Facebook Pixel ID hier eintragen

  let pixelLoaded = false;

  /**
   * Initialize Facebook Pixel
   */
  function initFacebookPixel() {
    if (pixelLoaded) {
      console.log('Facebook Pixel already loaded');
      return;
    }

    if (!FACEBOOK_PIXEL_ID || FACEBOOK_PIXEL_ID === 'YOUR_PIXEL_ID') {
      console.warn('⚠️ Facebook Pixel: Bitte Pixel ID in components/facebook-pixel.js eintragen!');
      return;
    }

    // Facebook Pixel Code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', FACEBOOK_PIXEL_ID);
    window.fbq('track', 'PageView');

    pixelLoaded = true;
    console.log('✅ Facebook Pixel initialized:', FACEBOOK_PIXEL_ID);
  }

  /**
   * Track custom event
   * Usage: window.trackFacebookEvent('Contact', { content_name: 'Contact Form' });
   */
  window.trackFacebookEvent = function(eventName, eventParams = {}) {
    if (window.fbq && FACEBOOK_PIXEL_ID !== 'YOUR_PIXEL_ID') {
      window.fbq('track', eventName, eventParams);
      console.log('📊 Facebook Event tracked:', eventName, eventParams);
    }
  };

  /**
   * Track form submission
   */
  window.trackFacebookFormSubmission = function(formName, formData = {}) {
    trackFacebookEvent('Lead', {
      content_name: formName,
      ...formData
    });
  };

  /**
   * Track button click
   */
  window.trackFacebookButtonClick = function(buttonName, buttonLocation = '') {
    trackFacebookEvent('ButtonClick', {
      content_name: buttonName,
      content_category: buttonLocation
    });
  };

  // Listen for cookie consent
  window.addEventListener('cookieConsent', (e) => {
    if (e.detail && e.detail.categories && e.detail.categories.marketing) {
      initFacebookPixel();
    }
  });

  // Check if consent already given
  if (window.CookieBanner && window.CookieBanner.hasConsent('marketing')) {
    initFacebookPixel();
  }
})();

