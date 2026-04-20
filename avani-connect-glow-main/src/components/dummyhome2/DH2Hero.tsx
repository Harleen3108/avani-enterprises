import React from 'react';

const DH2Hero: React.FC = () => (
  <section id="hero">
    {/* LAYER 1: Animated Canvas (tech particles + orbiting nodes) */}
    <canvas id="hero-canvas"></canvas>

    {/* LAYER 2: Background image (matching DummyHome1) */}
    <div className="hero-video-wrap">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069"
        alt=""
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>

    {/* LAYER 3: Overlay stack (depth + brand colour) */}
    <div className="hero-overlay-1"></div>
    <div className="hero-overlay-2"></div>
    <div className="hero-overlay-3"></div>
    <div className="hero-grain"></div>
    <div className="hero-scan"></div>
    <div className="hero-leak"></div>

    {/* LAYER 4: Decorative floating rings */}
    <div className="ring ring-1"></div>
    <div className="ring ring-2"></div>
    <div className="ring ring-3"></div>
    <div className="ring ring-4"></div>

    {/* Floating badge top-left */}
    <div className="hero-badge-2" id="dh2-hb2">
      <div className="dot"></div>
      <span className="blabel">One Stop Solution for Business · Est. 2016</span>
    </div>

    {/* Floating metric badge bottom-right */}
    <div className="hero-badge" id="dh2-hb">
      <div className="bnum">
        300<span style={{ fontSize: '1.2rem' }}>+</span>
      </div>
      <div className="blbl">Projects Done</div>
    </div>

    {/* HERO CONTENT */}
    <div className="hero-content">
      <div className="hero-eyebrow" id="dh2-he">
        <span></span>One Stop Solution for Business<span></span>
      </div>
      <h1 className="hero-title" id="dh2-ht">
        <span className="ln">
          <inner>
            <span className="gw">Avani</span>
          </inner>
        </span>
        <span className="ln">
          <inner>
            <em>Enterprises</em>
          </inner>
        </span>
      </h1>
      <p className="hero-tagline" id="dh2-htag">
        Build High‑Performing Websites &amp; Accelerate Growth
      </p>
      <p className="hero-sub" id="dh2-hs">
        We're more than just a digital agency. We build stories, share passions,
        and deliver results that leave competitors far behind.
      </p>
      <div className="hero-ctas" id="dh2-hc">
        <a href="#projects" className="btn-p">
          <span>View Our Work</span>
        </a>
        <a href="#about" className="btn-o">
          Our Story
        </a>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="hero-scroll" id="dh2-hscr">
      <em>Scroll</em>
      <div className="scroll-ln"></div>
    </div>
  </section>
);

export default DH2Hero;
