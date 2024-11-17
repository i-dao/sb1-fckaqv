import React from 'react';
import { 
  Shield, Wallet, Bot, Building2, Receipt, Landmark, 
  ArrowRight, LogIn, UserPlus, AlertCircle, TrendingUp, 
  Book, Server, Users, Percent, DollarSign, Coins, 
  CheckCircle2, CreditCard
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [loginData, setLoginData] = React.useState({ email: '', password: '' });
  const [loginError, setLoginError] = React.useState('');

  const documentationLinks = [
    {
      href: '/technical-specs.html',
      icon: Server,
      text: 'Technical Specs'
    },
    {
      href: '/implementation-guide.html',
      icon: Book,
      text: 'Implementation Guide'
    },
    {
      href: '/product-guide.html',
      icon: Book,
      text: 'Product Guide'
    },
    {
      href: '/versions.html',
      icon: Book,
      text: 'Version History'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
    } catch (error) {
      setLoginError('Invalid credentials. Try demo@example.com / demo123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Build Your Dreams
          </h1>
          <p className="text-xl md:text-2xl text-blue-400 font-semibold mb-8">
            With I-wallet.io
          </p>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            One platform for all your crypto needs - from trading and banking to business management and tax compliance.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Wallet,
              title: 'Multi-Currency Wallet',
              description: 'Manage crypto and fiat currencies in one secure place'
            },
            {
              icon: Bot,
              title: 'Automated Trading',
              description: 'AI-powered trading bot for optimal market performance'
            },
            {
              icon: Building2,
              title: 'Business Solutions',
              description: 'Company formation and management tools'
            },
            {
              icon: Receipt,
              title: 'Tax Management',
              description: 'Automated tax reporting and compliance'
            },
            {
              icon: Landmark,
              title: 'Banking Services',
              description: 'Virtual IBANs and global banking solutions'
            },
            {
              icon: Shield,
              title: 'Enhanced Security',
              description: 'Enterprise-grade security for your assets'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
            >
              <feature.icon className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Auth Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Sign In Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sign In</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="Email address"
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Password"
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>

              {loginError && (
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign in
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Demo credentials: demo@example.com / demo123
                </p>
              </div>
            </form>
          </div>

          {/* Invitation Code Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Join with Invitation</h3>
            <p className="text-gray-300 mb-4">
              Have an invitation code? Create your account and start your journey with us.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter invitation code"
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
              <button className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors">
                <UserPlus className="h-5 w-5 mr-2" />
                JOIN
              </button>

              {/* Pricing Section */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Monthly Subscription</h4>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-white">€29</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center">
                    <CreditCard className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-white">Pay with Card</p>
                    <p className="text-xs text-gray-400">€29/month</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center">
                    <Coins className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-white">Pay with CREDZ</p>
                    <p className="text-xs text-gray-400">100 CREDZ/month</p>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white mb-1">Subscription Benefits</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Full platform access</li>
                        <li>• Enhanced CREDZ staking rewards (5% APR)</li>
                        <li>• Priority support</li>
                        <li>• Advanced trading features</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {documentationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;