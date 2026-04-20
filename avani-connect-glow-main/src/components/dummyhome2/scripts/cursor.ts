/* ── CUSTOM CURSOR ────────────────────────────────────────
   Dot follows instantly, ring follows with inertia
─────────────────────────────────────────────────────────── */

export function initCursor(
  curEl: HTMLElement,
  ringEl: HTMLElement,
): () => void {
  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;
  let animId: number;

  function onMouseMove(e: MouseEvent): void {
    mx = e.clientX;
    my = e.clientY;
    curEl.style.left = mx + 'px';
    curEl.style.top = my + 'px';
  }

  function animRing(): void {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ringEl.style.left = rx + 'px';
    ringEl.style.top = ry + 'px';
    animId = requestAnimationFrame(animRing);
  }

  document.addEventListener('mousemove', onMouseMove);
  animRing();

  return () => {
    document.removeEventListener('mousemove', onMouseMove);
    cancelAnimationFrame(animId);
  };
}
