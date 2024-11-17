import React, { useState } from 'react';
import { 
  Shield, Wallet, Bot, Building2, Receipt, Landmark, 
  ArrowRight, LogIn, UserPlus, AlertCircle, TrendingUp, 
  DollarSign, Coins, CheckCircle2, CreditCard, Rocket,
  Download, PieChart, Activity, TrendingDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface IBoostTier {
  apr: number;
  price: number;
  features: string[];
}

const iBoostTiers: IBoostTier[] = [
  {
    apr: 5,
    price: 29,
    features: [
      'Basic APR boost to 5%',
      'Priority support',
      'Basic trading features'
    ]
  },
  {
    apr: 10,
    price: 49,
    features: [
      'Enhanced APR boost to 10%',
      'Premium support',
      'Advanced trading features',
      'Reduced fees'
    ]
  },
  {
    apr: 20,
    price: 69,
    features: [
      'Maximum APR boost to 20%',
      'VIP support',
      'Elite trading features',
      'Lowest fees',
      'Exclusive market insights'
    ]
  }
];

const Balance: React.FC = () => {
  const { t } = useTranslation();
  const [isIBoostSubscribed, setIsIBoostSubscribed] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<IBoostTier | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'credz'>('card');

  const cryptoBalances = [
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.5432, value: 23456.78, change: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', balance: 4.3210, value: 8765.43, change: -1.2 },
    { symbol: 'USDT', name: 'Tether', balance: 10000.00, value: 10000.00, change: 0.1 },
    { symbol: 'USDC', name: 'USD Coin', balance: 5000.00, value: 5000.00, change: 0.0 },
    { 
      symbol: 'CREDZ', 
      name: 'CREDZ Token', 
      balance: 10000.00, 
      value: 15000.00, 
      change: 1.0,
      apr: isIBoostSubscribed ? 5.0 : 1.0,
      isStaking: true
    }
  ];

  const fiatBalances = [
    { currency: 'USD', balance: 15000.00, name: 'US Dollar', symbol: '$' },
    { currency: 'EUR', balance: 12000.00, name: 'Euro', symbol: '€' },
    { currency: 'GBP', balance: 8000.00, name: 'British Pound', symbol: '£' }
  ];

  const totalValue = [...cryptoBalances, ...fiatBalances].reduce(
    (acc, curr) => acc + ('value' in curr ? curr.value : curr.balance),
    0
  );

  const handleIBoostSubscribe = async () => {
    if (!selectedTier) return;

    try {
      if (paymentMethod === 'credz') {
        alert('Processing CREDZ payment for iBoost subscription');
      } else {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');
        if (!stripe) throw new Error('Stripe failed to load');

        const response = await fetch('/api/create-iboost-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier: selectedTier.apr,
            price: selectedTier.price
          }),
        });

        const session = await response.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  const downloadStatement = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Monthly Statement', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);

    // Add balances table
    const balancesData = cryptoBalances.map(balance => [
      balance.name,
      balance.balance.toFixed(4),
      `$${balance.value.toFixed(2)}`,
      `${balance.change}%`
    ]);

    doc.autoTable({
      startY: 40,
      head: [['Asset', 'Balance', 'Value (USD)', 'Change (24h)']],
      body: balancesData
    });

    // Add commission statements
    doc.text('Commission Statements', 20, doc.autoTable.previous.finalY + 20);
    
    const commissionsData = [
      ['Trading Commission', '$100.00', '2.00 CREDZ'],
      ['Formation Commission', '$2,250.00', '45.00 CREDZ'],
      ['Subscription Commission', '$87.00', '1.74 CREDZ']
    ];

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 30,
      head: [['Type', 'Amount', 'CREDZ Reward']],
      body: commissionsData
    });

    // Add total value
    doc.text(`Total Portfolio Value: $${totalValue.toFixed(2)}`, 20, doc.autoTable.previous.finalY + 20);

    // Save the PDF
    doc.save('monthly-statement.pdf');
  };

  return (
    <div className="space-y-8">
      {/* Total Balance Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Wallet className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white">{t('wallet.totalBalance')}</h2>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Refresh Balance"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <div className="text-4xl font-bold text-white mb-2">
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>

      {/* CREDZ Token Card */}
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Coins className="h-8 w-8 text-blue-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">CREDZ Token</h3>
              <p className="text-blue-400">Native Platform Token</p>
            </div>
          </div>
          {!isIBoostSubscribed && (
            <button
              onClick={() => setShowSubscribeModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              <Rocket className="h-5 w-5" />
              <span>Get iBoost</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
            <p className="text-sm text-blue-300 mb-1">Balance</p>
            <p className="text-2xl font-bold text-white">10,000 CREDZ</p>
            <p className="text-sm text-blue-300">≈ $15,000.00</p>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
            <p className="text-sm text-blue-300 mb-1">Staking APR</p>
            <p className="text-2xl font-bold text-white">{isIBoostSubscribed ? '5.0%' : '1.0%'}</p>
            {!isIBoostSubscribed && (
              <button
                onClick={() => setShowSubscribeModal(true)}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center mt-1"
              >
                Boost to 5% <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            )}
          </div>

          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
            <p className="text-sm text-blue-300 mb-1">24h Change</p>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-400 mr-1" />
              <p className="text-2xl font-bold text-white">+1.0%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Crypto Assets */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Coins className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Other Crypto Assets</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cryptoBalances.filter(crypto => crypto.symbol !== 'CREDZ').map((crypto) => (
            <div key={crypto.symbol} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:border-blue-500/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 p-2 rounded-lg">
                  <Coins className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{crypto.name}</p>
                  <p className="text-sm text-gray-400">
                    {crypto.balance.toLocaleString()} {crypto.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  ${crypto.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className={`text-sm flex items-center justify-end ${
                  crypto.change > 0 ? 'text-green-400' : crypto.change < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {crypto.change > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : crypto.change < 0 ? (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  ) : null}
                  {crypto.change > 0 ? '+' : ''}{crypto.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fiat Balances */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Landmark className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">{t('wallet.fiatBalance')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fiatBalances.map((fiat) => (
            <div key={fiat.currency} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:border-blue-500/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{fiat.name}</p>
                  <p className="text-sm text-gray-400">{fiat.currency}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">
                  {fiat.symbol}{fiat.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Statement Button */}
      <div className="flex justify-end">
        <button
          onClick={downloadStatement}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Monthly Statement
        </button>
      </div>

      {/* iBoost Subscription Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">iBoost Subscription</h3>
            </div>

            <div className="space-y-6">
              {iBoostTiers.map((tier) => (
                <div
                  key={tier.apr}
                  className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    selectedTier?.apr === tier.apr
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-700 hover:border-blue-500/50'
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-white">{tier.apr}% APR</h4>
                    <span className="text-xl font-bold text-white">€{tier.price}/month</span>
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <CreditCard className="h-6 w-6 text-blue-400" />
                    <span className="text-white">Pay with Card</span>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('credz')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === 'credz'
                      ? 'border-purple-500 bg-purple-900/20'
                      : 'border-gray-700 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Coins className="h-6 w-6 text-purple-400" />
                    <span className="text-white">Pay with CREDZ</span>
                  </div>
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSubscribeModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIBoostSubscribe}
                  disabled={!selectedTier}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Balance;