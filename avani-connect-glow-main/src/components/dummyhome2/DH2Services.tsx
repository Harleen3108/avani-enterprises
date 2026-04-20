import React from 'react';

const DH2Services: React.FC = () => (
  <section id="services">
    <div className="container">
      <div className="svc-head">
        <div>
          <div className="sec-label reveal">What We Do</div>
          <h2 className="sec-title reveal">
            Services That
            <br />
            <em>Elevate</em>
          </h2>
        </div>
        <p className="reveal">
          End-to-end digital services engineered for impact. Every solution
          crafted with intent, precision, and obsession for excellence.
        </p>
      </div>
      <div className="svc-grid">
        <div className="svc-card reveal">
          <div className="svc-n">01</div>
          <svg className="svc-icon" viewBox="0 0 52 52">
            <rect x="4" y="6" width="44" height="30" rx="3" />
            <path d="M17 44h18M26 36v8M12 18l8 8 8-8 8 8" />
          </svg>
          <div className="svc-name">Web Design &amp; Development</div>
          <p className="svc-desc">
            Immersive, performant websites built with Next.js, Framer Motion,
            and GSAP for cinematic digital experiences.
          </p>
          <div className="svc-arrow">Explore →</div>
        </div>

        <div className="svc-card reveal">
          <div className="svc-n">02</div>
          <svg className="svc-icon" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="16" />
            <path d="M26 10V4M26 48v-6M10 26H4M48 26h-6M17 17l-4-4M39 39l-4-4M17 35l-4 4M39 13l-4 4" />
          </svg>
          <div className="svc-name">Brand Strategy &amp; Identity</div>
          <p className="svc-desc">
            Complete brand systems — from positioning and voice to visual
            identity, logo, and typography guidelines.
          </p>
          <div className="svc-arrow">Explore →</div>
        </div>

        <div className="svc-card reveal">
          <div className="svc-n">03</div>
          <svg className="svc-icon" viewBox="0 0 52 52">
            <rect x="6" y="10" width="24" height="32" rx="2" />
            <rect x="22" y="16" width="24" height="26" rx="2" />
            <path d="M14 22h8M14 29h8" />
          </svg>
          <div className="svc-name">UI/UX Product Design</div>
          <p className="svc-desc">
            Human-centered design systems and high-fidelity prototypes that turn
            complex problems into elegant solutions.
          </p>
          <div className="svc-arrow">Explore →</div>
        </div>

        <div className="svc-card reveal">
          <div className="svc-n">04</div>
          <svg className="svc-icon" viewBox="0 0 52 52">
            <path d="M6 38l12-12 8 8 12-16 8 4" />
            <circle cx="10" cy="38" r="3" />
            <circle cx="22" cy="26" r="3" />
            <circle cx="30" cy="34" r="3" />
            <circle cx="42" cy="18" r="3" />
          </svg>
          <div className="svc-name">Digital Marketing &amp; SEO</div>
          <p className="svc-desc">
            Data-driven campaigns, SEO architecture, and content strategies that
            accelerate organic growth and ROI.
          </p>
          <div className="svc-arrow">Explore →</div>
        </div>

        <div className="svc-card reveal">
          <div className="svc-n">05</div>
          <svg className="svc-icon" viewBox="0 0 52 52">
            <path d="M26 4l6 12 13 2-9.5 9 2.5 13L26 34l-12 6 2.5-13L7 18l13-2z" />
          </svg>
          <div className="svc-name">Motion &amp; 3D Design</div>
          <p className="svc-desc">
            Cinematic motion graphics, 3D visualizations, and micro-animations
            that breathe life into your brand story.
          </p>
          <div className="svc-arrow">Explore →</div>
        </div>

        <div className="svc-card reveal">
          <div className="svc-n">06</div>
          <svg className="svc-icon" viewBox="0 0 52 52">
            <rect x="6" y="20" width="16" height="22" rx="2" />
            <rect x="18" y="10" width="16" height="32" rx="2" />
            <rect x="30" y="16" width="16" height="26" rx="2" />
            <path d="M26 6l4 4-4 4" />
          </svg>
          <div className="svc-name">AI &amp; Automation</div>
          <p className="svc-desc">
            Custom AI integrations, intelligent workflows, and automation
            pipelines that unlock new efficiencies.
          </p>
          <div className="svc-arrow">Explore →</div>
        </div>
      </div>
    </div>
  </section>
);

export default DH2Services;
