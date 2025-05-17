
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Database, 
  TrendingUp, 
  Settings, 
  Check,
  Lock
} from "lucide-react";
import { mockVaultTransfers, mockVaultBalances, VaultTransfer, VaultBalance } from "@/data/mock-vault-data";

export default function VaultTransfers() {
  const [transfers, setTransfers] = useState<VaultTransfer[]>(mockVaultTransfers);
  const [balances, setBalances] = useState<VaultBalance[]>(mockVaultBalances);
  
  const [showNewTransferDialog, setShowNewTransferDialog] = useState(false);
  const [showThresholdDialog, setShowThresholdDialog] = useState(false);
  const [showConfirmTransferDialog, setShowConfirmTransferDialog] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  
  const [newTransfer, setNewTransfer] = useState({
    fromVault: "hot",
    toVault: "cold",
    asset: "BTC",
    amount: "",
    reason: ""
  });
  
  const [editingBalance, setEditingBalance] = useState<VaultBalance | null>(null);
  
  // Handle create new transfer
  const handleCreateTransfer = () => {
    const id = `vt-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
    
    const newTransferEntry: VaultTransfer = {
      id,
      fromVault: newTransfer.fromVault as "cold" | "hot",
      toVault: newTransfer.toVault as "cold" | "hot",
      asset: newTransfer.asset,
      amount: parseFloat(newTransfer.amount),
      status: "pending",
      initiatedBy: "admin-1", // Mock admin ID
      timestamp: new Date().toISOString(),
      reason: newTransfer.reason || "Manual transfer"
    };
    
    setShowNewTransferDialog(false);
    setShowConfirmTransferDialog(true);
    
    // In a real app, we would send the OTP code to the admin's phone or email here
    toast.info("2FA code sent to your device");
    
    // Store the new transfer in state to be confirmed later
    setNewTransfer({
      ...newTransfer,
      transferId: id
    } as any);
  };
  
  // Handle confirm transfer with 2FA
  const handleConfirmTransfer = () => {
    if (otpCode !== "123456") { // Mock OTP code validation
      toast.error("Invalid 2FA code. Please try again.");
      return;
    }
    
    const newTransferEntry: VaultTransfer = {
      id: (newTransfer as any).transferId,
      fromVault: newTransfer.fromVault as "cold" | "hot",
      toVault: newTransfer.toVault as "cold" | "hot",
      asset: newTransfer.asset,
      amount: parseFloat(newTransfer.amount),
      status: "completed",
      initiatedBy: "admin-1", // Mock admin ID
      confirmedBy: "admin-1", // Mock admin ID
      timestamp: new Date().toISOString(),
      reason: newTransfer.reason || "Manual transfer"
    };
    
    setTransfers([newTransferEntry, ...transfers]);
    
    // Update vault balances
    const updatedBalances = [...balances];
    const balanceIndex = updatedBalances.findIndex(b => b.asset === newTransfer.asset);
    
    if (balanceIndex >= 0) {
      const amount = parseFloat(newTransfer.amount);
      if (newTransfer.fromVault === "cold") {
        updatedBalances[balanceIndex] = {
          ...updatedBalances[balanceIndex],
          coldWallet: updatedBalances[balanceIndex].coldWallet - amount,
          hotWallet: updatedBalances[balanceIndex].hotWallet + amount,
          lowLiquidityWarning: (updatedBalances[balanceIndex].hotWallet + amount) < updatedBalances[balanceIndex].threshold
        };
      } else {
        updatedBalances[balanceIndex] = {
          ...updatedBalances[balanceIndex],
          hotWallet: updatedBalances[balanceIndex].hotWallet - amount,
          coldWallet: updatedBalances[balanceIndex].coldWallet + amount,
          lowLiquidityWarning: updatedBalances[balanceIndex].hotWallet - amount < updatedBalances[balanceIndex].threshold
        };
      }
      
      setBalances(updatedBalances);
    }
    
    setShowConfirmTransferDialog(false);
    setOtpCode("");
    setNewTransfer({
      fromVault: "hot",
      toVault: "cold",
      asset: "BTC",
      amount: "",
      reason: ""
    });
    
    toast.success("Transfer completed successfully");
  };
  
  // Handle save threshold
  const handleSaveThreshold = () => {
    if (editingBalance) {
      const updatedBalances = balances.map(balance => 
        balance.asset === editingBalance.asset ? 
        {
          ...editingBalance,
          lowLiquidityWarning: editingBalance.hotWallet < editingBalance.threshold
        } : balance
      );
      
      setBalances(updatedBalances);
      setEditingBalance(null);
      setShowThresholdDialog(false);
      
      toast.success(`Threshold for ${editingBalance.asset} updated successfully`);
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="balances" className="space-y-4">
        <TabsList>
          <TabsTrigger value="balances">Vault Balances</TabsTrigger>
          <TabsTrigger value="transfers">Transfer History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="balances" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-lg font-semibold">
              Current Hot/Cold Wallet Balances
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setShowThresholdDialog(true)}>
                <Settings className="h-4 w-4 mr-2" /> Set Thresholds
              </Button>
              <Button onClick={() => setShowNewTransferDialog(true)}>
                <TrendingUp className="h-4 w-4 mr-2" /> New Transfer
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Hot Wallet</TableHead>
                    <TableHead>Cold Wallet</TableHead>
                    <TableHead>Total Balance</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {balances.map((balance) => (
                    <TableRow key={balance.asset}>
                      <TableCell className="font-medium">{balance.asset}</TableCell>
                      <TableCell>
                        {balance.hotWallet.toLocaleString()} 
                        {balance.lowLiquidityWarning && (
                          <Badge className="ml-2 bg-yellow-500">Low</Badge>
                        )}
                      </TableCell>
                      <TableCell>{balance.coldWallet.toLocaleString()}</TableCell>
                      <TableCell>{(balance.hotWallet + balance.coldWallet).toLocaleString()}</TableCell>
                      <TableCell>{balance.threshold.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={balance.lowLiquidityWarning ? "bg-yellow-500" : "bg-green-500"}>
                          {balance.lowLiquidityWarning ? 'Low Liquidity' : 'Healthy'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingBalance(balance);
                              setShowThresholdDialog(true);
                            }}
                          >
                            Set Threshold
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setNewTransfer({
                                fromVault: "cold",
                                toVault: "hot",
                                asset: balance.asset,
                                amount: "",
                                reason: balance.lowLiquidityWarning ? "Low liquidity refill" : ""
                              });
                              setShowNewTransferDialog(true);
                            }}
                          >
                            Transfer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transfers" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-lg font-semibold">
              Vault Transfer History
            </div>
            <Button onClick={() => setShowNewTransferDialog(true)}>
              <TrendingUp className="h-4 w-4 mr-2" /> New Transfer
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Asset & Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Initiated By</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfers.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-medium">{transfer.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge className={`${transfer.fromVault === 'cold' ? 'bg-blue-500' : 'bg-orange-500'} mr-2`}>
                            {transfer.fromVault.toUpperCase()}
                          </Badge>
                          <ArrowRight className="h-4 w-4 mx-1" />
                          <Badge className={`${transfer.toVault === 'cold' ? 'bg-blue-500' : 'bg-orange-500'} ml-2`}>
                            {transfer.toVault.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{transfer.amount} {transfer.asset}</TableCell>
                      <TableCell>{new Date(transfer.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            transfer.status === 'completed' ? "bg-green-500" :
                            transfer.status === 'pending' ? "bg-yellow-500" :
                            "bg-red-500"
                          }
                        >
                          {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          {transfer.initiatedBy}
                          {transfer.confirmedBy && (
                            <div className="text-xs text-muted-foreground">
                              Confirmed by: {transfer.confirmedBy}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{transfer.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Transfer Dialog */}
      <Dialog open={showNewTransferDialog} onOpenChange={setShowNewTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Vault Transfer</DialogTitle>
            <DialogDescription>
              Move funds between hot and cold wallets securely.
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
                      toVault: value === 'hot' ? 'cold' : 'hot'
                    });
                  }}
                >
                  <SelectTrigger id="fromVault">
                    <SelectValue placeholder="Select vault" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot Wallet</SelectItem>
                    <SelectItem value="cold">Cold Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="toVault">To Vault</Label>
                <Select 
                  value={newTransfer.toVault}
                  disabled
                >
                  <SelectTrigger id="toVault">
                    <SelectValue placeholder="Select vault" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot Wallet</SelectItem>
                    <SelectItem value="cold">Cold Wallet</SelectItem>
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
                      <SelectItem key={balance.asset} value={balance.asset}>{balance.asset}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.0001"
                  value={newTransfer.amount}
                  onChange={(e) => setNewTransfer({...newTransfer, amount: e.target.value})}
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                value={newTransfer.reason}
                onChange={(e) => setNewTransfer({...newTransfer, reason: e.target.value})}
                placeholder="Reason for transfer"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTransferDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateTransfer}
              disabled={!newTransfer.amount || parseFloat(newTransfer.amount) <= 0}
            >
              <Lock className="h-4 w-4 mr-2" />
              Continue to 2FA Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 2FA Confirmation Dialog */}
      <Dialog open={showConfirmTransferDialog} onOpenChange={setShowConfirmTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>2FA Verification Required</DialogTitle>
            <DialogDescription>
              For security, please enter the 2FA code sent to your device.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 rounded-md border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                You are about to transfer {newTransfer.amount} {newTransfer.asset} from {newTransfer.fromVault} wallet to {newTransfer.toVault} wallet.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="otpCode">2FA Code</Label>
              <Input
                id="otpCode"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                For demo purposes, use code: 123456
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmTransferDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleConfirmTransfer}
              disabled={otpCode.length !== 6}
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Set Threshold Dialog */}
      <Dialog open={showThresholdDialog} onOpenChange={() => {
        setShowThresholdDialog(false);
        setEditingBalance(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Liquidity Thresholds</DialogTitle>
            <DialogDescription>
              Configure thresholds for automatic low-liquidity warnings.
            </DialogDescription>
          </DialogHeader>
          
          {editingBalance ? (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Asset</Label>
                <div className="font-medium">{editingBalance.asset}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Hot Wallet Balance</Label>
                  <div className="font-medium">{editingBalance.hotWallet.toLocaleString()} {editingBalance.asset}</div>
                </div>
                <div className="grid gap-2">
                  <Label>Cold Wallet Balance</Label>
                  <div className="font-medium">{editingBalance.coldWallet.toLocaleString()} {editingBalance.asset}</div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="threshold">Minimum Hot Wallet Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.0001"
                  value={editingBalance.threshold}
                  onChange={(e) => setEditingBalance({
                    ...editingBalance, 
                    threshold: parseFloat(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  When hot wallet balance falls below this threshold, a warning will be shown.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Current Threshold</TableHead>
                    <TableHead>Hot Wallet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {balances.map((balance) => (
                    <TableRow key={balance.asset}>
                      <TableCell className="font-medium">{balance.asset}</TableCell>
                      <TableCell>{balance.threshold.toLocaleString()}</TableCell>
                      <TableCell>{balance.hotWallet.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={balance.lowLiquidityWarning ? "bg-yellow-500" : "bg-green-500"}>
                          {balance.lowLiquidityWarning ? 'Low Liquidity' : 'Healthy'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingBalance(balance)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <DialogFooter>
            {editingBalance ? (
              <>
                <Button variant="outline" onClick={() => setEditingBalance(null)}>Cancel</Button>
                <Button onClick={handleSaveThreshold}>Save Threshold</Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setShowThresholdDialog(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
