/**
 * BlogEngagement — views, likes and comments for a blog post.
 *
 * Split into two exports because they belong in different places on the page:
 *
 *   <EngagementRail/>     compact stats + like + share. Lives in the sticky
 *                         right column beside the article.
 *   <CommentsSection/>    the thread and the form. Lives below the article,
 *                         where it has room to breathe.
 *
 * COLOURS ARE LITERAL, NOT var(--…), AND THAT IS DELIBERATE.
 * This used to read var(--text-secondary) / var(--card-bg), which resolve to the
 * dark theme's values. Once the article moved onto a light surface, every label
 * here rendered near-white on cream and the whole comments block looked broken.
 * The palette below matches PROSE_CSS in src/data/blogFormat.js exactly.
 *
 * Likes are de-duplicated in localStorage rather than by storing a visitor
 * identifier — this is a vanity counter, and it is not worth collecting personal
 * data to make it tamper-proof.
 *
 * Comments are held for moderation server-side, so the form confirms submission
 * rather than showing the comment immediately. An open comment form on a site
 * recovering from a content-quality demotion is a spam-link liability.
 */
import React from 'react';
import { Eye, Heart, MessageCircle, Send, Share2, Check } from 'lucide-react';
import { getBackendUrl } from '../../lib/api';

const INK = '#1A1714';
const INK_BODY = '#3A352E';
const INK_MUTED = '#6B635A';
const RULE = '#E7E0D5';
const ACCENT = '#A87613';
const ACCENT_BG = '#FBF4E3';

type Comment = { name: string; body: string; createdAt: string };

const likeKey = (slug: string) => `avani_blog_like_${slug}`;

/** Shared state hook so the rail and the thread agree on the counts. */
function useEngagement(slug: string) {
  const [likes, setLikes] = React.useState<number | null>(null);
  const [liked, setLiked] = React.useState(false);
  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    try { setLiked(localStorage.getItem(likeKey(slug)) === '1'); } catch { /* private mode */ }

    let cancelled = false;
    fetch(`${getBackendUrl()}/blogs/${encodeURIComponent(slug)}/comments`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (!cancelled && j?.success) setComments(j.data || []); })
      .catch(() => { /* engagement is non-critical — never block the article */ });

    return () => { cancelled = true; };
  }, [slug]);

  const toggleLike = async () => {
    const next = !liked;
    setLiked(next);
    setLikes((n) => (n === null ? (next ? 1 : 0) : Math.max(0, n + (next ? 1 : -1))));
    try { localStorage.setItem(likeKey(slug), next ? '1' : '0'); } catch { /* ignore */ }

    try {
      const r = await fetch(`${getBackendUrl()}/blogs/${encodeURIComponent(slug)}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unlike: !next }),
      });
      const j = await r.json();
      if (j?.success && typeof j.data?.likes === 'number') setLikes(j.data.likes);
    } catch {
      /* optimistic count stands; the next page load reconciles it */
    }
  };

  return { likes, liked, comments, setComments, toggleLike };
}

/* ── Right rail ───────────────────────────────────────────────────────────── */

export function EngagementRail({ slug, views }: { slug: string; views?: number }) {
  const { likes, liked, comments, toggleLike } = useEngagement(slug);
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (typeof navigator !== 'undefined' && (navigator as any).share) {
        await (navigator as any).share({ url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* user dismissed the share sheet, or clipboard is blocked */ }
  };

  const row: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 9,
    fontSize: '.87rem', color: INK_BODY,
  };

  return (
    <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderRadius: 14, padding: '18px 20px' }}>
      <p style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: INK_MUTED, margin: '0 0 14px' }}>
        This article
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {typeof views === 'number' && (
          <span style={row}><Eye size={16} color={INK_MUTED} /> {views.toLocaleString('en-IN')} views</span>
        )}
        <a href="#comments" style={{ ...row, textDecoration: 'none' }}>
          <MessageCircle size={16} color={INK_MUTED} />
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </a>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Remove like' : 'Like this post'}
          style={{
            flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            minHeight: 42, borderRadius: 10, cursor: 'pointer', fontSize: '.86rem', fontWeight: 600,
            background: liked ? ACCENT_BG : '#fff',
            border: `1px solid ${liked ? '#EBDCB6' : RULE}`,
            color: liked ? ACCENT : INK_BODY,
            fontFamily: 'inherit',
          }}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          {likes === null ? 'Like' : likes}
        </button>

        <button
          type="button"
          onClick={share}
          aria-label="Share this article"
          style={{
            flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            minHeight: 42, borderRadius: 10, cursor: 'pointer', fontSize: '.86rem', fontWeight: 600,
            background: '#fff', border: `1px solid ${RULE}`, color: INK_BODY, fontFamily: 'inherit',
          }}
        >
          {copied ? <><Check size={15} /> Copied</> : <><Share2 size={15} /> Share</>}
        </button>
      </div>
    </div>
  );
}

/* ── Comment thread ───────────────────────────────────────────────────────── */

export function CommentsSection({ slug }: { slug: string }) {
  const { comments } = useEngagement(slug);
  const [form, setForm] = React.useState({ name: '', email: '', body: '', website: '' });
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'pending' | 'error'>('idle');
  const [error, setError] = React.useState('');

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.body.trim()) return;
    setStatus('sending');
    setError('');
    try {
      const r = await fetch(`${getBackendUrl()}/blogs/${encodeURIComponent(slug)}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const j = await r.json();
      if (!r.ok) { setStatus('error'); setError(j?.message || 'Could not post that comment.'); return; }
      setStatus('pending');
      setForm({ name: '', email: '', body: '', website: '' });
    } catch {
      setStatus('error');
      setError('Could not reach the server. Please try again.');
    }
  };

  const input: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: `1px solid ${RULE}`, background: '#fff',
    color: INK, fontSize: '.93rem', fontFamily: 'inherit', minHeight: 46,
  };

  return (
    <section id="comments" style={{ scrollMarginTop: 100 }}>
      <h2 style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-.02em', color: INK, margin: '0 0 1.4rem', paddingTop: '1.4rem', borderTop: `2px solid ${RULE}` }}>
        {comments.length > 0
          ? `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`
          : 'Discussion'}
      </h2>

      {comments.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: '2.2rem' }}>
          {comments.map((c, i) => (
            <article key={i} style={{ display: 'flex', gap: 14 }}>
              <div
                aria-hidden="true"
                style={{
                  flexShrink: 0, width: 38, height: 38, borderRadius: '50%',
                  background: ACCENT_BG, color: ACCENT, fontWeight: 700, fontSize: '.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {(c.name || '?').trim().charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 3 }}>
                  <strong style={{ fontSize: '.93rem', color: INK }}>{c.name}</strong>
                  <span style={{ fontSize: '.76rem', color: INK_MUTED }}>
                    {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '.94rem', color: INK_BODY, lineHeight: 1.68, margin: 0, whiteSpace: 'pre-wrap' }}>
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {status === 'pending' ? (
        <div style={{ background: ACCENT_BG, border: '1px solid #EBDCB6', borderRadius: 12, padding: '16px 18px' }}>
          <p style={{ fontSize: '.93rem', color: INK_BODY, margin: 0, lineHeight: 1.6 }}>
            Thanks — your comment has been submitted and will appear once reviewed.
          </p>
        </div>
      ) : (
        <form onSubmit={submitComment} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {comments.length === 0 && (
            <p style={{ fontSize: '.93rem', color: INK_MUTED, margin: '0 0 4px' }}>
              No comments yet — start the discussion.
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <input
              style={input} placeholder="Your name" value={form.name} required maxLength={80}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              style={input} type="email" placeholder="Email (never published)" value={form.email} maxLength={160}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Honeypot — hidden from users, filled by bots. */}
          <input
            tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
          />

          <textarea
            style={{ ...input, minHeight: 110, resize: 'vertical' }}
            placeholder="Share your thoughts…" value={form.body} required maxLength={2000}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />

          {error && <p style={{ fontSize: '.86rem', color: '#B91C1C', margin: 0 }}>{error}</p>}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: INK, color: '#FFFDF9', fontWeight: 600,
                fontSize: '.92rem', padding: '12px 22px', borderRadius: 10, minHeight: 46,
                border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                opacity: status === 'sending' ? 0.7 : 1, fontFamily: 'inherit',
              }}
            >
              {status === 'sending' ? 'Posting…' : 'Post comment'} <Send size={15} />
            </button>
            <p style={{ fontSize: '.79rem', color: INK_MUTED, margin: 0 }}>
              Reviewed before appearing · Your email is never published
            </p>
          </div>
        </form>
      )}
    </section>
  );
}

/** Back-compat default export — the old single-block layout. */
export default function BlogEngagement({ slug, views }: { slug: string; views?: number }) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <EngagementRail slug={slug} views={views} />
      <div style={{ marginTop: '2.5rem' }}><CommentsSection slug={slug} /></div>
    </div>
  );
}
