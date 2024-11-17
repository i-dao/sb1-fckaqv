import React from 'react';
import { Users, DollarSign, Calendar, Wallet, ArrowRight, TrendingUp, Percent, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAffiliate } from '../../context/AffiliateContext';
import { COMMISSION_RATES, SERVICE_FEES } from '../../types/affiliate';

const AffiliateDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { stats, earnings, requestPayout } = useAffiliate();

  const handlePayout = async () => {
    const success = await requestPayout();
    if (success) {
      alert(t('ibusiness.affiliate.payoutSuccess'));
    } else {
      alert(t('ibusiness.affiliate.payoutError'));
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">
              {t('ibusiness.dashboard.totalEarnings')}
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            €{stats.totalEarnings.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Wallet className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">
              {t('ibusiness.dashboard.pendingEarnings')}
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            €{stats.pendingEarnings.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-medium text-gray-900">
              {t('ibusiness.dashboard.paidEarnings')}
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            €{stats.paidEarnings.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('ibusiness.dashboard.commissionStructure')}
            </h3>
          </div>
          {stats.pendingEarnings > 0 && (
            <button
              onClick={handlePayout}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('ibusiness.dashboard.requestPayout')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Multi-Level Commission Structure */}
          <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
            <div className="flex items-center space-x-2 mb-4">
              <Percent className="h-5 w-5 text-indigo-600" />
              <h4 className="text-lg font-semibold text-gray-900">
                {t('ibusiness.dashboard.multiLevelCommission')}
              </h4>
            </div>
            <div className="space-y-3">
              {COMMISSION_RATES.map((rate) => (
                <div
                  key={rate.level}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-indigo-100 transition-transform hover:scale-102"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">L{rate.level}</span>
                    </div>
                    <span className="text-gray-700">{t('ibusiness.dashboard.level')} {rate.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-indigo-600">{rate.percentage}%</span>
                    <span className="text-sm text-gray-500">{t('ibusiness.dashboard.commission')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Fees and Commission Distribution */}
          <div className="space-y-6">
            {/* Transaction Fee Structure */}
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">
                  {t('ibusiness.dashboard.transactionFeeStructure')}
                </h4>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-green-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">{t('ibusiness.dashboard.fee')}</span>
                    <span className="text-xl font-bold text-green-600">0.02%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('ibusiness.dashboard.affiliateShare')}</span>
                    <span className="text-sm font-medium text-green-600">30%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Fee Structure */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <h4 className="text-lg font-semibold text-gray-900">
                  {t('ibusiness.dashboard.subscriptionFeeStructure')}
                </h4>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">{t('ibusiness.dashboard.monthlyFee')}</span>
                    <span className="text-xl font-bold text-blue-600">€66</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('ibusiness.dashboard.affiliateShare')}</span>
                    <span className="text-sm font-medium text-blue-600">30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Earnings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {t('ibusiness.dashboard.recentEarnings')}
        </h3>
        <div className="space-y-4">
          {earnings.slice(0, 5).map((earning) => (
            <div key={earning.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-indigo-200 transition-colors">
              <div>
                <p className="font-medium text-gray-900">
                  €{earning.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(earning.timestamp).toLocaleDateString()} • Level {earning.level}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                earning.status === 'paid' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {earning.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;