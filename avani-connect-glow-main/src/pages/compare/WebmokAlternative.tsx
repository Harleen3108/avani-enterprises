import React from 'react';
import ComparisonPageTemplate from '../../components/seo/ComparisonPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function WebmokAlternative() {
  return <ComparisonPageTemplate data={seoLandingPagesData['webmok-alternative']} />;
}
