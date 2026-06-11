import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function AttendanceManagementSystem() {
  return <ProductPageTemplate data={seoLandingPagesData['attendance-management-system']} />;
}
