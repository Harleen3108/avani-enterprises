import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function BackendDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['backend-development-company']} />;
}
