import React from 'react';
import { Receipt } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ExchangeApiSection from '../ITax/ExchangeApiSection';
import TaxDocuments from '../ITax/TaxDocuments';

const TaxCenter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
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

export default TaxCenter;