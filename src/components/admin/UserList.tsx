import React, { useState, useEffect } from 'react';
import { User, Search, Filter } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { UserStats } from '../../types/admin';

const UserList: React.FC = () => {
  const { getUserStats } = useAdmin();
  const [users, setUsers] = useState<Array<{ id: string; stats: UserStats }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadUsers = () => {
      // Create mock users synchronously
      const mockUsers = Array.from({ length: 10 }, (_, i) => ({
        id: `user-${i + 1}`,
        stats: {
          totalBalance: Math.random() * 10000,
          transactionCount: Math.floor(Math.random() * 100),
          lastLogin: new Date().toISOString(),
          accountCreated: new Date().toISOString(),
          kycStatus: ['pending', 'verified', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'verified' | 'rejected',
          supportTickets: Math.floor(Math.random() * 10),
          affiliateCount: Math.floor(Math.random() * 50),
        }
      }));
      setUsers(mockUsers);
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    return matchesSearch && user.stats.kycStatus === filter;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Users</option>
            <option value="pending">Pending KYC</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg border hover:border-indigo-200 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.id}</h3>
                  <p className="text-sm text-gray-500">
                    Joined: {new Date(user.stats.accountCreated).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.stats.kycStatus === 'verified' ? 'bg-green-100 text-green-800' :
                user.stats.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {user.stats.kycStatus}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className="font-medium">${user.stats.totalBalance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="font-medium">{user.stats.transactionCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Support Tickets</p>
                <p className="font-medium">{user.stats.supportTickets}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Referrals</p>
                <p className="font-medium">{user.stats.affiliateCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;