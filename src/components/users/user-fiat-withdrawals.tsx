
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
import { Eye, Check } from "lucide-react";

interface UserFiatWithdrawalsProps {
  user: any;
}

// Mock fiat withdrawal data
const mockFiatWithdrawals = [
  {
    id: "FW12345678",
    status: "pending",
    amount: 3000,
    fee: 15,
    currency: "USD",
    bankInfo: {
      bankName: "Chase Bank",
      accountNumber: "XXXX4567",
      accountName: "John Doe",
      routingNumber: "072412345",
    },
    timestamp: "2025-05-17T14:25:00Z"
  },
  {
    id: "FW12345679",
    status: "processing",
    amount: 5000,
    fee: 25,
    currency: "USD",
    bankInfo: {
      bankName: "Bank of America",
      accountNumber: "XXXX7890",
      accountName: "John Doe",
      routingNumber: "026009593",
    },
    timestamp: "2025-05-16T10:20:00Z"
  },
  {
    id: "FW12345680",
    status: "completed",
    amount: 1000,
    fee: 5,
    currency: "EUR",
    bankInfo: {
      bankName: "Deutsche Bank",
      accountNumber: "DE89370400440532013000",
      accountName: "John Doe",
      routingNumber: "N/A",
    },
    timestamp: "2025-05-15T09:45:00Z"
  },
  {
    id: "FW12345681",
    status: "rejected",
    amount: 2000,
    fee: 10,
    currency: "USD",
    bankInfo: {
      bankName: "Wells Fargo",
      accountNumber: "XXXX1234",
      accountName: "John Doe",
      routingNumber: "121000248",
    },
    timestamp: "2025-05-14T16:30:00Z"
  },
];

export default function UserFiatWithdrawals({ user }: UserFiatWithdrawalsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [bankInfoDialogOpen, setBankInfoDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [paymentReference, setPaymentReference] = useState("");
  const [adminNote, setAdminNote] = useState("");
  
  const itemsPerPage = 5;
  
  // In a real app, these would come from the user's actual fiat withdrawal data
  // For now, using mock data
  const withdrawals = mockFiatWithdrawals;
  
  // Apply filters
  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesStatus = statusFilter === "all" || withdrawal.status === statusFilter;
    const matchesSearch = 
      withdrawal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.bankInfo.bankName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Apply pagination
  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const paginatedWithdrawals = filteredWithdrawals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleMarkAsPaid = (withdrawal: any) => {
    setSelectedWithdrawal(withdrawal);
    setPaymentReference("");
    setAdminNote("");
    setActionDialogOpen(true);
  };

  const handleViewBankInfo = (withdrawal: any) => {
    setSelectedWithdrawal(withdrawal);
    setBankInfoDialogOpen(true);
  };

  const handleConfirmPaid = () => {
    // In a real app, this would call an API
    console.log("Marked as paid:", {
      withdrawalId: selectedWithdrawal?.id,
      paymentReference,
      adminNote
    });
    
    setActionDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "processing":
        return <Badge variant="warning">Processing</Badge>;
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
          <CardTitle>Fiat Withdrawals</CardTitle>
          <CardDescription>
            Manage fiat currency withdrawals for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Search by ID or bank name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Select 
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
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
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Bank Info</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedWithdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                      <TableCell className="font-mono text-xs">{withdrawal.id}</TableCell>
                      <TableCell>
                        {withdrawal.amount.toLocaleString()} {withdrawal.currency}
                      </TableCell>
                      <TableCell>
                        {withdrawal.fee.toLocaleString()} {withdrawal.currency}
                      </TableCell>
                      <TableCell>
                        {(withdrawal.amount + withdrawal.fee).toLocaleString()} {withdrawal.currency}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewBankInfo(withdrawal)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                      <TableCell>
                        {new Date(withdrawal.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {(withdrawal.status === "pending" || withdrawal.status === "processing") && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center"
                            onClick={() => handleMarkAsPaid(withdrawal)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Mark as Paid
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No fiat withdrawals found matching your criteria.</p>
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

      {/* Mark as Paid Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Mark Withdrawal as Paid
            </DialogTitle>
            <DialogDescription>
              Confirm that you have completed the payment for this withdrawal.
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
                <p className="text-sm">
                  {selectedWithdrawal?.amount.toLocaleString()} {selectedWithdrawal?.currency}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Fee</p>
                <p className="text-sm">
                  {selectedWithdrawal?.fee.toLocaleString()} {selectedWithdrawal?.currency}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-sm font-medium">
                  {selectedWithdrawal && (selectedWithdrawal.amount + selectedWithdrawal.fee).toLocaleString()} {selectedWithdrawal?.currency}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="paymentReference" className="text-sm font-medium">
                Payment Reference
              </label>
              <Input
                id="paymentReference"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Bank reference number or transaction ID"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="adminNote" className="text-sm font-medium">
                Admin Note (Optional)
              </label>
              <Textarea
                id="adminNote"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Additional notes for internal reference"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmPaid}
            >
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bank Info Dialog */}
      <Dialog open={bankInfoDialogOpen} onOpenChange={setBankInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bank Information</DialogTitle>
            <DialogDescription>
              Details for withdrawal {selectedWithdrawal?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedWithdrawal && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                  <p className="font-medium">{selectedWithdrawal.bankInfo.bankName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                  <p>{selectedWithdrawal.bankInfo.accountName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                  <p className="font-mono">{selectedWithdrawal.bankInfo.accountNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Routing/SWIFT Code</p>
                  <p className="font-mono">{selectedWithdrawal.bankInfo.routingNumber}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setBankInfoDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
