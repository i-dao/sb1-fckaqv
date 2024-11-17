import React from 'react';
import { Wallet, ArrowRightLeft, Send, Download, Bot, Building, Coins, UserCircle, CreditCard, MessageSquare, Vote, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const menuItems = [
    { id: 'dashboard', name: t('menu.dashboard'), icon: Wallet },
    { id: 'wallet', name: t('menu.wallet'), icon: Wallet },
    { id: 'ibot', name: t('menu.ibot'), icon: Bot },
    { id: 'dao', name: t('menu.dao'), icon: Vote },
    { id: 'affiliate', name: t('menu.affiliate'), icon: Users },
    { id: 'ibusiness', name: t('menu.ibusiness'), icon: Building },
    { id: 'profile', name: t('menu.profile'), icon: UserCircle },
    { id: 'support', name: t('menu.support'), icon: MessageSquare }
  ];

  const walletSubItems = [
    { id: 'send', name: t('common.send'), icon: Send },
    { id: 'receive', name: t('common.receive'), icon: Download },
    { id: 'swap', name: t('common.swap'), icon: ArrowRightLeft },
    { id: 'load', name: 'Buy with Card', icon: CreditCard }
  ];

  const isWalletActive = activeTab === 'wallet' || walletSubItems.some(item => item.id === activeTab);

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center overflow-x-auto">
          <div className="flex space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center p-3 md:p-4 rounded-lg min-w-[100px] transition-colors whitespace-nowrap
                  ${(item.id === 'wallet' && isWalletActive) || activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                  }`}
              >
                <item.icon className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2" />
                <span className="text-sm md:text-base font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wallet Submenu */}
      {isWalletActive && (
        <div className="mt-2 border-t border-gray-700 pt-2">
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {walletSubItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                  ${activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                  }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;