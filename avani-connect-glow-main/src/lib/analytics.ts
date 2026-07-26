/**
 * First-party, cookie-less pageview tracking for the public site.
 *
 * Design rules this file is built around:
 *
 * 1. **Analytics can never break the site.** Every exported function swallows
 *    its own errors. Nothing here throws, nothing here rejects, and a dead or
 *    unreachable backend is completely invisible to the visitor.
 * 2. **SSR safe.** This module is bundled into a site that can be rendered
 *    without a DOM, so every `window` / `document` / `localStorage` /
 *    `sessionStorage` access is guarded by a `typeof` check. Storage access is
 *    additionally wrapped in try/catch because Safari private mode and some
 *    embedded browsers throw on read as well as on write.
 * 3. **Staff are never counted.** If an auth token is present in localStorage
 *    the visitor is admin staff and nothing is sent at all.
 * 4. **Nothing is invented.** Fields we cannot observe are sent as empty
 *    strings. The backend classifies the traffic source from the referrer; we
 *    never guess it here.
 */

import { getBackendUrl } from './api';

/* ------------------------------------------------------------------ */
/* storage keys                                                        */
/* ------------------------------------------------------------------ */

const VISITOR_KEY = 'av_vid';       // localStorage — survives sessions
const SESSION_KEY = 'av_sid';       // sessionStorage — one browser tab session
const LANDING_KEY = 'av_landing';   // sessionStorage — first path of the session
const UTM_KEY = 'av_utm';           // sessionStorage — FIRST-TOUCH campaign data
const OPTOUT_KEY = 'av_excluded';   // localStorage — this device asked to be excluded

/** Auth token keys the admin app is known to use. Any non-empty one = staff. */
const TOKEN_KEYS = ['token', 'authToken', 'adminToken', 'accessToken', 'jwt'];

const TRACK_TIMEOUT_MS = 8000;

/**
 * Per-field caps, mirroring `LIMITS` in `routes/analytics.js`.
 *
 * These are not cosmetic. The backend truncates anything longer, so a client
 * cap that is *shorter* silently mangles real data (a truncated gclid is a
 * useless gclid) and a cap that is *longer* means the id we send is not the id
 * that gets stored — the same browser would then be counted as two visitors.
 * Every string leaving this module passes through one of these.
 */
const MAX = {
  id: 64,        // visitorId / sessionId
  path: 512,
  title: 300,
  referrer: 1024,
  utm: 150,
  clickId: 255,
};

/** Cap a value to `max` characters, coercing anything non-string to ''. */
function cap(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.length > max ? value.slice(0, max) : value;
}

export interface Attribution {
  landingPage: string;
  /**
   * Left empty on purpose. `services/analyticsClassify.js` derives the real
   * source from the referrer server-side; guessing it in the browser would
   * mean shipping a number/label nobody measured.
   */
  source: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  fbclid: string;
}

/* ------------------------------------------------------------------ */
/* environment guards                                                  */
/* ------------------------------------------------------------------ */

const isBrowser = (): boolean =>
  typeof window !== 'undefined' && typeof document !== 'undefined';

function readLocal(key: string): string {
  if (typeof window === 'undefined') return '';
  try {
    if (typeof window.localStorage === 'undefined' || !window.localStorage) return '';
    return window.localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function writeLocal(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.localStorage === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, value);
  } catch {
    /* storage full, disabled, or private mode — tracking is optional */
  }
}

function readSession(key: string): string {
  if (typeof window === 'undefined') return '';
  try {
    if (typeof window.sessionStorage === 'undefined' || !window.sessionStorage) return '';
    return window.sessionStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function writeSession(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.sessionStorage === 'undefined' || !window.sessionStorage) return;
    window.sessionStorage.setItem(key, value);
  } catch {
    /* ignored on purpose */
  }
}

/** Random opaque id. Not a fingerprint — it identifies a browser, not a person. */
function randomId(): string {
  try {
    const c: any = typeof globalThis !== 'undefined' ? (globalThis as any).crypto : undefined;
    if (c && typeof c.randomUUID === 'function') return String(c.randomUUID()).replace(/-/g, '');
    if (c && typeof c.getRandomValues === 'function') {
      const buf = new Uint8Array(16);
      c.getRandomValues(buf);
      return Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    /* fall through to Math.random */
  }
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 12) +
    Math.random().toString(36).slice(2, 12)
  );
}

/* ------------------------------------------------------------------ */
/* identity                                                            */
/* ------------------------------------------------------------------ */

/**
 * Web storage is shared with every other script on the origin and is trivially
 * editable from the console, so a stored id is untrusted input like any other.
 * A value that is not a short opaque token is discarded and reissued rather
 * than sent: an over-long id would be truncated server-side (splitting one
 * browser across two visitor records) and a punctuation-bearing one has no
 * business being echoed back into the admin UI.
 */
const ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

function validId(value: string): string {
  return ID_PATTERN.test(value) ? value : '';
}

/** Stable per-browser id in localStorage. Returns '' when storage is unusable. */
export function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let id = validId(readLocal(VISITOR_KEY));
    if (!id) {
      id = randomId();
      writeLocal(VISITOR_KEY, id);
      // If storage silently refused the write, the caller still gets a usable
      // id for this pageview; it just will not persist.
    }
    return cap(id, MAX.id);
  } catch {
    return '';
  }
}

/** Per-tab-session id in sessionStorage. */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let id = validId(readSession(SESSION_KEY));
    if (!id) {
      id = randomId();
      writeSession(SESSION_KEY, id);
    }
    return cap(id, MAX.id);
  } catch {
    return '';
  }
}

/** First path seen in this session. Recorded once, then never changed. */
export function getLandingPage(): string {
  if (!isBrowser()) return '';
  try {
    const stored = cap(readSession(LANDING_KEY), MAX.path);
    if (stored) return stored;
    const path = cap(window.location.pathname || '/', MAX.path) || '/';
    writeSession(LANDING_KEY, path);
    return path;
  } catch {
    return '';
  }
}

/**
 * True when an admin/staff auth token is present. Staff activity must never
 * appear in visitor statistics.
 */
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    for (const key of TOKEN_KEYS) {
      const value = readLocal(key).trim();
      if (value && value !== 'null' && value !== 'undefined') return true;
    }
    return false;
  } catch {
    return false;
  }
}

/** True when this device has opted out via excludeVisitor(). */
function isExcluded(): boolean {
  return readLocal(OPTOUT_KEY) === '1';
}

/* ------------------------------------------------------------------ */
/* campaign attribution                                                */
/* ------------------------------------------------------------------ */

const EMPTY_ATTRIBUTION = (): Attribution => ({
  landingPage: '',
  source: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
  gclid: '',
  fbclid: '',
});

/**
 * FIRST-TOUCH capture. The campaign that started the session is the one that
 * gets the credit, so the slot is written exactly once per session and never
 * overwritten — an internal link that happens to carry utm params later, or a
 * mid-session bounce through an ad, cannot rewrite history.
 *
 * The slot is closed on the first call even when the entry URL carried no
 * campaign params at all. A session that began with no campaign genuinely has
 * none, and leaving the slot open would let a later internal URL back-date
 * itself into the session's origin — crediting a campaign for a visit it did
 * not start.
 */
export function captureUtm(): void {
  if (!isBrowser()) return;
  try {
    if (readSession(UTM_KEY)) return; // already have a first touch — leave it alone

    const params = new URLSearchParams(window.location.search || '');
    const get = (k: string, max: number) => cap((params.get(k) || '').trim(), max);

    const data = {
      utmSource: get('utm_source', MAX.utm),
      utmMedium: get('utm_medium', MAX.utm),
      utmCampaign: get('utm_campaign', MAX.utm),
      utmContent: get('utm_content', MAX.utm),
      utmTerm: get('utm_term', MAX.utm),
      gclid: get('gclid', MAX.clickId),
      fbclid: get('fbclid', MAX.clickId),
    };

    // Written unconditionally: an all-empty blob is the honest record that this
    // session started without a campaign, and it closes the first-touch slot.
    writeSession(UTM_KEY, JSON.stringify(data));
  } catch {
    /* never throws */
  }
}

/** Landing page + stored first-touch campaign data. Always a full object. */
export function getAttribution(): Attribution {
  const attribution = EMPTY_ATTRIBUTION();
  if (!isBrowser()) return attribution;
  try {
    attribution.landingPage = getLandingPage();
    const raw = readSession(UTM_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        // Re-capped on read: the blob is sessionStorage, which anything running
        // on this origin can rewrite, so it is treated as untrusted input even
        // though we are the ones who wrote it.
        const limits: Record<string, number> = {
          utmSource: MAX.utm,
          utmMedium: MAX.utm,
          utmCampaign: MAX.utm,
          utmContent: MAX.utm,
          utmTerm: MAX.utm,
          gclid: MAX.clickId,
          fbclid: MAX.clickId,
        };
        for (const key of Object.keys(limits)) {
          const value = (parsed as any)[key];
          if (typeof value === 'string') (attribution as any)[key] = cap(value, limits[key]);
        }
        // landingPage and source are never taken from the blob: landingPage is
        // authoritative from sessionStorage, and source is classified
        // server-side from the referrer.
      }
    }
  } catch {
    return attribution;
  }
  return attribution;
}

/* ------------------------------------------------------------------ */
/* transport                                                           */
/* ------------------------------------------------------------------ */

