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
  DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Search, Check, X, Clock } from "lucide-react";
import { CustomPagination } from "./pagination/CustomPagination";

// Mock data for P2P orders
const mockP2POrders = [
  {
    id: "order_1",
    buyer: "john_doe",
    seller: "crypto_master",
    status: "paid",
    timeRemaining: "25:13",
    asset: "0.02 BTC",
    paymentMethod: "Bank Transfer",
    createdAt: "2025-05-17 12:30:45"
  },
  {
    id: "order_2",
    buyer: "alice_trader",
    seller: "bob_crypto",
    status: "released",
    timeRemaining: "00:00",
    asset: "1.5 ETH",
    paymentMethod: "Mobile Money",
    createdAt: "2025-05-16 14:22:10"
  },
  {
    id: "order_3",
    buyer: "new_trader",
    seller: "stable_investor",
    status: "pending",
    timeRemaining: "45:00",
    asset: "500 USDT",
    paymentMethod: "Cash Deposit",
    createdAt: "2025-05-17 09:15:22" 
  },
  {
    id: "order_4",
    buyer: "eth_lover",
    seller: "pro_trader",
    status: "disputed",
    timeRemaining: "00:00",
    asset: "0.8 ETH",
    paymentMethod: "Bank Transfer",
    createdAt: "2025-05-15 16:40:33"
  },
  {
    id: "order_5",
    buyer: "crypto_newbie",
    seller: "bitcoin_whale",
    status: "cancelled",
    timeRemaining: "00:00",
    asset: "0.01 BTC",
    paymentMethod: "PayPal",
    createdAt: "2025-05-14 11:05:17"
  }
];

const P2POrdersTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="warning" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Paid (Waiting)</Badge>;
      case "released":
        return <Badge variant="success" className="flex items-center gap-1"><Check className="h-3 w-3" /> Released</Badge>;
      case "disputed":
        return <Badge variant="destructive" className="flex items-center gap-1"><X className="h-3 w-3" /> Disputed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="flex items-center gap-1"><X className="h-3 w-3" /> Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = mockP2POrders.filter(order => {
    const matchesSearch = searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.asset.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleReleaseOrder = (id: string) => {
    console.log(`Releasing order ${id}`);
    // In a real app, we would make an API call here
  };

  const handleCancelOrder = (id: string) => {
    console.log(`Cancelling order ${id}`);
    // In a real app, we would show a confirmation dialog and then cancel
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">P2P Orders</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search by ID, buyer, seller or asset..."
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
                <option value="paid">Paid</option>
                <option value="released">Released</option>
                <option value="disputed">Disputed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time Remaining</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No orders found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono">{order.id}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{order.seller}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        {order.timeRemaining === "00:00" ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          <span className="font-mono">{order.timeRemaining}</span>
                        )}
                      </TableCell>
                      <TableCell>{order.asset}</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {order.status === "paid" && (
                              <DropdownMenuItem onClick={() => handleReleaseOrder(order.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Release Funds
                              </DropdownMenuItem>
                            )}
                            {(order.status === "pending" || order.status === "paid") && (
                              <DropdownMenuItem 
                                onClick={() => handleCancelOrder(order.id)}
                                className="text-red-600"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Cancel Order
                              </DropdownMenuItem>
                            )}
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
          <CustomPagination 
            currentPage={currentPage} 
            totalPages={2}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Status:</div>
                <div>{getStatusBadge(selectedOrder.status)}</div>
                
                <div className="font-medium">Created:</div>
                <div>{selectedOrder.createdAt}</div>
                
                <div className="font-medium">Buyer:</div>
                <div>{selectedOrder.buyer}</div>
                
                <div className="font-medium">Seller:</div>
                <div>{selectedOrder.seller}</div>
                
                <div className="font-medium">Asset:</div>
                <div>{selectedOrder.asset}</div>
                
                <div className="font-medium">Payment Method:</div>
                <div>{selectedOrder.paymentMethod}</div>
                
                <div className="font-medium">Time Remaining:</div>
                <div>{selectedOrder.timeRemaining !== "00:00" ? selectedOrder.timeRemaining : "—"}</div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                {selectedOrder.status === "paid" && (
                  <Button 
                    onClick={() => {
                      handleReleaseOrder(selectedOrder.id);
                      setIsDetailsOpen(false);
                    }}
                    variant="default"
                  >
                    Release Funds
                  </Button>
                )}
                {(selectedOrder.status === "pending" || selectedOrder.status === "paid") && (
                  <Button 
                    onClick={() => {
                      handleCancelOrder(selectedOrder.id);
                      setIsDetailsOpen(false);
                    }}
                    variant="outline"
                  >
                    Cancel Order
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default P2POrdersTab;
