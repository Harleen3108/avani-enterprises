import React from 'react';
import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function AiSolutionsCompanyDelhi() {
  return <LocalServicePage {...cityPagesData['ai-solutions-company-delhi']} />;
}
