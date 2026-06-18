import React from 'react';
import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function DigitalMarketingCompanyDelhi() {
  return <LocalServicePage {...cityPagesData['digital-marketing-company-delhi']} />;
}
