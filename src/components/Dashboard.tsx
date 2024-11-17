import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, ArrowRightLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PriceTicker from './PriceTicker';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 md:space-y-8">
      <PriceTicker />

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6">
          {t('dashboard.activity.title')}
        </h2>
        <div className="space-y-3 md:space-y-4">
          {[
            { type: 'received', amount: '100 USDC', from: '0x1234...5678', time: '2' },
            { type: 'sent', amount: '50 USDT', to: '0x8765...4321', time: '5' },
            { type: 'swapped', amount: '200 USDC → USDT', time: '1' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center">
                {activity.type === 'received' ? (
                  <ArrowDownRight className="h-5 w-5 md:h-6 md:w-6 text-green-500 mr-3 md:mr-4 flex-shrink-0" />
                ) : activity.type === 'sent' ? (
                  <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-red-500 mr-3 md:mr-4 flex-shrink-0" />
                ) : (
                  <ArrowRightLeft className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mr-3 md:mr-4 flex-shrink-0" />
                )}
                <div>
                  <p className="text-base md:text-lg font-medium text-gray-900">{activity.amount}</p>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {activity.type === 'received' 
                      ? `${t('dashboard.activity.from')}: ${activity.from}`
                      : activity.type === 'sent' 
                      ? `${t('dashboard.activity.to')}: ${activity.to}`
                      : t('dashboard.activity.swapped')}
                  </p>
                </div>
              </div>
              <span className="text-xs md:text-sm text-gray-500 ml-2">
                {activity.time === '1' 
                  ? t('dashboard.activity.timeAgo.days', { count: 1 })
                  : t('dashboard.activity.timeAgo.hours', { count: parseInt(activity.time) })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;