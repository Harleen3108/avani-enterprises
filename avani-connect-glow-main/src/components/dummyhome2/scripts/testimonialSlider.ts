/* ── TESTIMONIAL SLIDER ──────────────────────────────────
   Auto-advance with dot navigation
─────────────────────────────────────────────────────────── */

export function initTestimonialSlider(
  trackEl: HTMLElement,
  dotEls: NodeListOf<HTMLElement>,
  totalSlides: number = 3,
  intervalMs: number = 5000,
): () => void {
  let current = 0;

  function goTo(n: number): void {
    current = n;
    trackEl.style.transform = `translateX(-${n * 100}%)`;
    dotEls.forEach((d, i) => d.classList.toggle('on', i === n));
  }

  /* Dot click handlers */
  dotEls.forEach((d) => {
    d.addEventListener('click', () => {
      const idx = parseInt(d.dataset.i ?? '0', 10);
      goTo(idx);
    });
  });

  /* Auto-advance timer */
  const timer = setInterval(() => {
    goTo((current + 1) % totalSlides);
  }, intervalMs);

  return () => clearInterval(timer);
}
