import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function ShopifyDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['shopify-development-company']} />;
}
