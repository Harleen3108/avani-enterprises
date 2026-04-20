import React from 'react';

const DH2About: React.FC = () => (
  <section id="about">
    <div className="container">
      <div className="about-grid">
        <div className="about-imgs reveal-l">
          <img
            className="about-img1"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
            alt="Avani team"
          />
          <img
            className="about-img2"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80"
            alt="Collaboration"
          />
          <div className="about-badge">
            <b>14</b>
            <small>
              Years of
              <br />
              Excellence
            </small>
          </div>
        </div>
        <div className="about-text">
          <div className="sec-label reveal">Our Story</div>
          <h2 className="sec-title reveal">
            We Don't Build
            <br />
            <em>Websites.</em>
            <br />
            We Build Worlds.
          </h2>
          <p className="about-body reveal">
            Avani Enterprises was founded on a single conviction: digital
            experiences should feel extraordinary. Since 2010, we've partnered
            with visionary brands — from emerging startups to Fortune 500
            enterprises — crafting digital worlds that captivate, convert, and
            endure.
          </p>
          <p className="about-body reveal" style={{ marginTop: '-1rem' }}>
            Our multidisciplinary team of strategists, designers, and engineers
            brings cinematic precision to every pixel, every interaction, every
            line of code.
          </p>
          <div className="pills reveal">
            <span className="pill">Strategy</span>
            <span className="pill">Design</span>
            <span className="pill">Engineering</span>
            <span className="pill">Marketing</span>
            <span className="pill">Motion</span>
            <span className="pill">AI Solutions</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DH2About;
