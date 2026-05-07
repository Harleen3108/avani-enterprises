import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Briefcase, Search, Clock, CheckCircle, Zap, Users, Sparkles } from 'lucide-react';
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

const DH2Careers = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDepartment, setActiveDepartment] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/jobs`);
        setJobs(res.data.data || res.data || []);
      } catch (err) {
        console.error('Error fetching jobs', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const departments = [
    { id: 'all', name: 'All Roles' },
    { id: 'development', name: 'Engineering' },
    { id: 'design', name: 'Creative' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'business', name: 'Strategy' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = activeDepartment === 'all' || (job.department && job.department.toLowerCase().includes(activeDepartment));
    const matchesSearch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="dh2-careers-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '60vh' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={14} className="dh2-hero-accent" /> TALENT ACQUISITION
            </motion.div>
            
            <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
              <span className="dh2-hero-line">
                <motion.span custom={0} variants={titleV}>JOIN THE</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">ELITE</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={2} variants={titleV} className="dh2-hero-accent">SQUAD.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              We're building more than just products; we're building a <strong style={{ color: 'var(--accent)' }}>legacy of innovation</strong>. Join a team where your impact is visible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH & FILTERS */}
      <section className="dh2-section" style={{ paddingTop: 0 }}>
        <div className="dh2-container">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '32px', padding: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'center' }} className="dh2-responsive-grid">
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input 
                  type="text" 
                  placeholder="Search by role or keyword..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '1.2rem 1.5rem 1.2rem 3.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: '100px', color: '#fff', fontSize: '0.9rem', outline: 'none' }} 
                />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'flex-end' }} className="dh2-filter-row">
                {departments.map(dept => (
                  <button 
                    key={dept.id} 
                    onClick={() => setActiveDepartment(dept.id)}
                    style={{ 
                      padding: '0.6rem 1.2rem', 
                      borderRadius: '100px', 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      border: '1px solid',
                      borderColor: activeDepartment === dept.id ? 'var(--accent)' : 'var(--border-s)',
                      background: activeDepartment === dept.id ? 'var(--accent)' : 'transparent',
                      color: activeDepartment === dept.id ? '#000' : 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOBS LIST */}
      <section className="dh2-section">
        <div className="dh2-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <div className="dh2-loader-text" style={{ fontSize: '1.5rem' }}>SCOUTING OPPORTUNITIES...</div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <Briefcase size={48} style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }} />
              <h3 className="dh2-display" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>No Matches Found</h3>
              <p className="dh2-body">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }} className="dh2-responsive-grid">
              {filteredJobs.map((job: any, i: number) => (
                <motion.div 
                  key={job._id || i} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.1 }}
                >
                  <div 
                    onClick={() => navigate(`/dummyhome2/careers/${job._id}`)}
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '24px', padding: '3rem', cursor: 'pointer', transition: 'all 0.4s var(--ease-out)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-10px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-s)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '0.4rem 1rem', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {job.department || 'General'}
                      </span>
                      <ArrowRight size={20} style={{ color: 'var(--text-dim)' }} className="dh2-job-arrow" />
                    </div>
                    <h3 className="dh2-display" style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <MapPin size={14} style={{ color: 'var(--accent)' }} /> {job.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <Clock size={14} style={{ color: 'var(--accent)' }} /> {job.type || 'Full Time'}
                      </div>
                    </div>
                    <p className="dh2-body" style={{ fontSize: '0.9rem', marginBottom: '2.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {job.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em' }}>
                      APPLY NOW <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. PERKS SECTION */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'center' }} className="dh2-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh2-label" style={{ marginBottom: '1.5rem' }}>CULTURE & PERKS</div>
              <h2 className="dh2-display" style={{ fontSize: '3rem', marginBottom: '2rem' }}>WHY AVANI?</h2>
              <p className="dh2-body" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>We don't just offer jobs; we offer the platform to build something that lasts. Here's how we support our crew.</p>
              <div className="dh2-btn-ghost">View Culture Manual</div>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="dh2-perks-grid">
              {[
                { title: 'Global Mobility', icon: <Globe size={24} /> },
                { title: 'Rapid Growth', icon: <Zap size={24} /> },
                { title: 'Equity Options', icon: <Sparkles size={24} /> },
                { title: 'Elite Network', icon: <Users size={24} /> }
              ].map((perk, i) => (
                <motion.div 
                  key={i} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.1 }}
                  style={{ background: 'var(--bg-base)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-s)' }}
                >
                  <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>{perk.icon}</div>
                  <h4 className="dh2-heading" style={{ fontSize: '1.1rem' }}>{perk.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">CREW</div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="dh2-display dh2-cta-title">
            READY TO JOIN THE<br /><span>REVOLUTION?</span>
          </h2>
          <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
            If you don't see a role that fits but think you can make an impact, drop us a line at <strong style={{ color: 'var(--accent)' }}>kp@avanienterprises.in</strong>
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/dummyhome2/contact" className="dh2-btn-fill">General Inquiry</Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default DH2Careers;
