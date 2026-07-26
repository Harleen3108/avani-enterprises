/**
 * BlogAeoBlocks.tsx — Key Takeaways and FAQ, rendered from stored post fields.
 *
 * Older posts carry these inside the HTML body. Posts seeded by the drip queue
 * store them as real fields (keyTakeaways[], faqs[{q,a}]), which is what lets
 * the FAQ become FAQPage schema and lets the takeaways be lifted cleanly by AI
 * answer engines. Both components render nothing when their field is empty, so
 * the two generations of post coexist without special-casing.
 *
 * Colours are literal rather than var()-driven to match the light article
 * surface in blogFormat.js — the dark theme's variables must not leak in here.
 */

import React, { useState } from 'react';
import { Check, Plus, Minus } from 'lucide-react';

const INK = '#1A1714';
const INK_BODY = '#3A352E';
const RULE = '#E7E0D5';
const ACCENT = '#A87613';
const ACCENT_BG = '#FBF4E3';

export const KeyTakeaways = ({ items }: { items?: string[] }) => {
  if (!items || !items.length) return null;
  return (
    <aside
      aria-label="Key takeaways"
      style={{
        background: ACCENT_BG,
        border: '1px solid #EBDCB6',
        borderRadius: 14,
        padding: '24px 26px',
        margin: '0 auto 2.4rem',
        maxWidth: '44rem',
      }}
    >
      <p style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: ACCENT, margin: '0 0 0.9em' }}>
        <Check size={14} /> Key Takeaways
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((t, i) => (
          <li key={i} style={{ position: 'relative', paddingLeft: 18, margin: '0.6em 0', color: INK_BODY, fontSize: '1rem', lineHeight: 1.65 }}>
            <span style={{ position: 'absolute', left: 0, top: '0.62em', width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export const FaqAccordion = ({ items }: { items?: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  if (!items || !items.length) return null;

  return (
    <section aria-label="Frequently asked questions" style={{ maxWidth: '44rem', margin: '3rem auto 0' }}>
      <h2 style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: INK, letterSpacing: '-0.02em', margin: '0 0 1.2rem', paddingTop: '1.2rem', borderTop: `2px solid ${RULE}` }}>
        Frequently Asked Questions
      </h2>

      <div style={{ borderTop: `1px solid ${RULE}` }}>
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: `1px solid ${RULE}` }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  gap: 16, background: 'none', border: 'none', cursor: 'pointer',
                  padding: '18px 0', textAlign: 'left',
                  fontFamily: "'Inter', sans-serif", fontSize: '1.02rem', fontWeight: 600,
                  color: INK, lineHeight: 1.5, minHeight: 56,
                }}
              >
                <span>{f.q}</span>
                <span style={{ flexShrink: 0, color: ACCENT, marginTop: 2 }}>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {isOpen && (
                <p style={{ margin: '0 0 20px', color: INK_BODY, fontSize: '1rem', lineHeight: 1.72, paddingRight: 34 }}>
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
