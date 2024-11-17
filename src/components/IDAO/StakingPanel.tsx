import React, { useState } from 'react';
import { Lock, Unlock, TrendingUp, DollarSign } from 'lucide-react';

const StakingPanel: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [stakingPeriod, setStakingPeriod] = useState('30');

  const stakingInfo = {
    totalStaked: 45000000,
    apr: 12.5,
    yourStake: 1000,
    pendingRewards: 25.5,
    lockPeriods: [
      { days: 30, multiplier: 1 },
      { days: 90, multiplier: 1.5 },
      { days: 180, multiplier: 2 },
      { days: 365, multiplier: 3 }
    ]
  };

  const calculateRewards = (amount: string, days: string) => {
    const numAmount = parseFloat(amount) || 0;
    const period = parseInt(days);
    const multiplier = stakingInfo.lockPeriods.find(p => p.days === period)?.multiplier || 1;
    return (numAmount * (stakingInfo.apr / 100) * multiplier * (period / 365)).toFixed(2);
  };

  return (
    <div className="space-y-8">
      {/* Staking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium text-gray-900">Total Staked</h4>
            <Lock className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stakingInfo.totalStaked.toLocaleString()} IDT
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium text-gray-900">Base APR</h4>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stakingInfo.apr}%</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-medium text-gray-900">Your Rewards</h4>
            <DollarSign className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stakingInfo.pendingRewards.toFixed(2)} IDT
          </p>
        </div>
      </div>

      {/* Staking Form */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Stake IDT</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Stake
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lock Period
            </label>
            <select
              value={stakingPeriod}
              onChange={(e) => setStakingPeriod(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            >
              {stakingInfo.lockPeriods.map((period) => (
                <option key={period.days} value={period.days} className="text-gray-900">
                  {period.days} days ({period.multiplier}x rewards)
                </option>
              ))}
            </select>
          </div>

          {amount && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lock Period:</span>
                <span className="text-gray-900">{stakingPeriod} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reward Multiplier:</span>
                <span className="text-gray-900">{stakingInfo.lockPeriods.find(p => p.days === parseInt(stakingPeriod))?.multiplier}x</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span className="text-gray-600">Estimated Rewards:</span>
                <span className="text-gray-900">{calculateRewards(amount, stakingPeriod)} IDT</span>
              </div>
            </div>
          )}

          <button
            className="w-full bg-indigo-600 text-white font-medium p-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Stake IDT
          </button>
        </div>
      </div>

      {/* Your Stakes */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Stakes</h3>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">Active Stake</h4>
                <p className="text-sm text-gray-500">Locked until {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{stakingInfo.yourStake} IDT</p>
                <p className="text-sm text-green-600">+{stakingInfo.pendingRewards} IDT earned</p>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-700">
              Claim Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingPanel;