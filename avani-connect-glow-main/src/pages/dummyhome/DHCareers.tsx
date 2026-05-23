import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import RotatingText from '../../components/RotatingText';
import { Users, Clock, MapPin, ArrowRight, CheckCircle, Briefcase, Code, Palette, TrendingUp, Search, Building2, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../components/dummy/DummyHome.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
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
  image?: string;
}

const departments = [
  { id: 'all', name: 'All Departments', icon: <Briefcase size={16} /> },
  { id: 'development', name: 'Development', icon: <Code size={16} /> },
  { id: 'design', name: 'Design', icon: <Palette size={16} /> },
  { id: 'marketing', name: 'Marketing', icon: <TrendingUp size={16} /> },
  { id: 'business', name: 'Business', icon: <Building2 size={16} /> },
];

const getJobImage = (department: string, index: number) => {
  const images: Record<string, string[]> = {
    development: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    ],
    design: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558655143-df239ec2c75f?w=400&h=300&fit=crop',
    ],
    marketing: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&h=300&fit=crop',
    ],
    business: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556761175-59730532277c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    ],
    analytics: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    ],
  };
  const deptImages = images[department.toLowerCase()] || [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c564bd248273?w=400&h=300&fit=crop',
  ];
  return deptImages[index % deptImages.length];
};

export const FALLBACK_JOBS = [
  {
    _id: "mern-developer",
    title: "MERN Stack Developer",
    department: "development",
    location: "Gurugram / Remote",
    type: "Full-Time",
    experience: "1-3 years",
    description: "We are looking for a MERN Stack Developer who is passionate about building scalable, high-performance web applications. You will be responsible for creating front-end interfaces using React and building robust backend services with Node.js, Express, and MongoDB. Familiarity with TypeScript and modern cloud hosting is highly preferred.",
    status: "active"
  },
  {
    _id: "ui-ux-designer",
    title: "Lead UI/UX Designer",
    department: "design",
    location: "Remote",
    type: "Full-Time",
    experience: "3-5 years",
    description: "Join us as a Lead UI/UX Designer and take ownership of our client and product design ecosystems. You will create high-fidelity prototypes, user journey maps, wireframes, and gorgeous visual layouts. Proficiency with Figma, design systems, and a strong eye for clean, minimalist premium aesthetics is required.",
    status: "active"
  },
  {
    _id: "marketing-specialist",
    title: "Digital Marketing Specialist",
    department: "marketing",
    location: "Delhi NCR",
    type: "Full-Time",
    experience: "1-3 years",
    description: "We are seeking a results-driven Digital Marketing Specialist to lead organic growth and paid acquisition campaigns. You will manage social media handles, design content marketing schedules, run high-ROI search/social ads, and perform detailed analytics tracking to boost conversions and sales pipelines.",
    status: "active"
  },
  {
    _id: "bd-associate",
    title: "Business Development Associate",
    department: "business",
    location: "Gurugram / Hybrid",
    type: "Full-Time",
    experience: "0-2 years",
    description: "We are looking for an energetic Business Development Associate to drive enterprise sales and client acquisition. You will research potential leads, coordinate product demos, manage CRM records, and assist with proposal writing and sales pitches to build strong, long-lasting client relationships.",
    status: "active"
  }
];

const DHCareers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [activeLocation, setActiveLocation] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/jobs`);
        const fetched = response.data.data || [];
        setJobs(fetched.length > 0 ? fetched : FALLBACK_JOBS);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs(FALLBACK_JOBS);
      } finally { setLoading(false); }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = activeDepartment === 'all' || job.department.toLowerCase() === activeDepartment;
    const matchesLocation = activeLocation === 'all' || job.location.toLowerCase().includes(activeLocation.toLowerCase());
    const matchesType = activeType === 'all' || job.type.toLowerCase() === activeType;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesLocation && matchesType && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const cfg: Record<string, { bg: string; label: string }> = {
      active: { bg: '#22c55e', label: 'Active' },
      filled: { bg: '#6b7280', label: 'Filled' },
      closed: { bg: '#ef4444', label: 'Closed' },
    };
    const c = cfg[status.toLowerCase()] || cfg.active;
    return (
      <span style={{ background: c.bg, color: '#fff', padding: '3px 10px', borderRadius: '100px', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.1em' }}>
        {c.label.toUpperCase()}
      </span>
    );
  };

  const selectStyle: React.CSSProperties = {
    padding: '8px 16px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)',
    borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, outline: 'none',
    cursor: 'pointer', appearance: 'none' as any,
  };

  return (
    <div className="dh-careers-page">

      {/* 1. HERO */}
      <section className="theme-brown" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" right="-5%" w={350} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">JOIN OUR TEAM</motion.div>
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem' }}>
              <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>JOIN OUR TEAM OF</motion.span></span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} style={{ color: 'var(--accent-primary)' }}>
                  <RotatingText words={['DEVELOPERS', 'DESIGNERS', 'MARKETERS', 'ANALYSTS', 'INNOVATORS', 'LEADERS']} interval={2500} className="dh-display" />
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
              Discover exciting career opportunities and be part of a team that's shaping the future of technology and innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. SEARCH & FILTER */}
      <section className="theme-beige" style={{ padding: '1.5rem 0', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Search + Department Filters */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <Search size={16} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input type="text" placeholder="SEARCH JOBS..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 0 10px 2rem', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-faint)', color: 'var(--text-primary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {departments.map(dept => (
                  <button key={dept.id} onClick={() => setActiveDepartment(dept.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                      borderRadius: '8px', border: '1px solid var(--border-faint)', cursor: 'pointer',
                      background: activeDepartment === dept.id ? 'var(--accent-primary)' : 'var(--card-bg)',
                      color: activeDepartment === dept.id ? '#000' : 'var(--text-secondary)',
                      fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', transition: 'all 0.3s',
                    }}
                  >
                    {dept.icon} {dept.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            {/* Location + Type Selects */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} style={{ color: 'var(--text-tertiary)' }} />
                <select value={activeLocation} onChange={e => setActiveLocation(e.target.value)} style={selectStyle}>
                  <option value="all">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Briefcase size={14} style={{ color: 'var(--text-tertiary)' }} />
                <select value={activeType} onChange={e => setActiveType(e.target.value)} style={selectStyle}>
                  <option value="all">All Types</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOB GRID */}
      <section className="theme-beige" style={{ position: 'relative', padding: '60px 0 80px', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        <GlowBlob bottom="10%" right="-60px" w={280} opacity={0.04} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '8rem 0' }}>
              <div className="dh-label">LOADING OPPORTUNITIES...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }} className="dh-career-list">
              {filteredJobs.map((job, i) => (
                <motion.div key={job._id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}>
                  <div
                    onClick={() => navigate(`/dummyhome/careers/${job._id}`)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0',
                      borderBottom: '1px solid var(--border-faint)', cursor: 'pointer', transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.paddingLeft = '1rem'; e.currentTarget.style.paddingRight = '1rem'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.paddingRight = '0'; e.currentTarget.style.background = 'transparent'; }}
                    className="dh-career-item"
                  >
                    {/* Left: Job Title and Meta */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em', background: 'var(--accent-hover)', padding: '4px 8px', borderRadius: '4px' }}>
                          {job.department.toUpperCase()}
                        </span>
                        {getStatusBadge(job.status)}
                      </div>
                      <h3 className="dh-heading" style={{ fontSize: '1.6rem', margin: 0 }}>{job.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={12} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{job.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Briefcase size={12} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{job.type}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="dh-hide-mobile">
                          <Clock size={12} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Experience: {job.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Apply Button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="dh-career-action">
                      <button onClick={e => { e.stopPropagation(); navigate(`/dummyhome/careers/${job._id}?apply=true`); }}
                        style={{ padding: '12px 28px', borderRadius: '100px', border: '1px solid var(--accent-primary)', background: 'transparent', color: 'var(--text-primary)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                      >
                        APPLY NOW <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredJobs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <Briefcase size={48} style={{ color: 'var(--text-tertiary)', margin: '0 auto 1rem' }} />
              <p className="dh-heading" style={{ fontSize: '1.2rem' }}>No jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <LuxuryLine />

      {/* 4. WHY JOIN US */}
      <section className="theme-brown" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="20%" right="-5%" w={300} opacity={0.04} blur={100} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="dh-label">JOIN OUR TEAM</div>
            <h2 className="dh-display" style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>WHY JOIN <span style={{ color: 'var(--accent-primary)' }}>US?</span></h2>
            <p className="dh-body" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              We provide a dynamic work environment with competitive benefits and endless growth opportunities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="dh-responsive-grid">
            {[
              { num: '01', title: 'Career Growth', desc: 'Continuous learning and advancement opportunities with mentorship programs, skill development workshops, and clear career progression paths.' },
              { num: '02', title: 'Great Team', desc: 'Work with talented and passionate professionals who are committed to excellence and collaborative success in every project.' },
              { num: '03', title: 'Work-Life Balance', desc: 'Flexible hours and remote work options available to ensure you maintain a healthy balance between professional and personal life.' },
              { num: '04', title: 'Competitive Pay', desc: 'Industry-leading compensation and benefits package including health insurance, performance bonuses, and comprehensive perks.' },
            ].map((b, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{
                  padding: '2rem', background: 'var(--card-bg)', borderRadius: '16px',
                  border: '1px solid var(--border-faint)', backdropFilter: 'blur(10px)',
                  position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-faint)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ position: 'absolute', top: 10, right: 16, fontSize: '3.5rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent-primary)', opacity: 0.08, lineHeight: 1 }}>{b.num}</div>
                <div style={{ width: 48, height: 4, background: 'var(--accent-primary)', borderRadius: '100px', marginBottom: '1.2rem' }} />
                <h3 className="dh-heading" style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>{b.title}</h3>
                <p className="dh-body" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 5. CTA */}
      <section className="theme-beige" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="dh-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>
              LET'S BUILD YOUR <span style={{ color: 'var(--accent-primary)' }}>SUCCESS STORY</span> TOGETHER
            </h2>
            <p className="dh-body" style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1rem' }}>
              Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision with expert guidance every step of the way.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/dummyhome/contact')} className="dh-btn-fill">GET CONSULTATION</button>
              <a href="tel:+919253625099" className="dh-btn-ghost" style={{ textDecoration: 'none' }}>TALK TO EXPERT</a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .dh-responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .dh-career-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
            padding: 1.5rem 1rem !important;
          }
          .dh-hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DHCareers;
