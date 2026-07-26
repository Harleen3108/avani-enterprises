/**
 * WorldMap.jsx — dependency-free visitor map.
 *
 * No mapping library, no tiles, no network calls, no external images. Country
 * outlines come from `src/data/worldGeo.js`, which exports `WORLD` as
 *   [{ n: "India", p: [ polygon, ... ] }]
 * where a polygon is an array of rings and a ring is an array of [lng, lat]
 * pairs. (Verified against the bundled file: 176 countries, `p` nests four
 * levels deep. `ringsOf` below walks whatever depth it is given, so a flatter
 * `p: [ring, ...]` shape also renders correctly.)
 *
 * Projection is plain equirectangular into a 360x180 user-space:
 *   x = lng + 180        (lng -180..180  ->  x 0..360)
 *   y = 90  - lat        (lat   90..-90  ->  y 0..180)
 * so a viewBox is all that is needed to crop to a region. The World / India
 * toggle lives here: pass nothing and the component manages its own view, or
 * pass `view` + `onViewChange` to drive it from the parent.
 *
 * The bubbles are IP-derived city guesses. That is city-level and approximate:
 * a VPN or a mobile carrier's NAT will place a visitor in the wrong city
 * entirely, which is why the caption always says "approximate".
 */

import { useMemo, useRef, useState } from "react";
import { WORLD } from "../data/worldGeo.js";

/* ── Views ────────────────────────────────────────────────────────────────
 * world: the whole projection.
 * india: lng 68..98 -> x 248..278 ; lat 37..6 -> y 53..84.
 */
const VIEWS = {
  world: { x: 0, y: 0, w: 360, h: 180 },
  india: { x: 248, y: 53, w: 30, h: 31 },
};

const isPair = (v) => Array.isArray(v) && typeof v[0] === "number";

/** Flatten `p` to a list of rings regardless of how deeply it is nested. */
function ringsOf(p) {
  const out = [];
  const walk = (node) => {
    if (!Array.isArray(node) || node.length === 0) return;
    if (isPair(node[0])) {
      out.push(node); // node is a ring: [[lng,lat], ...]
      return;
    }
    for (const child of node) walk(child);
  };
  walk(p);
  return out;
}

/** One SVG path `d` for a whole country (all its rings). */
function pathFor(rings) {
  let d = "";
  for (const ring of rings) {
    if (!Array.isArray(ring) || ring.length < 3) continue;
    let started = false;
    for (const pt of ring) {
      const lng = Number(pt && pt[0]);
      const lat = Number(pt && pt[1]);
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) continue;
      const x = (lng + 180).toFixed(2);
      const y = (90 - lat).toFixed(2);
      d += `${started ? "L" : "M"}${x} ${y}`;
      started = true;
    }
    if (started) d += "Z";
  }
  return d;
}

/* Built once at import — WORLD never changes. */
const COUNTRY_PATHS = (Array.isArray(WORLD) ? WORLD : [])
  .map((c, i) => ({
    key: `${(c && c.n) || "country"}-${i}`,
    name: (c && c.n) || "",
    d: pathFor(ringsOf(c && c.p)),
  }))
  .filter((c) => c.d.length > 0);

