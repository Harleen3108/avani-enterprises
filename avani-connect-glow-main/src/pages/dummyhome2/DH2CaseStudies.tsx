import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, Zap, Award } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const projects = [
  { title: 'Policicue', tag: 'INSURANCE', desc: 'A sophisticated digital ecosystem for complex policy management, prioritizing security and seamless user journeys.', img: '/policucue.jpeg', link: '/dummyhome2/our-products/policicue', size: 'large' },
  { title: 'Indus School', tag: 'EDUCATION', desc: 'Capturing the future of education through a modern, intuitive platform for students and visionaries.', img: '/indus.jpeg', link: '/dummyhome2/our-products/indus', size: 'small' },
  { title: 'FRD Nutrition', tag: 'E-COMMERCE', desc: 'Engineering a high-performance product showcase that resulted in a 180% surge in conversion rates.', img: '/frd-nutrition-new.png', link: '/dummyhome2/our-products/frd-nutrition', size: 'small' },
  { title: 'Hi-Tech Homes', tag: 'REAL ESTATE', desc: 'An elegant, immersive portal for luxury properties, redefining the digital real estate experience.', img: '/hitech.jpeg', link: '/dummyhome2/our-products/hitech-homes', size: 'large' },
  { title: 'Sanjeevni Hospital', tag: 'HEALTHCARE', desc: 'Streamlining critical healthcare operations through a robust, patient-centric management system.', img: '/sanjeevni.jpeg', link: '/dummyhome2/our-products/sanjeevni', size: 'small' },
  { title: 'Rohtak Shoe Co.', tag: 'RETAIL', desc: 'A powerful e-commerce engine that fueled a 250% increase in online revenue within one quarter.', img: '/shoes.jpeg', link: '/dummyhome2/our-products/rohtak-shoe', size: 'small' },
];

const DH2CaseStudies = () => (
  <div className="dh2-case-studies-page">
    
    {/* 1. CINEMATIC HERO */}
    <section className="dh2-hero" style={{ minHeight: '60vh' }}>
      <div className="dh2-container">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={14} className="dh2-hero-accent" /> SUCCESS STORIES
          </motion.div>
          
          <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
            <span className="dh2-hero-line">
              <motion.span custom={0} variants={titleV}>IMPACTFUL</motion.span>
            </span>
            <span className="dh2-hero-line">
              <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">DIGITAL</motion.span>
            </span>
            <span className="dh2-hero-line">
              <motion.span custom={2} variants={titleV} className="dh2-hero-accent">JOURNEYS.</motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            We measure our success by the growth of our partners. Explore how we've <strong style={{ color: 'var(--accent)' }}>redefined industries</strong> through technology.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* 2. PROJECT GRID */}
    <section className="dh2-section" style={{ paddingTop: 0 }}>
      <div className="dh2-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 3rem' }}>
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={fadeUp} 
              transition={{ delay: (i % 2) * 0.2 }}
              style={{ gridColumn: p.size === 'large' ? 'span 2' : 'span 1' }}
            >
              <Link to={p.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div 
                  className="dh2-project-card" 
                  style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', transition: 'transform 0.6s var(--ease-out)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(0.98)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: p.size === 'large' ? '16/9' : '4/5', overflow: 'hidden' }}>
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s var(--ease-out)' }} 
                      className="dh2-project-img"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)', opacity: 0.6 }} />
                    <div style={{ position: 'absolute', top: '2rem', right: '2rem', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <ArrowRight size={18} style={{ transform: 'rotate(-45deg)' }} />
                    </div>
                  </div>
                  
                  <div style={{ padding: '2.5rem' }}>
                    <div className="dh2-label" style={{ color: 'var(--accent)', marginBottom: '1rem', fontWeight: 800 }}>{p.tag}</div>
                    <h3 className="dh2-display" style={{ fontSize: p.size === 'large' ? '2.5rem' : '1.8rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{p.title}</h3>
                    <p className="dh2-body" style={{ fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px' }}>{p.desc}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. CTA */}
    <section className="dh2-cta">
      <div className="dh2-cta-watermark">IMPACT</div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 className="dh2-display dh2-cta-title">
          YOUR BRAND IS<br /><span>NEXT.</span>
        </h2>
        <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
          Let's build a success story that defines your industry.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link to="/dummyhome2/contact" className="dh2-btn-fill">Start Your Journey <ArrowRight size={16} /></Link>
        </div>
      </motion.div>
    </section>

  </div>
);

export default DH2CaseStudies;
