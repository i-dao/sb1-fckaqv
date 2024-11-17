import React, { createContext, useContext, useState } from 'react';
import { AdminUser, SupportTicket, UserStats, AffiliateNode } from '../types/admin';

interface AdminContextType {
  currentAdmin: AdminUser | null;
  isAdminAuthenticated: boolean;
  tickets: SupportTicket[];
  userStats: { [key: string]: UserStats };
  affiliateTree: AffiliateNode[];
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  getTickets: () => Promise<SupportTicket[]>;
  getUserStats: (userId: string) => Promise<UserStats>;
  getAffiliateTree: (userId: string) => Promise<AffiliateNode[]>;
  respondToTicket: (ticketId: string, message: string) => Promise<boolean>;
  assignTicket: (ticketId: string, adminId: string) => Promise<boolean>;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [userStats, setUserStats] = useState<{ [key: string]: UserStats }>({});
  const [affiliateTree, setAffiliateTree] = useState<AffiliateNode[]>([]);

  const loginAdmin = async (email: string, password: string) => {
    // Mock admin login
    if (email === 'admin@example.com' && password === 'admin123') {
      const admin: AdminUser = {
        id: '1',
        email,
        role: 'admin',
        name: 'Admin User',
        lastActive: new Date().toISOString(),
      };
      setCurrentAdmin(admin);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
  };

  const getTickets = async () => {
    return tickets;
  };

  const getUserStats = async (userId: string) => {
    return userStats[userId] || {
      totalBalance: 0,
      transactionCount: 0,
      lastLogin: new Date().toISOString(),
      accountCreated: new Date().toISOString(),
      kycStatus: 'pending',
      supportTickets: 0,
      affiliateCount: 0,
    };
  };

  const getAffiliateTree = async (userId: string) => {
    return affiliateTree;
  };

  const respondToTicket = async (ticketId: string, message: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket || !currentAdmin) return false;

    const newMessage = {
      id: Date.now().toString(),
      ticketId,
      senderId: currentAdmin.id,
      senderType: 'admin',
      message,
      timestamp: new Date().toISOString(),
    };

    ticket.messages.push(newMessage);
    setTickets([...tickets]);
    return true;
  };

  const assignTicket = async (ticketId: string, adminId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return false;

    ticket.assignedTo = adminId;
    setTickets([...tickets]);
    return true;
  };

  const updateTicketStatus = async (ticketId: string, status: SupportTicket['status']) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return false;

    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    setTickets([...tickets]);
    return true;
  };

  return (
    <AdminContext.Provider
      value={{
        currentAdmin,
        isAdminAuthenticated: !!currentAdmin,
        tickets,
        userStats,
        affiliateTree,
        loginAdmin,
        logoutAdmin,
        getTickets,
        getUserStats,
        getAffiliateTree,
        respondToTicket,
        assignTicket,
        updateTicketStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};