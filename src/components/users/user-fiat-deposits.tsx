
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
import { Eye, check, x } from "lucide-react";

interface UserFiatDepositsProps {
  user: any;
}

// Mock fiat deposit data
const mockFiatDeposits = [
  {
    id: "FD12345678",
    status: "pending",
    method: "Bank Transfer",
    amount: 5000,
    currency: "USD",
    fee: 0,
    receipt: "receipt_12345.jpg",
    user: "John Doe",
    userNote: "Monthly deposit for trading",
    timestamp: "2025-05-17T14:25:00Z"
  },
  {
    id: "FD12345679",
    status: "approved",
    method: "Mobile Money",
    amount: 2500,
    currency: "USD",
    fee: 25,
    receipt: "receipt_12346.jpg",
    user: "John Doe",
    userNote: "Deposit for BTC purchase",
    timestamp: "2025-05-16T10:20:00Z"
  },
  {
    id: "FD12345680",
    status: "rejected",
    method: "Credit Card",
    amount: 1000,
    currency: "EUR",
    fee: 30,
    receipt: "receipt_12347.jpg",
    user: "John Doe",
    userNote: "",
    timestamp: "2025-05-15T09:45:00Z"
  },
  {
    id: "FD12345681",
    status: "approved",
    method: "Bank Transfer",
    amount: 10000,
    currency: "USD",
    fee: 0,
    receipt: "receipt_12348.jpg",
    user: "John Doe",
    userNote: "Large deposit for market entry",
    timestamp: "2025-05-14T16:30:00Z"
  },
];

export default function UserFiatDeposits({ user }: UserFiatDepositsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [adminNote, setAdminNote] = useState("");
  
  const itemsPerPage = 5;
  
  // In a real app, these would come from the user's actual fiat deposit data
  // For now, using mock data
  const deposits = mockFiatDeposits;
  
  // Apply filters
  const filteredDeposits = deposits.filter(deposit => {
    const matchesStatus = statusFilter === "all" || deposit.status === statusFilter;
    const matchesMethod = methodFilter === "all" || deposit.method === methodFilter;
    const matchesSearch = 
      deposit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.userNote.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesMethod && matchesSearch;
  });
  
  // Apply pagination
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
  const paginatedDeposits = filteredDeposits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAction = (deposit: any, action: "approve" | "reject") => {
    setSelectedDeposit(deposit);
    setActionType(action);
    setAdminNote("");
    setActionDialogOpen(true);
  };

  const handleViewReceipt = (deposit: any) => {
    setSelectedDeposit(deposit);
    setReceiptDialogOpen(true);
  };

  const handleConfirmAction = () => {
    // In a real app, this would call an API
    console.log("Action confirmed:", {
      depositId: selectedDeposit?.id,
      action: actionType,
      adminNote
    });
    
    setActionDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
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
          <CardTitle>Fiat Deposits</CardTitle>
          <CardDescription>
            Manage fiat currency deposits for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search by ID or notes..."
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
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select 
                  value={methodFilter}
                  onValueChange={setMethodFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Deposits Table */}
            {paginatedDeposits.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead>User Note</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDeposits.map((deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                      <TableCell className="font-mono text-xs">{deposit.id}</TableCell>
                      <TableCell>{deposit.method}</TableCell>
                      <TableCell>
                        {deposit.amount.toLocaleString()} {deposit.currency}
                      </TableCell>
                      <TableCell>
                        {deposit.fee.toLocaleString()} {deposit.currency}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReceipt(deposit)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {deposit.userNote || <span className="text-muted-foreground italic">No note</span>}
                      </TableCell>
                      <TableCell>
                        {new Date(deposit.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {deposit.status === "pending" && (
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleAction(deposit, "approve")}
                            >
                              <check className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleAction(deposit, "reject")}
                            >
                              <x className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No fiat deposits found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredDeposits.length > 0 && (
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
              {actionType === "approve" ? "Approve Deposit" : "Reject Deposit"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" 
                ? "Approve this deposit and credit the user's account." 
                : "Reject this deposit and provide a reason for the user."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Deposit ID</p>
                <p className="font-mono text-sm">{selectedDeposit?.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                <p className="text-sm">
                  {selectedDeposit?.amount.toLocaleString()} {selectedDeposit?.currency}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Method</p>
                <p className="text-sm">{selectedDeposit?.method}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="text-sm">
                  {selectedDeposit && new Date(selectedDeposit.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="adminNote" className="text-sm font-medium">
                Admin Note
              </label>
              <Textarea
                id="adminNote"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder={actionType === "approve" 
                  ? "Optional note for internal reference" 
                  : "Reason for rejection (will be shown to user)"}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmAction}
              variant={actionType === "reject" ? "destructive" : "default"}
            >
              {actionType === "approve" ? "Approve Deposit" : "Reject Deposit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Receipt</DialogTitle>
            <DialogDescription>
              Receipt for deposit {selectedDeposit?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center items-center p-4 border rounded-md bg-muted/50">
            {/* In a real app, this would be an actual image */}
            <div className="w-full h-80 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Receipt Image: {selectedDeposit?.receipt}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setReceiptDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
