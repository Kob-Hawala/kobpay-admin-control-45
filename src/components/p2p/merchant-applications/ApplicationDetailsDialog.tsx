
import React from "react";
import { MerchantApplication } from "./types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogClose 
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

interface ApplicationDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  application: MerchantApplication | null;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ApplicationDetailsDialog = ({
  isOpen,
  onOpenChange,
  application,
  rejectionReason,
  setRejectionReason,
  onApprove,
  onReject
}: ApplicationDetailsDialogProps) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Merchant Application Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-medium">Application ID:</div>
            <div className="font-mono">{application.id}</div>
            
            <div className="font-medium">User ID:</div>
            <div className="font-mono">{application.userId}</div>
            
            <div className="font-medium">Email:</div>
            <div>{application.email}</div>
            
            <div className="font-medium">Application Date:</div>
            <div>{new Date(application.applicationDate).toLocaleString()}</div>
            
            <div className="font-medium">Volume Traded:</div>
            <div>{application.volumeTraded}</div>
            
            <div className="font-medium">Successful Trades:</div>
            <div>{application.successfulTrades}</div>
            
            <div className="font-medium">Completion Rate:</div>
            <div>{application.completionRate}</div>
            
            <div className="font-medium">Status:</div>
            <div>
              <ApplicationStatusBadge status={application.status} />
            </div>
            
            <div className="font-medium">Notes:</div>
            <div>{application.notes || "—"}</div>
            
            {application.rejectionReason && (
              <>
                <div className="font-medium">Rejection Reason:</div>
                <div className="text-red-600">{application.rejectionReason}</div>
              </>
            )}
          </div>

          {application.status === "pending" && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <Button 
                  variant="default"
                  className="gap-2"
                  onClick={() => onApprove(application.id)}
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
                  onClick={() => onReject(application.id)}
                  disabled={!rejectionReason}
                >
                  <X className="h-4 w-4" />
                  Reject Application
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
