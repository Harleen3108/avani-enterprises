import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function CustomAiDevelopment() {
  return <ProductPageTemplate data={seoLandingPagesData['custom-ai-development']} />;
}
