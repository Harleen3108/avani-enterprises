import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, ArrowRight, CheckCircle, Globe, Zap, Lightbulb, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import RotatingText from '../../components/RotatingText';
import AnimatedCounter from '../../components/AnimatedCounter';

import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 60, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 0.8, ease: [.22, 1, .36, 1], delay: i * 0.1 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const row1Logos = [
  { name: 'Paragon', logo: '/paragon.png' },
  { name: 'Indus group of institutions', logo: '/indus.jpeg' },
  { name: 'Policicue', logo: '/policucue.jpeg' },
  { name: 'Frd Nutrition', logo: '/frd-nutrition-new.png' },
  { name: 'Rohtak Shoe Co.', logo: '/shoes.jpeg' },
  { name: 'Gaon se ghar tak', logo: '/gaonsegharatk.png' },
];

const row2Logos = [
  { name: 'Redball Cricket Ground', logo: '/redball.png' },
  { name: 'The Page', logo: '/thepage.png' },
  { name: 'King\'s Pet Hospital', logo: '/kingspet.png' },
  { name: 'Hi-tech Homes', logo: '/hitech.jpeg' },
  { name: 'Sanjeevni Hospital', logo: '/sanjeevni.jpeg' },
];

const tripledRow1 = [...row1Logos, ...row1Logos, ...row1Logos];
const tripledRow2 = [...row2Logos, ...row2Logos, ...row2Logos];

