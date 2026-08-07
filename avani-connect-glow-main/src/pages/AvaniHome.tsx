import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import './AvaniHome.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ------------------------------------------------------------------
   /avanihome — scroll-cinema concept route.

   Deliberately NOT wired into the live homepage. Everything here is
   namespaced under .ah-root and rendered only on this path.

   The hero does not "play" a video. Scroll position drives
   video.currentTime across five clips, so the footage advances only as
   fast as the user scrolls, in either direction. Everything below the
   hero is real DOM motion — no video involved.
   ------------------------------------------------------------------ */

const BEATS = [
  {
    src: '/avanihome/01-foundation.mp4',
    word: 'FOUNDATIONS',
    label: 'Web & App Development',
    desc: 'Stunning, lightning-fast websites and mobile apps built to carry real commercial weight — designed to convert, engineered to scale.',
  },
  {
    src: '/avanihome/02-visibility.mp4',
    word: 'VISIBILITY',
    label: 'SEO & Content Marketing',
    desc: 'Get found on Google and turn casual visitors into loyal customers. Technical SEO, content strategy, and the rankings that compound.',
  },
  {
    src: '/avanihome/03-intelligence.mp4',
    word: 'INTELLIGENCE',
    label: 'AI Solutions',
    desc: 'Custom chatbots, WhatsApp auto-agents and lead-tracking automation that handle the busywork so your team can focus on growth.',
  },
  {
    src: '/avanihome/04-scale.mp4',
    word: 'SCALE',
    label: 'Growth & Performance',
    desc: 'Paid campaigns, social, and analytics working as one system — every rupee measured, every channel accountable to pipeline.',
  },
  {
    src: '/avanihome/05-loop.mp4',
    word: 'MOMENTUM',
    label: 'Ongoing Partnership',
    desc: 'Eight years, 300+ projects, and clients across India, UAE, Singapore and the USA. We do not hand off and disappear.',
  },
];

const SERVICES = [
  { idx: '01', glyph: '◎', title: 'Web & App Development', slug: 'web-app-development', body: 'Custom websites, mobile apps, e-commerce and UI/UX design built for speed and conversion.' },
  { idx: '02', glyph: '◈', title: 'SEO & Content Marketing', slug: 'seo-content-marketing', body: 'Search rankings, brand authority and content strategy that brings qualified organic traffic.' },
  { idx: '03', glyph: '◉', title: 'AI Solutions', slug: 'ai-solutions', body: 'Lead-tracker AI, WhatsApp auto-agents, workflow optimisation and custom chatbots.' },
  { idx: '04', glyph: '◇', title: 'Social Media Marketing', slug: 'social-media-marketing', body: 'Campaign strategy and audience growth across Instagram, Facebook and LinkedIn.' },
  { idx: '05', glyph: '◐', title: 'Podcast Production', slug: 'podcast-production', body: 'End-to-end production, editing and distribution that turns expertise into authority.' },
  { idx: '06', glyph: '◍', title: 'Financial Consulting', slug: 'financial-consulting', body: 'Structure, forecasting and financial clarity for businesses entering their next stage.' },
  { idx: '07', glyph: '◒', title: 'Business Consultation', slug: 'business-consultation', body: 'Strategy, positioning and operating models built around measurable outcomes.' },
  { idx: '08', glyph: '◓', title: 'Business Loans', slug: 'business-loans', body: 'Access to working capital and growth funding through our lending partner network.' },
  { idx: '09', glyph: '◔', title: 'Business Insurance', slug: 'business-insurance', body: 'Cover that matches your actual exposure, arranged without the usual runaround.' },
];

const PROCESS = [
  { n: '01', t: 'Discover', d: 'We analyse your business, competitors and market opportunities to build a strategic foundation before a single pixel is drawn.' },
  { n: '02', t: 'Define', d: 'Clear objectives, target audience and success metrics are established up front, so results are measurable rather than argued about.' },
  { n: '03', t: 'Design', d: 'Creative solutions and user experiences that align with your brand, your buyers, and the commercial goal behind the project.' },
  { n: '04', t: 'Develop', d: 'An agile build with regular updates and quality assurance at every stage — no black boxes, no month-long silences.' },
  { n: '05', t: 'Deploy', d: 'Strategic launch with comprehensive testing, performance optimisation and monitoring from the first hour of traffic.' },
  { n: '06', t: 'Deliver', d: 'Ongoing support, analytics and iteration to make sure the thing we launched keeps earning its place.' },
];

