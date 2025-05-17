
import React from "react";
import AdminLayout from "@/components/admin-layout";
import NewsSettingsManagement from "@/components/news/news-settings-management";

export default function NewsSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Feed Settings</h1>
          <p className="text-muted-foreground">
            Configure crypto news feed sources and control what gets pushed to the app.
          </p>
        </div>
        <NewsSettingsManagement />
      </div>
    </AdminLayout>
  );
}
