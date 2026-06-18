import { lazy, ComponentType } from "react";

/**
 * Drop-in replacement for React.lazy that survives "ChunkLoadError".
 *
 * After a new deploy, an already-open tab still references the OLD chunk
 * hashes. When the user navigates, the dynamic import() for that route 404s,
 * React.lazy throws, and with no error boundary the page stays blank — which
 * is why links "need 100 clicks" right after a deploy. Here we catch that
 * failure once, force a single full reload to pick up the fresh index.html
 * (and therefore the new chunk URLs), and only surface a real error if it
 * still fails after the reload. A sessionStorage flag prevents reload loops.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const KEY = "rt-chunk-reloaded";
    try {
      const mod = await factory();
      window.sessionStorage.removeItem(KEY);
      return mod;
    } catch (err) {
      if (!window.sessionStorage.getItem(KEY)) {
        window.sessionStorage.setItem(KEY, "1");
        window.location.reload();
        // Hold the Suspense boundary while the page reloads.
        return new Promise<{ default: T }>(() => {});
      }
      throw err;
    }
  });
}
