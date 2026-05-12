import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const DummyServices = ({ services }: any) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleExpand = (idx: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation just for the accordion toggle if we want, but since they are links, maybe we just expand on hover or keep it as a link?
    // Actually, let's make the whole row an accordion, and provide an "Explore" link inside.
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section className="theme-beige" style={{ 
      position: 'relative', 
      padding: '100px 0',
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-faint)',
      overflow: 'hidden'
    }}>
      {/* Abstract Background Grid */}
      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        opacity: 0.15, 
        backgroundImage: 'linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)', 
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />
      
      {/* Glowing abstract circle */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'var(--accent-primary)',
        opacity: 0.05,
        filter: 'blur(80px)',
        top: '10%',
        right: '-50px',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
            OUR EXPERTISE
          </span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0 }}>
            What We Create
          </h2>
        </motion.div>

        {/* Premium Book Grid Style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
          {services.map((svc: any, i: number) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ 
                background: 'var(--card-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '340px',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
              }}
            >
              <div>
                <span style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '12px', 
                  color: 'var(--accent-primary)', 
                  letterSpacing: '0.1em', 
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  {svc.index}
                </span>
                
                <h3 style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: '22px', 
                  fontWeight: 700, 
                  color: 'var(--text-primary)', 
                  marginBottom: '12px',
                  lineHeight: 1.2
                }}>
                  {svc.title}
                </h3>
                
                <p style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '14px', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.6, 
                  fontWeight: 400
                }}>
                  {svc.description}
                </p>
              </div>

              <Link 
                to={`/services/${svc.slug}`} 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginTop: 'auto'
                }}
              >
                Explore details <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DummyServices;
