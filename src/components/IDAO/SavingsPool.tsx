import React, { useState } from 'react';
import { PiggyBank, Lock, Unlock, AlertCircle } from 'lucide-react';

const SavingsPool: React.FC = () => {
  const [collateralAmount, setCollateralAmount] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  const vaultInfo = {
    collateralTypes: [
      { symbol: 'ETH', ratio: 150, price: 3000 },
      { symbol: 'BTC', ratio: 150, price: 45000 },
      { symbol: 'USDC', ratio: 110, price: 1 }
    ],
    yourVaults: [
      {
        id: '1',
        collateral: { type: 'ETH', amount: 1 },
        debt: 1500,
        ratio: 200
      }
    ],
    stabilityFee: 0.5, // 0.5% annual
    minCollateralRatio: 150 // 150%
  };

  const calculateMaxMint = (amount: string, collateralType: string) => {
    const collateral = vaultInfo.collateralTypes.find(c => c.symbol === collateralType);
    if (!collateral) return 0;
    
    const value = parseFloat(amount) * collateral.price;
    return (value * 100 / vaultInfo.minCollateralRatio).toFixed(2);
  };

  return (
    <div className="space-y-8">
      {/* Create Vault */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Create New Vault</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Collateral Type
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            >
              {vaultInfo.collateralTypes.map((type) => (
                <option key={type.symbol} value={type.symbol} className="text-gray-900">
                  {type.symbol} (Min Ratio: {type.ratio}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collateral Amount
            </label>
            <input
              type="number"
              value={collateralAmount}
              onChange={(e) => setCollateralAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I-Stable to Mint
            </label>
            <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
              placeholder="Enter amount"
            />
          </div>

          {collateralAmount && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Maximum I-Stable:</span>
                <span className="text-gray-900">${calculateMaxMint(collateralAmount, 'ETH')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Collateral Ratio:</span>
                <span className="text-gray-900">
                  {mintAmount ? 
                    ((parseFloat(collateralAmount) * 3000 / parseFloat(mintAmount)) * 100).toFixed(0) 
                    : '∞'}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Stability Fee:</span>
                <span className="text-gray-900">{vaultInfo.stabilityFee}% Annual</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-700">
              Maintain a collateral ratio above {vaultInfo.minCollateralRatio}% to avoid liquidation.
              Stability fees are paid in IDT tokens.
            </p>
          </div>

          <button className="w-full bg-indigo-600 text-white font-medium p-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Create Vault
          </button>
        </div>
      </div>

      {/* Your Vaults */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Vaults</h3>
        
        <div className="space-y-4">
          {vaultInfo.yourVaults.map((vault) => (
            <div key={vault.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Collateral</p>
                  <p className="font-medium text-gray-900">
                    {vault.collateral.amount} {vault.collateral.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Debt</p>
                  <p className="font-medium text-gray-900">${vault.debt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collateral Ratio</p>
                  <p className={`font-medium ${
                    vault.ratio < 180 ? 'text-red-600' : 
                    vault.ratio < 200 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {vault.ratio}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-green-600">Safe</p>
                </div>
              </div>

              <div className="mt-4 flex space-x-4">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Add Collateral
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Repay Debt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingsPool;