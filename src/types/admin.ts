export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'support';
  name: string;
  lastActive: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderType: 'user' | 'admin' | 'support';
  message: string;
  attachments?: string[];
  timestamp: string;
}

export interface UserStats {
  totalBalance: number;
  transactionCount: number;
  lastLogin: string;
  accountCreated: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  supportTickets: number;
  affiliateCount: number;
}

export interface AffiliateNode {
  id: string;
  name: string;
  level: number;
  totalEarnings: number;
  activeReferrals: number;
  children?: AffiliateNode[];
}