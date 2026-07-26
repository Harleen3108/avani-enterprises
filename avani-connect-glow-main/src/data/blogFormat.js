/**
 * blogFormat.js — turn whatever the CMS stored into clean, semantic article HTML.
 *
 * THE PROBLEM
 * -----------
 * Blog bodies arrive in three different shapes, and the page rendered all of
 * them as flat text:
 *
 *   • 34 posts are proper HTML (<p>, <h2>, <h3>, <ul>, <strong>) but nothing
 *     styled them — headings, lists and tables inherited the paragraph style,
 *     so a well-structured article looked like an undifferentiated wall.
 *   • 18 posts contain NO markup at all — newline-separated plain text, with
 *     the title repeated as the first line.
 *   • 10 contain markdown syntax (## headings, - lists, | tables |).
 *
 * Plus 1,583 editor-injected `<span style="background-color: transparent;">`
 * wrappers that add noise and can fight the dark theme.
 *
 * WHAT THIS DOES
 * --------------
 * Normalises all three into the same semantic HTML — h2/h3, ul/ol, table,
 * blockquote, strong, em, code — which the prose stylesheet then styles. Used by
 * BOTH the React page and api/seo.js, so what a reader sees and what Googlebot
 * indexes are the same markup.
 *
 * Import-free so the serverless function can consume it.
 */

/* DATA-START */

