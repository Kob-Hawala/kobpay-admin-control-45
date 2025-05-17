
import React, { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import P2PAdsTab from "@/components/p2p/P2PAdsTab";
import P2POrdersTab from "@/components/p2p/P2POrdersTab";
import P2PPaymentMethodsTab from "@/components/p2p/P2PPaymentMethodsTab";
import P2PAppealsTab from "@/components/p2p/P2PAppealsTab";
import P2PMerchantApplicationsTab from "@/components/p2p/P2PMerchantApplicationsTab";
import { ShoppingBag, CircleDollarSign, CreditCard, Shield, UserCheck } from "lucide-react";

const P2PPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">P2P Trading Management</h1>
          <p className="text-muted-foreground">
            Manage P2P advertisements, orders, payment methods, appeals, and merchant applications.
          </p>
        </div>

        <Tabs defaultValue="ads" className="w-full">
          <TabsList className="w-full justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="ads" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Ads</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="payment-methods" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </TabsTrigger>
            <TabsTrigger value="appeals" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Appeals</span>
            </TabsTrigger>
            <TabsTrigger value="merchant-applications" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span>Merchant Applications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ads" className="space-y-4">
            <P2PAdsTab />
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <P2POrdersTab />
          </TabsContent>
          
          <TabsContent value="payment-methods" className="space-y-4">
            <P2PPaymentMethodsTab />
          </TabsContent>
          
          <TabsContent value="appeals" className="space-y-4">
            <P2PAppealsTab />
          </TabsContent>
          
          <TabsContent value="merchant-applications" className="space-y-4">
            <P2PMerchantApplicationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default P2PPage;
