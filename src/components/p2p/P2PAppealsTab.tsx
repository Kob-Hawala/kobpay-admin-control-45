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
import { Textarea } from "@/components/ui/textarea";
import { Eye, Search, Send, FileText, PaperclipIcon } from "lucide-react";
import { CustomPagination } from "./pagination/CustomPagination";

// Mock data for appeals
const mockAppeals = [
  {
    id: "appeal_1",
    orderId: "order_4323",
    appealingParty: "buyer",
    reason: "Payment sent but funds not released",
    evidence: ["payment_receipt.jpg", "chat_screenshot.png"],
    status: "under_review",
    createdAt: "2025-05-15T16:40:33Z",
    thread: [
      {
        id: "msg_1",
        sender: "buyer",
        message: "I have sent the payment and provided proof but the seller is not releasing the funds.",
        timestamp: "2025-05-15T16:40:33Z",
        attachments: ["payment_receipt.jpg"]
      },
      {
        id: "msg_2",
        sender: "seller",
        message: "I haven't received any payment in my account yet. Please verify the payment details.",
        timestamp: "2025-05-15T17:15:22Z",
        attachments: []
      }
    ]
  },
  {
    id: "appeal_2",
    orderId: "order_3981",
    appealingParty: "seller",
    reason: "Buyer claims payment was sent but nothing received",
    evidence: ["bank_statement.pdf"],
    status: "resolved",
    resolution: "in_favor_of_seller",
    createdAt: "2025-05-12T11:22:45Z",
    thread: [
      {
        id: "msg_1",
        sender: "seller",
        message: "Buyer claims they sent the payment but I've not received anything in my account even after 48 hours.",
        timestamp: "2025-05-12T11:22:45Z",
        attachments: ["bank_statement.pdf"]
      },
      {
        id: "msg_2",
        sender: "buyer",
        message: "I made the transfer. Maybe it's still processing?",
        timestamp: "2025-05-12T13:10:15Z",
        attachments: ["transfer_confirmation.jpg"]
      },
      {
        id: "msg_3",
        sender: "admin",
        message: "After reviewing the evidence, we've confirmed the payment was not received. The order has been cancelled without penalty to the seller.",
        timestamp: "2025-05-14T09:30:05Z",
        attachments: []
      }
    ]
  },
  {
    id: "appeal_3",
    orderId: "order_5172",
    appealingParty: "buyer",
    reason: "Seller asking for payment outside the platform",
    evidence: ["chat_logs.txt"],
    status: "under_review",
    createdAt: "2025-05-16T08:50:19Z",
    thread: [
      {
        id: "msg_1",
        sender: "buyer",
        message: "The seller is asking me to send payment to a different account than the one shown in the platform.",
        timestamp: "2025-05-16T08:50:19Z",
        attachments: ["chat_logs.txt"]
      }
    ]
  },
  {
    id: "appeal_4",
    orderId: "order_4085",
    appealingParty: "seller",
    reason: "Buyer sent less than the agreed amount",
    evidence: ["transaction_receipt.png"],
    status: "resolved",
    resolution: "compromise",
    createdAt: "2025-05-10T14:25:11Z",
    thread: [
      {
        id: "msg_1",
        sender: "seller",
        message: "The buyer only sent $950 instead of the agreed $1000.",
        timestamp: "2025-05-10T14:25:11Z",
        attachments: ["transaction_receipt.png"]
      },
      {
        id: "msg_2",
        sender: "buyer",
        message: "The bank charged a transfer fee. I wasn't aware of this.",
        timestamp: "2025-05-10T15:12:40Z",
        attachments: []
      },
      {
        id: "msg_3",
        sender: "admin",
        message: "We've verified the transaction fee. Both parties have agreed the seller will release crypto worth $950.",
        timestamp: "2025-05-11T10:05:33Z",
        attachments: []
      }
    ]
  }
];

