import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, BookOpen, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DH2Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/blogs`, {
          headers: { 'Accept': 'application/json' }
        });
        if (res.data.success) {
          setBlogs(res.data.data || []);
        } else {
          setBlogs(Array.isArray(res.data) ? res.data : []);
        }
      } catch { 
        console.error('Error fetching blogs'); 
        setBlogs([]);
      } finally { 
        setLoading(false); 
      }
    })();
  }, []);

  return (
    <div className="dh2-blog-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '60vh' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={14} className="dh2-hero-accent" /> INSIGHTS
            </motion.div>
            
            <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
              <span className="dh2-hero-line">
                <motion.span custom={0} variants={titleV}>EDITORIAL</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">THOUGHT</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={2} variants={titleV} className="dh2-hero-accent">LEADERSHIP.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              Dissecting the future of <strong style={{ color: 'var(--accent)' }}>business and technology</strong> through deep-dive analysis and strategic perspectives.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. BLOG GRID */}
      <section className="dh2-section" style={{ paddingTop: 0 }}>
        <div className="dh2-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '10rem 0' }}>
              <div className="dh2-loader-text" style={{ fontSize: '1.5rem' }}>LOADING ARTICLES...</div>
            </div>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '10rem 0' }}>
              <p className="dh2-body">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }} className="dh2-responsive-grid">
              {blogs.map((blog: any, i: number) => (
                <motion.div 
                  key={blog._id || i} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={`/dummyhome2/blog/${blog.slug || blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div 
                      className="dh2-blog-card" 
                      style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.4s var(--ease-out)' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                    >
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', borderRadius: '24px', overflow: 'hidden', marginBottom: '1.5rem', background: 'var(--bg-surface)' }}>
                        {blog.coverImage ? (
                          <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', color: 'var(--accent)' }}>
                            <Sparkles size={40} opacity={0.1} />
                          </div>
                        )}
                        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                          <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase' }}>
                            {blog.category || 'Insights'}
                          </span>
                        </div>
                      </div>

                      <div style={{ padding: '0 0.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={12} /> {blog.author || 'Avani Editorial'}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={12} /> {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <h3 className="dh2-heading" style={{ fontSize: '1.4rem', marginBottom: '1rem', lineHeight: 1.4, color: 'var(--text-main)' }}>{blog.title}</h3>
                        <p className="dh2-body" style={{ fontSize: '0.9rem', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {blog.excerpt || (blog.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...')}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
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

      {/* 3. NEWSLETTER CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">INSIGHTS</div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="dh2-display dh2-cta-title">
            STAY AHEAD OF<br /><span>THE CURVE.</span>
          </h2>
          <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
            Subscribe to our weekly newsletter for exclusive strategic insights and industry updates.
          </p>
          <form style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }} className="dh2-newsletter-form">
            <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '100px', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', color: '#fff', outline: 'none' }} />
            <button className="dh2-btn-fill" style={{ padding: '1rem 2rem' }}>SUBSCRIBE</button>
          </form>
        </motion.div>
      </section>

    </div>
  );
};

export default DH2Blog;
