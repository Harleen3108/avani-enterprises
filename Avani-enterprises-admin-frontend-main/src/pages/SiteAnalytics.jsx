/**
 * SiteAnalytics.jsx — first-party website analytics dashboard.
 *
 * Reads GET <VITE_API_URL>/api/analytics/dashboard?from=&to=&granularity=
 * and renders the whole response. Nothing here is computed from thin air: if a
 * figure is absent the panel says so rather than showing a plausible-looking
 * zero-with-a-trend. A brand-new install has no data at all, and it must look
 * deliberately empty, not broken.
 *
 * The traffic chart is hand-drawn inline SVG — no chart library.
 * Geography is IP-derived and therefore approximate; the map says so.
 */

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from "axios";
import {
  RefreshCw, Download, Lightbulb, Globe2, TrendingUp, TrendingDown, Minus,
  Users, Eye, MousePointerClick, Inbox, Target, Radio,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import WorldMap from "../components/WorldMap";

/* ── Series colours ────────────────────────────────────────────────────────
 * Two series only, blue/amber — validated for protan, deutan and tritan
 * separation against a light surface (ΔE 32.3 worst pair, contrast ≥ 3:1).
 */
const C_VISITORS = "#2563eb";
const C_PAGEVIEWS = "#d97706";

/* ── Small helpers ─────────────────────────────────────────────────────── */

const arr = (v) => (Array.isArray(v) ? v : []);
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const has = (v) => v !== null && v !== undefined && v !== "";

/**
 * Every label below (path, search term, referrer domain, city) is ultimately
 * visitor-supplied. React escapes it, so there is no injection risk, but an
 * over-long string would still wreck the layout — clip it for display.
 */
const clip = (v, max = 160) => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
};

/** Max of a numeric column without spreading a whole array into Math.max. */
const maxOf = (rows, pick) => rows.reduce((m, r) => { const n = num(pick(r)); return n > m ? n : m; }, 0);

const fmtInt = (v) => (Number.isFinite(Number(v)) ? Math.round(Number(v)).toLocaleString("en-IN") : "—");
const fmtNum = (v, dp = 1) => (Number.isFinite(Number(v)) ? Number(v).toFixed(dp) : "—");
const fmtPct = (v) => (Number.isFinite(Number(v)) ? `${Number(v).toFixed(2)}%` : "—");

