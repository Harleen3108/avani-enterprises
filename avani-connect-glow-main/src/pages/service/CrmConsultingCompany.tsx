import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function CrmConsultingCompany() {
  return <ProductPageTemplate data={seoLandingPagesData['crm-consulting-company']} />;
}
