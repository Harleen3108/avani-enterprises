import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const leaders = [
  { name: 'Kapil Khandelwal', role: 'Chief Executive Officer', image: '/kapil.jpeg', desc: 'A strategic visionary with 15+ years of experience in enterprise connectivity and digital transformation.' },
  { name: 'Dr. Harleen Kaur', role: 'Operations Director', image: '/harleen.jpeg', desc: 'Expert in operational excellence and institutional growth strategies.' },
];

const crew = [
  { name: 'Aryan Verma', role: 'Lead Architect', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Megha Sharma', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
  { name: 'Rahul Gupta', role: 'Senior Developer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Sneha Reddy', role: 'Marketing Strategist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop' },
];

const DHTeam = () => {
  return (
    <div className="dh-team-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">THE CREW</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>MEET THE</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">ARCHITECTS OF</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">SUCCESS.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We are a collection of elite minds dedicated to pushing the boundaries of <strong style={{ color: 'var(--accent-primary)' }}>enterprise innovation and digital excellence.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. LEADERSHIP SPOTLIGHT */}
      <section className="dh-section" style={{ paddingTop: 0 }}>
        <div className="dh-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            {leaders.map((leader, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'center' }}
                className="dh-responsive-grid"
              >
                <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', border: '1px solid var(--border-light)', aspectRatio: '4/5' }}>
                  <img src={leader.image} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 40%)' }} />
                </div>
                <div>
                  <div className="dh-label">{leader.role}</div>
                  <h2 className="dh-display" style={{ fontSize: '4rem', marginBottom: '2rem' }}>{leader.name}</h2>
                  <p className="dh-body" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '3rem', fontStyle: 'italic' }}>
                    "{leader.desc}"
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#" className="dh-btn-ghost" style={{ padding: '1rem' }}><Linkedin size={20} /></a>
                    <a href="#" className="dh-btn-ghost" style={{ padding: '1rem' }}><Twitter size={20} /></a>
                    <a href="#" className="dh-btn-ghost" style={{ padding: '1rem' }}><Mail size={20} /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE CREW GRID */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">THE FOUNDATION</div>
            <h2 className="dh-display" style={{ fontSize: '3.5rem' }}>ELITE TEAM</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }} className="dh-responsive-grid">
            {crew.map((member, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                className="dh-card"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderBottom: '1px solid var(--border-faint)' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.5s var(--ease-out)' }} onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'} onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%)'} />
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h4 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{member.name}</h4>
                  <p className="dh-body" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VALUES CALLOUT */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }} className="dh-responsive-grid">
            {[
              { icon: <ShieldCheck size={32} />, title: 'Integrity', desc: 'Unwavering commitment to honesty and ethical standards in every engagement.' },
              { icon: <Zap size={32} />, title: 'Innovation', desc: 'Constantly pushing technical boundaries to deliver future-ready solutions.' },
              { icon: <Heart size={32} />, title: 'Partnership', desc: 'Building long-term relationships based on mutual trust and shared success.' }
            ].map((v, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>{v.icon}</div>
                <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{v.title}</h3>
                <p className="dh-body">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHTeam;
