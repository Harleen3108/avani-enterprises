import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, CheckCircle, Globe, Search, Share2, Brain, Mic, Calculator, Briefcase, Landmark, ShieldCheck, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const servicesList = [
  {
    id: 'web-development', title: 'Web & App Development', desc: 'Custom websites and mobile applications that drive conversions and user engagement.',
    icon: <Globe size={24} />, price: '₹15,000+', duration: '4-12 weeks',
    features: ['Responsive design', 'Custom CMS', 'E-commerce', 'Performance optimization']
  },
  {
    id: 'seo-content', title: 'SEO & Content Marketing', desc: 'Data-driven SEO strategies and compelling content that ranks and converts.',
    icon: <Search size={24} />, price: '₹10,000+', duration: '3-6 months',
    features: ['Technical audit', 'Keyword strategy', 'Content creation', 'Link building']
  },
  {
    id: 'social-media', title: 'Social Media Marketing', desc: 'Strategic SMM campaigns that build brand awareness and drive engagement.',
    icon: <Share2 size={24} />, price: '₹15,000+', duration: 'Ongoing',
    features: ['Platform strategy', 'Content calendar', 'Paid social', 'Analytics']
  },
  {
    id: 'ai-solutions', title: 'AI Solutions', desc: 'Cutting-edge AI integration for automation and intelligent decision-making.',
    icon: <Brain size={24} />, price: '₹30,000+', duration: '6-16 weeks',
    features: ['Chatbots', 'Lead automation', 'WhatsApp AI', 'Data insights']
  },
  {
    id: 'podcast-production', title: 'Podcast Production', desc: 'Professional podcast creation and distribution to amplify your brand voice.',
    icon: <Mic size={24} />, price: '₹20,000+', duration: 'Ongoing',
    features: ['Podcast strategy', 'Recording', 'Editing', 'Distribution']
  },
  {
    id: 'financial-consulting', title: 'Financial Consulting', desc: 'Strategic financial planning and investment guidance for business growth.',
    icon: <Calculator size={24} />, price: '₹10,000+', duration: 'Ongoing',
    features: ['Financial planning', 'Investment', 'Risk assessment', 'Tax optimization']
  },
  {
    id: 'business-consultation', title: 'Business Consultation', desc: 'Expert guidance to optimize detailed operations, strategy, and sustainable growth.',
    icon: <Briefcase size={24} />, price: '₹20,000+', duration: 'Ongoing',
    features: ['Strategic planning', 'Process optimization', 'Market research', 'Growth strategy']
  },
  {
    id: 'business-loans', title: 'Business Loans', desc: 'Fast and flexible financing solutions tailored to fuel your business expansion.',
    icon: <Landmark size={24} />, price: '8.5% p.a+', duration: '3-7 Days',
    features: ['Unsecured loans', 'Working capital', 'Machinery loans', 'Quick approval']
  },
  {
    id: 'business-insurance', title: 'Business Insurance', desc: 'Comprehensive coverage options to protect your business assets and liabilities.',
    icon: <ShieldCheck size={24} />, price: '₹999/mo+', duration: 'Annual',
    features: ['General liability', 'Property insurance', 'Cyber insurance', 'Keyman insurance']
  }
];

const DH2Services = () => {
  return (
    <div className="dh2-services-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '70vh' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={14} className="dh2-hero-accent" /> OUR EXPERTISE
            </motion.div>
            
            <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', marginBottom: '2rem' }}>
              <span className="dh2-hero-line">
                <motion.span custom={0} variants={titleV}>CRAFTING</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">IMPOSSIBLE</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={2} variants={titleV} className="dh2-hero-accent">SOLUTIONS.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              We don't just provide services; we engineer <strong style={{ color: 'var(--accent)' }}>strategic advantages</strong>. Our multi-disciplinary approach ensures your business stays ahead of the curve.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW WE THINK - BENTO GRID */}
      <section className="dh2-section" style={{ paddingTop: 0 }}>
        <div className="dh2-container">
          <div className="dh2-label" style={{ marginBottom: '2rem' }}>METHODOLOGY</div>
          <div className="dh2-bento-grid">
            <motion.div className="dh2-bento-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
              <Target size={32} className="dh2-hero-accent" style={{ marginBottom: '1.5rem' }} />
              <h3 className="dh2-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Strategy-First Approach</h3>
              <p className="dh2-body">Every line of code and every pixel is driven by a deep understanding of your business goals and market dynamics.</p>
            </motion.div>
            <motion.div className="dh2-bento-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <TrendingUp size={32} className="dh2-hero-accent" style={{ marginBottom: '1.5rem' }} />
              <h3 className="dh2-heading" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Scalable ROI</h3>
              <p className="dh2-body">We build for the future, ensuring your digital assets grow alongside your business.</p>
            </motion.div>
            <motion.div className="dh2-bento-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <Sparkles size={32} className="dh2-hero-accent" style={{ marginBottom: '1.5rem' }} />
              <h3 className="dh2-heading" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Creative Edge</h3>
              <p className="dh2-body">Fusing artistry with technology to create memorable brand experiences.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EXPERTISE GRID */}
      <section className="dh2-section theme-light" style={{ padding: '10rem 0' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {servicesList.map((s, i) => (
              <motion.div key={s.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: (i % 3) * 0.1 }}>
                <Link to={`/dummyhome2/services/${s.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="dh2-wwd2-card" style={{ height: '100%', opacity: 1, transform: 'none' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-10px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-s)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                      <div style={{ color: 'var(--accent)' }}>{s.icon}</div>
                      <div className="dh2-label" style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>{s.price}</div>
                    </div>

                    <h3 className="dh2-heading" style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{s.title}</h3>
                    <p className="dh2-body" style={{ fontSize: '0.85rem', marginBottom: '2rem', flexGrow: 1 }}>{s.desc}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', borderTop: '1px solid var(--border-s)', paddingTop: '1.5rem' }}>
                      {s.features.map((f, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} /> {f}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      EXPLORE SERVICE <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">AVANI</div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="dh2-display dh2-cta-title">
            READY TO SCALE<br /><span>YOUR BRAND?</span>
          </h2>
          <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
            Let's discuss how our expertise can translate into your success.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/dummyhome2/contact" className="dh2-btn-fill">Start Consultation <ArrowRight size={16} /></Link>
            <Link to="/dummyhome2/contact" className="dh2-btn-ghost">Get in Touch</Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default DH2Services;
