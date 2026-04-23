import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus, ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../components/dummyhome2/DummyHome2.css';

gsap.registerPlugin(ScrollTrigger);

// Data migrated from dummyhome1
const services = [
  { step: "01", title: "Web Engineering", desc: "We architect full-stack platforms that handle millions of requests. From fintech dashboards to e-commerce ecosystems, our engineering teams build for scale, performance, and conversion.", features: ["Custom MERN Stack Apps", "E-commerce Platforms", "SaaS Products", "API Architecture"] },
  { step: "02", title: "Performance Marketing", desc: "Every rupee spent is tracked, optimized, and scaled. Our performance teams run data-driven campaigns that consistently deliver 4x-10x ROAS across verticals.", features: ["Meta & Google Ads", "Retargeting Funnels", "Landing Page CRO", "Attribution Modeling"] },
  { step: "03", title: "SEO & Content", desc: "Sustainable, compounding organic traffic from technical SEO, content strategy, and authority building that works 24/7 — no ad spend required.", features: ["Technical SEO Audits", "Content Architecture", "Link Building", "Local SEO"] },
  { step: "04", title: "Business Advisory", desc: "C-suite level strategic advisory to fix operational bottlenecks, enter new markets, and architect revenue models that sustain exponential growth.", features: ["Revenue Strategy", "Market Entry", "Operations Consulting", "KPI Framework"] }
];

const projects = [
  { name: "School Management", tag: "ERP / WEB APP", desc: "A full-featured web application designed to modernize school operations and administration.", img: "/school.jpg", isLarge: true },
  { name: "Shoe E-Commerce", tag: "E-COMMERCE", desc: "Feature-rich footwear e-commerce platform optimized for a modern shopping experience.", img: "/shoe.jpg" },
  { name: "HR Portal", tag: "SAAS / ERP", desc: "A comprehensive HR management system built to streamline and automate workforce operations.", img: "/hrportal.png" },
  { name: "Hospital Website", tag: "HEALTHCARE", desc: "Comprehensive web platform for Holy Heart Hospital, specializing in advanced cardiac care.", img: "/hospital.jpg", isLarge: true },
];

