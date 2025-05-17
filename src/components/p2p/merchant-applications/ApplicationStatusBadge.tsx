
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ApplicationStatusBadgeProps {
  status: string;
}

export const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
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
