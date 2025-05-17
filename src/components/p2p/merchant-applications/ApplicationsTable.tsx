
import React from "react";
import { MerchantApplication } from "./types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Check, X, User } from "lucide-react";

interface ApplicationsTableProps {
  applications: MerchantApplication[];
  onViewApplication: (application: MerchantApplication) => void;
  onApproveApplication: (id: string) => void;
}

export const ApplicationsTable = ({ 
  applications, 
  onViewApplication,
  onApproveApplication
}: ApplicationsTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Application Date</TableHead>
            <TableHead>Volume Traded</TableHead>
            <TableHead>Successful Trades</TableHead>
            <TableHead>Completion Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No applications found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            applications.map(app => (
              <TableRow key={app.id}>
                <TableCell className="font-mono">{app.userId}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                <TableCell>{app.volumeTraded}</TableCell>
                <TableCell>{app.successfulTrades}</TableCell>
                <TableCell>{app.completionRate}</TableCell>
                <TableCell>
                  <ApplicationStatusBadge status={app.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewApplication(app)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {app.status === "pending" && (
                        <>
                          <DropdownMenuItem 
                            onClick={() => onApproveApplication(app.id)}
                            className="text-green-600"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onViewApplication(app)}
                            className="text-red-600"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
