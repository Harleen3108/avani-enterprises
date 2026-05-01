import React from 'react';
import { motion } from 'framer-motion';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2Privacy = () => (
  <div className="dh2-page">
    <section className="dh2-section" style={{ paddingTop: '6rem' }}>
      <div className="dh2-container" style={{ maxWidth: 750, margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="dh2-label">LEGAL</div>
          <h1 className="dh2-display" style={{ marginBottom: '2rem' }}>PRIVACY <span style={{ color: 'var(--accent)' }}>POLICY</span></h1>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .1 }}
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '3rem' }}>
          <div style={{ fontSize: '.78rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
            <p style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Last Updated:</strong> January 2025</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>1. Information We Collect</h3>
            <p>We collect personal information that you provide directly, including name, email, phone number, and company details when you fill out our contact forms, book consultations, or subscribe to our services.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>2. How We Use Your Information</h3>
            <p>Your information is used to respond to inquiries, provide services, send project updates, and improve our offerings. We never sell your personal data to third parties.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>3. Data Protection</h3>
            <p>We implement industry-standard security measures to protect your personal information. All data transmission is encrypted and stored securely.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>4. Cookies</h3>
            <p>Our website uses cookies to enhance your experience. You can manage cookie preferences through your browser settings.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>5. Contact Us</h3>
            <p>For privacy-related concerns, contact us at <a href="mailto:kp@avanienterprises.in" style={{ color: 'var(--accent)' }}>kp@avanienterprises.in</a></p>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default DH2Privacy;
