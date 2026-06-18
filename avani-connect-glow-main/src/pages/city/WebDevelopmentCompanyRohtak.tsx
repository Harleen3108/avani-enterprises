import React from 'react';
import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function WebDevelopmentCompanyRohtak() {
  return <LocalServicePage {...cityPagesData['web-development-company-rohtak']} />;
}
