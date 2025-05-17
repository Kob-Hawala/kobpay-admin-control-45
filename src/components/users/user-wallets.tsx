
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
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Wallet } from "lucide-react";

interface UserWalletsProps {
  user: any;
}

export default function UserWallets({ user }: UserWalletsProps) {
  const [isFundDialogOpen, setIsFundDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [txnHash, setTxnHash] = useState("");

  const handleFundWallet = (wallet: any) => {
    setSelectedWallet(wallet);
    setIsFundDialogOpen(true);
  };

  const handleConfirmFund = () => {
    // This would be an API call in a real application
    console.log("Funding wallet:", {
      wallet: selectedWallet,
      amount,
      txnHash
    });
    
    // Close dialog and reset form
    setIsFundDialogOpen(false);
    setAmount("");
    setTxnHash("");
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    // In a real app, you would show a toast notification here
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Wallets</CardTitle>
          <CardDescription>
            Manage and monitor user cryptocurrency wallets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.wallets && user.wallets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Currency</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Vault ID</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>In Orders</TableHead>
                  <TableHead>Pending Withdraw</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.wallets.map((walletItem: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{walletItem.currency}</TableCell>
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center gap-2">
                        {walletItem.address.substring(0, 10)}...{walletItem.address.slice(-4)}
                        <button
                          onClick={() => handleCopyAddress(walletItem.address)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy address</span>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>{walletItem.networkType}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {walletItem.vaultId || "N/A"}
                    </TableCell>
                    <TableCell>{walletItem.balance.toLocaleString()}</TableCell>
                    <TableCell>{walletItem.inOrders || "0"}</TableCell>
                    <TableCell>{walletItem.pendingWithdraw || "0"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex gap-1"
                        onClick={() => handleFundWallet(walletItem)}
                      >
                        <Wallet className="h-4 w-4" />
                        Fund
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No wallets found for this user.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isFundDialogOpen} onOpenChange={setIsFundDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fund User Wallet</DialogTitle>
            <DialogDescription>
              Add funds to the user's {selectedWallet?.currency} wallet as an administrative action.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input value={selectedWallet?.currency || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="flex gap-2">
                <Input value={selectedWallet?.address || ""} disabled className="font-mono text-xs" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => selectedWallet && handleCopyAddress(selectedWallet.address)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="txnHash">Transaction Hash (optional)</Label>
              <Input
                id="txnHash"
                placeholder="0x..."
                value={txnHash}
                onChange={(e) => setTxnHash(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFundDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmFund}>Confirm Fund</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
