import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBackendUrl } from '../lib/api';
import Prose from '../components/blog/Prose';
import '../components/Home.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

/** Same reading surface as an article — see blogFormat.js PROSE_CSS. */
const PAPER = '#FFFDF9';

const NewsletterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [newsletter, setNewsletter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const backendUrl = getBackendUrl();
        const response = await fetch(`${backendUrl}/api/newsletters/${encodeURIComponent(slug || '')}`, {
          headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        if (data.success) setNewsletter(data.data);
      } catch (error) {
        console.error('Error fetching newsletter:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletter();
  }, [slug]);

  if (loading) {
    return (
      <div className="dh-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-light)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="dh-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <h1 className="dh-display">Newsletter Not Found</h1>
        <Link to="/newsletters" className="dh-btn-ghost" style={{ marginTop: '2rem' }}><ArrowLeft size={14} style={{ marginRight: '8px' }} /> Return to Newsletters</Link>
      </div>
    );
  }

  const backendUrl = getBackendUrl();
  const imageUrl = newsletter.imageUrl?.startsWith('http') ? newsletter.imageUrl : `${backendUrl}${newsletter.imageUrl}`;

  return (
    <div className="dh-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* Article Header */}
      <section style={{ paddingTop: '10rem', paddingBottom: '3rem', position: 'relative' }}>
        <div className="dh-container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link to="/newsletters" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ArrowLeft size={14} /> Back to Newsletters
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} />
                {new Date(newsletter.publishedAt || newsletter.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)' }}>
                <Mail size={14} /> Edition
              </span>
            </div>

            <h1 className="dh-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              {newsletter.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {newsletter.imageUrl && (
        <section style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <div className="dh-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-light)', aspectRatio: '16/9', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <img src={imageUrl} alt={newsletter.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter body
          ---------------
          Was a raw dangerouslySetInnerHTML with only a font-size and colour, so
          headings, lists and paragraph spacing all rendered as flat body text —
          the same failure the blog had. It now goes through the identical
          <Prose> pipeline: the content is normalised into semantic HTML and
          styled by PROSE_CSS, on the same light reading surface as an article. */}
      <section style={{ background: PAPER, paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div className="dh-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}>
            <Prose content={newsletter.content} title={newsletter.title} />

            <div style={{ maxWidth: '44rem', margin: '3.5rem auto 0', paddingTop: '1.75rem', borderTop: '1px solid #E7E0D5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: '#6B635A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Share this newsletter
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="dh-btn-ghost" style={{ padding: '0.6rem', minWidth: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Share2 size={16} /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsletterDetail;
