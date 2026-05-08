import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, ExternalLink, Filter, TrendingUp, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../../components/AnimatedCounter';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const projects = [
  { name: 'Policicue', category: 'FinTech Platform', image: '/policy1.png', link: '/projects/policicue', impact: '250% Growth' },
  { name: 'Indus Public School', category: 'EduTech Hub', image: '/indus1.png', link: '/projects/indus', impact: '10k+ Students' },
  { name: 'FRD Nutrition', category: 'E-commerce', image: '/frd-nutrition-new.png', link: '/projects/frd-nutrition', impact: '180% Sales Up' },
  { name: 'Hi-Tech Homes', category: 'Luxury Real Estate', image: '/hitech1.png', link: '/projects/hitech-homes', impact: '3x Leads' },
  { name: 'Sanjeevni Hospital', category: 'Health Management', image: '/sanjeevni1.png', link: '/projects/sanjeevni-hospital', impact: '70% Automation' },
  { name: 'Rohtak Shoe Co.', category: 'Direct-to-Consumer', image: '/shoes1.png', link: '/projects/rohtak-shoe', impact: '2.5Cr Revenue' },
];

const testimonials = [
  { name: "Dr. Rajesh Kumar", position: "Principal, Indus Public School", content: "Avani Enterprises delivered an outstanding website that perfectly captures our school's vision and values. The design is modern and intuitive.", image: "/indus.jpeg" },
  { name: "Vikram Sharma", position: "MD, Rohtak Shoe Company", content: "The e-commerce platform developed by Avani Enterprises transformed our business. Online sales increased by 250% in just 3 months.", image: "/shoes.jpeg" },
  { name: "Ankit Verma", position: "Co-Founder, Policicue", content: "Working with Avani was a game-changer. They built a sophisticated platform that handles complex policy management with ease.", image: "/policucue.jpeg" }
];

const DHProjects = () => {
  const [currTest, setCurrTest] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dh-projects-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">PORTFOLIO</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>IMPACTFUL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">JOURNEYS.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We've partnered with industry leaders to build solutions that define <strong style={{ color: 'var(--accent-primary)' }}>commercial excellence.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER BAR */}
      <section style={{ padding: '2rem 0', background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-faint)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '3rem' }}>
              {['ALL PROJECTS', 'FINTECH', 'EDUTECH', 'ECOMMERCE', 'HEALTHCARE'].map((cat, i) => (
                <button key={i} style={{ background: 'none', border: 'none', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-tertiary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', cursor: 'pointer', transition: 'color 0.3s' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.75rem', fontWeight: 700 }}>
              <Filter size={14} /> FILTER RESULTS
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT GRID */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }} className="dh-responsive-grid">
            {projects.map((project, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative' }}
              >
                <Link to={project.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="dh-card" style={{ padding: 0, overflow: 'hidden', aspectRatio: '16/10', position: 'relative' }}>
                    <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s var(--ease-out)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%)', display: 'flex', alignItems: 'flex-end', padding: '3rem' }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span className="dh-label" style={{ color: 'var(--accent-primary)', marginBottom: 0 }}>{project.category}</span>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>{project.impact.toUpperCase()}</span>
                          </div>
                          <h3 className="dh-display" style={{ fontSize: '2.5rem', color: '#fff' }}>{project.name}</h3>
                        </div>
                        <div className="dh-circle-btn" style={{ background: 'var(--accent-primary)', color: '#000' }}>
                          <ArrowUpRight size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUCCESS METRICS (IMPACT) */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">OUR IMPACT</div>
            <h2 className="dh-display" style={{ fontSize: '4rem' }}>SUCCESS IN <span style={{ color: 'var(--accent-primary)' }}>NUMBERS.</span></h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }} className="dh-responsive-grid">
            {[
              { val: 150, label: 'Happy Clients', sub: 'Global Reach' },
              { val: 300, label: 'Projects Done', sub: 'Enterprise Scale' },
              { val: 85, label: 'Growth Avg', sub: 'Measurable Impact', suffix: '%' },
              { val: 50, label: 'Revenue Generated', sub: 'Across Portfolio', suffix: 'Cr+' }
            ].map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                  {stat.prefix}<AnimatedCounter target={stat.val} suffix={stat.suffix || '+'} />
                </div>
                <div className="dh-heading" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{stat.label}</div>
                <div className="dh-body" style={{ fontSize: '0.8rem' }}>{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CINEMATIC TESTIMONIALS */}
      <section className="dh-section">
        <div className="dh-container">
          <div className="dh-card" style={{ padding: '6rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', opacity: 0.05, color: 'var(--accent-primary)' }}><Quote size={200} /></div>
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="var(--accent-primary)" color="var(--accent-primary)" />)}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currTest}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="dh-display" style={{ fontSize: '2.5rem', lineHeight: 1.3, marginBottom: '3rem', maxWidth: '900px', margin: '0 auto 3rem' }}>
                    "{testimonials[currTest].content}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)' }}>
                      <img src={testimonials[currTest].image} alt={testimonials[currTest].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div className="dh-heading" style={{ fontSize: '1.2rem' }}>{testimonials[currTest].name}</div>
                      <div className="dh-label" style={{ marginBottom: 0, color: 'var(--text-tertiary)' }}>{testimonials[currTest].position}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '4rem' }}>
                <button onClick={() => setCurrTest((currTest - 1 + testimonials.length) % testimonials.length)} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={20} /></button>
                <button onClick={() => setCurrTest((currTest + 1) % testimonials.length)} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SHOWCASE VIDEO CALLOUT */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', margin: '0 auto 3rem', cursor: 'pointer' }}>
                <Play size={40} fill="var(--accent-primary)" />
              </div>
              <h2 className="dh-display" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>WATCH REEL 2025</h2>
              <p className="dh-body" style={{ fontSize: '1.2rem', marginBottom: '4rem' }}>
                See how we transform complex business challenges into seamless digital success stories.
              </p>
              <button className="dh-btn-ghost"><ExternalLink size={18} /> FULL REEL ON YOUTUBE</button>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHProjects;
