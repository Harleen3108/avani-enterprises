import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, CheckCircle, Globe, Lightbulb, Heart, Shield, Zap } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2About = () => {
  const values = [
    { icon: <Target size={20} />, title: 'Results Driven', desc: 'We focus on measurable outcomes and strive to deliver the very best in every project.' },
    { icon: <Users size={20} />, title: 'Client-Centric', desc: "Our client's success is our success. We prioritize their needs, personalize based on trust." },
    { icon: <Lightbulb size={20} />, title: 'Innovation First', desc: 'We stay ahead of the curve by continuously exploring new ideas and digital technologies.' },
    { icon: <Heart size={20} />, title: 'Excellence', desc: 'We set high standards in everything we do, striving for quality and continuous improvement.' },
  ];

  const stats = [
    { value: '150+', label: 'Happy Clients', icon: <Users size={20} /> },
    { value: '300+', label: 'Projects Done', icon: <Award size={20} /> },
    { value: '85%', label: 'Avg Growth', icon: <TrendingUp size={20} /> },
    { value: '8+', label: 'Years Exp', icon: <Globe size={20} /> },
  ];

  const whyUs = [
    { icon: <Shield size={20} />, title: 'Proven Track Record', desc: 'With 8+ years of experience and 300+ successful projects, we have the strategic depth and technical expertise to handle any digital challenge.' },
    { icon: <Zap size={20} />, title: 'Innovation-Driven', desc: 'We stay ahead of industry trends and leverage cutting-edge technologies to deliver innovative solutions that give you a competitive edge.' },
    { icon: <Users size={20} />, title: 'Client-Centric', desc: 'Your success is our priority. We build long-term partnerships based on trust, transparency, and delivering high-impact results.' },
  ];

  return (
    <div className="dh2-page">
      {/* Hero */}
      <section className="dh2-section" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: .6 }}>
            <div className="dh2-label">WHO WE ARE</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>
              ABOUT <span style={{ color: 'var(--accent)' }}>AVANI</span>
            </h1>
            <p className="dh2-body" style={{ maxWidth: 600, margin: '0 auto', fontSize: '.9rem' }}>
              Transforming businesses through strategic digital solutions and innovative technology since 2016.
            </p>
          </motion.div>

          {/* Stats Row */}
          <div className="dh2-about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginTop: '4rem', maxWidth: 700, margin: '4rem auto 0' }}>
            {stats.map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .1 }} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontFamily: "'Syne', sans-serif", fontWeight: 800, color: 'var(--accent)', marginBottom: '.3rem' }}>{s.value}</div>
                <div style={{ fontSize: '.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 600 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">LEADERSHIP</div>
            <h2 className="dh2-display dh2-section-title">MEET OUR CEO</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }}
            style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem', maxWidth: 800, margin: '0 auto', background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ background: '#111' }}>
              <img src="/kapil_khandelwal.jpg" alt="Kapil Khandelwal" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 300 }} />
            </div>
            <div style={{ padding: '2rem 2rem 2rem 0' }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: '.3rem' }}>Kapil Khandelwal</h3>
              <p style={{ fontSize: '.7rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '1rem' }}>CEO – Avani Enterprises</p>
              <p className="dh2-body" style={{ fontSize: '.8rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Kapil Khandelwal is a distinguished Business and Startup Consultant with over a decade of experience in transforming businesses and nurturing startups to success.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginBottom: '1.2rem' }}>
                {['Business & Startup Consultant', 'Active Investor', 'Author & Thought Leader'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.72rem', color: 'var(--text-muted)' }}>
                    <CheckCircle size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.5rem' }}>
                {[{ v: '10+', l: 'Years' }, { v: '50+', l: 'Businesses' }, { v: '3', l: 'Investments' }].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '.6rem', background: 'rgba(255,255,255,.03)', borderRadius: 8, border: '1px solid var(--border-s)' }}>
                    <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '.9rem', color: 'var(--accent)' }}>{s.v}</div>
                    <div style={{ fontSize: '.55rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="dh2-section">
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">PURPOSE</div>
            <h2 className="dh2-display dh2-section-title">MISSION & VISION</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
            {[
              { title: 'Our Mission', accent: 'var(--accent)', text: 'To empower businesses with cutting-edge digital solutions that drive growth, enhance brand presence, and deliver measurable ROI.', icon: <Target size={24} /> },
              { title: 'Our Vision', accent: '#f59e0b', text: 'To be the leading digital transformation partner for businesses across India, known for our innovative solutions and exceptional service.', icon: <Globe size={24} /> },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .15 }}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${item.accent}, rgba(255,255,255,.1))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', marginBottom: '1.5rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', marginBottom: '.8rem' }}>{item.title}</h3>
                <p className="dh2-body" style={{ fontSize: '.8rem', lineHeight: 1.7 }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">OUR FOUNDATION</div>
            <h2 className="dh2-display dh2-section-title">CORE VALUES</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem', maxWidth: 900, margin: '0 auto' }}>
            {values.map((v, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .1 }}
                style={{ background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 14, padding: '2rem 1.5rem', transition: 'border-color .3s, transform .3s', cursor: 'default' }}
                whileHover={{ y: -4, borderColor: 'rgba(200,255,0,.2)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', marginBottom: '1.2rem' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.85rem', marginBottom: '.5rem' }}>{v.title}</h3>
                <p className="dh2-body" style={{ fontSize: '.72rem', lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="dh2-section">
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">THE AVANI ADVANTAGE</div>
            <h2 className="dh2-display dh2-section-title">WHY CHOOSE US</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
            {whyUs.map((w, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .12 }}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem', transition: 'border-color .3s, transform .3s' }}
                whileHover={{ y: -4, borderColor: 'rgba(200,255,0,.15)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', marginBottom: '1.5rem' }}>
                  {w.icon}
                </div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '.95rem', marginBottom: '.6rem' }}>{w.title}</h3>
                <p className="dh2-body" style={{ fontSize: '.78rem', lineHeight: 1.7 }}>{w.desc}</p>
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Link to="/dummyhome2/get-consultation" className="dh2-btn-fill">Start a Project</Link>
          <Link to="/dummyhome2/contact" className="dh2-btn-ghost">Let's Talk</Link>
        </motion.div>
      </section>
    </div>
  );
};

export default DH2About;
