
import { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, User, Shield, Eye, ArrowRight } from "lucide-react";
import { UserDetails } from "@/components/users/user-details";
import { UserStatus } from "@/components/users/user-status";
import { useUserSearch } from "@/hooks/use-user-search";
import { mockUsers } from "@/data/mock-users";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  // In a real app, we would use the useQuery hook to fetch users from the API
  // const { data: users, isLoading } = useQuery({
  //   queryKey: ["users", searchQuery, statusFilter],
  //   queryFn: () => fetchUsers(searchQuery, statusFilter),
  // });
  
  const { filteredUsers, isLoading } = useUserSearch({
    users: mockUsers,
    searchQuery,
    statusFilter,
  });

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, name, or KOB Pay ID"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending KYC</SelectItem>
                  <SelectItem value="verified">KYC Verified</SelectItem>
                </SelectContent>
              </Select>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Users</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                  {filteredUsers.length} users
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>KOB Pay ID</TableHead>
                      <TableHead>KYC Status</TableHead>
                      <TableHead>Account Status</TableHead>
                      <TableHead>Daily Limit</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No users found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.kobPayId ? (
                              <div className="font-mono text-xs bg-primary/5 px-2 py-1 rounded-md">
                                {user.kobPayId}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Not assigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.kycStatus === "verified" ? "success" : 
                                     user.kycStatus === "pending" ? "warning" : "destructive"}
                              className="capitalize"
                            >
                              {user.kycStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <UserStatus status={user.accountStatus} />
                          </TableCell>
                          <TableCell>${user.dailyLimit.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <a href={`/admin/users/${user.id}`}>
                                <ArrowRight className="h-4 w-4" />
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Comprehensive view of user information and actions
            </DialogDescription>
          </DialogHeader>
          {selectedUser && <UserDetails user={selectedUser} />}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
