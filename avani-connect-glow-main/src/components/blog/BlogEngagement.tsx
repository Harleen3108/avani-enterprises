/**
 * BlogEngagement — views, likes and comments for a blog post.
 *
 * Mirrors the Avani Business OS blog. Views are incremented server-side by
 * GET /blogs/:slug, so this component displays that count and owns the two
 * interactive signals.
 *
 * Likes are de-duplicated in localStorage rather than by storing a visitor
 * identifier — this is a vanity counter, and it is not worth collecting
 * personal data to make it tamper-proof.
 *
 * Comments are held for moderation server-side, so the form confirms
 * submission rather than showing the comment immediately. That is deliberate:
 * an open comment form on a site recovering from a content-quality demotion is
 * a spam-link liability.
 */
import React from 'react';
import { Eye, Heart, MessageCircle, Send } from 'lucide-react';
import { getBackendUrl } from '../../lib/api';

type Comment = { name: string; body: string; createdAt: string };

const likeKey = (slug: string) => `avani_blog_like_${slug}`;

export default function BlogEngagement({ slug, views }: { slug: string; views?: number }) {
  const [likes, setLikes] = React.useState<number | null>(null);
  const [liked, setLiked] = React.useState(false);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [form, setForm] = React.useState({ name: '', email: '', body: '', website: '' });
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'pending' | 'error'>('idle');
  const [error, setError] = React.useState('');

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

  const stat: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    fontSize: '.88rem', color: 'var(--text-secondary)',
  };
  const input: React.CSSProperties = {
    width: '100%', padding: '11px 13px', borderRadius: '10px',
    border: '1px solid var(--border-light)', background: 'var(--card-bg)',
    color: 'var(--text-primary)', fontSize: '.9rem', fontFamily: 'inherit',
  };

  return (
    <section style={{ borderTop: '1px solid var(--border-light)', marginTop: '3rem', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {typeof views === 'number' && (
          <span style={stat}><Eye size={16} /> {views.toLocaleString('en-IN')} views</span>
        )}

        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Remove like' : 'Like this post'}
          style={{
            ...stat, cursor: 'pointer', background: 'none',
            border: '1px solid var(--border-light)', borderRadius: '999px',
            padding: '7px 15px', color: liked ? 'var(--accent-primary)' : 'var(--text-secondary)',
          }}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          {likes === null ? 'Like' : `${likes} ${likes === 1 ? 'like' : 'likes'}`}
        </button>

        <span style={stat}>
          <MessageCircle size={16} /> {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </span>
      </div>

      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1.25rem' }}>
        Comments
      </h2>

      {comments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '2rem' }}>
          {comments.map((c, i) => (
            <article
              key={i}
              style={{
                background: 'var(--card-bg)', border: '1px solid var(--border-light)',
                borderRadius: '12px', padding: '16px 18px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                <strong style={{ fontSize: '.9rem', color: 'var(--text-primary)' }}>{c.name}</strong>
                <span style={{ fontSize: '.78rem', color: 'var(--text-secondary)', opacity: 0.75 }}>
                  {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
            </article>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          No comments yet. Be the first.
        </p>
      )}

      {status === 'pending' ? (
        <div
          style={{
            background: 'var(--card-bg)', border: '1px solid var(--border-light)',
            borderLeft: '3px solid var(--accent-primary)', borderRadius: '12px', padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            Thanks — your comment has been submitted and will appear once reviewed.
          </p>
        </div>
      ) : (
        <form onSubmit={submitComment} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="dh-responsive-grid">
            <input
              style={input} placeholder="Your name" value={form.name} required maxLength={80}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              style={input} type="email" placeholder="Email (not published)" value={form.email} maxLength={160}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Honeypot — hidden from users, filled by bots. */}
          <input
            tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
          />

          <textarea
            style={{ ...input, minHeight: '110px', resize: 'vertical' }}
            placeholder="Your comment" value={form.body} required maxLength={2000}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />

          {error && <p style={{ fontSize: '.85rem', color: '#ef4444', margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--accent-primary)', color: '#0A0705', fontWeight: 700,
              fontSize: '.9rem', padding: '11px 20px', borderRadius: '10px',
              border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
              opacity: status === 'sending' ? 0.7 : 1,
            }}
          >
            {status === 'sending' ? 'Posting…' : 'Post comment'} <Send size={15} />
          </button>

          <p style={{ fontSize: '.78rem', color: 'var(--text-secondary)', opacity: 0.8, margin: 0 }}>
            Comments are reviewed before they appear. Your email is never published.
          </p>
        </form>
      )}
    </section>
  );
}