const DHAbout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dh-about-page" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* 1. CINEMATIC HERO WITH FLOATING PICTURES */}
      <section className="theme-brown" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '120px', paddingBottom: '80px' }}>
        {/* Abstract Background Grid */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.1, 
          backgroundImage: 'linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Top Moving Bar */}
        <div style={{ overflow: 'hidden', marginBottom: '40px', opacity: 0.8, position: 'relative', zIndex: 10 }}>
          <motion.div animate={{ x: ['0%', '-33.33%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            style={{ display: 'flex', gap: '16px', width: 'max-content' }}>
            {tripledRow1.map((l: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '100px', flexShrink: 0 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                  <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="dh-container" style={{ position: 'relative', zIndex: 10, marginBottom: '40px' }}>
          <div className="dh-responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.10fr 0.90fr', gap: '60px', alignItems: 'center' }}>

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp} style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                OUR HERITAGE
              </motion.div>

              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 800, lineHeight: 0.95, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 24px 0', textTransform: 'uppercase' }}>
                <span style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.span custom={0} variants={titleV} style={{ display: 'block' }}>CRAFTING</motion.span>
                </span>
                <span style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.span custom={1} variants={titleV} style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px var(--text-primary)' }}>A TIMELESS</motion.span>
                </span>
                <span style={{ display: 'block', overflow: 'hidden' }}>
                  <motion.span custom={2} variants={titleV} style={{ display: 'block', color: 'var(--accent-primary)' }}>LEGACY.</motion.span>
                </span>
              </h1>

              <motion.p variants={fadeUp} style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.6, fontWeight: 400, marginBottom: '32px' }}>
                Since 2016, we have been at the forefront of digital transformation, blending traditional values with future-ready technology to build remarkable brand experiences.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link to="/dummyhome/get-consultation" className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                  Get Free Consultation
                </Link>
              </motion.div>
            </motion.div>

            {/* Symmetrical Aligned Grid for Images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '100%' }}>
              {[
                { src: '/indus.jpeg', title: 'Indus Group' },
                { src: '/sanjeevni.jpeg', title: 'Sanjeevni Hospital' },
                { src: '/hitech.jpeg', title: 'Hi-Tech Homes' },
                { src: '/shoes.jpeg', title: 'Rohtak Shoe' }
              ].map((imgData, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    aspectRatio: '4/3',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-light)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    background: 'var(--card-bg)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={imgData.src}
                    alt={imgData.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4))',
                    pointerEvents: 'none'
                  }} />
                  <span style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    fontSize: '11px',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    {imgData.title}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Moving Bar */}
        <div style={{ overflow: 'hidden', marginTop: '20px', opacity: 0.8, position: 'relative', zIndex: 10 }}>
          <motion.div animate={{ x: ['-33.33%', '0%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
            style={{ display: 'flex', gap: '16px', width: 'max-content' }}>
            {tripledRow2.map((l: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '100px', flexShrink: 0 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                  <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. LEADERSHIP SECTION (Reduced Size) */}
      <section className="theme-beige" style={{ padding: '80px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-light)', aspectRatio: '4/5' }}>
                <img src="/kapil_khandelwal.jpg" alt="Kapil Khandelwal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-15px', right: '-15px', background: 'var(--accent-primary)', color: 'white', padding: '1.2rem', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '1.5rem', fontFamily: "'Outfit', sans-serif", fontWeight: 800, lineHeight: 1 }}>10+</div>
                <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years Exp</div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                THE LEADERSHIP
              </span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                Kapil <span style={{ color: 'var(--accent-primary)' }}>Khandelwal</span>
              </h2>
              <p style={{ fontSize: '14px', marginBottom: '24px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Distinguished Business Consultant with over a decade of experience in transforming businesses and nurturing startups. As the CEO of Avani Enterprises, he leads professionals dedicated to delivering innovative digital solutions.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '30px' }}>
                {[
                  { title: 'Author', desc: 'Writer of "The Startup Summary Book".' },
                  { title: 'Investor', desc: 'Active strategic investments in promising tech startups.' },
                  { title: 'Visionary', desc: 'Leading Avani to become a global technical powerhouse.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle size={16} style={{ color: 'var(--accent-primary)', marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, marginBottom: '4px', color: 'var(--text-primary)' }}>{item.title}</h4>
                      <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY & VISION (Compact) */}
      <section className="theme-brown" style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-faint)' }}>
              <Shield size={28} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Core Philosophy</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>We believe in "Excellence by Design." Every line of code is crafted to ensure your business doesn't just grow, but thrives.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-faint)' }}>
              <Target size={28} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>The Mission</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>To empower businesses with cutting-edge digital solutions that drive growth, enhance brand presence, and deliver ROI.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-faint)' }}>
              <Globe size={28} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>The Vision</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>To be the leading digital transformation partner globally, known for innovative solutions and exceptional architecture.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS SECTION (Smaller Stats) */}
      <section className="theme-beige" style={{ padding: '60px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="dh-responsive-grid">
            {[
              { val: 150, label: 'Happy Clients' },
              { val: 300, label: 'Projects Done' },
              { val: 85, label: 'Growth Avg', suffix: '%' },
              { val: 8, label: 'Years Exp' }
            ].map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} 
                style={{ 
                  textAlign: 'center',
                  padding: '30px 20px',
                  background: 'var(--card-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-faint)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-faint)';
                }}
              >
                <div style={{ fontSize: '42px', fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '8px' }}>
                  <AnimatedCounter target={stat.val} suffix={stat.suffix || '+'} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES WITH PICTURE IN THE MIDDLE */}
      <section className="theme-brown" style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>FOUNDATION</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Core Values</h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, minWidth: '250px' }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'right' }}>
                <Target size={24} style={{ color: 'var(--accent-primary)', marginBottom: '8px', marginLeft: 'auto' }} />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Results Driven</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>We focus on measurable outcomes.</p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ textAlign: 'right' }}>
                <Users size={24} style={{ color: 'var(--accent-primary)', marginBottom: '8px', marginLeft: 'auto' }} />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Client-Centric</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>We personalize based on trust.</p>
              </motion.div>
            </div>

            <div style={{ width: '280px', height: '280px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--border-light)', flexShrink: 0, background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/logo0.jpg" alt="Avani Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, minWidth: '250px' }}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ textAlign: 'left' }}>
                <Lightbulb size={24} style={{ color: 'var(--accent-primary)', marginBottom: '8px' }} />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Innovation First</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Exploring new future technologies.</p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ textAlign: 'left' }}>
                <Heart size={24} style={{ color: 'var(--accent-primary)', marginBottom: '8px' }} />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Passion</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Setting high standards in everything.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE AVANI ENTERPRISES */}
      <section className="theme-beige" style={{ padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative' }}>
        {/* Grain */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>THE AVANI ADVANTAGE</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Why Choose <span style={{ color: 'var(--accent-primary)' }}>Avani Enterprises?</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '16px auto 0', lineHeight: 1.7 }}>
              Empowering your digital journey with strategic excellence and innovative solutions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="dh-responsive-grid">
            {[
              { img: '/about_proven_track_record.png', icon: <Shield size={24} />, title: 'Proven Track Record', desc: 'With 8+ years of experience and 300+ successful projects, we have the strategic depth and technical expertise to handle any digital challenge.' },
              { img: '/about_innovation_driven.png', icon: <Zap size={24} />, title: 'Innovation-Driven', desc: 'We stay ahead of industry trends and leverage cutting-edge technologies to deliver innovative solutions that give you a competitive edge.' },
              { img: '/about_client_centric.png', icon: <Users size={24} />, title: 'Client-Centric', desc: 'Your success is our priority. We build long-term partnerships based on trust, transparency, and delivering high-impact results.' },
            ].map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{ background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-faint)', overflow: 'hidden', transition: 'all 0.4s ease', backdropFilter: 'blur(10px)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-faint)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginTop: '-40px', position: 'relative', zIndex: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '16px' }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{card.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="theme-brown" style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-faint)', position: 'relative', overflow: 'hidden' }}>
            {/* Corner accents */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 60, borderTop: '2px solid var(--accent-primary)', borderLeft: '2px solid var(--accent-primary)', borderRadius: '24px 0 0 0', opacity: 0.3 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 60, borderBottom: '2px solid var(--accent-primary)', borderRight: '2px solid var(--accent-primary)', borderRadius: '0 0 24px 0', opacity: 0.3 }} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                LET'S BUILD YOUR <br />
                <span style={{ color: 'var(--accent-primary)' }}>
                  <RotatingText words={["SUCCESS STORY", "DIGITAL FUTURE", "GROWTH ENGINE"]} interval={3000} className="dh-display" />
                </span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 32px' }}>
                Partner with us to unlock growth opportunities and achieve your business vision.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link to="/dummyhome/get-consultation" style={{ padding: '12px 24px', background: 'var(--accent-primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  GET CONSULTATION <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHAbout;
