import React from 'react';

const DH2FAQ: React.FC = () => (
  <section id="faq">
    <div className="container">
      <div className="faq-wrap">
        <div>
          <div className="sec-label reveal">FAQ</div>
          <h2 className="sec-title reveal">
            Questions,
            <br />
            <em>Answered</em>
          </h2>
          <p
            className="reveal"
            style={{
              marginTop: '2rem',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(213,206,163,.6)',
            }}
          >
            Everything you need to know before we begin. Don't see your question?
            Let's talk.
          </p>
          <a
            href="#cta"
            className="btn-o reveal"
            style={{ marginTop: '2.5rem', display: 'inline-block' }}
          >
            Get In Touch
          </a>
        </div>
        <div className="faq-list">
          <div className="faq-item">
            <div className="faq-q">
              What types of projects do you take on?{' '}
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-a">
              <p>
                We work on everything from complete digital transformations to
                focused campaigns — websites, brand identities, mobile apps,
                e-commerce, marketing, and AI integrations. If it's digital and
                ambitious, we're in.
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              What's your typical project timeline?{' '}
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-a">
              <p>
                A focused brand identity takes 6–8 weeks. A full website or
                platform typically runs 10–16 weeks. Complex builds may run 4–6
                months. You'll always have a clear roadmap from day one.
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              How do you price your services?{' '}
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-a">
              <p>
                Projects are priced based on scope, complexity, and timeline. We
                provide detailed, transparent proposals after a discovery call.
                Engagements range from ₹8L for focused brand projects to ₹50L+
                for full platform builds.
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              Do you offer post-launch support?{' '}
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-a">
              <p>
                All projects include a 30-day post-launch window. Beyond that, we
                offer monthly maintenance retainers — performance monitoring,
                updates, A/B testing, and ongoing optimization.
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              What makes Avani different?{' '}
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-a">
              <p>
                We operate at the intersection of strategy, craft, and
                technology. Every member is a specialist. Our senior team is
                hands-on throughout your project — not just at pitch stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DH2FAQ;
