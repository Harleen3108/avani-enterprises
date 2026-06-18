import React from 'react';
import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function WebDevelopmentCompanyHisar() {
  return <LocalServicePage {...cityPagesData['web-development-company-hisar']} />;
}
