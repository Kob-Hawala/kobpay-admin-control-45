
import React from "react";
import AdminLayout from "@/components/admin-layout";
import AdminSettingsManagement from "@/components/settings/admin-settings-management";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
          <p className="text-muted-foreground">
            Configure platform settings, roles, and system controls.
          </p>
        </div>
        <AdminSettingsManagement />
      </div>
    </AdminLayout>
  );
}
