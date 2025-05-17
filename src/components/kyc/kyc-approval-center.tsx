
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import KycRequestsList from "@/components/kyc/kyc-requests-list";
import KycRequestDetails from "@/components/kyc/kyc-request-details";
import { KycRequest } from "@/types/kyc-types";

interface KycApprovalCenterProps {
  kycRequests: KycRequest[];
  isLoading: boolean;
}

export default function KycApprovalCenter({ kycRequests, isLoading }: KycApprovalCenterProps) {
  const [selectedRequest, setSelectedRequest] = useState<KycRequest | null>(null);
  const [activeTab, setActiveTab] = useState<string>("pending");

  // Filter requests based on active tab
  const filteredRequests = kycRequests.filter((request) => {
    if (activeTab === "pending") return request.status === "pending";
    if (activeTab === "approved") return request.status === "approved";
    if (activeTab === "rejected") return request.status === "rejected";
    return true;
  });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card className="overflow-hidden">
          <Tabs defaultValue="pending" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="m-0">
              <KycRequestsList 
                requests={filteredRequests} 
                isLoading={isLoading} 
                onSelectRequest={setSelectedRequest} 
                selectedRequestId={selectedRequest?.id} 
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      <div className="lg:col-span-2">
        {selectedRequest ? (
          <KycRequestDetails 
            request={selectedRequest} 
            onStatusChange={(updatedRequest) => {
              // In a real app, update the request in the database
              // For now, just update the selected request
              setSelectedRequest(updatedRequest);
            }} 
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div>
              <h3 className="text-lg font-medium">No KYC request selected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Select a request from the list to view details and take action.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
