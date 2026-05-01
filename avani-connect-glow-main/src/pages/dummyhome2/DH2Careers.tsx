import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Briefcase } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2Careers = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/jobs`);
        setJobs(res.data);
      } catch { } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">JOIN US</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>CAREER <span style={{ color: 'var(--accent)' }}>OPPORTUNITIES</span></h1>
            <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>Join our team and be part of something extraordinary.</p>
          </motion.div>
        </div>
      </section>

      <section className="dh2-section" style={{ paddingTop: '2rem' }}>
        <div className="dh2-container" style={{ maxWidth: 800, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>Loading positions...</div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <Briefcase size={40} style={{ color: 'var(--text-dim)', margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, marginBottom: '.5rem' }}>No Open Positions</h3>
              <p style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>Check back soon or send your resume to kp@avanienterprises.in</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {jobs.map((job: any, i: number) => (
                <motion.div key={job._id || i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .06 }}>
                  <Link to={`/careers/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 14, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color .3s', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,255,0,.15)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-s)'}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', marginBottom: '.3rem' }}>{job.title}</h3>
                        <div style={{ display: 'flex', gap: '.8rem', fontSize: '.6rem', color: 'var(--text-muted)' }}>
                          {job.location && <span style={{ display: 'flex', alignItems: 'center', gap: '.2rem' }}><MapPin size={10} /> {job.location}</span>}
                          {job.type && <span>{job.type}</span>}
                          {job.department && <span>{job.department}</span>}
                        </div>
                      </div>
                      <ArrowRight size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
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

export default DH2Careers;
