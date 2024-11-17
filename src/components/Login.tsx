import React, { useState } from 'react';
import { LogIn, AlertCircle, Wallet, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [affiliateCode, setAffiliateCode] = useState('');
  const [error, setError] = useState('');
  const { login, signupWithAffiliate } = useAuth();

  const handleLogin = () => {
    if (email === 'demo@example.com' && password === 'demo123') {
      login(email, password);
    } else {
      setError('Invalid credentials. Try demo@example.com / demo123');
    }
  };

  const handleSignup = () => {
    if (!email || !password || !affiliateCode) {
      setError('Please fill in all fields');
      return;
    }

    const success = signupWithAffiliate(email, password, affiliateCode);
    if (!success) {
      setError('Invalid affiliate code or user already exists');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Login Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-2">
              <Wallet className="h-12 w-12 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-900">i-Wallet</h1>
            </div>
            <p className="text-indigo-600 font-medium mb-6">From I-dao.io</p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign in
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Demo credentials: demo@example.com / demo123
              </p>
            </div>
          </div>
        </div>

        {/* Join with Invitation Code Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Join with Invitation Code</h2>
            <p className="text-gray-600 mt-2">Have an invitation code? Create your account here.</p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                value={isSignup ? email : ''}
                onChange={(e) => {
                  setIsSignup(true);
                  setEmail(e.target.value);
                }}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                value={isSignup ? password : ''}
                onChange={(e) => {
                  setIsSignup(true);
                  setPassword(e.target.value);
                }}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                type="text"
                value={affiliateCode}
                onChange={(e) => {
                  setIsSignup(true);
                  setAffiliateCode(e.target.value);
                }}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Invitation Code"
              />
            </div>

            <button
              onClick={handleSignup}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;