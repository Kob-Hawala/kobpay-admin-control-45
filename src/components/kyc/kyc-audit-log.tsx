
import React from "react";
import { formatDistanceToNow, format } from "date-fns";
import { User, Clock } from "lucide-react";
import { KycAuditEntry } from "@/types/kyc-types";

interface KycAuditLogProps {
  auditLog: KycAuditEntry[];
}

export default function KycAuditLog({ auditLog }: KycAuditLogProps) {
  if (auditLog.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-md">
        <p className="text-muted-foreground">No audit logs available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {auditLog.map((entry, index) => (
          <li key={index} className="border rounded-md p-4 bg-background">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">{entry.adminName}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span title={format(new Date(entry.timestamp), "PPpp")}>
                  {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                entry.action === "approved" ? "bg-green-500" : 
                entry.action === "rejected" ? "bg-red-500" : 
                "bg-blue-500"
              }`} />
              <span className="capitalize">{entry.action}</span>
            </div>
            {entry.details && (
              <p className="text-sm text-muted-foreground mt-1 pl-4">
                {entry.details}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
