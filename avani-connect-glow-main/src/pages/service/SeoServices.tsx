import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function SeoServices() {
  return <ProductPageTemplate data={seoLandingPagesData['seo-services']} />;
}
