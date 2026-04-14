import React from 'react';
import { motion } from 'framer-motion';

const DummyAnnouncement = () => (
  <section style={{ padding: '44px 0', background: '#0A0705', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%,-50%)', width: '400px', height: '150px', background: 'radial-gradient(ellipse, rgba(196,145,58,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
      <div style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(196,145,58,0.15)' }}>
        {/* Label */}
        <div style={{ background: 'linear-gradient(135deg, #C4913A, #E8B96A)', padding: '18px 28px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '160px' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(10,7,5,0.65)', marginBottom: '4px' }}>LIVE UPDATE</span>
          <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '17px', color: '#0A0705', lineHeight: 1.1, letterSpacing: '0.08em' }}>IMPORTANT<br />ANNOUNCEMENT</h3>
        </div>
        {/* Ticker */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to right, #0A0705, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to left, #0A0705, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            style={{ display: 'flex', alignItems: 'center', gap: '48px', padding: '18px 0', width: 'max-content' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,145,58,0.12)', borderRadius: '8px' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', overflow: 'hidden', background: '#fff', padding: '2px' }}>
                    <img src="/logo0.jpg" alt="Avani" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{ color: 'rgba(245,237,216,0.2)', fontSize: '14px', fontWeight: 300 }}>×</span>
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', overflow: 'hidden', background: '#fff', padding: '2px' }}>
                    <img src="/hilogo.png" alt="IHE" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(245,237,216,0.38)', marginBottom: '1px' }}>Proud technology partners of</div>
                  <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '15px', color: '#C4913A', letterSpacing: '0.06em' }}>Institute of Home Economics, DU</div>
                </div>
                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(196,145,58,0.4)' }} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default DummyAnnouncement;