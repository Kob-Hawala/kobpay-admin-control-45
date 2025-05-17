
import React, { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  Check, 
  ShieldAlert, 
  CircleDollarSign, 
  Calendar,
  Lock,
  Filter,
  Info
} from "lucide-react";
import { format } from "date-fns";

// Mock notifications data
const mockNotifications = [
  {
    id: "not-001",
    type: "security",
    title: "Login Alert",
    message: "Unusual login detected from new IP address 192.168.1.105",
    timestamp: new Date('2025-04-15T09:23:45'),
    read: false,
    priority: "high"
  },
  {
    id: "not-002",
    type: "escrow",
    title: "Escrow Created",
    message: "New escrow contract #EC-28456 created for transaction ID #TX-985642",
    timestamp: new Date('2025-04-15T08:17:22'),
    read: false,
    priority: "medium"
  },
  {
    id: "not-003",
    type: "deposit",
    title: "Large Deposit",
    message: "Large deposit of 25,000 USDT detected for user ID #U-54872",
    timestamp: new Date('2025-04-14T23:45:11'),
    read: true,
    priority: "medium"
  },
  {
    id: "not-004",
    type: "system",
    title: "System Update",
    message: "System maintenance scheduled for April 18th at 02:00 UTC",
    timestamp: new Date('2025-04-14T19:30:00'),
    read: true,
    priority: "low"
  },
  {
    id: "not-005",
    type: "kyc",
    title: "KYC Verification",
    message: "10 new KYC verifications awaiting review",
    timestamp: new Date('2025-04-14T16:22:37'),
    read: false,
    priority: "high"
  },
  {
    id: "not-006",
    type: "security",
    title: "Failed Login Attempts",
    message: "Multiple failed login attempts for admin account admin@kobhawala.com",
    timestamp: new Date('2025-04-14T14:05:19'),
    read: true,
    priority: "high"
  },
  {
    id: "not-007",
    type: "escrow",
    title: "Escrow Dispute",
    message: "New dispute opened for escrow #EC-27844. User claims funds not received.",
    timestamp: new Date('2025-04-14T11:36:54'),
    read: false,
    priority: "high"
  },
  {
    id: "not-008",
    type: "system",
    title: "API Status",
    message: "Exchange API connection restored after 2-minute outage",
    timestamp: new Date('2025-04-13T22:14:02'),
    read: true,
    priority: "medium"
  },
  {
    id: "not-009",
    type: "deposit",
    title: "Deposit Confirmation",
    message: "Bank wire deposit of $15,000 confirmed for user #U-77891",
    timestamp: new Date('2025-04-13T17:28:45'),
    read: true,
    priority: "low"
  },
  {
    id: "not-010",
    type: "security",
    title: "Permission Change",
    message: "Admin permissions updated for user admin2@kobhawala.com",
    timestamp: new Date('2025-04-13T09:51:33'),
    read: false,
    priority: "medium"
  }
];

type NotificationType = "security" | "escrow" | "deposit" | "system" | "kyc";

interface NotificationsPageProps {}

export default function NotificationsPage({}: NotificationsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  
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
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            View and manage system notifications and alerts
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search notifications..." 
              className="pl-8 w-full md:w-[300px]" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
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
            
            <Button 
              variant="outline" 
              onClick={markAllAsRead} 
              className="whitespace-nowrap"
            >
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              {filteredNotifications.length === 0 
                ? "No notifications found" 
                : `Showing ${filteredNotifications.length} of ${notifications.length} notifications`}
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
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id} className={!notification.read ? "bg-muted/30" : ""}>
                  <TableCell>
                    <Badge variant={notification.read ? "outline" : "default"}>
                      {notification.read ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type as NotificationType)}
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
                        onClick={() => markAsRead(notification.id)}
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
      </div>
    </AdminLayout>
  );
}
