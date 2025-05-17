
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserGeneralInfo from "@/components/users/user-general-info";
import UserWallets from "@/components/users/user-wallets";
import UserCryptoDeposits from "@/components/users/user-crypto-deposits";
import UserCryptoWithdrawals from "@/components/users/user-crypto-withdrawals";
import UserFiatDeposits from "@/components/users/user-fiat-deposits";
import UserFiatWithdrawals from "@/components/users/user-fiat-withdrawals";
import UserStaking from "@/components/users/user-staking";
import UserReports from "@/components/users/user-reports";
import { mockUsers } from "@/data/mock-users";

export default function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchUser = () => {
      setLoading(true);
      try {
        // Find user in mock data
        const foundUser = mockUsers.find(u => u.id === userId);
        
        if (foundUser) {
          setUser(foundUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Not Found</h1>
            <p className="text-muted-foreground">
              The user with ID {userId} could not be found.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground">
              User ID: <span className="font-mono">{user.id}</span>
            </p>
          </div>
          <div className="flex gap-2">
            {user.accountStatus === "active" ? (
              <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded-md text-sm font-medium">
                Suspend Account
              </button>
            ) : (
              <button className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium">
                Reactivate Account
              </button>
            )}
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="crypto-deposits">Crypto Deposits</TabsTrigger>
            <TabsTrigger value="crypto-withdrawals">Crypto Withdrawals</TabsTrigger>
            <TabsTrigger value="fiat-deposits">Fiat Deposits</TabsTrigger>
            <TabsTrigger value="fiat-withdrawals">Fiat Withdrawals</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <UserGeneralInfo user={user} />
          </TabsContent>

          <TabsContent value="wallets" className="space-y-4">
            <UserWallets user={user} />
          </TabsContent>

          <TabsContent value="crypto-deposits" className="space-y-4">
            <UserCryptoDeposits user={user} />
          </TabsContent>

          <TabsContent value="crypto-withdrawals" className="space-y-4">
            <UserCryptoWithdrawals user={user} />
          </TabsContent>

          <TabsContent value="fiat-deposits" className="space-y-4">
            <UserFiatDeposits user={user} />
          </TabsContent>

          <TabsContent value="fiat-withdrawals" className="space-y-4">
            <UserFiatWithdrawals user={user} />
          </TabsContent>

          <TabsContent value="staking" className="space-y-4">
            <UserStaking user={user} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <UserReports user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
