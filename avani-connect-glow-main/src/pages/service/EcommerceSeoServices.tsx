import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function EcommerceSeoServices() {
  return <ProductPageTemplate data={seoLandingPagesData['ecommerce-seo-services']} />;
}
