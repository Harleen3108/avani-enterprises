import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function FrontendDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['frontend-development-company']} />;
}
