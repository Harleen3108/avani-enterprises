/**
 * TiltCard — real 3D depth, without shipping a 3D library.
 *
 * WHY NOT three.js
 * ----------------
 * A WebGL scene is ~150KB of JavaScript before it draws a single frame, on a
 * site where most traffic is mid-range Android and where the whole point of the
 * recent work was getting the payload and LCP down. So this uses CSS 3D
 * transforms instead: a real perspective projection, composited on the GPU,
 * costing a few hundred bytes and no main-thread work per frame beyond one
 * transform write.
 *
 * WHAT MAKES IT READ AS 3D RATHER THAN AS A HOVER EFFECT
 * ------------------------------------------------------
 * Three things together, none of which work alone:
 *
 *   1. perspective on the parent, so rotation foreshortens correctly — the far
 *      edge genuinely gets smaller. A rotate without perspective reads as a
 *      skew, which is the tell of a fake.
 *   2. preserve-3d plus translateZ on the inner layers, so content sits at
 *      different depths and parallaxes against the card face as it turns.
 *   3. A specular highlight tracking the pointer, because a real surface
 *      catching light is what sells a tilt as a physical object.
 *
 * PERFORMANCE
 * -----------
 * Pointer moves are coalesced into one rAF write per frame, the rect is cached
 * on enter rather than measured per move (measuring per move forces layout on
 * every mousemove), and will-change is applied only while the pointer is on the
 * card so the compositor is not holding a layer for every card on the page.
 *
 * ACCESSIBILITY
 * -------------
 * Tilt is disabled entirely under prefers-reduced-motion and on touch devices,
 * where there is no hover and the transform would only fire on tap. The card is
 * still a normal link in both cases.
 */

import React, { useCallback, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  /** Maximum rotation in degrees. Past ~10 it stops reading as a surface. */
  max?: number;
  /** How far the content lifts off the card face, in px. */
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, max = 7, depth = 28, className = '', style }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const frame = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onEnter = useCallback(() => {
    if (!enabled() || !outer.current) return;
    // Cached here, not per move: getBoundingClientRect in a mousemove handler
    // forces a synchronous layout on every single event.
    rect.current = outer.current.getBoundingClientRect();
    if (inner.current) inner.current.style.willChange = 'transform';
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!enabled() || !rect.current) return;
    pos.current = { x: e.clientX, y: e.clientY };
    if (frame.current != null) return; // coalesce to one write per frame
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const r = rect.current;
      if (!r || !inner.current) return;

      // -0.5 … 0.5 from the card centre.
      const px = (pos.current.x - r.left) / r.width - 0.5;
      const py = (pos.current.y - r.top) / r.height - 0.5;

      // Y follows the pointer horizontally; X is inverted so pushing the
      // pointer down tips the top toward the viewer, which is how a real
      // panel on a hinge behaves.
      inner.current.style.transform =
        `rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateZ(0)`;

      if (glare.current) {
        glare.current.style.opacity = '1';
        glare.current.style.background =
          `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.28), transparent 55%)`;
      }
    });
  }, [max]);

  const onLeave = useCallback(() => {
    if (frame.current != null) { cancelAnimationFrame(frame.current); frame.current = null; }
    rect.current = null;
    if (inner.current) {
      inner.current.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
      inner.current.style.willChange = 'auto';
    }
    if (glare.current) glare.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={outer}
      className={className}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      // Perspective lives on the parent so the child's rotation foreshortens.
      // Without it the same transform reads as a flat skew.
      style={{ perspective: '900px', ...style }}
    >
      <div
        ref={inner}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform .45s cubic-bezier(.22,1,.36,1)',
          position: 'relative',
          height: '100%',
        }}
      >
        {children}
        {/* Specular highlight. A surface catching light is what makes a tilt
            read as an object rather than as a CSS trick. */}
        <div
          ref={glare}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            opacity: 0, transition: 'opacity .35s ease',
            pointerEvents: 'none', mixBlendMode: 'overlay',
            transform: `translateZ(${depth}px)`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Lifts a child off the card face so it parallaxes against it as the card turns.
 * Only meaningful inside a TiltCard — it relies on that preserve-3d context.
 */
export function Lift({ z = 20, children, style }: { z?: number; children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d', ...style }}>{children}</div>;
}
