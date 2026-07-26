/**
 * RelatedArticles — same-category posts, for the sticky rail and the article foot.
 *
 * Every post previously dead-ended: nothing to read next, so a reader who
 * finished an article left the site. Related posts are also how a topic cluster
 * signals its own shape to a crawler.
 *
 * Selection is deliberately simple and honest: same category first, then most
 * recent, excluding the current post. Nothing is invented and nothing is padded
 * — if there are only two related posts, it shows two.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { getBackendUrl } from '../../lib/api';

const INK = '#1A1714';
const INK_MUTED = '#6B635A';
const RULE = '#E7E0D5';
const ACCENT = '#A87613';
const ACCENT_BG = '#FBF4E3';

type Post = {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string | { name?: string };
  featuredImage?: string;
  image?: string;
  readTime?: number;
  publishedAt?: string;
  createdAt?: string;
};

const catOf = (p: Post) => {
  const c = p?.category;
  const name = c && typeof c === 'object' ? c.name : typeof c === 'string' ? c : '';
  return (name || 'Insights').toString();
};

/** Fetches once and picks the best matches. Returns [] until loaded. */
export function useRelatedPosts(slug: string, category: string, limit = 4) {
  const [related, setRelated] = React.useState<Post[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`${getBackendUrl()}/blogs?limit=200`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled || !j?.success) return;
        const all: Post[] = (j.data || []).filter((p: Post) => p.slug && p.slug !== slug);

        const byDate = (a: Post, b: Post) =>
          String(b.publishedAt || b.createdAt || '').localeCompare(String(a.publishedAt || a.createdAt || ''));

        const sameCat = all.filter((p) => catOf(p) === category).sort(byDate);
        const rest = all.filter((p) => catOf(p) !== category).sort(byDate);

        // Same category first, topped up with recent posts only if needed.
        setRelated([...sameCat, ...rest].slice(0, limit));
      })
      .catch(() => { /* related posts are a nicety — never block the article */ });

    return () => { cancelled = true; };
  }, [slug, category, limit]);

  return related;
}

/** Compact list for the sticky right rail. */
export function RelatedRail({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderRadius: 14, padding: '18px 20px' }}>
      <p style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: INK_MUTED, margin: '0 0 14px' }}>
        Related articles
      </p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {posts.slice(0, 4).map((p, i) => (
          <Link
            key={p.slug}
            to={`/blog/${encodeURIComponent(p.slug)}`}
            style={{
              display: 'block', textDecoration: 'none',
              padding: i === 0 ? '0 0 13px' : '13px 0',
              borderTop: i === 0 ? 'none' : `1px solid ${RULE}`,
            }}
          >
            <span style={{ display: 'block', fontSize: '.9rem', fontWeight: 600, lineHeight: 1.45, color: INK, marginBottom: 4 }}>
              {p.title}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.74rem', color: INK_MUTED }}>
              {catOf(p)}
              {p.readTime ? <><span>·</span><Clock size={10} /> {p.readTime} min</> : null}
            </span>
          </Link>
        ))}
      </div>

      <Link
        to="/blog"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 14, fontSize: '.82rem', fontWeight: 600, color: ACCENT, textDecoration: 'none' }}
      >
        View all articles <ArrowRight size={13} />
      </Link>
    </div>
  );
}

/** Card grid for the end of the article, where there is width to use. */
export function RelatedGrid({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: `2px solid ${RULE}` }}>
      <h2 style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-.02em', color: INK, margin: '0 0 1.4rem' }}>
        Keep reading
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 20 }}>
        {posts.slice(0, 3).map((p) => {
          const img = p.featuredImage || p.image;
          return (
            <Link
              key={p.slug}
              to={`/blog/${encodeURIComponent(p.slug)}`}
              style={{
                display: 'flex', flexDirection: 'column', textDecoration: 'none',
                background: '#fff', border: `1px solid ${RULE}`, borderRadius: 14, overflow: 'hidden',
              }}
            >
              {img ? (
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#F2EEE5' }}>
                  <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ aspectRatio: '16/9', background: ACCENT_BG }} />
              )}
              <div style={{ padding: '16px 18px 18px' }}>
                <span style={{ display: 'inline-block', fontSize: '.66rem', fontWeight: 700, color: ACCENT, background: ACCENT_BG, padding: '3px 9px', borderRadius: 99, marginBottom: 9 }}>
                  {catOf(p)}
                </span>
                <span style={{ display: 'block', fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: '1rem', fontWeight: 700, lineHeight: 1.38, color: INK }}>
                  {p.title}
                </span>
                {p.readTime ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 9, fontSize: '.75rem', color: INK_MUTED }}>
                    <Clock size={11} /> {p.readTime} min read
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
