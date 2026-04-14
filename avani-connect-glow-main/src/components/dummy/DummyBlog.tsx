import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Calendar } from 'lucide-react';

const DummyBlog = ({ blogs, loadingBlogs }: any) => {
  return (
    <section style={{ padding: '72px 0', background: '#1A1410', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.035, backgroundImage: `radial-gradient(circle, rgba(245,237,216,0.8) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: '#C4913A' }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: '#C4913A' }}>OUR BLOG</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, color: '#F5EDD8', lineHeight: 0.92, letterSpacing: '0.02em' }}>
              LATEST<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px #C4913A' }}>INSIGHTS</span>
            </h2>
          </div>
          {blogs.length > 3 && (
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#C4913A', textDecoration: 'none', paddingBottom: '6px', borderBottom: '1px solid rgba(196,145,58,0.35)', transition: 'all 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderBottomColor = '#C4913A'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(196,145,58,0.35)'}>
              VIEW ALL BLOGS <ArrowUpRight size={12} />
            </Link>
          )}
        </motion.div>

        {loadingBlogs ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div style={{ width: '22px', height: '22px', border: '2px solid rgba(196,145,58,0.2)', borderTopColor: '#C4913A', borderRadius: '50%', animation: 'dummy-spin 0.8s linear infinite' }} />
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Sparkles size={28} color="#C4913A" style={{ opacity: 0.4, margin: '0 auto 12px', display: 'block' }} />
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(245,237,216,0.35)', fontSize: '13px' }}>No blogs available yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }} className="dummy-blog-grid">
            {blogs.slice(0, 3).map((blog: any, i: number) => (
              <motion.div key={blog._id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(196,145,58,0.12)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.4s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                      {blog.featuredImage ? (
                        <>
                          <img src={blog.featuredImage} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,5,0.7) 0%, transparent 55%)' }} />
                        </>
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(196,145,58,0.08) 0%, rgba(26,20,16,1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Sparkles size={24} color="#C4913A" style={{ opacity: 0.35 }} />
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: '10px', left: '10px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', color: '#C4913A', letterSpacing: '0.2em', background: 'rgba(10,7,5,0.7)', padding: '3px 8px', borderRadius: '100px', border: '1px solid rgba(196,145,58,0.2)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>

                    <div style={{ padding: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                        <Calendar size={10} color="#C4913A" />
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'rgba(196,145,58,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(16px, 1.6vw, 20px)', color: '#F5EDD8', lineHeight: 1.15, letterSpacing: '0.04em', marginBottom: '8px' }}>
                        {blog.title.toUpperCase()}
                      </h3>

                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(245,237,216,0.45)', lineHeight: 1.65, fontWeight: 300, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {blog.excerpt || 'Read more to discover insights…'}
                      </p>

                      {blog.tags && blog.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          {blog.tags.slice(0, 2).map((tag: string, idx: number) => (
                            <span key={idx} style={{ padding: '2px 8px', background: 'rgba(196,145,58,0.08)', border: '1px solid rgba(196,145,58,0.18)', color: 'rgba(196,145,58,0.7)', fontFamily: "'Outfit', sans-serif", fontSize: '9px', borderRadius: '100px', letterSpacing: '0.05em' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: '#C4913A', letterSpacing: '0.16em' }}>
                        READ ARTICLE <ArrowUpRight size={11} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes dummy-spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { .dummy-blog-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .dummy-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default DummyBlog;