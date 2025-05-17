
import React, { useState } from "react";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogClose 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Check, Eye, MoreHorizontal, Search, X, User } from "lucide-react";

// Define the type for merchant applications
type MerchantApplication = {
  id: string;
  userId: string;
  email: string;
  applicationDate: string;
  volumeTraded: string;
  successfulTrades: number;
  completionRate: string;
  status: string;
  notes?: string;
  rejectionReason?: string;
};

// Mock data for merchant applications
const mockMerchantApplications: MerchantApplication[] = [
  {
    id: "app_1",
    userId: "usr_7842",
    email: "john.trader@example.com",
    applicationDate: "2025-05-10T14:22:10Z",
    volumeTraded: "$25,000",
    successfulTrades: 48,
    completionRate: "98%",
    status: "pending",
    notes: "Experienced trader with good feedback. Looking to expand business."
  },
  {
    id: "app_2",
    userId: "usr_5391",
    email: "bitcoin_pro@example.com",
    applicationDate: "2025-05-12T09:15:33Z",
    volumeTraded: "$102,000",
    successfulTrades: 156,
    completionRate: "99%",
    status: "approved",
    notes: "One of our best traders. Excellent customer service record."
  },
  {
    id: "app_3",
    userId: "usr_2845",
    email: "crypto_newbie@example.com",
    applicationDate: "2025-05-15T11:40:22Z",
    volumeTraded: "$5,600",
    successfulTrades: 12,
    completionRate: "85%",
    status: "pending",
    notes: "New trader, limited history but growing quickly."
  },
  {
    id: "app_4",
    userId: "usr_9367",
    email: "eth_master@example.com",
    applicationDate: "2025-05-08T16:33:45Z",
    volumeTraded: "$78,000",
    successfulTrades: 94,
    completionRate: "97%",
    status: "rejected",
    rejectionReason: "Failed verification checks. Suspicious trading pattern."
  },
  {
    id: "app_5",
    userId: "usr_6123",
    email: "trading_pro@example.com",
    applicationDate: "2025-05-16T10:12:05Z",
    volumeTraded: "$45,200",
    successfulTrades: 67,
    completionRate: "95%",
    status: "pending",
    notes: "Professional trader with consistent activity."
  }
];

const P2PMerchantApplicationsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [merchantApplications, setMerchantApplications] = useState<MerchantApplication[]>(mockMerchantApplications);
  const [selectedApplication, setSelectedApplication] = useState<MerchantApplication | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewApplication = (application: MerchantApplication) => {
    setSelectedApplication(application);
    setIsDetailsOpen(true);
    setRejectionReason(application.rejectionReason || "");
  };

  const handleApproveApplication = (id: string) => {
    setMerchantApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status: "approved" } 
          : app
      )
    );
    // In a real app, we would make an API call here
    console.log(`Approving application ${id}`);
    setIsDetailsOpen(false);
  };

  const handleRejectApplication = (id: string) => {
    if (!rejectionReason) return;
    
    setMerchantApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status: "rejected", rejectionReason, notes: app.notes } 
          : app
      )
    );
    // In a real app, we would make an API call here
    console.log(`Rejecting application ${id} with reason: ${rejectionReason}`);
    setIsDetailsOpen(false);
  };

  const filteredApplications = merchantApplications.filter(app => {
    const matchesSearch = searchQuery === "" || 
      app.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Merchant Applications</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search by user ID or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div>
              <select 
                className="px-3 py-2 rounded-md border border-input"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Volume Traded</TableHead>
                  <TableHead>Successful Trades</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No applications found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map(app => (
                    <TableRow key={app.id}>
                      <TableCell className="font-mono">{app.userId}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                      <TableCell>{app.volumeTraded}</TableCell>
                      <TableCell>{app.successfulTrades}</TableCell>
                      <TableCell>{app.completionRate}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewApplication(app)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {app.status === "pending" && (
                              <>
                                <DropdownMenuItem 
                                  onClick={() => handleApproveApplication(app.id)}
                                  className="text-green-600"
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleViewApplication(app)}
                                  className="text-red-600"
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
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
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>

      {/* Application Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Merchant Application Details</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Application ID:</div>
                <div className="font-mono">{selectedApplication.id}</div>
                
                <div className="font-medium">User ID:</div>
                <div className="font-mono">{selectedApplication.userId}</div>
                
                <div className="font-medium">Email:</div>
                <div>{selectedApplication.email}</div>
                
                <div className="font-medium">Application Date:</div>
                <div>{new Date(selectedApplication.applicationDate).toLocaleString()}</div>
                
                <div className="font-medium">Volume Traded:</div>
                <div>{selectedApplication.volumeTraded}</div>
                
                <div className="font-medium">Successful Trades:</div>
                <div>{selectedApplication.successfulTrades}</div>
                
                <div className="font-medium">Completion Rate:</div>
                <div>{selectedApplication.completionRate}</div>
                
                <div className="font-medium">Status:</div>
                <div>{getStatusBadge(selectedApplication.status)}</div>
                
                <div className="font-medium">Notes:</div>
                <div>{selectedApplication.notes || "—"}</div>
                
                {selectedApplication.rejectionReason && (
                  <>
                    <div className="font-medium">Rejection Reason:</div>
                    <div className="text-red-600">{selectedApplication.rejectionReason}</div>
                  </>
                )}
              </div>

              {selectedApplication.status === "pending" && (
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="default"
                      className="gap-2"
                      onClick={() => handleApproveApplication(selectedApplication.id)}
                    >
                      <Check className="h-4 w-4" />
                      Approve Application
                    </Button>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Rejection Reason (if rejecting):</div>
                    <Input
                      placeholder="Enter reason for rejection..."
                      value={rejectionReason}
                      onChange={e => setRejectionReason(e.target.value)}
                    />
                    <Button 
                      variant="destructive"
                      className="mt-2 gap-2"
                      onClick={() => handleRejectApplication(selectedApplication.id)}
                      disabled={!rejectionReason}
                    >
                      <X className="h-4 w-4" />
                      Reject Application
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default P2PMerchantApplicationsTab;
