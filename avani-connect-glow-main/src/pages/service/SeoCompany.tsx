import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function SeoCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['seo-company']} />;
}
