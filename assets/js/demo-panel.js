/**
 * KORTEX SYSTEM - DEMO VIDEO CONTROLLER
 * 
 * Features:
 * - YouTube IFrame API integration with start/end timestamps
 * - Lazy loading (iframe only created on click)
 * - Auto-stop at specified end time
 * - Multi-video support with data attributes
 * 
 * Usage:
 * <div class="video-wrapper" 
 *      data-video-id="PhVTDydFGo0" 
 *      data-start="0" 
 *      data-end="40">
 */

class DemoVideoController {
  constructor() {
    this.videoWrappers = document.querySelectorAll('.video-wrapper');
    this.players = new Map();
    this.stopTimeouts = new Map();
    
    if (this.videoWrappers.length === 0) return;
    
    this.init();
  }

  init() {
    // Setup event listeners
    this.setupEventListeners();
    
    // Check cookie consent before loading videos
    this.checkConsentAndLoad();
  }
  
  checkConsentAndLoad() {
    // Check if cookie consent is given (YouTube videos need consent due to tracking)
    const hasConsent = window.CookieBanner && window.CookieBanner.hasConsent('marketing');
    
    // If no consent system exists or consent is given, load videos
    if (!window.CookieBanner || hasConsent) {
      this.loadYouTubeAPI();
      setTimeout(() => this.loadAutoplayVideos(), 1000);
    } else {
      // Wait for consent event
      window.addEventListener('cookieConsent', (e) => {
        if (e.detail && e.detail.categories && e.detail.categories.marketing) {
          this.loadYouTubeAPI();
          setTimeout(() => this.loadAutoplayVideos(), 500);
        }
      });
      
      // Show placeholder message if videos can't be loaded
      this.showConsentPlaceholder();
    }
  }
  
  showConsentPlaceholder() {
    this.videoWrappers.forEach((wrapper) => {
      if (wrapper.dataset.autoplay === 'true') {
        const placeholder = document.createElement('div');
        placeholder.className = 'video-consent-placeholder';
        placeholder.style.cssText = 'padding: 2rem; text-align: center; background: #f8f9fa; border-radius: 8px; color: rgba(30, 41, 59, 0.7);';
        placeholder.innerHTML = `
          <p style="margin: 0; font-size: 0.9rem;">
            ${window.i18n?.getCurrentLanguage() === 'en' 
              ? 'Please accept cookies to view this video.' 
              : 'Bitte akzeptieren Sie Cookies, um dieses Video anzuzeigen.'}
          </p>
        `;
        wrapper.appendChild(placeholder);
      }
    });
  }
  
  loadAutoplayVideos() {
    // Remove consent placeholders
    this.videoWrappers.forEach((wrapper) => {
      const placeholder = wrapper.querySelector('.video-consent-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
    });
    
    // Load autoplay videos
    this.videoWrappers.forEach((wrapper) => {
      if (wrapper.dataset.autoplay === 'true') {
        this.createAutoplayVideo(wrapper);
      }
    });
  }

  loadYouTubeAPI() {
    // Check if API already loaded
    if (window.YT && window.YT.Player) {
      console.log('YouTube IFrame API already loaded');
      return;
    }

    // Load API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // API ready callback
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API ready');
    };
  }

