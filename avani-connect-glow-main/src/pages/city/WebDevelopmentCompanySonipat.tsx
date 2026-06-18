import React from 'react';
import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function WebDevelopmentCompanySonipat() {
  return <LocalServicePage {...cityPagesData['web-development-company-sonipat']} />;
}
