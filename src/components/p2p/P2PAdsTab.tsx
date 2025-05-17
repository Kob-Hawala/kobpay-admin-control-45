
import React, { useState } from "react";
import { 
  Table, TableHeader, TableBody, TableFooter, 
  TableHead, TableRow, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Edit, Pause, Play, Trash2, MoreHorizontal, Search } from "lucide-react";

// Mock data for P2P advertisements
const mockP2PAds = [
  {
    id: "ad_1",
    status: "active",
    type: "buy",
    baseCurrency: "USDT",
    price: "$1.02",
    amount: "1,000",
    remaining: "500",
    user: "john_doe",
    date: "2025-05-16"
  },
  {
    id: "ad_2",
    status: "paused",
    type: "sell",
    baseCurrency: "BTC",
    price: "$65,000",
    amount: "0.5",
    remaining: "0.25",
    user: "crypto_master",
    date: "2025-05-15"
  },
  {
    id: "ad_3",
    status: "completed",
    type: "sell",
    baseCurrency: "ETH",
    price: "$3,400",
    amount: "2.0",
    remaining: "0",
    user: "eth_trader",
    date: "2025-05-14"
  },
  {
    id: "ad_4",
    status: "active",
    type: "buy",
    baseCurrency: "BTC",
    price: "$64,800",
    amount: "0.8",
    remaining: "0.8",
    user: "bitcoin_whale",
    date: "2025-05-17"
  },
  {
    id: "ad_5",
    status: "active",
    type: "sell",
    baseCurrency: "USDT",
    price: "$1.01",
    amount: "5,000",
    remaining: "3,200",
    user: "stable_trader",
    date: "2025-05-16"
  }
];

const P2PAdsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "paused":
        return <Badge variant="warning">Paused</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "buy":
        return <Badge className="bg-green-500">Buy</Badge>;
      case "sell":
        return <Badge className="bg-blue-500">Sell</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const filteredAds = mockP2PAds.filter(ad => {
    const matchesSearch = searchQuery === "" || 
      ad.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.baseCurrency.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    const matchesType = typeFilter === "all" || ad.type === typeFilter;
    const matchesCurrency = currencyFilter === "all" || ad.baseCurrency === currencyFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesCurrency;
  });

  const handlePauseAd = (id: string) => {
    console.log(`Pausing ad ${id}`);
    // In a real app, we would make an API call here
  };

  const handleEditAd = (id: string) => {
    console.log(`Editing ad ${id}`);
    // In a real app, we would navigate to an edit form
  };

  const handleDeleteAd = (id: string) => {
    console.log(`Deleting ad ${id}`);
    // In a real app, we would show a confirmation dialog and then delete
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">P2P Advertisements</h2>
            <Button>Create New Ad</Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search by ID, user or currency..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select 
                className="px-3 py-2 rounded-md border border-input"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>

              <select 
                className="px-3 py-2 rounded-md border border-input"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>

              <select 
                className="px-3 py-2 rounded-md border border-input"
                value={currencyFilter}
                onChange={e => setCurrencyFilter(e.target.value)}
              >
                <option value="all">All Currencies</option>
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Ad ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount / Remaining</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAds.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No advertisements found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAds.map(ad => (
                    <TableRow key={ad.id}>
                      <TableCell>{getStatusBadge(ad.status)}</TableCell>
                      <TableCell className="font-mono">{ad.id}</TableCell>
                      <TableCell>{getTypeBadge(ad.type)}</TableCell>
                      <TableCell>{ad.baseCurrency}</TableCell>
                      <TableCell>{ad.price}</TableCell>
                      <TableCell>
                        {ad.amount} / <span className="text-muted-foreground">{ad.remaining}</span>
                      </TableCell>
                      <TableCell>{ad.user}</TableCell>
                      <TableCell>{ad.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditAd(ad.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePauseAd(ad.id)}>
                              {ad.status === "paused" ? (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  Resume
                                </>
                              ) : (
                                <>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteAd(ad.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default P2PAdsTab;
