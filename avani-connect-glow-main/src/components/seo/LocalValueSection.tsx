/**
 * LocalValueSection — renders the page-unique content block.
 *
 * Resolves the current URL against src/data/serviceContent.js and renders real
 * service + location facts. Because the data is real and combinatorial, every
 * service/location/model page produces genuinely different copy rather than a
 * template with a city name swapped in.
 *
 * Wired once into SeoLandingTemplate, so all ~300 landing pages get it with no
 * per-file edits. Renders nothing for paths the engine does not cover.
 *
 * The server-rendered equivalent lives in api/seo.js (buildUniqueBodyHtml) and
 * must stay visually consistent with this — same headings, same facts, same
 * order — so what Googlebot reads on the first crawl matches what a user sees.
 */
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Clock, Wallet, Building2, CheckCircle } from 'lucide-react';
import { resolvePage, uniqueBlock } from '../../data/serviceContent';

const ICONS: Record<string, React.ReactNode> = {
  'Areas we work across': <MapPin size={16} />,
  'Areas covered': <MapPin size={16} />,
  'Local industry base': <Building2 size={16} />,
  'Avani office': <Building2 size={16} />,
  'Time zone': <Clock size={16} />,
  Invoicing: <Wallet size={16} />,
};

export default function LocalValueSection() {
  const { pathname } = useLocation();
  const block = React.useMemo(() => uniqueBlock(resolvePage(pathname)), [pathname]);

  if (!block) return null;

  return (
    <section
      id="what-we-deliver"
      style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative' }}
    >
      <div className="dh-container" style={{ maxWidth: '980px' }}>
        <span
          style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '.15em',
            color: 'var(--accent-primary)', textTransform: 'uppercase',
            display: 'block', marginBottom: '.75rem',
          }}
        >
          Scope &amp; delivery
        </span>

        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 800,
            color: 'var(--text-primary)', letterSpacing: '-.02em',
            margin: '0 0 1.25rem', lineHeight: 1.2,
          }}
        >
          {block.heading}
        </h2>

        <p
          style={{
            fontSize: '1rem', color: 'var(--text-secondary)',
            lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '75ch',
          }}
        >
          {block.lead}
        </p>

        {/* Location facts — the part that makes each city page genuinely different */}
        {block.localFacts.length > 0 && (
          <div
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
              gap: '14px', marginBottom: '2.5rem',
            }}
          >
            {block.localFacts.map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border-light)',
                  borderRadius: '14px', padding: '18px 20px',
                }}
              >
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: 'var(--accent-primary)', marginBottom: '6px',
                  }}
                >
                  {ICONS[f.label] || <MapPin size={16} />}
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {f.label}
                  </span>
                </div>
                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Deliverables / process / stack — differs per service */}
        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: '28px', marginBottom: '2.5rem',
          }}
        >
          {block.facts.map((group, i) => (
            <div key={i}>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700,
                  color: 'var(--text-primary)', margin: '0 0 .9rem',
                }}
              >
                {group.label}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {group.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
                    <CheckCircle size={15} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Timeline + pricing model */}
        {block.meta.length > 0 && (
          <div
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
              gap: '14px', marginBottom: block.ymyl ? '2rem' : 0,
            }}
          >
            {block.meta.map((m, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border-light)',
                  borderRadius: '14px', padding: '18px 20px',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                  {m.label}
                </span>
                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', margin: '6px 0 0', lineHeight: 1.6 }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Hub-and-spoke: city pages point up to the service page with full detail */}
        {block.hubLink && (
          <p style={{ margin: '0 0 2rem' }}>
            <Link
              to={block.hubLink.href}
              style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '.92rem', textDecoration: 'none' }}
            >
              {block.hubLink.label} →
            </Link>
          </p>
        )}

        {/* YMYL disclaimer — required on loans / insurance / financial pages */}
        {block.ymyl && (
          <p
            style={{
              fontSize: '.8rem', color: 'var(--text-secondary)', opacity: 0.85,
              lineHeight: 1.7, borderLeft: '3px solid var(--accent-primary)',
              paddingLeft: '14px', margin: 0,
            }}
          >
            <strong>Important:</strong> Avani Enterprises provides advisory and facilitation
            support only. We are not a lender, insurer, or a licensed investment adviser.
            All lending, underwriting, pricing and approval decisions rest with the
            respective regulated provider, and their policy documents govern. Nothing on
            this page is an offer, a guarantee of approval, or regulated financial advice.
          </p>
        )}
      </div>
    </section>
  );
}
