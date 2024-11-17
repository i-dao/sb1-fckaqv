import React from 'react';
import { ArrowRight, DollarSign, Building2, Users, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAffiliate } from '../../../context/AffiliateContext';

// Demo transactions
const DEMO_EARNINGS = [
  {
    id: '1',
    amount: 750,
    credzReward: 15,
    type: 'company_formation',
    description: 'Company Formation Commission - Cyprus',
    timestamp: '2024-03-15T10:30:00Z',
    status: 'paid',
    level: 1
  },
  {
    id: '2',
    amount: 750,
    credzReward: 15,
    type: 'company_formation',
    description: 'Company Formation Commission - Estonia',
    timestamp: '2024-03-14T15:45:00Z',
    status: 'paid',
    level: 1
  },
  {
    id: '3',
    amount: 750,
    credzReward: 15,
    type: 'company_formation',
    description: 'Company Formation Commission - BVI',
    timestamp: '2024-03-13T09:20:00Z',
    status: 'pending',
    level: 1
  },
  {
    id: '4',
    amount: 100,
    credzReward: 2,
    type: 'trading',
    description: 'Trading Volume Commission',
    timestamp: '2024-03-12T14:15:00Z',
    status: 'pending',
    level: 1
  },
  {
    id: '5',
    amount: 87,
    credzReward: 1.74,
    type: 'subscription',
    description: 'Monthly Subscription Commissions (10 users)',
    timestamp: '2024-03-11T11:00:00Z',
    status: 'pending',
    level: 1
  }
];

const AffiliateDashboard: React.FC = () => {
  const { t } = useTranslation();

  const getIcon = (type: string) => {
    switch (type) {
      case 'company_formation':
        return Building2;
      case 'subscription':
        return Users;
      default:
        return DollarSign;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'company_formation':
        return 'text-blue-600';
      case 'subscription':
        return 'text-purple-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {t('affiliate.dashboard.recentEarnings', 'Recent Earnings')}
        </h3>
        <button
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {t('affiliate.dashboard.requestPayout', 'Request Payout')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {DEMO_EARNINGS.map((earning) => {
          const Icon = getIcon(earning.type);
          return (
            <div
              key={earning.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getTypeColor(earning.type)} bg-opacity-10`}>
                  <Icon className={`h-6 w-6 ${getTypeColor(earning.type)}`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">
                      €{earning.amount.toFixed(2)}
                    </p>
                    <div className="flex items-center text-indigo-600 text-sm">
                      <Coins className="h-4 w-4 mr-1" />
                      <span>+{earning.credzReward.toFixed(2)} CREDZ</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {earning.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(earning.timestamp).toLocaleDateString()} • Level {earning.level}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                earning.status === 'paid' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {earning.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AffiliateDashboard;