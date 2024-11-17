import React, { useState } from 'react';
import { Vote, Users, CheckCircle2, XCircle } from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: { for: number; against: number };
  status: 'active' | 'passed' | 'failed';
  endTime: string;
}

const GovernancePanel: React.FC = () => {
  const [proposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'Adjust Savings Pool Interest Rate',
      description: 'Proposal to increase base interest rate from 3% to 4% APY',
      votes: { for: 1200000, against: 800000 },
      status: 'active',
      endTime: '2024-03-20'
    },
    {
      id: '2',
      title: 'Add New Collateral Type',
      description: 'Add ETH as collateral for I-Stable minting',
      votes: { for: 2500000, against: 500000 },
      status: 'passed',
      endTime: '2024-03-15'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Vote className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900">Active Proposals</h3>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Create Proposal
        </button>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="border border-gray-200 rounded-lg p-6 hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{proposal.title}</h4>
                <p className="text-gray-600 mt-1">{proposal.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Voting Ends: {new Date(proposal.endTime).toLocaleDateString()}</span>
                <span>Total Votes: {proposal.votes.for + proposal.votes.against}</span>
              </div>

              <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all"
                  style={{
                    width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%`
                  }}
                />
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{proposal.votes.for.toLocaleString()} For</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-medium">{proposal.votes.against.toLocaleString()} Against</span>
                </div>
              </div>

              {proposal.status === 'active' && (
                <div className="flex space-x-4">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Vote For
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Vote Against
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernancePanel;