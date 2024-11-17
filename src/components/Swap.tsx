import React, { useState } from 'react';
import { ArrowDownUp, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAffiliate } from '../context/AffiliateContext';

const Swap: React.FC = () => {
  const { t } = useTranslation();
  const { calculateCommission } = useAffiliate();
  const [fromAmount, setFromAmount] = useState('');
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('CREDZ');

  const SWAP_FEE_RATE = 0.002; // 0.2%

  const calculateFee = (amount: number) => {
    return amount * SWAP_FEE_RATE;
  };

  const calculateToAmount = (amount: number) => {
    const fee = calculateFee(amount);
    return amount - fee;
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleSwap = () => {
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const fee = calculateFee(amount);
    // Process the swap fee through the affiliate system
    calculateCommission(fee, 'transaction', 'swap');

    // In a real implementation, you would:
    // 1. Execute the swap on the blockchain
    // 2. Deduct the total amount (including fee) from user's balance
    // 3. Send the fee to the smart contract for distribution
    alert('Swap functionality will be implemented');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 mb-8">
        <ArrowDownUp className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Swap</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {t('swap.from')}
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="w-32 p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            >
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="CREDZ">CREDZ</option>
            </select>
          </div>
          {fromAmount && (
            <div className="mt-2 text-sm text-gray-600">
              Swap Fee (0.2%): {calculateFee(parseFloat(fromAmount) || 0).toFixed(6)} {fromToken}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwapTokens}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {t('swap.to')}
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              value={fromAmount ? calculateToAmount(parseFloat(fromAmount)).toFixed(6) : ''}
              readOnly
              placeholder="0.00"
              className="flex-1 p-4 text-lg border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
            />
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="w-32 p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            >
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="CREDZ">CREDZ</option>
            </select>
          </div>
        </div>

        {fromAmount && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>{t('swap.rate')}</span>
              <span>1 {fromToken} = 0.99 {toToken}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Swap Fee (0.2%)</span>
              <span>{calculateFee(parseFloat(fromAmount) || 0).toFixed(6)} {fromToken}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>You'll Receive</span>
              <span>{calculateToAmount(parseFloat(fromAmount) || 0).toFixed(6)} {toToken}</span>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700">A 0.2% swap fee applies to all trades. This fee is used to maintain the platform and reward our affiliate partners.</p>
        </div>

        <button
          className="w-full bg-indigo-600 text-white text-lg font-medium p-4 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={handleSwap}
        >
          {t('swap.reviewSwap')}
        </button>
      </div>
    </div>
  );
};

export default Swap;