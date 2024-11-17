import React from 'react';
import { QrCode, Copy, Download as DownloadIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Receive: React.FC = () => {
  const { t } = useTranslation();
  const walletAddress = '0x1234...5678';

  const supportedTokens = [
    { symbol: 'USDC', network: 'Polygon' },
    { symbol: 'USDT', network: 'Polygon' }
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert(t('common.addressCopied'));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 mb-8">
        <DownloadIcon className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{t('receive.title')}</h2>
      </div>

      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="bg-gray-100 p-8 rounded-lg">
            <QrCode className="h-48 w-48 text-gray-800" />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {t('receive.walletAddress')}
          </label>
          <div className="flex">
            <input
              type="text"
              value={walletAddress}
              readOnly
              className="flex-1 p-4 text-lg border border-gray-300 rounded-l-lg bg-gray-50 text-gray-900"
            />
            <button
              onClick={handleCopyAddress}
              className="px-4 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
            >
              <Copy className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg space-y-2">
          <p className="text-blue-700 font-medium">{t('receive.supportedTokens')}:</p>
          <ul className="list-disc list-inside text-blue-700 ml-2">
            {supportedTokens.map((token, index) => (
              <li key={index}>
                {token.symbol} ({token.network})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Receive;