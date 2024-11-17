import React, { useState } from 'react';
import { Plus, Eye, EyeOff, Trash2, Check, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ExchangeAPI {
  id: string;
  name: string;
  apiKey: string;
  apiSecret: string;
  addedDate: string;
}

const ExchangeApiSection: React.FC = () => {
  const { t } = useTranslation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [exchanges, setExchanges] = useState<ExchangeAPI[]>([]);
  const [newExchange, setNewExchange] = useState({
    name: '',
    apiKey: '',
    apiSecret: '',
  });
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({});

  const handleAddExchange = () => {
    if (newExchange.name && newExchange.apiKey && newExchange.apiSecret) {
      const exchange: ExchangeAPI = {
        id: Date.now().toString(),
        ...newExchange,
        addedDate: new Date().toISOString(),
      };
      setExchanges([...exchanges, exchange]);
      setNewExchange({ name: '', apiKey: '', apiSecret: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteExchange = (id: string) => {
    setExchanges(exchanges.filter(exchange => exchange.id !== id));
  };

  const toggleSecret = (id: string, type: 'key' | 'secret') => {
    setShowSecrets(prev => ({
      ...prev,
      [`${id}-${type}`]: !prev[`${id}-${type}`],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          {t('tax.exchanges.title', 'Exchange API Management')}
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('tax.exchanges.addExchange', 'Add Exchange')}
        </button>
      </div>

      {showAddForm && (
        <div className="border border-gray-200 rounded-lg p-6 space-y-4">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            {t('tax.exchanges.addNew', 'Add New Exchange')}
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('tax.exchanges.selectExchange', 'Exchange Name')}
            </label>
            <select
              value={newExchange.name}
              onChange={(e) => setNewExchange({ ...newExchange, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">{t('tax.exchanges.selectOption', 'Select Exchange')}</option>
              <option value="Binance">Binance</option>
              <option value="Coinbase">Coinbase</option>
              <option value="Kraken">Kraken</option>
              <option value="KuCoin">KuCoin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('tax.exchanges.apiKey', 'API Key')}
            </label>
            <input
              type="text"
              value={newExchange.apiKey}
              onChange={(e) => setNewExchange({ ...newExchange, apiKey: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder={t('tax.exchanges.enterApiKey', 'Enter API key')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('tax.exchanges.apiSecret', 'API Secret')}
            </label>
            <input
              type="password"
              value={newExchange.apiSecret}
              onChange={(e) => setNewExchange({ ...newExchange, apiSecret: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder={t('tax.exchanges.enterApiSecret', 'Enter API secret')}
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddExchange}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Check className="h-4 w-4 mr-2" />
              {t('common.save', 'Save')}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {t('common.cancel', 'Cancel')}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <div
            key={exchange.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h4 className="text-lg font-medium text-gray-900">{exchange.name}</h4>
                <span className="text-sm text-gray-500">
                  {t('tax.exchanges.addedOn', 'Added')} {new Date(exchange.addedDate).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleDeleteExchange(exchange.id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('tax.exchanges.apiKey', 'API Key')}:</span>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {showSecrets[`${exchange.id}-key`]
                      ? exchange.apiKey
                      : '••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => toggleSecret(exchange.id, 'key')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showSecrets[`${exchange.id}-key`] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('tax.exchanges.apiSecret', 'API Secret')}:</span>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {showSecrets[`${exchange.id}-secret`]
                      ? exchange.apiSecret
                      : '••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => toggleSecret(exchange.id, 'secret')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showSecrets[`${exchange.id}-secret`] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {exchanges.length === 0 && !showAddForm && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {t('tax.exchanges.noExchanges', 'No exchanges connected yet. Add an exchange to import your trading history.')}
          </p>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">{t('tax.exchanges.howTo', 'How to get API Keys')}:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('tax.exchanges.tip1', 'Use read-only API keys for enhanced security')}</li>
              <li>{t('tax.exchanges.tip2', 'Enable only trading history access')}</li>
              <li>{t('tax.exchanges.tip3', 'Disable trading and withdrawal permissions')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeApiSection;