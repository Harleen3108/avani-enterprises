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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
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
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '440px',
                height: 'auto',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.08)';
                const img = e.currentTarget.querySelector('.svc-card-img') as HTMLImageElement;
                if (img) img.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                const img = e.currentTarget.querySelector('.svc-card-img') as HTMLImageElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Card Image Cover */}
              {svc.image && (
                <div style={{ 
                  width: '100%', 
                  height: '190px', 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  marginBottom: '20px',
                  background: '#f5f5f3',
                  position: 'relative'
                }}>
                  <img 
                    src={svc.image} 
                    alt={svc.title} 
                    className="svc-card-img"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }} 
                  />
                  {/* Subtle gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2))',
                    pointerEvents: 'none'
                  }} />
                  {/* Floating Index Tag */}
                  <span style={{ 
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontFamily: "'Inter', sans-serif", 
                    fontSize: '10px', 
                    color: '#fff', 
                    background: 'var(--accent-primary)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    letterSpacing: '0.05em'
                  }}>
                    {svc.index || svc.idx}
                  </span>
                </div>
              )}

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: 'var(--text-primary)', 
                  marginBottom: '10px',
                  lineHeight: 1.3
                }}>
                  {svc.title}
                </h3>
                
                <p style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '13.5px', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.5, 
                  fontWeight: 400,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {svc.description}
                </p>

                {svc.subLinks && svc.subLinks.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                    {svc.subLinks.map((sub: any, subIdx: number) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        style={{
                          fontSize: '11px',
                          padding: '4px 10px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-light)',
                          borderRadius: '6px',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--accent-hover)';
                          e.currentTarget.style.borderColor = 'var(--accent-primary)';
                          e.currentTarget.style.color = 'var(--accent-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--bg-secondary)';
                          e.currentTarget.style.borderColor = 'var(--border-light)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to={svc.customPath || `/dummyhome/services/${svc.slug}`} 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginTop: '16px',
                  alignSelf: 'flex-start'
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
