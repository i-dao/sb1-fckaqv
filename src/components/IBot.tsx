import React, { useState } from 'react';
import { 
  Bot, Plus, Trash2, Eye, EyeOff, Check, TrendingUp, 
  DollarSign, Activity, Clock, ArrowUpRight, ArrowDownRight,
  X, Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ExchangeKey {
  id: string;
  name: string;
  apiKey: string;
  apiSecret: string;
}

interface OpenDeal {
  id: string;
  pair: string;
  entryPrice: number;
  currentPrice: number;
  profit: number;
  time: string;
  type: 'long' | 'short';
  strategy: string;
}

interface ExchangeBot {
  id: string;
  exchange: string;
  totalProfit: number;
  dailyProfit: number;
  trades: OpenDeal[];
  strategies: string[];
}

const AVAILABLE_STRATEGIES = [
  'RSI +29min & DCA',
  'MACD Cross & DCA',
  'EMA Cross (50/200)',
  'Bollinger Bands Bounce',
  'Support/Resistance Breakout',
  'Volume Profile & DCA'
];

const IBot: React.FC = () => {
  const { t } = useTranslation();
  const [exchangeKeys, setExchangeKeys] = useState<ExchangeKey[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddStrategy, setShowAddStrategy] = useState<string | null>(null);
  const [newStrategy, setNewStrategy] = useState('');
  const [newExchange, setNewExchange] = useState({
    name: '',
    apiKey: '',
    apiSecret: '',
  });
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({});

  // Demo exchange bots data with multiple strategies
  const [exchangeBots, setExchangeBots] = useState<ExchangeBot[]>([
    {
      id: '1',
      exchange: 'Binance',
      totalProfit: 8.45,
      dailyProfit: 2.34,
      strategies: ['RSI +29min & DCA', 'MACD Cross & DCA'],
      trades: [
        {
          id: '1',
          pair: 'BTC/USDT',
          entryPrice: 45000,
          currentPrice: 45900,
          profit: 2.0,
          time: '2 hours ago',
          type: 'long',
          strategy: 'RSI +29min & DCA'
        },
        {
          id: '2',
          pair: 'ETH/USDT',
          entryPrice: 2800,
          currentPrice: 2750,
          profit: -1.8,
          time: '45 minutes ago',
          type: 'short',
          strategy: 'MACD Cross & DCA'
        },
        {
          id: '3',
          pair: 'SOL/USDT',
          entryPrice: 98.5,
          currentPrice: 101.2,
          profit: 2.7,
          time: '15 minutes ago',
          type: 'long',
          strategy: 'RSI +29min & DCA'
        }
      ]
    },
    {
      id: '2',
      exchange: 'Kraken',
      totalProfit: 6.82,
      dailyProfit: 1.76,
      strategies: ['EMA Cross (50/200)', 'Support/Resistance Breakout'],
      trades: [
        {
          id: '4',
          pair: 'BTC/USD',
          entryPrice: 44800,
          currentPrice: 45200,
          profit: 0.89,
          time: '1 hour ago',
          type: 'long',
          strategy: 'EMA Cross (50/200)'
        },
        {
          id: '5',
          pair: 'ETH/USD',
          entryPrice: 2750,
          currentPrice: 2800,
          profit: 1.82,
          time: '30 minutes ago',
          type: 'long',
          strategy: 'Support/Resistance Breakout'
        }
      ]
    },
    {
      id: '3',
      exchange: 'KuCoin',
      totalProfit: 5.23,
      dailyProfit: 1.45,
      strategies: ['Bollinger Bands Bounce', 'Volume Profile & DCA'],
      trades: [
        {
          id: '6',
          pair: 'BTC/USDT',
          entryPrice: 44900,
          currentPrice: 45100,
          profit: 0.45,
          time: '3 hours ago',
          type: 'long',
          strategy: 'Bollinger Bands Bounce'
        },
        {
          id: '7',
          pair: 'ETH/USDT',
          entryPrice: 2780,
          currentPrice: 2820,
          profit: 1.44,
          time: '1 hour ago',
          type: 'long',
          strategy: 'Volume Profile & DCA'
        }
      ]
    }
  ]);

  const totalDailyProfit = exchangeBots.reduce((sum, bot) => sum + bot.dailyProfit, 0);
  const totalProfit = exchangeBots.reduce((sum, bot) => sum + bot.totalProfit, 0);

  const handleAddKey = () => {
    if (newExchange.name && newExchange.apiKey && newExchange.apiSecret) {
      setExchangeKeys([
        ...exchangeKeys,
        {
          id: Date.now().toString(),
          ...newExchange,
        },
      ]);
      setNewExchange({ name: '', apiKey: '', apiSecret: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteKey = (id: string) => {
    setExchangeKeys(exchangeKeys.filter((key) => key.id !== id));
  };

  const toggleSecret = (id: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddStrategy = (botId: string) => {
    if (!newStrategy) return;

    setExchangeBots(prevBots => 
      prevBots.map(bot => {
        if (bot.id === botId) {
          return {
            ...bot,
            strategies: [...bot.strategies, newStrategy]
          };
        }
        return bot;
      })
    );

    setNewStrategy('');
    setShowAddStrategy(null);
  };

  const handleRemoveStrategy = (botId: string, strategy: string) => {
    setExchangeBots(prevBots =>
      prevBots.map(bot => {
        if (bot.id === botId) {
          return {
            ...bot,
            strategies: bot.strategies.filter(s => s !== strategy)
          };
        }
        return bot;
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">Daily Profit</h3>
          </div>
          <p className={`text-3xl font-bold ${totalDailyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalDailyProfit >= 0 ? '+' : ''}{totalDailyProfit.toFixed(2)}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Total Profit</h3>
          </div>
          <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">Total Earnings</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ${(totalProfit * 1000).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Exchange Bots */}
      {exchangeBots.map((bot) => (
        <div key={bot.id} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Bot className="h-6 w-6 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-900">{bot.exchange} Bot</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Daily Profit</p>
                <p className={`text-lg font-bold ${bot.dailyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {bot.dailyProfit >= 0 ? '+' : ''}{bot.dailyProfit.toFixed(2)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Profit</p>
                <p className={`text-lg font-bold ${bot.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {bot.totalProfit >= 0 ? '+' : ''}{bot.totalProfit.toFixed(2)}%
                </p>
              </div>
              <button
                onClick={() => setShowAddStrategy(bot.id)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Strategy
              </button>
            </div>
          </div>

          {/* Active Strategies */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Active Strategies</h4>
            <div className="flex flex-wrap gap-3">
              {bot.strategies.map((strategy) => (
                <div
                  key={strategy}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg"
                >
                  <Settings className="h-4 w-4" />
                  <span>{strategy}</span>
                  <button
                    onClick={() => handleRemoveStrategy(bot.id, strategy)}
                    className="text-indigo-400 hover:text-indigo-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Modal */}
          {showAddStrategy === bot.id && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Add Trading Strategy</h3>
                  <button
                    onClick={() => setShowAddStrategy(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Strategy
                    </label>
                    <select
                      value={newStrategy}
                      onChange={(e) => setNewStrategy(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    >
                      <option value="">Select a strategy</option>
                      {AVAILABLE_STRATEGIES.filter(strategy => !bot.strategies.includes(strategy)).map((strategy) => (
                        <option key={strategy} value={strategy} className="text-gray-900">
                          {strategy}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAddStrategy(bot.id)}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Add Strategy
                    </button>
                    <button
                      onClick={() => setShowAddStrategy(null)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Open Trades */}
          <div className="space-y-4">
            {bot.trades.map((trade) => (
              <div key={trade.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900">{trade.pair}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trade.type === 'long' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {trade.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">• {trade.strategy}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Opened {trade.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit}%
                    </p>
                    <div className="text-sm text-gray-500">
                      <span>Entry: ${trade.entryPrice}</span>
                      <span className="mx-2">•</span>
                      <span>Current: ${trade.currentPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default IBot;