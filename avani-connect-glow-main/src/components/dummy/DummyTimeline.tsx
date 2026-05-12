import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Globe, Rocket, Award, Building2, Zap } from 'lucide-react';

const milestones = [
  { year: '2016', title: 'Founded in Rohtak', description: 'Avani Enterprises was born with a mission to democratize world-class digital solutions for Indian businesses.', icon: Rocket, color: '#3B82F6' },
  { year: '2018', title: 'First 50 Clients', description: 'Crossed our first major milestone — 50 happy clients across education, healthcare, and e-commerce verticals.', icon: Users, color: '#8B5CF6' },
  { year: '2020', title: 'Gurgaon Expansion', description: 'Opened our NCR office in Gurgaon to serve enterprise clients and Fortune 500 companies.', icon: Building2, color: '#F97316' },
  { year: '2022', title: 'Mumbai Office Launch', description: 'Expanded to Mumbai\'s Andheri East — establishing our presence in India\'s financial capital.', icon: MapPin, color: '#14B8A6' },
  { year: '2023', title: 'AI Division Launch', description: 'Launched dedicated AI solutions division — chatbots, automation, and intelligent business tools.', icon: Zap, color: '#C4913A' },
  { year: '2024', title: 'Global Reach — Australia', description: 'Crossed international borders with our APAC operations, serving clients across Australia and Southeast Asia.', icon: Globe, color: '#E8B96A' },
  { year: '2025', title: '150+ Clients', description: 'Surpassed 150 happy clients, 300+ projects delivered, and counting. The journey has just begun.', icon: Award, color: '#22C55E' },
];

const DummyTimeline = () => {
  return (
    <section className="theme-brown" style={{ padding: '60px 0', background: 'var(--bg-primary)', position: 'relative', borderTop: '1px solid var(--border-faint)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
            OUR JOURNEY
          </span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0, textTransform: 'uppercase' }}>
            THE AVANI <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>STORY</span>
          </h2>
        </motion.div>

        {/* Compact Grid Timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {milestones.map((ms, i) => {
            const Icon = ms.icon;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-faint)',
                  borderRadius: '12px',
                  padding: '24px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ms.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-faint)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Top Timeline Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: `${ms.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={16} color={ms.color} strokeWidth={1.5} />
                  </div>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '22px', fontWeight: 800, color: ms.color, lineHeight: 1,
                  }}>
                    {ms.year}
                  </span>
                </div>

                {/* Content */}
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)',
                  letterSpacing: '0.02em', marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>
                  {ms.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px', color: 'var(--text-secondary)',
                  lineHeight: 1.6, fontWeight: 400, margin: 0
                }}>
                  {ms.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DummyTimeline;
