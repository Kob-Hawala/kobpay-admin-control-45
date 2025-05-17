
import React from "react";
import AdminLayout from "@/components/admin-layout";
import VaultTransfers from "@/components/liquidity/vault-transfers";

export default function LiquidityPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vault Management</h1>
          <p className="text-muted-foreground">
            Manage liquidity between hot and cold wallets and set threshold triggers.
          </p>
        </div>
        <VaultTransfers />
      </div>
    </AdminLayout>
  );
}