const P2PAppealsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppeal, setSelectedAppeal] = useState<any>(null);
  const [isAppealOpen, setIsAppealOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under_review":
        return <Badge variant="warning">Under Review</Badge>;
      case "resolved":
        return <Badge variant="success">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getResolutionBadge = (resolution: string) => {
    switch (resolution) {
      case "in_favor_of_buyer":
        return <Badge>In Favor of Buyer</Badge>;
      case "in_favor_of_seller":
        return <Badge>In Favor of Seller</Badge>;
      case "compromise":
        return <Badge variant="secondary">Compromise</Badge>;
      default:
        return null;
    }
  };

  const filteredAppeals = mockAppeals.filter(appeal => {
    const matchesSearch = searchQuery === "" || 
      appeal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appeal.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appeal.reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || appeal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewAppeal = (appeal: any) => {
    setSelectedAppeal(appeal);
    setIsAppealOpen(true);
  };

  const handleSendResponse = () => {
    if (!adminResponse.trim() || !selectedAppeal) return;
    
    // In a real app, we would send this to an API
    console.log("Sending admin response:", adminResponse);
    
    // For this demo, we'll just add it to the thread temporarily
    const newMessage = {
      id: `msg_${Date.now()}`,
      sender: "admin",
      message: adminResponse,
      timestamp: new Date().toISOString(),
      attachments: []
    };
    
    setSelectedAppeal({
      ...selectedAppeal,
      thread: [...selectedAppeal.thread, newMessage]
    });
    
    setAdminResponse("");
  };

  const handleResolveAppeal = (resolution: string) => {
    // In a real app, we would make an API call here
    console.log(`Resolving appeal ${selectedAppeal?.id} with resolution: ${resolution}`);
    
    setSelectedAppeal({
      ...selectedAppeal,
      status: "resolved",
      resolution: resolution
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Appeals Management</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search by appeal ID, order ID or reason..."
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
                <option value="under_review">Under Review</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Appeal ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Appealing Party</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppeals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No appeals found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppeals.map(appeal => (
                    <TableRow key={appeal.id}>
                      <TableCell className="font-mono">{appeal.id}</TableCell>
                      <TableCell>{appeal.orderId}</TableCell>
                      <TableCell className="capitalize">{appeal.appealingParty}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {appeal.reason}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {appeal.evidence.map((file, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              {file.length > 15 ? file.substring(0, 12) + '...' : file}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(appeal.status)}</TableCell>
                      <TableCell>{new Date(appeal.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewAppeal(appeal)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
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
            totalPages={1}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>

      {/* Appeal View Dialog */}
      <Dialog open={isAppealOpen} onOpenChange={setIsAppealOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Appeal Details</DialogTitle>
          </DialogHeader>

          {selectedAppeal && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                <div>
                  <div className="text-muted-foreground mb-1">Appeal ID</div>
                  <div className="font-medium font-mono">{selectedAppeal.id}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Order ID</div>
                  <div className="font-medium">{selectedAppeal.orderId}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Status</div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedAppeal.status)}
                    {selectedAppeal.resolution && getResolutionBadge(selectedAppeal.resolution)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Date Filed</div>
                  <div className="font-medium">
                    {new Date(selectedAppeal.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground mb-1">Reason</div>
                  <div>{selectedAppeal.reason}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Appeal Thread</h3>
                <div className="space-y-4">
                  {selectedAppeal.thread.map((message: any) => {
                    const isAdmin = message.sender === "admin";
                    
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium capitalize">
                              {message.sender}
                            </span>
                            <span className="text-xs opacity-70">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {message.attachments.map((file: string, index: number) => (
                                <div 
                                  key={index} 
                                  className={`text-xs py-1 px-2 rounded flex items-center gap-1 ${
                                    isAdmin ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background text-foreground'
                                  }`}
                                >
                                  <PaperclipIcon className="h-3 w-3" />
                                  {file}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedAppeal.status === "under_review" && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Admin Response</h3>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Type your response here..."
                      value={adminResponse}
                      onChange={e => setAdminResponse(e.target.value)}
                      rows={3}
                    />
                    <div className="flex items-center justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="gap-2"
                      >
                        <PaperclipIcon className="h-4 w-4" />
                        Attach Files
                      </Button>
                      <Button 
                        onClick={handleSendResponse}
                        className="gap-2"
                        disabled={!adminResponse.trim()}
                      >
                        <Send className="h-4 w-4" />
                        Send Response
                      </Button>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Resolve Appeal</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Issue a final decision for this appeal.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          onClick={() => handleResolveAppeal("in_favor_of_buyer")}
                          variant="secondary"
                        >
                          In Favor of Buyer
                        </Button>
                        <Button 
                          onClick={() => handleResolveAppeal("in_favor_of_seller")}
                          variant="secondary"
                        >
                          In Favor of Seller
                        </Button>
                        <Button 
                          onClick={() => handleResolveAppeal("compromise")}
                          variant="secondary"
                        >
                          Compromise
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default P2PAppealsTab;
