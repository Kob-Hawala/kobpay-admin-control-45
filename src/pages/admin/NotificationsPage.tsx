
import { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Check, Search } from "lucide-react";
import NotificationTable from "@/components/notifications/notification-table";
import { mockNotifications } from "@/components/notifications/mock-notifications";

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  
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
        
        <NotificationTable
          notifications={notifications}
          filterType={filterType}
          filterStatus={filterStatus}
          searchTerm={searchTerm}
          onMarkAsRead={markAsRead}
        />
      </div>
    </AdminLayout>
  );
}
