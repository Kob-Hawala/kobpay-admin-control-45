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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, X, Eye } from "lucide-react";

interface UserCryptoWithdrawalsProps {
  user: any;
}

// Mock crypto withdrawal data
const mockWithdrawals = [
  {
    id: "WD12345678",
    status: "pending",
    txnHash: "",
    amount: 0.15,
    currency: "BTC",
    fee: 0.0001,
    address: "bc1q9h6tgmqr9p8az8pf4qv9m2zyq7kl3h6y3z7jt",
    paymentId: null,
    network: "BTC",
    systemWalletBalance: 2.5,
    timestamp: "2025-05-17T14:25:00Z"
  },
  {
    id: "WD12345679",
    status: "approved",
    txnHash: "0x7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c",
    amount: 3.2,
    currency: "ETH",
    fee: 0.001,
    address: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
    paymentId: null,
    network: "ERC20",
    systemWalletBalance: 15.8,
    timestamp: "2025-05-16T10:20:00Z"
  },
  {
    id: "WD12345680",
    status: "completed",
    txnHash: "0x5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e",
    amount: 500,
    currency: "USDT",
    fee: 1,
    address: "TJRyWwFs9wTFGZg3JbrVriFbNfCug5tDeC",
    paymentId: "MEMO123456",
    network: "TRC20",
    systemWalletBalance: 25000,
    timestamp: "2025-05-15T09:45:00Z"
  },
  {
    id: "WD12345681",
    status: "rejected",
    txnHash: "",
    amount: 0.05,
    currency: "BTC",
    fee: 0.0001,
    address: "bc1q9h6tgmqr9p8az8pf4qv9m2zyq7kl3h6y3z7jt",
    paymentId: null,
    network: "BTC",
    systemWalletBalance: 2.5,
    timestamp: "2025-05-14T16:30:00Z"
  },
];

export default function UserCryptoWithdrawals({ user }: UserCryptoWithdrawalsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | "sent">("approve");
  const [txnHash, setTxnHash] = useState("");
  const [reason, setReason] = useState("");
  
  const itemsPerPage = 5;
  
  // In a real app, these would come from the user's actual withdrawal data
  // For now, using mock data
  const withdrawals = mockWithdrawals;
  
  // Apply filters
  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesStatus = statusFilter === "all" || withdrawal.status === statusFilter;
    const matchesSearch = 
      withdrawal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (withdrawal.txnHash && withdrawal.txnHash.toLowerCase().includes(searchQuery.toLowerCase())) ||
      withdrawal.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Apply pagination
  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const paginatedWithdrawals = filteredWithdrawals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, we would show a toast notification
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    // In a real app, we would show a toast notification
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    // In a real app, we would show a toast notification
  };

  const handleAction = (withdrawal: any, action: "approve" | "reject" | "sent") => {
    setSelectedWithdrawal(withdrawal);
    setActionType(action);
    setTxnHash("");
    setReason("");
    setActionDialogOpen(true);
  };

  const handleConfirmAction = () => {
    // In a real app, this would call an API
    console.log("Action confirmed:", {
      withdrawalId: selectedWithdrawal?.id,
      action: actionType,
      txnHash,
      reason
    });
    
    setActionDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Crypto Withdrawals</CardTitle>
          <CardDescription>
            Manage cryptocurrency withdrawals for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by ID, hash or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Select 
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Withdrawals Table */}
            {paginatedWithdrawals.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>TXN Hash</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>System Balance</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedWithdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">{withdrawal.id}</span>
                          <button
                            onClick={() => handleCopy(withdrawal.id)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy ID</span>
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center gap-2">
                          {withdrawal.txnHash ? (
                            <>
                              {withdrawal.txnHash.substring(0, 8)}...{withdrawal.txnHash.slice(-4)}
                              <button
                                onClick={() => handleCopyHash(withdrawal.txnHash)}
                                className="text-primary hover:text-primary/80"
                              >
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy hash</span>
                              </button>
                            </>
                          ) : (
                            <span className="text-muted-foreground italic">Pending</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {withdrawal.amount} {withdrawal.currency}
                      </TableCell>
                      <TableCell>
                        {withdrawal.fee} {withdrawal.currency}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {withdrawal.address.substring(0, 8)}...{withdrawal.address.slice(-4)}
                          <button
                            onClick={() => handleCopyAddress(withdrawal.address)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy address</span>
                          </button>
                        </div>
                        {withdrawal.paymentId && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            ID: {withdrawal.paymentId}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{withdrawal.network}</TableCell>
                      <TableCell>
                        {withdrawal.systemWalletBalance} {withdrawal.currency}
                      </TableCell>
                      <TableCell>
                        {new Date(withdrawal.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {withdrawal.status === "pending" && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleAction(withdrawal, "approve")}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleAction(withdrawal, "reject")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {withdrawal.status === "approved" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAction(withdrawal, "sent")}
                            >
                              Mark Sent
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No withdrawals found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredWithdrawals.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Withdrawal"}
              {actionType === "reject" && "Reject Withdrawal"}
              {actionType === "sent" && "Mark Withdrawal as Sent"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" && "Approve this withdrawal request to proceed with processing."}
              {actionType === "reject" && "Reject this withdrawal and provide a reason for the user."}
              {actionType === "sent" && "Mark this withdrawal as sent by providing the transaction hash."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Withdrawal ID</p>
                <p className="font-mono text-sm">{selectedWithdrawal?.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                <p className="text-sm">{selectedWithdrawal?.amount} {selectedWithdrawal?.currency}</p>
              </div>
            </div>
            
            {actionType === "sent" && (
              <div className="space-y-2">
                <label htmlFor="txnHash" className="text-sm font-medium">
                  Transaction Hash
                </label>
                <Input
                  id="txnHash"
                  value={txnHash}
                  onChange={(e) => setTxnHash(e.target.value)}
                  placeholder="Enter blockchain transaction hash"
                />
              </div>
            )}
            
            {actionType === "reject" && (
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Rejection Reason
                </label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide a reason for rejecting this withdrawal"
                  rows={3}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmAction}
              variant={actionType === "reject" ? "destructive" : "default"}
            >
              {actionType === "approve" && "Approve"}
              {actionType === "reject" && "Reject"}
              {actionType === "sent" && "Confirm Sent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
