
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { User, Shield, Database, Key, Clock, Lock } from "lucide-react";

// Mock admin users data
const mockAdmins = [
  { id: 1, name: "Admin User", email: "admin@kobhawala.com", role: "Super Admin", status: "Active" },
  { id: 2, name: "Support Team", email: "support@kobhawala.com", role: "Support", status: "Active" },
  { id: 3, name: "KYC Manager", email: "kyc@kobhawala.com", role: "KYC Manager", status: "Active" },
  { id: 4, name: "Finance Officer", email: "finance@kobhawala.com", role: "Finance", status: "Inactive" },
  { id: 5, name: "Compliance Officer", email: "compliance@kobhawala.com", role: "Compliance", status: "Active" },
];

// Mock roles and permissions
const mockRoles = [
  { 
    id: 1, 
    name: "Super Admin", 
    permissions: ["Users:View", "Users:Edit", "KYC:View", "KYC:Approve", "Transactions:View", "Transactions:Process", "Settings:View", "Settings:Edit"]
  },
  { 
    id: 2, 
    name: "Support", 
    permissions: ["Users:View", "KYC:View", "Transactions:View"]
  },
  { 
    id: 3, 
    name: "KYC Manager", 
    permissions: ["Users:View", "KYC:View", "KYC:Approve"]
  },
  { 
    id: 4, 
    name: "Finance", 
    permissions: ["Transactions:View", "Transactions:Process"]
  },
  { 
    id: 5, 
    name: "Compliance", 
    permissions: ["Users:View", "KYC:View", "Transactions:View"]
  },
];

