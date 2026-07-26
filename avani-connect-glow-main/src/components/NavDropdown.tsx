/**
 * NavDropdown — the desktop navbar flyout.
 *
 * WHAT WAS WRONG
 * The panel was a fixed 180px single column. PROJECTS carries 14 entries, some
 * of them long ("REAL ESTATE MANAGEMENT SYSTEM (MILLIONAIRE INVESTMENT CLUB)"),
 * so every label wrapped onto three lines and the list ran off the bottom of the
 * screen with no way to reach the last few items.
 *
 * WHAT THIS DOES
 *   • Columns scale with the number of items, so a long list gets wider rather
 *     than taller. 14 entries become two columns, not 40 wrapped lines.
 *   • Width is capped against the viewport, so it never causes a horizontal
 *     scrollbar on a small laptop.
 *   • It measures itself once open and nudges left or right if it would cross a
 *     screen edge — the panel for a nav item near the right of the bar used to
 *     be clipped, because it was hard-centred on its trigger.
 *   • A max height with internal scrolling is the last resort, so nothing is
 *     ever unreachable no matter how the list grows.
 */

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export type NavDropdownItem = { label: string; path: string };

/**
 * Column count for a given item count and available width.
 *
 * The 900px threshold is the same one Navbar.tsx uses to swap the desktop links
 * for the hamburger, so the single-column branch is really just a safety net —
 * below it this panel is not rendered at all.
 *
 * 14 items stay at two columns rather than three even on a 1920px screen: seven
 * rows is compact, and three columns of five reads as sparse.
 */
function columnsFor(count: number, viewportWidth: number): number {
  if (count <= 7) return 1;
  if (count <= 14) return viewportWidth >= 900 ? 2 : 1;
  return viewportWidth >= 1200 ? 3 : viewportWidth >= 900 ? 2 : 1;
}

export default function NavDropdown({
  items,
  currentPath,
}: {
  items: NavDropdownItem[];
  currentPath: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [cols, setCols] = useState(1);

  useLayoutEffect(() => {
    const place = () => {
      const el = ref.current;
      if (!el) return;

      const vw = window.innerWidth;
      setCols(columnsFor(items.length, vw));

      // Measure with the current offset removed, then work out how far the
      // panel needs to move to sit fully on screen with a 14px margin.
      const rect = el.getBoundingClientRect();
      const margin = 14;
      const left = rect.left - offset;
      const right = rect.right - offset;

      let next = 0;
      if (right > vw - margin) next = -(right - (vw - margin));
      if (left + next < margin) next = margin - left;
      if (Math.abs(next - offset) > 0.5) setOffset(next);
    };

    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
    // `offset` is intentionally in the deps: the effect re-measures after it
    // moves the panel, which settles in one extra pass instead of oscillating.
  }, [items.length, offset]);

  const COL_WIDTH = 250;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: `translateX(calc(-50% + ${offset}px))`,
        background: '#1A1512',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
        padding: '14px',
        // Wide enough that long project names sit on one or two lines instead
        // of three, but never wider than the screen.
        width: `min(92vw, ${cols * COL_WIDTH + 28}px)`,
        // Nothing is ever unreachable, however long the list grows.
        maxHeight: 'min(70vh, 620px)',
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: '2px 10px',
        zIndex: 100,
        marginTop: '8px',
      }}
    >
      {items.map((sub) => {
        const active = currentPath === sub.path;
        return (
          <Link
            key={sub.path}
            to={sub.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '40px',
              padding: '9px 12px',
              borderRadius: '8px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              lineHeight: 1.35,
              letterSpacing: '0.06em',
              fontWeight: 600,
              color: active ? 'var(--accent-primary)' : 'rgba(255,255,255,0.72)',
              textDecoration: 'none',
              transition: 'background 0.18s, color 0.18s',
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget as HTMLElement;
              t.style.background = 'rgba(255,255,255,0.07)';
              t.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLElement;
              t.style.background = 'none';
              t.style.color = active ? 'var(--accent-primary)' : 'rgba(255,255,255,0.72)';
            }}
          >
            {sub.label}
          </Link>
        );
      })}
    </motion.div>
  );
}
