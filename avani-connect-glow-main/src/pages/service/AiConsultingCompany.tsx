import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function AiConsultingCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['ai-consulting-company']} />;
}
