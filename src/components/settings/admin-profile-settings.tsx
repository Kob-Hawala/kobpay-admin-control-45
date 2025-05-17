
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { User, Mail, Phone, Shield, Key, AlertTriangle, Clock, Eye, LogOut } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Form schema for profile information
const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    }),
  phone: z
    .string()
    .optional(),
  title: z
    .string()
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    })
    .optional(),
});

// Form schema for security settings
const securityFormSchema = z.object({
  currentPassword: z
    .string()
    .min(1, {
      message: "Current password is required.",
    }),
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: "Password must include lowercase, uppercase, number, and special character.",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Mock login activity data
const recentLoginActivity = [
  {
    id: 1,
    timestamp: "2023-06-15T14:30:00Z",
    ipAddress: "192.168.1.1",
    location: "New York, USA",
    device: "Chrome on Windows",
    status: "success",
  },
  {
    id: 2,
    timestamp: "2023-06-10T09:15:00Z",
    ipAddress: "192.168.2.5",
    location: "San Francisco, USA",
    device: "Safari on macOS",
    status: "success",
  },
  {
    id: 3,
    timestamp: "2023-06-05T11:20:00Z",
    ipAddress: "203.0.113.5",
    location: "Unknown",
    device: "Firefox on Linux",
    status: "failed",
  },
];

export default function AdminProfileSettings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(true);
  const [isShowingSetup2FA, setIsShowingSetup2FA] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      title: "System Administrator",
    },
  });

  // Security form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile form submission
  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    toast.success("Profile updated successfully");
    console.log("Profile data:", data);
  }

  // Handle security form submission
  function onSecuritySubmit(data: z.infer<typeof securityFormSchema>) {
    toast.success("Password changed successfully");
    console.log("Security data:", data);
    securityForm.reset();
  }

  // Handle 2FA toggle
  function handle2FAToggle() {
    if (!is2FAEnabled) {
      // Show 2FA setup dialog
      setIsShowingSetup2FA(true);
    } else {
      // Disable 2FA
      setIs2FAEnabled(false);
      toast.success("Two-factor authentication disabled");
    }
  }

  // Handle 2FA setup
  function setup2FA() {
    // In a real app, this would initiate the 2FA setup process
    setIs2FAEnabled(true);
    setIsShowingSetup2FA(false);
    toast.success("Two-factor authentication enabled");
  }

  return (
    <Tabs
      defaultValue="profile"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Security</span>
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Activity</span>
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account details and personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form 
                onSubmit={profileForm.handleSubmit(onProfileSubmit)} 
                className="space-y-4"
              >
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@kobhawala.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormDescription>
                        Used for account security and notifications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="System Administrator" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Manage which notifications you receive via email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <div className="font-medium">Security Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Receive emails for login attempts, password changes, and security issues
                </div>
              </div>
              <Switch 
                checked={isEmailNotificationsEnabled}
                onCheckedChange={setIsEmailNotificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <div className="font-medium">Transaction Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive emails for deposits, withdrawals, and P2P transactions
                </div>
              </div>
              <Switch 
                checked={isEmailNotificationsEnabled}
                onCheckedChange={setIsEmailNotificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <div className="font-medium">System Updates</div>
                <div className="text-sm text-muted-foreground">
                  Receive emails about system maintenance and updates
                </div>
              </div>
              <Switch 
                checked={isEmailNotificationsEnabled}
                onCheckedChange={setIsEmailNotificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to maintain account security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...securityForm}>
              <form 
                onSubmit={securityForm.handleSubmit(onSecuritySubmit)} 
                className="space-y-4"
              >
                <FormField
                  control={securityForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={securityForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters and include uppercase, lowercase,
                        number, and special character.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={securityForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Update Password</Button>
              </form>
            </Form>
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <div className="font-medium">
                  {is2FAEnabled 
                    ? "Two-factor authentication enabled" 
                    : "Enable two-factor authentication"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {is2FAEnabled 
                    ? "Your account is protected with 2FA" 
                    : "Require a verification code when logging in"}
                </div>
              </div>
              <Switch 
                checked={is2FAEnabled}
                onCheckedChange={handle2FAToggle}
              />
            </div>
            
            {is2FAEnabled && (
              <Alert>
                <Key className="h-4 w-4" />
                <AlertTitle>Two-factor authentication is enabled</AlertTitle>
                <AlertDescription>
                  Your account is secured with two-factor authentication.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Secure actions for your account.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="text-sm text-muted-foreground">
              Signing out will end your session on this device.
            </div>
            <Button 
              variant="destructive" 
              onClick={() => setConfirmLogout(true)}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
        
        {/* 2FA Setup Dialog */}
        <Dialog open={isShowingSetup2FA} onOpenChange={setIsShowingSetup2FA}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Scan the QR code with your authentication app to enable 2FA.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4">
              <div className="border border-border p-4 rounded-md">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-gray-500" />
                  <span className="sr-only">QR Code for 2FA setup</span>
                </div>
              </div>
              <Input
                placeholder="Enter verification code"
                className="max-w-xs"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsShowingSetup2FA(false)}>
                Cancel
              </Button>
              <Button onClick={setup2FA}>
                Verify and Enable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Logout Confirmation Dialog */}
        <Dialog open={confirmLogout} onOpenChange={setConfirmLogout}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Sign Out</DialogTitle>
              <DialogDescription>
                Are you sure you want to sign out of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmLogout(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  logout();
                  setConfirmLogout(false);
                }}
              >
                Sign Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

      {/* Activity Tab */}
      <TabsContent value="activity" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Login Activity</CardTitle>
            <CardDescription>
              Review your recent login history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLoginActivity.map((activity) => (
                <div key={activity.id} className="flex flex-col border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {activity.status === "success" ? (
                          <Shield className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">
                          {activity.status === "success" 
                            ? "Successful Login" 
                            : "Failed Login Attempt"}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                    <Badge className={activity.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {activity.status}
                    </Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">IP Address:</span> {activity.ipAddress}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {activity.location}
                    </div>
                    <div>
                      <span className="font-medium">Device:</span> {activity.device}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={() => setActiveTab("security")}>
                <Eye className="mr-2 h-4 w-4" />
                View Security Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Badge component for activity status
function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}
