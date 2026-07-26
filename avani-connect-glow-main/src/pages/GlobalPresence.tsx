import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, ArrowUpRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

// Themed background utilities
const ThemedGrain = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const ThemedGridBg = ({ size = 60, opacity = 0.05 }: any) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />
);
const ThemedGlowBlob = ({ top, left, right, bottom, w = 300, opacity = 0.05, blur = 100, color = 'var(--accent-primary)' }: any) => (
  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [opacity, opacity * 1.5, opacity] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: w, height: w, borderRadius: '50%', background: color, filter: `blur(${blur}px)`, top, left, right, bottom, pointerEvents: 'none', zIndex: 1 }} />
);
const ThemedLuxuryLine = () => (
  <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 20%, var(--accent-light) 50%, var(--border-light) 80%, transparent)', opacity: 0.5 }} />
);

const officeDetails = [
  {
    city: 'Rohtak', country: 'India', label: 'Corporate Headquarters',
    description: 'Our flagship innovation center where strategy meets execution. As our founding hub, Rohtak continues to drive our core values across the nation.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    tagline: 'The Heart of Innovation', color: '#ff6b6b',
    contact: { address: '106, First Floor, Agro Mall, Rohtak', email: 'kp@avanienterprises.in', phone: '+91 92536 25099' }
  },
  {
    city: 'Gurgaon', country: 'India', label: 'Strategic NCR Hub',
    description: 'Located in the steel-and-glass heart of Cyber City, our Gurgaon office bridges the gap between digital vision and enterprise reality.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Enterprise Connectivity', color: '#feca57',
    contact: { address: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, 122002', email: 'kp@avanienterprises.in', phone: '+91 92536 25099' }
  },
  {
    city: 'Mumbai', country: 'India', label: 'Western India Operations',
    description: 'In the financial capital of India, we empower businesses with cutting-edge tech solutions that drive real commercial growth.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Scale & Growth Center', color: '#48dbfb',
    contact: { address: 'Third Floor, Vasudev Chamber, Teli Galli Cross Rd, Natwar Nagar, Andheri East, Mumbai, Maharashtra 400069', email: 'kp@avanienterprises.in', phone: '+91 92536 25099' }
  },
  {
    city: 'Australia', country: 'Australia', label: 'APAC Regional Office',
    description: 'Extending our reach across the Pacific, our Australian presence ensures global support and local expertise for our international partners.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Global Outreach', color: '#1dd1a1',
    contact: { address: 'Australia', email: 'kp@avanienterprises.in', phone: '+91 92536 25099' }
  },
];

const tickerItems = [
  "GLOBAL NETWORK", "•", "INNOVATIVE SOLUTIONS", "•", "ENTERPRISE CONNECTIVITY", "•", "STRATEGIC GROWTH", "•",
  "GLOBAL NETWORK", "•", "INNOVATIVE SOLUTIONS", "•", "ENTERPRISE CONNECTIVITY", "•", "STRATEGIC GROWTH", "•"
];

const GlobalPresence = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="dh-global-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* 1. HERO WITH MOVING TICKER */}
      <section className="theme-brown" style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'radial-gradient(circle at 50% 0%, var(--bg-secondary) 0%, var(--bg-primary) 70%)', overflow: 'hidden', position: 'relative', paddingTop: '100px', paddingBottom: '60px' }}>
        <ThemedGrain />
        <ThemedGridBg size={50} opacity={0.03} />
        <ThemedGlowBlob top="-5%" left="20%" w={600} opacity={0.05} blur={150} color="var(--accent-hover)" />
        <ThemedGlowBlob top="-5%" right="10%" w={500} opacity={0.05} blur={120} color="var(--accent-primary)" />
        
        {/* Top Moving Marquee */}
        <div style={{ overflow: 'hidden', width: '100%', marginBottom: '40px', position: 'relative', zIndex: 10 }}>
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            style={{ display: 'flex', gap: '40px', width: 'max-content', alignItems: 'center' }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 700, color: item === '•' ? 'var(--accent-primary)' : 'var(--text-secondary)', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 24px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '100px', marginBottom: '2rem', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <Globe size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.3em' }}>WORLDWIDE OPERATIONS</span>
            </motion.div>
            
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem', overflow: 'hidden', color: 'var(--text-primary)' }}>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span custom={0} variants={titleV} style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px var(--text-primary)' }}>GLOBAL</motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span custom={1} variants={titleV} style={{ display: 'block', color: 'var(--accent-primary)' }}>CONNECTIVITY.</motion.span>
              </span>
            </h1>
            
            <motion.p variants={fadeUp} style={{ fontFamily: "'Inter', sans-serif", maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Delivering premium, high-tech networking solutions from our headquarters in Rohtak to our international hubs. We bridge continents with digital excellence and innovative enterprise strategies.
            </motion.p>
            
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 7vw, 4rem)', flexWrap: 'wrap' }}>
              {[{ val: '04', label: 'Major Hubs' }, { val: '02', label: 'Continents' }, { val: '∞', label: 'Digital Reach' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontFamily: "'Clash Display', 'Bebas Neue', 'Outfit', sans-serif", fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '0.05em' }}>{s.val}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.2em', marginTop: '8px' }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Moving Marquee */}
        <div style={{ overflow: 'hidden', width: '100%', marginTop: '60px', position: 'relative', zIndex: 10 }}>
          <motion.div animate={{ x: ['-50%', '0%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            style={{ display: 'flex', gap: '40px', width: 'max-content', alignItems: 'center' }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 700, color: item === '•' ? 'var(--accent-primary)' : 'var(--text-secondary)', letterSpacing: '0.2em', whiteSpace: 'nowrap', opacity: 0.7 }}>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <ThemedLuxuryLine />

      {/* 3. OFFICE COLLECTION */}
      <section className="theme-beige" style={{ position: 'relative', padding: 'clamp(56px, 11vw, 100px) 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <ThemedGrain />
        <ThemedGlowBlob top="20%" right="-5%" w={400} opacity={0.03} blur={150} color="var(--accent-hover)" />
        <ThemedGlowBlob bottom="10%" left="-10%" w={500} opacity={0.03} blur={150} color="var(--accent-primary)" />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 3vw, 2rem)', marginBottom: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.4rem, 6vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.02em', margin: 0 }}>OFFICE COLLECTION</h2>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.2em', marginTop: '8px' }}>DETAILED NETWORK OVERVIEW</div>
            </div>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: 'clamp(1.75rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }} className="dh-responsive-grid">
            {officeDetails.map((office, i) => (
              <motion.div key={office.city} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', background: 'var(--card-bg)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                
                {/* FIXED IMAGE SIZING */}
                <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden', borderBottom: '1px solid var(--border-light)', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <img src={office.image} alt={office.city} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.5s ease', opacity: 0.95 }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '0.95'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)', pointerEvents: 'none' }} />
                  
                  <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-bg)', backdropFilter: 'blur(12px)', padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: `0 0 10px var(--accent-primary)` }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.15em' }}>{office.tagline.toUpperCase()}</span>
                  </div>
                  
                  <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <Link to="/contact" style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--card-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--card-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'; }}>
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>
                </div>

                {/* CONTENT PADDING AND MARGINS */}
                <div style={{ padding: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', flexShrink: 0 }}>
                      <MapPin size={24} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '8px' }}>{office.city.toUpperCase()}</h3>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>{office.label.toUpperCase()}</div>
                    </div>
                  </div>
                  
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>{office.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.5 }} /> LOCATION
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.5, display: 'block' }}>{office.contact.address}</span>
                    </div>
                    
                    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.15em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.5 }} /> CONTACT DETAILS
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Mail size={14} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-primary)' }}>{office.contact.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Phone size={14} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-primary)' }}>{office.contact.phone}</span>
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

      <ThemedLuxuryLine />

      {/* 4. CTA */}
      <section className="theme-brown" style={{ position: 'relative', padding: 'clamp(56px, 11vw, 100px) 0', background: 'radial-gradient(circle at 50% 100%, var(--bg-secondary) 0%, var(--bg-primary) 70%)', overflow: 'hidden' }}>
        <ThemedGrain />
        <ThemedGlowBlob top="30%" left="40%" w={400} opacity={0.03} blur={150} color="var(--accent-primary)" />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ padding: 'clamp(2rem, 7vw, 60px) clamp(1.25rem, 5vw, 40px)', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '24px', backdropFilter: 'blur(10px)', maxWidth: '900px', margin: '0 auto', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              START YOUR <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--accent-primary)', backgroundImage: 'linear-gradient(90deg, var(--text-primary), var(--accent-primary))', WebkitBackgroundClip: 'text' }}>JOURNEY</span> <br />ACROSS OUR NETWORK
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Join forward-thinking enterprises that leverage our global expertise and innovative connectivity solutions to scale new heights.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'var(--accent-primary)', color: '#fff', borderRadius: '100px', textDecoration: 'none', fontFamily: "'Outfit', sans-serif", fontSize: '13px', letterSpacing: '0.15em', fontWeight: 700, transition: 'all 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 20px var(--accent-hover)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                PARTNER WITH US <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .dh-responsive-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default GlobalPresence;
