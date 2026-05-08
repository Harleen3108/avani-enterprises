import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Search, Filter, Sparkles, Zap, Shield } from 'lucide-react';
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

const DHCareers = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs`);
        if (response.data.success) setJobs(response.data.data || []);
      } catch (error) { console.error('Error fetching jobs:', error); }
      finally { setIsLoading(false); }
    };
    fetchJobs();
  }, []);

  return (
    <div className="dh-careers-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">OPPORTUNITIES</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>JOIN THE</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">ELITE DIGITAL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">SQUAD.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We're looking for architects, engineers, and strategists ready to define the <strong style={{ color: 'var(--accent-primary)' }}>next era of connectivity.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS & CULTURE */}
      <section className="dh-section" style={{ paddingTop: 0 }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="dh-responsive-grid">
            {[
              { icon: <Shield size={32} />, title: 'High Impact', desc: 'Work on enterprise-scale solutions that move markets.' },
              { icon: <Zap size={32} />, title: 'Rapid Growth', desc: 'Accelerate your career in a high-performance environment.' },
              { icon: <Sparkles size={32} />, title: 'Innovation First', desc: 'Always pushing technical and creative boundaries.' }
            ].map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="dh-card" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{stat.title}</h3>
                <p className="dh-body" style={{ fontSize: '0.9rem' }}>{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEARCH & FILTERS */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="dh-responsive-grid">
            <div style={{ position: 'relative', width: '400px' }} className="dh-responsive-grid">
              <Search size={18} style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input type="text" placeholder="SEARCH POSITIONS..." style={{ width: '100%', padding: '1rem 0 1rem 2.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '3rem' }}>
              {['ALL ROLES', 'ENGINEERING', 'STRATEGY', 'CREATIVE'].map((cat, i) => (
                <button key={i} style={{ background: 'none', border: 'none', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-tertiary)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. JOB BOARD */}
      <section className="dh-section">
        <div className="dh-container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '10rem 0' }}>
              <div className="dh-label">SCANNING OPPORTUNITIES...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {jobs.length > 0 ? jobs.map((job, i) => (
                <motion.div 
                  key={job._id} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/dummyhome/careers/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="dh-card dh-responsive-grid" style={{ padding: '2.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--accent-hover)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Briefcase size={28} />
                        </div>
                        <div>
                          <h3 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                          <div style={{ display: 'flex', gap: '2rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> {job.location || 'Remote'}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} /> {job.type || 'Full-time'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="dh-btn-ghost">
                        APPLY NOW <ArrowRight size={18} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )) : (
                <div style={{ textAlign: 'center', padding: '6rem', border: '1px dashed var(--border-light)', borderRadius: '32px' }}>
                  <p className="dh-body">No open positions at the moment. Send us your CV for future opportunities.</p>
                  <button className="dh-btn-fill" style={{ marginTop: '2rem' }}>GENERAL APPLICATION</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default DHCareers;
