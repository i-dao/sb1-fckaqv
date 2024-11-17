import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import JoinAffiliate from './JoinAffiliate';
import AffiliateDashboard from './AffiliateDashboard';
import AffiliateStats from './AffiliateStats';
import CommissionStructure from './CommissionStructure';
import InvitationManagement from './InvitationManagement';

const AffiliateSection: React.FC = () => {
  const [isAffiliate, setIsAffiliate] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="h-8 w-8 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          {t('affiliate.title', 'Affiliate Program')}
        </h2>
      </div>

      {!isAffiliate ? (
        <JoinAffiliate onSuccess={() => setIsAffiliate(true)} />
      ) : (
        <div className="space-y-8">
          <AffiliateStats />
          <InvitationManagement />
          <CommissionStructure />
          <AffiliateDashboard />
        </div>
      )}
    </div>
  );
};

export default AffiliateSection;