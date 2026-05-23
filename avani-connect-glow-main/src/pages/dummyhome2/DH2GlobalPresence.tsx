import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, ArrowUpRight, Target, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummyhome2/DummyHome2.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const officeDetails = [
  {
    city: 'Rohtak',
    country: 'India',
    label: 'Corporate Headquarters',
    description: 'Our flagship innovation center where strategy meets execution. As our founding hub, Rohtak continues to drive our core values across the nation.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    tagline: 'The Heart of Innovation',
    contact: {
       address: '106, First Floor, Agro Mall, Rohtak',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
  {
    city: 'Gurgaon',
    country: 'India',
    label: 'Strategic NCR Hub',
    description: 'Located in the steel-and-glass heart of Cyber City, our Gurgaon office bridges the gap between digital vision and enterprise reality.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Enterprise Connectivity',
    contact: {
       address: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, 122002',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
  {
    city: 'Mumbai',
    country: 'India',
    label: 'Western India Operations',
    description: 'In the financial capital of India, we empower businesses with cutting-edge tech solutions that drive real commercial growth.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Scale & Growth Center',
    contact: {
       address: 'Third Floor, Vasudev Chamber, Andheri East, Mumbai, Maharashtra 400069',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
  {
    city: 'Australia',
    country: 'Australia',
    label: 'APAC Regional Office',
    description: 'Extending our reach across the Pacific, our Australian presence ensures global support and local expertise for our international partners.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Global Outreach',
    contact: {
       address: 'Australia Operations',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
];

const DH2GlobalPresence = () => {
  return (
    <div className="dh2-global-presence-page">
      <Helmet>
        <title>Global Presence | High-Tech Network | Avani Enterprises</title>
        <meta name="description" content="Discover Avani Enterprises' premium global network. From our Rohtak HQ to our Australia regional office, we serve clients with excellence." />
      </Helmet>

      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '60vh' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={14} className="dh2-hero-accent" /> WORLDWIDE
            </motion.div>
            
            <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
              <span className="dh2-hero-line">
                <motion.span custom={0} variants={titleV}>GLOBAL</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">DIGITAL</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={2} variants={titleV} className="dh2-hero-accent">NETWORK.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              Bridging continents through <strong style={{ color: 'var(--accent)' }}>premium engineering and strategic consulting</strong>. Our presence is digital, our impact is global.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS ROW */}
      <section className="dh2-section" style={{ paddingTop: 0 }}>
        <div className="dh2-container">
          <div className="dh2-stats-row">
            {[
              { num: '04', label: 'Major Hubs' },
              { num: '02', label: 'Continents' },
              { num: '150+', label: 'Global Clients' },
              { num: '∞', label: 'Digital Reach' }
            ].map((stat, i) => (
              <div key={i} className="dh2-stat">
                <div className="dh2-stat-num">{stat.num}</div>
                <div className="dh2-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="dh2-section">
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-s)', height: '60vh', background: 'var(--bg-surface)' }}>
              <img src="/global2.png" alt="Global Network" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, filter: 'grayscale(100%) brightness(0.5)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--bg-deep) 100%)' }} />
              
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="dh2-label" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.6rem 1.5rem', borderRadius: '100px', backdropFilter: 'blur(10px)' }}>
                  ACTIVE TRANSMISSION...
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. OFFICE COLLECTION */}
      <section className="dh2-section">
        <div className="dh2-container">
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <div className="dh2-label">COLLECTION</div>
              <h2 className="dh2-display" style={{ fontSize: '3.5rem' }}>OFFICE HUBS</h2>
           </motion.div>

           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }} className="dh2-responsive-grid">
              {officeDetails.map((office, index) => (
                 <motion.div key={office.city} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.1 }}>
                    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-s)', aspectRatio: '16/10', marginBottom: '2.5rem' }}>
                       <img src={office.image} alt={office.city} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} />
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 50%)' }} />
                       
                       <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                          <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase' }}>
                            {office.tagline}
                          </span>
                       </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                           <div style={{ width: '56px', height: '56px', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                              <MapPin size={24} />
                           </div>
                           <div>
                              <h3 className="dh2-heading" style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>{office.city}</h3>
                              <p className="dh2-label" style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>{office.label}</p>
                           </div>
                        </div>

                        <p className="dh2-body" style={{ marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.7 }}>
                           {office.description}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="dh2-responsive-grid">
                           <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-s)' }}>
                              <div className="dh2-label" style={{ marginBottom: '0.8rem', fontSize: '0.55rem' }}>Location</div>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{office.contact.address}</p>
                           </div>
                           <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-s)' }}>
                              <div className="dh2-label" style={{ marginBottom: '0.8rem', fontSize: '0.55rem' }}>Contact</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                 <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={12} /> {office.contact.email}</span>
                                 <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={12} /> {office.contact.phone}</span>
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
      <section className="dh2-cta">
         <div className="dh2-cta-watermark">GLOBAL</div>
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 className="dh2-display dh2-cta-title">
               START YOUR<br /><span>WORLDWIDE JOURNEY.</span>
            </h2>
            <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
               Join the elite network of enterprises scaling across borders with our technical and strategic oversight.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
               <Link to="/dummyhome2/contact" className="dh2-btn-fill">Partner With Us</Link>
               <Link to="/dummyhome2/contact" className="dh2-btn-ghost">Book Strategy Session</Link>
            </div>
         </motion.div>
      </section>

    </div>
  );
};

export default DH2GlobalPresence;
;
