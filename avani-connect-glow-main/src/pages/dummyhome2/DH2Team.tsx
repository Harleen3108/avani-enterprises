import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles, Zap, Linkedin, Twitter, Mail, Award, TrendingUp } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';
import { team as teamData } from '../../components/dummyhome2/data';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DH2Team = () => {
  // Ensuring Kapil is at the top
  const leader = { name: 'Kapil Khandelwal', role: 'Chief Executive Officer', img: '/kapil_khandelwal.jpg', desc: 'A distinguished visionary with over a decade of expertise in digital transformation and strategic business growth.', linkedin: '#', twitter: '#' };
  
  const displayTeam = [
    leader,
    ...teamData.filter(m => m.name !== 'Vikram Patel') // Avoiding conflict with the placeholder CEO if any
  ];

  return (
    <div className="dh2-team-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '60vh' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={14} className="dh2-hero-accent" /> THE ARCHITECTS
            </motion.div>
            
            <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
              <span className="dh2-hero-line">
                <motion.span custom={0} variants={titleV}>MEET THE</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">MINDS BEHIND</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={2} variants={titleV} className="dh2-hero-accent">THE MAGIC.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              A collective of <strong style={{ color: 'var(--accent)' }}>visionaries, engineers, and creatives</strong> dedicated to redefining the digital landscape.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. LEADERSHIP FEATURE */}
      <section className="dh2-section" style={{ paddingTop: 0 }}>
        <div className="dh2-container">
          <div className="dh2-split-grid" style={{ gap: '6rem', alignItems: 'center', background: 'var(--bg-surface)', padding: '6rem', borderRadius: '40px', border: '1px solid var(--border-s)' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: 'relative' }}>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
                <img src={leader.img} alt={leader.name} style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(100%) contrast(1.1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 40%)' }} />
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="dh2-label" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>LEADERSHIP</div>
              <h2 className="dh2-display" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{leader.name}</h2>
              <p className="dh2-body" style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '2rem' }}>{leader.desc}</p>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
                <a href={leader.linkedin} className="dh2-nav-phone" style={{ width: '44px', height: '44px' }}><Linkedin size={20} /></a>
                <a href={leader.twitter} className="dh2-nav-phone" style={{ width: '44px', height: '44px' }}><Twitter size={20} /></a>
                <a href={`mailto:kp@avanienterprises.in`} className="dh2-nav-phone" style={{ width: '44px', height: '44px' }}><Mail size={20} /></a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-s)' }}>
                {[
                  { icon: <Award size={18} />, title: 'Strategy Guru', desc: 'Crafting complex roadmaps' },
                  { icon: <TrendingUp size={18} />, title: 'Scale Expert', desc: 'Driven by measurable growth' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ color: 'var(--accent)' }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CORE TEAM GRID */}
      <section className="dh2-section" style={{ padding: '10rem 0' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh2-label">OUR EXPERTS</div>
            <h2 className="dh2-display" style={{ fontSize: '3.5rem' }}>THE COLLECTIVE</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>
            {displayTeam.slice(1).map((member, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div 
                  style={{ position: 'relative', paddingBottom: '125%', borderRadius: '24px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--border-s)' }}
                  className="dh2-team-member-wrap"
                >
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'all 0.6s var(--ease-out)' }} 
                    className="dh2-team-img"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(200,255,0,0.1)', opacity: 0, transition: 'opacity 0.3s' }} className="dh2-team-hover-overlay" />
                </div>
                <h4 className="dh2-heading" style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>{member.name}</h4>
                <p className="dh2-label" style={{ color: 'var(--accent)', fontSize: '0.55rem' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECRUITMENT CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">TALENT</div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="dh2-display dh2-cta-title">
            WE ARE ALWAYS<br /><span>HIRING.</span>
          </h2>
          <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
            Think you have the magic? We're looking for outliers and visionaries to join our global mission.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/dummyhome2/careers" className="dh2-btn-fill">View Openings <ArrowRight size={16} /></Link>
            <Link to="/dummyhome2/contact" className="dh2-btn-ghost">Contact HR</Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default DH2Team;
