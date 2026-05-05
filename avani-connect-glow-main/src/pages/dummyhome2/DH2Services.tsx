import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, CheckCircle, Globe, Search, Share2, Brain, Mic, Calculator, Briefcase, Landmark, ShieldCheck } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const servicesList = [
  {
    id: 'web-development', title: 'Web & App Development', desc: 'Custom websites and mobile applications that drive conversions and user engagement.',
    icon: <Globe size={24} />, price: '₹15,000 - ₹5,00,000', duration: '4-12 weeks',
    features: ['Responsive design for all devices', 'Custom CMS development', 'E-commerce solutions', 'Mobile app development', 'API integration', 'Performance optimization']
  },
  {
    id: 'seo-content', title: 'SEO & Content Marketing', desc: 'Data-driven SEO strategies and compelling content that ranks and converts.',
    icon: <Search size={24} />, price: '₹10,000 - ₹2,00,000', duration: '3-6 months',
    features: ['Technical SEO audit', 'Keyword research & strategy', 'Content creation & optimization', 'Link building campaigns', 'Local SEO optimization', 'Performance tracking']
  },
  {
    id: 'social-media', title: 'Social Media Marketing', desc: 'Strategic SMM campaigns that build brand awareness and drive engagement.',
    icon: <Share2 size={24} />, price: '₹15,000 - ₹1,50,000', duration: 'Ongoing',
    features: ['Platform-specific strategies', 'Content calendar creation', 'Community management', 'Paid social campaigns', 'Influencer partnerships', 'Analytics & reporting']
  },
  {
    id: 'ai-solutions', title: 'AI Solutions', desc: 'Cutting-edge AI integration for automation and intelligent decision-making.',
    icon: <Brain size={24} />, price: '₹30,000 - ₹10,00,000', duration: '6-16 weeks',
    features: ['Chatbot development', 'Lead management automation', 'WhatsApp text automation', 'Predictive analytics', 'Process automation', 'Data analysis & insights']
  },
  {
    id: 'podcast-production', title: 'Podcast Production', desc: 'Professional podcast creation and distribution to amplify your brand voice.',
    icon: <Mic size={24} />, price: '₹20,000 - ₹3,00,000', duration: 'Ongoing',
    features: ['Podcast strategy & planning', 'Professional recording', 'Audio editing & mixing', 'Show notes & transcripts', 'Distribution & promotion', 'Analytics & optimization']
  },
  {
    id: 'financial-consulting', title: 'Financial Consulting', desc: 'Strategic financial planning and investment guidance for business growth.',
    icon: <Calculator size={24} />, price: '₹10,000 - ₹5,00,000', duration: 'Ongoing',
    features: ['Financial planning', 'Investment strategies', 'Risk assessment', 'Tax optimization', 'Funding guidance', 'Performance analysis']
  },
  {
    id: 'business-consultation', title: 'Business Consultation', desc: 'Expert guidance to optimize detailed operations, strategy, and sustainable growth.',
    icon: <Briefcase size={24} />, price: '₹20,000 - ₹5,00,000', duration: 'Ongoing',
    features: ['Strategic business planning', 'Operational process optimization', 'Market analysis & research', 'Growth strategy development', 'Change management', 'Performance improvement']
  },
  {
    id: 'business-loans', title: 'Business Loans', desc: 'Fast and flexible financing solutions tailored to fuel your business expansion.',
    icon: <Landmark size={24} />, price: '8.5% p.a - 18% p.a', duration: '3-7 Days',
    features: ['Unsecured business loans', 'Working capital finance', 'Machinery & equipment loans', 'Quick approval process', 'Competitive interest rates', 'Minimal documentation']
  },
  {
    id: 'business-insurance', title: 'Business Insurance', desc: 'Comprehensive coverage options to protect your business assets and liabilities.',
    icon: <ShieldCheck size={24} />, price: '₹999/mo - Custom', duration: 'Annual',
    features: ['General liability insurance', 'Property insurance', 'Workers\' compensation', 'Professional liability', 'Cyber insurance', 'Keyman insurance']
  }
];

const DH2Services = () => {
  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">WHAT WE DO</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>EXPERT <span style={{ color: 'var(--accent)' }}>SERVICES</span></h1>
            <p className="dh2-body" style={{ maxWidth: 650, margin: '0 auto', fontSize: '.85rem' }}>Comprehensive digital solutions designed to drive growth, enhance brand presence, and deliver measurable results for your business.</p>
          </motion.div>
        </div>
      </section>

      <section className="dh2-section theme-light" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
            {servicesList.map((s, i) => (
              <motion.div key={s.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: (i % 2) * .08 }}>
                <Link to={`/dummyhome2/services/${s.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem', height: '100%', transition: 'border-color .3s, transform .3s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,255,0,.2)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-s)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                        {s.icon}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '.55rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Starting From</div>
                        <div style={{ fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent)', fontSize: '1rem' }}>{s.price.split(' - ')[0]}</div>
                      </div>
                    </div>

                    <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.2rem', marginBottom: '.5rem' }}>{s.title}</h3>
                    <p className="dh2-body" style={{ fontSize: '.78rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>{s.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-s)', paddingBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.65rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {s.duration}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.65rem', color: 'var(--text-muted)' }}>
                        <Users size={12} /> Team of 3-5
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.8rem' }}>What's Included:</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                        {s.features.slice(0, 4).map((f, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '.4rem', fontSize: '.7rem', color: 'var(--text-muted)' }}>
                            <CheckCircle size={12} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.65rem', fontWeight: 700, color: 'var(--accent)', marginTop: 'auto' }}>
                      Get Quote / View Details <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">PROCESS</div>
            <h2 className="dh2-display dh2-section-title">HOW WE WORK</h2>
            <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>Our proven process ensures successful project delivery and exceptional results.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
            {[
              { num: '1', title: 'Discovery', desc: 'We analyze your business, goals, and requirements to create a strategic plan.' },
              { num: '2', title: 'Strategy', desc: 'We develop a comprehensive strategy tailored to your specific needs and objectives.' },
              { num: '3', title: 'Execution', desc: 'Our expert team implements the strategy with regular updates and quality assurance.' },
              { num: '4', title: 'Optimization', desc: 'We continuously monitor, analyze, and optimize for maximum performance and ROI.' }
            ].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .1 }} style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-base)', border: '1px solid var(--border-s)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent)', margin: '0 auto 1.5rem', position: 'relative' }}>
                  {step.num}
                  {i < 3 && <div style={{ position: 'absolute', top: '50%', left: '100%', width: 'calc(100% + 1.5rem)', height: 1, background: 'var(--border-s)', transform: 'translateY(-50%)', zIndex: -1 }} className="hidden md:block" />}
                </div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1rem', marginBottom: '.5rem' }}>{step.title}</h3>
                <p className="dh2-body" style={{ fontSize: '.75rem', lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dh2-cta theme-light">
        <div className="dh2-cta-watermark">AVANI</div>
        <motion.h2 className="dh2-display dh2-cta-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          READY TO<br /><span>START?</span>
        </motion.h2>
        <p className="dh2-body" style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto 2rem', fontSize: '.85rem' }}>
          Let's discuss your project requirements and create a custom solution that fits your budget and timeline.
        </p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/dummyhome2/get-consultation" className="dh2-btn-fill">Get Consultation</Link>
          <a href="tel:+919253625099" className="dh2-btn-ghost">Call Us Now</a>
        </motion.div>
      </section>
    </div>
  );
};

export default DH2Services;
