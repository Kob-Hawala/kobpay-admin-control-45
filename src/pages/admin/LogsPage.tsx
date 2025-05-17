
import React from "react";
import AdminLayout from "@/components/admin-layout";
import ActivityLogsViewer from "@/components/logs/activity-logs-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LogsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
          <p className="text-muted-foreground">
            View and filter system activity logs, user actions, and security events.
          </p>
        </div>
        
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Activity Logs</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="system">System Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4">
            <ActivityLogsViewer />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Security events filtering and management is coming soon. This will include login attempts, permissions changes, and user security updates.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                System events monitoring is coming soon. This will include server events, background tasks, and system performance metrics.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
