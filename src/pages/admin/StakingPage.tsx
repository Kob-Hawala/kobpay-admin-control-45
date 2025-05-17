
import React from "react";
import AdminLayout from "@/components/admin-layout";
import StakingManagement from "@/components/staking/staking-management";

export default function StakingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staking Management</h1>
          <p className="text-muted-foreground">
            Manage staking plans, track metrics, and oversee user participation.
          </p>
        </div>
        <StakingManagement />
      </div>
    </AdminLayout>
  );
}
