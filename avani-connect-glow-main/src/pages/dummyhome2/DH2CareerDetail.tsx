import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2CareerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/careers/${id}`);
        const data = await response.json();
        if (data.success) setJob(data.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="dh2-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-s)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="dh2-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="dh2-display">Position Not Found</h1>
        <Link to="/dummyhome2/careers" className="dh2-btn-ghost" style={{ marginTop: '2rem' }}>View Open Positions <ArrowLeft size={14} /></Link>
      </div>
    );
  }

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '8rem', paddingBottom: '3rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-s)' }}>
        <div className="dh2-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link to="/dummyhome2/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ArrowLeft size={14} /> Back to Careers
            </Link>
            
            <h1 className="dh2-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              {job.title}
            </h1>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>
                <Briefcase size={16} style={{ color: 'var(--accent)' }} /> {job.department}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>
                <MapPin size={16} style={{ color: 'var(--accent)' }} /> {job.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>
                <Clock size={16} style={{ color: 'var(--accent)' }} /> {job.type}
              </div>
            </div>

            <Link to="/dummyhome2/contact" className="dh2-btn-fill" style={{ display: 'inline-flex' }}>
              Apply Now <FileText size={14} style={{ marginLeft: 8 }} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="dh2-section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="dh2-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div style={{ marginBottom: '3rem' }}>
              <h2 className="dh2-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>About the Role</h2>
              <div className="dh2-body" style={{ lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 className="dh2-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Requirements</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {job.requirements.map((req: string, idx: number) => (
                    <li key={idx} className="dh2-body" style={{ lineHeight: 1.6 }}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 className="dh2-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Responsibilities</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {job.responsibilities.map((resp: string, idx: number) => (
                    <li key={idx} className="dh2-body" style={{ lineHeight: 1.6 }}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DH2CareerDetail;