const fmtDuration = (ms) => {
  const n = Number(ms);
  if (!Number.isFinite(n) || n <= 0) return "0s";
  const s = Math.round(n / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s % 60}s`;
  return `${s}s`;
};

const isoDay = (d) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

/**
 * Human label for a timeseries bucket, whatever shape the backend used.
 * The backend anchors every bucket in UTC, so the label is formatted in UTC
 * too — otherwise a browser west of Greenwich names the wrong day.
 */
const bucketLabel = (bucket, granularity) => {
  const raw = String(bucket ?? "").slice(0, 40);
  if (!raw) return "—";
  // "2026-W30" style weeks are not Date-parseable — show them as-is.
  if (/^\d{4}-W\d{1,2}$/i.test(raw)) return raw.toUpperCase();

  const isMonth = /^\d{4}-\d{2}$/.test(raw);
  const d = isMonth
    ? new Date(`${raw}-01T00:00:00.000Z`)
    : /^\d{4}-\d{2}-\d{2}$/.test(raw)
      ? new Date(`${raw}T00:00:00.000Z`)
      : new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;

  if (isMonth || granularity === "month")
    return d.toLocaleDateString("en-GB", { timeZone: "UTC", month: "short", year: "numeric" });
  const day = d.toLocaleDateString("en-GB", { timeZone: "UTC", day: "2-digit", month: "short" });
  return granularity === "week" ? `w/c ${day}` : day;
};

/**
 * `range.from` / `range.to` come back as Date objects, i.e. full ISO strings
 * such as "2026-07-20T00:00:00.000Z". Reduce them to the YYYY-MM-DD the
 * backend actually meant — and note it may differ from what was requested,
 * because the backend clamps over-long ranges.
 */
const dayIso = (v, fallback = "") => {
  if (v === null || v === undefined || v === "") return fallback;
  const s = String(v);
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
  if (m) return m[1];
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? fallback : d.toISOString().slice(0, 10);
};

/**
 * Percentage change against the previous window.
 * Previous of zero has no defined percentage — it returns a grey "no baseline"
 * state instead of Infinity% or NaN%.
 */
function pctChange(current, previous) {
  const c = Number(current);
  const p = Number(previous);
  if (!Number.isFinite(c) || !Number.isFinite(p)) {
    return { state: "none", text: "No comparison available" };
  }
  if (p === 0) {
    return {
      state: "none",
      text: c === 0 ? "No activity in either period" : "No activity in the previous period",
    };
  }
  const pct = ((c - p) / Math.abs(p)) * 100;
  if (!Number.isFinite(pct)) return { state: "none", text: "No comparison available" };
  if (Math.abs(pct) < 0.05) return { state: "flat", text: "No change vs previous" };
  return {
    state: pct > 0 ? "up" : "down",
    text: `${pct > 0 ? "+" : "−"}${Math.abs(pct).toFixed(1)}% vs previous`,
  };
}

/** Rates compare in percentage points, not as a percentage of a percentage. */
function ppChange(current, previous) {
  const c = Number(current);
  const p = Number(previous);
  if (!Number.isFinite(c) || !Number.isFinite(p)) {
    return { state: "none", text: "No comparison available" };
  }
  const d = c - p;
  if (Math.abs(d) < 0.005) return { state: "flat", text: "No change vs previous" };
  return {
    state: d > 0 ? "up" : "down",
    text: `${d > 0 ? "+" : "−"}${Math.abs(d).toFixed(2)} pts vs previous`,
  };
}

/* ── Layout primitives (match the AllLeads visual language) ─────────────── */

const Panel = ({ title, subtitle, right, children, className }) => (
  <div className={clsx("bg-white rounded-2xl border border-gray-100 shadow-sm", className)}>
    {(title || right) && (
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
        <div className="min-w-0">
          {title && <h2 className="text-sm font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    )}
    {children}
  </div>
);

const Empty = ({ children = "Nothing recorded in this range yet." }) => (
  <div className="px-5 pb-7 pt-3 text-center">
    <p className="text-sm text-gray-400">{children}</p>
  </div>
);

const DeltaLine = ({ change }) => {
  const Icon = change.state === "up" ? TrendingUp : change.state === "down" ? TrendingDown : Minus;
  return (
    <p
      className={clsx(
        "text-[11px] mt-2 flex items-center gap-1 font-medium",
        change.state === "up" && "text-emerald-600",
        change.state === "down" && "text-rose-600",
        (change.state === "flat" || change.state === "none") && "text-gray-400"
      )}
    >
      <Icon size={12} /> {change.text}
    </p>
  );
};

const Kpi = ({ label, value, icon: Icon, change }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
      {Icon && <Icon size={13} />} {label}
    </p>
    <p className="text-3xl font-bold text-gray-900 mt-2 tabular-nums">{value}</p>
    {change && <DeltaLine change={change} />}
  </div>
);

const Stat = ({ label, value, hint }) => (
  <div className="px-4 py-3">
    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-lg font-bold text-gray-900 mt-1 tabular-nums">{value}</p>
    {hint && <p className="text-[11px] text-gray-400 mt-0.5">{hint}</p>}
  </div>
);

/** Ranked list with a proportional bar — used for sources / engines / terms / AI. */
const BarList = ({ rows, empty, unit = "visitors" }) => {
  if (!rows.length) return <Empty>{empty}</Empty>;
  const max = maxOf(rows, (r) => r.value);
  return (
    <div className="px-5 pb-5 space-y-2.5">
      {rows.map((r, i) => (
        <div key={`${r.label}-${i}`} className="flex items-center gap-3 text-sm">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-gray-700 truncate" title={r.label}>{clip(r.label)}</span>
              {r.sub && <span className="text-[11px] text-gray-400 shrink-0">{r.sub}</span>}
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full"
                style={{ width: max > 0 ? `${(num(r.value) / max) * 100}%` : "0%" }}
              />
            </div>
          </div>
          <span className="text-xs font-semibold text-gray-900 w-14 text-right tabular-nums" title={unit}>
            {fmtInt(r.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const DataTable = ({ cols, rows, empty }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100 bg-gray-50/60">
          {cols.map((c) => (
            <th
              key={c.key}
              className={clsx(
                "px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap",
                c.align === "right" ? "text-right" : "text-left"
              )}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={cols.length} className="px-4 py-12 text-center text-gray-400">
              {empty}
            </td>
          </tr>
        )}
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
            {cols.map((c) => (
              <td
                key={c.key}
                className={clsx(
                  "px-4 py-3",
                  c.align === "right" ? "text-right tabular-nums" : "text-left",
                  c.mono && "font-mono text-xs"
                )}
              >
                {c.render(r)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ── Traffic chart — hand-rolled inline SVG, no chart library ───────────── */

function yScaleFor(maxValue) {
  if (maxValue <= 5) {
    const top = Math.max(1, Math.ceil(maxValue));
    return { top, ticks: Array.from({ length: top + 1 }, (_, i) => i) };
  }
  const mag = Math.pow(10, Math.floor(Math.log10(maxValue)));
  let top = 10 * mag;
  for (const s of [1, 2, 5, 10]) {
    if (maxValue <= s * mag) {
      top = s * mag;
      break;
    }
  }
  return { top, ticks: [0, 1, 2, 3, 4, 5].map((i) => (top / 5) * i) };
}

const TrafficChart = ({ points, granularity }) => {
  const [hoverIdx, setHoverIdx] = useState(null);

  const W = 1000;
  const H = 300;
  const PAD = { l: 52, r: 22, t: 18, b: 34 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;

  const n = points.length;
  const maxValue = points.reduce(
    (m, p) => Math.max(m, num(p.visitors), num(p.pageViews)),
    0
  );

  if (!n || maxValue <= 0) {
    return (
      <Empty>
        {n
          ? "Every bucket in this range is zero — no visits recorded yet."
          : "No traffic recorded in this range yet."}
      </Empty>
    );
  }

  const { top, ticks } = yScaleFor(maxValue);
  const X = (i) => (n === 1 ? PAD.l + iw / 2 : PAD.l + (i / (n - 1)) * iw);
  const Y = (v) => PAD.t + ih - (Math.max(0, num(v)) / top) * ih;

  const linePath = (key) =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${X(i).toFixed(2)} ${Y(p[key]).toFixed(2)}`).join("");

  const areaPath = () => {
    if (n === 1) return "";
    const base = (PAD.t + ih).toFixed(2);
    return `${linePath("visitors")}L${X(n - 1).toFixed(2)} ${base}L${X(0).toFixed(2)} ${base}Z`;
  };

  // Show at most 7 x-axis labels so they never collide.
  const step = Math.max(1, Math.ceil(n / 7));
  const xLabelIdx = [];
  for (let i = 0; i < n; i += step) xLabelIdx.push(i);
  if (xLabelIdx[xLabelIdx.length - 1] !== n - 1) xLabelIdx.push(n - 1);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width) return;
    const t = (e.clientX - r.left) / r.width;
    const i = n === 1 ? 0 : Math.round(t * (n - 1));
    setHoverIdx(Math.min(n - 1, Math.max(0, i)));
  };

  const hp = hoverIdx !== null ? points[hoverIdx] : null;
  const hoverPctLeft = hoverIdx !== null ? (X(hoverIdx) / W) * 100 : 0;
  const last = points[n - 1];

  return (
    <div className="px-5 pb-5">
      {/* Legend — identity is never colour alone; each series is also end-labelled. */}
      <div className="flex items-center gap-5 mb-2">
        <span className="inline-flex items-center gap-2 text-xs text-gray-600">
          <span className="w-3 h-1.5 rounded-full" style={{ background: C_VISITORS }} /> Visitors
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-gray-600">
          <span className="w-3 h-1.5 rounded-full" style={{ background: C_PAGEVIEWS }} /> Page views
        </span>
      </div>

      <div className="relative w-full">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Traffic over time">
          <defs>
            <linearGradient id="avTrafficFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C_VISITORS} stopOpacity="0.22" />
              <stop offset="100%" stopColor={C_VISITORS} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid + y labels */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.l}
                x2={W - PAD.r}
                y1={Y(t)}
                y2={Y(t)}
                stroke="#eef0f3"
                strokeWidth="1"
              />
              <text x={PAD.l - 10} y={Y(t) + 4} textAnchor="end" fontSize="11" fill="#9ca3af">
                {Number.isInteger(t) ? Math.round(t).toLocaleString("en-IN") : t.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Area under visitors */}
          {n > 1 && <path d={areaPath()} fill="url(#avTrafficFill)" stroke="none" />}

          {/* Series */}
          <path
            d={linePath("pageViews")}
            fill="none"
            stroke={C_PAGEVIEWS}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={linePath("visitors")}
            fill="none"
            stroke={C_VISITORS}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Single-bucket ranges have no line to read — mark the points. */}
          {n === 1 && (
            <g>
              <circle cx={X(0)} cy={Y(last.pageViews)} r="5" fill={C_PAGEVIEWS} stroke="#fff" strokeWidth="2" />
              <circle cx={X(0)} cy={Y(last.visitors)} r="5" fill={C_VISITORS} stroke="#fff" strokeWidth="2" />
            </g>
          )}

          {/* Selective direct labels: the latest value of each series */}
          <text
            x={X(n - 1)}
            y={Y(last.pageViews) - 9}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill="#6b7280"
          >
            {fmtInt(last.pageViews)}
          </text>
          <text
            x={X(n - 1)}
            y={Y(last.visitors) + 16}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill="#6b7280"
          >
            {fmtInt(last.visitors)}
          </text>

          {/* X labels */}
          {xLabelIdx.map((i) => (
            <text
              key={i}
              x={X(i)}
              y={H - 10}
              textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
              fontSize="11"
              fill="#9ca3af"
            >
              {bucketLabel(points[i].bucket, granularity)}
            </text>
          ))}

          {/* Crosshair */}
          {hp && (
            <g pointerEvents="none">
              <line
                x1={X(hoverIdx)}
                x2={X(hoverIdx)}
                y1={PAD.t}
                y2={PAD.t + ih}
                stroke="#9ca3af"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle cx={X(hoverIdx)} cy={Y(hp.pageViews)} r="4.5" fill={C_PAGEVIEWS} stroke="#fff" strokeWidth="2" />
              <circle cx={X(hoverIdx)} cy={Y(hp.visitors)} r="4.5" fill={C_VISITORS} stroke="#fff" strokeWidth="2" />
            </g>
          )}

          {/* Hit area */}
          <rect
            x={PAD.l}
            y={PAD.t}
            width={iw}
            height={ih}
            fill="transparent"
            onMouseMove={onMove}
            onMouseLeave={() => setHoverIdx(null)}
          />
        </svg>

        {hp && (
          <div
            className="absolute top-0 z-10 pointer-events-none"
            style={{
              left: `${hoverPctLeft}%`,
              transform: hoverPctLeft > 78 ? "translateX(-100%)" : hoverPctLeft < 18 ? "none" : "translateX(-50%)",
            }}
          >
            <div className="rounded-lg bg-gray-900 text-white text-xs px-3 py-2 shadow-lg whitespace-nowrap">
              <div className="font-semibold mb-1">{bucketLabel(hp.bucket, granularity)}</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: C_VISITORS }} />
                Visitors <span className="ml-auto font-semibold">{fmtInt(hp.visitors)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: C_PAGEVIEWS }} />
                Page views <span className="ml-auto font-semibold">{fmtInt(hp.pageViews)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Range presets ─────────────────────────────────────────────────────── */

const PRESETS = [
  { key: "today", label: "Today", granularity: "day", range: () => { const t = new Date(); return { from: isoDay(t), to: isoDay(t) }; } },
  { key: "yesterday", label: "Yesterday", granularity: "day", range: () => { const y = addDays(new Date(), -1); return { from: isoDay(y), to: isoDay(y) }; } },
  { key: "7d", label: "7D", granularity: "day", range: () => ({ from: isoDay(addDays(new Date(), -6)), to: isoDay(new Date()) }) },
  { key: "30d", label: "30D", granularity: "day", range: () => ({ from: isoDay(addDays(new Date(), -29)), to: isoDay(new Date()) }) },
  { key: "90d", label: "90D", granularity: "week", range: () => ({ from: isoDay(addDays(new Date(), -89)), to: isoDay(new Date()) }) },
  { key: "1y", label: "1Y", granularity: "month", range: () => ({ from: isoDay(addDays(new Date(), -364)), to: isoDay(new Date()) }) },
];

/* ── CSV export ────────────────────────────────────────────────────────── */

/**
 * Almost every string in this export originates with a visitor: page paths,
 * referrer domains, search terms, city names. A cell that opens with = + - @
 * or a control character is executed as a formula by Excel and Sheets, so it
 * is neutralised with a leading apostrophe before quoting. Real numbers are
 * left alone so the spreadsheet still sums them.
 */
const csvCell = (v) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "";
  let s = String(v);
  if (/^[=+\-@\t\r]/.test(s) && !/^-?\d+(\.\d+)?$/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Filenames are built from range values that came in on the query string. */
const safeFilePart = (v) => String(v ?? "").replace(/[^0-9A-Za-z_-]/g, "").slice(0, 20) || "range";

function csvSection(lines, title, header, rows) {
  lines.push(csvCell(title));
  lines.push(header.map(csvCell).join(","));
  if (!rows.length) lines.push("(no data in this range)");
  else rows.forEach((r) => lines.push(r.map(csvCell).join(",")));
  lines.push("");
}

/* ── Page ──────────────────────────────────────────────────────────────── */

const SiteAnalytics = () => {
  const { token, loading: authLoading } = useAuth();
  // AuthContext already sets axios.defaults.baseURL, so an unset env var must
  // fall back to "" and produce a relative URL — never the string "undefined/".
  const API = import.meta.env.VITE_API_URL || "";

  const [preset, setPreset] = useState("7d");
  const [from, setFrom] = useState(isoDay(addDays(new Date(), -6)));
  const [to, setTo] = useState(isoDay(new Date()));
  const [granularity, setGranularity] = useState("day");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapView, setMapView] = useState("world");

  /* Only the newest request is allowed to write state. Clicking through the
   * presets fires overlapping requests and the slowest one must not win. */
  const reqSeq = useRef(0);
  const alive = useRef(true);
  useEffect(() => {
    // Reset on mount as well as clearing on unmount: StrictMode mounts, unmounts
    // and remounts, and a ref left false would mute every later response.
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const fetchDashboard = useCallback(async () => {
    if (!token) return;
    // A hand-typed custom range can be inverted; send it the right way round.
    const a = from <= to ? from : to;
    const b = from <= to ? to : from;
    const seq = ++reqSeq.current;
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/analytics/dashboard`, {
        params: { from: a, to: b, granularity },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!alive.current || seq !== reqSeq.current) return;
      setData(res.data && typeof res.data === "object" ? res.data : null);
      setError("");
    } catch (err) {
      if (!alive.current || seq !== reqSeq.current) return;
      setError(err?.response?.data?.message || "Could not load analytics. Please try again.");
    } finally {
      if (alive.current && seq === reqSeq.current) setLoading(false);
    }
  }, [API, token, from, to, granularity]);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      // Without a token there is nothing to wait for — say so instead of
      // spinning forever.
      setLoading(false);
      setError("You are signed out. Sign in again to view analytics.");
      return;
    }
    fetchDashboard();
  }, [authLoading, token, fetchDashboard]);

  const applyPreset = (p) => {
    const r = p.range();
    setPreset(p.key);
    setFrom(r.from);
    setTo(r.to);
    setGranularity(p.granularity);
  };

  /* ── Derived, all defensively defaulted ─────────────────────────────── */
  const exec = data?.executive || {};
  const prev = data?.previous || null;
  const beh = data?.behaviour || {};
  const range = data?.range || {};
  const geo = data?.geo || {};

  // What the backend actually used — it swaps inverted ranges and clamps long
  // ones, so echo its range rather than the one that was requested.
  const reqFrom = from <= to ? from : to;
  const reqTo = from <= to ? to : from;
  const shownFrom = dayIso(range.from, reqFrom);
  const shownTo = dayIso(range.to, reqTo);

  const timeseries = useMemo(
    () =>
      arr(data?.timeseries).map((t) => ({
        bucket: t?.bucket,
        visitors: num(t?.visitors),
        pageViews: num(t?.pageViews),
      })),
    [data]
  );

  const sources = arr(data?.sources);
  const searchEngines = arr(data?.searchEngines);
  const searchTerms = arr(data?.searchTerms);
  const ai = arr(data?.ai);
  const countries = arr(geo.countries);
  const regions = arr(geo.regions);
  const cities = arr(geo.cities);
  const pages = arr(data?.pages);
  const landingPages = arr(data?.landingPages);
  const exitPages = arr(data?.exitPages);
  const leadAttribution = arr(data?.leadAttribution);
  const devices = arr(data?.devices);
  const browsers = arr(data?.browsers);
  const os = arr(data?.os);
  const insights = arr(data?.insights).filter((s) => typeof s === "string" && s.trim());
  // Cities the map can actually plot — geoip returns rows with no coordinates.
  const mappableCities = cities.filter((c) => {
    const la = Number(c?.lat);
    const ln = Number(c?.lng);
    return Number.isFinite(la) && Number.isFinite(ln) && !(la === 0 && ln === 0);
  }).length;
  const online = data?.realtime && Number.isFinite(Number(data.realtime.online))
    ? Number(data.realtime.online)
    : null;

  const kpis = [
    { key: "uniqueVisitors", label: "Unique visitors", icon: Users, value: fmtInt(exec.uniqueVisitors), change: prev ? pctChange(exec.uniqueVisitors, prev.uniqueVisitors) : null },
    { key: "pageViews", label: "Page views", icon: Eye, value: fmtInt(exec.pageViews), change: prev ? pctChange(exec.pageViews, prev.pageViews) : null },
    { key: "sessions", label: "Sessions", icon: MousePointerClick, value: fmtInt(exec.sessions), change: prev ? pctChange(exec.sessions, prev.sessions) : null },
    { key: "leads", label: "Leads", icon: Inbox, value: fmtInt(exec.leads), change: prev ? pctChange(exec.leads, prev.leads) : null },
    { key: "conversionRate", label: "Conversion rate", icon: Target, value: has(exec.conversionRate) ? fmtPct(exec.conversionRate) : "—", change: prev && has(prev.conversionRate) ? ppChange(exec.conversionRate, prev.conversionRate) : null },
  ];

  const exportCsv = () => {
    if (!data) return;
    const lines = [];
    lines.push(csvCell("Avani Enterprises — site analytics export"));
    lines.push(`Range,${csvCell(shownFrom)},${csvCell(shownTo)}`);
    lines.push(`Granularity,${csvCell(range.granularity || granularity)}`);
    lines.push(`Generated,${csvCell(new Date().toLocaleString("en-GB"))}`);
    lines.push("");

    csvSection(lines, "Executive", ["Metric", "Current", "Previous period"], [
      ["Unique visitors", exec.uniqueVisitors ?? "", prev ? prev.uniqueVisitors ?? "" : "(not returned)"],
      ["Page views", exec.pageViews ?? "", prev ? prev.pageViews ?? "" : "(not returned)"],
      ["Sessions", exec.sessions ?? "", prev ? prev.sessions ?? "" : "(not returned)"],
      ["Leads", exec.leads ?? "", prev ? prev.leads ?? "" : "(not returned)"],
      ["Conversion rate %", exec.conversionRate ?? "", prev ? prev.conversionRate ?? "" : "(not returned)"],
    ]);

    csvSection(lines, "Behaviour", ["Metric", "Value"], [
      ["New visitors", beh.newVisitors ?? ""],
      ["Returning visitors", beh.returningVisitors ?? ""],
      ["Bounce rate %", beh.bounceRate ?? ""],
      ["Pages per session", beh.pagesPerSession ?? ""],
      ["Avg session duration (ms)", beh.avgSessionDurationMs ?? ""],
      ["Engaged sessions", beh.engagedSessions ?? ""],
    ]);

    csvSection(lines, "Traffic over time", ["Bucket", "Visitors", "Page views"],
      timeseries.map((t) => [t.bucket ?? "", t.visitors, t.pageViews]));
    csvSection(lines, "Sources", ["Source", "Visitors", "Share %"],
      sources.map((s) => [s.source ?? "", s.visitors ?? "", s.pct ?? ""]));
    csvSection(lines, "Search engines", ["Engine", "Visitors"],
      searchEngines.map((s) => [s.engine ?? "", s.visitors ?? ""]));
    csvSection(lines, "Search terms", ["Term", "Visitors"],
      searchTerms.map((s) => [s.term ?? "", s.visitors ?? ""]));
    csvSection(lines, "AI assistants", ["Assistant", "Visitors", "Leads"],
      ai.map((a) => [a.assistant ?? "", a.visitors ?? "", a.leads ?? ""]));
    csvSection(lines, "Countries (approximate, IP-derived)", ["Code", "Country", "Visitors"],
      countries.map((c) => [c.code ?? "", c.name ?? "", c.visitors ?? ""]));
    csvSection(lines, "Regions (approximate, IP-derived)", ["Region", "Country", "Visitors"],
      regions.map((r) => [r.region ?? "", r.country ?? "", r.visitors ?? ""]));
    csvSection(lines, "Cities (approximate, IP-derived)", ["City", "Region", "Country", "Visitors"],
      cities.map((c) => [c.city ?? "", c.region ?? "", c.country ?? "", c.visitors ?? ""]));
    csvSection(lines, "Top pages", ["Path", "Views", "Unique", "Avg time (ms)", "Avg scroll %", "Entrances", "Exits"],
      pages.map((p) => [p.path ?? "", p.views ?? "", p.unique ?? "", p.avgTimeMs ?? "", p.avgScroll ?? "", p.entrances ?? "", p.exits ?? ""]));
    csvSection(lines, "Landing pages", ["Path", "Sessions"],
      landingPages.map((p) => [p.path ?? "", p.sessions ?? ""]));
    csvSection(lines, "Exit pages", ["Path", "Exits"],
      exitPages.map((p) => [p.path ?? "", p.exits ?? ""]));
    csvSection(lines, "Lead attribution", ["Landing page", "Leads", "Visitors", "Conversion rate %"],
      leadAttribution.map((l) => [l.landingPage ?? "", l.leads ?? "", l.visitors ?? "", l.conversionRate ?? ""]));
    csvSection(lines, "Devices", ["Device", "Visitors"], devices.map((d) => [d.device ?? "", d.visitors ?? ""]));
    csvSection(lines, "Browsers", ["Browser", "Visitors"], browsers.map((b) => [b.browser ?? "", b.visitors ?? ""]));
    csvSection(lines, "Operating systems", ["OS", "Visitors"], os.map((o) => [o.os ?? "", o.visitors ?? ""]));
    csvSection(lines, "Insights", ["Insight"], insights.map((s) => [s]));

    // A failed download must not take the dashboard down with it.
    let url = "";
    try {
      const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
      url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Avani_Analytics_${safeFilePart(shownFrom)}_to_${safeFilePart(shownTo)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      setError("Could not build the CSV file in this browser.");
    } finally {
      if (url) URL.revokeObjectURL(url);
    }
  };

  /* ── Render ─────────────────────────────────────────────────────────── */

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <RefreshCw className="animate-spin mr-2" size={18} /> Loading analytics…
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-8 md:pt-4 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Site Analytics</h1>
          <p className="text-gray-500 mt-1 text-sm">
            First-party traffic for avanienterprises.in. Staff visits and known bots are excluded.
          </p>
        </div>
        <div className="flex gap-2">
          {online !== null && (
            <span className="inline-flex items-center px-3 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-medium">
              <Radio size={15} className="mr-2" /> {fmtInt(online)} online now
            </span>
          )}
          <button
            onClick={fetchDashboard}
            disabled={loading}
            className="inline-flex items-center px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw size={16} className={clsx("mr-2", loading && "animate-spin")} /> Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={!data}
            className="inline-flex items-center bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-black transition text-sm font-medium disabled:opacity-40"
          >
            <Download size={16} className="mr-2" /> Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>
      )}

      {/* Range controls */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              onClick={() => applyPreset(p)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition",
                preset === p.key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              )}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setPreset("custom")}
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition",
              preset === "custom"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
          >
            Custom
          </button>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {preset === "custom" && (
              <>
                <input
                  type="date"
                  value={from}
                  max={to}
                  onChange={(e) => setFrom(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                />
                <span className="text-gray-400 text-sm">to</span>
                <input
                  type="date"
                  value={to}
                  min={from}
                  onChange={(e) => setTo(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                />
              </>
            )}
            <select
              value={granularity}
              onChange={(e) => setGranularity(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
              aria-label="Chart granularity"
            >
              <option value="day">By day</option>
              <option value="week">By week</option>
              <option value="month">By month</option>
            </select>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-3">
          Showing {shownFrom} to {shownTo}
          {Number.isFinite(Number(range.days)) ? ` · ${fmtInt(range.days)} days` : ""} · grouped by{" "}
          {range.granularity || granularity}
          {prev ? " · compared against the previous period of equal length" : " · no previous period returned"}
          {data && (shownFrom !== reqFrom || shownTo !== reqTo)
            ? " · the server adjusted this range to the maximum it will query"
            : ""}
        </p>
      </div>

      {/* Insight banner */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <Lightbulb size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-amber-900">What the numbers say</h2>
            {insights.length === 0 ? (
              <p className="text-sm text-amber-800/80 mt-1">
                No insights for this range — there is not enough recorded activity to say anything
                useful yet.
              </p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {insights.map((s, i) => (
                  <li key={i} className="text-sm text-amber-900/90 flex gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <Kpi key={k.key} label={k.label} value={k.value} icon={k.icon} change={k.change} />
        ))}
      </div>

      {/* Behaviour */}
      <Panel title="Visitor behaviour" subtitle="How people move through the site in this range.">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-gray-100 border-t border-gray-100">
          <Stat label="New visitors" value={fmtInt(beh.newVisitors)} />
          <Stat label="Returning" value={fmtInt(beh.returningVisitors)} />
          <Stat label="Bounce rate" value={has(beh.bounceRate) ? fmtPct(beh.bounceRate) : "—"} />
          <Stat label="Pages / session" value={has(beh.pagesPerSession) ? fmtNum(beh.pagesPerSession, 2) : "—"} />
          <Stat label="Avg session" value={has(beh.avgSessionDurationMs) ? fmtDuration(beh.avgSessionDurationMs) : "—"} />
          <Stat label="Engaged sessions" value={fmtInt(beh.engagedSessions)} />
        </div>
      </Panel>

      {/* Traffic chart */}
      <Panel
        title="Traffic over time"
        subtitle={`Visitors and page views, grouped by ${range.granularity || granularity}.`}
      >
        <TrafficChart points={timeseries} granularity={range.granularity || granularity} />
      </Panel>

      {/* Acquisition panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Traffic sources" subtitle="Where visitors came from before they arrived.">
          <BarList
            rows={sources.map((s) => ({
              label: s.source || "unknown",
              value: s.visitors,
              sub: has(s.pct) ? `${fmtNum(s.pct, 1)}%` : null,
            }))}
            empty="No source data recorded in this range."
          />
        </Panel>

        <Panel title="Search engines" subtitle="Organic visits by engine.">
          <BarList
            rows={searchEngines.map((s) => ({ label: s.engine || "unknown", value: s.visitors }))}
            empty="No organic search visits in this range."
          />
        </Panel>

        <Panel
          title="Search terms"
          subtitle="Only terms the search engine passed through. Google strips these, so this list is always partial."
        >
          <BarList
            rows={searchTerms.map((s) => ({ label: s.term || "(not provided)", value: s.visitors }))}
            empty="No search terms were passed through in this range."
          />
        </Panel>

        <Panel title="AI assistants" subtitle="Visits referred by an AI answer engine, and the leads they produced.">
          <BarList
            rows={ai.map((a) => ({
              label: a.assistant || "unknown",
              value: a.visitors,
              sub: `${fmtInt(a.leads)} lead${num(a.leads) === 1 ? "" : "s"}`,
            }))}
            empty="No AI assistant referrals in this range."
          />
        </Panel>
      </div>

      {/* Geography */}
      <Panel
        title="Where visitors are"
        subtitle="Approximate, IP-derived locations. A VPN or a mobile network places a visitor in the wrong city."
        right={
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <Globe2 size={13} />
            {mappableCities === 0
              ? "No mappable cities"
              : `${fmtInt(mappableCities)} located ${mappableCities === 1 ? "city" : "cities"}`}
          </span>
        }
      >
        <div className="px-5 pb-5">
          {/* The World / India toggle lives inside WorldMap. */}
          <WorldMap
            cities={cities}
            view={mapView}
            onViewChange={setMapView}
            height={mapView === "india" ? 460 : 400}
          />
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Countries" subtitle="Approximate." className="overflow-hidden">
          <DataTable
            cols={[
              { key: "name", label: "Country", render: (r) => clip(r.name || r.code) || "Unknown" },
              { key: "visitors", label: "Visitors", align: "right", render: (r) => fmtInt(r.visitors) },
            ]}
            rows={countries}
            empty="No country data yet."
          />
        </Panel>
        <Panel title="Regions / states" subtitle="Approximate." className="overflow-hidden">
          <DataTable
            cols={[
              { key: "region", label: "Region", render: (r) => clip(r.region) || "Unknown" },
              { key: "country", label: "Country", render: (r) => clip(r.country) || "—" },
              { key: "visitors", label: "Visitors", align: "right", render: (r) => fmtInt(r.visitors) },
            ]}
            rows={regions}
            empty="No region data yet."
          />
        </Panel>
        <Panel title="Cities" subtitle="Approximate — a VPN puts a visitor in the wrong city." className="overflow-hidden">
          <DataTable
            cols={[
              { key: "city", label: "City", render: (r) => clip(r.city) || "Unknown" },
              { key: "country", label: "Country", render: (r) => clip(r.country) || "—" },
              { key: "visitors", label: "Visitors", align: "right", render: (r) => fmtInt(r.visitors) },
            ]}
            rows={cities}
            empty="No city data yet."
          />
        </Panel>
      </div>

      {/* Pages */}
      <Panel title="Top pages" subtitle="Every page that was viewed in this range." className="overflow-hidden">
        <DataTable
          cols={[
            { key: "path", label: "Path", mono: true, render: (r) => clip(r.path) || "—" },
            { key: "views", label: "Views", align: "right", render: (r) => fmtInt(r.views) },
            { key: "unique", label: "Unique", align: "right", render: (r) => fmtInt(r.unique) },
            { key: "avgTimeMs", label: "Avg time", align: "right", render: (r) => (has(r.avgTimeMs) ? fmtDuration(r.avgTimeMs) : "—") },
            { key: "avgScroll", label: "Avg scroll", align: "right", render: (r) => (has(r.avgScroll) ? `${fmtNum(r.avgScroll, 0)}%` : "—") },
            { key: "entrances", label: "Entrances", align: "right", render: (r) => fmtInt(r.entrances) },
            { key: "exits", label: "Exits", align: "right", render: (r) => fmtInt(r.exits) },
          ]}
          rows={pages}
          empty="No pageviews recorded in this range yet."
        />
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Landing pages" subtitle="The first page of a session." className="overflow-hidden">
          <DataTable
            cols={[
              { key: "path", label: "Path", mono: true, render: (r) => clip(r.path) || "—" },
              { key: "sessions", label: "Sessions", align: "right", render: (r) => fmtInt(r.sessions) },
            ]}
            rows={landingPages}
            empty="No sessions started in this range."
          />
        </Panel>
        <Panel title="Exit pages" subtitle="The last page of a session." className="overflow-hidden">
          <DataTable
            cols={[
              { key: "path", label: "Path", mono: true, render: (r) => clip(r.path) || "—" },
              { key: "exits", label: "Exits", align: "right", render: (r) => fmtInt(r.exits) },
            ]}
            rows={exitPages}
            empty="No sessions ended in this range."
          />
        </Panel>
      </div>

      {/* Lead attribution */}
      <Panel
        title="Lead attribution"
        subtitle="Which landing page a lead's session started on."
        className="overflow-hidden"
      >
        <DataTable
          cols={[
            { key: "landingPage", label: "Landing page", mono: true, render: (r) => clip(r.landingPage) || "(not recorded)" },
            { key: "leads", label: "Leads", align: "right", render: (r) => fmtInt(r.leads) },
            { key: "visitors", label: "Visitors", align: "right", render: (r) => fmtInt(r.visitors) },
            { key: "conversionRate", label: "Conversion", align: "right", render: (r) => (has(r.conversionRate) ? fmtPct(r.conversionRate) : "—") },
          ]}
          rows={leadAttribution}
          empty="No leads attributed in this range."
        />
      </Panel>

      {/* Tech */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Devices" className="overflow-hidden">
          <DataTable
            cols={[
              { key: "device", label: "Device", render: (r) => clip(r.device) || "Unknown" },
              { key: "visitors", label: "Visitors", align: "right", render: (r) => fmtInt(r.visitors) },
            ]}
            rows={devices}
            empty="No device data yet."
          />
        </Panel>
        <Panel title="Browsers" className="overflow-hidden">
          <DataTable
            cols={[
              { key: "browser", label: "Browser", render: (r) => clip(r.browser) || "Unknown" },
              { key: "visitors", label: "Visitors", align: "right", render: (r) => fmtInt(r.visitors) },
            ]}
            rows={browsers}
            empty="No browser data yet."
          />
        </Panel>
        <Panel title="Operating systems" className="overflow-hidden">
          <DataTable
            cols={[
              { key: "os", label: "OS", render: (r) => clip(r.os) || "Unknown" },
              { key: "visitors", label: "Visitors", align: "right", render: (r) => fmtInt(r.visitors) },
            ]}
            rows={os}
            empty="No OS data yet."
          />
        </Panel>
      </div>

      <p className="text-[11px] text-gray-400 text-center">
        Location figures are approximate and derived from IP address. Bots and logged-in staff are
        excluded from every figure on this page.
      </p>
    </div>
  );
};

export default SiteAnalytics;
