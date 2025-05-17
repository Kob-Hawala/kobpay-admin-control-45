
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UserStatus } from "./user-status";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Shield, 
  Wallet, 
  Clock, 
  User, 
  Ban,
  CheckCircle
} from "lucide-react";

interface UserDetailsProps {
  user: any;
}

const updateLimitSchema = z.object({
  dailyLimit: z.coerce
    .number()
    .min(0, "Limit cannot be negative")
    .max(100000, "Limit cannot exceed $100,000"),
  reason: z.string().min(5, "Please provide a reason for this change"),
});

export function UserDetails({ user }: UserDetailsProps) {
  const [isUpdatingLimit, setIsUpdatingLimit] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showActivateDialog, setShowActivateDialog] = useState(false);

  const form = useForm<z.infer<typeof updateLimitSchema>>({
    resolver: zodResolver(updateLimitSchema),
    defaultValues: {
      dailyLimit: user.dailyLimit,
      reason: "",
    },
  });

  const handleUpdateLimit = (values: z.infer<typeof updateLimitSchema>) => {
    setIsUpdatingLimit(true);

    // In a real app, we would call an API to update the limit
    setTimeout(() => {
      setIsUpdatingLimit(false);
      toast.success(`Daily limit updated to $${values.dailyLimit}`);
    }, 1000);
  };

  const handleSuspendAccount = () => {
    toast.success(`Account suspended: ${user.email}`);
    setShowSuspendDialog(false);
  };

  const handleActivateAccount = () => {
    toast.success(`Account activated: ${user.email}`);
    setShowActivateDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* User Overview */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <UserStatus status={user.accountStatus} />
              <Badge 
                variant={user.kycStatus === "verified" ? "success" : 
                       user.kycStatus === "pending" ? "warning" : "destructive"}
                className="capitalize"
              >
                {user.kycStatus}
              </Badge>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Registered</span>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">KOB Pay ID</span>
              <p className="font-mono">{user.kobPayId || "Not assigned"}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Daily Limit</span>
              <p>${user.dailyLimit.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Tabs */}
      <Tabs defaultValue="wallets">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="kyc">KYC Info</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        {/* Wallets Tab */}
        <TabsContent value="wallets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {user.wallets.map((wallet: any) => (
              <Card key={wallet.currency}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex justify-between">
                    <span>{wallet.currency}</span>
                    <span className="text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                      {wallet.networkType}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-xl">
                    {wallet.balance} {wallet.currency}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ≈ ${wallet.fiatEquivalent.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Last 5 transactions for this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.transactions.length > 0 ? (
                <div className="space-y-4">
                  {user.transactions.map((tx: any) => (
                    <div key={tx.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(tx.date).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={tx.amount > 0 ? "text-emerald-600" : ""}>
                            {tx.amount > 0 ? "+" : ""}{tx.amount} {tx.currency}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${tx.fiatValue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found for this user
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* KYC Tab */}
        <TabsContent value="kyc">
          <Card>
            <CardHeader>
              <CardTitle>KYC Information</CardTitle>
              <CardDescription>
                Verification status: 
                <Badge 
                  variant={user.kycStatus === "verified" ? "success" : 
                         user.kycStatus === "pending" ? "warning" : "destructive"}
                  className="ml-2 capitalize"
                >
                  {user.kycStatus}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Full Name</h4>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Date of Birth</h4>
                    <p>{user.kyc?.dob || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Nationality</h4>
                    <p>{user.kyc?.nationality || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">ID Type</h4>
                    <p>{user.kyc?.idType || "Not provided"}</p>
                  </div>
                </div>

                {user.kyc?.documents ? (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Verification Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {user.kyc.documents.map((doc: any) => (
                        <div key={doc.type} className="border rounded-md p-2">
                          <div className="text-xs font-medium mb-1">{doc.type}</div>
                          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No KYC documents uploaded
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Go to KYC Approval Center</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>
                Recent user activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.activityLogs && user.activityLogs.length > 0 ? (
                <div className="space-y-2">
                  {user.activityLogs.map((log: any) => (
                    <div key={log.id} className="text-sm border-b last:border-0 pb-2 pt-2">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                          <p>{log.action}</p>
                          <p className="text-xs text-muted-foreground">IP: {log.ipAddress}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No activity logs found
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Full Audit Trail</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Admin Actions */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Admin Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Transaction Limit Adjustment */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Adjust Daily Transaction Limit</CardTitle>
              <CardDescription>
                Current limit: ${user.dailyLimit.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdateLimit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dailyLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Daily Limit ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Maximum allowed: $100,000
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Change</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Explain why this limit is being changed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isUpdatingLimit}>
                    {isUpdatingLimit ? "Updating..." : "Update Limit"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Account Status Control</CardTitle>
              <CardDescription>
                Current status: <UserStatus status={user.accountStatus} />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Status Management</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Suspending an account will prevent the user from logging in or conducting any transactions.
                  </p>
                  {user.accountStatus === "active" ? (
                    <Button variant="destructive" onClick={() => setShowSuspendDialog(true)}>
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend Account
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setShowActivateDialog(true)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Reactivate Account
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suspend Account Dialog */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend User Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to suspend {user.name}'s account? This will prevent them from accessing the platform or performing any transactions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSuspendAccount} className="bg-destructive text-destructive-foreground">
              Suspend Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Activate Account Dialog */}
      <AlertDialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate User Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reactivate {user.name}'s account? This will restore their access to the platform and ability to perform transactions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActivateAccount}>
              Activate Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
