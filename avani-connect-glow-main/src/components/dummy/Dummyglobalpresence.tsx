import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';

const offices = [
  { city: 'Gurgaon', country: 'India', x: '69%', y: '38%' },
  { city: 'Mumbai', country: 'India', x: '67%', y: '41%' },
  { city: 'Rohtak', country: 'India', x: '68%', y: '35%' },
  { city: 'Sydney', country: 'Australia', x: '83%', y: '72%' },
];

const DummyGlobalPresence = () => {
  return (
    <section style={{ padding: '72px 0', background: '#0A0705', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(196,145,58,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(196,145,58,0.6) 1px, transparent 1px)`, backgroundSize: '50px 50px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', border: '1px solid rgba(196,145,58,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '350px', height: '350px', border: '1px solid rgba(196,145,58,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', background: '#C4913A' }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: '#C4913A' }}>GLOBAL PRESENCE</span>
            <div style={{ width: '28px', height: '2px', background: '#C4913A' }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, color: '#F5EDD8', lineHeight: 0.92, letterSpacing: '0.02em' }}>
            SERVING CLIENTS<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px #C4913A' }}>WORLDWIDE</span>
          </h2>
        </motion.div>

        {/* World map visual */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '40%', marginBottom: '40px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png) center/contain no-repeat', opacity: 0.07, filter: 'invert(1) sepia(1) saturate(2) hue-rotate(10deg)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(196,145,58,0.04) 0%, transparent 70%)' }} />

          {offices.map((office, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5, type: 'spring' }}
              style={{ position: 'absolute', left: office.x, top: office.y, transform: 'translate(-50%,-50%)', zIndex: 10 }}>
              <motion.div animate={{ scale: [1, 2.2], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', border: '1px solid #C4913A' }} />
              <motion.div animate={{ scale: [1, 1.6], opacity: [0.3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 + 0.5 }}
                style={{ position: 'absolute', inset: '-3px', borderRadius: '50%', border: '1px solid #C4913A' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#C4913A', border: '2px solid #F5EDD8', boxShadow: '0 0 14px rgba(196,145,58,0.6)' }} />
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', background: 'rgba(10,7,5,0.9)', border: '1px solid rgba(196,145,58,0.25)', borderRadius: '6px', padding: '4px 10px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: '#F5EDD8', letterSpacing: '0.1em' }}>{office.city}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '9px', color: 'rgba(196,145,58,0.65)', letterSpacing: '0.06em' }}>{office.country}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', border: '1px solid rgba(196,145,58,0.15)', borderRadius: '12px', overflow: 'hidden' }} className="dummy-global-stats">
          {[
            { icon: <Globe size={18} color="#C4913A" />, val: '4', label: 'Global Offices', sub: 'India & Australia' },
            { icon: <MapPin size={18} color="#C4913A" />, val: '15+', label: 'Cities Served', sub: 'Across 2 Countries' },
            { icon: <Globe size={18} color="#C4913A" />, val: '150+', label: 'Global Clients', sub: 'And Growing' },
            { icon: <Globe size={18} color="#C4913A" />, val: '8+', label: 'Years Global', sub: 'Since 2016' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ padding: '24px 20px', background: 'rgba(245,237,216,0.02)', borderRight: i < 3 ? '1px solid rgba(196,145,58,0.1)' : 'none', textAlign: 'center' }}>
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
              <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '34px', color: '#C4913A', lineHeight: 1 }}>{stat.val}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', color: '#F5EDD8', letterSpacing: '0.1em', marginTop: '6px' }}>{stat.label}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'rgba(245,237,216,0.35)', marginTop: '3px' }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .dummy-global-stats { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
};

export default DummyGlobalPresence;