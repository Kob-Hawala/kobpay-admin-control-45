
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Check, Bell, ShieldAlert, CircleDollarSign, Lock, Filter, Info } from "lucide-react";
import { format } from "date-fns";

type NotificationType = "security" | "escrow" | "deposit" | "system" | "kyc";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: "high" | "medium" | "low";
}

interface NotificationTableProps {
  notifications: Notification[];
  filterType: string;
  filterStatus: string;
  searchTerm: string;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationTable({
  notifications, 
  filterType,
  filterStatus,
  searchTerm,
  onMarkAsRead
}: NotificationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Filter notifications based on search term, type, and status
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "read" && notification.read) || 
      (filterStatus === "unread" && !notification.read);
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "security": return <ShieldAlert className="h-5 w-5 text-destructive" />;
      case "escrow": return <Lock className="h-5 w-5 text-primary" />;
      case "deposit": return <CircleDollarSign className="h-5 w-5 text-green-600" />;
      case "system": return <Info className="h-5 w-5 text-blue-600" />;
      case "kyc": return <Filter className="h-5 w-5 text-amber-600" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            {filteredNotifications.length === 0 
              ? "No notifications found" 
              : `Showing ${paginatedNotifications.length} of ${filteredNotifications.length} notifications`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[150px]">Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-[200px]">Date/Time</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedNotifications.map((notification) => (
              <TableRow key={notification.id} className={!notification.read ? "bg-muted/30" : ""}>
                <TableCell>
                  <Badge variant={notification.read ? "outline" : "default"}>
                    {notification.read ? "Read" : "Unread"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    <span className="capitalize">{notification.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-muted-foreground text-sm">{notification.message}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {format(notification.timestamp, "PPp")}
                </TableCell>
                <TableCell>
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      <span>Mark read</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <PaginationItem>
                      <div className="flex h-9 w-9 items-center justify-center">
                        ...
                      </div>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                </React.Fragment>
              ))
            }
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
