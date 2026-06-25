import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import SeoLandingTemplate, { SeoLandingData } from '../../components/seo/SeoLandingTemplate';
import newSeoPagesData from '../../data/newSeoPagesData.json';

export default function DynamicFlatSeoPage() {
  const { pathname } = useLocation();

  // Strip leading and trailing slashes to form the registry key
  const slug = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');

  if (!slug) {
    return <Navigate to="/not-found" replace />;
  }

  // Look up slug in the new SEO pages data registry
  const pageData = (newSeoPagesData as Record<string, SeoLandingData>)[slug];

  if (!pageData) {
    return <Navigate to="/not-found" replace />;
  }

  // Render the premium SeoLandingTemplate using the data config
  return <SeoLandingTemplate data={pageData} />;
}
