/* ── GSAP ANIMATIONS ─────────────────────────────────────
   Boot sequence, scroll reveals, counters, magnetic buttons
─────────────────────────────────────────────────────────── */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Initialise the scroll-progress bar and navbar scroll state.
 * Called immediately (before loader finishes).
 */
export function initScrollHelpers(
  progEl: HTMLElement,
  navEl: HTMLElement,
): () => void {
  function onScroll(): void {
    progEl.style.width =
      (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
    navEl.classList.toggle('scrolled', scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

/**
 * Boot — runs after the loader has finished.
 * Sets up GSAP ScrollTrigger, hero entrance timeline,
 * scroll reveals, animated counters, and magnetic buttons.
 * @param root The scoped root element (.dh2-root)
 */
export function boot(root: HTMLElement): void {
  gsap.registerPlugin(ScrollTrigger);

  /* Hero badges */
  setTimeout(() => {
    root.querySelector('#dh2-hb')?.classList.add('shown');
    root.querySelector('#dh2-hb2')?.classList.add('shown');
  }, 1600);

  /* Hero entrance */
  const tl = gsap.timeline({ delay: 0.1 });

  tl.to('#dh2-he', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    .to('#dh2-ht .ln inner', {
      y: '0%',
      duration: 1.2,
      stagger: 0.13,
      ease: 'power4.out',
    }, 0.3)
    .to('#dh2-htag', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.7)
    .to('#dh2-hs', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.9)
    .to('#dh2-hc', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.15)
    .to('#dh2-hscr', { opacity: 1, duration: 0.8 }, 1.4);

  /* Canvas parallax */
  gsap.to('#hero-canvas', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  /* Scroll reveals */
  root.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((el) =>
    ScrollTrigger.create({
      trigger: el as HTMLElement,
      start: 'top 87%',
      once: true,
      onEnter: () => el.classList.add('in'),
    }),
  );

  /* Counters */
  root.querySelectorAll<HTMLElement>('.cnt').forEach((el) => {
    const t = +(el.dataset.t ?? '0');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          textContent: t,
          duration: 2.2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate() {
            el.textContent = String(Math.floor(+(el.textContent ?? '0')));
          },
        }),
    });
  });

  /* Magnetic buttons */
  root.querySelectorAll<HTMLElement>('.btn-p, .btn-o, .nav-btn').forEach((el) => {
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
      el.style.transition = 'transform .1s ease';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform .45s cubic-bezier(.76,0,.24,1)';
    });
  });
}
