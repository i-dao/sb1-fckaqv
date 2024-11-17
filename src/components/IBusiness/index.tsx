import React from 'react';
import { Building, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CompanyFormation from './CompanyFormation';
import IMoney from '../IMoney';
import ITax from '../ITax';

const IBusiness: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <Building className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{t('common.ibusiness')}</h2>
      </div>

      {/* Company Formation Section */}
      <div>
        <CompanyFormation />
      </div>

      {/* Banking Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Banking Services</h3>
        <IMoney />
      </div>

      {/* Tax Center Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Tax Center</h3>
        <ITax />
      </div>
    </div>
  );
};

export default IBusiness;