  setupEventListeners() {
    // Video click to play
    this.videoWrappers.forEach((wrapper) => {
      wrapper.addEventListener('click', (e) => this.handleVideoClick(e, wrapper));
      
      // Keyboard support (Enter/Space)
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleVideoClick(e, wrapper);
        }
      });
    });
  }

  createAutoplayVideo(wrapper) {
    const videoId = wrapper.dataset.videoId;
    const startTime = parseInt(wrapper.dataset.start) || 0;
    const endTime = parseInt(wrapper.dataset.end) || 0;
    const loop = wrapper.dataset.loop === 'true';
    const muted = wrapper.dataset.muted === 'true';
    const quality = wrapper.dataset.quality || 'hd1080';

    if (!videoId) return;

    // Wait for API
    if (!window.YT || !window.YT.Player) {
      console.log('Waiting for YouTube API...');
      setTimeout(() => this.createAutoplayVideo(wrapper), 500);
      return;
    }

    // Create iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.id = `player-${videoId}-${Date.now()}`;
    wrapper.appendChild(iframeContainer);

    // Create autoplay player with loop and quality
    const player = new YT.Player(iframeContainer.id, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        mute: muted ? 1 : 0,
        start: startTime,
        loop: loop ? 1 : 0,
        playlist: loop ? videoId : undefined, // Required for loop
        controls: 1,
        modestbranding: 1,
        rel: 0,
        fs: 1,
        playsinline: 1,
        cc_load_policy: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event) => {
          // Set quality to 1080p if available
          if (quality && event.target.setPlaybackQuality) {
            event.target.setPlaybackQuality(quality);
          }
          event.target.playVideo();
        },
        onStateChange: (event) => {
          // Loop handling with end time
          if (endTime > 0 && event.data === YT.PlayerState.PLAYING) {
            const currentTime = Math.floor(event.target.getCurrentTime());
            const remainingMs = (endTime - currentTime) * 1000;
            
            if (remainingMs > 0) {
              const existingTimeout = this.stopTimeouts.get(videoId);
              if (existingTimeout) clearTimeout(existingTimeout);
              
              const stopTimeout = setTimeout(() => {
                if (loop) {
                  // Restart from beginning for loop
                  event.target.seekTo(startTime, true);
                  event.target.playVideo();
                } else {
                  event.target.stopVideo();
                }
              }, remainingMs);
              
              this.stopTimeouts.set(videoId, stopTimeout);
            }
          }
        },
      },
    });

    this.players.set(videoId, player);
  }

  handleVideoClick(e, wrapper) {
    e.preventDefault();

    // Check consent before loading video
    const hasConsent = !window.CookieBanner || window.CookieBanner.hasConsent('marketing');
    if (!hasConsent) {
      alert(window.i18n?.getCurrentLanguage() === 'en' 
        ? 'Please accept marketing cookies to view this video.' 
        : 'Bitte akzeptieren Sie Marketing-Cookies, um dieses Video anzuzeigen.');
      return;
    }

    // If already has iframe, return
    if (wrapper.querySelector('iframe')) return;

    const videoId = wrapper.dataset.videoId;
    const startTime = parseInt(wrapper.dataset.start) || 0;
    const endTime = parseInt(wrapper.dataset.end) || 0;

    if (!videoId) {
      console.error('No video ID found on video wrapper');
      return;
    }

    // Hide thumbnail and play button
    const thumbnail = wrapper.querySelector('.video-thumbnail');
    const playButton = wrapper.querySelector('.video-play-button');
    if (thumbnail) thumbnail.style.display = 'none';
    if (playButton) playButton.style.display = 'none';

    // Add loading state
    wrapper.classList.add('loading');

    // Wait for API
    if (!window.YT || !window.YT.Player) {
      console.error('YouTube API not loaded yet');
      wrapper.classList.remove('loading');
      return;
    }

    // Create iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.id = `player-${videoId}-${Date.now()}`;
    wrapper.appendChild(iframeContainer);

    // Create player
    const player = new YT.Player(iframeContainer.id, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        start: startTime,
        modestbranding: 1,
        rel: 0,
        fs: 1,
      },
      events: {
        onReady: (event) => {
          wrapper.classList.remove('loading');
          event.target.playVideo();
        },
        onStateChange: (event) => {
          // Stop at end time if specified - improved with timeout
          if (endTime > 0 && event.data === YT.PlayerState.PLAYING) {
            const currentTime = Math.floor(event.target.getCurrentTime());
            const remainingMs = (endTime - currentTime) * 1000;
            
            if (remainingMs > 0) {
              // Clear any existing timeout
              const existingTimeout = this.stopTimeouts.get(videoId);
              if (existingTimeout) clearTimeout(existingTimeout);
              
              // Set new timeout to stop at exact end time
              const stopTimeout = setTimeout(() => {
                if (event.target.stopVideo) {
                  event.target.stopVideo();
                }
              }, remainingMs);
              
              this.stopTimeouts.set(videoId, stopTimeout);
            }
          }
          
          // Clean up timeout when video stops
          if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            const timeout = this.stopTimeouts.get(videoId);
            if (timeout) {
              clearTimeout(timeout);
              this.stopTimeouts.delete(videoId);
            }
          }
        },
      },
    });

    this.players.set(videoId, player);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.demoVideoController = new DemoVideoController();
  });
} else {
  window.demoVideoController = new DemoVideoController();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DemoVideoController;
}
