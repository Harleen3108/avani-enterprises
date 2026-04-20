import React from 'react';

const DH2Testimonials: React.FC = () => (
  <section id="testi">
    <div className="container">
      <div className="sec-label reveal">Client Stories</div>
      <h2 className="sec-title reveal">
        Words That <em>Matter</em>
      </h2>
    </div>
    <div className="testi-slider">
      <div className="testi-track" id="dh2-tt">
        <div className="testi-slide">
          <div className="testi-q">
            Avani didn't just redesign our platform — they completely reimagined
            how our users experience our product. The results were beyond what we
            imagined possible.
          </div>
          <div className="testi-author">
            <div className="testi-name">Meera Kapoor</div>
            <div className="testi-role">CEO, Nexus Technologies</div>
          </div>
        </div>
        <div className="testi-slide">
          <div className="testi-q">
            The team at Avani brought a level of craft and strategic depth that
            elevated our brand to a whole new tier. We've seen a 340% increase in
            qualified leads since launch.
          </div>
          <div className="testi-author">
            <div className="testi-name">Rahul Sharma</div>
            <div className="testi-role">Founder, Luminary Ventures</div>
          </div>
        </div>
        <div className="testi-slide">
          <div className="testi-q">
            Working with Avani felt like having a world-class agency embedded in
            our team. Their attention to detail, creative vision, and technical
            execution is simply unmatched.
          </div>
          <div className="testi-author">
            <div className="testi-name">Priya Anand</div>
            <div className="testi-role">VP Marketing, OrbitalCo</div>
          </div>
        </div>
      </div>
      <div className="testi-dots" id="dh2-td">
        <div className="t-dot on" data-i="0"></div>
        <div className="t-dot" data-i="1"></div>
        <div className="t-dot" data-i="2"></div>
      </div>
    </div>
  </section>
);

export default DH2Testimonials;