const DummyHome2 = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    // Cinematic Loader
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return p + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) return;

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero text stagger
      gsap.to('.dh2-hero-title-text', {
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.to(['.dh2-hero-subtitle', '.dh2-hero-ctas'], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.8
      });

      // Parallax on images
      gsap.utils.toArray<HTMLElement>('.dh2-project-img').forEach(img => {
        gsap.to(img, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="dh2-root" ref={containerRef}>
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="dh2-loader"
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div 
              className="dh2-loader-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              AVANI
            </motion.div>
            <div className="dh2-loader-bar-bg">
              <div className="dh2-loader-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="dh2-nav">
        <Link to="/" className="dh2-logo">AVANI.</Link>
        <div className="dh2-nav-links">
          <Link to="#services" className="dh2-nav-link">Expertise</Link>
          <Link to="#work" className="dh2-nav-link">Work</Link>
          <Link to="#about" className="dh2-nav-link">Philosophy</Link>
        </div>
        <Link to="/contact" className="dh2-nav-cta">Start a Project</Link>
      </nav>

      {/* Hero */}
      <section className="dh2-hero dh2-container">
        <h1 className="dh2-display dh2-hero-title">
          <span className="dh2-hero-title-line"><span className="dh2-hero-title-text">WE CRAFT</span></span>
          <span className="dh2-hero-title-line"><span className="dh2-hero-title-text dh2-hero-stroked">DIGITAL</span></span>
          <span className="dh2-hero-title-line"><span className="dh2-hero-title-text dh2-hero-accent">EXPERIENCES</span></span>
        </h1>
        <p className="dh2-body dh2-hero-subtitle">
          Avani Enterprises is a premium product studio building high-performance websites, platforms, and growth engines for ambitious brands.
        </p>
        <div className="dh2-hero-ctas">
          <button className="dh2-btn-primary">View Our Work</button>
          <button className="dh2-btn-secondary">Let's Talk</button>
        </div>
      </section>

      {/* Marquee */}
      <div className="dh2-marquee">
        <div className="dh2-marquee-track">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="dh2-marquee-item">Web Engineering <span className="dh2-marquee-separator">•</span></div>
              <div className="dh2-marquee-item">Performance Marketing <span className="dh2-marquee-separator">•</span></div>
              <div className="dh2-marquee-item">Business Strategy <span className="dh2-marquee-separator">•</span></div>
              <div className="dh2-marquee-item">SEO & Content <span className="dh2-marquee-separator">•</span></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="dh2-section dh2-container" id="about">
        <h2 className="dh2-heading dh2-about-text">
          WE DON'T JUST BUILD WEBSITES. WE <span className="dh2-about-highlight">ENGINEER GROWTH</span> AND ARCHITECT SOLUTIONS THAT SCALABLY DRIVE REVENUE.
        </h2>
      </section>

      {/* Services */}
      <section className="dh2-section dh2-container" id="services">
        <div style={{ marginBottom: '4rem' }}>
          <h2 className="dh2-display" style={{ fontSize: '3rem' }}>OUR EXPERTISE</h2>
        </div>
        <div>
          {services.map((svc, idx) => (
            <div 
              key={idx} 
              className="dh2-service-item"
              onClick={() => setActiveService(activeService === idx ? null : idx)}
            >
              <div className="dh2-service-header">
                <div className="dh2-service-title-wrap">
                  <span className="dh2-service-num">{svc.step}</span>
                  <h3 className="dh2-heading dh2-service-title">{svc.title}</h3>
                </div>
                <Plus className="dh2-service-icon" size={32} style={{ transform: activeService === idx ? 'rotate(45deg)' : 'none' }} />
              </div>
              <div className="dh2-service-content" style={{ height: activeService === idx ? 'auto' : 0 }}>
                <div className="dh2-service-content-inner">
                  <p className="dh2-body dh2-service-desc">{svc.desc}</p>
                  <div className="dh2-service-features">
                    {svc.features.map((f, i) => (
                      <div key={i} className="dh2-service-feature">{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="dh2-section dh2-container" id="work">
        <h2 className="dh2-display" style={{ fontSize: '3rem', marginBottom: '2rem' }}>FEATURED WORK</h2>
        <div className="dh2-projects-grid">
          {projects.map((p, idx) => (
            <div key={idx} className={`dh2-project-card ${p.isLarge ? 'large' : ''}`}>
              <img src={p.img} alt={p.name} className="dh2-project-img" />
              <div className="dh2-project-overlay">
                <span className="dh2-project-tag">{p.tag}</span>
                <div className="dh2-project-info">
                  <h3 className="dh2-heading dh2-project-title">{p.name}</h3>
                  <p className="dh2-body dh2-project-desc">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="dh2-stats">
        <div className="dh2-container dh2-stats-grid">
          <div>
            <div className="dh2-stat-num">150+</div>
            <div className="dh2-body dh2-stat-label">Clients Scaled</div>
          </div>
          <div>
            <div className="dh2-stat-num">300+</div>
            <div className="dh2-body dh2-stat-label">Projects Delivered</div>
          </div>
          <div>
            <div className="dh2-stat-num">4X</div>
            <div className="dh2-body dh2-stat-label">Average ROAS</div>
          </div>
          <div>
            <div className="dh2-stat-num">8+</div>
            <div className="dh2-body dh2-stat-label">Years Experience</div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="dh2-section dh2-container" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <h2 className="dh2-display" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', marginBottom: '2rem' }}>
          LET'S BUILD <br/><span className="dh2-hero-stroked">TOGETHER</span>
        </h2>
        <Link to="/contact" className="dh2-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          START A PROJECT <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
};

export default DummyHome2;
