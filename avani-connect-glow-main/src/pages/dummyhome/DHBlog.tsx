import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DHBlog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs`);
        if (response.data.success) setBlogs(response.data.data || []);
      } catch (error) { console.error('Error fetching blogs:', error); }
      finally { setIsLoading(false); }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="dh-blog-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">EDITORIAL</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>THOUGHT</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">INTEL.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              Deep dives into <strong style={{ color: 'var(--accent-primary)' }}>enterprise technology, market shifts, and digital craftsmanship.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH & TAGS */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="dh-responsive-grid">
            <div style={{ position: 'relative', width: '400px' }} className="dh-responsive-grid">
              <Search size={18} style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input type="text" placeholder="SEARCH INTEL..." style={{ width: '100%', padding: '1rem 0 1rem 2.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {['ALL', 'TECHNOLOGY', 'BUSINESS', 'MARKETING', 'AI'].map((tag, i) => (
                <button key={i} style={{ background: 'none', border: 'none', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-tertiary)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BLOG GRID */}
      <section className="dh-section">
        <div className="dh-container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '10rem 0' }}>
              <div className="dh-label">SYNCHRONIZING...</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="dh-responsive-grid">
              {blogs.map((blog, i) => (
                <motion.div 
                  key={blog._id} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/dummyhome/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="dh-card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                        <img src={blog.coverImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop'} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.8)', transition: 'all 0.5s var(--ease-out)' }} onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%) brightness(1)'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(100%) brightness(0.8)'; e.currentTarget.style.transform = 'scale(1)'; }} />
                      </div>
                      <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={12} /> {blog.author || 'Avani Intel'}</span>
                        </div>
                        <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.3, flex: 1 }}>{blog.title}</h3>
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

      {/* 4. NEWSLETTER CTA */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div className="dh-card" style={{ padding: '6rem', background: 'var(--bg-tertiary)', textAlign: 'center' }}>
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

    </div>
  );
};

export default DHBlog;
