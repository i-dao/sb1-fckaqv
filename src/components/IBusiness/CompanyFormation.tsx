import React, { useState } from 'react';
import { Building, CreditCard, Wallet, CheckCircle2, Coins, Bitcoin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

interface CryptoPrice {
  btc: number;
  eth: number;
  usdt: number;
}

interface CompanyJurisdiction {
  country: string;
  corporateTax: string;
  personalTax: string;
  cryptoFriendly: boolean;
  price: number;
  credzPrice: number; // 20% discount
  cryptoPrice: CryptoPrice;
  features: string[];
}

const jurisdictions: CompanyJurisdiction[] = [
  {
    country: 'Cyprus',
    corporateTax: '12.5%',
    personalTax: '0-35%',
    cryptoFriendly: true,
    price: 2500,
    credzPrice: 2000,
    cryptoPrice: { btc: 0.05, eth: 0.8, usdt: 2500 },
    features: ['EU Member', 'Strong Banking', 'Crypto Regulations']
  },
  {
    country: 'Estonia',
    corporateTax: '20%',
    personalTax: '20%',
    cryptoFriendly: true,
    price: 2500,
    credzPrice: 2000,
    cryptoPrice: { btc: 0.05, eth: 0.8, usdt: 2500 },
    features: ['Digital Nation', 'E-Residency', 'Crypto License Available']
  },
  {
    country: 'Bulgaria',
    corporateTax: '10%',
    personalTax: '10%',
    cryptoFriendly: true,
    price: 2500,
    credzPrice: 2000,
    cryptoPrice: { btc: 0.05, eth: 0.8, usdt: 2500 },
    features: ['EU Member', 'Low Tax Rate', 'Growing Tech Hub']
  },
  {
    country: 'British Virgin Islands',
    corporateTax: '0%',
    personalTax: '0%',
    cryptoFriendly: true,
    price: 2500,
    credzPrice: 2000,
    cryptoPrice: { btc: 0.05, eth: 0.8, usdt: 2500 },
    features: ['Tax Neutral', 'Privacy', 'Common Law']
  },
  {
    country: 'Barbados',
    corporateTax: '1-5.5%',
    personalTax: '0%',
    cryptoFriendly: true,
    price: 2500,
    credzPrice: 2000,
    cryptoPrice: { btc: 0.05, eth: 0.8, usdt: 2500 },
    features: ['Digital Asset Framework', 'Tax Treaties', 'Stable Government']
  },
  {
    country: 'Panama',
    corporateTax: '25%',
    personalTax: '0%',
    cryptoFriendly: true,
    price: 2500,
    credzPrice: 2000,
    cryptoPrice: { btc: 0.05, eth: 0.8, usdt: 2500 },
    features: ['Territorial Tax', 'Banking Privacy', 'Crypto Friendly']
  },
  {
    country: 'Belize',
    corporateTax: '0%',
    personalTax: '0%',
    cryptoFriendly: true,
    price: 2500,
    credzPrice: 2000,
    cryptoPrice: { btc: 0.05, eth: 0.8, usdt: 2500 },
    features: ['Tax Free', 'Quick Setup', 'Privacy']
  },
  {
    country: 'Cayman Islands',
    corporateTax: '0%',
    personalTax: '0%',
    cryptoFriendly: true,
    price: 3000,
    credzPrice: 2400,
    cryptoPrice: { btc: 0.06, eth: 0.95, usdt: 3000 },
    features: ['Tax Neutral', 'Financial Hub', 'Strong Privacy Laws']
  },
  {
    country: 'Bermuda',
    corporateTax: '0%',
    personalTax: '0%',
    cryptoFriendly: true,
    price: 3000,
    credzPrice: 2400,
    cryptoPrice: { btc: 0.06, eth: 0.95, usdt: 3000 },
    features: ['Digital Asset Framework', 'Regulatory Clarity', 'Business Friendly']
  },
  {
    country: 'Isle of Man',
    corporateTax: '0%',
    personalTax: '20%',
    cryptoFriendly: true,
    price: 2800,
    credzPrice: 2240,
    cryptoPrice: { btc: 0.055, eth: 0.9, usdt: 2800 },
    features: ['Crypto Regulated', 'EU Access', 'Strong Infrastructure']
  },
  {
    country: 'Jersey',
    corporateTax: '0%',
    personalTax: '20%',
    cryptoFriendly: true,
    price: 2800,
    credzPrice: 2240,
    cryptoPrice: { btc: 0.055, eth: 0.9, usdt: 2800 },
    features: ['Financial Center', 'Tax Benefits', 'Stable Economy']
  },
  {
    country: 'Guernsey',
    corporateTax: '0%',
    personalTax: '20%',
    cryptoFriendly: true,
    price: 2800,
    credzPrice: 2240,
    cryptoPrice: { btc: 0.055, eth: 0.9, usdt: 2800 },
    features: ['Asset Protection', 'Financial Services', 'Business Friendly']
  },
  {
    country: 'Hong Kong',
    corporateTax: '16.5%',
    personalTax: '15%',
    cryptoFriendly: true,
    price: 2600,
    credzPrice: 2080,
    cryptoPrice: { btc: 0.052, eth: 0.85, usdt: 2600 },
    features: ['Asian Hub', 'International Trade', 'Modern Infrastructure']
  },
  {
    country: 'Singapore',
    corporateTax: '17%',
    personalTax: '22%',
    cryptoFriendly: true,
    price: 2600,
    credzPrice: 2080,
    cryptoPrice: { btc: 0.052, eth: 0.85, usdt: 2600 },
    features: ['Tech Hub', 'Strong Economy', 'Strategic Location']
  }
];

const CompanyFormation: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'credz' | 'crypto'>('card');
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth' | 'usdt'>('btc');

  const handlePurchase = async (jurisdiction: CompanyJurisdiction) => {
    try {
      switch (paymentMethod) {
        case 'card': {
          const stripe = await stripePromise;
          if (!stripe) throw new Error('Stripe failed to load');

          const response = await fetch('/api/create-payment-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jurisdiction: jurisdiction.country,
              amount: jurisdiction.price,
            }),
          });

          const session = await response.json();
          await stripe.redirectToCheckout({ sessionId: session.id });
          break;
        }
        case 'credz':
          // Handle CREDZ payment
          alert(`Processing CREDZ payment of ${jurisdiction.credzPrice} EUR`);
          break;
        case 'crypto':
          // Handle crypto payment
          alert(`Processing ${selectedCrypto.toUpperCase()} payment`);
          break;
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Company Formation</h2>
      </div>

      {/* i-Wallet & Virtual IBAN Info Box */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-start space-x-4">
          <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Included with Every Formation</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-green-800">i-Wallet Integration</p>
                <p className="text-green-700 text-sm">Secure multi-currency digital wallet with instant transfers, crypto support, and integrated payment solutions.</p>
              </div>
              <div>
                <p className="font-medium text-green-800">Secure Virtual IBAN Account</p>
                <p className="text-green-700 text-sm">Dedicated Offshore virtual IBAN account for seamless international banking, supporting SEPA transfers and global transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jurisdictions.map((jurisdiction) => (
          <div
            key={jurisdiction.country}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {jurisdiction.country}
              </h3>
              {jurisdiction.cryptoFriendly && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Crypto Friendly
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Corporate Tax Rate</p>
                <p className="text-lg font-semibold">{jurisdiction.corporateTax}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Personal Income Tax</p>
                <p className="text-lg font-semibold">{jurisdiction.personalTax}</p>
              </div>

              <ul className="space-y-2">
                {jurisdiction.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-indigo-600">
                    €{jurisdiction.price.toLocaleString()}
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    €{jurisdiction.credzPrice.toLocaleString()} with CREDZ
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setPaymentMethod('card');
                      handlePurchase(jurisdiction);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Card</span>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('credz');
                      handlePurchase(jurisdiction);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Coins className="h-5 w-5" />
                    <span>CREDZ</span>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('crypto');
                      handlePurchase(jurisdiction);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Wallet className="h-5 w-5" />
                    <span>Crypto</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyFormation;