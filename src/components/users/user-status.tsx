
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Ban, Clock } from "lucide-react";

interface UserStatusProps {
  status: string;
}

export function UserStatus({ status }: UserStatusProps) {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>Active</span>
        </Badge>
      );
    case "suspended":
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1">
          <Ban className="h-3 w-3" />
          <span>Suspended</span>
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Pending</span>
        </Badge>
      );
    case "restricted":
      return (
        <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          <span>Restricted</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}
