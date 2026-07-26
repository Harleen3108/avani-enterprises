/**
 * GuideDetail — renders a long-form guide from src/data/guides.js.
 *
 * These live in code rather than in the backend-backed blog because /blog
 * fetches client-side, which means Googlebot's first pass sees an empty shell.
 * Guides are server-rendered by api/seo.js with full Article + FAQPage schema.
 *
 * Each guide links up to the service page it supports, which is the point of
 * the cluster: the guide earns the informational query, the service page
 * converts it.
 */
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';
import { GUIDES } from '../data/guides';

const SITE = 'https://www.avanienterprises.in';

/** Minimal inline formatter: **bold** only, which is all the guide copy uses. */
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? (GUIDES as Record<string, any>)[slug] : null;

  if (!guide) return <Navigate to="/not-found" replace />;

  const canonical = `${SITE}/guides/${slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.published,
    dateModified: guide.updated,
    author: { '@type': 'Organization', name: 'Avani Enterprises', url: SITE },
    publisher: { '@type': 'Organization', '@id': `${SITE}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f: any) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: canonical },
    ],
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Helmet>
        <title>{guide.metaTitle}</title>
        <meta name="description" content={guide.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={guide.metaTitle} />
        <meta property="og:description" content={guide.description} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <article style={{ padding: '120px 0 80px' }}>
        <div className="dh-container" style={{ maxWidth: '760px' }}>
          {/* Visible breadcrumb — mirrors the BreadcrumbList schema above */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '.82rem', color: 'var(--text-secondary)' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <Link to="/guides" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Guides</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{guide.serviceLabel}</span>
          </nav>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15, margin: '0 0 1rem' }}>
            {guide.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 1rem' }}>
            {guide.description}
          </p>
          <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)', opacity: 0.8, margin: '0 0 2.5rem' }}>
            Last updated {guide.updated}
          </p>

          {/* Key takeaways — the block AI answer engines quote most readily */}
          <aside
            style={{
              background: 'var(--card-bg)', border: '1px solid var(--border-light)',
              borderLeft: '3px solid var(--accent-primary)', borderRadius: '12px',
              padding: '22px 24px', marginBottom: '3rem',
            }}
          >
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 1rem', color: 'var(--accent-primary)' }}>
              Key takeaways
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {guide.takeaways.map((t: string, i: number) => (
                <li key={i} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
                  <Check size={15} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                  <span style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t}</span>
                </li>
              ))}
            </ul>
          </aside>

          {guide.sections.map((s: any, i: number) => (
            <section key={i} style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 1rem' }}>
                {s.heading}
              </h2>
              {s.paragraphs.map((p: string, j: number) => (
                <p key={j} style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.15rem' }}>
                  {renderInline(p)}
                </p>
              ))}
            </section>
          ))}

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-.02em', margin: '0 0 1.25rem' }}>
              Frequently asked questions
            </h2>
            {guide.faqs.map((f: any, i: number) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, margin: '0 0 .5rem' }}>{f.q}</h3>
                <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </section>

          {/* Cluster link up to the money page this guide supports */}
          <div
            style={{
              background: 'var(--card-bg)', border: '1px solid var(--border-light)',
              borderRadius: '16px', padding: '28px', marginBottom: '2rem',
            }}
          >
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem', fontWeight: 800, margin: '0 0 .6rem' }}>
              Want us to look at yours?
            </h2>
            <p style={{ fontSize: '.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
              We start every engagement with a written scope after a free discovery call — no obligation, and we will tell you if we are not the right fit.
            </p>
            <Link
              to={`/${guide.service}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--accent-primary)', color: '#0A0705', fontWeight: 700,
                fontSize: '.92rem', padding: '12px 22px', borderRadius: '10px', textDecoration: 'none',
              }}
            >
              {guide.serviceLabel} <ArrowRight size={16} />
            </Link>
          </div>

          {guide.related?.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', fontWeight: 700, margin: '0 0 .8rem' }}>
                Related guides
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {guide.related.map((r: string) => {
                  const g = (GUIDES as Record<string, any>)[r];
                  if (!g) return null;
                  return (
                    <li key={r}>
                      <Link to={`/guides/${r}`} style={{ color: 'var(--accent-primary)', fontSize: '.92rem', textDecoration: 'none' }}>
                        {g.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
