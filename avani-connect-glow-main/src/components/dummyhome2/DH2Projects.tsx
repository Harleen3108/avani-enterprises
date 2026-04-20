import React from 'react';

/* ── Project data — real Avani client projects ── */
const projects = [
  {
    name: 'Indus Group of Institution',
    tag: 'Education Platform · 2024',
    image: '/indus1.png',
    logo: '/indus.jpeg',
    link: '/projects/indus',
    color: 'rgba(201,168,76,.15)',
  },
  {
    name: 'Policicue',
    tag: 'InsurTech Platform · 2024',
    image: '/policy1.png',
    logo: '/policucue.jpeg',
    link: '/projects/policicue',
    color: 'rgba(201,168,76,.12)',
  },
  {
    name: 'FRD Nutrition',
    tag: 'E-Commerce · 2023',
    image: '/frd-nutrition-new.png',
    logo: '/frd-nutrition-new.png',
    link: '/projects/frd-nutrition',
    color: 'rgba(201,168,76,.1)',
  },
  {
    name: 'Hi-Tech Luxury Homes',
    tag: 'Real Estate · 2023',
    image: '/hitech1.png',
    logo: '/hitech.jpeg',
    link: '/projects/hitech-homes',
    color: 'rgba(201,168,76,.14)',
  },
  {
    name: 'Sanjeevni Hospital',
    tag: 'Healthcare Portal · 2024',
    image: '/sanjeevni1.png',
    logo: '/sanjeevni.jpeg',
    link: '/projects/sanjeevni-hospital',
    color: 'rgba(201,168,76,.11)',
  },
  {
    name: 'Rohtak Shoe Co.',
    tag: 'E-Commerce · 2023',
    image: '/shoes1.png',
    logo: '/shoes.jpeg',
    link: '/projects/rohtak-shoe',
    color: 'rgba(201,168,76,.13)',
  },
];

/* Duplicate for infinite scroll */
const doubled = [...projects, ...projects];

const DH2Projects: React.FC = () => (
  <section id="projects">
    <div className="container">
      <div className="sec-label reveal">Featured Work</div>
      <h2 className="sec-title reveal">
        Transforming
        <br />
        <em>Businesses</em>
      </h2>
    </div>

    {/* ── Row 1: auto-scroll left ── */}
    <div className="dh2-proj-row" style={{ marginTop: '5rem' }}>
      <div className="dh2-proj-fade dh2-proj-fade-l"></div>
      <div className="dh2-proj-fade dh2-proj-fade-r"></div>
      <div className="dh2-proj-track dh2-proj-track-1">
        {doubled.map((p, i) => (
          <a key={`r1-${i}`} href={p.link} className="dh2-proj-card">
            <div className="dh2-proj-img-wrap">
              <img src={p.image} alt={p.name} />
              <div className="dh2-proj-img-overlay"></div>
            </div>
            <div className="dh2-proj-card-info">
              <div className="dh2-proj-logo-wrap">
                <img src={p.logo} alt={p.name} className="dh2-proj-logo" />
              </div>
              <div className="dh2-proj-card-text">
                <div className="dh2-proj-card-tag">{p.tag}</div>
                <div className="dh2-proj-card-name">{p.name}</div>
              </div>
              <div className="dh2-proj-card-arrow">→</div>
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* ── Row 2: auto-scroll right (reverse) ── */}
    <div className="dh2-proj-row" style={{ marginTop: '1rem' }}>
      <div className="dh2-proj-fade dh2-proj-fade-l"></div>
      <div className="dh2-proj-fade dh2-proj-fade-r"></div>
      <div className="dh2-proj-track dh2-proj-track-2">
        {[...doubled].reverse().map((p, i) => (
          <a key={`r2-${i}`} href={p.link} className="dh2-proj-card dh2-proj-card-sm">
            <div className="dh2-proj-img-wrap">
              <img src={p.image} alt={p.name} />
              <div className="dh2-proj-img-overlay"></div>
            </div>
            <div className="dh2-proj-card-info">
              <div className="dh2-proj-logo-wrap">
                <img src={p.logo} alt={p.name} className="dh2-proj-logo" />
              </div>
              <div className="dh2-proj-card-text">
                <div className="dh2-proj-card-tag">{p.tag}</div>
                <div className="dh2-proj-card-name">{p.name}</div>
              </div>
              <div className="dh2-proj-card-arrow">→</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default DH2Projects;
