import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function WebDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['web-development-company']} />;
}
