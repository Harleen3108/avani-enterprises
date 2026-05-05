import React from 'react';
import { Outlet } from 'react-router-dom';
import DH2Navbar from './DH2Navbar';
import { Link } from 'react-router-dom';
import Chatbot from '../Chatbot';
import '../../components/dummyhome2/DummyHome2.css';

const footerLinks = {
  company: [
    { label: 'About Us', path: '/dummyhome2/about' },
    { label: 'Careers', path: '/dummyhome2/careers' },
    { label: 'Case Studies', path: '/dummyhome2/case-studies' },
    { label: 'Blog', path: '/dummyhome2/blog' },
    { label: 'Contact', path: '/dummyhome2/contact' },
  ],
  services: [
    { label: 'Web Development', path: '/dummyhome2/services' },
    { label: 'SEO & Content', path: '/dummyhome2/services' },
    { label: 'Social Media', path: '/dummyhome2/services' },
    { label: 'AI Solutions', path: '/dummyhome2/services' },
    { label: 'Business Consulting', path: '/dummyhome2/services' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/dummyhome2/privacy-policy' },
    { label: 'Terms & Conditions', path: '/dummyhome2/terms-and-conditions' },
  ],
};

const DH2Footer = () => (
  <footer className="dh2-footer">
    <div className="dh2-footer-grid">
      <div>
        <div className="dh2-footer-brand">AVANI.</div>
        <p className="dh2-footer-desc">One stop solution for business. We build stories, share passions, and deliver results that leave competitors far behind.</p>
      </div>
      <div>
        <div className="dh2-footer-heading">Company</div>
        {footerLinks.company.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
      </div>
      <div>
        <div className="dh2-footer-heading">Services</div>
        {footerLinks.services.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
      </div>
      <div>
        <div className="dh2-footer-heading">Legal</div>
        {footerLinks.legal.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
      </div>
    </div>
    <div className="dh2-footer-bottom">
      <span>© 2016–2025 Avani Enterprises. All rights reserved.</span>
      <span>Expanding Globally · Gurgaon · Mumbai · Rohtak · Australia</span>
    </div>
  </footer>
);

const DH2Layout = () => {
  return (
    <div className="dh2-root dh2-page">
      <DH2Navbar />
      <main style={{ paddingTop: '60px' }}>
        <Outlet />
      </main>
      <DH2Footer />
      <Chatbot />
    </div>
  );
};

export default DH2Layout;
