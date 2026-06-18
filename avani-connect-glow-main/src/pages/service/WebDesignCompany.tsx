import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function WebDesignCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['web-design-company']} />;
}
