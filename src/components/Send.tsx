import React, { useState } from 'react';
import { Send as SendIcon, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAffiliate } from '../context/AffiliateContext';

const Send: React.FC = () => {
  const { t } = useTranslation();
  const { calculateCommission } = useAffiliate();
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [token, setToken] = useState('USDC');

  const transactionFeeRate = 0.002; // 0.2%

  const calculateFee = (value: number) => {
    return value * transactionFeeRate;
  };

  const handleSend = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const fee = calculateFee(numericAmount);
    const totalAmount = numericAmount + fee;

    // Process the transaction fee through the affiliate system
    calculateCommission(fee, 'transaction', address);

    // In a real implementation, you would:
    // 1. Send the transaction to the blockchain
    // 2. Deduct the total amount (including fee) from user's balance
    // 3. Send the fee to the smart contract for distribution
    alert('Transaction will be implemented');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 mb-8">
        <SendIcon className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{t('send.title')}</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {t('send.selectToken')}
          </label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          >
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {t('send.amount')}
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {token}
            </span>
          </div>
          {amount && (
            <div className="mt-2 text-sm text-gray-600">
              Transaction Fee (0.2%): {calculateFee(parseFloat(amount) || 0).toFixed(6)} {token}
            </div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {t('send.recipientAddress')}
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>

        {amount && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span>{parseFloat(amount).toFixed(6)} {token}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Network Fee:</span>
              <span>{calculateFee(parseFloat(amount) || 0).toFixed(6)} {token}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total:</span>
              <span>
                {(parseFloat(amount) + calculateFee(parseFloat(amount) || 0)).toFixed(6)} {token}
              </span>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700">{t('send.warning')}</p>
        </div>

        <button
          onClick={handleSend}
          className="w-full bg-indigo-600 text-white text-lg font-medium p-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {t('send.reviewTransaction')}
        </button>
      </div>
    </div>
  );
};

export default Send;