
import React, { useState } from "react";
import { format } from "date-fns";
import { Bell, Check, Filter, MailOpen, Search } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockNotifications } from "@/components/notifications/mock-notifications";

// Define the types
export type NotificationType = "security" | "escrow" | "deposit" | "system" | "kyc";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: "high" | "medium" | "low";
}

export default function NotificationTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter notifications
  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "read" ? notification.read : !notification.read);
      
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Mark all as read
  const markAllAsRead = () => {
    // In a real app this would update the database
    console.log("Marking all filtered notifications as read");
    // Toast notification would go here
  };
  
  // Mark single notification as read
  const markAsRead = (id: string) => {
    // In a real app this would update the database
    console.log("Marking notification as read:", id);
    // Toast notification would go here
  };

  // Get badge variant based on priority
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Get icon for notification type
  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case "security":
        return <Bell className="h-4 w-4" />;
      case "escrow":
        return <Check className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="escrow">Escrow</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="kyc">KYC</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={markAllAsRead}>
            <MailOpen className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>System notifications and alerts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Message</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedNotifications.map((notification) => (
              <TableRow key={notification.id} className={notification.read ? "" : "bg-muted/30"}>
                <TableCell>
                  {format(notification.timestamp, "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(notification.type)}
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{notification.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                  {notification.message}
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(notification.priority)}>
                    {notification.priority.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={notification.read ? "outline" : "secondary"}>
                    {notification.read ? "Read" : "Unread"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <PaginationItem>
                    <div className="flex h-9 w-9 items-center justify-center">...</div>
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
            ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
