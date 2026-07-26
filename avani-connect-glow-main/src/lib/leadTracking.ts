/**
 * leadTracking.ts — attribute form fills to the page and campaign that produced them.
 *
 * WHY
 * ---
 * The site had a Google Ads tag but no lead event, which means there was no way
 * to answer the only question that matters after this SEO work: which pages
 * actually produce enquiries. Without page-level attribution you cannot tell
 * whether the 175 location pages earn their keep, and you cannot feed real lead
 * quality back to Google or Meta for optimisation.
 *
 * WHAT IT DOES
 *   1. Captures UTM parameters, gclid and fbclid on the FIRST page of the visit
 *      and persists them for the session. Without this, a visitor who lands on a
 *      guide, browses to a service page and then converts is attributed to
 *      "direct" — the campaign parameters were only ever on the landing URL.
 *   2. Records the landing page and referrer, so organic entry pages get credit.
 *   3. Fires `generate_lead` to gtag and pushes an equivalent dataLayer event for
 *      GTM, with page path, page type and service attached.
 *
 * ⚠️ SETUP REQUIRED — see SEO-RECOVERY.md
 *   index.html currently loads only a Google Ads tag (AW-…). There is no GA4
 *   measurement ID (G-…), so `generate_lead` has nowhere to land in GA4 yet.
 *   Add the GA4 config line and these events start reporting immediately —
 *   this module needs no change.
 */

import { getAttribution as getAnalyticsAttribution, getVisitorId } from './analytics';

const STORAGE_KEY = 'avani_attrib_v1';

type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  first_seen?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function safeSession(): Storage | null {
  try {
    // Private browsing and some embedded webviews throw on access.
    const s = window.sessionStorage;
    s.getItem(STORAGE_KEY);
    return s;
  } catch {
    return null;
  }
}

/**
 * Capture campaign parameters once per session. Call on first mount.
 * Existing values are never overwritten — first touch wins, which is what you
 * want for judging which entry point earned the lead.
 */
export function captureAttribution(): void {
  const store = safeSession();
  if (!store || store.getItem(STORAGE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k) || undefined;

  const attribution: Attribution = {
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_term: get('utm_term'),
    utm_content: get('utm_content'),
    gclid: get('gclid'),
    fbclid: get('fbclid'),
    landing_page: window.location.pathname,
    referrer: document.referrer || undefined,
    first_seen: new Date().toISOString(),
  };

  try {
    store.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* storage full or blocked — tracking is best-effort, never blocking */
  }
}

/**
 * Attribution flattened into the field names the backend Form model stores, so
 * a lead payload can spread it directly.
 *
 * Deliberately delegates to lib/analytics rather than reading this module's own
 * store. Both modules capture first-touch campaign data, and two sources feeding
 * the same database columns is how attribution quietly splits: the analytics
 * version re-caps every field on read and treats sessionStorage as untrusted,
 * so it is the one that reaches the backend. This module's own store continues
 * to feed the GA4 `generate_lead` event, where the field names differ anyway.
 */
export function leadAttributionFields(): Record<string, string> {
  try {
    const a = getAnalyticsAttribution();
    return {
      landingPage: a.landingPage || '',
      utmSource: a.utmSource || '',
      utmMedium: a.utmMedium || '',
      utmCampaign: a.utmCampaign || '',
      utmTerm: a.utmTerm || '',
      utmContent: a.utmContent || '',
      gclid: a.gclid || '',
      fbclid: a.fbclid || '',
      visitorId: getVisitorId(),
    };
  } catch {
    // Attribution is a nice-to-have; a lead must submit regardless.
    return {};
  }
}

export function getAttribution(): Attribution {
  const store = safeSession();
  if (!store) return {};
  try {
    return JSON.parse(store.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

/**
 * Classify the converting page so reporting can be grouped without maintaining
 * a URL list. Mirrors the content model in serviceContent.js.
 */
export function pageType(pathname: string): string {
  const p = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!p) return 'home';
  if (p.startsWith('guides')) return 'guide';
  if (p.startsWith('business-os')) return 'product';
  if (p.startsWith('social-sync')) return 'product';
  if (p.endsWith('-alternative')) return 'comparison';
  if (/-(gurgaon|gurugram|delhi|noida|greater-noida|faridabad|ghaziabad|rohtak|haryana|india|mumbai|bangalore|pune|hyderabad|chennai|kolkata|ahmedabad|jaipur|uae|dubai|singapore|usa)$/.test(p)) {
    return 'service-location';
  }
  if (['about', 'services', 'contact', 'case-studies', 'projects', 'careers', 'blog'].includes(p)) return 'static';
  return 'service';
}

/**
 * Fire the lead event. Called after a successful form submission — never on
 * submit attempt, so the number in GA4 matches the number in the CRM.
 */
export function trackLead(details: {
  service?: string[] | string;
  formName?: string;
  value?: number;
}): void {
  if (typeof window === 'undefined') return;

  const attribution = getAttribution();
  const path = window.location.pathname;
  const services = Array.isArray(details.service)
    ? details.service.join(', ')
    : details.service || '';

  const payload = {
    // GA4 recommended-event fields
    currency: 'INR',
    value: details.value ?? 0,
    // Attribution — which page and which campaign produced this lead
    page_path: path,
    page_type: pageType(path),
    form_name: details.formName || 'main_lead_form',
    service_interest: services,
    ...attribution,
  };

  try {
    // GA4 / Google Ads
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', payload);
    }
    // GTM, for anyone routing through a container instead
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', ...payload });
  } catch {
    /* analytics must never break a form submission */
  }
}
