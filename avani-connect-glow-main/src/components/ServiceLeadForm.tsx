/**
 * ServiceLeadForm — the enquiry form that sits on every service page.
 *
 * WHY IT IS NOT THE CONTACT FORM
 * ------------------------------
 * /contact lists all 39 services because someone landing there could want any
 * of them. On a service page we already know why the visitor is here, and
 * showing them 39 chips to find the four that matter is friction for no gain.
 *
 * So: the services related to THIS page are shown open. Everything else sits
 * behind one "I need something else" disclosure. Nobody loses an option, and
 * the common case is three taps instead of a scroll.
 *
 * Three fields, not six. This form appears above the fold on a page someone is
 * still evaluating — every extra field costs completions at exactly the moment
 * intent is weakest. Name, phone and what they need is enough to call back;
 * email is optional and the rest is gathered on the call, where it is cheap.
 */

import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, Send, Plus, Minus } from 'lucide-react';
import { getBackendUrl, pageAttribution } from '../lib/api';
import { trackLead, leadAttributionFields } from '../lib/leadTracking';
import { SERVICE_GROUPS, NOT_SURE } from '../data/contactServices';

interface Props {
  /** Service page slug — becomes the lead `source`, so reporting can attribute by page. */
  source: string;
  /** Shown as chips, open by default. Must match SERVICES[].name. */
  related?: string[];
  heading?: string;
  sub?: string;
  /** `hero` sits on a dark ground; `inline` on the light one. */
  variant?: 'hero' | 'inline';
}

type Errors = Partial<Record<'name' | 'phone' | 'service', string>>;

const ALL = SERVICE_GROUPS.flatMap((g) => g.items);

