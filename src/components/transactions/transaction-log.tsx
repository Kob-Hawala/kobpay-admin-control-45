
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { transactionData } from "@/data/mock-transaction-data";

// Types for Transaction data
interface Transaction {
  id: string;
  from: string;
  to: string;
  fiatAmount: string;
  fiatCurrency: string;
  cryptoAmount: string;
  cryptoAsset: string;
  fee: string;
  feeWaived: boolean;
  status: "completed" | "pending" | "failed";
  error: string | null;
  timestamp: string;
  type: string;
}

const TransactionLog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Apply all filters to transactions
  const filteredTransactions = transactionData.filter((transaction) => {
    // Search query filter
    if (searchQuery && 
        !transaction.from.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !transaction.to.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Asset filter
    if (assetFilter && transaction.cryptoAsset !== assetFilter) {
      return false;
    }
    
    // Type filter
    if (typeFilter && transaction.type !== typeFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter && transaction.status !== statusFilter) {
      return false;
    }
    
    // Date range filter
    if (startDate) {
      const txDate = new Date(transaction.timestamp);
      if (txDate < startDate) {
        return false;
      }
    }
    
    if (endDate) {
      const txDate = new Date(transaction.timestamp);
      if (txDate > endDate) {
        return false;
      }
    }
    
    return true;
  });

  // Get unique assets for filter
  const uniqueAssets = [...new Set(transactionData.map(tx => tx.cryptoAsset))];
  
  // Get unique transaction types for filter
  const uniqueTypes = [...new Set(transactionData.map(tx => tx.type))];
  
  const resetFilters = () => {
    setAssetFilter(null);
    setTypeFilter(null);
    setStatusFilter(null);
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchQuery("");
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaction Log</h2>
          <p className="text-muted-foreground">
            View and filter all transactions in the system.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Complete history of all transactions.
          </CardDescription>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user or transaction ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {(assetFilter || typeFilter || statusFilter || startDate || endDate) && (
                      <Badge className="ml-2" variant="secondary">
                        {[
                          assetFilter && "Asset",
                          typeFilter && "Type",
                          statusFilter && "Status",
                          (startDate || endDate) && "Date"
                        ].filter(Boolean).length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter Transactions</h4>
                      <p className="text-sm text-muted-foreground">
                        Narrow down transactions by specific criteria.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="asset">Asset</label>
                        <Select value={assetFilter || ""} onValueChange={setAssetFilter}>
                          <SelectTrigger id="asset" className="col-span-2">
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All assets</SelectItem>
                            {uniqueAssets.map(asset => (
                              <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="type">Type</label>
                        <Select value={typeFilter || ""} onValueChange={setTypeFilter}>
                          <SelectTrigger id="type" className="col-span-2">
                            <SelectValue placeholder="Transaction type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All types</SelectItem>
                            {uniqueTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="status">Status</label>
                        <Select value={statusFilter || ""} onValueChange={setStatusFilter}>
                          <SelectTrigger id="status" className="col-span-2">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label>Date range</label>
                        <div className="col-span-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <div className="flex">
                                  {startDate ? (
                                    format(startDate, "PP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  {endDate && (
                                    <>
                                      <span className="mx-2">-</span>
                                      {format(endDate, "PP")}
                                    </>
                                  )}
                                </div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="range"
                                selected={{
                                  from: startDate,
                                  to: endDate,
                                }}
                                onSelect={(range) => {
                                  setStartDate(range?.from);
                                  setEndDate(range?.to);
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <Button onClick={resetFilters} variant="outline">
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Fiat Amount</TableHead>
                <TableHead>Crypto Amount</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono">{transaction.id.substring(0, 8)}...</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.from}</TableCell>
                  <TableCell>{transaction.to}</TableCell>
                  <TableCell>{transaction.fiatAmount} {transaction.fiatCurrency}</TableCell>
                  <TableCell>{transaction.cryptoAmount} {transaction.cryptoAsset}</TableCell>
                  <TableCell>
                    {transaction.feeWaived ? (
                      <Badge variant="outline">Waived</Badge>
                    ) : (
                      transaction.fee
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(transaction.status)}
                    {transaction.error && (
                      <div className="text-xs text-destructive mt-1">{transaction.error}</div>
                    )}
                  </TableCell>
                  <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionLog;
