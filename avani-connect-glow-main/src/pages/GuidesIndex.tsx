/**
 * GuidesIndex — hub page for the guide cluster.
 *
 * Gives every guide an internal link from a crawlable page, which is what pulls
 * them out of "Discovered – currently not indexed". Orphan pages tell Google the
 * pages do not matter.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { GUIDES } from '../data/guides';

const SITE = 'https://www.avanienterprises.in';

export default function GuidesIndex() {
  const entries = Object.entries(GUIDES as Record<string, any>);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: entries.map(([slug, g], i) => ({
      '@type': 'ListItem', position: i + 1, name: g.title, url: `${SITE}/guides/${slug}`,
    })),
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Helmet>
        <title>Guides — Web, SEO, Ads and AI | Avani Enterprises</title>
        <meta
          name="description"
          content="Practical guides on web development cost, choosing an SEO agency, Google vs Meta ads, AI chatbots and voice agents, CRM build-or-buy, and why Google refuses to index pages."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE}/guides`} />
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
      </Helmet>

      <section style={{ padding: '120px 0 80px' }}>
        <div className="dh-container" style={{ maxWidth: '860px' }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.9rem,4vw,2.7rem)', fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 1rem' }}>
            Guides
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '68ch' }}>
            Written from client work rather than from a keyword list. Each one covers a decision we
            get asked about repeatedly — including the cases where the honest answer is that you do
            not need us.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {entries.map(([slug, g]) => (
              <Link
                key={slug}
                to={`/guides/${slug}`}
                style={{
                  display: 'block', background: 'var(--card-bg)', border: '1px solid var(--border-light)',
                  borderRadius: '16px', padding: '24px 26px', textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                  {g.serviceLabel}
                </span>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: '.5rem 0 .5rem' }}>
                  {g.title}
                </h2>
                <p style={{ fontSize: '.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 .8rem' }}>
                  {g.description}
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', fontSize: '.88rem', fontWeight: 600 }}>
                  Read the guide <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
