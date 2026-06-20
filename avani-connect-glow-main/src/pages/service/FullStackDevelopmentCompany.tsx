import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function FullStackDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['full-stack-development-company']} />;
}
