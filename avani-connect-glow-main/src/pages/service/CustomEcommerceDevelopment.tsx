import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function CustomEcommerceDevelopment() {
  return <ProductPageTemplate data={seoLandingPagesData['custom-ecommerce-development']} />;
}
