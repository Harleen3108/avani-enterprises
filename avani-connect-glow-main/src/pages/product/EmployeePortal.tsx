import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function EmployeePortal() {
  return <ProductPageTemplate data={seoLandingPagesData['employee-portal']} />;
}
