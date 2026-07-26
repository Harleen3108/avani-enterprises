import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Share2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBackendUrl } from '../lib/api';
import BlogEngagement from '../components/blog/BlogEngagement';
import BusinessSetup3Form from '../components/BusinessSetup3Form';
import { formatBlogBody, PROSE_CSS } from '../data/blogFormat';
import '../components/Home.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const backendUrl = getBackendUrl();
        const response = await fetch(`${backendUrl}/blogs/${encodeURIComponent(slug || '')}`);
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
      <div className="dh-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-light)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="dh-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <h1 className="dh-display">Article Not Found</h1>
        <Link to="/blog" className="dh-btn-ghost" style={{ marginTop: '2rem' }}><ArrowLeft size={14} style={{ marginRight: '8px' }} /> Return to Insights</Link>
      </div>
    );
  }

  const backendUrl = getBackendUrl();
  const imageUrl = blog.featuredImage?.startsWith('http') ? blog.featuredImage : `${backendUrl}${blog.featuredImage}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription || blog.title,
    image: imageUrl || 'https://www.avanienterprises.in/logo.png',
    author: {
      '@type': 'Person',
      '@id': 'https://www.avanienterprises.in/#kapil-khandelwal',
      name: blog.author || 'Kapil Khandelwal',
      url: 'https://www.linkedin.com/in/kapil-khandelwal-avani/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.avanienterprises.in/#organization',
      name: 'Avani Enterprises',
      logo: { '@type': 'ImageObject', url: 'https://www.avanienterprises.in/logo0.webp', width: 200, height: 60 }
    },
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.avanienterprises.in/blog/${encodeURIComponent(slug || '')}` },
    keywords: Array.isArray(blog.tags) ? blog.tags.join(', ') : undefined
  };

  return (
    <div className="dh-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>
      {/* Article Header */}
      <section style={{ paddingTop: '7rem', paddingBottom: '2rem', position: 'relative' }}>
        <div className="dh-container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ArrowLeft size={14} /> Back to Insights
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} />
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {blog.readTime && <span>· {blog.readTime} min read</span>}
            </div>

            <h1 className="dh-display" style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.7rem)', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              {blog.title}
            </h1>

            {blog.tags && blog.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {blog.tags.map((tag: string, idx: number) => (
                  <span key={idx} style={{ padding: '0.4rem 1rem', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Tag size={10} style={{ color: 'var(--accent-primary)' }}/> {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage && (
        <section style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <div className="dh-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-light)', aspectRatio: '16/9', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <img src={imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div className="dh-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}>
            {/* Article body.
                The CMS stores three different shapes — proper HTML, markdown,
                and plain newline-separated text — and previously all three
                rendered as one flat wall. formatBlogBody normalises them into
                semantic HTML, and .prose supplies the typography. Same function
                and same markup as the SSR path, so readers and Googlebot get
                identical output. */}
            <style>{PROSE_CSS}</style>
            <div
              className="prose dh-body"
              dangerouslySetInnerHTML={{
                __html: formatBlogBody(blog.content, { title: blog.title }),
              }}
            />

            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Share this article
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="dh-btn-ghost" style={{ padding: '0.6rem', minWidth: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Share2 size={16} /></button>
              </div>
            </div>

            {/* Conversion: every post ends with the lead form. generate_lead
                fires on submit carrying this post's path as attribution, so GA4
                shows which articles actually produce enquiries. */}
            <section
              id="consultation"
              style={{
                marginTop: '3rem', background: 'var(--card-bg)',
                border: '1px solid var(--border-light)', borderRadius: '18px',
                padding: '28px', scrollMarginTop: 90,
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: 800, margin: '0 0 .4rem' }}>
                Want this looked at for your business?
              </h2>
              <p style={{ fontSize: '.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
                Tell us your goal and we will come back with a written scope — no obligation, and we will
                say plainly if we are not the right fit.
              </p>
              <BusinessSetup3Form source={`blog:${slug}`} />
            </section>

            {/* Views, likes and comments */}
            <BlogEngagement slug={slug || ''} views={blog.views} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
