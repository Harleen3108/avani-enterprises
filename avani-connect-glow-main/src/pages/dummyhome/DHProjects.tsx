import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const projects = [
  { name: 'Policicue', category: 'FinTech Platform', image: '/policy1.png', link: '/projects/policicue' },
  { name: 'Indus Public School', category: 'EduTech Hub', image: '/indus1.png', link: '/projects/indus' },
  { name: 'FRD Nutrition', category: 'E-commerce', image: '/frd-nutrition-new.png', link: '/projects/frd-nutrition' },
  { name: 'Hi-Tech Homes', category: 'Luxury Real Estate', image: '/hitech1.png', link: '/projects/hitech-homes' },
  { name: 'Sanjeevni Hospital', category: 'Health Management', image: '/sanjeevni1.png', link: '/projects/sanjeevni-hospital' },
  { name: 'Rohtak Shoe Co.', category: 'Direct-to-Consumer', image: '/shoes1.png', link: '/projects/rohtak-shoe' },
];

const DHProjects = () => {
  return (
    <div className="dh-projects-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">PORTFOLIO</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>IMPACTFUL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">JOURNEYS.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We've partnered with industry leaders to build solutions that define <strong style={{ color: 'var(--accent-primary)' }}>commercial excellence.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER BAR */}
      <section style={{ padding: '2rem 0' }}>
        <div className="dh-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-faint)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '3rem' }}>
              {['ALL PROJECTS', 'FINTECH', 'EDUTECH', 'ECOMMERCE', 'HEALTHCARE'].map((cat, i) => (
                <button key={i} style={{ background: 'none', border: 'none', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-tertiary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', cursor: 'pointer', transition: 'color 0.3s' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.75rem', fontWeight: 700 }}>
              <Filter size={14} /> FILTER RESULTS
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT GRID */}
      <section className="dh-section" style={{ paddingTop: '4rem' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }} className="dh-responsive-grid">
            {projects.map((project, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative' }}
              >
                <Link to={project.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="dh-card" style={{ padding: 0, overflow: 'hidden', aspectRatio: '16/10' }}>
                    <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s var(--ease-out)' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)', display: 'flex', alignItems: 'flex-end', padding: '3rem' }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <div className="dh-label" style={{ marginBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>{project.category}</div>
                          <h3 className="dh-display" style={{ fontSize: '2.5rem', color: '#fff' }}>{project.name}</h3>
                        </div>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                          <ArrowUpRight size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SHOWCASE VIDEO CALLOUT */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', margin: '0 auto 3rem', cursor: 'pointer' }}>
                <Play size={40} fill="var(--accent-primary)" />
              </div>
              <h2 className="dh-display" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>WATCH REEL 2025</h2>
              <p className="dh-body" style={{ fontSize: '1.2rem', marginBottom: '4rem' }}>
                See how we transform complex business challenges into seamless digital success stories.
              </p>
              <button className="dh-btn-ghost"><ExternalLink size={18} /> FULL REEL ON YOUTUBE</button>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHProjects;
