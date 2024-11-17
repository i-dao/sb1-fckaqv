import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AffiliateNode } from '../../types/admin';

// Since react-org-tree has TypeScript issues, we'll create a simple tree visualization
const AffiliateTree: React.FC = () => {
  const { getAffiliateTree } = useAdmin();
  const [selectedNode, setSelectedNode] = useState<AffiliateNode | null>(null);
  const [treeData, setTreeData] = useState<AffiliateNode[]>([]);

  useEffect(() => {
    const loadAffiliateTree = async () => {
      const tree = await getAffiliateTree('root');
      setTreeData(tree);
    };

    loadAffiliateTree();
  }, []);

  const renderNode = (node: AffiliateNode) => (
    <div
      key={node.id}
      className={`p-4 rounded-lg border mb-4 cursor-pointer ${
        selectedNode?.id === node.id
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:border-indigo-200'
      }`}
      onClick={() => setSelectedNode(node)}
    >
      <div className="text-sm font-medium text-gray-900">{node.name}</div>
      <div className="text-xs text-gray-500">Level {node.level}</div>
      <div className="mt-2 flex items-center space-x-2">
        <span className="text-xs text-green-600">€{node.totalEarnings}</span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-xs text-blue-600">{node.activeReferrals} referrals</span>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="ml-8 mt-4 space-y-4">
          {node.children.map(child => renderNode(child))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-[calc(100vh-300px)]">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-900">Total Affiliates</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-gray-900">Network Growth</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">+12.5%</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="h-5 w-5 text-yellow-600" />
            <h3 className="text-sm font-medium text-gray-900">Total Commissions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">€123,456</p>
        </div>
      </div>

      <div className="flex h-full">
        {/* Tree View */}
        <div className="flex-1 overflow-auto border rounded-lg p-4">
          {treeData.map(node => renderNode(node))}
        </div>

        {/* Node Details */}
        {selectedNode && (
          <div className="w-1/3 ml-6 bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{selectedNode.name}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="mt-1 font-medium">{selectedNode.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="mt-1 font-medium text-green-600">
                  €{selectedNode.totalEarnings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Referrals</p>
                <p className="mt-1 font-medium">{selectedNode.activeReferrals}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Network Size</p>
                <p className="mt-1 font-medium">
                  {selectedNode.children?.length || 0} direct • {selectedNode.activeReferrals} total
                </p>
              </div>
            </div>

            <div className="mt-6 space-x-4">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateTree;