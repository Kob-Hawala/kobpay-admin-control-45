
import React from "react";
import AdminLayout from "@/components/admin-layout";
import ApiCredentialsManagement from "@/components/api/api-credentials-management";

export default function ApiSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Credentials</h1>
          <p className="text-muted-foreground">
            Manage external API integrations and secure credentials.
          </p>
        </div>
        <ApiCredentialsManagement />
      </div>
    </AdminLayout>
  );
}
