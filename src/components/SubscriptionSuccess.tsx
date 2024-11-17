import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
      <div className="mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to The Founders Club!
      </h2>

      <p className="text-gray-600 mb-8">
        Your subscription has been activated and your account is ready to use.
      </p>

      <div className="bg-green-50 p-4 rounded-lg mb-8">
        <p className="text-green-800">
          Demo credentials:<br />
          Email: demo@example.com<br />
          Password: demo123
        </p>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Go to Dashboard
        <ArrowRight className="h-5 w-5 ml-2" />
      </button>
    </div>
  );
};

export default SubscriptionSuccess;