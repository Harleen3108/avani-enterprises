import React from 'react';

const DH2Process: React.FC = () => (
  <section id="process">
    <div className="container">
      <div className="sec-label reveal">How We Work</div>
      <h2 className="sec-title reveal">
        Our <em>Cinematic</em> Process
      </h2>
    </div>
    <div className="proc-track-outer">
      <div className="proc-track">
        <div className="proc-step">
          <div className="proc-num">01</div>
          <div className="proc-title">Discovery &amp; Strategy</div>
          <p className="proc-body">
            We immerse ourselves in your world — your goals, audience, and
            competition. Deep research becomes the bedrock of every decision.
          </p>
        </div>
        <div className="proc-step">
          <div className="proc-num">02</div>
          <div className="proc-title">Concept &amp; Direction</div>
          <p className="proc-body">
            Creative directors and strategists align on a bold vision. Mood
            boards and brand territories crystallize into a definitive direction.
          </p>
        </div>
        <div className="proc-step">
          <div className="proc-num">03</div>
          <div className="proc-title">Design &amp; Prototype</div>
          <p className="proc-body">
            Every pixel is intentional. We design immersive interfaces, cinematic
            motion, and systems that scale — then prototype to perfection.
          </p>
        </div>
        <div className="proc-step">
          <div className="proc-num">04</div>
          <div className="proc-title">Engineering &amp; Build</div>
          <p className="proc-body">
            Our engineers bring designs to life with clean, performant code.
            TypeScript, Next.js, GSAP — built for speed, scale, and longevity.
          </p>
        </div>
        <div className="proc-step">
          <div className="proc-num">05</div>
          <div className="proc-title">Launch &amp; Amplify</div>
          <p className="proc-body">
            We launch with precision and back it with marketing firepower — SEO,
            paid, content — ensuring your audience finds and stays.
          </p>
        </div>
        <div className="proc-step">
          <div className="proc-num">06</div>
          <div className="proc-title">Iterate &amp; Evolve</div>
          <p className="proc-body">
            Post-launch, we track, test, and refine. Data informs evolution. Your
            digital presence grows with your ambitions.
          </p>
        </div>
      </div>
    </div>
    <div className="proc-hint">← drag or scroll to explore →</div>
  </section>
);

export default DH2Process;