export default function ServiceLeadForm({ source, related = [], heading, sub, variant = 'hero' }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [services, setServices] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Related first; everything else stays available behind the disclosure.
  const primary = useMemo(() => related.filter((r) => ALL.includes(r)), [related]);
  const rest = useMemo(
    () => SERVICE_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => !primary.includes(i)) })).filter((g) => g.items.length),
    [primary]
  );

  const set = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k as keyof Errors]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const toggle = (s: string) => {
    setServices((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
    if (errors.service) setErrors((p) => ({ ...p, service: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const err: Errors = {};
    if (form.name.trim().length < 2) err.name = 'Please enter your name.';
    if (form.phone.replace(/\D/g, '').length < 7) err.phone = 'Please enter a number we can reach you on.';
    if (!services.length) err.service = 'Pick at least one.';
    setErrors(err);
    if (Object.keys(err).length) {
      if (err.name) nameRef.current?.focus();
      else if (err.phone) phoneRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${getBackendUrl().replace(/\/$/, '')}/submit-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          service: services,
          services,
          source,
          ...pageAttribution(),
          ...leadAttributionFields(),
        }),
      });
      if (!res.ok) {
        setApiError('That did not send. Please try again, or call +91 84487 63134.');
        setLoading(false);
        return;
      }
      trackLead({ service: services, formName: source });
      navigate('/thank-you', { state: { name: form.name.trim(), service: services } });
    } catch {
      setApiError('We could not reach the server. Please try again, or call +91 84487 63134.');
      setLoading(false);
    }
  };

  const dark = variant === 'hero';

  const label: React.CSSProperties = {
    display: 'block', fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.13em',
    textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '0.4rem',
  };
  const input: React.CSSProperties = {
    width: '100%', padding: '0.72rem 0.9rem', borderRadius: '9px', fontSize: '0.92rem',
    fontFamily: 'inherit', fontWeight: 500, outline: 'none', transition: 'border-color .2s',
    background: dark ? 'rgba(255,255,255,0.04)' : 'var(--bg-primary)',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : 'var(--border-light)'}`,
    color: dark ? '#f5f1e8' : 'var(--text-primary)',
  };
  const err: React.CSSProperties = { color: dark ? '#ff9c8f' : '#c0392b', fontSize: '0.75rem', marginTop: '.3rem', fontWeight: 600 };

  const chip = (s: string, dashed = false) => {
    const on = services.includes(s);
    return (
      <button
        key={s}
        type="button"
        onClick={() => toggle(s)}
        aria-pressed={on}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          padding: '.38rem .68rem', borderRadius: '999px', cursor: 'pointer',
          fontSize: '0.76rem', fontWeight: 600, fontFamily: 'inherit', lineHeight: 1.3,
          border: `1px ${dashed ? 'dashed' : 'solid'} ${on ? 'var(--accent-primary)' : dark ? 'rgba(255,255,255,0.2)' : 'var(--border-light)'}`,
          background: on ? 'var(--accent-primary)' : 'transparent',
          color: on ? '#1a1305' : dark ? '#e8e2d5' : 'var(--text-secondary)',
          transition: 'background .16s, border-color .16s, color .16s',
        }}
      >
        {on && <Check size={11} aria-hidden="true" />}
        {s}
      </button>
    );
  };

  return (
    <div
      style={{
        background: dark ? 'rgba(20,16,10,0.72)' : 'var(--card-bg)',
        backdropFilter: dark ? 'blur(14px)' : undefined,
        border: `1px solid ${dark ? 'rgba(196,145,58,0.35)' : 'var(--border-light)'}`,
        borderRadius: '18px',
        padding: 'clamp(1.15rem, 3vw, 1.75rem)',
      }}
    >
      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 800, margin: '0 0 .3rem', color: dark ? '#f7f3ea' : 'var(--text-primary)', lineHeight: 1.25 }}>
        {heading || 'Get a free scoping call'}
      </h2>
      <p style={{ fontSize: '0.85rem', margin: '0 0 1.25rem', color: dark ? 'rgba(240,235,225,0.75)' : 'var(--text-secondary)', lineHeight: 1.55 }}>
        {sub || 'Tell us what you need and we will call you back within one working day. No obligation, and you get a written quote.'}
      </p>

      <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor={`${source}-name`} style={label}>Your name</label>
          <input
            id={`${source}-name`} ref={nameRef} value={form.name} autoComplete="name"
            onChange={(e) => set('name', e.target.value)} placeholder="Priya Sharma"
            aria-invalid={!!errors.name || undefined}
            style={errors.name ? { ...input, borderColor: '#c0392b' } : input}
          />
          {errors.name && <p role="alert" style={err}>{errors.name}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }} className="slf-row">
          <div>
            <label htmlFor={`${source}-phone`} style={label}>Phone</label>
            <input
              id={`${source}-phone`} ref={phoneRef} type="tel" value={form.phone} autoComplete="tel"
              onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210"
              aria-invalid={!!errors.phone || undefined}
              style={errors.phone ? { ...input, borderColor: '#c0392b' } : input}
            />
            {errors.phone && <p role="alert" style={err}>{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor={`${source}-email`} style={label}>
              Email <span style={{ textTransform: 'none', letterSpacing: 0, opacity: .65 }}>(optional)</span>
            </label>
            <input
              id={`${source}-email`} type="email" value={form.email} autoComplete="email"
              onChange={(e) => set('email', e.target.value)} placeholder="priya@company.com" style={input}
            />
          </div>
        </div>

        <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
          <legend style={{ ...label, padding: 0 }}>What do you need?</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem', marginTop: '.15rem' }}>
            {primary.map((s) => chip(s))}
            {chip(NOT_SURE, true)}
          </div>

          {rest.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '.7rem',
                  background: 'transparent', border: 0, cursor: 'pointer', padding: 0,
                  fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 700,
                  color: 'var(--accent-primary)',
                }}
              >
                {showAll ? <Minus size={13} aria-hidden="true" /> : <Plus size={13} aria-hidden="true" />}
                {showAll ? 'Hide other services' : 'I need something else'}
              </button>

              {showAll && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem', marginTop: '.7rem' }}>
                  {rest.map((g) => (
                    <div key={g.label}>
                      <div style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.35rem', color: dark ? 'rgba(240,235,225,0.55)' : 'var(--text-tertiary)' }}>
                        {g.label}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                        {g.items.map((s) => chip(s))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {errors.service && <p role="alert" style={err}>{errors.service}</p>}
        </fieldset>

        {apiError && <p role="alert" style={{ ...err, marginTop: 0 }}>{apiError}</p>}

        <button
          type="submit" disabled={loading} className="dh-btn-fill"
          style={{ width: '100%', justifyContent: 'center', height: '50px', cursor: loading ? 'wait' : 'pointer', opacity: loading ? .75 : 1 }}
        >
          {loading ? <><Loader2 size={16} className="slf-spin" aria-hidden="true" /> Sending…</> : <><Send size={16} aria-hidden="true" /> Request a call back</>}
        </button>

        <p style={{ fontSize: '0.72rem', textAlign: 'center', margin: 0, lineHeight: 1.5, color: dark ? 'rgba(240,235,225,0.55)' : 'var(--text-tertiary)' }}>
          We only use this to reply to your enquiry.
        </p>
      </form>

      <style>{`
        .slf-spin { animation: slf-spin .9s linear infinite; }
        @keyframes slf-spin { to { transform: rotate(360deg); } }
        @media (max-width: 420px) { .slf-row { grid-template-columns: 1fr !important; } }
        @media (prefers-reduced-motion: reduce) { .slf-spin { animation-duration: 2.4s; } }
      `}</style>
    </div>
  );
}
