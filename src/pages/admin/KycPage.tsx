
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import AdminLayout from "@/components/admin-layout";
import KycApprovalCenter from "@/components/kyc/kyc-approval-center";
import { getMockKycRequests } from "@/data/mock-kyc-data";

export default function KycPage() {
  // Fetch KYC requests data
  const { data: kycRequests, isLoading } = useQuery({
    queryKey: ["kycRequests"],
    queryFn: getMockKycRequests,
  });

  return (
    <>
      <Helmet>
        <title>KYC Approval Center | KOB Pay Admin</title>
      </Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">KYC Approval Center</h1>
            <p className="text-muted-foreground">
              Review, approve, or reject KYC verification requests.
            </p>
          </div>
          <KycApprovalCenter kycRequests={kycRequests || []} isLoading={isLoading} />
        </div>
      </AdminLayout>
    </>
  );
}
