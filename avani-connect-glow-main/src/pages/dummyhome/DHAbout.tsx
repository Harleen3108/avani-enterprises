import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Award, Users, ArrowRight, CheckCircle, Globe, Zap, Mail, Phone, MapPin, Sparkles, Lightbulb, Heart, TrendingUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import RotatingText from '../../components/RotatingText';
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

const DHAbout = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dh-about-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">OUR HERITAGE</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>CRAFTING</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">A TIMELESS</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">LEGACY.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              Since 2016, we have been at the forefront of digital transformation, blending traditional values with future-ready technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. EVOLUTION TIMELINE */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
            <div className="dh-label">OUR EVOLUTION</div>
            <h2 className="dh-display" style={{ fontSize: '4rem' }}>THE JOURNEY <span style={{ color: 'var(--accent-primary)' }}>SO FAR.</span></h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Center Line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'var(--border-light)', transform: 'translateX(-50%)' }} />
            
            {[
              { year: '2010', title: 'The Foundation', desc: 'Avani Enterprises was born with a vision to redefine digital excellence.' },
              { year: '2015', title: 'Scale & Growth', desc: 'Expanded into Mumbai and Gurgaon, serving 50+ enterprise clients.' },
              { year: '2018', title: 'Tech Innovation', desc: 'Launched our dedicated AI & Automation division for smart commerce.' },
              { year: '2022', title: 'Global Footprint', desc: 'Established Australian liaison and global delivery models.' },
              { year: '2025', title: 'The Future', desc: 'Pioneering immersive digital ecosystems and hyper-scale architectures.' }
            ].map((m, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp}
                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', width: '50%', marginLeft: i % 2 === 0 ? 0 : '50%', padding: '4rem', position: 'relative' }}
                className="dh-responsive-grid"
              >
                {/* Node */}
                <div style={{ position: 'absolute', left: i % 2 === 0 ? 'auto' : 0, right: i % 2 === 0 ? 0 : 'auto', top: '50%', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-primary)', transform: `translate(${i % 2 === 0 ? '50%' : '-50%'}, -50%)`, boxShadow: '0 0 20px var(--accent-primary)' }} />
                
                <div className="dh-card" style={{ padding: '3rem', maxWidth: '450px' }}>
                  <div style={{ fontSize: '3rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '1rem', opacity: 0.5 }}>{m.year}</div>
                  <h4 className="dh-heading" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{m.title}</h4>
                  <p className="dh-body" style={{ fontSize: '0.9rem' }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP SECTION (Kapil Khandelwal) */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'center' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: 'relative' }}>
              <div style={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-light)', aspectRatio: '4/5' }}>
                <img src="/kapil_khandelwal.jpg" alt="Kapil Khandelwal" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--accent-primary)', color: 'var(--bg-primary)', padding: '2rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '2rem', fontFamily: "'Syne'", fontWeight: 800 }}>10+</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years of Excellence</div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="dh-label">THE LEADERSHIP</div>
              <h2 className="dh-display" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>KAPIL <span style={{ color: 'var(--accent-primary)' }}>KHANDELWAL.</span></h2>
              <p className="dh-body" style={{ fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                Distinguished Business and Startup Consultant with over a decade of experience in transforming businesses and nurturing startups to success. As the CEO of Avani Enterprises, he leads a crew of professionals dedicated to delivering innovative digital solutions and strategic growth strategies.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }} className="dh-responsive-grid">
                {[
                  { title: 'Author', desc: 'Writer of "The Startup Summary Book" sharing insights for success.' },
                  { title: 'Investor', desc: 'Active strategic investments in promising tech startups.' },
                  { title: 'Consultant', desc: 'Expert guidance in scaling operations and market expansion.' },
                  { title: 'Visionary', desc: 'Leading Avani to become a global technical powerhouse.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                    <CheckCircle size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '4px' }} />
                    <div>
                      <h4 className="dh-heading" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                      <p className="dh-body" style={{ fontSize: '0.85rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {['Business Strategy', 'Startup Consulting', 'Investment', 'Author'].map(tag => (
                  <span key={tag} style={{ padding: '0.6rem 1.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-faint)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY BENTO (Enhanced Mission/Vision) */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="dh-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}><Shield size={48} /></div>
              <h2 className="dh-display" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>OUR CORE PHILOSOPHY</h2>
              <p className="dh-body" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                We believe in "Excellence by Design." Every line of code and every strategic pixel is crafted to ensure your business doesn't just grow, but thrives with a distinct identity.
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1, padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-faint)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Strategy</div>
                  <div className="dh-body" style={{ fontSize: '0.85rem' }}>Data-driven oversight for every engagement.</div>
                </div>
                <div style={{ flex: 1, padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-faint)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Results</div>
                  <div className="dh-body" style={{ fontSize: '0.85rem' }}>Measurable ROI and market performance.</div>
                </div>
              </div>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="dh-card">
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}><Target size={32} /></div>
                <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>THE MISSION</h3>
                <p className="dh-body">To empower businesses with cutting-edge digital solutions that drive growth, enhance brand presence, and deliver measurable ROI through technical craftsmanship.</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="dh-card">
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}><Globe size={32} /></div>
                <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>THE VISION</h3>
                <p className="dh-body">To be the leading digital transformation partner for businesses across India and globally, known for our innovative solutions and exceptional service architecture.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">FOUNDATION</div>
            <h2 className="dh-display" style={{ fontSize: '4rem' }}>CORE VALUES.</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }} className="dh-responsive-grid">
            {[
              { icon: <Target size={32} />, title: 'Results Driven', desc: 'We focus on measurable outcomes and strive to deliver the very best in every project we undertake.' },
              { icon: <Users size={32} />, title: 'Client-Centric', desc: 'Our client\'s success is our success. We prioritize their needs and personalize based on trust.' },
              { icon: <Lightbulb size={32} />, title: 'Innovation First', desc: 'We stay ahead of the curve by continuously exploring new ideas and future digital technologies.' },
              { icon: <Heart size={32} />, title: 'Passion', desc: 'We set high standards in everything we do, striving for quality and continuous improvement.' }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                className="dh-card"
                style={{ textAlign: 'center' }}
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>{value.icon}</div>
                <h3 className="dh-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{value.title}</h3>
                <p className="dh-body" style={{ fontSize: '0.9rem' }}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS SECTION (Stats) */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }} className="dh-responsive-grid">
            {[
              { val: 150, label: 'Happy Clients', sub: 'Global Reach' },
              { val: 300, label: 'Projects Done', sub: 'Enterprise Scale' },
              { val: 85, label: 'Growth Avg', sub: 'Measurable Impact', suffix: '%' },
              { val: 8, label: 'Years Exp', sub: 'Industry Legacy' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: '5rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>
                  <AnimatedCounter target={stat.val} suffix={stat.suffix || '+'} />
                </div>
                <div className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                <div className="dh-body" style={{ fontSize: '0.8rem' }}>{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US (The Avani Advantage) */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">ADVANTAGE</div>
            <h2 className="dh-display" style={{ fontSize: '4rem' }}>WHY AVANI?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }} className="dh-responsive-grid">
            {[
              { title: 'Proven Track Record', desc: 'With 8+ years of experience and 300+ successful projects, we have the strategic depth and technical expertise to handle any digital challenge.', icon: <Shield size={32} /> },
              { title: 'Innovation-Driven', desc: 'We stay ahead of industry trends and leverage cutting-edge technologies to deliver innovative solutions that give you a competitive edge.', icon: <Zap size={32} /> },
              { title: 'Client-Centric', desc: 'Your success is our priority. We build long-term partnerships based on trust, transparency, and delivering high-impact results.', icon: <Users size={32} /> }
            ].map((adv, i) => (
              <motion.div 
                key={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
                className="dh-card"
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}>{adv.icon}</div>
                <h3 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{adv.title}</h3>
                <p className="dh-body" style={{ fontSize: '1rem', lineHeight: 1.7 }}>{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. JOURNEY TIMELINE (Existing Chronicles) */}
      <section className="dh-section">
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">MILESTONES</div>
            <h2 className="dh-display" style={{ fontSize: '4rem' }}>THE CHRONICLES</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {[
              { year: '2016', title: 'THE GENESIS', desc: 'Avani Enterprises was born in Rohtak with a vision to bridge the digital divide in India.' },
              { year: '2019', title: 'NCR EXPANSION', desc: 'Established our strategic hub in Gurgaon to serve the growing enterprise sector.' },
              { year: '2022', title: 'GLOBAL OUTREACH', desc: 'Extended our footprint to Australia, marking our first step towards international dominance.' },
              { year: '2025', title: 'THE FUTURE', desc: 'Pioneering AI-driven connectivity and ultra-premium digital experiences globally.' }
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '4rem', alignItems: 'center' }} className="dh-responsive-grid">
                <div style={{ flex: '0 0 200px', fontSize: '5rem', fontFamily: "'Syne'", color: 'var(--border-light)', fontWeight: 800 }}>{item.year}</div>
                <div style={{ height: '2px', flex: 1, background: 'var(--border-faint)' }} />
                <div style={{ flex: 1 }}>
                  <h3 className="dh-heading" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>{item.title}</h3>
                  <p className="dh-body">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION (Rotating Text) */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div className="dh-card" style={{ padding: '8rem 4rem', textAlign: 'center', background: 'var(--bg-primary)' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="dh-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '2rem', lineHeight: 1.1 }}>
                LET'S BUILD YOUR <br/>
                <span style={{ color: 'var(--accent-primary)' }}>
                  <RotatingText 
                    words={["SUCCESS STORY", "DIGITAL FUTURE", "GROWTH ENGINE", "NEXT BIG MOVE"]} 
                    interval={3000}
                    className="dh-display"
                  />
                </span> <br/>
                TOGETHER.
              </h2>
              <p className="dh-body" style={{ maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.2rem' }}>
                Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision with expert guidance.
              </p>
              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }} className="dh-responsive-grid">
                <Link to="/dummyhome/get-consultation" className="dh-btn-fill">GET CONSULTATION <ArrowRight size={18} /></Link>
                <Link to="/dummyhome/contact" className="dh-btn-ghost">TALK TO EXPERT</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHAbout;
