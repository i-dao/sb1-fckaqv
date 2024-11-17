import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wallet, Menu, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import Send from './Send';
import Receive from './Receive';
import Swap from './Swap';
import LoadWallet from './LoadWallet';
import IBot from './IBot';
import Profile from './Profile';
import IBusiness from './IBusiness';
import IDAO from './IDAO';
import LanguageSelector from './LanguageSelector';
import SupportCenter from './support/SupportCenter';
import Balance from './Balance';
import AffiliateSection from './IBusiness/Affiliate/AffiliateSection';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'wallet':
        return <Balance />;
      case 'send':
        return <Send />;
      case 'receive':
        return <Receive />;
      case 'swap':
        return <Swap />;
      case 'load':
        return <LoadWallet />;
      case 'ibot':
        return <IBot />;
      case 'ibusiness':
        return <IBusiness />;
      case 'dao':
        return <IDAO />;
      case 'affiliate':
        return <AffiliateSection />;
      case 'profile':
        return <Profile />;
      case 'support':
        return <SupportCenter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                i-Wallet
              </span>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium">{user?.email}</p>
                    <p className="text-xs text-gray-400">Member</p>
                  </div>
                  <Settings className="h-5 w-5" />
                </button>

                {/* Dropdown Menu */}
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 border border-gray-700">
                    <button
                      onClick={() => handleTabChange('profile')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      {t('menu.profile')}
                    </button>
                    <button
                      onClick={() => handleTabChange('support')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      {t('menu.support')}
                    </button>
                    <div className="border-t border-gray-700"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('common.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MainApp;