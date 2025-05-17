
import React from "react";
import AdminLayout from "@/components/admin-layout";
import FiatDepositsApproval from "@/components/fiat-deposits/fiat-deposits-approval";

export default function FiatDepositsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fiat Deposits</h1>
          <p className="text-muted-foreground">
            Approve or reject fiat deposits and manage receipt verification.
          </p>
        </div>
        <FiatDepositsApproval />
      </div>
    </AdminLayout>
  );
}
