
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Eye,
  Clock,
  Search,
  Check,
  Trash2,
  Image
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { escrowData } from "@/data/mock-escrow-data";

// Types for Escrow data
interface Escrow {
  id: string;
  buyer: string;
  seller: string;
  amount: string;
  crypto: string;
  fiatAmount: string;
  fiatCurrency: string;
  status: "pending" | "completed" | "cancelled";
  created: string;
  expires: string;
  timeRemaining: string;
  hasFiatProof: boolean;
}

const EscrowControl = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEscrow, setSelectedEscrow] = useState<Escrow | null>(null);
  const { toast } = useToast();
  
  // Filter escrows based on search query
  const filteredEscrows = escrowData.filter(
    (escrow) =>
      escrow.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      escrow.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      escrow.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReleaseFunds = (id: string) => {
    // In a real implementation, this would make an API call
    toast({
      title: "Funds Released",
      description: `Escrow ${id} funds have been released to the buyer.`,
    });
    logAdminAction(id, "Released funds");
  };

  const handleCancelEscrow = (id: string) => {
    // In a real implementation, this would make an API call
    toast({
      title: "Escrow Cancelled",
      description: `Escrow ${id} has been cancelled and funds returned to seller.`,
    });
    logAdminAction(id, "Cancelled escrow");
  };

  const logAdminAction = (escrowId: string, action: string) => {
    // In a real implementation, this would log to a database
    console.log(`Admin action: ${action} for escrow ${escrowId} at ${new Date().toISOString()}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">P2P Escrow Control</h2>
          <p className="text-muted-foreground">
            Manage and monitor P2P escrow transactions.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Active Escrows</CardTitle>
          <CardDescription>
            Monitor and manage ongoing escrow transactions.
          </CardDescription>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by buyer, seller or ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Crypto</TableHead>
                <TableHead>Fiat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time Remaining</TableHead>
                <TableHead>Fiat Proof</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEscrows.map((escrow) => (
                <TableRow key={escrow.id}>
                  <TableCell className="font-mono">{escrow.id.substring(0, 8)}...</TableCell>
                  <TableCell>{escrow.buyer}</TableCell>
                  <TableCell>{escrow.seller}</TableCell>
                  <TableCell>{escrow.amount} {escrow.crypto}</TableCell>
                  <TableCell>{escrow.fiatAmount} {escrow.fiatCurrency}</TableCell>
                  <TableCell>{getStatusBadge(escrow.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {escrow.timeRemaining}
                    </div>
                  </TableCell>
                  <TableCell>
                    {escrow.hasFiatProof ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Proof
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Payment Proof</DialogTitle>
                            <DialogDescription>
                              Payment proof uploaded by {escrow.buyer}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-center py-4">
                            <div className="border rounded-md p-1">
                              <Image className="h-64 w-64 text-muted-foreground" />
                              <p className="text-center text-muted-foreground mt-2">Payment proof image would appear here</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Badge variant="outline">Not Uploaded</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {escrow.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReleaseFunds(escrow.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Release
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelEscrow(escrow.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Audit Log</CardTitle>
          <CardDescription>Record of all admin actions on escrow transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Escrow ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2025-05-17 14:32:10</TableCell>
                <TableCell>admin@kobpay.com</TableCell>
                <TableCell className="font-mono">esc_8f7d1a...</TableCell>
                <TableCell>Released funds</TableCell>
                <TableCell>Manual release after verification</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2025-05-16 09:45:22</TableCell>
                <TableCell>manager@kobpay.com</TableCell>
                <TableCell className="font-mono">esc_3e9b4c...</TableCell>
                <TableCell>Cancelled escrow</TableCell>
                <TableCell>Buyer did not complete payment</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2025-05-15 16:12:05</TableCell>
                <TableCell>admin@kobpay.com</TableCell>
                <TableCell className="font-mono">esc_6a2f9d...</TableCell>
                <TableCell>Viewed payment proof</TableCell>
                <TableCell>Verified payment receipt</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EscrowControl;
