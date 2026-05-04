import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, CheckCircle, Globe, Lightbulb, Heart, Shield, Zap, ArrowRight } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';
import DH2EcosystemMap from '../../components/dummyhome2/DH2EcosystemMap';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const DH2About = () => {
  const stats = [
    { value: '150+', label: 'Happy Clients' },
    { value: '300+', label: 'Projects Done' },
    { value: '85%', label: 'Avg Growth' },
    { value: '8+', label: 'Years Exp.' },
  ];

  const values = [
    { icon: <Target size={18} />, title: 'Results Driven', desc: 'Focusing on measurable outcomes and delivering the best in every project.' },
    { icon: <Users size={18} />, title: 'Client-Centric', desc: "Prioritizing client needs and building long-term partnerships on trust." },
    { icon: <Lightbulb size={18} />, title: 'Innovation First', desc: 'Continuously exploring new digital technologies and staying ahead.' },
    { icon: <Heart size={18} />, title: 'Excellence', desc: 'Setting high standards in everything we do and striving for quality.' },
  ];

  const whyUs = [
    { icon: <Shield size={20} />, title: 'Proven Track Record', desc: '8+ years of experience and 300+ successful projects handled with strategic depth.' },
    { icon: <Zap size={20} />, title: 'Innovation-Driven', desc: 'Leveraging cutting-edge technologies to deliver innovative, competitive solutions.' },
    { icon: <Users size={20} />, title: 'Client-Centric', desc: 'Your success is our priority. We ensure transparency and high-impact results.' },
  ];

  return (
    <div className="dh2-page">
      
      {/* 1. HERO SECTION */}
      <section className="dh2-section" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: .6 }} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <div className="dh2-label">WHO WE ARE</div>
            <h1 className="dh2-display" style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
              TRANSFORMING BUSINESSES THROUGH <span style={{ color: 'var(--accent)' }}>STRATEGY</span> & <span style={{ color: 'var(--accent)' }}>TECHNOLOGY</span>.
            </h1>
            <p className="dh2-body" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Since 2016, we have been delivering high-end digital solutions that drive growth, enhance presence, and set new industry standards.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', borderTop: '1px solid var(--border-s)', paddingTop: '3rem', marginTop: '4rem' }}>
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeIn} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: '2.5rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, color: 'var(--text-main)', marginBottom: '.2rem' }}>{s.value}</div>
                <div style={{ fontSize: '.65rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 700 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. DIGITAL ECOSYSTEM */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)', padding: '6rem 0' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="dh2-label">OUR APPROACH</div>
              <h2 className="dh2-display" style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 600 }}>THE DIGITAL ECOSYSTEM</h2>
              <p className="dh2-body" style={{ fontSize: '.85rem', marginBottom: '1.5rem' }}>
                We believe in connected experiences. Our ecosystem maps out the journey from branding and development to marketing and continuous scaling.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
              <DH2EcosystemMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CEO LEADERSHIP (SPLIT LAYOUT) */}
      <section className="dh2-section" style={{ padding: '7rem 0' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -20, left: -20, right: 20, bottom: 20, border: '1px solid var(--border-f)', borderRadius: 16, zIndex: 0 }} />
              <img src="/kapil_khandelwal.jpg" alt="Kapil Khandelwal" style={{ width: '100%', borderRadius: 16, objectFit: 'cover', minHeight: 450, position: 'relative', zIndex: 1, filter: 'grayscale(100%) contrast(1.1)', transition: 'filter .5s' }} onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)'} />
            </div>

            <div>
              <div className="dh2-label">LEADERSHIP</div>
              <h2 className="dh2-display" style={{ fontSize: '2rem', marginBottom: '.5rem', fontWeight: 600 }}>KAPIL KHANDELWAL</h2>
              <p style={{ fontSize: '.7rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '2rem' }}>CEO – Avani Enterprises</p>
              
              <p className="dh2-body" style={{ fontSize: '.85rem', marginBottom: '2rem' }}>
                A distinguished consultant with over a decade of experience in transforming businesses. Kapil leads our team of professionals dedicated to delivering innovative solutions and strategic growth.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
                {[
                  { title: 'Business Consultant', desc: 'Expert guidance in scaling operations and market expansion.' },
                  { title: 'Active Investor', desc: 'Strategic investments in promising startups to contribute to growth.' },
                  { title: 'Author & Leader', desc: 'Writer of "The Startup Summary Book", sharing insights for success.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '.8rem' }}>
                    <CheckCircle size={14} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} /> 
                    <div>
                      <strong style={{ color: 'var(--text-main)', fontSize: '.85rem', fontWeight: 600 }}>{item.title}</strong>
                      <div style={{ color: 'var(--text-dim)', fontSize: '.75rem' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '2rem' }}>
                {[{ v: '10+', l: 'Years Exp' }, { v: '50+', l: 'Businesses' }, { v: '3', l: 'Investments' }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-main)' }}>{s.v}</div>
                    <div style={{ fontSize: '.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 4. MISSION & VISION (CLEAN BLOCKS) */}
      <section className="dh2-section" style={{ background: 'var(--bg-base)', padding: '6rem 0', borderTop: '1px solid var(--border-s)', borderBottom: '1px solid var(--border-s)' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
            {[
              { title: 'OUR MISSION', accent: 'var(--accent)', text: 'To empower businesses with cutting-edge digital solutions that drive growth, enhance brand presence, and deliver measurable ROI. We build innovation through trust and results.', icon: <Target size={20} /> },
              { title: 'OUR VISION', accent: '#fff', text: 'To be the leading digital transformation partner for businesses across India, known for our innovative solutions, exceptional service, and data-driven success.', icon: <Globe size={20} /> },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .15 }}
                style={{ borderLeft: `2px solid ${item.accent}`, paddingLeft: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1rem', color: item.accent }}>
                  {item.icon}
                  <h3 style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>{item.title}</h3>
                </div>
                <p className="dh2-body" style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES & WHY US (STRUCTURED LISTS) */}
      <section className="dh2-section" style={{ padding: '7rem 0' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
            
            {/* Core Values */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="dh2-label" style={{ marginBottom: '1.5rem' }}>FOUNDATION</div>
              <h2 className="dh2-display" style={{ fontSize: '1.8rem', marginBottom: '2.5rem', fontWeight: 600 }}>CORE VALUES</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {values.map((v, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0, border: '1px solid var(--border-s)' }}>
                      {v.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Syne'", fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '.3rem' }}>{v.title}</h3>
                      <p className="dh2-body" style={{ fontSize: '.8rem' }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
              <div className="dh2-label" style={{ marginBottom: '1.5rem' }}>THE ADVANTAGE</div>
              <h2 className="dh2-display" style={{ fontSize: '1.8rem', marginBottom: '2.5rem', fontWeight: 600 }}>WHY CHOOSE US</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {whyUs.map((w, i) => (
                  <div key={i} style={{ paddingBottom: '1.5rem', borderBottom: i !== whyUs.length - 1 ? '1px solid var(--border-s)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '.8rem' }}>
                      <div style={{ color: 'var(--accent)' }}>{w.icon}</div>
                      <h3 style={{ fontFamily: "'Syne'", fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>{w.title}</h3>
                    </div>
                    <p className="dh2-body" style={{ fontSize: '.8rem', paddingLeft: '2rem' }}>{w.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)', padding: '6rem 0', textAlign: 'center', borderTop: '1px solid var(--border-s)' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="dh2-display" style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 600 }}>
              LET'S BUILD <span style={{ color: 'var(--accent)' }}>TOGETHER</span>
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/dummyhome2/get-consultation" className="dh2-btn-fill">Start a Project <ArrowRight size={14} /></Link>
              <Link to="/dummyhome2/contact" className="dh2-btn-ghost">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default DH2About;
