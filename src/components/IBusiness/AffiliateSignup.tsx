import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SignupProps {
  onSignupSuccess: () => void;
}

const AffiliateSignup: React.FC<SignupProps> = ({ onSignupSuccess }) => {
  const { t } = useTranslation();
  const [affiliateCode, setAffiliateCode] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (affiliateCode === 'DEMO123') {
      onSignupSuccess();
    } else {
      setError(t('ibusiness.affiliate.invalidCode'));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 mb-6">
        <UserPlus className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          {t('ibusiness.affiliate.joinProgram')}
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('ibusiness.affiliate.code')}
          </label>
          <input
            type="text"
            value={affiliateCode}
            onChange={(e) => setAffiliateCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder={t('ibusiness.affiliate.enterCode')}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 text-white font-medium p-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {t('ibusiness.affiliate.join')}
        </button>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            {t('ibusiness.affiliate.contactSupport')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSignup;