
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/components/users/user-status";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, FileText, Wallet, Key, User, Clock, Shield, ArrowDown, ArrowUp } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  asset: string;
  date: string;
  status: string;
}

interface UserDetailsProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    kobPayId?: string;
    accountStatus: string;
    kycStatus: string;
    kycType?: string;
    dailyLimit: number;
    createdAt: string;
    lastLogin?: string;
    country?: string;
    region?: string;
    city?: string;
    idType?: string;
    idNumber?: string;
    wallets?: {
      asset: string;
      balance: number;
      address: string;
    }[];
    transactions?: Transaction[];
    notes?: string[];
  };
}

export function UserDetails({ user }: UserDetailsProps) {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"suspend" | "reactivate" | "limit">("suspend");
  const [reason, setReason] = useState("");
  const [dailyLimit, setDailyLimit] = useState(user.dailyLimit.toString());

  const handleAction = (type: "suspend" | "reactivate" | "limit") => {
    setActionType(type);
    setIsActionDialogOpen(true);
    if (type === "limit") {
      setDailyLimit(user.dailyLimit.toString());
    } else {
      setReason("");
    }
  };

  const confirmAction = () => {
    // In a real app, this would be an API call
    console.log(`${actionType} user ${user.id}`, {
      reason,
      dailyLimit: actionType === "limit" ? parseFloat(dailyLimit) : undefined
    });
    setIsActionDialogOpen(false);
    // Here we would update the UI based on the response
  };

  return (
    <div className="space-y-6">
      {/* User header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm">
              <span className="text-muted-foreground">{user.email}</span>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <span className="text-muted-foreground">{user.phone}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={user.accountStatus === "active" ? "outline" : "default"}
            onClick={() => handleAction(user.accountStatus === "active" ? "suspend" : "reactivate")}
          >
            {user.accountStatus === "active" ? "Suspend User" : "Reactivate User"}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAction("limit")}
          >
            Update Limits
          </Button>
        </div>
      </div>

      {/* User status indicators */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-muted px-3 py-1 rounded-md flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">ID: {user.id}</span>
        </div>
        
        {user.kobPayId && (
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-md flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="text-sm font-mono">{user.kobPayId}</span>
          </div>
        )}
        
        <div className="px-3 py-1 rounded-md flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Registered: {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="px-3 py-1 rounded-md flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">KYC: {user.kycType || "Not provided"}</span>
        </div>

        <div className="px-3 py-1 rounded-md">
          <UserStatus status={user.accountStatus} />
        </div>
        
        <div className="px-3 py-1 rounded-md">
          <Badge variant={user.kycStatus === "verified" ? "success" : user.kycStatus === "pending" ? "warning" : "destructive"} className="capitalize">
            {user.kycStatus}
          </Badge>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="kyc">KYC Data</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="font-medium mt-1 capitalize">{user.accountStatus}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Daily Limit</Label>
                    <div className="font-medium mt-1">${user.dailyLimit.toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">KYC Status</Label>
                    <div className="font-medium mt-1 capitalize">{user.kycStatus}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">KYC Type</Label>
                    <div className="font-medium mt-1">{user.kycType || "Not provided"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Full Name</Label>
                    <div className="font-medium mt-1">{user.name}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <div className="font-medium mt-1">{user.email}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <div className="font-medium mt-1">{user.phone}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Country</Label>
                    <div className="font-medium mt-1">{user.country || "Unknown"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notes</CardTitle>
              <CardDescription>Admin notes and observations about this user</CardDescription>
            </CardHeader>
            <CardContent>
              {!user.notes || user.notes.length === 0 ? (
                <p className="text-muted-foreground italic">No notes have been added for this user.</p>
              ) : (
                <div className="space-y-2">
                  {user.notes.map((note, index) => (
                    <div key={index} className="bg-muted p-3 rounded-md">
                      <p>{note}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallets Tab */}
        <TabsContent value="wallets" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">User Wallets</CardTitle>
              <CardDescription>Cryptocurrency balances for this user</CardDescription>
            </CardHeader>
            <CardContent>
              {!user.wallets || user.wallets.length === 0 ? (
                <p className="text-muted-foreground italic">No wallets found for this user.</p>
              ) : (
                <div className="space-y-4">
                  {user.wallets.map((wallet, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{wallet.asset}</h4>
                        <Badge variant="outline" className="font-mono">
                          {wallet.balance.toFixed(8)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Wallet className="h-3 w-3" />
                        <span className="font-mono text-xs flex-1 truncate">{wallet.address}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Transaction History</CardTitle>
              <CardDescription>Recent transactions for this user</CardDescription>
            </CardHeader>
            <CardContent>
              {!user.transactions || user.transactions.length === 0 ? (
                <p className="text-muted-foreground italic">No transactions found for this user.</p>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm border-b">
                    <div>Type</div>
                    <div>Amount</div>
                    <div>Asset</div>
                    <div>Date</div>
                    <div>Status</div>
                  </div>
                  {user.transactions.map((tx, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-4 text-sm hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        {tx.type === "receive" ? (
                          <ArrowDown className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowUp className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="capitalize">{tx.type}</span>
                      </div>
                      <div className="font-mono">{tx.amount.toFixed(8)}</div>
                      <div>{tx.asset}</div>
                      <div>{new Date(tx.date).toLocaleDateString()}</div>
                      <div>
                        <Badge variant={tx.status === "completed" ? "success" : tx.status === "pending" ? "warning" : "destructive"} className="capitalize">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Data Tab */}
        <TabsContent value="kyc" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">KYC Information</CardTitle>
              <CardDescription>Know Your Customer verification data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">ID Type</Label>
                  <div className="font-medium mt-1">{user.idType || "Not submitted"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">ID Number</Label>
                  <div className="font-medium mt-1">{user.idNumber || "Not submitted"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Country</Label>
                  <div className="font-medium mt-1">{user.country || "Not submitted"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Region/State</Label>
                  <div className="font-medium mt-1">{user.region || "Not submitted"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">City</Label>
                  <div className="font-medium mt-1">{user.city || "Not submitted"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="font-medium mt-1">
                    <Badge variant={user.kycStatus === "verified" ? "success" : user.kycStatus === "pending" ? "warning" : "destructive"} className="capitalize">
                      {user.kycStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h4 className="font-medium">ID Document</h4>
                <div className="border border-dashed rounded-md flex items-center justify-center h-40">
                  <div className="text-center">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Document
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      {user.kycStatus === "verified" ? "Verified on " + new Date().toLocaleDateString() : "Pending review"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">User Activity</CardTitle>
              <CardDescription>Recent user activities and system logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Since we don't have actual log data, let's create some placeholder logs */}
                <div className="border-l-2 border-green-500 pl-4 pb-6 relative">
                  <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-green-500"></div>
                  <time className="text-xs text-muted-foreground mb-1 block">Today, 10:23 AM</time>
                  <p className="text-sm">User logged in successfully from 192.168.1.1</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-4 pb-6 relative">
                  <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-blue-500"></div>
                  <time className="text-xs text-muted-foreground mb-1 block">Yesterday, 3:45 PM</time>
                  <p className="text-sm">User updated their phone number from +233 XX XXX XXX to {user.phone}</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-4 pb-6 relative">
                  <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-amber-500"></div>
                  <time className="text-xs text-muted-foreground mb-1 block">March 15, 2025, 1:30 PM</time>
                  <p className="text-sm">User submitted KYC documents for verification</p>
                </div>
                <div className="border-l-2 border-primary pl-4 pb-6 relative">
                  <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary"></div>
                  <time className="text-xs text-muted-foreground mb-1 block">March 10, 2025, 11:15 AM</time>
                  <p className="text-sm">Account created with email {user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Dialogs */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "suspend" && "Suspend User Account"}
              {actionType === "reactivate" && "Reactivate User Account"}
              {actionType === "limit" && "Update Daily Transaction Limit"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "suspend" && "This will prevent the user from accessing their account until reactivated."}
              {actionType === "reactivate" && "This will restore the user's access to their account."}
              {actionType === "limit" && "Update the maximum daily transaction amount for this user."}
            </DialogDescription>
          </DialogHeader>
          
          {(actionType === "suspend" || actionType === "reactivate") && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a reason for this action..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {actionType === "limit" && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="dailyLimit">Daily Transaction Limit ($)</Label>
                <Input
                  id="dailyLimit"
                  type="number"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Current limit: ${user.dailyLimit.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limitReason">Reason for Change</Label>
                <Textarea
                  id="limitReason"
                  placeholder="Please provide a reason for updating the limit..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={confirmAction} 
              variant={actionType === "suspend" ? "destructive" : "default"}
            >
              {actionType === "suspend" && "Suspend Account"}
              {actionType === "reactivate" && "Reactivate Account"}
              {actionType === "limit" && "Update Limit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
