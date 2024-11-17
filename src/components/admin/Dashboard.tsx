import React, { useState, useEffect } from 'react';
import { Users, Ticket, TrendingUp, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { SupportTicket, UserStats } from '../../types/admin';
import TicketList from './TicketList';
import UserList from './UserList';
import AffiliateTree from './AffiliateTree';

const AdminDashboard: React.FC = () => {
  const { getTickets, getUserStats } = useAdmin();
  const [activeTab, setActiveTab] = useState<'tickets' | 'users' | 'affiliates'>('tickets');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTickets: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      const ticketData = await getTickets();
      setTickets(ticketData);
      // In a real app, you would fetch these stats from your backend
      setStats({
        totalUsers: 1250,
        activeTickets: ticketData.filter(t => t.status === 'open').length,
        totalRevenue: 125000,
      });
    };

    loadDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeTickets}</p>
            </div>
            <Ticket className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">€{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'tickets'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Support Tickets
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'users'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('affiliates')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'affiliates'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Affiliate Network
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'tickets' && <TicketList tickets={tickets} />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'affiliates' && <AffiliateTree />}
      </div>
    </div>
  );
};

export default AdminDashboard;