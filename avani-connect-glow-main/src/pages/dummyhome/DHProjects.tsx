import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, ExternalLink, Filter, TrendingUp, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedCounter from '../../components/AnimatedCounter';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

import { projectsData } from '../../data/dummyProjectsData';

const getProjectFilter = (slug: string) => {
  if (slug.includes('school') || slug.includes('college') || slug.includes('placement') || slug.includes('lms') || slug.includes('alumni')) {
    return 'EDUTECH';
  }
  if (slug.includes('finance') || slug.includes('pay') || slug.includes('os') || slug.includes('leads') || slug.includes('crm')) {
    return 'FINTECH';
  }
  if (slug.includes('sanjeevni') || slug.includes('hospital') || slug.includes('clinic') || slug.includes('health')) {
    return 'HEALTHCARE';
  }
  return 'ECOMMERCE';
};

const projects = projectsData.map(p => ({
  name: p.title,
  category: p.subtitle,
  filter: getProjectFilter(p.slug),
  image: p.image,
  link: `/dummyhome/projects/${p.slug}`,
  impact: p.impact?.[0] || 'High Impact',
  imageStyle: p.imageStyle
}));

const testimonials = [
  { name: "Dr. Rajesh Kumar", position: "Principal, Indus Public School", content: "Avani Enterprises delivered an outstanding website that perfectly captures our school's vision and values. The design is modern and intuitive.", image: "/indus.jpeg" },
  { name: "Vikram Sharma", position: "MD, Rohtak Shoe Company", content: "The e-commerce platform developed by Avani Enterprises transformed our business. Online sales increased by 250% in just 3 months.", image: "/shoes.jpeg" },
  { name: "Ankit Verma", position: "Co-Founder, Policicue", content: "Working with Avani was a game-changer. They built a sophisticated platform that handles complex policy management with ease.", image: "/policucue.jpeg" }
];

const filterCategories = ['ALL PROJECTS', 'FINTECH', 'EDUTECH', 'ECOMMERCE', 'HEALTHCARE'];

/* Shared visual helpers */
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

const DHProjects = () => {
  const [currTest, setCurrTest] = useState(0);
  const [activeFilter, setActiveFilter] = useState('ALL PROJECTS');
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filteredProjects = activeFilter === 'ALL PROJECTS' 
    ? projects 
    : projects.filter(p => p.filter === activeFilter);

  return (
    <div className="dh-projects-page">
      
      {/* 1. HERO */}
      <section className="theme-brown" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" right="-5%" w={350} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">PORTFOLIO</motion.div>
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem' }}>
              <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>IMPACTFUL</motion.span></span>
              <span className="dh-hero-line"><motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span></span>
              <span className="dh-hero-line"><motion.span custom={2} variants={titleV} className="dh-hero-accent">JOURNEYS.</motion.span></span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '520px', fontSize: '1rem' }}>
              We've partnered with industry leaders to build solutions that define <strong style={{ color: 'var(--accent-primary)' }}>commercial excellence.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* MOVING TICKER BAR */}
      <section style={{ background: 'var(--bg-primary)', padding: '20px 0', overflow: 'hidden', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}
          >
            {[...projects, ...projects].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.1em', fontFamily: "'Syne', sans-serif" }}>{p.name.toUpperCase()}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>{p.impact.toUpperCase()}</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.5 }} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. FILTER BAR */}
      <section className="theme-beige" style={{ padding: '1.2rem 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-faint)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {filterCategories.map((cat, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveFilter(cat)}
                  style={{ 
                    background: 'none', border: 'none', 
                    color: activeFilter === cat ? 'var(--accent-primary)' : 'var(--text-tertiary)', 
                    fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.15em', cursor: 'pointer', 
                    transition: 'color 0.3s',
                    borderBottom: activeFilter === cat ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    paddingBottom: '4px',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-tertiary)', fontSize: '0.7rem', fontWeight: 700 }}>
              <Filter size={12} /> {filteredProjects.length} RESULTS
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT GRID — card style matching homepage */}
      <section className="theme-beige" style={{ position: 'relative', padding: '40px 0 80px', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        <GlowBlob top="30%" right="-80px" w={280} opacity={0.04} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }} 
            >
              {filteredProjects.map((project, i) => (
                <React.Fragment key={project.name}>
                  <motion.div 
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '4rem',
                      alignItems: 'center',
                      direction: i % 2 === 1 ? 'rtl' : 'ltr',
                      paddingBottom: '4rem',
                      borderBottom: i < filteredProjects.length - 1 ? '1.5px solid rgba(0,0,0,0.15)' : 'none',
                    }}
                    className="dh-responsive-grid"
                  >
                  {/* Image Side */}
                  <div style={{ position: 'relative', direction: 'ltr' }}>
                    <div style={{
                      width: '100%', aspectRatio: '16/10', borderRadius: '12px', overflow: 'hidden',
                      border: `1px solid ${hovIdx === i ? 'var(--accent-primary)' : 'var(--border-faint)'}`,
                      position: 'relative', transition: 'border-color 0.4s, transform 0.4s, box-shadow 0.4s',
                      transform: hovIdx === i ? 'translateY(-4px)' : 'none',
                      boxShadow: hovIdx === i ? '0 12px 32px rgba(0,0,0,0.08)' : 'none',
                    }}
                    onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)}>
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: (project.imageStyle?.objectFit as any) || 'cover', 
                          background: project.imageStyle?.background || 'transparent',
                          padding: project.imageStyle?.padding || '0',
                          transition: 'transform 0.7s ease', 
                          transform: hovIdx === i ? 'scale(1.05)' : 'scale(1)' 
                        }} 
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.12em' }}>{project.category.toUpperCase()}</span>
                          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
                          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff', letterSpacing: '0.08em' }}>{project.impact.toUpperCase()}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', color: '#fff', letterSpacing: '0.03em', lineHeight: 1.1, fontWeight: 700, marginBottom: '2px' }}>
                          {project.name.toUpperCase()}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>{project.filter}</span>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>{project.impact}</span>
                    </div>
                    <h2 className="dh-heading" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{project.name}</h2>
                    <p className="dh-body" style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      A high-performance solution delivered for {project.name}. We focused on scalability, user experience, and measurable business impact.
                    </p>
                    <div 
                      onClick={() => {
                        if (project.link.startsWith('http')) {
                          window.open(project.link, '_blank');
                        } else {
                          navigate(project.link);
                        }
                      }}
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}
                    >
                      EXPLORE PROJECT <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
                </React.Fragment>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <LuxuryLine />

      {/* 4. SUCCESS METRICS */}
      <section className="theme-brown" style={{ position: 'relative', padding: '70px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="20%" left="-5%" w={250} opacity={0.04} blur={100} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="dh-label">OUR IMPACT</div>
            <h2 className="dh-display" style={{ fontSize: '2.8rem' }}>SUCCESS IN <span style={{ color: 'var(--accent-primary)' }}>NUMBERS.</span></h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="dh-responsive-grid">
            {[
              { val: 150, label: 'Happy Clients', sub: 'Global Reach' },
              { val: 300, label: 'Projects Done', sub: 'Enterprise Scale' },
              { val: 85, label: 'Growth Avg', sub: 'Measurable Impact', suffix: '%' },
              { val: 50, label: 'Revenue Generated', sub: 'Across Portfolio', suffix: 'Cr+' }
            ].map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-faint)', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-faint)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.5rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.3rem' }}>
                  <AnimatedCounter target={stat.val} suffix={stat.suffix || '+'} />
                </div>
                <div className="dh-heading" style={{ fontSize: '0.85rem', marginBottom: '0.3rem' }}>{stat.label}</div>
                <div className="dh-body" style={{ fontSize: '0.7rem' }}>{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 5. TESTIMONIALS */}
      <section className="theme-beige" style={{ position: 'relative', padding: '70px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ padding: '3.5rem', position: 'relative', overflow: 'hidden', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border-faint)', backdropFilter: 'blur(10px)' }}>
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', opacity: 0.05, color: 'var(--accent-primary)' }}><Quote size={140} /></div>
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="var(--accent-primary)" color="var(--accent-primary)" />)}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div key={currTest} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                  <p className="dh-display" style={{ fontSize: '1.5rem', lineHeight: 1.4, maxWidth: '750px', margin: '0 auto 2rem', textTransform: 'none', letterSpacing: '0' }}>
                    "{testimonials[currTest].content}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)' }}>
                      <img src={testimonials[currTest].image} alt={testimonials[currTest].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div className="dh-heading" style={{ fontSize: '1rem' }}>{testimonials[currTest].name}</div>
                      <div className="dh-label" style={{ marginBottom: 0, color: 'var(--text-tertiary)', fontSize: '0.6rem' }}>{testimonials[currTest].position}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '2rem' }}>
                <button onClick={() => setCurrTest((currTest - 1 + testimonials.length) % testimonials.length)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}><ChevronLeft size={18} /></button>
                <button onClick={() => setCurrTest((currTest + 1) % testimonials.length)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 6. WATCH REEL */}
      <section className="theme-brown" style={{ position: 'relative', padding: '70px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="30%" left="40%" w={300} opacity={0.03} blur={120} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', margin: '0 auto 2rem', cursor: 'pointer', transition: 'all 0.3s' }}>
                <Play size={32} fill="var(--accent-primary)" />
              </div>
              <h2 className="dh-display" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>WATCH REEL 2025</h2>
              <p className="dh-body" style={{ fontSize: '1rem', marginBottom: '2.5rem' }}>
                See how we transform complex business challenges into seamless digital success stories.
              </p>
              <button className="dh-btn-ghost"><ExternalLink size={16} /> FULL REEL ON YOUTUBE</button>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHProjects;
