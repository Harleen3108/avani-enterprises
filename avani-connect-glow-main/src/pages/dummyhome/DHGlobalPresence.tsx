import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, ArrowUpRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummy/DummyHome.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const GridBg = ({ size = 40, opacity = 0.06 }: any) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />
);
const GlowBlob = ({ top, left, right, bottom, w = 300, opacity = 0.05, blur = 100 }: any) => (
  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.4, opacity] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: w, height: w, borderRadius: '50%', background: 'var(--accent-primary)', filter: `blur(${blur}px)`, top, left, right, bottom, pointerEvents: 'none', zIndex: 1 }} />
);
const LuxuryLine = () => (
  <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 20%, var(--accent-light) 50%, var(--accent-primary) 80%, transparent)', opacity: 0.3 }} />
);

const officeDetails = [
  {
    city: 'Rohtak', country: 'India', label: 'Corporate Headquarters',
    description: 'Our flagship innovation center where strategy meets execution. As our founding hub, Rohtak continues to drive our core values across the nation.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    tagline: 'The Heart of Innovation',
    contact: { address: '106, First Floor, Agro Mall, Rohtak', email: 'kp@avanienterprises.in', phone: '+91 9253625099' }
  },
  {
    city: 'Gurgaon', country: 'India', label: 'Strategic NCR Hub',
    description: 'Located in the steel-and-glass heart of Cyber City, our Gurgaon office bridges the gap between digital vision and enterprise reality.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Enterprise Connectivity',
    contact: { address: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, 122002', email: 'kp@avanienterprises.in', phone: '+91 9253625099' }
  },
  {
    city: 'Mumbai', country: 'India', label: 'Western India Operations',
    description: 'In the financial capital of India, we empower businesses with cutting-edge tech solutions that drive real commercial growth.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Scale & Growth Center',
    contact: { address: 'Third Floor, Vasudev Chamber, Teli Galli Cross Rd, Natwar Nagar, Andheri East, Mumbai, Maharashtra 400069', email: 'kp@avanienterprises.in', phone: '+91 9253625099' }
  },
  {
    city: 'Australia', country: 'Australia', label: 'APAC Regional Office',
    description: 'Extending our reach across the Pacific, our Australian presence ensures global support and local expertise for our international partners.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Global Outreach',
    contact: { address: 'Australia', email: 'kp@avanienterprises.in', phone: '+91 9253625099' }
  },
];

const DHGlobalPresence = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="dh-global-page">

      {/* 1. HERO */}
      <section className="theme-brown" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" left="20%" w={400} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '100px', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
              <Globe size={14} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.2em' }}>WORLDWIDE OPERATIONS</span>
            </motion.div>
            <h1 className="dh-display" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', marginBottom: '1.5rem' }}>
              <span className="dh-hero-line"><motion.span custom={0} variants={titleV} className="dh-hero-stroked">GLOBAL</motion.span></span>
              <span className="dh-hero-line"><motion.span custom={1} variants={titleV} className="dh-hero-accent">CONNECTIVITY.</motion.span></span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1rem' }}>
              Delivering premium, high-tech networking solutions from our headquarters in Rohtak to our international hubs. We bridge continents with digital excellence and innovative enterprise strategies.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              {[{ val: '04', label: 'Major Hubs' }, { val: '02', label: 'Continents' }, { val: '∞', label: 'Digital Reach' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.15em', marginTop: '4px' }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 3. OFFICE COLLECTION */}
      <section className="theme-brown" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="20%" right="-5%" w={300} opacity={0.04} blur={100} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-faint)' }} />
            <div style={{ textAlign: 'center' }}>
              <h2 className="dh-display" style={{ fontSize: '2.5rem' }}>OFFICE COLLECTION</h2>
              <div className="dh-label" style={{ marginBottom: 0 }}>DETAILED NETWORK OVERVIEW</div>
            </div>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-faint)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }} className="dh-responsive-grid">
            {officeDetails.map((office, i) => (
              <motion.div key={office.city} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '16/10', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--border-faint)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  style2-transition="all 0.4s ease"
                >
                  <img src={office.image} alt={office.city} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--card-bg)', backdropFilter: 'blur(12px)', padding: '6px 14px', borderRadius: '100px', border: '1px solid var(--border-faint)' }}>
                    <Target size={12} style={{ color: 'var(--accent-primary)' }} />
                    <span style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.12em' }}>{office.tagline.toUpperCase()}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                    <Link to="/dummyhome/contact" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', textDecoration: 'none', transition: 'all 0.3s' }}>
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={18} style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <h3 className="dh-display" style={{ fontSize: '1.8rem', lineHeight: 1 }}>{office.city.toUpperCase()}</h3>
                      <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>{office.label.toUpperCase()}</div>
                    </div>
                  </div>
                  <p className="dh-body" style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{office.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="dh-responsive-grid">
                    <div style={{ padding: '12px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-faint)' }}>
                      <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)' }} /> LOCATION
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, display: 'block' }}>{office.contact.address}</span>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-faint)' }}>
                      <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)' }} /> CONTACT DETAILS
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail size={10} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{office.contact.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Phone size={10} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{office.contact.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 4. CTA */}
      <section className="theme-beige" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="30%" left="40%" w={350} opacity={0.03} blur={120} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="dh-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              START YOUR <span style={{ color: 'var(--accent-primary)' }}>JOURNEY</span> <br />ACROSS OUR NETWORK
            </h2>
            <p className="dh-body" style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1rem' }}>
              Join forward-thinking enterprises that leverage our global expertise and innovative connectivity solutions to scale new heights.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/dummyhome/contact" className="dh-btn-fill" style={{ textDecoration: 'none' }}>PARTNER WITH US</Link>
              <Link to="/dummyhome/get-consultation" className="dh-btn-ghost" style={{ textDecoration: 'none' }}>BOOK DEEP-DIVE</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default DHGlobalPresence;
