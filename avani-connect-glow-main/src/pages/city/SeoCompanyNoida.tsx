import React from 'react';
import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function SeoCompanyNoida() {
  return <LocalServicePage {...cityPagesData['seo-company-noida']} />;
}
