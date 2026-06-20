import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function CustomWebDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['custom-web-development-company']} />;
}
