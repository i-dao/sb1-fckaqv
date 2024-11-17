import React, { useState } from 'react';
import { CreditCard, Check, AlertCircle, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAffiliate } from '../context/AffiliateContext';
import { useNavigate } from 'react-router-dom';

interface SubscriptionFormProps {
  invitationCode: string;
  onSuccess: () => void;
  onBack: () => void;
  paymentMethod: 'card' | 'credz';
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ 
  invitationCode, 
  onSuccess, 
  onBack,
  paymentMethod 
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);
  const { signupWithAffiliate, login } = useAuth();
  const { calculateCommission } = useAffiliate();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      if (paymentMethod === 'credz') {
        // Handle CREDZ payment
        // In a real implementation, this would verify CREDZ token balance
        // and process the payment using smart contracts
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Process affiliate commission (100 CREDZ tokens)
        calculateCommission(100, 'subscription', invitationCode);
      } else {
        // Handle card payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Process affiliate commission (€3.99 * 0.30 = €1.20)
        calculateCommission(1.20, 'subscription', invitationCode);
      }

      // Create demo account
      const success = signupWithAffiliate('demo@example.com', 'demo123', invitationCode);
      
      if (success) {
        // Log the user in automatically
        await login('demo@example.com', 'demo123');
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Subscription</h2>
        <p className="text-gray-600 mt-2">
          {paymentMethod === 'credz' 
            ? 'Monthly subscription: 100 CREDZ tokens' 
            : 'Monthly subscription: €3.99'}
        </p>
      </div>

      {paymentMethod === 'credz' ? (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Coins className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Pay with CREDZ Tokens</p>
                <p>You'll need 100 CREDZ tokens in your wallet to complete this subscription.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={processing}
            className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            {processing ? (
              <>
                <Coins className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Coins className="h-5 w-5 mr-2" />
                Pay with CREDZ
              </>
            )}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                maxLength={3}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Demo Mode</p>
              <p>Use any valid-looking card details to test the subscription.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            {processing ? (
              <>
                <CreditCard className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Check className="h-5 w-5 mr-2" />
                Subscribe Now
              </>
            )}
          </button>
        </form>
      )}

      <button
        onClick={onBack}
        className="mt-4 w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Back
      </button>
    </div>
  );
};

export default SubscriptionForm;