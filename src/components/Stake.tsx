import React, { useState } from 'react';
import { PieChart, Lock } from 'lucide-react';

const Stake: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('USDC');

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 mb-8">
        <PieChart className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Stake Tokens</h2>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-indigo-900">USDC</span>
              <span className="text-indigo-600">APY: 5.2%</span>
            </div>
            <div className="text-sm text-indigo-700">
              <p>Min. Stake: 100 USDC</p>
              <p>Lock Period: 30 days</p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-green-900">USDT</span>
              <span className="text-green-600">APY: 4.8%</span>
            </div>
            <div className="text-sm text-green-700">
              <p>Min. Stake: 100 USDT</p>
              <p>Lock Period: 30 days</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Token
          </label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Amount to Stake
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {token}
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg flex items-start space-x-3">
          <Lock className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-800">
            Staked tokens will be locked for 30 days. Early withdrawal is not supported.
          </p>
        </div>

        <button
          className="w-full bg-indigo-600 text-white text-lg font-medium p-4 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => alert('Staking functionality will be implemented')}
        >
          Review Staking
        </button>
      </div>
    </div>
  );
};

export default Stake;