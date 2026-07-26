/**
 * SecurityLog.jsx — admin account security.
 *
 * Three things live here, in the order you actually need them:
 *   1. Change your own credentials (password / email / admin code). Every one of
 *      these re-verifies the current password server-side, so every form asks
 *      for it. Nothing existing is ever pre-filled or read back — the server
 *      stores hashes, not values, and this page never asks it for one.
 *   2. Active lockouts, with an unlock button.
 *   3. The login attempt log — who tried, from roughly where, on what.
 *
 * On location: the backend resolves it from the IP with geoip-lite. That is
 * city-level and approximate. A VPN, a corporate proxy or mobile carrier NAT
 * will place someone in a completely different city. Every place a location is
 * shown on this page says so. Do not treat it as evidence of where a person is.
 *
 * Endpoints (contract §4, mounted at /admin/security):
 *   POST /change-password    { currentPassword, newPassword }
 *   POST /change-email       { currentPassword, newEmail }
 *   POST /change-admin-code  { currentPassword, newAdminCode }
 *   GET  /login-log?limit=&email=
 *   GET  /locks
 *   POST /unlock             { email }
 */

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from "axios";
import {
  ShieldCheck, ShieldAlert, KeyRound, Mail, Lock, Unlock, RefreshCw,
  MapPin, Monitor, Smartphone, Tablet, Search, CheckCircle2, XCircle,
  Info, Eye, EyeOff, History, Loader2, FileClock,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";

/* ────────────────────────────────────────────────────────────────────────────
 * Formatting helpers
 * ──────────────────────────────────────────────────────────────────────────*/

const IST_TZ = "Asia/Kolkata";

/** Absolute time in IST. The server stores UTC; admins read IST. */
const fmtIst = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    timeZone: IST_TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

/**
 * City, region, country from whatever the geo lookup managed to resolve.
 *
 * The server already composes this string with `describeLocation` and sends it
 * as `approximateLocation`; prefer it so the wording cannot drift between the
 * email alerts and this page. Fall back to composing the parts locally.
 * Returns null when nothing resolved — the caller prints "Not available"
 * rather than guessing a place.
 */
const locationText = (row) => {
  if (!row) return null;
  if (typeof row.approximateLocation === "string" && row.approximateLocation.trim()) {
    return row.approximateLocation.trim();
  }
  const parts = [row.city, row.region, row.countryName || row.country].filter(
    (p) => typeof p === "string" && p.trim() !== ""
  );
  return parts.length ? parts.join(", ") : null;
};

/** typeof NaN === "number", so never gate a rendered number on typeof alone. */
const finiteOrNull = (value) => (Number.isFinite(value) ? value : null);

const deviceIcon = (device) => {
  if (device === "mobile") return Smartphone;
  if (device === "tablet") return Tablet;
  return Monitor;
};

/** Contract §2 reason values, plus the §4 credentials-changed audit entry. */
const REASON_LABEL = {
  ok: "Signed in",
  "bad-password": "Wrong password",
  "no-user": "No account with that email",
  unverified: "Account not verified",
  locked: "Blocked — already locked out",
  "credentials-changed": "Credentials changed",
};

const readList = (data, ...keys) => {
  if (Array.isArray(data)) return data;
  for (const k of keys) if (Array.isArray(data?.[k])) return data[k];
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const errText = (err, fallback) =>
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  err?.message ||
  fallback;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Length caps. These mirror routes/adminSecurity.js so the user is told what is
 * wrong here instead of collecting a 400 from the server. bcrypt itself only
 * reads the first 72 bytes of a password, so nothing longer buys any security;
 * the cap simply stops an unbounded string being posted. */
const MAX_FIELD_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 practical maximum
const MIN_PASSWORD_LENGTH = 8;
const MIN_ADMIN_CODE_LENGTH = 4;
const MAX_ADMIN_CODE_LENGTH = 64;

/* ────────────────────────────────────────────────────────────────────────────
 * The approximate-location caveat. One component so the wording can never
 * drift between the places it appears.
 * ──────────────────────────────────────────────────────────────────────────*/

const GEO_CAVEAT =
  "Locations are approximate. They are guessed from the IP address at city level — a VPN, company proxy or mobile network will report the wrong place.";

const GeoNote = ({ className }) => (
  <p className={clsx("text-[11px] text-gray-500 flex items-start gap-1.5", className)}>
    <Info size={13} className="shrink-0 mt-px text-gray-400" />
    <span>{GEO_CAVEAT}</span>
  </p>
);

/* ────────────────────────────────────────────────────────────────────────────
 * Credential forms
 *
 * One component, three configurations. Each holds its own values, its own
 * validation and its own success/error state, so a failure in one form never
 * clears or confuses another.
 * ──────────────────────────────────────────────────────────────────────────*/

const CredentialForm = ({
  icon: Icon,
  title,
  description,
  path,
  fields,
  validate,
  buildBody,
  submitLabel,
  successFallback,
  api,
  token,
  onChanged,
}) => {
  // `fields` is a literal in the parent, so its identity changes every render;
  // memoising on it would recompute anyway. Three keys is cheaper than the memo.
  const blank = Object.fromEntries(fields.map((f) => [f.name, ""]));

  const [values, setValues] = useState(blank);
  const [touched, setTouched] = useState({});
  const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // { ok: boolean, message: string }

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (result) setResult(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));
    if (hasErrors) return;

    setBusy(true);
    setResult(null);
    try {
      const res = await axios.post(`${api}/admin/security/${path}`, buildBody(values), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult({ ok: true, message: res.data?.message || successFallback });
      setValues(blank); // never leave a typed secret sitting in the DOM
      setTouched({});
      setReveal(false);
      onChanged?.();
    } catch (err) {
      setResult({ ok: false, message: errText(err, "Could not save the change. Please try again.") });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate /* our own validation runs; don't let the browser pre-empt it */
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col"
    >
      <div className="flex items-start gap-3">
        <span className="p-2 rounded-lg bg-gray-100 text-gray-700 shrink-0">
          <Icon size={16} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 flex-1">
        {fields.map((f) => {
          const err = touched[f.name] ? errors[f.name] : null;
          const isSecret = f.type === "secret";
          return (
            <div key={f.name}>
              <label
                htmlFor={`${path}-${f.name}`}
                className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1"
              >
                {f.label}
              </label>
              <div className="relative">
                <input
                  id={`${path}-${f.name}`}
                  name={f.name}
                  type={isSecret ? (reveal ? "text" : "password") : f.type}
                  value={values[f.name] ?? ""}
                  onChange={(e) => setField(f.name, e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, [f.name]: true }))}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  maxLength={f.maxLength ?? MAX_FIELD_LENGTH}
                  spellCheck={false}
                  disabled={busy}
                  className={clsx(
                    "w-full px-3 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 disabled:bg-gray-50",
                    isSecret && "pr-10",
                    err
                      ? "border-rose-300 focus:ring-rose-500/15"
                      : "border-gray-200 focus:ring-gray-900/10"
                  )}
                />
                {isSecret && (
                  <button
                    type="button"
                    onClick={() => setReveal((v) => !v)}
                    tabIndex={-1}
                    aria-label={reveal ? "Hide what you typed" : "Show what you typed"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  >
                    {reveal ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                )}
              </div>
              {err ? (
                <p className="text-[11px] text-rose-600 mt-1">{err}</p>
              ) : f.hint ? (
                <p className="text-[11px] text-gray-400 mt-1">{f.hint}</p>
              ) : null}
            </div>
          );
        })}
      </div>

      {result && (
        <div
          className={clsx(
            "mt-4 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-xs",
            result.ok
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-700"
          )}
          role="status"
        >
          {result.ok ? (
            <CheckCircle2 size={14} className="shrink-0 mt-px" />
          ) : (
            <XCircle size={14} className="shrink-0 mt-px" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
        {busy ? "Saving…" : submitLabel}
      </button>
    </form>
  );
};

/* ────────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────────*/

const LIMITS = [100, 250, 500];

const SecurityLog = () => {
  // useAuth() is null outside the provider; destructuring that would throw and
  // take the whole page down rather than showing a sign-in prompt.
  const { token, loading: authLoading } = useAuth() || {};
  // Falling back to "" keeps the path relative (AuthContext sets axios'
  // baseURL) instead of building the literal URL "undefined/admin/security/…".
  const API = import.meta.env.VITE_API_URL || "";

  const [attempts, setAttempts] = useState([]);
  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [unlocking, setUnlocking] = useState(null);
  const [unlockNote, setUnlockNote] = useState(null); // { ok, message }

  const [mode, setMode] = useState("all"); // 'all' | 'failed'
  const [emailFilter, setEmailFilter] = useState("");
  const [serverEmail, setServerEmail] = useState(""); // debounced, exact address only
  const [limit, setLimit] = useState(LIMITS[0]);

  // §4 exposes GET /login-log?email=, and the server matches it exactly. Once
  // the box holds a complete address, ask the server for that address so the
  // whole history is searched instead of only the rows already loaded.
  useEffect(() => {
    const typed = emailFilter.trim().toLowerCase();
    const exact = typed.length <= MAX_EMAIL_LENGTH && EMAIL_RE.test(typed) ? typed : "";
    if (exact === serverEmail) return;
    const t = setTimeout(() => setServerEmail(exact), 400);
    return () => clearTimeout(t);
  }, [emailFilter, serverEmail]);

  const authHeader = useMemo(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  );

  // Guards every setState that follows an await: a slow earlier request must
  // never overwrite the results of a newer one, and nothing may write to a
  // component that has been unmounted.
  const reqSeq = useRef(0);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const load = useCallback(
    async ({ quiet = false } = {}) => {
      if (!token) {
        // Nothing to fetch. Leaving `loading` true here would strand the page
        // on its spinner forever.
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const seq = ++reqSeq.current;
      quiet ? setRefreshing(true) : setLoading(true);

      // The server matches ?email= exactly, so only send a complete address.
      // A partial string stays a client-side filter over what is loaded.
      const params = { limit };
      if (serverEmail) params.email = serverEmail;

      try {
        const [logRes, lockRes] = await Promise.all([
          axios.get(`${API}/admin/security/login-log`, { ...authHeader, params }),
          axios.get(`${API}/admin/security/locks`, authHeader),
        ]);
        if (!alive.current || seq !== reqSeq.current) return;
        setAttempts(readList(logRes.data, "attempts", "log", "logins"));
        setLocks(readList(lockRes.data, "locks", "active"));
        setError("");
      } catch (err) {
        if (!alive.current || seq !== reqSeq.current) return;
        setError(errText(err, "Could not load the security log."));
      } finally {
        if (alive.current && seq === reqSeq.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [API, authHeader, limit, serverEmail, token]
  );

  useEffect(() => {
    if (authLoading) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, token, limit, serverEmail]);

  const unlock = async (entry) => {
    const email = entry?.email;
    if (!email) return;
    if (
      !window.confirm(
        `Unlock ${email}?\n\nThis clears the failed-attempt streak so sign-in is allowed again immediately.`
      )
    )
      return;

    setUnlocking(entry.ipHash ? `${email}:${entry.ipHash}` : email);
    setUnlockNote(null);
    try {
      const res = await axios.post(
        `${API}/admin/security/unlock`,
        { email },
        authHeader
      );
      if (!alive.current) return;
      setUnlockNote({ ok: true, message: res.data?.message || `Unlocked ${email}.` });
      await load({ quiet: true });
    } catch (err) {
      if (!alive.current) return;
      setUnlockNote({ ok: false, message: errText(err, "Could not unlock. Please try again.") });
    } finally {
      if (alive.current) setUnlocking(null);
    }
  };

  /* ── Derived ────────────────────────────────────────────────────────────*/

  const failureCount = useMemo(
    () => attempts.filter((a) => !a.success).length,
    [attempts]
  );

  const filtered = useMemo(() => {
    const q = emailFilter.trim().toLowerCase();
    return attempts.filter((a) => {
      if (mode === "failed" && a.success) return false;
      if (!q) return true;
      return (a.email || "").toLowerCase().includes(q);
    });
  }, [attempts, mode, emailFilter]);

  const noneLogged = attempts.length === 0;

  /* ── Form configs ───────────────────────────────────────────────────────*/

  const formCommon = { api: API, token, onChanged: () => load({ quiet: true }) };

  /* ── Render ─────────────────────────────────────────────────────────────*/

  // Every route here needs a JWT. Without one there is nothing to show and
  // nothing to change, so say that instead of spinning indefinitely.
  if (!authLoading && !token) {
    return (
      <div className="max-w-md mx-auto mt-16 rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <ShieldAlert size={22} className="mx-auto text-gray-300 mb-3" />
        <p className="text-sm font-medium text-gray-800">You are signed out.</p>
        <p className="text-xs text-gray-500 mt-1">
          Sign in again to view the security log or change your credentials.
        </p>
      </div>
    );
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <RefreshCw className="animate-spin mr-2" size={18} /> Loading security log…
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-8 md:pt-4 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Security</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Change your sign-in credentials, and see every attempt to sign in to this panel.
          </p>
        </div>
        <button
          onClick={() => load({ quiet: true })}
          disabled={refreshing}
          className="inline-flex items-center px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw size={16} className={clsx("mr-2", refreshing && "animate-spin")} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      )}

      {/* ── Credential changes ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <KeyRound size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Change your credentials</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Each change re-checks your current password before it is applied. Existing values are
          stored hashed and are never shown here. Changing a credential does not end sessions that
          are already signed in — their tokens stay valid until they expire, up to 24 hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <CredentialForm
            {...formCommon}
            icon={Lock}
            title="Password"
            description="Used to sign in to this panel."
            path="change-password"
            submitLabel="Update password"
            successFallback="Password updated."
            fields={[
              {
                name: "currentPassword",
                label: "Current password",
                type: "secret",
                placeholder: "Enter your current password",
                autoComplete: "current-password",
              },
              {
                name: "newPassword",
                label: "New password",
                type: "secret",
                placeholder: `At least ${MIN_PASSWORD_LENGTH} characters`,
                autoComplete: "new-password",
                hint: `Minimum ${MIN_PASSWORD_LENGTH} characters, and different from your current one.`,
              },
              {
                name: "confirmPassword",
                label: "Confirm new password",
                type: "secret",
                placeholder: "Type it again",
                autoComplete: "new-password",
              },
            ]}
            validate={(v) => {
              const e = {};
              if (!v.currentPassword) e.currentPassword = "Enter your current password.";
              if (!v.newPassword) e.newPassword = "Enter a new password.";
              else if (v.newPassword.length < MIN_PASSWORD_LENGTH)
                e.newPassword = `Must be at least ${MIN_PASSWORD_LENGTH} characters.`;
              else if (v.newPassword === v.currentPassword)
                e.newPassword = "Must be different from your current password.";
              if (!v.confirmPassword) e.confirmPassword = "Confirm the new password.";
              else if (v.confirmPassword !== v.newPassword)
                e.confirmPassword = "The two passwords do not match.";
              return e;
            }}
            buildBody={(v) => ({
              currentPassword: v.currentPassword,
              newPassword: v.newPassword,
            })}
          />

          <CredentialForm
            {...formCommon}
            icon={Mail}
            title="Sign-in email"
            description="The address you sign in with."
            path="change-email"
            submitLabel="Update email"
            successFallback="Sign-in email updated."
            fields={[
              {
                name: "currentPassword",
                label: "Current password",
                type: "secret",
                placeholder: "Enter your current password",
                autoComplete: "current-password",
              },
              {
                name: "newEmail",
                label: "New email address",
                type: "email",
                placeholder: "you@example.com",
                autoComplete: "off",
                maxLength: MAX_EMAIL_LENGTH,
                hint: "You will sign in with this address from now on.",
              },
            ]}
            validate={(v) => {
              const e = {};
              if (!v.currentPassword) e.currentPassword = "Enter your current password.";
              const email = (v.newEmail || "").trim();
              if (!email) e.newEmail = "Enter the new email address.";
              else if (email.length > MAX_EMAIL_LENGTH)
                e.newEmail = "That email address is too long.";
              else if (!EMAIL_RE.test(email))
                e.newEmail = "That does not look like a valid email address.";
              return e;
            }}
            buildBody={(v) => ({
              currentPassword: v.currentPassword,
              newEmail: v.newEmail.trim().toLowerCase(),
            })}
          />

          <CredentialForm
            {...formCommon}
            icon={ShieldCheck}
            title="Admin code"
            description="The code required to create a new admin account."
            path="change-admin-code"
            submitLabel="Update admin code"
            successFallback="Admin code updated."
            fields={[
              {
                name: "currentPassword",
                label: "Current password",
                type: "secret",
                placeholder: "Enter your current password",
                autoComplete: "current-password",
              },
              {
                name: "newAdminCode",
                label: "New admin code",
                type: "secret",
                placeholder: `${MIN_ADMIN_CODE_LENGTH}–${MAX_ADMIN_CODE_LENGTH} characters`,
                autoComplete: "new-password",
                maxLength: MAX_ADMIN_CODE_LENGTH,
                hint: "Stored hashed. It cannot be read back — write it down before you save.",
              },
              {
                name: "confirmAdminCode",
                label: "Confirm new admin code",
                type: "secret",
                placeholder: "Type it again",
                autoComplete: "new-password",
                maxLength: MAX_ADMIN_CODE_LENGTH,
              },
            ]}
            validate={(v) => {
              const e = {};
              if (!v.currentPassword) e.currentPassword = "Enter your current password.";
              // The server trims and then enforces 4–64; validate the trimmed
              // value so the two agree on what counts as long enough.
              const code = (v.newAdminCode || "").trim();
              if (!code) e.newAdminCode = "Enter a new admin code.";
              else if (code.length < MIN_ADMIN_CODE_LENGTH)
                e.newAdminCode = `Must be at least ${MIN_ADMIN_CODE_LENGTH} characters.`;
              else if (code.length > MAX_ADMIN_CODE_LENGTH)
                e.newAdminCode = `Must be ${MAX_ADMIN_CODE_LENGTH} characters or fewer.`;
              if (!v.confirmAdminCode) e.confirmAdminCode = "Confirm the new admin code.";
              else if (v.confirmAdminCode !== v.newAdminCode)
                e.confirmAdminCode = "The two codes do not match.";
              return e;
            }}
            buildBody={(v) => ({
              currentPassword: v.currentPassword,
              newAdminCode: v.newAdminCode.trim(),
            })}
          />
        </div>
      </section>

      {/* ── Active locks ───────────────────────────────────────────────── */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <ShieldAlert size={15} className="text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">Active locks</h2>
          </div>
          {locks.length > 0 && (
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-full px-2.5 py-1">
              {locks.length} locked
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-4">
          A lock applies to one email from one place at a time, so someone attacking your account
          cannot lock you out of your own. Unlocking clears the failed-attempt streak.
        </p>

        {locks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
            <Unlock size={20} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">Nothing is locked right now.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {locks.map((l, i) => {
              const key = `${l.email || "unknown"}:${l.ipHash || i}`;
              const busy = unlocking === (l.ipHash ? `${l.email}:${l.ipHash}` : l.email);
              const place = locationText(l);
              const failures = finiteOrNull(l.failures);
              const minutesLeft = finiteOrNull(l.minutesLeft);
              return (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between rounded-xl border border-rose-200 bg-rose-50/60 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {l.email || "(email not recorded)"}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {failures !== null && (
                        <>
                          {failures} failed {failures === 1 ? "attempt" : "attempts"}
                          <span className="text-gray-300 mx-1.5">·</span>
                        </>
                      )}
                      {l.until ? (
                        <>Locked until {fmtIst(l.until)} IST</>
                      ) : (
                        <>Locked</>
                      )}
                      {minutesLeft !== null && minutesLeft > 0 && (
                        <>
                          <span className="text-gray-300 mx-1.5">·</span>
                          {minutesLeft} min left
                        </>
                      )}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                      <MapPin size={11} className="text-gray-400 shrink-0" />
                      Approximate location: {place || "not available"}
                      {l.ipHash && (
                        <span className="font-mono text-gray-400 ml-1">#{String(l.ipHash).slice(0, 8)}</span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => unlock(l)}
                    disabled={busy || !l.email}
                    className="shrink-0 inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition disabled:opacity-50"
                  >
                    {busy ? <Loader2 size={14} className="animate-spin" /> : <Unlock size={14} />}
                    {busy ? "Unlocking…" : "Unlock"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {unlockNote && (
          <div
            className={clsx(
              "mt-3 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-xs",
              unlockNote.ok
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-700"
            )}
            role="status"
          >
            {unlockNote.ok ? (
              <CheckCircle2 size={14} className="shrink-0 mt-px" />
            ) : (
              <XCircle size={14} className="shrink-0 mt-px" />
            )}
            <span>{unlockNote.message}</span>
          </div>
        )}

        <GeoNote className="mt-3" />
      </section>

      {/* ── Login attempt log ──────────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <History size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Login attempts</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 self-start">
            {[
              { id: "all", label: `All (${attempts.length})` },
              { id: "failed", label: `Failures only (${failureCount})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setMode(t.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition",
                  mode === t.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              placeholder="Filter by email…"
              maxLength={MAX_EMAIL_LENGTH}
              spellCheck={false}
              aria-label="Filter attempts by email"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
            aria-label="How many attempts to load"
          >
            {LIMITS.map((n) => (
              <option key={n} value={n}>
                Load {n}
              </option>
            ))}
          </select>
        </div>

        {emailFilter.trim() !== "" && (
          <p className="text-[11px] text-gray-500">
            {serverEmail
              ? `Searching the full history for ${serverEmail}.`
              : "Matching within the loaded attempts only — type a complete email address to search the full history."}
          </p>
        )}

        <GeoNote />

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    "Time (IST)",
                    "Email",
                    "Result",
                    "Reason",
                    "Approximate location",
                    "Device / browser / OS",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {noneLogged && (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <FileClock size={22} className="mx-auto text-gray-300 mb-3" />
                      {/* With a server-side email query in force, an empty result
                          means "none for that address" — not "none at all". */}
                      {serverEmail ? (
                        <>
                          <p className="text-sm text-gray-600 font-medium">
                            No login attempts recorded for {serverEmail}.
                          </p>
                          <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                            Clear the filter to see attempts against other addresses.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600 font-medium">
                            No login attempts have been logged yet.
                          </p>
                          <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                            Every sign-in — successful or failed — will appear here from the next
                            attempt onwards, with the time, the approximate location and the device
                            used.
                          </p>
                        </>
                      )}
                    </td>
                  </tr>
                )}

                {!noneLogged && filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-14 text-center text-gray-400">
                      No attempts match these filters.
                    </td>
                  </tr>
                )}

                {filtered.map((a, i) => {
                  const failed = !a.success;
                  const audit = a.reason === "credentials-changed";
                  const place = locationText(a);
                  const DeviceIcon = deviceIcon(a.device);
                  return (
                    <tr
                      key={a._id || `${a.email}-${a.createdAt}-${i}`}
                      className={clsx(
                        "border-b border-gray-50",
                        failed
                          ? "bg-rose-50/50 hover:bg-rose-50 border-l-2 border-l-rose-400"
                          : "hover:bg-gray-50/50"
                      )}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                        {fmtIst(a.createdAt)}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={clsx(
                            "font-medium truncate block max-w-[220px]",
                            failed ? "text-rose-900" : "text-gray-900"
                          )}
                          title={a.email || ""}
                        >
                          {a.email || "—"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {audit ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border bg-slate-50 text-slate-700 border-slate-200">
                            <KeyRound size={10} /> Audit
                          </span>
                        ) : failed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border bg-rose-100 text-rose-700 border-rose-200">
                            <XCircle size={10} /> Failed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                            <CheckCircle2 size={10} /> Success
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                        {REASON_LABEL[a.reason] || a.reason || "—"}
                      </td>

                      <td className="px-4 py-3">
                        {place ? (
                          <div className="flex items-start gap-1.5">
                            <MapPin size={12} className="text-gray-400 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs text-gray-700 truncate max-w-[220px]" title={place}>
                                {place}
                              </div>
                              <div className="text-[10px] text-gray-400">approximate</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Not available</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-700">
                          <DeviceIcon size={13} className="text-gray-400 shrink-0" />
                          <span className="capitalize">{a.device || "unknown device"}</span>
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {[a.browser, a.os].filter(Boolean).join(" · ") || "Not recorded"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {!noneLogged && (
          <p className="text-xs text-gray-400 text-center">
            Showing {filtered.length} of {attempts.length} loaded{" "}
            {attempts.length === 1 ? "attempt" : "attempts"}
            {attempts.length >= limit && " · increase the load count to see older ones"}
          </p>
        )}
      </section>
    </div>
  );
};

export default SecurityLog;
