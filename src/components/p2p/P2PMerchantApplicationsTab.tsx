
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MerchantApplication } from "./merchant-applications/types";
import { mockMerchantApplications } from "./merchant-applications/mock-data";
import { ApplicationFilters } from "./merchant-applications/ApplicationFilters";
import { ApplicationsTable } from "./merchant-applications/ApplicationsTable";
import { ApplicationDetailsDialog } from "./merchant-applications/ApplicationDetailsDialog";
import { CustomPagination } from "./pagination/CustomPagination";

const P2PMerchantApplicationsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [merchantApplications, setMerchantApplications] = useState<MerchantApplication[]>(mockMerchantApplications);
  const [selectedApplication, setSelectedApplication] = useState<MerchantApplication | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

          <ApplicationFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <ApplicationsTable 
            applications={filteredApplications}
            onViewApplication={handleViewApplication}
            onApproveApplication={handleApproveApplication}
          />

          {/* Pagination */}
          <CustomPagination 
            currentPage={currentPage} 
            totalPages={1}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>

      <ApplicationDetailsDialog 
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        application={selectedApplication}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onApprove={handleApproveApplication}
        onReject={handleRejectApplication}
      />
    </Card>
  );
};

export default P2PMerchantApplicationsTab;
