import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Globe } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const offices = [
  { city: 'Gurgaon', country: 'India', address: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, Haryana 122002', flag: '🇮🇳' },
  { city: 'Mumbai', country: 'India', address: 'Third Floor, Vasudev Chamber, Andheri East, Mumbai, Maharashtra 400069', flag: '🇮🇳' },
  { city: 'Rohtak', country: 'India', address: '106, First Floor, Agro Mall, Rohtak', flag: '🇮🇳' },
  { city: 'Australia', country: 'Australia', address: 'Expanding operations in Australia', flag: '🇦🇺' },
];

const DH2GlobalPresence = () => (
  <div className="dh2-page">
    <section className="dh2-section" style={{ paddingTop: '6rem' }}>
      <div className="dh2-container" style={{ textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="dh2-label">WORLDWIDE</div>
          <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>GLOBAL <span style={{ color: 'var(--accent)' }}>PRESENCE</span></h1>
          <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>Expanding globally while delivering locally — offices across India and Australia.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '3rem', maxWidth: 500, margin: '3rem auto 0' }}>
          {[{ v: '4', l: 'Offices' }, { v: '2', l: 'Countries' }, { v: '150+', l: 'Clients' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.5rem', color: 'var(--accent)' }}>{s.v}</div>
              <div style={{ fontSize: '.55rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="dh2-section" style={{ paddingTop: '2rem' }}>
      <div className="dh2-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 800, margin: '0 auto' }}>
          {offices.map((o, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .1 }}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 14, padding: '2rem', transition: 'border-color .3s' }}
              onMouseEnter={(e: any) => e.currentTarget.style.borderColor = 'rgba(200,255,0,.15)'}
              onMouseLeave={(e: any) => e.currentTarget.style.borderColor = 'var(--border-s)'}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.8rem' }}>{o.flag}</div>
              <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1rem', marginBottom: '.2rem' }}>{o.city}</h3>
              <div style={{ fontSize: '.6rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.6rem' }}>{o.country}</div>
              <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{o.address}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Map */}
    <section style={{ height: 400, margin: '0 2rem 4rem', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-s)' }}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3508.1803296113567!2d77.0552583!3d28.4439799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19493189b131%3A0x36a763d6ab00e2cb!2sAKASA%20Coworking%20Unitech%20Cyber%20Park!5e0!3m2!1sen!2sin!4v1768455888190!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: 'invert(.9) hue-rotate(180deg) grayscale(.3)' }} allowFullScreen loading="lazy" />
    </section>
  </div>
);

export default DH2GlobalPresence;
