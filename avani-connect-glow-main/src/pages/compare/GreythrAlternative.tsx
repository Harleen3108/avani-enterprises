import React from 'react';
import ComparisonPageTemplate from '../../components/seo/ComparisonPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function GreythrAlternative() {
  return <ComparisonPageTemplate data={seoLandingPagesData['greythr-alternative']} />;
}
