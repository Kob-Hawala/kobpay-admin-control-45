
import React from "react";
import AdminLayout from "@/components/admin-layout";
import ExchangeRatesManagement from "@/components/exchange-rates/exchange-rates-management";

export default function ExchangeRatesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exchange Rates Management</h1>
          <p className="text-muted-foreground">
            Configure exchange rates, set margins, and control auto-updates.
          </p>
        </div>
        <ExchangeRatesManagement />
      </div>
    </AdminLayout>
  );
}
