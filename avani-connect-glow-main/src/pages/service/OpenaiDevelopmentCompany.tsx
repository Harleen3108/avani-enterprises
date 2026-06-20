import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function OpenaiDevelopmentCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['openai-development-company']} />;
}
