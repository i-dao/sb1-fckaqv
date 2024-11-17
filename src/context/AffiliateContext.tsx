import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  CommissionRate, 
  ServiceFee, 
  AffiliateEarning, 
  AffiliateStats,
  COMMISSION_RATES,
  SERVICE_FEES 
} from '../types/affiliate';

interface AffiliateContextType {
  earnings: AffiliateEarning[];
  stats: AffiliateStats;
  calculateCommission: (amount: number, serviceType: 'transaction' | 'subscription', referredUserId: string) => void;
  requestPayout: () => Promise<boolean>;
  getAffiliateLevel: (userId: string) => number;
}

const AffiliateContext = createContext<AffiliateContextType | undefined>(undefined);

export const AffiliateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState<AffiliateEarning[]>([]);
  const [stats, setStats] = useState<AffiliateStats>({
    totalEarnings: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
    referralsByLevel: {},
    earningsByService: {
      transaction: 0,
      subscription: 0,
    },
  });

  const calculateCommission = (
    amount: number,
    serviceType: 'transaction' | 'subscription',
    referredUserId: string
  ) => {
    if (!user) return;

    const serviceFee = SERVICE_FEES[serviceType];
    const affiliateAmount = amount * serviceFee.affiliateShare;
    const smartContractAmount = amount - affiliateAmount;

    // In a real implementation, you would send the smartContractAmount to your smart contract
    console.log('Amount for smart contract:', smartContractAmount);

    // Calculate and distribute commissions across levels
    COMMISSION_RATES.forEach((rate, index) => {
      const levelEarning: AffiliateEarning = {
        id: Date.now().toString() + index,
        affiliateId: user.id,
        amount: affiliateAmount * (rate.percentage / 100),
        currency: serviceFee.currency,
        serviceType,
        level: rate.level,
        timestamp: new Date().toISOString(),
        status: 'pending',
        referredUserId,
      };

      setEarnings(prev => [...prev, levelEarning]);
    });

    updateStats();
  };

  const updateStats = () => {
    const newStats: AffiliateStats = {
      totalEarnings: earnings.reduce((sum, earning) => sum + earning.amount, 0),
      pendingEarnings: earnings
        .filter(earning => earning.status === 'pending')
        .reduce((sum, earning) => sum + earning.amount, 0),
      paidEarnings: earnings
        .filter(earning => earning.status === 'paid')
        .reduce((sum, earning) => sum + earning.amount, 0),
      referralsByLevel: {},
      earningsByService: {
        transaction: earnings
          .filter(earning => earning.serviceType === 'transaction')
          .reduce((sum, earning) => sum + earning.amount, 0),
        subscription: earnings
          .filter(earning => earning.serviceType === 'subscription')
          .reduce((sum, earning) => sum + earning.amount, 0),
      },
    };

    // Calculate referrals by level
    earnings.forEach(earning => {
      if (!newStats.referralsByLevel[earning.level]) {
        newStats.referralsByLevel[earning.level] = 0;
      }
      newStats.referralsByLevel[earning.level]++;
    });

    setStats(newStats);
  };

  const requestPayout = async (): Promise<boolean> => {
    try {
      // In a real implementation, you would:
      // 1. Call your backend to process the payout
      // 2. Update the status of paid earnings
      // 3. Transfer funds to the affiliate's wallet
      
      const pendingEarnings = earnings.filter(earning => earning.status === 'pending');
      
      setEarnings(prev =>
        prev.map(earning =>
          earning.status === 'pending' ? { ...earning, status: 'paid' } : earning
        )
      );

      updateStats();
      return true;
    } catch (error) {
      console.error('Payout failed:', error);
      return false;
    }
  };

  const getAffiliateLevel = (userId: string): number => {
    // In a real implementation, you would:
    // 1. Check the user's referral history
    // 2. Calculate their current level based on performance
    // 3. Return the appropriate level (1-5)
    return 1; // Default to level 1 for this example
  };

  useEffect(() => {
    updateStats();
  }, [earnings]);

  return (
    <AffiliateContext.Provider
      value={{
        earnings,
        stats,
        calculateCommission,
        requestPayout,
        getAffiliateLevel,
      }}
    >
      {children}
    </AffiliateContext.Provider>
  );
};

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (context === undefined) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
};