const STATS = [
  { to: 150, suffix: '+', label: 'Happy Clients' },
  { to: 300, suffix: '+', label: 'Projects Done' },
  { to: 85, suffix: '%', label: 'Growth Rate' },
  { to: 8, suffix: '+', label: 'Years Active' },
];

const MANIFESTO =
  'We are not a vendor you brief and chase. We are the team that builds the site, ranks it, fills it with the right audience, and stays on the numbers until they move. Strategy, engineering and marketing under one roof — because handoffs are where growth goes to die.';

const pad = (n: number) => String(n + 1).padStart(2, '0');

const AvaniHome: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const cinema = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const railItems = useRef<(HTMLDivElement | null)[]>([]);
  const spine = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const metaLabel = useRef<HTMLSpanElement>(null);
  const metaIdx = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const beatTl = useRef<gsap.core.Timeline | null>(null);

  const [ready, setReady] = useState(false);
  const [bufferPct, setBufferPct] = useState(0);

  /* ---- buffer clip 1 before revealing the hero -------------------
     Scrubbing an unbuffered video shows black frames, which reads as a
     broken page rather than a loading one. Clip 1 loads first and alone;
     the other four only start once it is seekable, so they never compete
     with it for bandwidth. */
  useLayoutEffect(() => {
    const first = videoRefs.current[0];
    if (!first) return;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setBufferPct(100);
      setReady(true);
      videoRefs.current.slice(1).forEach(v => {
        if (!v) return;
        v.preload = 'auto';
        v.load();
      });
    };

    const onProgress = () => {
      const d = first.duration;
      if (!d || !isFinite(d) || first.buffered.length === 0) return;
      const pct = Math.min(100, (first.buffered.end(first.buffered.length - 1) / d) * 100);
      setBufferPct(pct);
      if (pct > 92) finish();
    };

    first.addEventListener('progress', onProgress);
    first.addEventListener('canplaythrough', finish, { once: true });
    // Never leave the page veiled because a browser withheld an event.
    const bail = window.setTimeout(finish, 8000);
    if (first.readyState >= 4) finish();

    return () => {
      first.removeEventListener('progress', onProgress);
      window.clearTimeout(bail);
    };
  }, []);

  /* ---- all scroll behaviour ------------------------------------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Beat change is an edit, not a crossfade: the outgoing word wipes
         out, the incoming wipes in behind it, and the supporting copy
         swaps under cover of the wipe. Fired once per beat rather than
         every scroll frame, so it stays crisp while scrubbing. */
      const playBeat = (next: number, prev: number) => {
        const dir = next > prev ? 1 : -1;
        const inEl = wordRefs.current[next];
        const outEl = wordRefs.current[prev];

        beatTl.current?.kill();
        wordRefs.current.forEach((w, i) => {
          if (w && i !== next && i !== prev) gsap.set(w, { opacity: 0 });
        });

        const tl = gsap.timeline();
        beatTl.current = tl;

        if (outEl && prev !== next) {
          tl.to(outEl, {
            clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
            duration: 0.42,
            ease: 'power3.inOut',
          }, 0).set(outEl, { opacity: 0 });
        }

        if (inEl) {
          tl.set(inEl, {
            opacity: 1,
            clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
            yPercent: dir > 0 ? 8 : -8,
          }, 0.16)
            .to(inEl, {
              clipPath: 'inset(0% 0% 0% 0%)',
              yPercent: 0,
              duration: 0.72,
              ease: 'power3.out',
            }, 0.16);
        }

        tl.to([metaRef.current, descRef.current], {
          opacity: 0, y: -10, duration: 0.22, ease: 'power2.in', stagger: 0.04,
        }, 0)
          .add(() => {
            if (metaLabel.current) metaLabel.current.textContent = BEATS[next].label;
            if (metaIdx.current) metaIdx.current.textContent = `${pad(next)} / ${pad(BEATS.length - 1)}`;
            if (descRef.current) descRef.current.textContent = BEATS[next].desc;
            if (ghostRef.current) ghostRef.current.textContent = pad(next);
          }, 0.26)
          .fromTo([metaRef.current, descRef.current],
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.07 }, 0.3);

        if (ghostRef.current) {
          tl.fromTo(ghostRef.current,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.26);
        }
      };

      /* ===== ACT 1 — pinned five-clip scrub (desktop / tablet) =====
         500vh of scroll, 100vh per clip. self.progress * 5 gives a
         continuous position along the reel; the integer part picks the
         clip and the fraction seeks inside it. */
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const FADE = 0.16;       // cross-fade band, in clip-widths
        const SEEK_EPS = 1 / 40; // don't re-seek for sub-frame deltas
        let raf = 0;
        let target = 0;
        let shown = -1;

        // Opening state: beat 1 already on screen, no wipe.
        const w0 = wordRefs.current[0];
        if (w0) gsap.set(w0, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0 });
        shown = 0;

        const paint = () => {
          raf = 0;
          const idx = Math.min(BEATS.length - 1, Math.floor(target));

          // A clip that has not buffered yet would paint its poster frame,
          // which mid-reel reads as a glitch. Unready clips stay at zero and
          // the last ready clip holds the frame instead.
          const isReady = videoRefs.current.map(v => !!v && v.readyState >= 2);
          const ops = videoRefs.current.map((v, i) => {
            if (!v || !isReady[i]) return 0;
            const d = target - i;
            if (d >= 0 && d <= 1 - FADE) return 1;
            if (d > 1 - FADE && d <= 1) return (1 - d) / FADE;
            if (d < 0 && d >= -FADE) return (d + FADE) / FADE;
            return 0;
          });

          if (Math.max(...ops) < 1) {
            let hold = idx;
            while (hold > 0 && !isReady[hold]) hold--;
            if (isReady[hold]) ops[hold] = 1;
          }

          videoRefs.current.forEach((v, i) => {
            if (!v) return;
            v.style.opacity = String(ops[i]);
            if (ops[i] > 0 && isReady[i]) {
              const dur = v.duration;
              if (dur && isFinite(dur)) {
                const t = Math.max(0, Math.min(1, target - i)) * dur;
                if (Math.abs(v.currentTime - t) > SEEK_EPS) v.currentTime = t;
              }
            }
          });

          // Slow push-in across the whole reel adds depth the footage
          // alone does not carry.
          const p = target / BEATS.length;
          if (stage.current) stage.current.style.transform = `scale(${1 + p * 0.06})`;
          if (spine.current) spine.current.style.transform = `scaleY(${p})`;

          railItems.current.forEach((it, i) => {
            if (it) it.classList.toggle('is-active', i === idx);
          });

          if (idx !== shown) {
            playBeat(idx, shown);
            shown = idx;
          }
        };

        const st = ScrollTrigger.create({
          trigger: cinema.current,
          start: 'top top',
          end: `+=${BEATS.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.55,       // the lag that makes it feel weighted, not twitchy
          anticipatePin: 1,
          onUpdate: self => {
            target = self.progress * BEATS.length;
            if (!raf) raf = requestAnimationFrame(paint);
          },
        });

        paint();
        return () => {
          if (raf) cancelAnimationFrame(raf);
          beatTl.current?.kill();
          st.kill();
        };
      });

      /* ===== ACT 1 (mobile / reduced motion) =====
         No pin, no scrub — a phone cannot seek a 2.5 MB clip smoothly and
         scroll-jacking on touch reads as a broken page. The loop clip
         plays on its own and the headline holds one word. */
      mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        const loop = videoRefs.current[BEATS.length - 1];
        if (loop) {
          loop.style.opacity = '1';
          loop.loop = true;
          loop.muted = true;
          loop.preload = 'auto';
          const go = () => loop.play().catch(() => { /* autoplay refused; poster stands in */ });
          loop.readyState >= 2 ? go() : loop.addEventListener('canplay', go, { once: true });
        }
        videoRefs.current.slice(0, -1).forEach(v => { if (v) v.style.opacity = '0'; });

        const w = wordRefs.current[0];
        if (w) gsap.set(w, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0 });

        return () => { if (loop) loop.pause(); };
      });

      /* ===== char-split reveals on every section heading ===== */
      const splits: SplitText[] = [];
      gsap.utils.toArray<HTMLElement>('.ah-split').forEach(el => {
        const split = new SplitText(el, { type: 'words,chars', charsClass: 'ah-char' });
        splits.push(split);
        gsap.from(split.chars, {
          yPercent: 118,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.018,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });

      /* ===== ACT 2 — manifesto word wash ===== */
      gsap.to('.ah-word', {
        color: '#F5EDD8',
        ease: 'none',
        stagger: 1,
        scrollTrigger: { trigger: '.ah-manifesto', start: 'top 74%', end: 'bottom 62%', scrub: 0.4 },
      });

      /* ===== ACT 3 — horizontal services rail ===== */
      mm.add('(min-width: 768px)', () => {
        const track = document.querySelector<HTMLElement>('.ah-htrack');
        const pin = document.querySelector<HTMLElement>('.ah-hpin');
        if (!track || !pin) return;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        return () => tween.kill();
      });

      /* ===== ACT 4 — scroll-scrubbed counters ===== */
      gsap.utils.toArray<HTMLElement>('.ah-stat-num').forEach(el => {
        const to = Number(el.dataset.to || 0);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 46%', scrub: 0.5 },
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
        });
      });

      /* ===== ACT 5 — stacking process cards ===== */
      gsap.utils.toArray<HTMLElement>('.ah-stack-card').forEach((card, i, arr) => {
        if (i === arr.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: { trigger: arr[i + 1], start: 'top 88%', end: 'top 28%', scrub: 0.5 },
        });
      });

      /* ===== generic section fade-ups ===== */
      gsap.utils.toArray<HTMLElement>('.ah-rise').forEach(el => {
        gsap.from(el, {
          y: 44, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });

      return () => splits.forEach(s => s.revert());
    }, root);

    // Fonts land after first paint and shift every split heading, so
    // remeasure once they are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <div className="ah-root" ref={root}>
      <Helmet>
        <title>Avani Enterprises — We Build High-Performing Solutions</title>
        <meta
          name="description"
          content="A scroll-driven look at how Avani Enterprises builds foundations, visibility, intelligence and scale for businesses across India and the Gulf."
        />
        {/* Concept route running in parallel with the live homepage. Left
            unindexed on purpose so it cannot compete with / in search. */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ============ ACT 1 — pinned scroll cinema ============ */}
      <section className="ah-cinema" ref={cinema} aria-label="Introduction">
        <div className="ah-stage" ref={stage}>
          {BEATS.map((b, i) => (
            <video
              key={b.src}
              ref={el => { videoRefs.current[i] = el; }}
              className={`ah-clip${i === 0 ? ' is-first' : ''}`}
              src={b.src}
              poster="/hero-office-1280.webp"
              muted
              playsInline
              preload={i === 0 ? 'auto' : 'none'}
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="ah-grade" />
        <div className="ah-vignette" />
        <div className="ah-seat" />
        <div className="ah-floor" />
        <div className="ah-grain" />
        <div className="ah-rule ah-rule-top" />
        <div className="ah-rule ah-rule-bottom" />

        <div className="ah-cinema-inner">
          <div className="ah-ghost" ref={ghostRef} aria-hidden="true">01</div>

          <div className="ah-eyebrow">
            <i />
            AVANI ENTERPRISES · DIGITAL MARKETING AGENCY IN INDIA
          </div>

          <h1 className="ah-headline">
            <span className="ah-static">We Build</span>
            <span className="ah-morph">
              {BEATS.map((b, i) => (
                <span
                  key={b.word}
                  ref={el => { wordRefs.current[i] = el; }}
                  className="ah-morph-word"
                  /* Beat 1 is visible before GSAP runs, so a slow or failed
                     script never leaves the headline reading "We Build". */
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {b.word}
                </span>
              ))}
            </span>
          </h1>

          <div className="ah-beat-meta" ref={metaRef}>
            <span ref={metaIdx}>01 / 05</span>
            <span className="ah-dash" />
            <span ref={metaLabel}>{BEATS[0].label}</span>
          </div>

          <p className="ah-beat-desc" ref={descRef}>{BEATS[0].desc}</p>

          <div className="ah-cta-row">
            <Link to="/contact" className="ah-btn ah-btn-primary">
              BOOK CONSULTATION <ArrowRight size={14} />
            </Link>
            <Link to="/projects" className="ah-btn ah-btn-ghost">
              SEE THE WORK <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="ah-rail" aria-hidden="true">
          <span className="ah-rail-spine" ref={spine} />
          {BEATS.map((b, i) => (
            <div
              key={b.label}
              className={`ah-rail-item${i === 0 ? ' is-active' : ''}`}
              ref={el => { railItems.current[i] = el; }}
            >
              <span className="ah-rail-idx">{pad(i)}</span>
              <span className="ah-rail-label">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="ah-scrollcue">
          <span className="ah-scrollcue-line" />
          Scroll
        </div>

        <div className={`ah-loader${ready ? ' is-done' : ''}`}>
          <div className="ah-loader-bar">
            <span style={{ transform: `scaleX(${bufferPct / 100})` }} />
          </div>
        </div>
      </section>

      {/* ============ ACT 2 — manifesto ============ */}
      <section className="ah-manifesto">
        <p>
          {MANIFESTO.split(' ').map((w, i) => (
            <span className="ah-word" key={i}>{w}&nbsp;</span>
          ))}
        </p>
      </section>

      {/* ============ ACT 3 — horizontal services rail ============ */}
      <section className="ah-hpin" aria-label="Services">
        <div className="ah-hhead">
          <p className="ah-kicker">What we do</p>
          <h2 className="ah-h2 ah-split">Nine ways<br />we move the number</h2>
        </div>
        <div className="ah-htrack">
          {/* leading spacer keeps card 01 clear of the heading */}
          <div style={{ flex: '0 0 auto', width: 'min(38vw, 380px)' }} aria-hidden="true" />
          {SERVICES.map(s => (
            <Link to={`/services/${s.slug}`} className="ah-scard" key={s.slug}>
              <span className="ah-scard-idx">{s.idx}</span>
              <span className="ah-scard-glyph">{s.glyph}</span>
              <h3 className="ah-scard-title">{s.title}</h3>
              <p className="ah-scard-body">{s.body}</p>
              <span className="ah-scard-link">EXPLORE <ArrowUpRight size={13} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ ACT 4 — scrubbed numbers ============ */}
      <section className="ah-section">
        <p className="ah-kicker ah-rise">By the numbers</p>
        <h2 className="ah-h2 ah-split" style={{ marginBottom: 56 }}>Proof, not adjectives</h2>
        <div className="ah-stats">
          {STATS.map(s => (
            <div className="ah-stat" key={s.label}>
              <div className="ah-stat-num" data-to={s.to} data-suffix={s.suffix}>0{s.suffix}</div>
              <div className="ah-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ACT 5 — stacking process ============ */}
      <section className="ah-section">
        <p className="ah-kicker ah-rise">How we work</p>
        <h2 className="ah-h2 ah-split" style={{ marginBottom: 64 }}>Six steps,<br />no black boxes</h2>
        <div className="ah-stack">
          {PROCESS.map(p => (
            <article className="ah-stack-card" key={p.n}>
              <div className="ah-stack-num">{p.n}</div>
              <div>
                <h3 className="ah-stack-title">{p.t}</h3>
                <p className="ah-stack-body">{p.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ ACT 6 — outro ============ */}
      <section className="ah-outro">
        <video
          className="ah-outro-video"
          src="/avanihome/05-loop.mp4"
          poster="/hero-office-1280.webp"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
        />
        <div className="ah-floor" />
        <div className="ah-outro-inner">
          <h2 className="ah-split">Let&rsquo;s build<br />something that performs</h2>
          <p>
            Tell us the number you need to move. We will tell you, honestly, whether we are
            the right team to move it — and exactly how we would go about it.
          </p>
          <div className="ah-cta-row" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="ah-btn ah-btn-primary">
              BOOK CONSULTATION <ArrowRight size={14} />
            </Link>
            <Link to="/global-presence" className="ah-btn ah-btn-ghost">
              GLOBAL PRESENCE <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AvaniHome;
