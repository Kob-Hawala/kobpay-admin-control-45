
import React from "react";
import AdminLayout from "@/components/admin-layout";
import NotificationTable from "@/components/notifications/notification-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NotificationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Central hub for reviewing and managing system alerts and notifications
          </p>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="security">Security Alerts</TabsTrigger>
            <TabsTrigger value="system">System Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <NotificationTable />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Security alerts filtered view is coming soon. This will include login attempts, permission changes, and suspicious activity.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                System updates filtered view is coming soon. This will include maintenance notices, version updates, and system status changes.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
