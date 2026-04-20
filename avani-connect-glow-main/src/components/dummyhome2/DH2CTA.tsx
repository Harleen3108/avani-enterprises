import React from 'react';

const DH2CTA: React.FC = () => (
  <section id="cta">
    <div className="cta-inner">
      <div className="sec-label reveal" style={{ justifyContent: 'center' }}>
        Start Your Journey
      </div>
      <h2 className="cta-title reveal">
        Ready to Build
        <br />
        <em>Something</em>
        <br />
        Extraordinary?
      </h2>
      <p className="cta-sub reveal">
        Let's create a digital experience that defines your brand for years to
        come. The conversation starts here.
      </p>
      <div className="cta-btns reveal">
        <a href="mailto:hello@avanienterprises.com" className="btn-p">
          <span>Start a Project</span>
        </a>
        <a href="tel:+919876543210" className="btn-o">
          Call Us Now
        </a>
      </div>
    </div>
  </section>
);

export default DH2CTA;
