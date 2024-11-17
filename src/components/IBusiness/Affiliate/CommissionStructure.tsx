import React from 'react';
import { Percent, DollarSign, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { COMMISSION_RATES, SERVICE_FEES } from '../../../types/affiliate';

const CommissionStructure: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {t('affiliate.commission.title', 'Commission Structure')}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Multi-Level Commission Structure */}
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
          <div className="flex items-center space-x-2 mb-4">
            <Percent className="h-5 w-5 text-indigo-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              {t('affiliate.commission.multiLevel', 'Multi-Level Commission')}
            </h4>
          </div>
          <div className="space-y-3">
            {COMMISSION_RATES.map((rate) => (
              <div
                key={rate.level}
                className="p-4 bg-white rounded-lg border border-indigo-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">L{rate.level}</span>
                    </div>
                    <span className="text-gray-700">{t('affiliate.commission.level')} {rate.level}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Transaction Fee Share:</span>
                    <span className="font-medium text-green-600">{rate.transactionShare}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subscription Fee Share:</span>
                    <span className="font-medium text-blue-600">{rate.subscriptionShare}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Fees */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold text-gray-900">
                {t('affiliate.commission.transactionFees', 'Transaction Fees')}
              </h4>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{t('affiliate.commission.fee', 'Fee')}</span>
                <span className="text-xl font-bold text-green-600">0.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('affiliate.commission.affiliateShare', 'Level 1 Share')}</span>
                <span className="text-sm font-medium text-green-600">50%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h4 className="text-lg font-semibold text-gray-900">
                {t('affiliate.commission.subscriptionFees', 'Subscription Fees')}
              </h4>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{t('affiliate.commission.monthlyFee', 'Monthly Fee')}</span>
                <span className="text-xl font-bold text-blue-600">€29</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('affiliate.commission.affiliateShare', 'Level 1 Share')}</span>
                <span className="text-sm font-medium text-blue-600">30%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              Multi-level commissions are distributed across 5 levels for both transaction and subscription fees. 
              Each level receives a percentage of the total fee based on their level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionStructure;