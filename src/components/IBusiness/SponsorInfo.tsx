import React from 'react';
import { User, Mail, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const SponsorInfo: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  // Find sponsor user based on affiliateId
  const getSponsorInfo = () => {
    // In a real app, this would fetch from your backend
    // For demo, we'll use hardcoded data
    return {
      name: "John Smith",
      email: "sponsor@example.com",
      level: "Diamond Partner"
    };
  };

  const sponsor = getSponsorInfo();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {t('ibusiness.sponsor.title')}
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('ibusiness.sponsor.name')}</p>
            <p className="text-lg font-medium text-gray-900">{sponsor.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Mail className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('ibusiness.sponsor.email')}</p>
            <a 
              href={`mailto:${sponsor.email}`}
              className="text-lg font-medium text-indigo-600 hover:text-indigo-700 flex items-center"
            >
              {sponsor.email}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-indigo-700">
            {t('ibusiness.sponsor.supportNote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SponsorInfo;