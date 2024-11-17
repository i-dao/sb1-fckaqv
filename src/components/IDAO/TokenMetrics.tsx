import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface TokenMetricsProps {
  metrics: {
    price: number;
    marketCap: number;
    totalSupply: number;
    circulatingSupply: number;
    tvl: number;
    apr: number;
    totalStaked: number;
    treasuryBalance: number;
  };
}

const TokenMetrics: React.FC<TokenMetricsProps> = ({ metrics }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium text-gray-900">Market Cap</h4>
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${(metrics.marketCap / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium text-gray-900">Total Supply</h4>
            <PieChart className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(metrics.totalSupply / 1000000).toFixed(1)}M IDT
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium text-gray-900">TVL</h4>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${(metrics.tvl / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Token Distribution */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Token Distribution</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Circulating Supply</span>
            <span className="font-medium">
              {((metrics.circulatingSupply / metrics.totalSupply) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${(metrics.circulatingSupply / metrics.totalSupply) * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600">Staked Tokens</span>
            <span className="font-medium">
              {((metrics.totalStaked / metrics.totalSupply) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${(metrics.totalStaked / metrics.totalSupply) * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600">Treasury</span>
            <span className="font-medium">
              {((metrics.treasuryBalance / metrics.totalSupply) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(metrics.treasuryBalance / metrics.totalSupply) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Token Metrics */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Price Performance</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Price</span>
                <span className="font-medium">${metrics.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-medium">${metrics.marketCap.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fully Diluted Value</span>
                <span className="font-medium">
                  ${(metrics.price * metrics.totalSupply).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Staking Metrics</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Value Locked</span>
                <span className="font-medium">${metrics.tvl.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current APR</span>
                <span className="font-medium">{metrics.apr}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Staked</span>
                <span className="font-medium">{metrics.totalStaked.toLocaleString()} IDT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treasury Overview */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Treasury Overview</h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Treasury Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics.treasuryBalance.toLocaleString()} IDT
              </p>
            </div>
            <div>
              <p className="text-gray-600">Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(metrics.treasuryBalance * metrics.price).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Treasury Allocation</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Development Fund</span>
                <span>30%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ecosystem Growth</span>
                <span>20%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Staking Rewards</span>
                <span>50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenMetrics;