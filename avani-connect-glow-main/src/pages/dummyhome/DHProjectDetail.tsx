import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Server, Shield, Zap, ArrowRight } from 'lucide-react';
import { projectsData } from '../../data/dummyProjectsData';

/* Premium background components */
const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);

const GridBg = ({ size = 40, opacity = 0.05 }) => (
  <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px`, pointerEvents: 'none' }} />
);

const GlowBlob = ({ top, left, right, bottom, w = 300, h = 300, color = 'var(--accent-primary)', opacity = 0.05, blur = 80 }: any) => (
  <div style={{ position: 'absolute', top, left, right, bottom, width: w, height: h, background: color, opacity, filter: `blur(${blur}px)`, borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
);

const LuxuryLine = () => (
  <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 15%, var(--border-light) 85%, transparent)', opacity: 0.6 }} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * 0.12 } })
};

const DHProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData.find(p => p.slug === slug) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="dh-project-detail-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="dh-display" style={{ fontSize: '3rem', marginBottom: '1rem' }}>PROJECT NOT FOUND</h1>
          <Link to="/dummyhome/projects" className="dh-btn-fill">BACK TO PROJECTS</Link>
        </div>
      </div>
    );
  }



  return (
    <div className="dh-project-detail-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section className="theme-brown" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', position: 'relative', paddingTop: '120px', paddingBottom: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.04} />
        <GlowBlob top="-10%" right="-5%" w={450} h={450} opacity={0.06} blur={130} />
        <GlowBlob bottom="-10%" left="-5%" w={300} h={300} opacity={0.04} blur={100} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Dual-column grid styled to guarantee bulletproof proportional layouts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }} className="dh-responsive-grid">
            
            {/* Left Content Side */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ width: '100%', maxWidth: '680px' }}
            >
              <motion.div variants={fadeUp}>
                <Link to="/dummyhome/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '2rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <ArrowLeft size={14} /> BACK TO PROJECTS
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="dh-label" style={{ color: 'var(--accent-primary)', marginBottom: '1.2rem' }}>
                ENTERPRISE SYSTEM
              </motion.div>

              <h1 className="dh-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'capitalize' }}>
                <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>{project.title}</motion.span></span>
              </h1>

              <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '580px', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {project.subtitle}
              </motion.p>

              {/* Capability Badges */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border-light)', background: 'var(--card-bg)', backdropFilter: 'blur(10px)' }}>
                  <Server size={14} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em' }}>CLOUD DEPLOYED</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border-light)', background: 'var(--card-bg)', backdropFilter: 'blur(10px)' }}>
                  <Shield size={14} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em' }}>ENTERPRISE SECURE</span>
                </div>
              </motion.div>

              {/* View Live Demo Action */}
              {project.liveLink && (
                <motion.div variants={fadeUp}>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="dh-btn-fill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    VIEW LIVE DEMO <ArrowUpRight size={16} />
                  </a>
                </motion.div>
              )}
            </motion.div>

            {/* Right Media Side - Large, beautifully uniform mockup box */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              style={{ width: '100%', position: 'relative' }}
            >
              {/* Outer Glow container */}
              <div style={{ position: 'absolute', inset: '-15px', background: 'radial-gradient(circle, rgba(196, 145, 58, 0.15) 0%, transparent 70%)', filter: 'blur(20px)', zIndex: 1, pointerEvents: 'none' }} />
              
              {/* Premium Floating mock-up viewport */}
              <div style={{ 
                position: 'relative', 
                zIndex: 2, 
                width: '100%', 
                aspectRatio: '16/9', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid var(--accent-primary)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(196, 145, 58, 0.08)'
              }}>
                {project.liveLink ? (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.8s ease',
                        ...(project.imageStyle || {})
                      }}
                      onMouseEnter={e => {
                        const style = project.imageStyle || {};
                        e.currentTarget.style.transform = `scale(1.08) ${style.transform || ''}`;
                      }}
                      onMouseLeave={e => {
                        const style = project.imageStyle || {};
                        e.currentTarget.style.transform = style.transform || 'none';
                      }}
                    />
                  </a>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      ...(project.imageStyle || {})
                    }} 
                  />
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. OVERVIEW & SPECIFICATIONS */}
      <section className="theme-beige" style={{ position: 'relative', padding: '90px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        <GlowBlob top="20%" right="-5%" w={300} h={300} opacity={0.03} blur={90} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '5rem' }} className="dh-responsive-grid">
            
            {/* Left Column: Details */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="dh-heading" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontFamily: "'Outfit'" }}>OVERVIEW</h2>
              <p className="dh-body" style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                {project.overview}
              </p>
              
              <h2 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: "'Outfit'" }}>KEY CAPABILITIES</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {project.keyFeatures.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '16px 20px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-faint)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Statistics & Stack */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Impact Box */}
              <div style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-faint)' }}>
                <h3 style={{ fontFamily: "'Outfit'", fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>IMPACT & METRICS</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {project.impact.map((imp, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <Zap size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>{imp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-faint)' }}>
                <h3 style={{ fontFamily: "'Outfit'", fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>TECHNOLOGY STACK</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} style={{ padding: '6px 14px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-faint)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div style={{ padding: '32px', background: 'linear-gradient(135deg, var(--card-bg), var(--bg-secondary))', borderRadius: '24px', border: '1px solid var(--accent-primary)', position: 'relative', overflow: 'hidden' }}>
                <h3 className="dh-heading" style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: "'Outfit'" }}>WANT A SIMILAR PLATFORM?</h3>
                <p className="dh-body" style={{ fontSize: '0.85rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                  Our engineering team specialises in developing high-scale, cinematic custom digital solutions for enterprises.
                </p>
                <Link to="/dummyhome/contact" className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center' }}>
                  TALK TO AN ENGINEER <ArrowRight size={16} />
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM GALLERY */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="theme-brown" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-faint)' }}>
          <Grain />
          <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>INTERFACE SHOWCASE</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Platform <span style={{ color: 'var(--accent-primary)' }}>Screenshots & Layouts</span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '16px auto 0', lineHeight: 1.7 }}>
                Explore the modular UI designed for maximum operational efficiency and elegant user experience.
              </p>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: project.galleryImages.length >= 4 ? 'repeat(auto-fit, minmax(240px, 1fr))' : 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '24px' 
            }}>
              {project.galleryImages.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-faint)',
                    background: 'var(--card-bg)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                    cursor: 'pointer'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'var(--accent-primary)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  <img 
                    src={img} 
                    alt={`${project.title} Interface ${i + 1}`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }} 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default DHProjectDetail;