/** Escape text destined for HTML. */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Inline markdown → HTML. Applied to already-escaped text. */
function inline(text) {
  return String(text)
    // `code`
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // **bold** and __bold__
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    // *italic* — avoid matching bold leftovers
    .replace(/(^|[^*])\*([^*\n]+)\*($|[^*])/g, '$1<em>$2</em>$3')
    // [label](href)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

/** A stable id for a heading, so it can be linked and cited. */
function slugifyHeading(text) {
  return String(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

/** True when the body already contains block-level HTML worth preserving. */
function looksLikeHtml(s) {
  return /<(p|h1|h2|h3|h4|ul|ol|li|table|blockquote|div|section)\b/i.test(String(s || ''));
}

/**
 * Clean HTML that the editor produced: drop no-op spans, demote stray H1s so the
 * page keeps exactly one, and give headings ids.
 */
function cleanHtml(html) {
  let s = String(html || '');

  // Editor noise: <span style="background-color: transparent;">…</span> and
  // empty spans/divs contribute nothing and complicate styling on dark theme.
  s = s.replace(/<span[^>]*background-color:\s*transparent[^>]*>/gi, '');
  s = s.replace(/<span\s*>/gi, '');
  s = s.replace(/<\/span>/gi, '');

  // Inline colour/background from a light-theme editor would be unreadable on
  // the dark article surface, so strip presentational attributes entirely.
  s = s.replace(/\s(?:style|bgcolor|color|face)="[^"]*"/gi, '');
  s = s.replace(/\s(?:style|bgcolor|color|face)='[^']*'/gi, '');

  // Exactly one H1 per page — the article title. Anything else becomes an H2.
  s = s.replace(/<h1(\s[^>]*)?>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>');

  // Drop empty paragraphs left behind by the editor.
  s = s.replace(/<p>\s*(&nbsp;)?\s*<\/p>/gi, '');

  // Heading ids for anchor links and citation.
  s = s.replace(/<(h2|h3|h4)([^>]*)>([\s\S]*?)<\/\1>/gi, (m, tag, attrs, body) => {
    if (/\bid=/.test(attrs)) return m;
    return `<${tag}${attrs} id="${slugifyHeading(body)}">${body}</${tag}>`;
  });

  return s.trim();
}

/**
 * Markdown / plain text → semantic HTML.
 *
 * Deliberately small rather than pulling in a markdown library: the serverless
 * function ships this file, and the subset actually used by these posts is
 * headings, lists, tables, blockquotes and emphasis.
 */
function markdownToHtml(src, opts) {
  const options = opts || {};
  let text = String(src || '').replace(/\r\n/g, '\n');

  // The plain-text posts use a single newline per paragraph and contain no
  // blank lines at all. Without this, every line accumulates into one enormous
  // paragraph — which is exactly how these posts were rendering.
  if (!/\n\s*\n/.test(text)) text = text.replace(/\n/g, '\n\n');

  const lines = text.split('\n');
  const out = [];

  let i = 0;
  let firstHeadingUsed = false;

  const flushParagraph = (buf) => {
    if (!buf.length) return;
    out.push(`<p>${inline(esc(buf.join(' ').trim()))}</p>`);
    buf.length = 0;
  };

  const para = [];

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line ends a paragraph.
    if (!trimmed) { flushParagraph(para); i++; continue; }

    // Fenced code block
    if (/^```/.test(trimmed)) {
      flushParagraph(para);
      const lang = trimmed.replace(/^```/, '').trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) { buf.push(lines[i]); i++; }
      i++; // closing fence
      out.push(`<pre><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // ATX heading
    const atx = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (atx) {
      flushParagraph(para);
      // Never emit H1 — the page title owns it.
      const level = Math.max(2, atx[1].length);
      const text = inline(esc(atx[2].trim()));
      out.push(`<h${level} id="${slugifyHeading(atx[2])}">${text}</h${level}>`);
      firstHeadingUsed = true;
      i++; continue;
    }

    // Markdown table: | a | b |  /  |---|---|
    if (/^\|/.test(trimmed) && i + 1 < lines.length && /^\|?[\s:-]*[-]{2,}[\s:|-]*$/.test(lines[i + 1].trim())) {
      flushParagraph(para);
      const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(trimmed);
      i += 2;
      const body = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) { body.push(cells(lines[i])); i++; }
      out.push(
        '<div class="prose-table-wrap"><table>' +
        '<thead><tr>' + head.map((h) => `<th>${inline(esc(h))}</th>`).join('') + '</tr></thead>' +
        '<tbody>' + body.map((r) => '<tr>' + r.map((c) => `<td>${inline(esc(c))}</td>`).join('') + '</tr>').join('') +
        '</tbody></table></div>'
      );
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(trimmed)) {
      flushParagraph(para);
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        buf.push(lines[i].trim().replace(/^>\s?/, '')); i++;
      }
      out.push(`<blockquote><p>${inline(esc(buf.join(' ')))}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*•]\s+/.test(trimmed)) {
      flushParagraph(para);
      const items = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, '')); i++;
      }
      out.push('<ul>' + items.map((t) => `<li>${inline(esc(t))}</li>`).join('') + '</ul>');
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(trimmed)) {
      flushParagraph(para);
      const items = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, '')); i++;
      }
      out.push('<ol>' + items.map((t) => `<li>${inline(esc(t))}</li>`).join('') + '</ol>');
      continue;
    }

    // Plain-text posts repeat the article title as the first line. Drop it so
    // the page does not show the heading twice.
    if (!firstHeadingUsed && options.title && !para.length && out.length === 0) {
      const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (norm(trimmed) === norm(options.title) || norm(options.title).startsWith(norm(trimmed).slice(0, 40))) {
        firstHeadingUsed = true; i++; continue;
      }
    }

    // A short line with no terminal punctuation, followed by prose, is almost
    // always a section heading in these plain-text posts. Look ahead to the next
    // NON-EMPTY line — paragraphs here are separated by blank lines, so the
    // immediately following line is usually blank.
    let n = i + 1;
    while (n < lines.length && !lines[n].trim()) n++;
    const next = (lines[n] || '').trim();

    // A run of consecutive short lines is a list, not a series of headings —
    // several posts contain bare keyword lists that would otherwise all become
    // H2s. Require the preceding block to be prose (or the start of the post).
    let prev = i - 1;
    while (prev >= 0 && !lines[prev].trim()) prev--;
    const prevLine = prev >= 0 ? lines[prev].trim() : '';
    const prevWasProse = !prevLine || prevLine.length > 60;

    const looksLikeHeading =
      trimmed.length < 90 &&
      !/[.!?,;:]$/.test(trimmed) &&
      next.length > 0 &&
      // The following block must be prose, not another short line.
      next.length > 60 &&
      prevWasProse &&
      !/^[-*•\d]/.test(trimmed) &&
      /^[A-Z0-9]/.test(trimmed) &&
      trimmed.split(' ').length <= 12;

    if (looksLikeHeading && !para.length) {
      out.push(`<h2 id="${slugifyHeading(trimmed)}">${inline(esc(trimmed))}</h2>`);
      firstHeadingUsed = true;
      i++; continue;
    }

    para.push(trimmed);
    i++;
  }

  flushParagraph(para);
  return out.join('\n');
}

/**
 * The single entry point. Returns semantic HTML ready for the prose styles.
 */
