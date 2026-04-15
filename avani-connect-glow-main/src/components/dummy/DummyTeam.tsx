import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: 'Kuhu Narang',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Harleen Kaur',
    role: 'Co-Founder & COO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Rahul Sharma',
    role: 'Head of Technology',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Priya Verma',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Aditya Kapoor',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    linkedin: '#',
  },
];

const DummyTeam = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(var(--accent-primary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-team-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>THE PEOPLE</span>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            MEET OUR <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>TEAM</span>
          </h2>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '16px auto 0', fontWeight: 400, lineHeight: 1.6 }}>
            The minds behind your digital transformation — passionate, experienced, and relentlessly creative.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="dummy-team-grid">
          {team.map((member, i) => {
            const isHov = hovered === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: `1px solid ${isHov ? 'var(--accent-primary)' : 'var(--border-faint)'}`,
                  background: 'var(--card-bg)',
                  transition: 'all 0.4s ease',
                  transform: isHov ? 'translateY(-6px)' : 'none',
                  boxShadow: isHov ? '0 16px 40px rgba(0,0,0,0.4), 0 0 30px rgba(196,145,58,0.08)' : 'none',
                  cursor: 'default',
                }}
              >
                {/* Photo */}
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={member.image} alt={member.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      transform: isHov ? 'scale(1.08)' : 'scale(1)',
                      filter: isHov ? 'brightness(1.1)' : 'brightness(0.9)',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, var(--glass-bg) 55%, transparent 100%)' }} />

                  {/* Social overlay on hover */}
                  <motion.div
                    animate={{ opacity: isHov ? 1 : 0, y: isHov ? 0 : 8 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}
                  >
                    <a href={member.linkedin} style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
                      border: '1px solid var(--border-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Linkedin size={12} color="var(--accent-primary)" />
                    </a>
                  </motion.div>
                </div>

                {/* Info */}
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)',
                    letterSpacing: '0.04em', marginBottom: '3px',
                  }}>
                    {member.name}
                  </div>
                  <div style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 500,
                    letterSpacing: '0.06em',
                  }}>
                    {member.role}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .dummy-team-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .dummy-team-grid { grid-template-columns: repeat(2, 1fr) !important; } .dummy-team-container { padding: 0 24px !important; } }
        @media (max-width: 480px) { .dummy-team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default DummyTeam;
