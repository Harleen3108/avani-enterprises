import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function GoogleAdsAgency() {
  return <ProductPageTemplate data={seoLandingPagesData['google-ads-agency']} />;
}
