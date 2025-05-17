
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
import { Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserStakingProps {
  user: any;
}

// Mock staking data
const mockStakingData = [
  {
    id: "STK12345678",
    planName: "BTC HODLer",
    asset: "BTC",
    amount: 0.5,
    apr: 6.5,
    duration: 90,
    startDate: "2025-03-17T00:00:00Z",
    endDate: "2025-06-15T00:00:00Z",
    status: "active",
    rewards: 0.00804,
  },
  {
    id: "STK12345679",
    planName: "ETH Growth",
    asset: "ETH",
    amount: 10,
    apr: 5.8,
    duration: 180,
    startDate: "2025-01-10T00:00:00Z",
    endDate: "2025-07-09T00:00:00Z",
    status: "active",
    rewards: 0.285,
  },
  {
    id: "STK12345680",
    planName: "USDT Savings",
    asset: "USDT",
    amount: 5000,
    apr: 12,
    duration: 30,
    startDate: "2025-04-10T00:00:00Z",
    endDate: "2025-05-10T00:00:00Z",
    status: "completed",
    rewards: 49.32,
  },
  {
    id: "STK12345681",
    planName: "BTC Premium",
    asset: "BTC",
    amount: 0.75,
    apr: 7.2,
    duration: 365,
    startDate: "2024-06-20T00:00:00Z",
    endDate: "2025-06-20T00:00:00Z",
    status: "active",
    rewards: 0.0378,
  },
];

export default function UserStaking({ user }: UserStakingProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [assetFilter, setAssetFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState<any>(null);
  
  const itemsPerPage = 5;
  
  // In a real app, these would come from the user's actual staking data
  // For now, using mock data
  const stakingItems = mockStakingData;
  
  // Apply filters
  const filteredStakingItems = stakingItems.filter(item => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesAsset = assetFilter === "all" || item.asset === assetFilter;
    
    return matchesStatus && matchesAsset;
  });
  
  // Apply pagination
  const totalPages = Math.ceil(filteredStakingItems.length / itemsPerPage);
  const paginatedStakingItems = filteredStakingItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (stake: any) => {
    setSelectedStake(stake);
    setDetailsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Calculate progress percentage for active stakes
  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    
    if (now >= end) return 100;
    if (now <= start) return 0;
    
    const total = end - start;
    const elapsed = now - start;
    
    return Math.round((elapsed / total) * 100);
  };

  // Format date in a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Staking</CardTitle>
          <CardDescription>
            View user's staking positions and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Staking Table */}
            {paginatedStakingItems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Stake ID</TableHead>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>APR</TableHead>
                    <TableHead>Duration (Days)</TableHead>
                    <TableHead>Start / End</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStakingItems.map((stake) => {
                    const progressPercent = calculateProgress(stake.startDate, stake.endDate);
                    
                    return (
                      <TableRow key={stake.id}>
                        <TableCell>{getStatusBadge(stake.status)}</TableCell>
                        <TableCell className="font-mono text-xs">{stake.id}</TableCell>
                        <TableCell>{stake.planName}</TableCell>
                        <TableCell>{stake.asset}</TableCell>
                        <TableCell>{stake.amount.toLocaleString()}</TableCell>
                        <TableCell>{stake.apr}%</TableCell>
                        <TableCell>{stake.duration}</TableCell>
                        <TableCell className="text-xs">
                          <div>{formatDate(stake.startDate)}</div>
                          <div className="text-muted-foreground">to</div>
                          <div>{formatDate(stake.endDate)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Progress value={progressPercent} className="h-2" />
                            <div className="text-xs text-right text-muted-foreground">
                              {progressPercent}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetails(stake)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No staking positions found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredStakingItems.length > 0 && (
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

      {/* Stake Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Staking Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about this staking position
            </DialogDescription>
          </DialogHeader>
          
          {selectedStake && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Stake ID</p>
                  <p className="font-mono text-sm">{selectedStake.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div>{getStatusBadge(selectedStake.status)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Plan Name</p>
                  <p>{selectedStake.planName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Asset</p>
                  <p>{selectedStake.asset}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Staked Amount</p>
                  <p>{selectedStake.amount.toLocaleString()} {selectedStake.asset}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Annual Percentage Rate</p>
                  <p>{selectedStake.apr}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p>{selectedStake.duration} days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Current Rewards</p>
                  <p className="text-green-600 font-medium">+{selectedStake.rewards.toLocaleString()} {selectedStake.asset}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Start Date</span>
                    <span className="font-medium">{formatDate(selectedStake.startDate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>End Date</span>
                    <span className="font-medium">{formatDate(selectedStake.endDate)}</span>
                  </div>
                </div>
                
                <div className="mt-2 space-y-1">
                  <Progress 
                    value={calculateProgress(selectedStake.startDate, selectedStake.endDate)} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>{calculateProgress(selectedStake.startDate, selectedStake.endDate)}% Complete</span>
                    <span>100%</span>
                  </div>
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