/** Usable point? Reject missing coords and the (0,0) "Null Island" fallback. */
function plottable(c) {
  const lat = Number(c && c.lat);
  const lng = Number(c && c.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  if (lat === 0 && lng === 0) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

const fmt = (n) => (Number.isFinite(Number(n)) ? Number(n).toLocaleString("en-IN") : "0");

/** Labels come from IP geolocation data — clamp them so one absurd string
 *  cannot stretch the tooltip across the screen. */
const label = (v, max = 64) => {
  const s = typeof v === "string" ? v : v === null || v === undefined ? "" : String(v);
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
};

const WorldMap = ({
  cities = [],
  height = 420,
  defaultView = "world",
  view,               // optional: pass to drive the view from the parent
  onViewChange,
  showToggle = true,
}) => {
  const wrapRef = useRef(null);
  const [ownView, setOwnView] = useState(VIEWS[defaultView] ? defaultView : "world");
  const [hover, setHover] = useState(null); // { i, city, x, y }

  // Controlled when `view` is supplied, self-managing otherwise.
  const activeView = VIEWS[view] ? view : ownView;
  const vb = VIEWS[activeView] || VIEWS.world;

  const setView = (v) => {
    if (!VIEWS[v] || v === activeView) return;
    setOwnView(v);
    setHover(null);
    if (typeof onViewChange === "function") onViewChange(v);
  };

  const points = useMemo(() => {
    const list = (Array.isArray(cities) ? cities : []).filter(plottable).map((c) => ({
      city: label(c.city) || "Unknown city",
      region: label(c.region),
      country: label(c.country || c.countryName),
      visitors: Math.max(0, Number(c.visitors) || 0),
      lat: Number(c.lat),
      lng: Number(c.lng),
    }));
    // Largest first so small bubbles paint on top of big ones.
    return list.sort((a, b) => b.visitors - a.visitors);
  }, [cities]);

  // reduce, not Math.max(...spread): a long city list would blow the arg limit.
  const maxVisitors = points.reduce((m, p) => (p.visitors > m ? p.visitors : m), 0);

  /* One user-unit renders at a different pixel size in each view, so express
   * every screen-constant size as a multiple of U. */
  const U = vb.w / 360;
  const R_MIN = 1.6 * U;
  const R_MAX = 6.5 * U;

  /** How many bubbles actually fall inside the current frame. */
  const visibleCount = points.reduce((n, p) => {
    const x = p.lng + 180;
    const y = 90 - p.lat;
    return x >= vb.x && x <= vb.x + vb.w && y >= vb.y && y <= vb.y + vb.h ? n + 1 : n;
  }, 0);

  const radius = (v) => {
    if (maxVisitors <= 0) return R_MIN;
    // sqrt so area (not radius) tracks visitors — one huge city cannot swamp the map.
    return R_MIN + (R_MAX - R_MIN) * Math.sqrt(Math.max(0, v) / maxVisitors);
  };

  const onEnter = (p, i) => (e) => {
    const box = wrapRef.current && wrapRef.current.getBoundingClientRect();
    if (!box) return;
    setHover({ i, city: p, x: e.clientX - box.left, y: e.clientY - box.top });
  };

  const wrapWidth = (wrapRef.current && wrapRef.current.clientWidth) || 400;
  const tipLeft = hover ? Math.min(Math.max(hover.x, 90), Math.max(90, wrapWidth - 90)) : 0;

  return (
    <div className="w-full">
      {showToggle && (
        <div className="flex items-center justify-end mb-2">
          <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden" role="group" aria-label="Map view">
            {[
              { key: "world", label: "World" },
              { key: "india", label: "India" },
            ].map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setView(v.key)}
                aria-pressed={activeView === v.key}
                className={
                  "px-3 py-1.5 text-xs font-medium transition " +
                  (activeView === v.key
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50")
                }
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div
        ref={wrapRef}
        className="relative w-full rounded-xl bg-slate-50 border border-gray-100 overflow-hidden"
        style={{ height }}
        onMouseLeave={() => setHover(null)}
      >
        <svg
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          role="img"
          aria-label={
            points.length
              ? `Approximate visitor locations, ${points.length} cities`
              : "Visitor map — no location data yet"
          }
        >
          {/* Countries */}
          <g>
            {COUNTRY_PATHS.map((c) => (
              <path
                key={c.key}
                d={c.d}
                fill="#e6eaf0"
                stroke="#ffffff"
                strokeWidth={0.7}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* Visitor bubbles */}
          <g>
            {points.map((p, i) => {
              const cx = p.lng + 180;
              const cy = 90 - p.lat;
              const r = radius(p.visitors);
              const active = hover ? hover.i === i : false;
              return (
                <circle
                  key={`${p.city}-${p.country}-${i}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="#2563eb"
                  fillOpacity={active ? 0.55 : 0.32}
                  stroke="#2563eb"
                  strokeWidth={active ? 1.8 : 1.1}
                  vectorEffect="non-scaling-stroke"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={onEnter(p, i)}
                  onMouseMove={onEnter(p, i)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* Empty state — the map still draws, so it reads as "nothing yet", not broken.
            In the India view a full world dataset can still leave the frame empty,
            and that has to be said rather than looking like a failure. */}
        {(points.length === 0 || visibleCount === 0) && (
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-6">
            <span className="px-3 py-1.5 rounded-full bg-white/90 border border-gray-200 text-xs text-gray-500 shadow-sm">
              {points.length === 0
                ? "No location data yet"
                : "No visitors located inside this view"}
            </span>
          </div>
        )}

        {/* Hover tooltip */}
        {hover && hover.city && (
          <div
            className="absolute z-10 pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{ left: tipLeft, top: Math.max(hover.y - 10, 42) }}
          >
            <div className="rounded-lg bg-gray-900 text-white text-xs px-3 py-2 shadow-lg whitespace-nowrap">
              <div className="font-semibold">{hover.city.city}</div>
              <div className="text-gray-300">
                {[hover.city.region, hover.city.country].filter(Boolean).join(", ") || "Region unknown"}
              </div>
              <div className="mt-1 font-semibold">
                {fmt(hover.city.visitors)} visitor{hover.city.visitors === 1 ? "" : "s"}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-[11px] text-gray-400 mt-2">
        Locations are approximate. They come from IP address lookup, which is city-level at best — a
        VPN or a mobile network can place a visitor in the wrong city entirely.
        {points.length > 0 && " Bubble area is proportional to visitors."}
      </p>
    </div>
  );
};

export default WorldMap;
