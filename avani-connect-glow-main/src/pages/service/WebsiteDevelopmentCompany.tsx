import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function WebsiteDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['website-development-company']} />;
}
