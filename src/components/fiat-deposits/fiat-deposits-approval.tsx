
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
import { Search, Filter, Check, X, Plus, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { mockFiatDeposits, FiatDeposit } from "@/data/mock-fiat-deposit-data";

export default function FiatDepositsApproval() {
  const [deposits, setDeposits] = useState<FiatDeposit[]>(mockFiatDeposits);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currencyFilter, setCurrencyFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  
  const [viewReceipt, setViewReceipt] = useState<FiatDeposit | null>(null);
  const [approveDeposit, setApproveDeposit] = useState<FiatDeposit | null>(null);
  const [rejectDeposit, setRejectDeposit] = useState<FiatDeposit | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  
  const [showManualEntryDialog, setShowManualEntryDialog] = useState(false);
  const [newDeposit, setNewDeposit] = useState({
    userId: "",
    userName: "",
    amount: "",
    currency: "USD",
    source: "",
  });

  // Unique lists for filters
  const uniqueCurrencies = [...new Set(deposits.map(d => d.currency))];
  const uniqueSources = [...new Set(deposits.map(d => d.source))];

  // Filter deposits
  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch = 
      deposit.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? deposit.status === statusFilter : true;
    const matchesCurrency = currencyFilter ? deposit.currency === currencyFilter : true;
    const matchesSource = sourceFilter ? deposit.source === sourceFilter : true;
    
    return matchesSearch && matchesStatus && matchesCurrency && matchesSource;
  });

  // Handle approve deposit
  const handleApproveDeposit = () => {
    if (approveDeposit) {
      const updatedDeposit = {
        ...approveDeposit,
        status: "approved" as const,
        updatedAt: new Date().toISOString(),
        adminId: "admin-1" // Mock admin ID
      };
      
      setDeposits(deposits.map(d => 
        d.id === updatedDeposit.id ? updatedDeposit : d
      ));
      
      toast.success(`Deposit from ${approveDeposit.userName} has been approved`);
      setApproveDeposit(null);
    }
  };

  // Handle reject deposit
  const handleRejectDeposit = () => {
    if (rejectDeposit) {
      const updatedDeposit = {
        ...rejectDeposit,
        status: "rejected" as const,
        comment: rejectReason,
        updatedAt: new Date().toISOString(),
        adminId: "admin-1" // Mock admin ID
      };
      
      setDeposits(deposits.map(d => 
        d.id === updatedDeposit.id ? updatedDeposit : d
      ));
      
      toast.success(`Deposit from ${rejectDeposit.userName} has been rejected`);
      setRejectDeposit(null);
      setRejectReason("");
    }
  };

  // Handle add manual deposit
  const handleAddManualDeposit = () => {
    const id = `fd-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
    
    const newDepositEntry: FiatDeposit = {
      id,
      userId: newDeposit.userId,
      userName: newDeposit.userName,
      amount: parseFloat(newDeposit.amount),
      currency: newDeposit.currency,
      receiptUrl: "https://placehold.co/600x400?text=Manual+Entry",
      status: "approved",
      comment: "Manual entry by admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      adminId: "admin-1", // Mock admin ID
      source: newDeposit.source || "Admin Manual Entry",
    };
    
    setDeposits([newDepositEntry, ...deposits]);
    setShowManualEntryDialog(false);
    setNewDeposit({
      userId: "",
      userName: "",
      amount: "",
      currency: "USD",
      source: "",
    });
    
    toast.success("Manual deposit entry added successfully");
  };

  const statusBadgeColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-500 hover:bg-yellow-600";
      case "approved": return "bg-green-500 hover:bg-green-600";
      case "rejected": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deposits..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select 
            value={statusFilter || "none"} 
            onValueChange={(value) => setStatusFilter(value === "none" ? null : value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={currencyFilter || "none"} 
            onValueChange={(value) => setCurrencyFilter(value === "none" ? null : value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All currencies</SelectItem>
              {uniqueCurrencies.map(currency => (
                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={sourceFilter || "none"} 
            onValueChange={(value) => setSourceFilter(value === "none" ? null : value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All sources</SelectItem>
              {uniqueSources.map(source => (
                <SelectItem key={source} value={source}>{source}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={() => setShowManualEntryDialog(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Manual Entry
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Fiat Deposits</CardTitle>
          <CardDescription>
            Review and manage fiat deposit requests from users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeposits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No deposits found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDeposits.map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell className="font-medium">{deposit.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{deposit.userName}</div>
                      <div className="text-xs text-muted-foreground">{deposit.userId}</div>
                    </TableCell>
                    <TableCell>
                      {deposit.amount.toLocaleString()} {deposit.currency}
                    </TableCell>
                    <TableCell>{deposit.source}</TableCell>
                    <TableCell>
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusBadgeColor(deposit.status)}>
                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewReceipt(deposit)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {deposit.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-700"
                              onClick={() => setApproveDeposit(deposit)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => setRejectDeposit(deposit)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* View Receipt Dialog */}
      <Dialog open={!!viewReceipt} onOpenChange={() => setViewReceipt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Receipt from {viewReceipt?.userName}</DialogTitle>
            <DialogDescription>
              Amount: {viewReceipt?.amount.toLocaleString()} {viewReceipt?.currency}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
              <img 
                src={viewReceipt?.receiptUrl} 
                alt="Receipt" 
                className="w-full h-auto object-contain max-h-96"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Deposit ID:</p>
                <p>{viewReceipt?.id}</p>
              </div>
              <div>
                <p className="font-medium">Source:</p>
                <p>{viewReceipt?.source}</p>
              </div>
              <div>
                <p className="font-medium">Created:</p>
                <p>{new Date(viewReceipt?.createdAt || "").toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Status:</p>
                <Badge className={viewReceipt ? statusBadgeColor(viewReceipt.status) : ""}>
                  {viewReceipt?.status.charAt(0).toUpperCase()}{viewReceipt?.status.slice(1)}
                </Badge>
              </div>
              {viewReceipt?.comment && (
                <div className="col-span-2">
                  <p className="font-medium">Comment:</p>
                  <p>{viewReceipt.comment}</p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewReceipt(null)}>Close</Button>
            {viewReceipt?.status === "pending" && (
              <div className="flex space-x-2">
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    setApproveDeposit(viewReceipt);
                    setViewReceipt(null);
                  }}
                >
                  <Check className="h-4 w-4 mr-2" /> Approve
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    setRejectDeposit(viewReceipt);
                    setViewReceipt(null);
                  }}
                >
                  <X className="h-4 w-4 mr-2" /> Reject
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Approve Deposit Dialog */}
      <Dialog open={!!approveDeposit} onOpenChange={() => setApproveDeposit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Deposit</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this deposit? This will update the user's fiat balance.
            </DialogDescription>
          </DialogHeader>
          
          {approveDeposit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User</Label>
                  <div className="font-medium">{approveDeposit.userName}</div>
                </div>
                <div>
                  <Label>Amount</Label>
                  <div className="font-medium">{approveDeposit.amount.toLocaleString()} {approveDeposit.currency}</div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDeposit(null)}>Cancel</Button>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={handleApproveDeposit}
            >
              <Check className="h-4 w-4 mr-2" /> Approve Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Deposit Dialog */}
      <Dialog open={!!rejectDeposit} onOpenChange={() => setRejectDeposit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Deposit</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this deposit.
            </DialogDescription>
          </DialogHeader>
          
          {rejectDeposit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User</Label>
                  <div className="font-medium">{rejectDeposit.userName}</div>
                </div>
                <div>
                  <Label>Amount</Label>
                  <div className="font-medium">{rejectDeposit.amount.toLocaleString()} {rejectDeposit.currency}</div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment">Rejection Reason</Label>
                <Input
                  id="comment"
                  placeholder="Enter a reason for rejection"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDeposit(null)}>Cancel</Button>
            <Button 
              className="bg-red-500 hover:bg-red-600"
              onClick={handleRejectDeposit}
              disabled={!rejectReason.trim()}
            >
              <X className="h-4 w-4 mr-2" /> Reject Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Manual Entry Dialog */}
      <Dialog open={showManualEntryDialog} onOpenChange={setShowManualEntryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Manual Deposit Entry</DialogTitle>
            <DialogDescription>
              Create a manual fiat deposit entry for a user.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                placeholder="Enter user ID"
                value={newDeposit.userId}
                onChange={(e) => setNewDeposit({...newDeposit, userId: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                placeholder="Enter user name"
                value={newDeposit.userName}
                onChange={(e) => setNewDeposit({...newDeposit, userName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newDeposit.amount}
                  onChange={(e) => setNewDeposit({...newDeposit, amount: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={newDeposit.currency} 
                  onValueChange={(value) => setNewDeposit({...newDeposit, currency: value})}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                placeholder="Enter deposit source"
                value={newDeposit.source}
                onChange={(e) => setNewDeposit({...newDeposit, source: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManualEntryDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleAddManualDeposit}
              disabled={
                !newDeposit.userId.trim() || 
                !newDeposit.userName.trim() || 
                !newDeposit.amount.trim()
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Manual Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