/** POST JSON. Never throws, never rejects. Resolves to the parsed body or null. */
async function post(path: string, payload: unknown): Promise<any | null> {
  if (typeof fetch !== 'function') return null;

  let controller: AbortController | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    if (typeof AbortController === 'function') {
      controller = new AbortController();
      timer = setTimeout(() => {
        try {
          controller?.abort();
        } catch {
          /* ignored */
        }
      }, TRACK_TIMEOUT_MS);
    }

    const response = await fetch(`${getBackendUrl()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'omit',
      signal: controller ? controller.signal : undefined,
    }).catch(() => null);

    // Stop the timer the moment headers land. Left running, an 8s timeout could
    // fire while the body is still being read and abort a response we already
    // have — turning a successful /track into a lost event id.
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (!response || !response.ok) return null;
    return await response.json().catch(() => null);
  } catch {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------ */
/* public API                                                          */
/* ------------------------------------------------------------------ */

/**
 * Record one pageview.
 *
 * Resolves to the created event id, or `null` when nothing was sent (SSR,
 * staff, opted out, or the backend is unreachable). The id is what
 * `AnalyticsTracker` later attaches the duration and scroll depth to.
 *
 * Fire-and-forget: callers must not await this on the render path.
 */
export async function trackPageview(path?: string, title?: string): Promise<string | null> {
  try {
    if (!isBrowser()) return null;
    if (isLoggedIn()) return null;   // staff are never counted
    if (isExcluded()) return null;   // this device opted out

    captureUtm();

    const attribution = getAttribution();
    // Path only — never `location.href`. Query strings on this site can carry
    // form state, and a search string is not something an analytics record
    // needs in order to count a pageview.
    const currentPath = cap(path || window.location.pathname || '/', MAX.path) || '/';
    const pageTitle = cap(
      title || (typeof document !== 'undefined' ? document.title : '') || '',
      MAX.title
    );
    const referrer = cap(
      typeof document !== 'undefined' ? document.referrer || '' : '',
      MAX.referrer
    );

    const body = await post('/api/analytics/track', {
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      path: currentPath,
      title: pageTitle,
      referrer,
      landingPage: attribution.landingPage,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      utmTerm: attribution.utmTerm,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
    });

    const id = body && typeof body.id === 'string' ? body.id : '';
    return id || null;
  } catch {
    return null;
  }
}

/**
 * Update a previously recorded pageview with how long the visitor stayed and
 * how far they scrolled.
 *
 * Uses `navigator.sendBeacon` when available so the request survives the page
 * being unloaded; falls back to `fetch` with `keepalive`. The body is sent as
 * `text/plain` because that is the only content type sendBeacon can send
 * without triggering a CORS preflight the unloading page would never complete
 * — the backend parses `text/plain` bodies for exactly this reason.
 *
 * Returns true if the payload was handed to the browser, false otherwise.
 * Never throws.
 */
export function sendDuration(id: string, durationMs: number, maxScroll: number): boolean {
  try {
    if (!isBrowser()) return false;
    if (!id) return false;
    // A visitor who opted out mid-page must stop generating traffic straight
    // away, not at the next pageview.
    if (isLoggedIn() || isExcluded()) return false;

    const safeDuration = Number.isFinite(durationMs) ? Math.max(0, Math.round(durationMs)) : 0;
    const safeScroll = Number.isFinite(maxScroll)
      ? Math.min(100, Math.max(0, Math.round(maxScroll)))
      : 0;

    const url = `${getBackendUrl()}/api/analytics/duration`;
    const payload = JSON.stringify({
      id: cap(id, MAX.id),
      durationMs: safeDuration,
      maxScroll: safeScroll,
    });

    const nav: any = typeof navigator !== 'undefined' ? navigator : null;
    if (nav && typeof nav.sendBeacon === 'function') {
      try {
        const blob =
          typeof Blob === 'function' ? new Blob([payload], { type: 'text/plain' }) : payload;
        if (nav.sendBeacon(url, blob)) return true;
        // sendBeacon returns false when the queue is full — fall through to fetch.
      } catch {
        /* fall through to fetch */
      }
    }

    if (typeof fetch === 'function') {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: payload,
        keepalive: true,
        credentials: 'omit',
      }).catch(() => {});
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Opt this device out of analytics. Remembers the choice locally so nothing
 * further is sent even if the backend call fails, then asks the backend to
 * flag every visit already recorded for this visitor.
 */
export async function excludeVisitor(): Promise<void> {
  try {
    if (!isBrowser()) return;
    const visitorId = getVisitorId();
    writeLocal(OPTOUT_KEY, '1');
    if (!visitorId) return;
    await post('/api/analytics/exclude', { visitorId });
  } catch {
    /* never throws */
  }
}
