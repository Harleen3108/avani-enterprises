import LocalServicePage from '../local/LocalServicePage';
import { cityPagesData } from '../../data/cityPagesData';

export default function WebDevelopmentCompanyLondon() {
  return <LocalServicePage {...cityPagesData['web-development-company-london']} />;
}
