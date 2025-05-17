
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, AlertTriangle, Shield, Clock, Database, Filter } from "lucide-react";
import { toast } from "sonner";
import { mockVaultTransfers, mockVaultBalances } from "@/data/mock-vault-data";
import { useAuth } from "@/providers/auth-provider";

export default function VaultTransfers() {
  const { user } = useAuth();
  
  const [transfers, setTransfers] = useState(mockVaultTransfers);
  const [balances, setBalances] = useState(mockVaultBalances);
  const [selectedAssetFilter, setSelectedAssetFilter] = useState<string | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [showThresholdDialog, setShowThresholdDialog] = useState(false);
  
  const [newTransfer, setNewTransfer] = useState({
    fromVault: "cold",
    toVault: "hot",
    asset: "BTC",
    amount: "",
    reason: ""
  });
  
  const [otpCode, setOtpCode] = useState("");
  const [selectedAssetThreshold, setSelectedAssetThreshold] = useState("BTC");
  const [thresholdValue, setThresholdValue] = useState("");

  // Get unique assets for filtering
  const uniqueAssets = [...new Set(transfers.map(t => t.asset))];
  
  // Filter transfers
  const filteredTransfers = transfers.filter((transfer) => {
    const matchesAsset = selectedAssetFilter ? transfer.asset === selectedAssetFilter : true;
    const matchesStatus = selectedStatusFilter ? transfer.status === selectedStatusFilter : true;
    
    return matchesAsset && matchesStatus;
  });

  // Handle transfer submission
  const handleTransferSubmit = () => {
    setShowTransferDialog(false);
    setShow2FADialog(true);
  };

  // Handle 2FA verification
  const handle2FAVerification = () => {
    if (otpCode === "123456") { // Mock 2FA code
      const newId = `vt-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
      
      const newTransferEntry = {
        id: newId,
        fromVault: newTransfer.fromVault as "cold" | "hot",
        toVault: newTransfer.toVault as "cold" | "hot",
        asset: newTransfer.asset,
        amount: parseFloat(newTransfer.amount),
        status: "completed" as const,
        initiatedBy: user?.id || "admin-1",
        confirmedBy: user?.id || "admin-1",
        timestamp: new Date().toISOString(),
        reason: newTransfer.reason,
      };
      
      // Update transfers
      setTransfers([newTransferEntry, ...transfers]);
      
      // Update balances
      const updatedBalances = balances.map(balance => {
        if (balance.asset === newTransfer.asset) {
          const amount = parseFloat(newTransfer.amount);
          
          if (newTransfer.fromVault === "cold" && newTransfer.toVault === "hot") {
            return {
              ...balance,
              coldWallet: balance.coldWallet - amount,
              hotWallet: balance.hotWallet + amount,
              lowLiquidityWarning: (balance.hotWallet + amount) < balance.threshold
            };
          } else {
            return {
              ...balance,
              coldWallet: balance.coldWallet + amount,
              hotWallet: balance.hotWallet - amount,
              lowLiquidityWarning: (balance.hotWallet - amount) < balance.threshold
            };
          }
        }
        return balance;
      });
      
      setBalances(updatedBalances);
      
      // Reset form and show success
      setNewTransfer({
        fromVault: "cold",
        toVault: "hot",
        asset: "BTC",
        amount: "",
        reason: ""
      });
      setOtpCode("");
      setShow2FADialog(false);
      
      toast.success(`Successfully transferred ${newTransfer.amount} ${newTransfer.asset}`);
    } else {
      toast.error("Invalid 2FA code. Please try again.");
    }
  };

  // Handle threshold update
  const handleThresholdUpdate = () => {
    const updatedBalances = balances.map(balance => {
      if (balance.asset === selectedAssetThreshold) {
        const newThreshold = parseFloat(thresholdValue);
        return {
          ...balance,
          threshold: newThreshold,
          lowLiquidityWarning: balance.hotWallet < newThreshold
        };
      }
      return balance;
    });
    
    setBalances(updatedBalances);
    setShowThresholdDialog(false);
    setThresholdValue("");
    
    toast.success(`Threshold for ${selectedAssetThreshold} updated successfully`);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="balances">
        <TabsList>
          <TabsTrigger value="balances">Vault Balances</TabsTrigger>
          <TabsTrigger value="transfers">Transfer History</TabsTrigger>
        </TabsList>
        
        {/* Balances Tab */}
        <TabsContent value="balances" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Current Vault Balances</h3>
            <div className="flex space-x-2">
              <Button onClick={() => setShowTransferDialog(true)}>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                New Transfer
              </Button>
              <Button variant="outline" onClick={() => setShowThresholdDialog(true)}>
                <Database className="h-4 w-4 mr-2" />
                Set Thresholds
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {balances.map((balance) => (
              <Card key={balance.asset} className={balance.lowLiquidityWarning ? "border-yellow-500" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{balance.asset}</CardTitle>
                    {balance.lowLiquidityWarning && (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <CardDescription>Hot/Cold wallet balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hot Wallet:</span>
                      <span className={`font-medium ${balance.lowLiquidityWarning ? "text-yellow-500" : ""}`}>
                        {balance.hotWallet.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cold Wallet:</span>
                      <span className="font-medium">{balance.coldWallet.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Threshold:</span>
                      <span className="font-medium">{balance.threshold.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">
                        {(balance.hotWallet + balance.coldWallet).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {balance.lowLiquidityWarning && (
                    <div className="text-xs text-yellow-500 flex items-center w-full">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Hot wallet below threshold
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Transfers Tab */}
        <TabsContent value="transfers" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Select 
                value={selectedAssetFilter || "none"} 
                onValueChange={(value) => setSelectedAssetFilter(value === "none" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All assets</SelectItem>
                  {uniqueAssets.map(asset => (
                    <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={selectedStatusFilter || "none"} 
                onValueChange={(value) => setSelectedStatusFilter(value === "none" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={() => setShowTransferDialog(true)}>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              New Transfer
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Transfer History</CardTitle>
              <CardDescription>
                Complete log of vault transfers between hot and cold wallets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Transfer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Initiated By</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransfers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No transfers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransfers.map((transfer) => (
                      <TableRow key={transfer.id}>
                        <TableCell>
                          {new Date(transfer.timestamp).toLocaleDateString()}{" "}
                          {new Date(transfer.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="capitalize">{transfer.fromVault}</span>
                            <ArrowRightLeft className="h-4 w-4 mx-1" />
                            <span className="capitalize">{transfer.toVault}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transfer.amount.toLocaleString()} {transfer.asset}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transfer.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{transfer.initiatedBy}</div>
                          {transfer.confirmedBy && (
                            <div className="text-xs text-muted-foreground">
                              Confirmed: {transfer.confirmedBy}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={transfer.reason}>
                            {transfer.reason}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Vault Transfer</DialogTitle>
            <DialogDescription>
              Transfer crypto between hot and cold wallets.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fromVault">From Vault</Label>
                <Select 
                  value={newTransfer.fromVault}
                  onValueChange={(value) => {
                    setNewTransfer({
                      ...newTransfer, 
                      fromVault: value,
                      toVault: value === "cold" ? "hot" : "cold"
                    });
                  }}
                >
                  <SelectTrigger id="fromVault">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold Wallet</SelectItem>
                    <SelectItem value="hot">Hot Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="toVault">To Vault</Label>
                <Select 
                  value={newTransfer.toVault}
                  onValueChange={(value) => {
                    setNewTransfer({
                      ...newTransfer,
                      toVault: value,
                      fromVault: value === "cold" ? "hot" : "cold" 
                    });
                  }}
                >
                  <SelectTrigger id="toVault">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold Wallet</SelectItem>
                    <SelectItem value="hot">Hot Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="asset">Asset</Label>
                <Select 
                  value={newTransfer.asset}
                  onValueChange={(value) => setNewTransfer({...newTransfer, asset: value})}
                >
                  <SelectTrigger id="asset">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {balances.map(balance => (
                      <SelectItem key={balance.asset} value={balance.asset}>
                        {balance.asset}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newTransfer.amount}
                  onChange={(e) => setNewTransfer({...newTransfer, amount: e.target.value})}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Reason for transfer"
                value={newTransfer.reason}
                onChange={(e) => setNewTransfer({...newTransfer, reason: e.target.value})}
              />
            </div>
            
            {/* Available balance display */}
            <div className="text-sm">
              {newTransfer.fromVault === "cold" ? (
                <p className="text-muted-foreground">
                  Available in cold wallet:{" "}
                  <span className="font-medium">
                    {balances.find(b => b.asset === newTransfer.asset)?.coldWallet.toLocaleString()}{" "}
                    {newTransfer.asset}
                  </span>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Available in hot wallet:{" "}
                  <span className="font-medium">
                    {balances.find(b => b.asset === newTransfer.asset)?.hotWallet.toLocaleString()}{" "}
                    {newTransfer.asset}
                  </span>
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleTransferSubmit}
              disabled={!newTransfer.amount || !newTransfer.reason}
            >
              <Shield className="h-4 w-4 mr-2" />
              Continue to 2FA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2FA Confirmation Dialog */}
      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>2FA Verification Required</DialogTitle>
            <DialogDescription>
              Please enter your 2FA code to confirm this transfer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Transfer Summary</h4>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="text-muted-foreground">From:</div>
                  <div className="capitalize">{newTransfer.fromVault} Wallet</div>
                  
                  <div className="text-muted-foreground">To:</div>
                  <div className="capitalize">{newTransfer.toVault} Wallet</div>
                  
                  <div className="text-muted-foreground">Asset:</div>
                  <div>{newTransfer.asset}</div>
                  
                  <div className="text-muted-foreground">Amount:</div>
                  <div>{parseFloat(newTransfer.amount).toLocaleString()} {newTransfer.asset}</div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="otpCode">Enter 2FA Code</Label>
                <Input
                  id="otpCode"
                  placeholder="Enter 6-digit code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  For demo purposes, use code: 123456
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShow2FADialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handle2FAVerification}
              disabled={otpCode.length !== 6}
            >
              <Shield className="h-4 w-4 mr-2" />
              Verify and Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Threshold Dialog */}
      <Dialog open={showThresholdDialog} onOpenChange={setShowThresholdDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Threshold Values</DialogTitle>
            <DialogDescription>
              Configure minimum hot wallet balance thresholds for auto-refill warnings.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="thresholdAsset">Asset</Label>
              <Select 
                value={selectedAssetThreshold}
                onValueChange={setSelectedAssetThreshold}
              >
                <SelectTrigger id="thresholdAsset">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  {balances.map(balance => (
                    <SelectItem key={balance.asset} value={balance.asset}>
                      {balance.asset}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="thresholdValue">Threshold Value</Label>
              <Input
                id="thresholdValue"
                type="number"
                placeholder="Enter threshold amount"
                value={thresholdValue}
                onChange={(e) => setThresholdValue(e.target.value)}
              />
            </div>
            
            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">
                Current threshold:{" "}
                <span className="font-medium">
                  {balances.find(b => b.asset === selectedAssetThreshold)?.threshold.toLocaleString()}
                </span>
              </p>
              <p className="text-muted-foreground">
                Current hot wallet balance:{" "}
                <span className="font-medium">
                  {balances.find(b => b.asset === selectedAssetThreshold)?.hotWallet.toLocaleString()}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                When hot wallet balance goes below threshold, warnings will appear.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowThresholdDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleThresholdUpdate}
              disabled={!thresholdValue}
            >
              Save Threshold
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
