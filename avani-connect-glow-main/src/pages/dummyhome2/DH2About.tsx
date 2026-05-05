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
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: .6 }} style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
            <div className="dh2-label">WHO WE ARE</div>
            <h1 className="dh2-display" style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              WE DON'T JUST BUILD SOFTWARE. <br />
              WE ARCHITECT <span style={{ color: 'var(--accent)' }}>COMPETITIVE ADVANTAGE</span>.
            </h1>
            <p className="dh2-body" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
              Since 2016, Avani Enterprises has been engineering high-end digital ecosystems. We combine deep strategic foresight with cutting-edge technology to drive explosive growth, elevate brand presence, and set bold new industry standards.
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
      <section className="dh2-section" style={{ padding: '8rem 0', background: 'var(--bg-base)' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'center' }}>
            
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -30, left: -30, right: 30, bottom: 30, border: '1px solid var(--border-f)', borderRadius: 20, zIndex: 0 }} />
              <img src="/kapil_khandelwal.jpg" alt="Kapil Khandelwal" style={{ width: '100%', borderRadius: 20, objectFit: 'cover', minHeight: 600, position: 'relative', zIndex: 1, filter: 'grayscale(100%) contrast(1.1)', transition: 'filter .5s' }} onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)'} />
            </div>

            <div>
              <div className="dh2-label">LEADERSHIP</div>
              <h2 className="dh2-display" style={{ fontSize: '3rem', marginBottom: '.5rem', fontWeight: 700 }}>KAPIL KHANDELWAL</h2>
              <p style={{ fontSize: '.8rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '2.5rem' }}>CEO & Founder – Avani Enterprises</p>
              
              <p className="dh2-body" style={{ fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                A distinguished strategist and consultant with over a decade of experience in transforming businesses. Kapil leads our elite team of professionals, dedicating his expertise to architecting innovative, highly scalable solutions that drive strategic growth across multiple industries.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3.5rem' }}>
                {[
                  { title: 'Business Consultant', desc: 'Expert guidance in scaling operations and market expansion.' },
                  { title: 'Active Investor', desc: 'Strategic investments in promising startups to contribute to growth.' },
                  { title: 'Author & Leader', desc: 'Writer of "The Startup Summary Book", sharing insights for success.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <CheckCircle size={18} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} /> 
                    <div>
                      <strong style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 600 }}>{item.title}</strong>
                      <div style={{ color: 'var(--text-dim)', fontSize: '.85rem', marginTop: '.2rem' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '3rem', borderTop: '1px solid var(--border-s)', paddingTop: '2rem' }}>
                {[{ v: '10+', l: 'Years Exp' }, { v: '50+', l: 'Businesses' }, { v: '3', l: 'Investments' }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.8rem', color: 'var(--text-main)' }}>{s.v}</div>
                    <div style={{ fontSize: '.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.15em', fontWeight: 600, marginTop: '.3rem' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 4. MISSION & VISION (CLEAN BLOCKS) */}
      <section className="dh2-section" style={{ padding: '8rem 0', borderTop: '1px solid var(--border-s)', borderBottom: '1px solid var(--border-s)' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }}>
            {[
              { title: 'OUR MISSION', accent: 'var(--accent)', text: <>To empower businesses with <strong style={{ color: 'var(--text-main)' }}>cutting-edge digital solutions</strong> that drive explosive growth, enhance brand presence, and deliver measurable ROI. We build innovation through trust and relentless focus on results.</>, icon: <Target size={24} /> },
              { title: 'OUR VISION', accent: '#fff', text: <>To be the definitive <strong style={{ color: 'var(--text-main)' }}>digital transformation partner</strong> for businesses worldwide—renowned for our architectural innovation, elite service standards, and data-driven success models.</>, icon: <Globe size={24} /> },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .15 }}
                style={{ borderLeft: `3px solid ${item.accent}`, paddingLeft: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: item.accent }}>
                  {item.icon}
                  <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.5rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-main)' }}>{item.title}</h3>
                </div>
                <p className="dh2-body" style={{ fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: 1.8 }}>{item.text}</p>
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
