import React from 'react';
import { Copy, Users, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

// Example recent signups data - in a real app, this would come from your backend
const recentSignups = [
  { id: 1, name: 'Sarah', country: '🇩🇪 Germany' },
  { id: 2, name: 'Miguel', country: '🇪🇸 Spain' },
  { id: 3, name: 'John', country: '🇬🇧 United Kingdom' },
  { id: 4, name: 'Anna', country: '🇸🇪 Sweden' },
  { id: 5, name: 'Pierre', country: '🇫🇷 France' },
];

const InvitationCode: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const copyToClipboard = () => {
    if (user?.invitationCode) {
      navigator.clipboard.writeText(user.invitationCode);
      alert(t('ibusiness.invitation.codeCopied'));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            {t('ibusiness.invitation.title')}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{t('ibusiness.invitation.remaining')}</p>
          <p className="text-2xl font-bold text-indigo-600">
            {user?.invitesRemaining}/100
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <code className="flex-1 bg-gray-50 px-4 py-3 rounded-lg text-lg font-mono">
          {user?.invitationCode}
        </code>
        <button
          onClick={copyToClipboard}
          className="p-3 text-gray-500 hover:text-indigo-600 transition-colors"
          aria-label={t('ibusiness.invitation.copyCode')}
        >
          <Copy className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-700">
          {t('ibusiness.invitation.shareInfo')}
        </p>
      </div>

      {/* Recent Signups Section */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-5 w-5 text-indigo-600" />
          <h4 className="text-lg font-medium text-gray-900">
            {t('ibusiness.invitation.recentSignups')}
          </h4>
        </div>
        <div className="bg-gray-50 rounded-lg divide-y divide-gray-100">
          {recentSignups.map((signup) => (
            <div key={signup.id} className="flex items-center justify-between p-3">
              <span className="text-gray-700">{signup.name}</span>
              <span className="text-gray-500">{signup.country}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvitationCode;