import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, Globe, Sparkles } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const products = [
  { title: 'HR Portal', desc: 'Complete HR management solution with employee tracking, attendance, payroll, and performance analytics.', url: 'https://hrportal.avanienterprises.in/', tags: ['Employee Mgmt', 'Payroll', 'Analytics'], accent: '#f59e0b' },
  { title: 'School Management', desc: 'End-to-end school management system with admissions, student tracking, fee management, and parent portals.', url: 'https://indus-school-page.vercel.app/admission', tags: ['Admissions', 'Student Portal', 'Fee Mgmt'], accent: '#c8ff00' },
  { title: 'Project CRM', desc: 'Powerful CRM for project management with team collaboration, lead tracking, and reporting dashboards.', url: 'https://team-lead-gamma.vercel.app/', tags: ['Lead Tracking', 'Team Mgmt', 'Reports'], accent: '#3b82f6' },
  { title: 'Custom E-Commerce', desc: 'Feature-rich e-commerce platform with product management, payment integration, and order tracking.', url: 'https://shoes-ecommerce-iota.vercel.app/', tags: ['Products', 'Payments', 'Orders'], accent: '#ec4899' },
];

const DH2Products = () => (
  <div className="dh2-products-page">
    
    {/* 1. CINEMATIC HERO */}
    <section className="dh2-hero" style={{ minHeight: '60vh' }}>
      <div className="dh2-container">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={14} className="dh2-hero-accent" /> ECOSYSTEM
          </motion.div>
          
          <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
            <span className="dh2-hero-line">
              <motion.span custom={0} variants={titleV}>BATTLE</motion.span>
            </span>
            <span className="dh2-hero-line">
              <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">TESTED</motion.span>
            </span>
            <span className="dh2-hero-line">
              <motion.span custom={2} variants={titleV} className="dh2-hero-accent">SOLUTIONS.</motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            Ready-to-deploy platforms engineered for <strong style={{ color: 'var(--accent)' }}>scale and security</strong>. Each product is a modular foundation for your unique needs.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* 2. PRODUCT GRID */}
    <section className="dh2-section" style={{ paddingTop: 0 }}>
      <div className="dh2-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }} className="dh2-responsive-grid">
          {products.map((p, i) => (
            <motion.div 
              key={i} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeUp} 
              transition={{ delay: i * 0.1 }}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '24px', padding: '3.5rem 3rem', position: 'relative', overflow: 'hidden' }}
              className="dh2-product-card-wrap"
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: `radial-gradient(circle at 100% 0%, ${p.accent}22 0%, transparent 70%)`, opacity: 0.5 }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${p.accent}11`, border: `1px solid ${p.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.accent }}>
                  <Sparkles size={20} />
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', transition: 'color 0.3s' }} className="dh2-external-icon">
                  <ExternalLink size={18} />
                </a>
              </div>

              <h3 className="dh2-display" style={{ fontSize: '1.8rem', marginBottom: '1.2rem', color: 'var(--text-main)' }}>{p.title}</h3>
              <p className="dh2-body" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem', flexGrow: 1 }}>{p.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontSize: '0.65rem', padding: '0.4rem 1rem', background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: '100px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
                    {t}
                  </span>
                ))}
              </div>

              <a href={p.url} target="_blank" rel="noopener noreferrer" className="dh2-btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Launch Demo <ArrowRight size={14} style={{ marginLeft: '4px' }} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. CTA */}
    <section className="dh2-cta">
      <div className="dh2-cta-watermark">SOLUTIONS</div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 className="dh2-display dh2-cta-title">
          NEED A CUSTOM<br /><span>ARCHITECTURE?</span>
        </h2>
        <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
          Our products are just the beginning. Let's discuss a solution tailored to your exact specifications.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="/dummyhome2/contact" className="dh2-btn-fill">Talk to Architect <ArrowRight size={16} /></a>
        </div>
      </motion.div>
    </section>

  </div>
);

export default DH2Products;
