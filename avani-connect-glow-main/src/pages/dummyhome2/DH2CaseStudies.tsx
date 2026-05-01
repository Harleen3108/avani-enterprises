import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ExternalLink } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const projects = [
  { title: 'Policicue', tag: 'Insurance Platform', desc: 'Sophisticated platform for complex policy management with exceptional UI/UX.', img: '/policucue.jpeg', link: '/projects/policicue' },
  { title: 'Indus School', tag: 'Education', desc: 'Modern website capturing the school vision, intuitive for parents and students.', img: '/indus.jpeg', link: '/projects/indus' },
  { title: 'FRD Nutrition', tag: 'E-Commerce', desc: 'Stunning product showcase with seamless e-commerce — 180% increase in orders.', img: '/frd-nutrition-new.png', link: '/projects/frd-nutrition' },
  { title: 'Hi-Tech Homes', tag: 'Real Estate', desc: 'Elegant website for luxury properties with virtual tour features.', img: '/hitech.jpeg', link: '/projects/hitech-homes' },
  { title: 'Sanjeevni Hospital', tag: 'Healthcare', desc: 'Hospital management portal streamlining operations and patient booking.', img: '/sanjeevni.jpeg', link: '/projects/sanjeevni-hospital' },
  { title: 'Rohtak Shoe Co.', tag: 'E-Commerce', desc: 'E-commerce platform — 250% increase in online sales in 3 months.', img: '/shoes.jpeg', link: '/projects/rohtak-shoe' },
];

const DH2CaseStudies = () => (
  <div className="dh2-page">
    <section className="dh2-section" style={{ paddingTop: '6rem' }}>
      <div className="dh2-container" style={{ textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="dh2-label">PORTFOLIO</div>
          <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>CASE <span style={{ color: 'var(--accent)' }}>STUDIES</span></h1>
          <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>Real results from real businesses. Here's how we've helped our clients.</p>
        </motion.div>
      </div>
    </section>

    <section className="dh2-section" style={{ paddingTop: '2rem' }}>
      <div className="dh2-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
          {projects.map((p, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .06 }}>
              <Link to={p.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 14, overflow: 'hidden', transition: 'border-color .3s, transform .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,255,0,.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-s)'; e.currentTarget.style.transform = 'none'; }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '.5rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.4rem' }}>{p.tag}</div>
                    <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '.95rem', marginBottom: '.5rem' }}>{p.title}</h3>
                    <p className="dh2-body" style={{ fontSize: '.72rem', lineHeight: 1.65 }}>{p.desc}</p>
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.6rem', fontWeight: 700, color: 'var(--accent)' }}>View Project <ArrowRight size={11} /></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default DH2CaseStudies;
