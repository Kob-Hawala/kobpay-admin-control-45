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
import { Copy } from "lucide-react";

interface UserCryptoDepositsProps {
  user: any;
}

// Mock crypto deposit data
const mockDeposits = [
  {
    id: "DEP12345678",
    status: "completed",
    txnHash: "0x8a9c7b5d3e2f1a0c8b7d6e5f4c3b2a1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b",
    amount: 0.25,
    currency: "BTC",
    address: "bc1q9h6tgmqr9p8az8pf4qv9m2zyq7kl3h6y3z7jt",
    network: "BTC",
    confirmations: "6/6",
    timestamp: "2025-05-10T14:25:00Z"
  },
  {
    id: "DEP12345679",
    status: "completed",
    txnHash: "0x7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c",
    amount: 5.75,
    currency: "ETH",
    address: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
    network: "ERC20",
    confirmations: "12/12",
    timestamp: "2025-05-09T10:20:00Z"
  },
  {
    id: "DEP12345680",
    status: "pending",
    txnHash: "0x5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e",
    amount: 1000,
    currency: "USDT",
    address: "TJRyWwFs9wTFGZg3JbrVriFbNfCug5tDeC",
    network: "TRC20",
    confirmations: "2/6",
    timestamp: "2025-05-17T09:45:00Z"
  },
  {
    id: "DEP12345681",
    status: "failed",
    txnHash: "0x3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a",
    amount: 0.1,
    currency: "BTC",
    address: "bc1q9h6tgmqr9p8az8pf4qv9m2zyq7kl3h6y3z7jt",
    network: "BTC",
    confirmations: "0/6",
    timestamp: "2025-05-08T16:30:00Z"
  },
];

export default function UserCryptoDeposits({ user }: UserCryptoDepositsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // In a real app, these would come from the user's actual deposit data
  // For now, using mock data
  const deposits = mockDeposits;
  
  // Apply filters
  const filteredDeposits = deposits.filter(deposit => {
    const matchesStatus = statusFilter === "all" || deposit.status === statusFilter;
    const matchesSearch = 
      deposit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.txnHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Apply pagination
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
  const paginatedDeposits = filteredDeposits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, we would show a toast notification
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crypto Deposits</CardTitle>
        <CardDescription>
          Manage and track cryptocurrency deposits for this user
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
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
                  <TableHead>TXN Hash</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Confirmations</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDeposits.map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{deposit.id}</span>
                        <button
                          onClick={() => handleCopy(deposit.id)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy ID</span>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs truncate max-w-[80px]">
                          {deposit.txnHash.substring(0, 8)}...{deposit.txnHash.slice(-4)}
                        </span>
                        <button
                          onClick={() => handleCopy(deposit.txnHash)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy hash</span>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {deposit.amount} {deposit.currency}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs truncate max-w-[80px]">
                          {deposit.address.substring(0, 8)}...{deposit.address.slice(-4)}
                        </span>
                        <button
                          onClick={() => handleCopy(deposit.address)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy address</span>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>{deposit.network}</TableCell>
                    <TableCell>{deposit.confirmations}</TableCell>
                    <TableCell>
                      {new Date(deposit.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No deposits found matching your criteria.</p>
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
  );
}
