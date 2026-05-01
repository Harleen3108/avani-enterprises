import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2Newsletters = () => {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/newsletters`);
        setNewsletters(res.data);
      } catch {} finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">STAY UPDATED</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>NEWS<span style={{ color: 'var(--accent)' }}>LETTERS</span></h1>
            <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>Curated insights delivered to your inbox.</p>
          </motion.div>
        </div>
      </section>

      <section className="dh2-section" style={{ paddingTop: '2rem' }}>
        <div className="dh2-container" style={{ maxWidth: 800, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>Loading...</div>
          ) : newsletters.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>No newsletters published yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {newsletters.map((n: any, i: number) => (
                <motion.div key={n._id || i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .06 }}>
                  <Link to={`/newsletters/${n.slug || n._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 14, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color .3s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,255,0,.15)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-s)'}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.9rem', marginBottom: '.3rem' }}>{n.title}</h3>
                        {n.createdAt && <span style={{ fontSize: '.55rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '.2rem' }}><Clock size={10} /> {new Date(n.createdAt).toLocaleDateString()}</span>}
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
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

export default DH2Newsletters;
