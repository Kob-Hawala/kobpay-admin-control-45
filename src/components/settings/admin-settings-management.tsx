
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProfileSettings from "./admin-profile-settings";
import AdminEmailTemplates from "./admin-email-templates";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info, Check } from "lucide-react";

// Add other settings components and tabs as needed
const AdminSettingsManagement = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const handleSaveSystemSettings = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings Saved",
        description: "System settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSavePermissions = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Permissions Updated",
        description: "Role permissions have been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Admin Profile</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <AdminProfileSettings />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">General System Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure system-wide settings and preferences.
              </p>
            </div>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Platform Name</Label>
                  <Input id="site-name" defaultValue="KOB HAWALA Admin" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-timezone">Default Timezone</Label>
                  <select 
                    id="default-timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue="UTC"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Africa/Lagos">West African Time (WAT)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" defaultValue="support@kobhawala.com" type="email" />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Security Settings</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa-required">Require 2FA for Admin Accounts</Label>
                    <p className="text-sm text-muted-foreground">All administrator accounts must use two-factor authentication</p>
                  </div>
                  <Switch id="2fa-required" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-logout">Automatic Logout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log users out after period of inactivity</p>
                  </div>
                  <Switch id="auto-logout" defaultChecked />
                </div>
                
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="session-timeout" className="text-sm">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" min="5" max="120" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-notifications">Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications for unusual login activities</p>
                  </div>
                  <Switch id="login-notifications" defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveSystemSettings} disabled={saving}>
                {saving ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Settings"
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <AdminEmailTemplates />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">Role & Permission Management</h3>
              <p className="text-sm text-muted-foreground">
                Configure access rights and permissions for different user roles.
              </p>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Permission</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Admin</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Manager</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Support</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Analyst</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">View Dashboard</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">Manage Users</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">Approve KYC</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">Manage Transactions</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">View Analytics</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">Configure System</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">Manage API Keys</td>
                    <td className="px-4 py-3 text-center"><Check size={16} className="mx-auto text-green-600" /></td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center gap-2">
              <Info size={16} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Custom roles and permissions can be configured for specific requirements.</p>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSavePermissions} disabled={saving}>
                {saving ? "Saving..." : "Save Permissions"}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsManagement;
