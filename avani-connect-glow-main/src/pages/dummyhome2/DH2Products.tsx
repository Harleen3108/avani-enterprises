import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const products = [
  { title: 'HR Portal', desc: 'Complete HR management solution with employee tracking, attendance, payroll, and performance analytics.', url: 'https://hrportal.avanienterprises.in/', tags: ['Employee Mgmt', 'Payroll', 'Analytics'] },
  { title: 'School Management', desc: 'End-to-end school management system with admissions, student tracking, fee management, and parent portals.', url: 'https://indus-school-page.vercel.app/admission', tags: ['Admissions', 'Student Portal', 'Fee Mgmt'] },
  { title: 'Project CRM', desc: 'Powerful CRM for project management with team collaboration, lead tracking, and reporting dashboards.', url: 'https://team-lead-gamma.vercel.app/', tags: ['Lead Tracking', 'Team Mgmt', 'Reports'] },
  { title: 'Custom E-Commerce', desc: 'Feature-rich e-commerce platform with product management, payment integration, and order tracking.', url: 'https://shoes-ecommerce-iota.vercel.app/', tags: ['Products', 'Payments', 'Orders'] },
];

const DH2Products = () => (
  <div className="dh2-page">
    <section className="dh2-section" style={{ paddingTop: '6rem' }}>
      <div className="dh2-container" style={{ textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="dh2-label">PRODUCTS</div>
          <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>OUR <span style={{ color: 'var(--accent)' }}>PRODUCTS</span></h1>
          <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>Ready-to-deploy solutions built for scale. Each product is battle-tested and customizable.</p>
        </motion.div>
      </div>
    </section>

    <section className="dh2-section" style={{ paddingTop: '2rem' }}>
      <div className="dh2-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
          {products.map((p, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .1 }}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem', transition: 'border-color .3s, transform .3s' }}
              whileHover={{ y: -4, borderColor: 'rgba(200,255,0,.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem' }}>{p.title}</h3>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', padding: '.3rem' }}><ExternalLink size={14} /></a>
              </div>
              <p className="dh2-body" style={{ fontSize: '.78rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
                {p.tags.map(t => <span key={t} style={{ fontSize: '.55rem', padding: '.2rem .5rem', background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 100, color: 'var(--text-muted)' }}>{t}</span>)}
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="dh2-btn-ghost" style={{ marginTop: '1.5rem', fontSize: '.6rem', padding: '.5rem 1rem' }}>
                View Live Demo <ExternalLink size={10} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default DH2Products;