function formatBlogBody(raw, opts) {
  const src = String(raw || '').trim();
  if (!src) return '';
  let html = looksLikeHtml(src) ? cleanHtml(src) : markdownToHtml(src, opts);

  // Several posts open with a heading that repeats the article title, so the
  // page showed the same words twice. Drop a leading heading when it matches.
  const title = opts && opts.title;
  if (title) {
    const norm = (x) => String(x).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]/g, '');
    html = html.replace(/^\s*<(h2|h3)[^>]*>([\s\S]*?)<\/\1>/i, (m, tag, body) => {
      const a = norm(body);
      const b = norm(title);
      if (!a || !b) return m;
      return a === b || b.startsWith(a.slice(0, 40)) || a.startsWith(b.slice(0, 40)) ? '' : m;
    }).trim();
  }

  return html;
}

/**
 * Article typography. Injected once per page by both the React renderer and the
 * SSR path so the two never drift.
 *
 * Scoped to .prose so it cannot leak into the rest of the site.
 */
const PROSE_CSS = `
.prose {
  max-width: 70ch;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary, rgba(255,255,255,0.78));
}
.prose > * + * { margin-top: 1.25em; }
.prose h2 {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.35rem, 2.6vw, 1.7rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text-primary, #fff);
  margin-top: 2.4em;
  margin-bottom: 0.7em;
  padding-top: 0.6em;
  border-top: 1px solid var(--border-light, rgba(255,255,255,0.08));
}
.prose h2:first-child { margin-top: 0; border-top: none; padding-top: 0; }
.prose h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem; font-weight: 700; line-height: 1.35;
  color: var(--text-primary, #fff);
  margin-top: 1.9em; margin-bottom: 0.5em;
}
.prose h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem; font-weight: 700;
  color: var(--text-primary, #fff);
  margin-top: 1.6em; margin-bottom: 0.4em;
}
.prose p { margin: 0; }
.prose strong { color: var(--text-primary, #fff); font-weight: 700; }
.prose em { font-style: italic; }
.prose a {
  color: var(--accent-primary, #D4A017);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.prose a:hover { text-decoration-thickness: 2px; }
.prose ul, .prose ol { padding-left: 1.35em; margin: 1.25em 0; }
.prose ul { list-style: disc; }
.prose ol { list-style: decimal; }
.prose li { margin: 0.5em 0; padding-left: 0.25em; }
.prose li::marker { color: var(--accent-primary, #D4A017); }
.prose li > ul, .prose li > ol { margin: 0.5em 0; }
.prose blockquote {
  margin: 1.75em 0;
  padding: 0.2em 0 0.2em 1.15em;
  border-left: 3px solid var(--accent-primary, #D4A017);
  color: var(--text-primary, #fff);
  font-size: 1.08rem;
  font-style: italic;
}
.prose blockquote p { margin: 0; }
.prose code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88em;
  background: rgba(255,255,255,0.07);
  border: 1px solid var(--border-light, rgba(255,255,255,0.1));
  border-radius: 5px;
  padding: 0.15em 0.4em;
  color: var(--text-primary, #fff);
}
.prose pre {
  background: rgba(0,0,0,0.35);
  border: 1px solid var(--border-light, rgba(255,255,255,0.1));
  border-radius: 12px;
  padding: 16px 18px;
  overflow-x: auto;
  margin: 1.6em 0;
}
.prose pre code { background: none; border: none; padding: 0; font-size: 0.86rem; line-height: 1.65; }
/* Tables scroll inside their own container so the page never scrolls sideways */
.prose .prose-table-wrap { overflow-x: auto; margin: 1.75em 0; border: 1px solid var(--border-light, rgba(255,255,255,0.12)); border-radius: 12px; }
.prose table { width: 100%; border-collapse: collapse; min-width: 460px; font-size: 0.94rem; }
.prose thead { background: rgba(255,255,255,0.045); }
.prose th {
  text-align: left; padding: 12px 15px; font-weight: 700; font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--accent-primary, #D4A017);
  border-bottom: 1px solid var(--border-light, rgba(255,255,255,0.12));
  white-space: nowrap;
}
.prose td {
  padding: 12px 15px; vertical-align: top;
  border-bottom: 1px solid var(--border-light, rgba(255,255,255,0.07));
}
.prose tbody tr:last-child td { border-bottom: none; }
.prose img { max-width: 100%; height: auto; border-radius: 12px; margin: 1.75em 0; }
.prose hr { border: none; border-top: 1px solid var(--border-light, rgba(255,255,255,0.1)); margin: 2.5em 0; }
@media (max-width: 640px) {
  .prose { font-size: 1rem; line-height: 1.75; }
  .prose h2 { font-size: 1.3rem; margin-top: 2em; }
}
`;

/* DATA-END */

export { formatBlogBody, cleanHtml, markdownToHtml, slugifyHeading, looksLikeHtml, PROSE_CSS, esc, inline };
