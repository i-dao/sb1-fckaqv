import React, { useState } from 'react';
import { Landmark, Building2, User, Plus, Copy, CreditCard } from 'lucide-react';

interface BankAccount {
  id: string;
  iban: string;
  type: string;
  balance: number;
  currency: string;
}

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

  const generateIBAN = () => {
    // This is a simplified example - in production, use a proper IBAN generation library
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Personal Section */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center space-x-3 mb-6">
          <User className="h-8 w-8 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900">My Private</h2>
        </div>

        <div className="space-y-4">
          {privateAccounts.map((account) => (
            <div key={account.id} className="border border-gray-200 rounded-lg p-6 hover:border-indigo-200 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{account.type} Account</h3>
                  <div className="mt-2 flex items-center space-x-2">
                    <code className="bg-gray-50 px-3 py-1 rounded-lg text-sm">{account.iban}</code>
                    <button
                      onClick={() => copyToClipboard(account.iban)}
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    €{account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-500">Available Balance</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Section */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">My Company</h2>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => createNewAccount('company')}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Company Account
            </button>
            <button
              onClick={() => createNewAccount('salary')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              New Salary Account
            </button>
          </div>
        </div>

        {companyAccounts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No company accounts yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {companyAccounts.map((account) => (
              <div key={account.id} className="border border-gray-200 rounded-lg p-6 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{account.type} Account</h3>
                    <div className="mt-2 flex items-center space-x-2">
                      <code className="bg-gray-50 px-3 py-1 rounded-lg text-sm">{account.iban}</code>
                      <button
                        onClick={() => copyToClipboard(account.iban)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
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
    </div>
  );
};

export default IMoney;