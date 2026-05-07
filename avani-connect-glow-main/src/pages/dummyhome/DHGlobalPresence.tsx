import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, ArrowUpRight, Target, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const officeDetails = [
  { city: 'Rohtak', label: 'Corporate Headquarters', description: 'Our flagship innovation center where strategy meets execution. The heartbeat of our national operations.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop', tagline: 'CENTRAL HUB', contact: { address: '106, First Floor, Agro Mall, Rohtak', email: 'kp@avanienterprises.in', phone: '+91 9253625099' } },
  { city: 'Gurgaon', label: 'Strategic NCR Hub', description: 'Located in the heart of Cyber City, bridging the gap between digital vision and enterprise reality.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop', tagline: 'ENTERPRISE NODE', contact: { address: 'Tower B, 3rd Floor, Unitech Cyber Park, Gurugram', email: 'kp@avanienterprises.in', phone: '+91 9253625099' } },
  { city: 'Mumbai', label: 'Western Operations', description: 'Empowering the financial capital with cutting-edge tech solutions and strategic oversight.', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop', tagline: 'GROWTH CENTER', contact: { address: 'Vasudev Chamber, Andheri East, Mumbai', email: 'kp@avanienterprises.in', phone: '+91 9253625099' } },
  { city: 'Australia', label: 'APAC Regional Node', description: 'Extending our reach across the Pacific, ensuring global support and local expertise for our international partners.', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop', tagline: 'GLOBAL GATEWAY', contact: { address: 'Australia Operations', email: 'kp@avanienterprises.in', phone: '+91 9253625099' } },
];

const DHGlobalPresence = () => {
  return (
    <div className="dh-global-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">WORLDWIDE</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>GLOBAL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">PRESENCE.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We've built a high-tech network that spans continents, providing <strong style={{ color: 'var(--accent-primary)' }}>seamless connectivity and strategic oversight.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS ROW */}
      <section className="dh-section" style={{ paddingTop: 0 }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem', padding: '4rem 0', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)' }} className="dh-responsive-grid">
            {[
              { num: '04', label: 'Major Hubs' },
              { num: '02', label: 'Continents' },
              { num: '150+', label: 'Global Clients' },
              { num: '∞', label: 'Digital Reach' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="dh-display" style={{ fontSize: '3.5rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>{stat.num}</div>
                <div className="dh-label" style={{ marginBottom: 0 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MAP CONCEPT */}
      <section className="dh-section">
        <div className="dh-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', border: '1px solid var(--border-light)', height: '60vh', background: 'var(--bg-tertiary)' }}>
              <img src="/global2.png" alt="Global Network" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--bg-primary) 100%)' }} />
              
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'var(--accent-hover)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', padding: '1rem 2.5rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', backdropFilter: 'blur(10px)' }}>
                  ACTIVE TRANSMISSION...
                </div>
              </div>

              {/* Pingers */}
              {[
                { top: '40%', left: '70%' },
                { top: '35%', left: '68%' },
                { top: '45%', left: '72%' },
                { top: '70%', left: '85%' }
              ].map((pos, i) => (
                <div key={i} style={{ position: 'absolute', ...pos, width: '12px', height: '12px', background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: '0 0 20px var(--accent-primary)' }}>
                  <motion.div animate={{ scale: [1, 3], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '100%', height: '100%', background: 'var(--accent-primary)', borderRadius: '50%' }} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. OFFICE COLLECTION */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">COLLECTION</div>
            <h2 className="dh-display" style={{ fontSize: '3.5rem' }}>OFFICE HUBS</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }} className="dh-responsive-grid">
            {officeDetails.map((office, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
              >
                <div className="dh-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={office.image} alt={office.city} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.7)' }} />
                  </div>
                  <div style={{ padding: '3rem' }}>
                    <div className="dh-label" style={{ marginBottom: '1rem', fontSize: '0.6rem' }}>{office.tagline}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                      <h3 className="dh-display" style={{ fontSize: '2.5rem' }}>{office.city}</h3>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-hover)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MapPin size={24} />
                      </div>
                    </div>
                    <p className="dh-body" style={{ marginBottom: '2.5rem' }}>{office.description}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-faint)' }} className="dh-responsive-grid">
                      <div>
                        <div className="dh-label" style={{ fontSize: '0.55rem', marginBottom: '0.8rem' }}>Location</div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{office.contact.address}</p>
                      </div>
                      <div>
                        <div className="dh-label" style={{ fontSize: '0.55rem', marginBottom: '0.8rem' }}>Contact</div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{office.contact.email}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{office.contact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="dh-section">
        <div className="dh-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="dh-display" style={{ fontSize: '4rem', marginBottom: '2rem' }}>EXPAND YOUR <br/><span style={{ color: 'var(--accent-primary)' }}>HORIZONS.</span></h2>
            <p className="dh-body" style={{ maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.2rem' }}>
              Join the elite network of enterprises scaling across borders with our technical and strategic oversight.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }} className="dh-responsive-grid">
              <button className="dh-btn-fill">PARTNER WITH US</button>
              <button className="dh-btn-ghost">BOOK STRATEGY SESSION</button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default DHGlobalPresence;
