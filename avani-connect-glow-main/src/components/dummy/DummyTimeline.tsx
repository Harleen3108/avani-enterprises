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
  { year: '2025', title: '150+ Clients & Growing', description: 'Surpassed 150 happy clients, 300+ projects delivered, and counting. The journey has just begun.', icon: Award, color: '#22C55E' },
];

const DummyTimeline = () => {
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>OUR JOURNEY</span>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            THE AVANI <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>STORY</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(to bottom, transparent, var(--border-light) 10%, var(--border-light) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} className="dummy-timeline-line" />

          {milestones.map((ms, i) => {
            const Icon = ms.icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-end' : 'flex-start',
                  paddingBottom: i < milestones.length - 1 ? '48px' : 0,
                  position: 'relative',
                }}
                className="dummy-timeline-item"
              >
                {/* Center dot */}
                <div style={{
                  position: 'absolute', left: '50%', top: '20px',
                  transform: 'translateX(-50%)', zIndex: 10,
                }} className="dummy-timeline-dot">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
                    style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: ms.color, border: '3px solid var(--bg-tertiary)',
                      boxShadow: `0 0 16px ${ms.color}66`,
                    }}
                  />
                </div>

                {/* Card */}
                <div style={{
                  width: 'calc(50% - 40px)',
                  padding: '20px 24px',
                  borderRadius: '14px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-faint)',
                  transition: 'all 0.3s',
                }} className="dummy-timeline-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: `${ms.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={16} color={ms.color} strokeWidth={1.5} />
                    </div>
                    <span style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: '28px', fontWeight: 700, color: ms.color, lineHeight: 1,
                    }}>
                      {ms.year}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)',
                    letterSpacing: '0.04em', marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}>
                    {ms.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '13px', color: 'var(--text-secondary)',
                    lineHeight: 1.6, fontWeight: 400,
                  }}>
                    {ms.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dummy-timeline-line { left: 20px !important; }
          .dummy-timeline-dot { left: 20px !important; }
          .dummy-timeline-item { justify-content: flex-start !important; padding-left: 48px !important; }
          .dummy-timeline-card { width: 100% !important; }
        }
      `}</style>
    </section>
  );
};

export default DummyTimeline;
