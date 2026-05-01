import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const servicesList = [
  { id: 'web-development', title: 'Web Development', desc: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.', tags: ['React', 'Next.js', 'Node.js', 'TypeScript'] },
  { id: 'seo-content', title: 'SEO & Content', desc: 'Data-driven SEO strategies and compelling content creation that drives organic traffic and conversions.', tags: ['On-Page SEO', 'Content Strategy', 'Analytics', 'Link Building'] },
  { id: 'social-media', title: 'Social Media', desc: 'Strategic social media management and advertising that builds brand awareness and drives engagement.', tags: ['Instagram', 'LinkedIn', 'Facebook', 'Content'] },
  { id: 'ai-solutions', title: 'AI Solutions', desc: 'Cutting-edge AI integrations including chatbots, automation, and machine learning solutions for business optimization.', tags: ['ChatGPT', 'Automation', 'ML', 'NLP'] },
  { id: 'business-consultation', title: 'Business Consulting', desc: 'Strategic business consulting to optimize operations, identify growth opportunities, and maximize ROI.', tags: ['Strategy', 'Growth', 'Operations', 'Finance'] },
  { id: 'podcast-production', title: 'Podcast Production', desc: 'End-to-end podcast production services from planning to publishing, with professional editing and distribution.', tags: ['Recording', 'Editing', 'Distribution', 'Marketing'] },
];

const DH2Services = () => {
  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">WHAT WE DO</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>OUR <span style={{ color: 'var(--accent)' }}>SERVICES</span></h1>
            <p className="dh2-body" style={{ maxWidth: 550, margin: '0 auto', fontSize: '.85rem' }}>We deliver end-to-end digital solutions that drive growth and transform businesses.</p>
          </motion.div>
        </div>
      </section>

      <section className="dh2-section" style={{ paddingTop: '2rem' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
            {servicesList.map((s, i) => (
              <motion.div key={s.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .08 }}>
                <Link to={`/dummyhome2/services/${s.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem', height: '100%', transition: 'border-color .3s, transform .3s', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,255,0,.2)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-s)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                    <div style={{ fontSize: '.5rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '.15em', marginBottom: '1rem' }}>0{i + 1}</div>
                    <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', marginBottom: '.7rem' }}>{s.title}</h3>
                    <p className="dh2-body" style={{ fontSize: '.78rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{s.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginBottom: '1.5rem' }}>
                      {s.tags.map(t => <span key={t} style={{ fontSize: '.55rem', padding: '.2rem .5rem', background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 100, color: 'var(--text-muted)' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.6rem', fontWeight: 700, color: 'var(--accent)' }}>
                      Learn More <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">AVANI</div>
        <motion.h2 className="dh2-display dh2-cta-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          LET'S BUILD<br /><span>TOGETHER</span>
        </motion.h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/dummyhome2/get-consultation" className="dh2-btn-fill">Start a Project</Link>
          <Link to="/dummyhome2/contact" className="dh2-btn-ghost">Let's Talk</Link>
        </motion.div>
      </section>
    </div>
  );
};

export default DH2Services;
