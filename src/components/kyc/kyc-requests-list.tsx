
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { KycRequest } from "@/types/kyc-types";

interface KycRequestsListProps {
  requests: KycRequest[];
  isLoading: boolean;
  onSelectRequest: (request: KycRequest) => void;
  selectedRequestId?: string;
}

export default function KycRequestsList({ 
  requests, 
  isLoading, 
  onSelectRequest,
  selectedRequestId 
}: KycRequestsListProps) {
  
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No KYC requests found.</p>
      </div>
    );
  }

  return (
    <div className="divide-y max-h-[600px] overflow-y-auto">
      {requests.map((request) => (
        <div 
          key={request.id} 
          className={`flex items-center p-4 hover:bg-accent/50 cursor-pointer ${
            selectedRequestId === request.id ? 'bg-accent' : ''
          }`}
          onClick={() => onSelectRequest(request)}
        >
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={request.user.avatarUrl} alt={request.user.name} />
            <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-medium truncate">{request.user.name}</p>
              <Badge variant={
                request.status === "pending" ? "outline" : 
                request.status === "approved" ? "success" : 
                "destructive"
              }>
                {request.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="truncate">
                {formatDistanceToNow(new Date(request.submittedAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
