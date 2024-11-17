import React from 'react';
import { Receipt } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ExchangeApiSection from './ExchangeApiSection';
import TaxDocuments from './TaxDocuments';

const ITax: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <Receipt className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{t('tax.title', 'Tax Center')}</h2>
      </div>

      {/* Exchange API Management Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ExchangeApiSection />
      </div>

      {/* Tax Documents Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <TaxDocuments />
      </div>
    </div>
  );
};

export default ITax;