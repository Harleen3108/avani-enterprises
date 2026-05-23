import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBackendUrl } from '../../lib/api';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

/* Shared visual helpers */
const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const GridBg = ({ size = 40, opacity = 0.06 }: any) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />
);
const GlowBlob = ({ top, left, right, bottom, w = 300, opacity = 0.05, blur = 100 }: any) => (
  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.4, opacity] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: w, height: w, borderRadius: '50%', background: 'var(--accent-primary)', filter: `blur(${blur}px)`, top, left, right, bottom, pointerEvents: 'none', zIndex: 1 }} />
);
const LuxuryLine = () => (
  <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 20%, var(--accent-light) 50%, var(--accent-primary) 80%, transparent)', opacity: 0.3 }} />
);

const DHBlog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      }
      finally { setIsLoading(false); }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="dh-blog-page">

      {/* 1. CINEMATIC HERO */}
      <section className="theme-brown" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.06} />
        <GlowBlob top="-5%" right="-5%" w={400} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">EDITORIAL</motion.div>
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>THOUGHT</motion.span></span>
              <span className="dh-hero-line"><motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span></span>
              <span className="dh-hero-line"><motion.span custom={2} variants={titleV} className="dh-hero-accent">INTEL.</motion.span></span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              Deep dives into <strong style={{ color: 'var(--accent-primary)' }}>enterprise technology, market shifts, and digital craftsmanship.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. SEARCH & TAGS */}
      <section className="theme-beige" style={{ padding: '2rem 0', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }} className="dh-responsive-grid">
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={18} style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input type="text" placeholder="SEARCH INTEL..." style={{ width: '100%', padding: '1rem 0 1rem 2.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {['ALL', 'TECHNOLOGY', 'BUSINESS', 'MARKETING', 'AI'].map((tag, i) => (
                <button key={i} style={{ background: 'none', border: 'none', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-tertiary)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'color 0.3s' }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BLOG GRID */}
      <section className="theme-beige" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        <GlowBlob bottom="10%" right="-60px" w={280} opacity={0.04} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '10rem 0' }}>
              <div className="dh-label">SYNCHRONIZING...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }} className="dh-blog-list">
              {blogs.map((blog, i) => (
                <motion.div key={blog._id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}>
                  <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0',
                      borderBottom: '1px solid var(--border-faint)', cursor: 'pointer', transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.paddingLeft = '1rem'; e.currentTarget.style.paddingRight = '1rem'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                      onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.paddingRight = '0'; e.currentTarget.style.background = 'transparent'; }}
                      className="dh-blog-item"
                    >
                      {/* Left: Blog Title and Meta */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            <Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                          </span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="dh-hide-mobile">
                            <User size={12} /> {blog.author || 'Avani Intel'}
                          </span>
                        </div>
                        <h3 className="dh-heading" style={{ fontSize: '1.6rem', margin: 0, lineHeight: 1.3 }}>{blog.title}</h3>
                        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.3rem' }} className="dh-hide-mobile">
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', background: 'var(--card-bg)', padding: '4px 10px', borderRadius: '100px', border: '1px solid var(--border-faint)' }}>TECHNOLOGY</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', background: 'var(--card-bg)', padding: '4px 10px', borderRadius: '100px', border: '1px solid var(--border-faint)' }}>INSIGHTS</span>
                        </div>
                      </div>

                      {/* Right: Read Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }} className="dh-blog-action">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                          READ ARTICLE <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <LuxuryLine />

      {/* 4. NEWSLETTER CTA */}
      <section className="theme-brown" style={{ position: 'relative', padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="20%" left="30%" w={400} opacity={0.03} blur={120} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ padding: '5rem', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-faint)', textAlign: 'center', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, borderTop: '2px solid var(--accent-primary)', borderLeft: '2px solid var(--accent-primary)', borderRadius: '24px 0 0 0', opacity: 0.3 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, borderBottom: '2px solid var(--accent-primary)', borderRight: '2px solid var(--accent-primary)', borderRadius: '0 0 24px 0', opacity: 0.3 }} />
            <div className="dh-label">INTEL FEED</div>
            <h2 className="dh-display" style={{ fontSize: '3rem', marginBottom: '2rem' }}>SUBSCRIBE TO INSIGHTS</h2>
            <p className="dh-body" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>Join 5,000+ industry leaders receiving our weekly deep-dives on technology and market strategy.</p>
            <div style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '1rem' }} className="dh-responsive-grid">
              <input type="email" placeholder="YOUR EMAIL ADDRESS" style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '100px', padding: '0 2rem', color: 'var(--text-primary)', outline: 'none' }} />
              <button className="dh-btn-fill">JOIN NOW</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .dh-responsive-grid {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .dh-blog-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
            padding: 1.5rem 1rem !important;
          }
          .dh-hide-mobile {
            display: none !important;
          }
          .dh-hero-title {
            font-size: clamp(2.5rem, 8vw, 4rem) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DHBlog;
