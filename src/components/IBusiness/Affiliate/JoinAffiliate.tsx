import React, { useState } from 'react';
import { UserPlus, AlertCircle, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface JoinAffiliateProps {
  onSuccess: () => void;
}

const JoinAffiliate: React.FC<JoinAffiliateProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [affiliateCode, setAffiliateCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (affiliateCode === 'DEMO123') {
      onSuccess();
    } else {
      setError(t('affiliate.error.invalidCode', 'Invalid invitation code. Try DEMO123'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <UserPlus className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('affiliate.join.title', 'Join Our Affiliate Program')}
        </h3>
        <p className="text-gray-600">
          {t('affiliate.join.description', 'Earn commissions by referring new members to our platform')}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('affiliate.join.invitationCode', 'Invitation Code')}
          </label>
          <input
            type="text"
            value={affiliateCode}
            onChange={(e) => setAffiliateCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
            placeholder={t('affiliate.join.enterCode', 'Enter your invitation code')}
          />
          <p className="mt-2 text-sm text-gray-600">For demo, use code: DEMO123</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-indigo-900 mb-4">
            {t('affiliate.benefits.title', 'Program Benefits')}
          </h4>
          <ul className="space-y-3">
            {[
              'Earn up to 50% commission on transaction fees',
              'Earn up to 30% commission on subscriptions',
              'Multi-level commission structure',
              'Real-time earnings tracking',
              'Instant commission payouts'
            ].map((benefit, index) => (
              <li key={index} className="flex items-center text-indigo-700">
                <Check className="h-5 w-5 mr-2 text-indigo-600" />
                {t(`affiliate.benefits.${index}`, benefit)}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleJoin}
          className="w-full bg-indigo-600 text-white font-medium p-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {t('affiliate.join.button', 'Join Affiliate Program')}
        </button>
      </div>
    </div>
  );
};

export default JoinAffiliate;