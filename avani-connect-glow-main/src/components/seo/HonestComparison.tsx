/**
 * HonestComparison — the comparison block on *-alternative pages.
 *
 * Renders a table where the competitor genuinely wins some rows, an explicit
 * "when to choose them instead" panel, and a verdict. That combination is what
 * makes an alternative page credible to a reader who is actively comparing —
 * and a page that only says "we win everything" converts worse than one that
 * concedes the obvious.
 *
 * Data comes from src/data/comparisons.js. Where we cannot verify a competitor
 * claim, the cell says so rather than guessing.
 */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Minus, Info } from 'lucide-react';
import { comparisonFor } from '../../data/comparisons';

export default function HonestComparison() {
  const { pathname } = useLocation();
  const c = React.useMemo(() => comparisonFor(pathname), [pathname]);
  if (!c) return null;

  const cell: React.CSSProperties = {
    padding: '14px 16px', fontSize: '.88rem', lineHeight: 1.55,
    borderBottom: '1px solid var(--border-light)', verticalAlign: 'top',
  };
  const head: React.CSSProperties = {
    ...cell, fontWeight: 700, color: 'var(--text-primary)',
    fontFamily: "'Outfit', sans-serif", fontSize: '.85rem',
    textTransform: 'uppercase', letterSpacing: '.06em',
  };

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="dh-container" style={{ maxWidth: '980px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>
          Honest comparison
        </span>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-.02em', margin: '0 0 1rem', lineHeight: 1.2 }}>
          Avani Enterprises vs {c.competitor}
        </h2>
        <p style={{ fontSize: '.97rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '74ch' }}>
          {c.theirPositioning}
        </p>

        {/* The section that earns trust: where they beat us. */}
        <div
          style={{
            background: 'var(--card-bg)', border: '1px solid var(--border-light)',
            borderLeft: '3px solid var(--accent-primary)', borderRadius: '12px',
            padding: '20px 22px', marginBottom: '2rem',
          }}
        >
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, margin: '0 0 .6rem' }}>
            When {c.competitor} is the better choice
          </h3>
          <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 .5rem' }}>
            {c.theirStrength}
          </p>
          <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Better for:</strong> {c.betterFor}
          </p>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-light)', borderRadius: '14px', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)' }}>
                <th style={{ ...head, textAlign: 'left' }}>Factor</th>
                <th style={{ ...head, textAlign: 'left' }}>Avani Enterprises</th>
                <th style={{ ...head, textAlign: 'left' }}>{c.competitor}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...cell, fontWeight: 600, color: 'var(--text-primary)' }}>{r.metric}</td>
                  <td style={cell}>
                    <span style={{ display: 'inline-flex', gap: '7px', alignItems: 'flex-start' }}>
                      {r.winner === 'avani'
                        ? <Check size={15} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        : <Minus size={15} color="var(--text-secondary)" style={{ flexShrink: 0, marginTop: '3px', opacity: 0.5 }} />}
                      <span style={{ color: 'var(--text-secondary)' }}>{r.avani}</span>
                    </span>
                  </td>
                  <td style={cell}>
                    <span style={{ display: 'inline-flex', gap: '7px', alignItems: 'flex-start' }}>
                      {r.winner === 'competitor'
                        ? <Check size={15} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        : <Minus size={15} color="var(--text-secondary)" style={{ flexShrink: 0, marginTop: '3px', opacity: 0.5 }} />}
                      <span style={{ color: 'var(--text-secondary)' }}>{r.competitor}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', fontWeight: 700, margin: '0 0 .6rem' }}>
          Our verdict
        </h3>
        <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '74ch' }}>
          {c.verdict}
        </p>

        {/* Honesty about the limits of our own information. */}
        <p
          style={{
            fontSize: '.8rem', color: 'var(--text-secondary)', opacity: 0.85,
            lineHeight: 1.7, display: 'flex', gap: '8px', alignItems: 'flex-start',
            borderTop: '1px solid var(--border-light)', paddingTop: '1rem', margin: 0,
          }}
        >
          <Info size={14} style={{ flexShrink: 0, marginTop: '3px' }} />
          <span>
            {c.lowConfidence
              ? `We do not hold verified detail on ${c.competitor}'s current services, pricing or team, so the ${c.competitor} column reflects what is publicly stated rather than a tested assessment. `
              : `The ${c.competitor} column reflects publicly stated positioning, not a tested assessment. `}
            Details change — please verify current specifics with {c.competitor} directly before deciding.
            Last reviewed {c.reviewedOn}.
          </span>
        </p>
      </div>
    </section>
  );
}
