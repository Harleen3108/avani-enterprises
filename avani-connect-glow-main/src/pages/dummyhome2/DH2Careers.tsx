import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Briefcase, Search, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

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
        // If data is returned in an envelope like { data: [] }
        setJobs(res.data.data || res.data || []);
      } catch (err) {
        console.error('Error fetching jobs', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'business', name: 'Business' },
    { id: 'analytics', name: 'Analytics' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = activeDepartment === 'all' || (job.department && job.department.toLowerCase() === activeDepartment);
    const matchesSearch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    if (status?.toLowerCase() === 'closed') return '#ef4444';
    if (status?.toLowerCase() === 'filled') return '#64748b';
    return 'var(--accent)';
  };

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">JOIN US</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>CAREER <span style={{ color: 'var(--accent)' }}>OPPORTUNITIES</span></h1>
            <p className="dh2-body" style={{ maxWidth: 550, margin: '0 auto', fontSize: '.85rem' }}>Discover exciting career opportunities and be part of a team that's shaping the future of technology and innovation.</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="dh2-section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <div className="dh2-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 2.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 12, color: '#fff', fontSize: '.8rem', fontFamily: "'Inter', sans-serif", outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center' }}>
              {departments.map(dept => (
                <button 
                  key={dept.id} 
                  onClick={() => setActiveDepartment(dept.id)}
                  style={{ background: activeDepartment === dept.id ? 'var(--accent)' : 'transparent', color: activeDepartment === dept.id ? '#000' : 'var(--text-muted)', border: `1px solid ${activeDepartment === dept.id ? 'var(--accent)' : 'var(--border-s)'}`, borderRadius: 100, padding: '.4rem 1rem', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', cursor: 'pointer', transition: 'all .3s' }}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="dh2-section" style={{ paddingTop: '1rem' }}>
        <div className="dh2-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--accent)' }}>Loading positions...</div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <Briefcase size={40} style={{ color: 'var(--border-f)', margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, marginBottom: '.5rem', fontSize: '1.2rem' }}>No Open Positions</h3>
              <p style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>No jobs found matching your criteria. Check back soon or send your resume to kp@avanienterprises.in</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {filteredJobs.map((job: any, i: number) => (
                <motion.div key={job._id || i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: (i % 2) * .08 }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color .3s, transform .3s', cursor: 'pointer' }}
                    onClick={() => navigate(`/dummyhome2/careers/${job._id}`)}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,255,0,.2)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-s)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '.5rem', fontWeight: 800, color: '#000', background: 'var(--accent)', padding: '.2rem .6rem', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '.1em', display: 'inline-block', marginBottom: '.8rem' }}>{job.department}</div>
                        <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', marginBottom: '.3rem', color: '#fff' }}>{job.title}</h3>
                      </div>
                      <div style={{ fontSize: '.5rem', fontWeight: 800, color: getStatusColor(job.status), border: `1px solid ${getStatusColor(job.status)}`, padding: '.2rem .6rem', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                        {job.status || 'Active'}
                      </div>
                    </div>

                    <p className="dh2-body" style={{ fontSize: '.75rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{job.description}</p>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-s)', paddingBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.65rem', color: 'var(--text-muted)' }}>
                        <MapPin size={12} style={{ color: 'var(--accent)' }} /> {job.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.65rem', color: 'var(--text-muted)' }}>
                        <Briefcase size={12} style={{ color: 'var(--accent)' }} /> {job.type}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.65rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      <Clock size={12} style={{ color: 'var(--accent)' }} /> Experience: <strong style={{ color: '#fff' }}>{job.experience}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      <button style={{ flex: 1, padding: '.6rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', cursor: 'pointer' }}>View Details</button>
                      <button style={{ flex: 1.5, padding: '.6rem', background: 'var(--accent)', border: 'none', color: '#000', borderRadius: 8, fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.3rem', cursor: 'pointer' }}>Apply Now <ArrowRight size={12} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">PERKS</div>
            <h2 className="dh2-display dh2-section-title">WHY JOIN US?</h2>
            <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>We provide a dynamic work environment with competitive benefits and endless growth opportunities.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
            {[
              { title: 'Career Growth', desc: 'Continuous learning and advancement opportunities with mentorship programs, skill development workshops, and clear career progression paths.' },
              { title: 'Great Team', desc: 'Work with talented and passionate professionals who are committed to excellence and collaborative success in every project.' },
              { title: 'Work-Life Balance', desc: 'Flexible hours and remote work options available to ensure you maintain a healthy balance between professional and personal life.' },
              { title: 'Competitive Pay', desc: 'Industry-leading compensation and benefits package including health insurance, performance bonuses, and comprehensive perks.' }
            ].map((perk, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .1 }} style={{ background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '3rem', fontWeight: 800, fontFamily: "'Syne'", color: 'rgba(255,255,255,.02)', lineHeight: 1 }}>0{i+1}</div>
                <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--accent), #f59e0b)', borderRadius: 2, marginBottom: '1.5rem' }}></div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', marginBottom: '.8rem' }}>{perk.title}</h3>
                <p className="dh2-body" style={{ fontSize: '.75rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">AVANI</div>
        <motion.h2 className="dh2-display dh2-cta-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          BUILD YOUR<br /><span>SUCCESS STORY</span>
        </motion.h2>
        <p className="dh2-body" style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto 2rem', fontSize: '.85rem' }}>
          Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision.
        </p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/dummyhome2/get-consultation" className="dh2-btn-fill">Get Consultation</Link>
          <a href="tel:+919253625099" className="dh2-btn-ghost">Talk to Expert</a>
        </motion.div>
      </section>
    </div>
  );
};

export default DH2Careers;
