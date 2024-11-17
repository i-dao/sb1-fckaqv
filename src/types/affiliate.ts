import { CommissionReward } from './wallet';

export interface CommissionRate {
  level: number;
  percentage: number;
  transactionShare: number;
  subscriptionShare: number;
}

export interface ServiceFee {
  type: 'transaction' | 'subscription';
  amount: number;
  currency: string;
  affiliateShare: number;
}

export interface AffiliateEarning {
  id: string;
  affiliateId: string;
  amount: number;
  currency: string;
  credzReward: number;
  serviceType: 'transaction' | 'subscription';
  level: number;
  timestamp: string;
  status: 'pending' | 'paid';
  referredUserId: string;
}

export interface AffiliateStats {
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  totalCredzRewards: number;
  pendingCredzRewards: number;
  paidCredzRewards: number;
  referralsByLevel: {
    [key: number]: number;
  };
  earningsByService: {
    transaction: number;
    subscription: number;
  };
}

export const CREDZ_REWARD_RATE = 0.02; // 0.02 CREDZ per 1 USDT commission

export const COMMISSION_RATES: CommissionRate[] = [
  { 
    level: 1, 
    percentage: 25,
    transactionShare: 50, // 50% of 0.2% fee
    subscriptionShare: 30  // 30% of €29
  },
  { 
    level: 2, 
    percentage: 1,
    transactionShare: 10, // 10% of 0.2% fee
    subscriptionShare: 5  // 5% of €29
  },
  { 
    level: 3, 
    percentage: 1,
    transactionShare: 5,  // 5% of 0.2% fee
    subscriptionShare: 3  // 3% of €29
  },
  { 
    level: 4, 
    percentage: 2,
    transactionShare: 3,  // 3% of 0.2% fee
    subscriptionShare: 2  // 2% of €29
  },
  { 
    level: 5, 
    percentage: 1,
    transactionShare: 2,  // 2% of 0.2% fee
    subscriptionShare: 1  // 1% of €29
  },
];

export const SERVICE_FEES: { [key: string]: ServiceFee } = {
  transaction: {
    type: 'transaction',
    amount: 0.002, // 0.2%
    currency: 'EUR',
    affiliateShare: 0.5, // 50%
  },
  subscription: {
    type: 'subscription',
    amount: 29,
    currency: 'EUR',
    affiliateShare: 0.3, // 30%
  },
};