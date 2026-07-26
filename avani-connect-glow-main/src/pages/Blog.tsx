/**
 * Blog.tsx — the article index.
 *
 * Light "paper" surface for the listing, matching the article pages, on the
 * site's dark chrome. The category chips are real URLs (/blog/category/<slug>)
 * rather than local state only, so a filtered view can be linked, shared and
 * indexed; api/seo.js server-renders the same grouping for crawlers.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Search, Clock, Eye } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getBackendUrl } from '../lib/api';
import '../components/Home.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const GridBg = ({ size = 40, opacity = 0.06 }: any) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />
);
const GlowBlob = ({ top, left, right, bottom, w = 300, opacity = 0.05, blur = 100 }: any) => (
  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.4, opacity] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: w, height: w, borderRadius: '50%', background: 'var(--accent-primary)', filter: `blur(${blur}px)`, top, left, right, bottom, pointerEvents: 'none', zIndex: 1 }} />
);

/* Light surface palette — kept identical to blogFormat.js PROSE_CSS. */
const PAPER = '#FFFDF9';
const INK = '#1A1714';
const INK_BODY = '#3A352E';
const INK_MUTED = '#6B635A';
const RULE = '#E7E0D5';
const ACCENT = '#A87613';
const ACCENT_BG = '#FBF4E3';

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const { category: categoryParam } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const API_BASE = getBackendUrl();
        const res = await fetch(`${API_BASE}/blogs`);
        const json = await res.json();
        if (json?.success) {
          const fetched = json.data || [];
          setBlogs(fetched.filter((post: any) => post.isPublished));
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally { setIsLoading(false); }
    };
    fetchBlogs();
  }, []);

  const toSlug = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /** The backend sends category as an object, a string, or nothing. */
  const getCat = (b: any) => {
    const c = b?.category;
    const name = (c && typeof c === 'object' && c.name) ? c.name : (typeof c === 'string' ? c : '');
    return (name || 'Insights').toString();
  };

  const allCategories = Array.from(new Set(blogs.map(getCat))).sort();

  // A /blog/category/<slug> URL wins over local chip state, so a shared or
  // crawled link lands on the right filter.
  const urlCategory = categoryParam
    ? allCategories.find((c) => toSlug(c) === categoryParam) || null
    : null;
  const effectiveFilter = urlCategory || activeFilter;

  const categories = ['ALL', ...allCategories];
  const visibleBlogs = blogs.filter((b) => {
    const matchCat = effectiveFilter === 'ALL' || getCat(b) === effectiveFilter;
    const q = search.trim().toLowerCase();
    const matchSearch = !q
      || (b.title || '').toLowerCase().includes(q)
      || (b.excerpt || '').toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const countFor = (c: string) => (c === 'ALL' ? blogs.length : blogs.filter((b) => getCat(b) === c).length);

  return (
    <div className="dh-blog-page">

      {/* 1. HERO — stays dark, so the light listing below reads as a surface */}
      <section className="theme-brown" style={{ minHeight: '48vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '96px', paddingBottom: '48px' }}>
        <Grain />
        <GridBg size={50} opacity={0.06} />
        <GlowBlob top="-5%" right="-5%" w={400} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">EDITORIAL</motion.div>
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>
              <motion.span custom={0} variants={titleV}>
                {urlCategory ? `${urlCategory} articles` : 'Insights & guides'}
              </motion.span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '620px', fontSize: '1.05rem', margin: 0 }}>
              Writing from client work on web development, technical SEO, Google and Meta Ads, and applied AI.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. LIGHT LISTING SURFACE */}
      <section style={{ background: PAPER, padding: '0 0 72px' }}>
        <div className="dh-container">

          {/* Search + category chips */}
          <div style={{ padding: '32px 0 28px', borderBottom: `1px solid ${RULE}`, marginBottom: '36px' }}>
            <div style={{ position: 'relative', maxWidth: '520px', marginBottom: '22px' }}>
              <Search size={17} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: INK_MUTED }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                style={{ width: '100%', padding: '13px 16px 13px 44px', background: '#fff', border: `1px solid ${RULE}`, borderRadius: '12px', color: INK, fontSize: '0.95rem', outline: 'none', fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div style={{ display: 'flex', gap: '9px', flexWrap: 'wrap' }}>
              {categories.map((tag) => {
                const on = effectiveFilter === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveFilter(tag);
                      navigate(tag === 'ALL' ? '/blog' : `/blog/category/${toSlug(tag)}`);
                    }}
                    style={{
                      background: on ? INK : '#fff',
                      color: on ? PAPER : INK_BODY,
                      border: `1px solid ${on ? INK : RULE}`,
                      borderRadius: '100px',
                      padding: '8px 16px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: "'Inter', sans-serif",
                      minHeight: '38px',
                    }}
                  >
                    {tag === 'ALL' ? 'All' : tag}
                    <span style={{ opacity: 0.55, marginLeft: '6px' }}>{countFor(tag)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '7rem 0', color: INK_MUTED }}>Loading articles…</div>
          ) : visibleBlogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0', color: INK_MUTED }}>No articles match that search.</div>
          ) : (
            <>
              <p style={{ color: INK_MUTED, fontSize: '0.88rem', margin: '0 0 22px' }}>
                {visibleBlogs.length} article{visibleBlogs.length === 1 ? '' : 's'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 330px), 1fr))', gap: '28px' }} className="dh-blog-grid">
                {visibleBlogs.map((blog, i) => (
                  <motion.div key={blog._id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: Math.min(i, 6) * 0.04 }} style={{ display: 'flex' }}>
                    <Link to={`/blog/${encodeURIComponent(blog.slug)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}>
                      <article
                        className="dh-blog-card"
                        style={{
                          display: 'flex', flexDirection: 'column', width: '100%',
                          background: '#fff', border: `1px solid ${RULE}`, borderRadius: '16px',
                          overflow: 'hidden', cursor: 'pointer',
                          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 14px 34px rgba(26,23,20,0.10)';
                          e.currentTarget.style.borderColor = '#DCD2C0';
                          const img = e.currentTarget.querySelector('.dh-blog-img') as HTMLElement;
                          if (img) img.style.transform = 'scale(1.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = RULE;
                          const img = e.currentTarget.querySelector('.dh-blog-img') as HTMLElement;
                          if (img) img.style.transform = 'scale(1)';
                        }}
                      >
                        {(blog.featuredImage || blog.image) ? (
                          <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: '#F2EEE5' }}>
                            <img
                              src={blog.featuredImage || blog.image}
                              alt={blog.title}
                              loading="lazy"
                              className="dh-blog-img"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s ease' }}
                            />
                          </div>
                        ) : (
                          <div style={{ width: '100%', aspectRatio: '16/10', background: ACCENT_BG }} />
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 22px 22px', flex: 1 }}>
                          {/* Category badge + read time */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: ACCENT, background: ACCENT_BG, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.02em' }}>
                              {getCat(blog)}
                            </span>
                            {blog.readTime ? (
                              <span style={{ fontSize: '0.72rem', color: INK_MUTED, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={11} /> {blog.readTime} min read
                              </span>
                            ) : null}
                          </div>

                          <h2 style={{ fontFamily: "'Outfit', 'Inter', sans-serif", fontSize: '1.12rem', fontWeight: 700, lineHeight: 1.34, letterSpacing: '-0.015em', color: INK, margin: '0 0 10px' }}>
                            {blog.title}
                          </h2>

                          {blog.excerpt && (
                            <p style={{ fontSize: '0.88rem', lineHeight: 1.62, color: INK_BODY, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {blog.excerpt.trim()}
                            </p>
                          )}

                          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: `1px solid ${RULE}`, gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.72rem', color: INK_MUTED, minWidth: 0 }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                                <Calendar size={11} />
                                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                              {typeof blog.views === 'number' && blog.views > 0 && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Eye size={11} /> {blog.views}
                                </span>
                              )}
                            </div>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: ACCENT, fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                              Read <ArrowRight size={13} />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3. CTA — no subscriber count, because we do not have a verified one. */}
      <section className="theme-brown" style={{ position: 'relative', padding: '84px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="20%" left="30%" w={400} opacity={0.03} blur={120} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ padding: 'clamp(1.75rem, 5vw, 4rem)', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-faint)', textAlign: 'center' }}>
            <div className="dh-label">Next step</div>
            <h2 className="dh-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '1rem' }}>
              Want this applied to your business?
            </h2>
            <p className="dh-body" style={{ maxWidth: '580px', margin: '0 auto 2rem' }}>
              Tell us your goal and we will come back with a written scope — no obligation, and we will say
              plainly if we are not the right fit.
            </p>
            <Link to="/contact" className="dh-btn-fill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              Book a free consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .dh-blog-grid { gap: 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default Blog;
