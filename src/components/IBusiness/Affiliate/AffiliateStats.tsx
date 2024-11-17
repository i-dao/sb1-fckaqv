import React from 'react';
import { DollarSign, Users, TrendingUp, Clock, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAffiliate } from '../../../context/AffiliateContext';
import { CREDZ_REWARD_RATE } from '../../../types/affiliate';

// Demo data calculations:
// 1. Trading volume: $100,000
//    Fee: 0.2% = $200
//    Level 1 commission (50%): $100
//    CREDZ reward: $100 * 0.02 = 2 CREDZ
// 2. Company formations: 3 x $2,500 = $7,500
//    Level 1 commission (30%): $2,250
//    CREDZ reward: $2,250 * 0.02 = 45 CREDZ
// 3. Subscriptions: 10 users x $29 = $290
//    Level 1 commission (30%): $87
//    CREDZ reward: $87 * 0.02 = 1.74 CREDZ

const DEMO_STATS = {
  totalEarnings: 2437, // $100 (trading) + $2,250 (formations) + $87 (subscriptions)
  pendingEarnings: 587,
  paidEarnings: 1850,
  totalCredzRewards: 48.74, // 2 + 45 + 1.74 CREDZ
  pendingCredzRewards: 11.74,
  paidCredzRewards: 37,
  referrals: 10,
  conversionRate: 83.33, // 10 successful out of 12 attempts
  tradingVolume: 100000,
  companyFormations: 3,
};

const AffiliateStats: React.FC = () => {
  const { t } = useTranslation();

  const statCards = [
    {
      title: t('affiliate.stats.totalEarnings'),
      value: `€${DEMO_STATS.totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: t('affiliate.stats.pendingEarnings'),
      value: `€${DEMO_STATS.pendingEarnings.toFixed(2)}`,
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: t('affiliate.stats.credzRewards'),
      value: `${DEMO_STATS.totalCredzRewards.toFixed(2)} CREDZ`,
      icon: Coins,
      color: 'text-purple-600'
    },
    {
      title: t('affiliate.stats.totalReferrals'),
      value: DEMO_STATS.referrals,
      icon: Users,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`h-8 w-8 ${card.color}`} />
              <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Detailed Earnings Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings Breakdown</h3>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-green-800">Trading Volume Commission</span>
              <div className="text-right">
                <span className="font-bold text-green-800 block">€100.00</span>
                <span className="text-sm text-green-600">+2.00 CREDZ</span>
              </div>
            </div>
            <p className="text-sm text-green-700">
              Based on ${DEMO_STATS.tradingVolume.toLocaleString()} trading volume (0.2% fee, 50% commission)
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-800">Company Formation Commission</span>
              <div className="text-right">
                <span className="font-bold text-blue-800 block">€2,250.00</span>
                <span className="text-sm text-blue-600">+45.00 CREDZ</span>
              </div>
            </div>
            <p className="text-sm text-blue-700">
              {DEMO_STATS.companyFormations} formations x €2,500 (30% commission)
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-purple-800">Subscription Commission</span>
              <div className="text-right">
                <span className="font-bold text-purple-800 block">€87.00</span>
                <span className="text-sm text-purple-600">+1.74 CREDZ</span>
              </div>
            </div>
            <p className="text-sm text-purple-700">
              {DEMO_STATS.referrals} active subscribers x €29 (30% commission)
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-indigo-700">
              <Coins className="h-5 w-5" />
              <p className="text-sm">
                Earn {CREDZ_REWARD_RATE} CREDZ for every 1 USDT in commissions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateStats;