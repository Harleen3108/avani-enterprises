import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Download, Eye, Sparkles, Send, CheckCircle } from 'lucide-react';
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

const DHNewsletters = () => {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/newsletters`, {
          headers: { 'Accept': 'application/json' }
        });
        const json = await response.json();
        if (json.success) setNewsletters(json.data || []);
      } catch (error) { console.error('Error fetching newsletters:', error); }
      finally { setIsLoading(false); }
    };
    fetchNewsletters();
  }, []);

  const handleSubscribe = (e: any) => { e.preventDefault(); if (email) setIsSubscribed(true); };

  return (
    <div className="dh-newsletters-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">ARCHIVES</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>CURATED</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">INTEL.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              Strategic insights, market intelligence, and technical oversight delivered directly to your <strong style={{ color: 'var(--accent-primary)' }}>command center.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. SUBSCRIPTION BAR */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'center' }} className="dh-responsive-grid">
            <div>
              <div className="dh-label">STAY INFORMED</div>
              <h2 className="dh-display" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>THE INSIDE TRACK.</h2>
              <p className="dh-body">Get exclusive deep-dives that we don't publish anywhere else.</p>
            </div>
            <div>
              {isSubscribed ? (
                <div style={{ background: 'var(--accent-hover)', padding: '2.5rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '2rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
                  <CheckCircle size={32} />
                  <div>
                    <h4 className="dh-heading" style={{ fontSize: '1.2rem' }}>WELCOME TO THE INNER CIRCLE</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>You've been successfully registered for our next transmission.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '1rem' }} className="dh-responsive-grid">
                  <input type="email" placeholder="ENTER YOUR WORK EMAIL" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '100px', padding: '0 2.5rem', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, outline: 'none' }} />
                  <button type="submit" className="dh-btn-fill"><Send size={18} /> SUBSCRIBE</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHIVE LIST */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ marginBottom: '4rem' }}>
            <h2 className="dh-display" style={{ fontSize: '3rem' }}>PREVIOUS EDITIONS</h2>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div className="dh-label">RETRIEVING ARCHIVES...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {newsletters.map((item, i) => (
                <motion.div 
                  key={item._id} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="dh-card dh-responsive-grid" style={{ padding: '2.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Transmission Date: {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                      <Link to={`/dummyhome/newsletters/${item.slug}`} className="dh-btn-ghost" style={{ padding: '1rem 2rem', fontSize: '0.75rem' }}>
                        <Eye size={16} /> VIEW ONLINE
                      </Link>
                      <button className="dh-btn-ghost" style={{ padding: '1rem 2rem', fontSize: '0.75rem', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>
                        <Download size={16} /> DOWNLOAD PDF
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default DHNewsletters;
