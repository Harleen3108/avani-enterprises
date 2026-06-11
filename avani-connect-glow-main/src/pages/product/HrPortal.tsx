import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function HrPortal() {
  return <ProductPageTemplate data={seoLandingPagesData['hr-portal']} />;
}
