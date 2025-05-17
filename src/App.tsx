
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import ProtectedRoute, { PublicOnlyRoute } from "@/components/protected-route";

// Pages
import LoginPage from "./pages/admin/LoginPage";
import OtpVerificationPage from "./pages/admin/OtpVerificationPage";
import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import UserDetailPage from "./pages/admin/UserDetailPage";
import KycPage from "./pages/admin/KycPage";
import KobPayPage from "./pages/admin/KobPayPage";
import EscrowPage from "./pages/admin/EscrowPage";
import TransactionsPage from "./pages/admin/TransactionsPage";
import FeesPage from "./pages/admin/FeesPage";
import LiquidityPage from "./pages/admin/LiquidityPage";
import FiatDepositsPage from "./pages/admin/FiatDepositsPage";
import StakingPage from "./pages/admin/StakingPage";
import ExchangeRatesPage from "./pages/admin/ExchangeRatesPage";
import NewsSettingsPage from "./pages/admin/NewsSettingsPage";
import ApiSettingsPage from "./pages/admin/ApiSettingsPage";
import LogsPage from "./pages/admin/LogsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import P2PPage from "./pages/admin/P2PPage";
import NotFound from "./pages/NotFound";

// Create the query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  {/* Redirect root to login */}
                  <Route path="/" element={<Navigate to="/admin/login" replace />} />

                  {/* Admin Authentication Routes */}
                  <Route 
                    path="/admin/login" 
                    element={
                      <PublicOnlyRoute>
                        <LoginPage />
                      </PublicOnlyRoute>
                    } 
                  />
                  <Route 
                    path="/admin/verify-otp" 
                    element={
                      <PublicOnlyRoute>
                        <OtpVerificationPage />
                      </PublicOnlyRoute>
                    } 
                  />

                  {/* Protected Admin Routes */}
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <ProtectedRoute>
                        <UsersPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users/:userId" 
                    element={
                      <ProtectedRoute>
                        <UserDetailPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/kyc" 
                    element={
                      <ProtectedRoute>
                        <KycPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/kobpay" 
                    element={
                      <ProtectedRoute>
                        <KobPayPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/escrow" 
                    element={
                      <ProtectedRoute>
                        <EscrowPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/p2p" 
                    element={
                      <ProtectedRoute>
                        <P2PPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/transactions" 
                    element={
                      <ProtectedRoute>
                        <TransactionsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/fees" 
                    element={
                      <ProtectedRoute>
                        <FeesPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/liquidity" 
                    element={
                      <ProtectedRoute>
                        <LiquidityPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/fiat-deposits" 
                    element={
                      <ProtectedRoute>
                        <FiatDepositsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/staking" 
                    element={
                      <ProtectedRoute>
                        <StakingPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/exchange-rates" 
                    element={
                      <ProtectedRoute>
                        <ExchangeRatesPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/news-settings" 
                    element={
                      <ProtectedRoute>
                        <NewsSettingsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/api-settings" 
                    element={
                      <ProtectedRoute>
                        <ApiSettingsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/logs" 
                    element={
                      <ProtectedRoute>
                        <LogsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/settings" 
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Redirect /admin to /admin/dashboard */}
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
