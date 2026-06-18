import React from 'react';
import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function AiSolutionsCompanyNoida() {
  return <LocalServicePage {...cityPagesData['ai-solutions-company-noida']} />;
}
