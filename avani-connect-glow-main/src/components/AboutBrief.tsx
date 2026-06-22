import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp } from 'lucide-react';

const AboutBrief = () => {
  return (
    <section className="theme-brown about-brief-section" style={{
      position: 'relative',
      padding: '100px 48px',
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-faint)',
      overflow: 'hidden'
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '80px',
        alignItems: 'center'
      }} className="about-brief-grid">
        
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            border: '1px solid var(--border-light)',
            borderRadius: '100px',
            background: 'var(--accent-hover)',
            backdropFilter: 'blur(10px)',
            marginBottom: '24px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--accent-light)', fontWeight: 600 }}>OUR MISSION</span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '28px',
            textTransform: 'uppercase'
          }}>
            PIONEERING DIGITAL GROWTH,<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--text-primary)' }}>MAXIMIZING</span>{' '}
            <span style={{ color: 'var(--accent-primary)' }}>ROI.</span>
          </h2>

          {/* User's Paragraph */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            fontWeight: 400,
            maxWidth: '680px'
          }}>
            Avani Enterprises is the No.1 Digital Marketing Agency in India, providing the best Digital Marketing, Web Development, App Development, and AI Solutions across India (Rohtak, Gurgaon, and Mumbai). We deliver result-driven SEO, PPC, social media, and branding solutions, and our data-focused strategies help businesses generate quality leads and maximize ROI.
          </p>

          {/* Sub features grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }} className="about-brief-features">
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }}>
                <Target size={18} />
              </div>
              <div>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Result-Driven Approach</h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>We align every pixel and campaign with your bottom-line business outcomes.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Data-Focused Strategies</h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>Decisions backed by analytics and testing for maximum conversion rate.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual Card Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ position: 'relative' }}
          className="about-brief-visual"
        >
          {/* A premium looking card */}
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(28px)',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 32px 64px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden'
          }}>
            {/* Absolute accent highlight */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)',
              zIndex: 0
            }} />
            
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Shield size={20} color="var(--accent-primary)" />
              Why Avani?
            </h3>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                { title: 'Full-Spectrum Solutions', desc: 'From branding and SEO to bespoke enterprise AI platforms.' },
                { title: 'Rohtak, Gurgaon & Mumbai Hubs', desc: 'Deep regional expertise with global delivery capabilities.' },
                { title: 'Lead & ROI-Obsessed Team', desc: 'We measure success in business revenue, not just metrics.' }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <div>
                    <h5 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{item.title}</h5>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative outline shapes behind the card */}
          <div style={{
            position: 'absolute',
            top: '-16px',
            left: '-16px',
            width: '100%',
            height: '100%',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            zIndex: 1,
            pointerEvents: 'none'
          }} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-brief-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 768px) {
          .about-brief-section {
            padding: 60px 24px !important;
          }
          .about-brief-features {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutBrief;
