import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const DHTerms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dh-terms-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '32px' }}>
            Terms & Conditions
          </h1>

          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p>
              By accessing or using the services provided by <strong style={{ color: 'var(--text-primary)' }}>Avani Enterprises</strong>, you agree to the following terms and conditions. Please read them carefully before engaging with our website or services.
            </p>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>1. Service Information</h2>
              <p>Avani Enterprises offers services such as website development, app development, SEO, digital marketing, branding, and related business solutions. All services are provided based on the requirements shared by the client.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>2. Orders & Payments</h2>
              <p>All projects must be booked with advance payment as mutually agreed. We reserve the right to accept, reject, or cancel any service request at our discretion.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>3. Project Timelines</h2>
              <p>All timelines provided for project completion are estimated and may vary depending on revisions, client response delays, technical updates, or external factors.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>4. Refund & Cancellation</h2>
              <p>Payments made for services are non-refundable. Cancellations are allowed only before the project work begins. Once work has started, no refund requests will be accepted.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>5. Client Responsibility</h2>
              <p>Clients are responsible for providing accurate project details, content, and brand-related information. Avani Enterprises is not liable for any issues arising from incorrect or incomplete information shared by the client.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>6. Intellectual Property</h2>
              <p>All website designs, graphics, code, and content created by Avani Enterprises belong to us unless fully paid for by the client. Unauthorized use, copying, or resale of our work is prohibited.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>7. Limitation of Liability</h2>
              <p>Avani Enterprises shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services, websites, applications, or digital platforms.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '16px', marginTop: '16px' }}>8. Changes to Terms</h2>
              <p>These terms may be updated at any time without prior notice. Continued use of our website or services indicates acceptance of the updated terms.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DHTerms;