export default function AdminSettingsManagement() {
  const [platformMode, setPlatformMode] = useState("live");
  const [maintenanceMessage, setMaintenanceMessage] = useState("System is under maintenance. Please try again later.");
  const [isBackupLoading, setIsBackupLoading] = useState(false);
  const [admins, setAdmins] = useState(mockAdmins);
  const [roles, setRoles] = useState(mockRoles);
  const [editingAdmin, setEditingAdmin] = useState<any | null>(null);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  
  const toggleMaintenanceMode = () => {
    const newMode = platformMode === "live" ? "maintenance" : "live";
    setPlatformMode(newMode);
    toast.success(`Platform mode changed to ${newMode.toUpperCase()}`);
  };
  
  const triggerBackup = () => {
    setIsBackupLoading(true);
    setTimeout(() => {
      setIsBackupLoading(false);
      toast.success("Database backup completed successfully");
    }, 3000);
  };
  
  const startEditingAdmin = (admin: any) => {
    setEditingAdmin({ ...admin });
  };
  
  const saveAdminChanges = () => {
    if (editingAdmin) {
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id ? editingAdmin : admin
      ));
      setEditingAdmin(null);
      toast.success("Admin updated successfully");
    }
  };
  
  const cancelEditingAdmin = () => {
    setEditingAdmin(null);
  };
  
  const startEditingRole = (role: any) => {
    setEditingRole({ ...role });
  };
  
  const saveRoleChanges = () => {
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id ? editingRole : role
      ));
      setEditingRole(null);
      toast.success("Role updated successfully");
    }
  };
  
  const cancelEditingRole = () => {
    setEditingRole(null);
  };
  
  const addNewAdmin = () => {
    const newAdmin = { 
      id: admins.length + 1, 
      name: "New Admin", 
      email: "new.admin@kobhawala.com", 
      role: "Support", 
      status: "Inactive" 
    };
    setEditingAdmin(newAdmin);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="admins">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="admins">
            <User className="h-4 w-4 mr-2" />
            Admin Users
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="h-4 w-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="platform">
            <Database className="h-4 w-4 mr-2" />
            Platform Settings
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        {/* Admin Users Tab */}
        <TabsContent value="admins">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Admin User Management</CardTitle>
                <CardDescription>
                  Add and manage admin accounts and their roles.
                </CardDescription>
              </div>
              <Button onClick={addNewAdmin}>
                Add Admin User
              </Button>
            </CardHeader>
            <CardContent>
              {editingAdmin && (
                <div className="bg-muted p-4 rounded-md mb-4 space-y-4">
                  <h3 className="font-medium">
                    {editingAdmin.id > admins.length ? "Add New Admin" : "Edit Admin User"}
                  </h3>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-name">Name</Label>
                      <Input 
                        id="admin-name" 
                        value={editingAdmin.name} 
                        onChange={(e) => setEditingAdmin({...editingAdmin, name: e.target.value})} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input 
                        id="admin-email" 
                        type="email" 
                        value={editingAdmin.email} 
                        onChange={(e) => setEditingAdmin({...editingAdmin, email: e.target.value})} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-role">Role</Label>
                      <Select 
                        value={editingAdmin.role} 
                        onValueChange={(value) => setEditingAdmin({...editingAdmin, role: value})}
                      >
                        <SelectTrigger id="admin-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role.id} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-status">Status</Label>
                      <Select 
                        value={editingAdmin.status} 
                        onValueChange={(value) => setEditingAdmin({...editingAdmin, status: value})}
                      >
                        <SelectTrigger id="admin-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button onClick={saveAdminChanges}>Save</Button>
                      <Button variant="outline" onClick={cancelEditingAdmin}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map(admin => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            admin.role === "Super Admin" ? "bg-purple-100 text-purple-800" :
                            admin.role === "KYC Manager" ? "bg-blue-100 text-blue-800" :
                            admin.role === "Support" ? "bg-green-100 text-green-800" :
                            admin.role === "Finance" ? "bg-amber-100 text-amber-800" :
                            admin.role === "Compliance" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {admin.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            admin.status === "Active" ? "bg-green-100 text-green-800" : 
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {admin.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => startEditingAdmin(admin)}>
                              Edit
                            </Button>
                            {admin.email !== "admin@kobhawala.com" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-destructive">
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Admin User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this admin user? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Roles & Permissions Tab */}
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles and Permissions</CardTitle>
              <CardDescription>
                Configure role-based access control (RBAC) for admins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editingRole && (
                <div className="bg-muted p-4 rounded-md mb-4 space-y-4">
                  <h3 className="font-medium">Edit Role</h3>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input 
                        id="role-name" 
                        value={editingRole.name} 
                        onChange={(e) => setEditingRole({...editingRole, name: e.target.value})} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">User Management</h4>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-users-view" 
                              checked={editingRole.permissions.includes("Users:View")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("Users:View");
                                } else {
                                  const index = newPermissions.indexOf("Users:View");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-users-view">View Users</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-users-edit" 
                              checked={editingRole.permissions.includes("Users:Edit")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("Users:Edit");
                                } else {
                                  const index = newPermissions.indexOf("Users:Edit");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-users-edit">Edit Users</Label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">KYC Management</h4>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-kyc-view" 
                              checked={editingRole.permissions.includes("KYC:View")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("KYC:View");
                                } else {
                                  const index = newPermissions.indexOf("KYC:View");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-kyc-view">View KYC</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-kyc-approve" 
                              checked={editingRole.permissions.includes("KYC:Approve")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("KYC:Approve");
                                } else {
                                  const index = newPermissions.indexOf("KYC:Approve");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-kyc-approve">Approve KYC</Label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Transactions</h4>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-tx-view" 
                              checked={editingRole.permissions.includes("Transactions:View")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("Transactions:View");
                                } else {
                                  const index = newPermissions.indexOf("Transactions:View");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-tx-view">View Transactions</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-tx-process" 
                              checked={editingRole.permissions.includes("Transactions:Process")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("Transactions:Process");
                                } else {
                                  const index = newPermissions.indexOf("Transactions:Process");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-tx-process">Process Transactions</Label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Settings</h4>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-settings-view" 
                              checked={editingRole.permissions.includes("Settings:View")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("Settings:View");
                                } else {
                                  const index = newPermissions.indexOf("Settings:View");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-settings-view">View Settings</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="permission-settings-edit" 
                              checked={editingRole.permissions.includes("Settings:Edit")} 
                              onCheckedChange={(checked) => {
                                const newPermissions = [...editingRole.permissions];
                                if (checked) {
                                  newPermissions.push("Settings:Edit");
                                } else {
                                  const index = newPermissions.indexOf("Settings:Edit");
                                  if (index > -1) {
                                    newPermissions.splice(index, 1);
                                  }
                                }
                                setEditingRole({...editingRole, permissions: newPermissions});
                              }} 
                            />
                            <Label htmlFor="permission-settings-edit">Edit Settings</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button onClick={saveRoleChanges}>Save</Button>
                      <Button variant="outline" onClick={cancelEditingRole}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map(role => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permission, idx) => (
                              <span 
                                key={idx}
                                className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-blue-50 text-blue-700"
                              >
                                {permission}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => startEditingRole(role)}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Platform Settings Tab */}
        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Control platform state and database operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Mode</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="platform-mode" 
                      checked={platformMode === "maintenance"} 
                      onCheckedChange={toggleMaintenanceMode} 
                    />
                    <Label htmlFor="platform-mode">Maintenance Mode</Label>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                    platformMode === "live" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {platformMode === "live" ? "LIVE" : "MAINTENANCE"}
                  </span>
                </div>
                
                {platformMode === "maintenance" && (
                  <div className="grid gap-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Input 
                      id="maintenance-message" 
                      value={maintenanceMessage} 
                      onChange={(e) => setMaintenanceMessage(e.target.value)} 
                    />
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Database Operations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Manual Database Backup</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create a new backup of the database. This operation may take a few minutes.
                    </p>
                    <Button onClick={triggerBackup} disabled={isBackupLoading}>
                      {isBackupLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Backing Up...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Trigger Backup
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Scheduled Backups</h4>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-backup" defaultChecked />
                      <Label htmlFor="auto-backup">Enable daily automatic backups</Label>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Backups are automatically performed daily at 02:00 UTC
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security parameters and integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Integration Endpoints</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Fireblocks Webhook Endpoint</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Used for secure wallet operations and transaction notifications.
                    </p>
                    <div className="flex items-center">
                      <Input 
                        readOnly 
                        value="https://api.kobhawala.com/webhooks/fireblocks" 
                        className="flex-1 font-mono text-xs bg-muted"
                      />
                      <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText("https://api.kobhawala.com/webhooks/fireblocks")} className="ml-2">
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mt-4">Vault Notification URL</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Endpoint for receiving notifications about vault operations.
                    </p>
                    <div className="flex items-center">
                      <Input 
                        readOnly 
                        value="https://api.kobhawala.com/webhooks/vault-notifications" 
                        className="flex-1 font-mono text-xs bg-muted"
                      />
                      <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText("https://api.kobhawala.com/webhooks/vault-notifications")} className="ml-2">
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Session Security</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue={30} min={5} max={120} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Max Login Attempts</Label>
                      <Input id="max-attempts" type="number" defaultValue={5} min={3} max={10} />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="force-2fa" defaultChecked />
                    <Label htmlFor="force-2fa">Force 2FA for all admin users</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="ip-whitelist" />
                    <Label htmlFor="ip-whitelist">Enable IP whitelisting for admin access</Label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button>Save Security Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
