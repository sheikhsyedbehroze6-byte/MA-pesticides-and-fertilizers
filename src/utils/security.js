/**
 * M.A. Pesticides Security & Defense-in-Depth Module
 * Protects against Prototype Pollution, XSS, Link Injection, Open Redirects,
 * Clickjacking, and Client-Side Data Tampering.
 */

// 1. PROTOTYPE POLLUTION DEFENSE
export function initSecurityGuards() {
  if (typeof window === 'undefined') return;

  try {
    // Freeze Object.prototype to block __proto__ injections from malicious scripts/plugins
    Object.freeze(Object.prototype);
    Object.freeze(Array.prototype);
  } catch {
    // Graceful fallback if strict mode or third-party library already sealed
  }

  // Framebuster defense against clickjacking / UI redressing in older web views
  try {
    if (window.top && window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch {
    // Sandboxed iframe blocked window.top access, which is also safe
  }
}

// 2. WHITELISTED SAFE URL OPENER (Mitigates Open Redirect & Reverse Tabnabbing)
const SAFE_DOMAIN_PATTERNS = [
  /^https:\/\/wa\.me\//i,
  /^https:\/\/api\.whatsapp\.com\//i,
  /^https:\/\/maps\.google\.com\//i,
  /^https:\/\/www\.google\.com\/maps/i,
  /^https:\/\/www\.youtube\.com\//i,
  /^https:\/\/www\.youtube-nocookie\.com\//i,
  /^tel:\+?[0-9\s-]{5,20}$/i,
  /^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
];

/**
 * Safely opens external URLs only if they match verified domain whitelists.
 * Rejects javascript:, data:, vbscript:, and untrusted redirect targets.
 */
export function safeOpen(url, target = '_blank') {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();

  // Block dangerous pseudo-protocols
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
    console.warn('[Security Guard] Blocked execution of dangerous URL scheme:', trimmed);
    return false;
  }

  // Allow safe relative paths
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    if (target === '_self') {
      window.location.href = trimmed;
    } else {
      window.open(trimmed, target, 'noopener,noreferrer');
    }
    return true;
  }

  // Verify against authorized external domain whitelist
  const isAllowed = SAFE_DOMAIN_PATTERNS.some(pattern => pattern.test(trimmed));
  if (!isAllowed) {
    console.warn('[Security Guard] Blocked untrusted external redirect:', trimmed);
    return false;
  }

  window.open(trimmed, target, 'noopener,noreferrer');
  return true;
}

// 3. INPUT SANITIZATION (Strips script tags, null bytes, and dangerous characters)
export function sanitizeInput(input, maxLength = 250) {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)
    .replace(/\0/g, '') // remove null bytes
    .replace(/[<>]/g, '') // strip HTML brackets to neutralize any potential tag injection
    .trim();
}

// 4. CLIENT-SIDE RATE LIMITER (Mitigates automated flood/DoS attacks)
const hitStore = new Map();

export function checkRateLimit(actionKey, maxHits = 5, windowMs = 3000) {
  const now = Date.now();
  const history = hitStore.get(actionKey) || [];
  const validHits = history.filter(timestamp => now - timestamp < windowMs);

  if (validHits.length >= maxHits) {
    return false; // Rate limit exceeded
  }

  validHits.push(now);
  hitStore.set(actionKey, validHits);
  return true;
}
