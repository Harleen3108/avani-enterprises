import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dh-privacy-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '32px' }}>
            Privacy Policy
          </h1>

          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p>
              At <strong style={{ color: 'var(--text-primary)' }}>Avani Enterprises</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>1. Information We Collect</h2>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Name, phone number, and email address</li>
                <li>Business details and project requirements</li>
                <li>Billing and communication details</li>
                <li>Login information (if applicable)</li>
                <li>Website usage data and analytics</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>2. How We Use Your Information</h2>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>To provide services like website dev, app dev, SEO, digital marketing</li>
                <li>To communicate regarding projects and support</li>
                <li>To improve our services and user experience</li>
                <li>To maintain internal business records</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>3. Data Protection</h2>
              <p>We use appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>4. Payment Security</h2>
              <p>Payments are processed using secure third-party gateways. We do not store card or banking details.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>5. Third-Party Services</h2>
              <p>We may use services like analytics, hosting, marketing tools, and payment processors for smooth operations.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>6. Policy Updates</h2>
              <p>Avani Enterprises may update this Privacy Policy at any time. Updates will be effective immediately on our website.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>7. Contact Information</h2>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Email:</strong> kp@avanienterprises.in<br />
                <strong style={{ color: 'var(--text-primary)' }}>Phone:</strong> +91 9253625099
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
