import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
        const data = await response.json();
        if (data.success) setBlog(data.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="dh2-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-s)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="dh2-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="dh2-display">Blog Not Found</h1>
        <Link to="/dummyhome2/blog" className="dh2-btn-ghost" style={{ marginTop: '2rem' }}>Return to Blog <ArrowLeft size={14} /></Link>
      </div>
    );
  }

  const imageUrl = blog.featuredImage?.startsWith('http') ? blog.featuredImage : `${API_BASE_URL}${blog.featuredImage}`;

  return (
    <div className="dh2-page">
      {/* Article Header */}
      <section className="dh2-section" style={{ paddingTop: '8rem', paddingBottom: '3rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-s)' }}>
        <div className="dh2-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link to="/dummyhome2/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ArrowLeft size={14} /> Back to Insights
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} />
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {blog.readTime && <span>· {blog.readTime} min read</span>}
            </div>

            <h1 className="dh2-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              {blog.title}
            </h1>

            {blog.tags && blog.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {blog.tags.map((tag: string, idx: number) => (
                  <span key={idx} style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-s)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage && (
        <section className="dh2-section" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
          <div className="dh2-container" style={{ maxWidth: '1000px' }}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-s)', aspectRatio: '16/9' }}>
              <img src={imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="dh2-section" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div className="dh2-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div 
              className="dh2-body dh2-blog-content" 
              style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)' }}
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />

            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-s)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                Share this article
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="dh2-btn-ghost" style={{ padding: '0.5rem' }}><Share2 size={16} /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DH2BlogDetail;
