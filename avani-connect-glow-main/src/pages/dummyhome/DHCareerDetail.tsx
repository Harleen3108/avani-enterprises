import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle, Mail, Phone } from 'lucide-react';
import '../../components/dummy/DummyHome.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const GridBg = ({ size = 40, opacity = 0.06 }: any) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />
);
const GlowBlob = ({ top, left, right, bottom, w = 300, opacity = 0.05, blur = 100 }: any) => (
  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.4, opacity] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: w, height: w, borderRadius: '50%', background: 'var(--accent-primary)', filter: `blur(${blur}px)`, top, left, right, bottom, pointerEvents: 'none', zIndex: 1 }} />
);
const LuxuryLine = () => (
  <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 20%, var(--accent-light) 50%, var(--accent-primary) 80%, transparent)', opacity: 0.3 }} />
);

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: string;
}

const DHCareerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        setJob(response.data.data || null);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally { setLoading(false); }
    };
    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div className="dh-label">LOADING JOB DETAILS...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', flexDirection: 'column', gap: '1rem' }}>
        <div className="dh-heading" style={{ fontSize: '1.5rem' }}>Job not found.</div>
        <button onClick={() => navigate('/dummyhome/careers')} className="dh-btn-fill">BACK TO CAREERS</button>
      </div>
    );
  }

  return (
    <div className="dh-career-detail-page">
      <Grain />
      
      {/* Hero */}
      <section className="theme-brown" style={{ padding: '120px 0 60px', background: 'var(--bg-primary)', position: 'relative' }}>
        <GridBg size={50} opacity={0.05} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <button onClick={() => navigate('/dummyhome/careers')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '0.8rem', fontWeight: 800 }}>
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> BACK TO CAREERS
          </button>
          
          <div className="dh-label">{job.department.toUpperCase()}</div>
          <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>{job.title}</h1>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{job.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{job.type}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{job.experience}</span>
            </div>
          </div>

          <button className="dh-btn-fill">APPLY FOR THIS POSITION</button>
        </div>
      </section>

      <LuxuryLine />

      {/* Content */}
      <section className="theme-beige" style={{ padding: '60px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }} className="dh-responsive-grid">
            {/* Left Col */}
            <div>
              <h2 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Job Description</h2>
              <div className="dh-body" style={{ fontSize: '1rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {job.description}
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '16px', padding: '2rem', position: 'sticky', top: '100px' }}>
                <h3 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Position Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>DEPARTMENT</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.department}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>LOCATION</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.location}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>EMPLOYMENT TYPE</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.type}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>EXPERIENCE</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.experience}</div>
                  </div>
                </div>
                <LuxuryLine />
                <button className="dh-btn-fill" style={{ width: '100%', marginTop: '1.5rem' }}>APPLY NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DHCareerDetail;
