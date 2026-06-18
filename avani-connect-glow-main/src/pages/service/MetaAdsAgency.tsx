import React from 'react';
import ProductPageTemplate from '../../components/seo/ProductPageTemplate';
import { seoLandingPagesData } from '../../data/seoLandingPagesData';

export default function MetaAdsAgency() {
  return <ProductPageTemplate data={seoLandingPagesData['meta-ads-agency']} />;
}
