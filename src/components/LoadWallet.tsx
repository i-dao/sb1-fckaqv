import React, { useState } from 'react';
import { CreditCard, DollarSign, AlertCircle, Calculator, ArrowRight, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const LoadWallet: React.FC = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('USDC');
  const [isProcessing, setIsProcessing] = useState(false);

  const cryptoOptions = [
    { symbol: 'USDC', name: 'USD Coin', price: 1.00 },
    { symbol: 'USDT', name: 'Tether', price: 1.00 },
    { symbol: 'BTC', name: 'Bitcoin', price: 67000.00 },
    { symbol: 'ETH', name: 'Ethereum', price: 3500.00 }
  ];

  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'USD',
          crypto: selectedCrypto
        }),
      });

      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateCryptoAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    const crypto = cryptoOptions.find(c => c.symbol === selectedCrypto);
    if (!crypto) return 0;
    return numAmount / crypto.price;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 mb-8">
        <CreditCard className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Buy Crypto with Card</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Cryptocurrency
          </label>
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          >
            {cryptoOptions.map(crypto => (
              <option key={crypto.symbol} value={crypto.symbol} className="text-gray-900">
                {crypto.symbol} - {crypto.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Amount (USD)
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
              USD
            </span>
          </div>
        </div>

        {amount && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">You'll Receive:</span>
              <span className="text-gray-900">
                {calculateCryptoAmount().toFixed(8)} {selectedCrypto}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Exchange Rate:</span>
              <span className="text-gray-900">
                1 {selectedCrypto} = ${cryptoOptions.find(c => c.symbol === selectedCrypto)?.price.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Purchase Information:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Minimum purchase: $10</li>
              <li>Maximum purchase: $50,000</li>
              <li>Instant delivery to your wallet</li>
              <li>All fees included in price</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handlePurchase}
          disabled={isProcessing || !amount || parseFloat(amount) <= 0}
          className="w-full bg-indigo-600 text-white text-lg font-medium p-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <Calculator className="animate-spin h-5 w-5 mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Buy {selectedCrypto}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LoadWallet;