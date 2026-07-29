/**
 * CoverArt — a generated cover for any post that has no image of its own.
 *
 * All 60 seeded posts ship without a coverImage, so the index rendered a blank
 * cream rectangle where a picture should be. That reads as broken rather than
 * as a deliberate choice.
 *
 * This draws one instead of borrowing one. Deliberately NOT a stock photo URL:
 * an external image is a link that rots, a request that can be slow or blocked,
 * and a licence to keep track of, for artwork that is decorative anyway. An
 * inline SVG always renders, costs no request, and stays on brand.
 *
 * The result is deterministic — the same slug always produces the same cover,
 * so a post does not change appearance between visits or between the card and
 * the article — but varied enough across posts that a grid of them does not
 * look like a repeating tile.
 */

import React from 'react';

/** Palette per category, keyed to the article accent. */
const THEMES: Record<string, { from: string; to: string; ink: string; glyph: string }> = {
  'AI':                { from: '#241C3B', to: '#3D2E63', ink: '#E9E1FF', glyph: '#8B6BE0' },
  'SEO':               { from: '#1E2A22', to: '#25453A', ink: '#DCF3E7', glyph: '#3E9B78' },
  'Digital Marketing': { from: '#2E2113', to: '#4A3417', ink: '#FBEEDA', glyph: '#D4A017' },
  'Web Development':   { from: '#141F2E', to: '#1D3350', ink: '#DCEBFF', glyph: '#4A85D6' },
  'Social Media':      { from: '#2C1626', to: '#4A2340', ink: '#FBE2F3', glyph: '#C05FA0' },
  'Business OS':       { from: '#1A1F2B', to: '#2A3348', ink: '#E4EAF6', glyph: '#6D82AE' },
  'Business':          { from: '#2A2118', to: '#453729', ink: '#F5EADC', glyph: '#B08A4E' },
  'Insights':          { from: '#221C17', to: '#3A2F26', ink: '#F2E8DC', glyph: '#A8853F' },
};

const FALLBACK = { from: '#221C17', to: '#3A2F26', ink: '#F2E8DC', glyph: '#A8853F' };

/** Stable small integer from a string, so a slug always maps to the same art. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export default function CoverArt({
  title,
  category,
  slug,
  className,
  style,
}: {
  title: string;
  category?: string;
  slug?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const theme = (category && THEMES[category]) || FALLBACK;
  const seed = hash(slug || title || 'avani');

  // Three deterministic layout variants so a grid does not read as one tile
  // repeated, without needing per-post artwork.
  const variant = seed % 3;
  const id = `cv${seed.toString(36).slice(0, 6)}`;

  // Rings sized off the seed. Kept inside the viewBox so nothing clips oddly at
  // the 16:10 aspect the cards use.
  const cx = 74 + (seed % 5) * 6;
  const cy = 30 + ((seed >> 3) % 5) * 6;

  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    >
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.from} />
          <stop offset="100%" stopColor={theme.to} />
        </linearGradient>
        <radialGradient id={`${id}r`} cx="0.75" cy="0.25" r="0.75">
          <stop offset="0%" stopColor={theme.glyph} stopOpacity="0.42" />
          <stop offset="100%" stopColor={theme.glyph} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="160" height="100" fill={`url(#${id}g)`} />
      <rect width="160" height="100" fill={`url(#${id}r)`} />

      {variant === 0 && (
        <g fill="none" stroke={theme.glyph} strokeOpacity="0.34">
          {[10, 19, 28, 37].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} strokeWidth="0.7" />
          ))}
        </g>
      )}

      {variant === 1 && (
        <g stroke={theme.glyph} strokeOpacity="0.26" strokeWidth="0.7">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={70 + i * 11} y1={-10} x2={40 + i * 11} y2={110} />
          ))}
        </g>
      )}

      {variant === 2 && (
        <g fill={theme.glyph} fillOpacity="0.3">
          {Array.from({ length: 26 }, (_, i) => {
            const x = 62 + ((seed >> i % 8) % 10) + (i % 7) * 14;
            const y = 12 + Math.floor(i / 7) * 22 + ((seed >> i) % 8);
            return <circle key={i} cx={x % 170} cy={y % 96} r={1.5 + (i % 3) * 0.7} />;
          })}
        </g>
      )}

      {/* Category label. The title is not drawn here — it sits directly beneath
          the card in real text, and repeating it would be duplication a screen
          reader has to hear twice. */}
      {category && (
        <text
          x="12"
          y="88"
          fill={theme.ink}
          fillOpacity="0.85"
          fontSize="7"
          fontWeight="700"
          letterSpacing="1.6"
          fontFamily="Outfit, Inter, sans-serif"
        >
          {category.toUpperCase()}
        </text>
      )}

      <rect x="12" y="12" width="22" height="2" fill={theme.glyph} fillOpacity="0.9" rx="1" />
    </svg>
  );
}
