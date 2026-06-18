import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function LocalSeoServices() {
  return <ProductPageTemplate data={seoLandingPagesData['local-seo-services']} />;
}
