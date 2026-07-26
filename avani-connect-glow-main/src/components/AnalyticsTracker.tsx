/**
 * Invisible first-party analytics tracker. Renders nothing.
 *
 * Mount it once inside the Router. It records one pageview per route change
 * (skipping logged-in staff), measures time on page and maximum scroll depth,
 * and reports those back when the visitor leaves the page.
 *
 * The SPA problem this solves: in a single-page app the browser never unloads
 * between pages, so `pagehide` fires only once — when the visitor leaves the
 * site entirely. Every intermediate page would report no duration at all.
 * Here the effect's cleanup runs *before* the next effect body, so the
 * outgoing page's duration is flushed at the moment the route changes, and
 * only then does the new pageview begin.
 *
 * Hard requirement: analytics must never be able to break the site. There is
 * no component state (so nothing can be set after unmount), every handler body
 * is wrapped in try/catch, every network call is fire-and-forget, and all
 * listeners are removed on unmount.
 */

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isLoggedIn, sendDuration, trackPageview } from '@/lib/analytics';

interface PageTiming {
  /** Backend event id; empty until /track responds. */
  id: string;
  /** ms timestamp the page was entered. */
  start: number;
  /** ms timestamp the page was left, once it has been. */
  endedAt: number;
  /** Deepest scroll reached on this page, 0-100. */
  maxScroll: number;
  /** Largest duration already reported, so repeats never send stale numbers. */
  sentDuration: number;
}

function newPage(): PageTiming {
  return {
    id: '',
    start: Date.now(),
    endedAt: 0,
    maxScroll: 0,
    sentDuration: -1,
  };
}

/** Percentage of the document the visitor has seen so far, clamped to 0-100. */
function currentScrollPercent(): number {
  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') return 0;
    const doc = document.documentElement;
    if (!doc) return 0;
    const scrollTop =
      typeof window.scrollY === 'number' ? window.scrollY : doc.scrollTop || 0;
    const viewport = window.innerHeight || doc.clientHeight || 0;
    const height = Math.max(
      doc.scrollHeight || 0,
      document.body ? document.body.scrollHeight || 0 : 0,
      viewport
    );
    if (height <= 0) return 0;
    const pct = ((scrollTop + viewport) / height) * 100;
    if (!Number.isFinite(pct)) return 0;
    return Math.min(100, Math.max(0, Math.round(pct)));
  } catch {
    return 0;
  }
}

export default function AnalyticsTracker() {
  const { pathname } = useLocation();

  /** The page currently being measured. Null between routes / after unmount. */
  const pageRef = useRef<PageTiming | null>(null);

  /**
   * Report a page's duration and scroll depth.
   *
   * Safe to call repeatedly: it only sends when the measured duration has
   * grown, so a `visibilitychange` flush followed by a `pagehide` flush ends
   * with the most accurate value rather than an older, shorter one. A page
   * with no id yet (the /track response has not arrived, or the visitor is
   * staff, or the backend is down) is silently skipped.
   */
  const flush = (page: PageTiming | null) => {
    try {
      if (!page || !page.id) return;
      const end = page.endedAt || Date.now();
      const durationMs = Math.max(0, end - page.start);
      if (durationMs <= page.sentDuration) return;
      page.sentDuration = durationMs;
      sendDuration(page.id, durationMs, page.maxScroll);
    } catch {
      /* analytics must never throw into the app */
    }
  };

  // --- listeners: attached once for the lifetime of the component ----------
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let rafPending = false;

    const measureScroll = () => {
      try {
        rafPending = false;
        const page = pageRef.current;
        if (!page) return;
        const pct = currentScrollPercent();
        if (pct > page.maxScroll) page.maxScroll = pct;
      } catch {
        /* ignored */
      }
    };

    const onScroll = () => {
      try {
        if (rafPending) return;
        rafPending = true;
        if (typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(measureScroll);
        } else {
          measureScroll();
        }
      } catch {
        rafPending = false;
      }
    };

    /**
     * Stop the clock. Time spent with the tab hidden is not time spent reading,
     * and letting it accrue would inflate every average time-on-page in the
     * dashboard with hours of untouched background tab.
     */
    const freeze = (page: PageTiming | null) => {
      if (page && !page.endedAt) page.endedAt = Date.now();
    };

    /**
     * Restart the clock without discarding what was already measured: `start`
     * moves forward by the length of the pause, so the earlier reading survives
     * and the pause itself is excluded.
     */
    const thaw = (page: PageTiming | null) => {
      if (!page || !page.endedAt) return;
      page.start += Math.max(0, Date.now() - page.endedAt);
      page.endedAt = 0;
    };

    const onVisibilityChange = () => {
      try {
        // "hidden" is the last reliable moment on mobile — the visitor switched
        // tabs, minimised, or is being unloaded — so the duration goes out now.
        if (document.visibilityState === 'hidden') {
          const page = pageRef.current;
          freeze(page);
          flush(page);
        } else if (document.visibilityState === 'visible') {
          thaw(pageRef.current);
        }
      } catch {
        /* ignored */
      }
    };

    const onPageHide = () => {
      try {
        const page = pageRef.current;
        freeze(page);
        flush(page);
      } catch {
        /* ignored */
      }
    };

    /**
     * Back/forward cache restore. `pagehide` already stamped `endedAt`, which
     * stops the clock — without this the visitor could read the restored page
     * for another ten minutes and none of it would ever be measured, because
     * every later flush would recompute the same, already-sent duration.
     */
    const onPageShow = () => {
      try {
        thaw(pageRef.current);
      } catch {
        /* ignored */
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      try {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('pagehide', onPageHide);
        window.removeEventListener('pageshow', onPageShow);
      } catch {
        /* ignored */
      }
    };
    // `flush` closes over refs only, so this effect never needs to re-run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- one pageview per route ---------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;
    const page = newPage();
    pageRef.current = page;

    // Short pages can already be fully visible without any scrolling.
    page.maxScroll = currentScrollPercent();

    try {
      if (!isLoggedIn()) {
        const title = typeof document !== 'undefined' ? document.title : '';
        // Fire-and-forget: nothing is awaited on the render path, and
        // trackPageview resolves to null instead of rejecting on failure.
        trackPageview(pathname, title)
          .then((id) => {
            if (!id) return;
            page.id = id;
            // If the route already changed while /track was in flight, this
            // page is over — report it now using the timestamps captured
            // before it was swapped out, not the time spent since.
            if (cancelled) flush(page);
          })
          .catch(() => {});
      }
    } catch {
      /* ignored */
    }

    return () => {
      cancelled = true;
      try {
        // Flush the OUTGOING page before the next route starts measuring,
        // otherwise every duration in the SPA is lost. An existing `endedAt` is
        // kept, not overwritten: if the tab was already hidden when the route
        // changed, the clock stopped then, and restamping it here would bill
        // the outgoing page for the whole time the tab sat in the background.
        if (!page.endedAt) page.endedAt = Date.now();
        flush(page);
      } catch {
        /* ignored */
      }
      if (pageRef.current === page) pageRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
