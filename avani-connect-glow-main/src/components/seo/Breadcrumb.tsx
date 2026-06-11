import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.avanienterprises.in';

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  customCrumbs?: Crumb[];
}

export default function Breadcrumb({ customCrumbs }: BreadcrumbProps) {
  const { pathname } = useLocation();

  // Helper to turn URL segments into readable titles
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Generate crumbs automatically if not overridden by customCrumbs
  const crumbs: Crumb[] = React.useMemo(() => {
    if (customCrumbs) return customCrumbs;

    const segments = pathname.split('/').filter(Boolean);
    const generated: Crumb[] = [{ label: 'Home', href: '/' }];

    let currentHref = '';
    segments.forEach((segment) => {
      currentHref += `/${segment}`;
      let label = formatSegment(segment);
      
      // Customize specific labels
      if (segment.toLowerCase() === 'seo-content-marketing') label = 'SEO & Content Marketing';
      if (segment.toLowerCase() === 'web-app-development') label = 'Web & App Development';
      if (segment.toLowerCase() === 'social-media-marketing') label = 'Social Media Marketing';
      if (segment.toLowerCase() === 'ai-solutions') label = 'AI Solutions';
      if (segment.toLowerCase() === 'podcast-production') label = 'Podcast Production';
      if (segment.toLowerCase() === 'financial-consulting') label = 'Financial Consulting';
      if (segment.toLowerCase() === 'business-consultation') label = 'Business Consultation';
      if (segment.toLowerCase() === 'business-loans') label = 'Business Loans';
      if (segment.toLowerCase() === 'business-insurance') label = 'Business Insurance';

      generated.push({ label, href: currentHref });
    });

    return generated;
  }, [pathname, customCrumbs]);

  // Build BreadcrumbList JSON-LD
  const breadcrumbListLd = React.useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': crumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': crumb.label,
        'item': `${SITE_URL}${crumb.href}`
      }))
    };
  }, [crumbs]);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbListLd)}
        </script>
      </Helmet>
      
      <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', padding: '16px 0', fontSize: '0.8rem', fontFamily: "'Satoshi', 'Inter', sans-serif" }}>
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <React.Fragment key={crumb.href}>
              {idx > 0 && <span style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}>/</span>}
              {isLast ? (
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.href} 
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
