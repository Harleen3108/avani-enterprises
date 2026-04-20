// DummyHome2 — Main page for /dummyhome2 route
// Cinematic luxury digital agency experience — modular TypeScript rewrite.
// Original HTML/CSS page ported 1:1 into React components + TS scripts.

import React, { useEffect, useRef } from 'react';

/* ── Styles ── */
import './DummyHome2.css';

/* ── Components ── */
import DH2Loader from './DH2Loader';
import DH2Cursor from './DH2Cursor';
import DH2Navbar from './DH2Navbar';
import DH2Hero from './DH2Hero';
import DH2Ticker from './DH2Ticker';
import DH2About from './DH2About';
import DH2Services from './DH2Services';
import DH2Process from './DH2Process';
import DH2Projects from './DH2Projects';
import DH2Testimonials from './DH2Testimonials';
import DH2Stats from './DH2Stats';
import DH2FAQ from './DH2FAQ';
import DH2CTA from './DH2CTA';
import DH2Footer from './DH2Footer';

/* ── Scripts ── */
import { initHeroCanvas } from './scripts/heroCanvas';
import { initCursor } from './scripts/cursor';
import { initScrollHelpers, boot } from './scripts/animations';
import { initTestimonialSlider } from './scripts/testimonialSlider';
import { initFaqAccordion } from './scripts/faqAccordion';

const DummyHome2: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    /* ── 1. Canvas — starts immediately ── */
    const canvas = root.querySelector<HTMLCanvasElement>('#hero-canvas');
    if (canvas) {
      cleanups.push(initHeroCanvas(canvas));
    }

    /* ── 2. Custom cursor ── */
    const curEl = root.querySelector<HTMLElement>('#dh2-cur');
    const ringEl = root.querySelector<HTMLElement>('#dh2-cur-ring');
    if (curEl && ringEl) {
      cleanups.push(initCursor(curEl, ringEl));
    }

    /* ── 3. Scroll helpers (progress bar + nav state) ── */
    const progEl = root.querySelector<HTMLElement>('#dh2-prog');
    const navEl = root.querySelector<HTMLElement>('#dh2-nav');
    if (progEl && navEl) {
      cleanups.push(initScrollHelpers(progEl, navEl));
    }

    /* ── 4. Loader sequence ── */
    const lfEl = root.querySelector<HTMLElement>('#dh2-lf');
    const lpEl = root.querySelector<HTMLElement>('#dh2-lp');
    const loaderEl = root.querySelector<HTMLElement>('#dh2-loader');

    let pct = 0;
    const ldI = setInterval(() => {
      pct += Math.random() * 15;
      if (pct >= 100) {
        pct = 100;
        clearInterval(ldI);
      }
      if (lfEl) lfEl.style.width = pct + '%';
      if (lpEl) lpEl.textContent = Math.floor(pct) + '%';
      if (pct === 100) {
        setTimeout(() => {
          if (loaderEl) {
            loaderEl.style.opacity = '0';
            setTimeout(() => {
              loaderEl.style.display = 'none';
              /* ── 5. Boot GSAP animations after loader ── */
              boot(root);
            }, 800);
          }
        }, 250);
      }
    }, 72);

    /* ── 6. Testimonial slider ── */
    const trackEl = root.querySelector<HTMLElement>('#dh2-tt');
    const dotEls = root.querySelectorAll<HTMLElement>('#dh2-td .t-dot');
    if (trackEl && dotEls.length > 0) {
      cleanups.push(initTestimonialSlider(trackEl, dotEls, 3, 5000));
    }

    /* ── 7. FAQ accordion ── */
    initFaqAccordion(root);

    /* ── Cleanup on unmount ── */
    return () => {
      clearInterval(ldI);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="dh2-root" ref={rootRef}>
      <DH2Loader />
      <DH2Cursor />
      <DH2Navbar />
      <DH2Hero />
      <DH2Ticker />
      <DH2About />
      <DH2Services />
      <DH2Process />
      <DH2Projects />
      <DH2Testimonials />
      <DH2Stats />
      <DH2FAQ />
      <DH2CTA />
      <DH2Footer />
    </div>
  );
};

export default DummyHome2;
