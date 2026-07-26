/**
 * OfficeBlock — visible NAP + map for pages about a city where we have an office.
 *
 * Local pack ranking depends on Google being able to match the address on your
 * site to your Google Business Profile and third-party citations. That match
 * needs the address to be (a) visible in the HTML, not just in JSON-LD, and
 * (b) identical everywhere. Both now come from src/data/offices.js.
 *
 * Offices without a verified street address render contact details and areas
 * served but NO address and NO map, and emit no LocalBusiness schema. See the
 * header of offices.js — publishing an unverified address is worse than none.
 */
import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { NAP, officeFor, mapEmbedUrl, mapLinkUrl, formatAddress } from '../../data/offices';

export default function OfficeBlock({ locationKey }: { locationKey?: string }) {
  const office = officeFor(locationKey);
  if (!office) return null;

  // A sell-only market gets coverage copy but never an address, opening hours,
  // map or directions link. Implying premises we do not occupy risks a Google
  // Business Profile suspension.
  const confirmed = !!office.confirmed;
  const address = confirmed ? formatAddress(office) : null;
  const embed = confirmed ? mapEmbedUrl(office) : null;
  const link = confirmed ? mapLinkUrl(office) : null;

  const row: React.CSSProperties = { display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' };
  const labelStyle: React.CSSProperties = { fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 };

  return (
    <section
      id="office"
      style={{ padding: '72px 0', background: 'var(--bg-secondary)', position: 'relative' }}
    >
      <div className="dh-container" style={{ maxWidth: '980px' }}>
        <span
          style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '.15em',
            color: 'var(--accent-primary)', textTransform: 'uppercase',
            display: 'block', marginBottom: '.75rem',
          }}
        >
          {confirmed ? 'Our office' : 'Coverage'}
        </span>

        <h2
          style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.4rem,2.8vw,1.9rem)',
            fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-.02em',
            margin: '0 0 1rem', lineHeight: 1.2,
          }}
        >
          {confirmed ? `${NAP.name} in ${office.city}` : `Serving ${office.city}`}
        </h2>

        <p style={{ fontSize: '.97rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '72ch' }}>
          {office.localNote}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: embed ? '1fr 1fr' : '1fr', gap: '28px', alignItems: 'start' }} className="dh-responsive-grid">
          <div>
            {/* Address is emitted only when verified. Microdata mirrors the JSON-LD. */}
            {address && (
              <div style={row}>
                <MapPin size={17} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <address style={{ ...labelStyle, fontStyle: 'normal' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{NAP.name}</strong>
                  <br />
                  {address}
                </address>
              </div>
            )}

            <div style={row}>
              <Phone size={17} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={labelStyle}>
                <a href={`tel:${NAP.phone}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  {NAP.phoneDisplay}
                </a>
              </p>
            </div>

            <div style={row}>
              <Mail size={17} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={labelStyle}>
                <a href={`mailto:${NAP.email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  {NAP.email}
                </a>
              </p>
            </div>

            {/* Opening hours only where there is a place to open. */}
            {confirmed && (
              <div style={row}>
                <Clock size={17} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={labelStyle}>Monday to Saturday, 9:00 am – 7:00 pm IST</p>
              </div>
            )}

            {office.areasServed && office.areasServed.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '.95rem', fontWeight: 700, margin: '0 0 .6rem' }}>
                  Areas we cover in {office.city}
                </h3>
                <p style={labelStyle}>{office.areasServed.join(' · ')}</p>
              </div>
            )}

            {link && (
              <p style={{ marginTop: '1.25rem' }}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Get directions <ExternalLink size={14} />
                </a>
              </p>
            )}
          </div>

          {/* Lazy-loaded so the map never blocks LCP or eats mobile data on first paint. */}
          {embed && (
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-light)', lineHeight: 0 }}>
              <iframe
                src={embed}
                title={`Map showing ${NAP.name} office in ${office.city}`}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: 'block' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
