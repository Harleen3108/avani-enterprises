import React from 'react';

const DH2Navbar: React.FC = () => (
  <nav id="dh2-nav">
    <a href="#" className="logo">
      <div className="logo-hex"></div>
      <div>
        <span className="logo-name">
          Avani<span className="logo-sub">Enterprises</span>
        </span>
      </div>
    </a>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#projects">Work</a></li>
      <li><a href="#testi">Clients</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <a href="#cta" className="nav-btn">Let's Talk</a>
  </nav>
);

export default DH2Navbar;
