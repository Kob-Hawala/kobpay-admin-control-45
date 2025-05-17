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
import { Copy, Eye } from "lucide-react";

interface UserCryptoDepositsProps {
  user: any;
}

// Mock crypto deposit data
const mockCryptoDeposits = [
  {
    id: "CD12345678",
    status: "pending",
    asset: "BTC",
    amount: 1.5,
    txnHash: "0xabcdef1234567890",
    address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    timestamp: "2025-05-17T14:25:00Z"
  },
  {
    id: "CD12345679",
    status: "completed",
    asset: "ETH",
    amount: 10,
    txnHash: "0x9876543210fedcba",
    address: "0x1234567890abcdef",
    timestamp: "2025-05-16T10:20:00Z"
  },
  {
    id: "CD12345680",
    status: "rejected",
    asset: "USDT",
    amount: 500,
    txnHash: "0xdeadbeef00000000",
    address: "0x00000000deadbeef",
    timestamp: "2025-05-15T09:45:00Z"
  },
  {
    id: "CD12345681",
    status: "completed",
    asset: "LTC",
    amount: 25,
    txnHash: "0xcafebeef11112222",
    address: "LVg2w1vBMSEYstWetqTFn5Au4m4GFg7xJa",
    timestamp: "2025-05-14T16:30:00Z"
  },
];

export default function UserCryptoDeposits({ user }: UserCryptoDepositsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [assetFilter, setAssetFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
  
  const itemsPerPage = 5;
  
  // In a real app, these would come from the user's actual crypto deposit data
  // For now, using mock data
  const deposits = mockCryptoDeposits;
  
  // Apply filters
  const filteredDeposits = deposits.filter(deposit => {
    const matchesStatus = statusFilter === "all" || deposit.status === statusFilter;
    const matchesAsset = assetFilter === "all" || deposit.asset === assetFilter;
    const matchesSearch = 
      deposit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.txnHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesAsset && matchesSearch;
  });
  
  // Apply pagination
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
  const paginatedDeposits = filteredDeposits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (deposit: any) => {
    setSelectedDeposit(deposit);
    setDetailsDialogOpen(true);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    // In a real app, you would show a toast notification here
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    // In a real app, you would show a toast notification here
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
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
          <CardTitle>Crypto Deposits</CardTitle>
          <CardDescription>
            Manage cryptocurrency deposits for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search by ID, hash, or address..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select 
                  value={assetFilter}
                  onValueChange={setAssetFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="LTC">LTC</SelectItem>
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
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Txn Hash</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDeposits.map((deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                      <TableCell className="font-mono text-xs">{deposit.id}</TableCell>
                      <TableCell>{deposit.asset}</TableCell>
                      <TableCell>{deposit.amount.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center gap-2">
                          {deposit.txnHash.substring(0, 10)}...{deposit.txnHash.slice(-4)}
                          <button
                            onClick={() => handleCopyHash(deposit.txnHash)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy hash</span>
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center gap-2">
                          {deposit.address.substring(0, 10)}...{deposit.address.slice(-4)}
                          <button
                            onClick={() => handleCopyAddress(deposit.address)}
                            className="text-primary hover:text-primary/80"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy address</span>
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(deposit.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(deposit)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No crypto deposits found matching your criteria.</p>
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

      {/* Deposit Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Details</DialogTitle>
            <DialogDescription>
              Detailed information for deposit {selectedDeposit?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDeposit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Deposit ID</p>
                  <p className="font-mono text-sm">{selectedDeposit.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div>{getStatusBadge(selectedDeposit.status)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Asset</p>
                  <p>{selectedDeposit.asset}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p>{selectedDeposit.amount.toLocaleString()} {selectedDeposit.asset}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Transaction Hash</p>
                  <div className="flex gap-2">
                    <Input value={selectedDeposit?.txnHash || ""} disabled className="font-mono text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => selectedDeposit && handleCopyHash(selectedDeposit.txnHash)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <div className="flex gap-2">
                    <Input value={selectedDeposit?.address || ""} disabled className="font-mono text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => selectedDeposit && handleCopyAddress(selectedDeposit.address)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-sm">
                    {selectedDeposit && new Date(selectedDeposit.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
