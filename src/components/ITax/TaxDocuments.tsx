import React, { useState } from 'react';
import { Download, Upload, FileText, AlertCircle } from 'lucide-react';

interface TaxDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const TaxDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<TaxDocument[]>([
    {
      id: '1',
      name: 'Annual Tax Report 2023',
      type: 'Tax Report',
      date: '2024-01-15',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Q4 VAT Statement',
      type: 'VAT',
      date: '2024-01-10',
      status: 'pending'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const handleFileUpload = () => {
    alert('File upload functionality will be implemented');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Tax Documents</h3>
        <button
          onClick={handleFileUpload}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Tax Information Alert */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Important Tax Information</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep all your crypto trading records for tax purposes</li>
            <li>Download annual statements for your tax returns</li>
            <li>VAT reports are generated quarterly</li>
          </ul>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-gray-400" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{doc.name}</h4>
                <p className="text-sm text-gray-500">
                  {doc.type} • {new Date(doc.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                  doc.status
                )}`}
              >
                {doc.status}
              </span>
              <button
                onClick={() => alert('Download functionality will be implemented')}
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Documents</p>
          <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">
            {documents.filter((doc) => doc.status === 'pending').length}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {documents.filter((doc) => doc.status === 'approved').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxDocuments;