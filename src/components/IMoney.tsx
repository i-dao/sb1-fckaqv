import React, { useState } from 'react';
import { Landmark, Building2, User, Plus, Copy, CreditCard, ArrowRightLeft, AlertCircle } from 'lucide-react';

interface BankAccount {
  id: string;
  iban: string;
  type: string;
  balance: number;
  currency: string;
}

interface SwapModalProps {
  balance: number;
  onClose: () => void;
  onSwap: (amount: number, crypto: string) => void;
}

const SwapModal: React.FC<SwapModalProps> = ({ balance, onClose, onSwap }) => {
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('USDC');
  
  const cryptoOptions = [
    { symbol: 'USDC', rate: 1 },
    { symbol: 'USDT', rate: 1 },
    { symbol: 'BTC', rate: 0.000024 }, // Example rate: 1 EUR ≈ 0.000024 BTC
    { symbol: 'ETH', rate: 0.00041 }   // Example rate: 1 EUR ≈ 0.00041 ETH
  ];

  const handleSwap = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= balance) {
      onSwap(numAmount, selectedCrypto);
      onClose();
    }
  };

  const getEstimatedCrypto = () => {
    const numAmount = parseFloat(amount) || 0;
    const rate = cryptoOptions.find(c => c.symbol === selectedCrypto)?.rate || 1;
    return (numAmount * rate).toFixed(selectedCrypto === 'USDC' || selectedCrypto === 'USDT' ? 2 : 8);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Swap EUR to Crypto</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (EUR)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={balance}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
            />
            <p className="text-sm text-gray-500 mt-1">Available: €{balance.toFixed(2)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Crypto</label>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {cryptoOptions.map(option => (
                <option key={option.symbol} value={option.symbol}>{option.symbol}</option>
              ))}
            </select>
          </div>

          {amount && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">You will receive approximately:</p>
              <p className="text-lg font-semibold text-gray-900">
                {getEstimatedCrypto()} {selectedCrypto}
              </p>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-700">
              Rates are approximate and will be finalized at the time of swap.
              A 0.2% service fee applies to all swaps.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSwap}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              Swap Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IMoney: React.FC = () => {
  const [privateAccounts, setPrivateAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      iban: 'DE89 3704 0044 0532 0130 00',
      type: 'Personal',
      balance: 5000.00,
      currency: 'EUR'
    }
  ]);

  const [companyAccounts, setCompanyAccounts] = useState<BankAccount[]>([]);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  const generateIBAN = () => {
    const countryCode = 'DE';
    const bankCode = '37040044';
    const accountNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return `${countryCode}89 ${bankCode.match(/.{1,4}/g)?.join(' ')} ${accountNumber.match(/.{1,4}/g)?.join(' ')}`;
  };

  const createNewAccount = (type: 'company' | 'salary') => {
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      iban: generateIBAN(),
      type: type === 'company' ? 'Company' : 'Salary',
      balance: 0,
      currency: 'EUR'
    };
    setCompanyAccounts([...companyAccounts, newAccount]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('IBAN copied to clipboard!');
  };

  const handleSwap = (amount: number, crypto: string) => {
    if (selectedAccount) {
      // In a real app, this would call your backend to process the swap
      const updatedAccounts = privateAccounts.map(account => {
        if (account.id === selectedAccount.id) {
          return {
            ...account,
            balance: account.balance - amount
          };
        }
        return account;
      });
      setPrivateAccounts(updatedAccounts);
      alert(`Successfully swapped €${amount} to ${crypto}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Personal Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <User className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">My Private</h2>
        </div>

        <div className="space-y-4">
          {privateAccounts.map((account) => (
            <div key={account.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:border-indigo-200 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-base md:text-lg font-medium text-gray-900">{account.type} Account</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <code className="bg-gray-50 px-2 py-1 md:px-3 text-xs md:text-sm rounded-lg break-all">{account.iban}</code>
                    <button
                      onClick={() => copyToClipboard(account.iban)}
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    €{account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <button
                    onClick={() => {
                      setSelectedAccount(account);
                      setShowSwapModal(true);
                    }}
                    className="mt-2 flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-1" />
                    Swap to Crypto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <Building2 className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">My Company</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => createNewAccount('company')}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Company Account
            </button>
            <button
              onClick={() => createNewAccount('salary')}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              New Salary Account
            </button>
          </div>
        </div>

        {companyAccounts.length === 0 ? (
          <div className="text-center py-8 md:py-12 bg-gray-50 rounded-lg">
            <Building2 className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No company accounts yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {companyAccounts.map((account) => (
              <div key={account.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:border-indigo-200 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-gray-900">{account.type} Account</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <code className="bg-gray-50 px-2 py-1 md:px-3 text-xs md:text-sm rounded-lg break-all">{account.iban}</code>
                      <button
                        onClick={() => copyToClipboard(account.iban)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xl md:text-2xl font-bold text-gray-900">
                      €{account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500">Available Balance</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showSwapModal && selectedAccount && (
        <SwapModal
          balance={selectedAccount.balance}
          onClose={() => {
            setShowSwapModal(false);
            setSelectedAccount(null);
          }}
          onSwap={handleSwap}
        />
      )}
    </div>
  );
};

export default IMoney;