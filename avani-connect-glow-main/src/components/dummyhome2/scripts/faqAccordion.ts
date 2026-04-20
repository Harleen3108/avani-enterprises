/* ── FAQ ACCORDION ────────────────────────────────────────
   Single-open accordion behaviour
─────────────────────────────────────────────────────────── */

export function initFaqAccordion(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('.faq-q').forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.parentElement as HTMLElement;
      const ans = item.querySelector<HTMLElement>('.faq-a');
      if (!ans) return;

      const wasOpen = item.classList.contains('open');

      /* Close all */
      root.querySelectorAll<HTMLElement>('.faq-item').forEach((i) => {
        i.classList.remove('open');
        const a = i.querySelector<HTMLElement>('.faq-a');
        if (a) a.style.maxHeight = '0';
      });

      /* Open clicked if it was closed */
      if (!wasOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
}
