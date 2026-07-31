/**
 * /contact
 *
 * WHAT CHANGED AND WHY
 * --------------------
 * 1. The service picker was a custom dropdown you had to click a chevron to
 *    close. It trapped people: no click-outside, no Escape, not reachable by
 *    keyboard, and it hid its options behind a control styled like a text
 *    field. It is now an inline chip grid — every option visible, tap to
 *    toggle, no open/close state to get stuck in.
 *
 * 2. Those options covered 10 of the 39 services we actually sell. Anyone
 *    wanting Shopify, a voice agent or an HRMS had to pick "Other". The full
 *    catalogue now lives in src/data/contactServices.ts, grouped the way
 *    buyers think rather than the way our URLs are organised.
 *
 * 3. The form never fired a lead event. It posts to /avani-form, and unlike
 *    BusinessSetup3Form it called neither trackLead() nor
 *    leadAttributionFields(). Every enquiry from this page — the highest-intent
 *    page on the site — was invisible to GA4, Google Ads and Meta.
 *
 * 4. It claimed an office in Australia ("Global Outreach — Strategic Liaison").
 *    offices.js has no such entry and llms.txt states we hold none. Offices
 *    here now mirror the three `confirmed` entries in offices.js. Claiming
 *    premises you do not staff is how a Google Business Profile gets suspended.
 *
 * 5. Copy was sci-fi ("Electronic Mail", "Direct Transmission", "TRANSMISSION
 *    RECEIVED", "INITIATING…"). It read as a theme demo rather than a company
 *    you would wire money to.
 *
 * 6. Errors used alert(). They are now inline, tied to their field, announced
 *    to screen readers, and the first bad field takes focus.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, Check, Loader2, Clock, ArrowUpRight } from 'lucide-react';
import { getBackendUrl, pageAttribution } from '../lib/api';
import { trackLead, leadAttributionFields } from '../lib/leadTracking';
import { SERVICE_GROUPS, NOT_SURE } from '../data/contactServices';
import '../components/Home.css';

/* ── Facts ──────────────────────────────────────────────────────────────────
   Mirrors src/data/offices.js. Only `confirmed` premises appear — Noida and
   Dubai are markets we sell into, not addresses we hold.                    */
const PHONE_DISPLAY = '+91 84487 63134';
const PHONE_E164 = '+918448763134';
// Second line. Still live — it is just no longer the number we lead with.
const PHONE2_DISPLAY = '+91 92536 25099';
const PHONE2_E164 = '+919253625099';
const EMAIL = 'kp@avanienterprises.in';
const HOURS = 'Monday to Saturday, 9:00am – 7:00pm IST';

const OFFICES = [
  {
    city: 'Gurugram',
    role: 'Head office',
    address: 'Tower B, 3rd Floor, Unitech Cyber Park, Durga Colony, Sector 39, Gurugram, Haryana 122002',
    map: 'https://maps.google.com/?q=Unitech+Cyber+Park+Sector+39+Gurugram+Haryana+122002',
  },
  {
    city: 'Mumbai',
    role: 'Office',
    address: 'Third Floor, Vasudev Chamber, Teli Galli Cross Rd, Natwar Nagar, Andheri East, Mumbai, Maharashtra 400069',
    map: 'https://maps.google.com/?q=Vasudev+Chamber+Teli+Galli+Cross+Road+Andheri+East+Mumbai+400069',
  },
  {
    city: 'Rohtak',
    role: 'Office',
    address: '106, First Floor, Agro Mall, Rohtak, Haryana',
    map: 'https://maps.google.com/?q=Agro+Mall+Rohtak+Haryana',
  },
];

/* Kept in sync with STATIC_PAGES.contact in src/data/serviceContent.js, which
   is what api/seo.js server-renders and turns into FAQPage schema. Edit one,
   edit the other — `npm run verify:seo` fails if they drift. */
