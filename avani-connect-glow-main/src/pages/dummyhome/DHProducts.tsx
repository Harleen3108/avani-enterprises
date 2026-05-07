import React from 'react';
import { motion } from 'framer-motion';
import { Box, ArrowRight, Zap, Shield, Sparkles, ShoppingCart, CheckCircle } from 'lucide-react';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const products = [
  { id: 'avani-connect', name: 'Avani Connect', tag: 'ENTERPRISE CRM', desc: 'A unified ecosystem for lead management, customer intelligence, and strategic sales oversight.', features: ['Real-time Analytics', 'Lead Scoring AI', 'Omnichannel Sync'] },
  { id: 'avani-flow', name: 'Avani Flow', tag: 'AUTOMATION ENGINE', desc: 'Seamlessly automate WhatsApp, Email, and SMS workflows with advanced conditional logic.', features: ['Custom Triggers', 'Message Queuing', 'API Integration'] },
  { id: 'avani-guard', name: 'Avani Guard', tag: 'SECURITY & UPTIME', desc: 'High-tech monitoring and security oversight for your enterprise digital infrastructure.', features: ['24/7 Monitoring', 'DDoS Protection', 'Uptime Alerts'] },
];

const DHProducts = () => {
  return (
    <div className="dh-products-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">OUR ECOSYSTEM</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>READY TO</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">DEPLOY</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">SOLUTIONS.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We've engineered a suite of premium tools designed for <strong style={{ color: 'var(--accent-primary)' }}>immediate enterprise integration and performance.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. PRODUCT GRID */}
      <section className="dh-section" style={{ paddingTop: 0 }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="dh-responsive-grid">
            {products.map((product, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                className="dh-card"
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}>
                  {i === 0 ? <Box size={32} /> : i === 1 ? <Zap size={32} /> : <Shield size={32} />}
                </div>
                <div className="dh-label" style={{ marginBottom: '0.5rem', fontSize: '0.65rem' }}>{product.tag}</div>
                <h3 className="dh-heading" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{product.name}</h3>
                <p className="dh-body" style={{ marginBottom: '2.5rem', flex: 1 }}>{product.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
                  {product.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent-primary)' }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center' }}>
                  <ShoppingCart size={18} /> GET ACCESS
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ENTERPRISE BANNER */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '40px', padding: '6rem', display: 'flex', gap: '6rem', alignItems: 'center' }} className="dh-responsive-grid">
            <div style={{ flex: 1 }}>
              <div className="dh-label">CUSTOM STACK</div>
              <h2 className="dh-display" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>NEED A BESPOKE <br/><span style={{ color: 'var(--accent-primary)' }}>ECOSYSTEM?</span></h2>
              <p className="dh-body" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
                We also build completely custom digital architectures tailored to your unique business requirements and scale.
              </p>
              <button className="dh-btn-ghost">CONSULT OUR ARCHITECTS <ArrowRight size={18} /></button>
            </div>
            <div style={{ flex: 0.8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { label: 'SCALABLE', icon: <Sparkles size={24} /> },
                { label: 'SECURE', icon: <Shield size={24} /> },
                { label: 'FAST', icon: <Zap size={24} /> },
                { label: 'PRIVATE', icon: <Box size={24} /> }
              ].map((item, i) => (
                <div key={i} style={{ padding: '2rem', border: '1px solid var(--border-faint)', borderRadius: '24px', textAlign: 'center', background: 'var(--bg-primary)' }}>
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHProducts;
