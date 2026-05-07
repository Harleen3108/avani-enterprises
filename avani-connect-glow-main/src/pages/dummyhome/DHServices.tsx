import React from 'react';
import { motion } from 'framer-motion';
import { Code, Search, Share2, Zap, Radio, PieChart, ArrowRight, CheckCircle } from 'lucide-react';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const services = [
  { icon: <Code size={32} />, title: 'Web & App Development', desc: 'Crafting high-performance digital architectures with precision and scale.', features: ['Custom React Frameworks', 'Mobile App Ecosystems', 'Enterprise Solutions'] },
  { icon: <Search size={32} />, title: 'SEO & Content Marketing', desc: 'Dominating search landscapes through strategic authority and visibility.', features: ['Semantic SEO', 'Authority Building', 'Content Strategy'] },
  { icon: <Share2 size={32} />, title: 'Social Media Marketing', desc: 'Building meaningful brand narratives that resonate globally.', features: ['Narrative Design', 'Viral Mechanics', 'Community Growth'] },
  { icon: <Zap size={32} />, title: 'AI Solutions', desc: 'Harnessing the power of automation to drive operational intelligence.', features: ['LLM Integration', 'Process Automation', 'Intelligent Chatbots'] },
  { icon: <Radio size={32} />, title: 'Podcast Production', desc: 'Amplifying your brand voice through cinematic audio experiences.', features: ['Audio Engineering', 'Global Distribution', 'Narrative Production'] },
  { icon: <PieChart size={32} />, title: 'Financial Consulting', desc: 'Navigating market complexities with data-driven strategic oversight.', features: ['Growth Capital', 'Risk Management', 'Strategic Scaling'] },
];

const DHServices = () => {
  return (
    <div className="dh-services-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">OUR EXPERTISE</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>HIGH-TECH</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">SOLUTIONS &</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">STRATEGY.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We provide a comprehensive ecosystem of services designed to accelerate your <strong style={{ color: 'var(--accent-primary)' }}>growth and digital authority.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. METHODOLOGY BENTO */}
      <section className="dh-section" style={{ paddingTop: 0 }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="dh-responsive-grid">
            {services.map((service, i) => (
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
                <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}>{service.icon}</div>
                <h3 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{service.title}</h3>
                <p className="dh-body" style={{ marginBottom: '2.5rem', flex: 1 }}>{service.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                  {service.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent-primary)' }} /> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  EXPLORE SERVICE <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESS WORKFLOW */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh-label">OUR WORKFLOW</div>
              <h2 className="dh-display" style={{ fontSize: '4rem', marginBottom: '2.5rem' }}>BATTLE-TESTED <br/><span style={{ color: 'var(--accent-primary)' }}>PROCESS.</span></h2>
              <p className="dh-body" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
                We don't just deliver; we architect. Our agile methodology ensures quality and scalability at every milestone.
              </p>
              <button className="dh-btn-fill">DOWNLOAD METHODOLOGY</button>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { step: '01', title: 'Deep Discovery', desc: 'Analyzing your market position and business objectives.' },
                { step: '02', title: 'Strategic Blueprint', desc: 'Defining the roadmap and technical architecture.' },
                { step: '03', title: 'Agile Execution', desc: 'Iterative development with complete transparency.' },
                { step: '04', title: 'Performance Scale', desc: 'Launching and optimizing for measurable impact.' }
              ].map((p, i) => (
                <motion.div 
                  key={i} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: '2rem', padding: '2rem', borderBottom: '1px solid var(--border-faint)' }}
                >
                  <span style={{ fontSize: '1.2rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent-primary)' }}>{p.step}</span>
                  <div>
                    <h4 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{p.title}</h4>
                    <p className="dh-body" style={{ fontSize: '0.9rem' }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHServices;
