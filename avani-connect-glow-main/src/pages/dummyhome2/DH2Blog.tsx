import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/blogs`);
        setBlogs(res.data);
      } catch { console.error('Error fetching blogs'); } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">INSIGHTS</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>OUR <span style={{ color: 'var(--accent)' }}>BLOG</span></h1>
            <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>Latest insights, trends, and strategies in digital transformation.</p>
          </motion.div>
        </div>
      </section>

      <section className="dh2-section" style={{ paddingTop: '2rem' }}>
        <div className="dh2-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>Loading articles...</div>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>No articles yet.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
              {blogs.map((blog: any, i: number) => (
                <motion.div key={blog._id || i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .06 }}>
                  <Link to={`/blog/${blog.slug || blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 14, overflow: 'hidden', transition: 'border-color .3s, transform .3s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,255,0,.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-s)'; e.currentTarget.style.transform = 'none'; }}>
                      {blog.coverImage && <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />}
                      <div style={{ padding: '1.5rem' }}>
                        {blog.category && <div style={{ fontSize: '.5rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.5rem' }}>{blog.category}</div>}
                        <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.9rem', marginBottom: '.5rem', lineHeight: 1.4 }}>{blog.title}</h3>
                        <p className="dh2-body" style={{ fontSize: '.7rem', lineHeight: 1.6, marginBottom: '.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {blog.excerpt || blog.content?.substring(0, 120) + '...'}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '.55rem', color: 'var(--text-dim)' }}>
                          {blog.author && <span style={{ display: 'flex', alignItems: 'center', gap: '.2rem' }}><User size={10} /> {blog.author}</span>}
                          {blog.createdAt && <span style={{ display: 'flex', alignItems: 'center', gap: '.2rem' }}><Clock size={10} /> {new Date(blog.createdAt).toLocaleDateString()}</span>}
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
    </div>
  );
};

export default DH2Blog;
