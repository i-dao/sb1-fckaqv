import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAdmin } from './context/AdminContext';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import MainApp from './components/MainApp';
import LandingPage from './components/LandingPage';
import SubscriptionSuccess from './components/SubscriptionSuccess';
import AffiliateSection from './components/IBusiness/Affiliate/AffiliateSection';

function App() {
  const { isAuthenticated } = useAuth();
  const { isAdminAuthenticated } = useAdmin();

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={
        isAdminAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
      } />
      <Route path="/admin/login" element={
        isAdminAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
      } />
      <Route path="/admin/dashboard" element={
        isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />
      } />

      {/* Subscription Success Route */}
      <Route path="/subscription/success" element={<SubscriptionSuccess />} />

      {/* Public Routes */}
      <Route path="/" element={
        isAuthenticated ? <MainApp /> : <LandingPage />
      } />

      {/* Catch-all redirect to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;