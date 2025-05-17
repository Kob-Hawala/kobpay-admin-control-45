
import React, { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, X, Camera, User, Clock } from "lucide-react";
import { KycRequest } from "@/types/kyc-types";
import KycDocumentViewer from "@/components/kyc/kyc-document-viewer";
import KycAuditLog from "@/components/kyc/kyc-audit-log";

interface KycRequestDetailsProps {
  request: KycRequest;
  onStatusChange: (updatedRequest: KycRequest) => void;
}

export default function KycRequestDetails({ request, onStatusChange }: KycRequestDetailsProps) {
  const { toast } = useToast();
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [activeTab, setActiveTab] = useState("documents");

  const handleApprove = () => {
    const updatedRequest = {
      ...request,
      status: "approved" as const,
      reviewedAt: new Date().toISOString(),
      reviewedBy: {
        id: "admin-1",
        name: "Admin User",
      },
      kobPayId: `KOB${Date.now().toString().slice(-8)}`,
      auditLog: [
        ...request.auditLog,
        {
          action: "approved",
          timestamp: new Date().toISOString(),
          adminId: "admin-1",
          adminName: "Admin User",
          details: "KYC approved and KOB Pay ID generated",
        },
      ],
    };
    
    onStatusChange(updatedRequest);
    setIsApproveDialogOpen(false);
    toast({
      title: "KYC Request Approved",
      description: `KOB Pay ID ${updatedRequest.kobPayId} has been generated for ${request.user.name}.`,
    });
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    const updatedRequest = {
      ...request,
      status: "rejected" as const,
      reviewedAt: new Date().toISOString(),
      reviewedBy: {
        id: "admin-1",
        name: "Admin User",
      },
      rejectionReason: rejectReason,
      auditLog: [
        ...request.auditLog,
        {
          action: "rejected",
          timestamp: new Date().toISOString(),
          adminId: "admin-1",
          adminName: "Admin User",
          details: `KYC rejected. Reason: ${rejectReason}`,
        },
      ],
    };
    
    onStatusChange(updatedRequest);
    setIsRejectDialogOpen(false);
    setRejectReason("");
    toast({
      title: "KYC Request Rejected",
      description: `The KYC request for ${request.user.name} has been rejected.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{request.user.name}</CardTitle>
              <CardDescription>{request.user.email}</CardDescription>
            </div>
            <Badge variant={
              request.status === "pending" ? "outline" : 
              request.status === "approved" ? "success" : 
              "destructive"
            }>
              {request.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Submitted</p>
              <p className="text-sm">{format(new Date(request.submittedAt), "PPP p")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">User ID</p>
              <p className="text-sm">{request.user.id}</p>
            </div>
            {request.status !== "pending" && (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reviewed</p>
                  <p className="text-sm">{format(new Date(request.reviewedAt || new Date()), "PPP p")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reviewed By</p>
                  <p className="text-sm">{request.reviewedBy?.name || "N/A"}</p>
                </div>
              </>
            )}
            {request.status === "approved" && request.kobPayId && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">KOB Pay ID</p>
                <p className="text-sm font-mono bg-accent p-1 rounded">{request.kobPayId}</p>
              </div>
            )}
            {request.status === "rejected" && request.rejectionReason && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Rejection Reason</p>
                <p className="text-sm p-2 bg-destructive/10 rounded">{request.rejectionReason}</p>
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">
                <Camera className="mr-2 h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="audit">
                <User className="mr-2 h-4 w-4" />
                Audit Log
              </TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="pt-4">
              <KycDocumentViewer documents={request.documents} />
            </TabsContent>
            <TabsContent value="audit" className="pt-4">
              <KycAuditLog auditLog={request.auditLog} />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        {request.status === "pending" && (
          <CardFooter className="flex justify-between gap-4">
            <Button variant="outline" className="w-full" onClick={() => setIsRejectDialogOpen(true)}>
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button className="w-full" onClick={() => setIsApproveDialogOpen(true)}>
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve KYC Request</DialogTitle>
            <DialogDescription>
              This will approve the KYC request and automatically generate a KOB Pay ID for the user.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to approve the KYC request for {request.user.name}?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleApprove}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject KYC Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this KYC request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject}>Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
