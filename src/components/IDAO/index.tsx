import React, { useState } from 'react';
import { 
  Coins, 
  LineChart, 
  Vote, 
  Building2, 
  PiggyBank, 
  Lock, 
  BarChart3,
  DollarSign,
  TrendingUp,
  Users,
  Scale
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GovernancePanel from './GovernancePanel';
import StakingPanel from './StakingPanel';
import SavingsPool from './SavingsPool';
import VaultManager from './VaultManager';
import TokenMetrics from './TokenMetrics';

const IDAO: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'governance' | 'staking' | 'savings' | 'vaults' | 'metrics'>('governance');

  const tabs = [
    { id: 'governance', name: 'Governance', icon: Vote },
    { id: 'staking', name: 'Staking', icon: Lock },
    { id: 'savings', name: 'Savings Pools', icon: PiggyBank },
    { id: 'vaults', name: 'I-Stable Vaults', icon: Building2 },
    { id: 'metrics', name: 'Token Metrics', icon: BarChart3 }
  ];

  // Mock data for token metrics
  const tokenMetrics = {
    price: 2.45,
    marketCap: 245000000,
    totalSupply: 100000000,
    circulatingSupply: 65000000,
    tvl: 150000000,
    apr: 12.5,
    totalStaked: 45000000,
    treasuryBalance: 25000000
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'governance':
        return <GovernancePanel />;
      case 'staking':
        return <StakingPanel />;
      case 'savings':
        return <SavingsPool />;
      case 'vaults':
        return <VaultManager />;
      case 'metrics':
        return <TokenMetrics metrics={tokenMetrics} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Coins className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">I-DAO Governance</h2>
      </div>

      {/* Token Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">IDT Price</p>
              <p className="text-2xl font-bold text-gray-900">${tokenMetrics.price}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">TVL</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(tokenMetrics.tvl / 1000000).toFixed(1)}M
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Staked IDT</p>
              <p className="text-2xl font-bold text-gray-900">
                {((tokenMetrics.totalStaked / tokenMetrics.totalSupply) * 100).toFixed(1)}%
              </p>
            </div>
            <Lock className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">APR</p>
              <p className="text-2xl font-bold text-gray-900">{tokenMetrics.apr}%</p>
            </div>
            <Scale className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default IDAO;