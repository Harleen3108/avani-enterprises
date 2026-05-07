import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, ArrowRight, History } from 'lucide-react';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DHAbout = () => {
  return (
    <div className="dh-about-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">OUR HERITAGE</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>CRAFTING</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">A TIMELESS</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">LEGACY.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              Since 2016, we have been at the forefront of digital transformation, blending traditional values with future-ready technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY BENTO */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="dh-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}><Shield size={48} /></div>
              <h2 className="dh-display" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>OUR CORE PHILOSOPHY</h2>
              <p className="dh-body" style={{ fontSize: '1.1rem' }}>
                We believe in "Excellence by Design." Every line of code and every strategic pixel is crafted to ensure your business doesn't just grow, but thrives with a distinct identity.
              </p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="dh-card">
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}><Target size={32} /></div>
                <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>THE MISSION</h3>
                <p className="dh-body">To empower 10,000+ businesses globally with technical oversight and strategic digital craftsmanship.</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="dh-card">
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}><Award size={32} /></div>
                <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>THE VISION</h3>
                <p className="dh-body">To be the world's most trusted partner for high-tech networking and enterprise connectivity.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOURNEY TIMELINE */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">MILESTONES</div>
            <h2 className="dh-display" style={{ fontSize: '4rem' }}>THE CHRONICLES</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {[
              { year: '2016', title: 'THE GENESIS', desc: 'Avani Enterprises was born in Rohtak with a vision to bridge the digital divide in India.' },
              { year: '2019', title: 'NCR EXPANSION', desc: 'Established our strategic hub in Gurgaon to serve the growing enterprise sector.' },
              { year: '2022', title: 'GLOBAL OUTREACH', desc: 'Extended our footprint to Australia, marking our first step towards international dominance.' },
              { year: '2025', title: 'THE FUTURE', desc: 'Pioneering AI-driven connectivity and ultra-premium digital experiences globally.' }
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '4rem', alignItems: 'center' }} className="dh-responsive-grid">
                <div style={{ flex: '0 0 200px', fontSize: '5rem', fontFamily: "'Syne'", color: 'var(--border-light)', fontWeight: 800 }}>{item.year}</div>
                <div style={{ height: '2px', flex: 1, background: 'var(--border-faint)' }} />
                <div style={{ flex: 1 }}>
                  <h3 className="dh-heading" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>{item.title}</h3>
                  <p className="dh-body">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM CALLOUT */}
      <section className="dh-section">
        <div className="dh-container">
          <div className="dh-card" style={{ padding: '6rem', textAlign: 'center', background: 'linear-gradient(to bottom, var(--bg-tertiary), var(--bg-primary))' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}><Users size={48} /></div>
            <h2 className="dh-display" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>LED BY VISIONARIES</h2>
            <p className="dh-body" style={{ maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.2rem' }}>
              Behind every successful project is a crew of elite engineers, creative minds, and strategic consultants.
            </p>
            <button className="dh-btn-fill">MEET THE CREW <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHAbout;
