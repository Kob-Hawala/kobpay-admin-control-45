
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ThemeProvider } from "@/providers/theme-provider";
import ProtectedRoute from './components/protected-route';

import Index from './pages/Index';
import LoginPage from './pages/admin/LoginPage';
import OtpVerificationPage from './pages/admin/OtpVerificationPage';
import DashboardPage from './pages/admin/DashboardPage';
import KycPage from './pages/admin/KycPage';
import UsersPage from './pages/admin/UsersPage';
import UserDetailPage from './pages/admin/UserDetailPage';
import P2PPage from './pages/admin/P2PPage';
import EscrowPage from './pages/admin/EscrowPage';
import FiatDepositsPage from './pages/admin/FiatDepositsPage';
import TransactionsPage from './pages/admin/TransactionsPage';
import ExchangeRatesPage from './pages/admin/ExchangeRatesPage';
import StakingPage from './pages/admin/StakingPage';
import LiquidityPage from './pages/admin/LiquidityPage';
import FeesPage from './pages/admin/FeesPage';
import KobPayPage from './pages/admin/KobPayPage';
import MessagingPage from './pages/admin/MessagingPage';
import NotificationsPage from './pages/admin/NotificationsPage';
import LogsPage from './pages/admin/LogsPage';
import SettingsPage from './pages/admin/SettingsPage';
import ApiSettingsPage from './pages/admin/ApiSettingsPage';
import NewsSettingsPage from './pages/admin/NewsSettingsPage';
import NotFound from './pages/NotFound';
import MarketDetailPage from './pages/admin/MarketDetailPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/otp" element={<OtpVerificationPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><Navigate to="/admin/dashboard" /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/admin/markets/:coinId" element={<ProtectedRoute><MarketDetailPage /></ProtectedRoute>} />
            <Route path="/admin/kyc" element={<ProtectedRoute><KycPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="/admin/users/:userId" element={<ProtectedRoute><UserDetailPage /></ProtectedRoute>} />
            <Route path="/admin/p2p" element={<ProtectedRoute><P2PPage /></ProtectedRoute>} />
            <Route path="/admin/escrow" element={<ProtectedRoute><EscrowPage /></ProtectedRoute>} />
            <Route path="/admin/fiat-deposits" element={<ProtectedRoute><FiatDepositsPage /></ProtectedRoute>} />
            <Route path="/admin/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
            <Route path="/admin/exchange-rates" element={<ProtectedRoute><ExchangeRatesPage /></ProtectedRoute>} />
            <Route path="/admin/staking" element={<ProtectedRoute><StakingPage /></ProtectedRoute>} />
            <Route path="/admin/liquidity" element={<ProtectedRoute><LiquidityPage /></ProtectedRoute>} />
            <Route path="/admin/fees" element={<ProtectedRoute><FeesPage /></ProtectedRoute>} />
            <Route path="/admin/kob-pay" element={<ProtectedRoute><KobPayPage /></ProtectedRoute>} />
            <Route path="/admin/messaging" element={<ProtectedRoute><MessagingPage /></ProtectedRoute>} />
            <Route path="/admin/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/admin/logs" element={<ProtectedRoute><LogsPage /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/admin/api-settings" element={<ProtectedRoute><ApiSettingsPage /></ProtectedRoute>} />
            <Route path="/admin/news-settings" element={<ProtectedRoute><NewsSettingsPage /></ProtectedRoute>} />
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
