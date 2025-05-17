
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProfileSettings from "./admin-profile-settings";

// Add other settings components and tabs as needed
const AdminSettingsManagement = () => {
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

        <TabsContent value="system" className="space-y-4">
          <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-amber-800">
            System settings coming soon...
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-amber-800">
            Email template management coming soon...
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-amber-800">
            Permission management coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsManagement;
