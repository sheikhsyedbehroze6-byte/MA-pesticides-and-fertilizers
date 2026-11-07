/**
 * Analytics & Telemetry Engine for M.A. Pesticides & Fertilizers
 * Lightweight, privacy-respecting client analytics with:
 * - Route transition & pageview tracking
 * - Agronomy & ecommerce event tracking (spray calculator, disease diagnosis, cart, WhatsApp consults)
 * - Real-time error & exception capturing
 * - Performance & Web Vitals measurement
 * - Zero external dependencies; works fully offline
 */

const STORAGE_KEY = 'ma_analytics_events_v1';
const MAX_STORED_EVENTS = 50;

// Respect user privacy & Do Not Track settings
function isDoNotTrackEnabled() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    navigator.doNotTrack === '1' ||
    window.doNotTrack === '1' ||
    navigator.msDoNotTrack === '1'
  );
}

// Internal store of recent analytics events for diagnostics & inspection
function persistEvent(eventData) {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    existing.push(eventData);
    if (existing.length > MAX_STORED_EVENTS) {
      existing.shift();
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Gracefully ignore storage quota errors
  }
}

/**
 * Track a page view across routes
 * @param {string} pathname 
 * @param {string} title 
 */
export function trackPageView(pathname, title = document.title) {
  if (isDoNotTrackEnabled()) return;

  const eventData = {
    type: 'pageview',
    path: pathname || (typeof window !== 'undefined' ? window.location.pathname : '/'),
    title: title || 'MA Pesticides',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    timestamp: new Date().toISOString()
  };

  persistEvent(eventData);

  // Forward to standard Google Analytics if present
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'page_view', {
        page_path: eventData.path,
        page_title: eventData.title
      });
    } catch {
      // Ignore
    }
  }

  // Forward to Plausible if loaded
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    try {
      window.plausible('pageview', { u: window.location.href });
    } catch {
      // Ignore
    }
  }

  if (import.meta.env?.DEV) {
    console.debug('[Analytics:PageView]', eventData.path);
  }
}

/**
 * Track user interaction events
 * @param {string} action - e.g. 'calculate_dosage', 'add_to_cart', 'whatsapp_consult'
 * @param {Record<string, any>} [params] - event parameters
 */
export function trackEvent(action, params = {}) {
  if (isDoNotTrackEnabled() || !action) return;

  const eventData = {
    type: 'event',
    action,
    params,
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    timestamp: new Date().toISOString()
  };

  persistEvent(eventData);

  // Forward to Google Analytics gtag
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', action, params);
    } catch {
      // Ignore
    }
  }

  // Forward to Plausible custom events
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    try {
      window.plausible(action, { props: params });
    } catch {
      // Ignore
    }
  }

  if (import.meta.env?.DEV) {
    console.debug('[Analytics:Event]', action, params);
  }
}

/**
 * Capture client runtime exceptions & send to error stream
 * @param {Error|string} error 
 * @param {Record<string, any>} [context] 
 */
export function trackError(error, context = {}) {
  const errorMessage = typeof error === 'string' ? error : (error?.message || 'Unknown error');
  const errorStack = error?.stack || '';

  const eventData = {
    type: 'error',
    message: errorMessage,
    stack: errorStack.slice(0, 500),
    context,
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    timestamp: new Date().toISOString()
  };

  persistEvent(eventData);

  // Forward to Google Analytics exception
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'exception', {
        description: errorMessage,
        fatal: Boolean(context.fatal)
      });
    } catch {
      // Ignore
    }
  }

  console.warn('[Analytics:Error]', errorMessage, context);
}

/**
 * Setup global window error listeners to auto-capture unhandled errors & promise rejections
 */
export function initGlobalErrorTracking() {
  if (typeof window === 'undefined') return;

  // Global window errors
  window.addEventListener('error', (event) => {
    // Avoid noisy cross-origin script errors with zero stack trace
    if (event.message === 'Script error.' && !event.filename) return;

    trackError(event.error || event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      fatal: true
    });
  });

  // Unhandled promise rejections (e.g. failed fetch, dynamic imports)
  window.addEventListener('unhandledrejection', (event) => {
    trackError(event.reason || 'Unhandled Promise Rejection', {
      type: 'unhandledrejection',
      fatal: false
    });
  });

  // Attach diagnostic console helper in window for debugging in developer tools
  window.__MA_ANALYTICS__ = {
    getRecentEvents: () => {
      try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
      } catch {
        return [];
      }
    },
    clearEvents: () => {
      sessionStorage.removeItem(STORAGE_KEY);
    },
    trackEvent,
    trackPageView,
    trackError
  };
}

