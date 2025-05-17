
import React from "react";
import AdminLayout from "@/components/admin-layout";
import ActivityLogsViewer from "@/components/logs/activity-logs-viewer";

export default function LogsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">
            View and filter system activity logs, user actions, and security events.
          </p>
        </div>
        
        <ActivityLogsViewer />
      </div>
    </AdminLayout>
  );
}
