import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Smile, ArrowUpRight, ArrowDownRight, MinusCircle } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  fearGreedIndex: number;
  marketCap: number;
  volume24h: number;
  dominance: number;
  rsi: number;
  macd: 'bullish' | 'bearish' | 'neutral';
}

const cryptoPrices: CryptoPrice[] = [
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    price: 67234.52, 
    change24h: 2.5, 
    fearGreedIndex: 75,
    marketCap: 1298456789123,
    volume24h: 28456789123,
    dominance: 52.4,
    rsi: 68,
    macd: 'bullish'
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    price: 3456.78, 
    change24h: 1.8, 
    fearGreedIndex: 65,
    marketCap: 398456789123,
    volume24h: 15456789123,
    dominance: 18.2,
    rsi: 62,
    macd: 'bullish'
  },
  { 
    symbol: 'POL', 
    name: 'Polygon', 
    price: 0.98, 
    change24h: -0.5, 
    fearGreedIndex: 45,
    marketCap: 8456789123,
    volume24h: 456789123,
    dominance: 0.8,
    rsi: 48,
    macd: 'bearish'
  },
  { 
    symbol: 'TRX', 
    name: 'TRON', 
    price: 0.12, 
    change24h: 3.2, 
    fearGreedIndex: 70,
    marketCap: 12456789123,
    volume24h: 789123456,
    dominance: 1.2,
    rsi: 72,
    macd: 'bullish'
  },
  { 
    symbol: 'BNB', 
    name: 'BNB', 
    price: 456.78, 
    change24h: -1.2, 
    fearGreedIndex: 40,
    marketCap: 68456789123,
    volume24h: 2456789123,
    dominance: 3.8,
    rsi: 45,
    macd: 'neutral'
  }
];

const getFearGreedColor = (index: number) => {
  if (index >= 75) return 'text-green-600 bg-green-50';
  if (index >= 50) return 'text-blue-600 bg-blue-50';
  if (index >= 25) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const getFearGreedText = (index: number) => {
  if (index >= 75) return 'Extreme Greed';
  if (index >= 50) return 'Greed';
  if (index >= 25) return 'Fear';
  return 'Extreme Fear';
};

const getMarketSignal = (crypto: CryptoPrice) => {
  // Composite analysis based on multiple indicators
  let bullishSignals = 0;
  let bearishSignals = 0;

  // RSI Analysis
  if (crypto.rsi > 70) bearishSignals++;
  else if (crypto.rsi < 30) bullishSignals++;
  else if (crypto.rsi > 60) bullishSignals += 0.5;
  else if (crypto.rsi < 40) bearishSignals += 0.5;

  // Fear & Greed Analysis
  if (crypto.fearGreedIndex > 80) bearishSignals++;
  else if (crypto.fearGreedIndex < 20) bullishSignals++;
  else if (crypto.fearGreedIndex > 65) bearishSignals += 0.5;
  else if (crypto.fearGreedIndex < 35) bullishSignals += 0.5;

  // MACD Signal
  if (crypto.macd === 'bullish') bullishSignals++;
  else if (crypto.macd === 'bearish') bearishSignals++;

  // Price Change Analysis
  if (crypto.change24h > 10) bearishSignals += 0.5;
  else if (crypto.change24h < -10) bullishSignals += 0.5;

  // Return signal based on analysis
  if (bullishSignals > bearishSignals + 1) return { signal: 'buy', strength: 'strong' };
  if (bullishSignals > bearishSignals) return { signal: 'buy', strength: 'moderate' };
  if (bearishSignals > bullishSignals + 1) return { signal: 'sell', strength: 'strong' };
  if (bearishSignals > bullishSignals) return { signal: 'sell', strength: 'moderate' };
  return { signal: 'hold', strength: 'neutral' };
};

const getSignalDisplay = (signal: ReturnType<typeof getMarketSignal>) => {
  switch (signal.signal) {
    case 'buy':
      return {
        icon: <ArrowUpRight className={`h-4 w-4 ${signal.strength === 'strong' ? 'text-green-600' : 'text-green-500'}`} />,
        text: signal.strength === 'strong' ? 'Strong Buy' : 'Buy',
        className: signal.strength === 'strong' ? 'text-green-600 bg-green-50' : 'text-green-500 bg-green-50'
      };
    case 'sell':
      return {
        icon: <ArrowDownRight className={`h-4 w-4 ${signal.strength === 'strong' ? 'text-red-600' : 'text-red-500'}`} />,
        text: signal.strength === 'strong' ? 'Strong Sell' : 'Sell',
        className: signal.strength === 'strong' ? 'text-red-600 bg-red-50' : 'text-red-500 bg-red-50'
      };
    default:
      return {
        icon: <MinusCircle className="h-4 w-4 text-gray-500" />,
        text: 'Hold',
        className: 'text-gray-600 bg-gray-50'
      };
  }
};

const PriceTicker: React.FC = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>(cryptoPrices);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // In a real implementation, this would fetch from CoinMarketCap API
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setPrices(data);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Market Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {prices.map((crypto) => {
          const signal = getMarketSignal(crypto);
          const signalDisplay = getSignalDisplay(signal);
          
          return (
            <div key={crypto.symbol} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{crypto.symbol}</span>
                {crypto.change24h >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="text-sm md:text-lg font-semibold text-gray-900 truncate mb-2">
                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs md:text-sm ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                </span>
              </div>
              <div className={`mt-2 p-1.5 rounded-lg flex items-center justify-between ${getFearGreedColor(crypto.fearGreedIndex)} mb-2`}>
                {crypto.fearGreedIndex >= 50 ? (
                  <Smile className="h-3.5 w-3.5" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
                <span className="text-xs font-medium ml-1">
                  {getFearGreedText(crypto.fearGreedIndex)}
                </span>
                <span className="text-xs font-bold">{crypto.fearGreedIndex}</span>
              </div>
              <div className={`p-1.5 rounded-lg flex items-center justify-between ${signalDisplay.className}`}>
                {signalDisplay.icon}
                <span className="text-xs font-medium">{signalDisplay.text}</span>
                <span className="text-xs text-gray-900">RSI: {crypto.rsi}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceTicker;