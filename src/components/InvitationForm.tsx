import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';

interface InvitationFormProps {
  onSuccess: (code: string) => void;
}

const InvitationForm: React.FC<InvitationFormProps> = ({ onSuccess }) => {
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invitationCode === 'DEMO123') {
      onSuccess(invitationCode);
    } else {
      setError('Invalid invitation code. Try DEMO123');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Enter Invitation Code</h2>
        <p className="text-gray-600 mt-2">Please enter your invitation code to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invitation Code
          </label>
          <input
            type="text"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter code"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            For demo purposes, use the code: DEMO123
          </p>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Continue
        </button>
      </form>
    </div>
  );
};

export default InvitationForm;