const FAQS = [
  {
    q: 'How quickly do you respond?',
    a: 'Within one working day. If it is urgent, calling is faster than the form — the number reaches the team directly, not a switchboard.',
  },
  {
    q: 'Do you charge for the first call?',
    a: 'No. The first call is a scoping conversation, not a sales pitch. You leave it with a written scope and a quote, and there is no obligation to proceed.',
  },
  {
    q: 'What do you need from me to quote?',
    a: 'What you are trying to achieve, anything you have already tried, a rough budget range and your deadline. You do not need a specification — writing one is usually part of the work.',
  },
  {
    q: 'Do you work with businesses outside Delhi NCR?',
    a: 'Yes. We have offices in Gurugram, Mumbai and Rohtak, and deliver remotely across India and internationally, including the UAE, Singapore and the USA. Reviews happen over video where meeting in person is not practical.',
  },
  {
    q: 'What does a project cost?',
    a: 'It depends on scope, and we will not pretend otherwise. We quote per engagement after the scoping call rather than publishing a price that turns out not to apply to you. Our guide on website development cost sets out what actually drives the number.',
  },
  {
    q: 'Who will I be talking to?',
    a: 'The people who would do the work. There is no separate sales team handing you over to delivery after signature.',
  },
];

/* ── Visual helpers, unchanged from the site's existing language ─────────── */
const Grain = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const GridBg = ({ size = 40, opacity = 0.06 }: { size?: number; opacity?: number }) => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: 'linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)', backgroundSize: `${size}px ${size}px` }} />
);
const LuxuryLine = () => (
  <div aria-hidden="true" style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 20%, var(--accent-light) 50%, var(--accent-primary) 80%, transparent)', opacity: 0.3 }} />
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type FieldKey = 'name' | 'email' | 'phone' | 'company' | 'message';
type Errors = Partial<Record<'name' | 'email' | 'phone' | 'service', string>>;

const Contact = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState<Record<FieldKey, string>>({ name: '', email: '', phone: '', company: '', message: '' });
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const set = (k: FieldKey, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k as keyof Errors]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const toggleService = (s: string) => {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    if (errors.service) setErrors((p) => ({ ...p, service: undefined }));
  };

  const selectedLabel = useMemo(() => {
    if (!services.length) return 'none selected yet';
    if (services.length === 1) return services[0];
    return `${services.length} selected`;
  }, [services]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Please enter an email we can reply to.';
    // Deliberately loose: people write numbers with spaces, dashes and +91.
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Please enter a number we can reach you on.';
    if (!services.length) e.service = 'Pick at least one, or choose "Not sure yet".';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setApiError(null);

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      // Send focus to the first problem rather than leaving people hunting.
      if (e.name) nameRef.current?.focus();
      else if (e.email) emailRef.current?.focus();
      else if (e.phone) phoneRef.current?.focus();
      else if (e.service) serviceRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${getBackendUrl().replace(/\/$/, '')}/avani-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name.trim(),
          email: form.email.trim(),
          phoneNu: form.phone.trim(),
          companyName: form.company.trim(),
          service: services.join(', '),
          projectDetails: form.message.trim(),
          source: 'contact_page',
          ...pageAttribution(),
          // First-touch campaign data. Without it, a visitor who lands on a
          // guide and converts here is recorded as "direct".
          ...leadAttributionFields(),
        }),
      });

      if (!res.ok) {
        setApiError(`That did not go through. Please try again, or call us on ${PHONE_DISPLAY}.`);
        setIsLoading(false);
        return;
      }

      // Fires only on a confirmed submission, so GA4 matches the CRM.
      trackLead({ service: services, formName: 'contact_page' });
      navigate('/thank-you', { state: { name: form.name.trim(), service: services } });
    } catch {
      setApiError(`We could not reach the server. Please try again, or email ${EMAIL}.`);
      setIsLoading(false);
    }
  };

  /* ── styles ───────────────────────────────────────────────────────────── */
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-primary)',
    textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem',
  };
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem', background: 'var(--bg-primary)',
    border: '1px solid var(--border-light)', borderRadius: '10px', color: 'var(--text-primary)',
    fontSize: '0.95rem', fontWeight: 500, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color .2s',
  };
  const errText: React.CSSProperties = { color: '#c0392b', fontSize: '0.78rem', marginTop: '0.35rem', fontWeight: 600 };
  const cardStyle: React.CSSProperties = {
    background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '14px',
    padding: '1.15rem 1.25rem', transition: 'border-color .25s',
  };

  const field = (
    id: string,
    text: string,
    key: FieldKey,
    opts: { type?: string; placeholder?: string; required?: boolean; inputRef?: React.RefObject<HTMLInputElement>; autoComplete?: string } = {}
  ) => {
    const bad = !!errors[key as keyof Errors];
    return (
      <div>
        <label htmlFor={id} style={labelStyle}>
          {text}
          {!opts.required && (
            <span style={{ color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}> (optional)</span>
          )}
        </label>
        <input
          id={id}
          ref={opts.inputRef}
          type={opts.type || 'text'}
          name={key}
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
          placeholder={opts.placeholder}
          autoComplete={opts.autoComplete}
          aria-invalid={bad || undefined}
          aria-describedby={bad ? `${id}-err` : undefined}
          style={bad ? { ...inputStyle, borderColor: '#c0392b' } : inputStyle}
          onFocus={(e) => { if (!bad) e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
          onBlur={(e) => { if (!bad) e.currentTarget.style.borderColor = 'var(--border-light)'; }}
        />
        {bad && <p id={`${id}-err`} role="alert" style={errText}>{errors[key as keyof Errors]}</p>}
      </div>
    );
  };

  const chip = (s: string, dashed = false) => {
    const on = services.includes(s);
    return (
      <button
        key={s}
        type="button"
        onClick={() => toggleService(s)}
        aria-pressed={on}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          padding: dashed ? '.42rem .8rem' : '.42rem .7rem',
          borderRadius: '999px', cursor: 'pointer',
          fontSize: '0.79rem', fontWeight: dashed ? 700 : 600, fontFamily: 'inherit',
          border: `1px ${dashed ? 'dashed' : 'solid'} ${on ? 'var(--accent-primary)' : 'var(--border-light)'}`,
          background: on ? 'var(--accent-primary)' : 'transparent',
          color: on ? '#1a1305' : 'var(--text-secondary)',
          transition: 'background .18s, border-color .18s, color .18s',
        }}
      >
        {on && <Check size={12} aria-hidden="true" />}
        {s}
      </button>
    );
  };

  return (
    <div className="dh-contact-page">

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section
        className="theme-brown"
        style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', padding: '140px 0 80px' }}
      >
        <Grain />
        <GridBg size={50} opacity={0.06} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} className="dh-label">Contact</motion.div>

            {/* A real H1. It used to read "LET'S START SOMETHING EXTRAORDINARY.",
                which tells neither a person nor a search engine what this page is. */}
            <motion.h1 variants={fadeUp} className="dh-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', lineHeight: 1.04, margin: '0 0 1.25rem', maxWidth: '16ch' }}>
              Contact Avani Enterprises
            </motion.h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '58ch', fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', marginBottom: '2.25rem' }}>
              Tell us what you are trying to build or grow. You get a scoping call, not a
              sales pitch — and a written scope with deliverables, timeline and cost before
              any work starts. We reply within one working day.
            </motion.p>

            {/* Direct actions. On a phone, tap-to-call beats any form. */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href={`tel:${PHONE_E164}`} className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${PHONE_E164.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', border: '1px solid var(--border-light)', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '.88rem', fontFamily: "'Outfit', sans-serif" }}
              >
                <MessageSquare size={16} aria-hidden="true" /> WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', border: '1px solid var(--border-light)', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '.88rem', fontFamily: "'Outfit', sans-serif" }}
              >
                <Mail size={16} aria-hidden="true" /> Email us
              </a>
            </motion.div>

            <motion.p variants={fadeUp} style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <Clock size={14} aria-hidden="true" /> {HOURS}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* ── 2. Details + form ───────────────────────────────────────────── */}
      <section className="theme-beige" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="dh-contact-split">

            {/* Left — how to reach us */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <h2 className="dh-heading" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>Reach us directly</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {[
                  { icon: <Mail size={18} aria-hidden="true" />, title: 'Email', val: EMAIL, href: `mailto:${EMAIL}`, sub: 'Best for briefs, RFPs and documents', ext: false },
                  { icon: <Phone size={18} aria-hidden="true" />, title: 'Phone', val: PHONE_DISPLAY, href: `tel:${PHONE_E164}`, sub: 'Reaches the team, not a switchboard', ext: false },
                  { icon: <Phone size={18} aria-hidden="true" />, title: 'Second line', val: PHONE2_DISPLAY, href: `tel:${PHONE2_E164}`, sub: 'If the first line is engaged', ext: false },
                  { icon: <MessageSquare size={18} aria-hidden="true" />, title: 'WhatsApp', val: PHONE_DISPLAY, href: `https://wa.me/${PHONE_E164.replace('+', '')}`, sub: 'Quickest for a short question', ext: true },
                ].map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={{ ...cardStyle, display: 'flex', gap: '1rem', textDecoration: 'none', alignItems: 'flex-start' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-faint)'; }}
                  >
                    <span style={{ color: 'var(--accent-primary)', marginTop: 2 }}>{c.icon}</span>
                    <span>
                      <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '.25rem' }}>{c.title}</span>
                      <span style={{ display: 'block', fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>{c.val}</span>
                      <span className="dh-body" style={{ display: 'block', fontSize: '0.78rem', marginTop: '.15rem' }}>{c.sub}</span>
                    </span>
                  </a>
                ))}
              </div>

              <h2 className="dh-heading" style={{ fontSize: '1.35rem', marginBottom: '.4rem' }}>Offices</h2>
              <p className="dh-body" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Three offices in India. Everywhere else — including the UAE, Singapore and
                the USA — we deliver remotely.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {OFFICES.map((o) => (
                  <div key={o.city} style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '.6rem', marginBottom: '.4rem', flexWrap: 'wrap' }}>
                      <h3 className="dh-heading" style={{ fontSize: '1rem', color: 'var(--accent-primary)', margin: 0 }}>{o.city}</h3>
                      <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{o.role}</span>
                    </div>
                    <address className="dh-body" style={{ fontSize: '0.82rem', lineHeight: 1.6, fontStyle: 'normal', margin: '0 0 .5rem' }}>{o.address}</address>
                    <a href={o.map} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} aria-hidden="true" /> Directions <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — the form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
                <h2 className="dh-heading" style={{ fontSize: '1.6rem', margin: '0 0 .4rem' }}>Tell us about your project</h2>
                <p className="dh-body" style={{ fontSize: '0.88rem', marginBottom: '2rem' }}>
                  Four quick answers is enough to start. We reply within one working day.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>

                  <div className="dh-field-row">
                    {field('c-name', 'Your name', 'name', { required: true, placeholder: 'Priya Sharma', inputRef: nameRef, autoComplete: 'name' })}
                    {field('c-phone', 'Phone', 'phone', { required: true, type: 'tel', placeholder: '+91 98765 43210', inputRef: phoneRef, autoComplete: 'tel' })}
                  </div>

                  <div className="dh-field-row">
                    {field('c-email', 'Email', 'email', { required: true, type: 'email', placeholder: 'priya@company.com', inputRef: emailRef, autoComplete: 'email' })}
                    {field('c-company', 'Company', 'company', { placeholder: 'Acme Pvt Ltd', autoComplete: 'organization' })}
                  </div>

                  {/* Service picker — inline chips. No dropdown, nothing to collapse. */}
                  <fieldset ref={serviceRef} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
                    <legend style={{ ...labelStyle, padding: 0 }}>What do you need?</legend>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', margin: '0 0 .85rem' }}>
                      Pick as many as apply — <strong style={{ color: 'var(--text-secondary)' }}>{selectedLabel}</strong>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {SERVICE_GROUPS.map((group) => (
                        <div key={group.label}>
                          <div style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '.5rem' }}>
                            {group.label}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                            {group.items.map((s) => chip(s))}
                          </div>
                        </div>
                      ))}

                      {/* Replaces the old free-text "Other" box, which produced
                          leads nobody could route. */}
                      <div>{chip(NOT_SURE, true)}</div>
                    </div>

                    {errors.service && <p role="alert" style={errText}>{errors.service}</p>}
                  </fieldset>

                  <div>
                    <label htmlFor="c-message" style={labelStyle}>
                      Anything else
                      <span style={{ color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}> (optional)</span>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Deadline, budget range, what you have already tried…"
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; }}
                    />
                  </div>

                  {apiError && (
                    <p role="alert" style={{ ...errText, marginTop: 0, background: 'rgba(192,57,43,.08)', border: '1px solid rgba(192,57,43,.3)', borderRadius: '8px', padding: '.7rem .9rem' }}>
                      {apiError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="dh-btn-fill"
                    style={{ width: '100%', justifyContent: 'center', height: '56px', cursor: isLoading ? 'wait' : 'pointer', opacity: isLoading ? 0.75 : 1 }}
                  >
                    {isLoading
                      ? <><Loader2 size={17} className="dh-spin" aria-hidden="true" /> Sending…</>
                      : <><Send size={17} aria-hidden="true" /> Send enquiry</>}
                  </button>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
                    We use your details to reply to this enquiry only. No newsletter, no list, no sharing.
                  </p>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* ── 3. Map ──────────────────────────────────────────────────────── */}
      {/* The invert(0.9) filter that used to be here rendered the map as a photo
          negative — unreadable in the light theme. Grayscale only. */}
      <section aria-label="Head office location" style={{ height: '420px', width: '100%', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', filter: 'grayscale(0.85) contrast(1.05)' }}>
        <iframe
          title="Avani Enterprises head office, Unitech Cyber Park, Sector 39, Gurugram"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3508.1803296113567!2d77.0552583!3d28.4439799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19493189b131%3A0x36a763d6ab00e2cb!2sAKASA%20Coworking%20Unitech%20Cyber%20Park!5e0!3m2!1sen!2sin!4v1768455888190!5m2!1sen!2sin"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ── 4. FAQ ──────────────────────────────────────────────────────── */}
      <section className="theme-brown" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="dh-label">Before you write</div>
            <h2 className="dh-display" style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)', margin: '.4rem 0 0' }}>Common questions</h2>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} style={{ background: 'var(--card-bg)', borderRadius: '14px', border: `1px solid ${open ? 'var(--accent-primary)' : 'var(--border-faint)'}`, transition: 'border-color .3s', overflow: 'hidden' }}>
                  <h3 style={{ margin: 0 }}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1.35rem 1.5rem', background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1.02rem', fontWeight: 700 }}
                    >
                      {faq.q}
                      <ChevronDown size={18} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s', color: 'var(--accent-primary)', flexShrink: 0 }} />
                    </button>
                  </h3>
                  <div id={`faq-panel-${i}`} hidden={!open} style={{ padding: '0 1.5rem 1.4rem' }}>
                    <p className="dh-body" style={{ margin: 0, fontSize: '.92rem' }}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Layout rules kept with the component that needs them. */}
      <style>{`
        .dh-contact-split {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
          gap: 4rem;
          align-items: start;
        }
        .dh-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
        }
        @media (max-width: 900px) {
          .dh-contact-split { grid-template-columns: minmax(0, 1fr); gap: 3rem; }
          /* Form first on mobile: anyone who scrolled this far came to convert,
             and the office list is reference material. */
          .dh-contact-split > *:last-child { order: -1; }
        }
        @media (max-width: 560px) {
          .dh-field-row { grid-template-columns: 1fr; }
        }
        .dh-contact-page :focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
          border-radius: 6px;
        }
        .dh-spin { animation: dh-spin 0.9s linear infinite; }
        @keyframes dh-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .dh-spin { animation-duration: 2.4s; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
