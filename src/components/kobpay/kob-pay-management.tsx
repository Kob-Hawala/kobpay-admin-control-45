
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Eye, 
  Key, 
  Search, 
  X, 
  TrendingUp, 
  Plus 
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { kobPayData } from "@/data/mock-kobpay-data";

// Types for KOB Pay ID data
interface KobPayID {
  id: string;
  user: string;
  userId: string;
  email: string;
  status: "active" | "revoked";
  createdAt: string;
  expiresAt: string;
  usageCount: number;
  feeSavings: number;
}

const KobPayManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<KobPayID | null>(null);
  const { toast } = useToast();
  
  // Filter KOB Pay IDs based on search query
  const filteredKobPayIds = kobPayData.filter(
    (id) =>
      id.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      id.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      id.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRevoke = (id: string) => {
    // In a real implementation, this would make an API call
    toast({
      title: "KOB Pay ID Revoked",
      description: `ID ${id} has been revoked successfully.`,
    });
  };

  const handleAssign = (userId: string, email: string) => {
    // In a real implementation, this would make an API call
    toast({
      title: "KOB Pay ID Assigned",
      description: `A new KOB Pay ID has been assigned to ${email}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">KOB Pay ID Management</h2>
          <p className="text-muted-foreground">
            View, assign and manage KOB Pay IDs for users.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All IDs</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="revoked">Revoked</TabsTrigger>
          <TabsTrigger value="stats">Usage Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>KOB Pay IDs</CardTitle>
              <CardDescription>
                Manage all KOB Pay IDs in the system.
              </CardDescription>
              <div className="flex space-x-2 mt-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by user, email or ID..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Assign ID
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign New KOB Pay ID</DialogTitle>
                      <DialogDescription>
                        Manually assign a new KOB Pay ID to a user.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="userId" className="text-right">
                          User ID
                        </Label>
                        <Input id="userId" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleAssign("newUserId", "newemail@example.com")}>
                        Assign ID
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KOB Pay ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKobPayIds.map((id) => (
                    <TableRow key={id.id}>
                      <TableCell className="font-mono">{id.id}</TableCell>
                      <TableCell>{id.user}</TableCell>
                      <TableCell>{id.email}</TableCell>
                      <TableCell>
                        <Badge variant={id.status === "active" ? "success" : "destructive"}>
                          {id.status === "active" ? "Active" : "Revoked"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(id.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(id.expiresAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedId(id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedId(id)}
                          >
                            <TrendingUp className="h-4 w-4" />
                          </Button>
                          {id.status === "active" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRevoke(id.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active KOB Pay IDs</CardTitle>
              <CardDescription>All currently active KOB Pay IDs in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KOB Pay ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kobPayData.filter(id => id.status === "active").map((id) => (
                    <TableRow key={id.id}>
                      <TableCell className="font-mono">{id.id}</TableCell>
                      <TableCell>{id.user}</TableCell>
                      <TableCell>{id.email}</TableCell>
                      <TableCell>{new Date(id.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(id.expiresAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRevoke(id.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revoked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revoked KOB Pay IDs</CardTitle>
              <CardDescription>KOB Pay IDs that have been revoked.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KOB Pay ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Revoked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kobPayData.filter(id => id.status === "revoked").map((id) => (
                    <TableRow key={id.id}>
                      <TableCell className="font-mono">{id.id}</TableCell>
                      <TableCell>{id.user}</TableCell>
                      <TableCell>{id.email}</TableCell>
                      <TableCell>{new Date(id.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(id.expiresAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>View usage statistics and fee savings for KOB Pay IDs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Active IDs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {kobPayData.filter(id => id.status === "active").length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {kobPayData.reduce((acc, curr) => acc + curr.usageCount, 0)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Fee Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                      ${kobPayData.reduce((acc, curr) => acc + curr.feeSavings, 0).toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KOB Pay ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Fee Savings</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kobPayData.sort((a, b) => b.usageCount - a.usageCount).map((id) => (
                    <TableRow key={id.id}>
                      <TableCell className="font-mono">{id.id}</TableCell>
                      <TableCell>{id.user}</TableCell>
                      <TableCell>{id.usageCount}</TableCell>
                      <TableCell>${id.feeSavings.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={id.status === "active" ? "success" : "destructive"}>
                          {id.status === "active" ? "Active" : "Revoked"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KobPayManagement;
