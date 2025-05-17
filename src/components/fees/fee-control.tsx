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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import { 
  Filter,
  Search,
  Plus,
  Edit,
  Check,
  X as XIcon
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { feeData, feeRevenueData, feeDistributionData } from "@/data/mock-fee-data";

// Types for Fee data
interface Fee {
  id: string;
  name: string;
  type: "flat" | "percentage";
  value: number;
  assetType: string;
  active: boolean;
  lastModified: string;
}

const FeeControl = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFee, setNewFee] = useState({
    name: "",
    type: "flat" as "flat" | "percentage",
    value: 0,
    assetType: "BTC",
    active: true
  });
  
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Filter fees based on search query and filters
  const filteredFees = feeData.filter(
    (fee) => {
      // Search query filter
      if (
        searchQuery && 
        !fee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !fee.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      
      // Asset type filter
      if (assetFilter && fee.assetType !== assetFilter) {
        return false;
      }
      
      // Fee type filter
      if (typeFilter && fee.type !== typeFilter) {
        return false;
      }
      
      // Status filter
      if (
        (statusFilter === "active" && !fee.active) || 
        (statusFilter === "inactive" && fee.active)
      ) {
        return false;
      }
      
      return true;
    }
  );

  const handleCreateFee = () => {
    // In a real implementation, this would make an API call
    toast({
      title: "Fee Created",
      description: `${newFee.name} fee has been created successfully.`,
    });
    setIsCreating(false);
    setNewFee({
      name: "",
      type: "flat",
      value: 0,
      assetType: "BTC",
      active: true
    });
  };

  const handleToggleFeeStatus = (id: string, currentStatus: boolean) => {
    // In a real implementation, this would make an API call
    toast({
      title: currentStatus ? "Fee Disabled" : "Fee Enabled",
      description: `Fee status has been updated successfully.`,
    });
  };

  const handleUpdateFee = (id: string) => {
    // In a real implementation, this would make an API call
    toast({
      title: "Fee Updated",
      description: `Fee has been updated successfully.`,
    });
    setSelectedFee(null);
  };

  // Get unique asset types for filter
  const uniqueAssets = [...new Set(feeData.map(fee => fee.assetType))];

  const resetFilters = () => {
    setAssetFilter(null);
    setTypeFilter(null);
    setStatusFilter(null);
    setSearchQuery("");
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fee Control</h2>
          <p className="text-muted-foreground">
            Create and manage fees across the platform.
          </p>
        </div>
      </div>

      <Tabs defaultValue="management" className="w-full">
        <TabsList>
          <TabsTrigger value="management">Fee Management</TabsTrigger>
          <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Fee Configuration</CardTitle>
              <CardDescription>
                Create, update, and manage all platform fees.
              </CardDescription>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search fees..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Select value={assetFilter || ""} onValueChange={setAssetFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All assets</SelectItem>
                      {uniqueAssets.map(asset => (
                        <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={typeFilter || ""} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Fee Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter || ""} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={resetFilters}>
                    <Filter className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  
                  <Dialog open={isCreating} onOpenChange={setIsCreating}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Fee
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Fee</DialogTitle>
                        <DialogDescription>
                          Define a new platform fee. This will be applied to transactions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="feeName" className="text-right">
                            Fee Name
                          </Label>
                          <Input 
                            id="feeName" 
                            className="col-span-3" 
                            value={newFee.name}
                            onChange={(e) => setNewFee({...newFee, name: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="feeType" className="text-right">
                            Fee Type
                          </Label>
                          <Select 
                            value={newFee.type} 
                            onValueChange={(value) => setNewFee({...newFee, type: value as "flat" | "percentage"})}
                          >
                            <SelectTrigger id="feeType" className="col-span-3">
                              <SelectValue placeholder="Select fee type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="flat">Flat Fee</SelectItem>
                              <SelectItem value="percentage">Percentage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="feeValue" className="text-right">
                            Value
                          </Label>
                          <div className="col-span-3 flex items-center">
                            <Input 
                              id="feeValue" 
                              type="number"
                              value={newFee.value}
                              onChange={(e) => setNewFee({...newFee, value: parseFloat(e.target.value)})}
                            />
                            <span className="ml-2">
                              {newFee.type === "percentage" ? "%" : "USD"}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="assetType" className="text-right">
                            Asset Type
                          </Label>
                          <Select 
                            value={newFee.assetType} 
                            onValueChange={(value) => setNewFee({...newFee, assetType: value})}
                          >
                            <SelectTrigger id="assetType" className="col-span-3">
                              <SelectValue placeholder="Select asset type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                              <SelectItem value="USDT">Tether (USDT)</SelectItem>
                              <SelectItem value="ALL">All Cryptocurrencies</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="feeStatus" className="text-right">
                            Status
                          </Label>
                          <div className="col-span-3 flex items-center space-x-2">
                            <Select 
                              value={newFee.active ? "active" : "inactive"} 
                              onValueChange={(value) => setNewFee({...newFee, active: value === "active"})}
                            >
                              <SelectTrigger id="feeStatus">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreating(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateFee}>Create Fee</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.name}</TableCell>
                      <TableCell className="capitalize">{fee.type}</TableCell>
                      <TableCell>
                        {fee.type === "percentage" ? `${fee.value}%` : `$${fee.value.toFixed(2)}`}
                      </TableCell>
                      <TableCell>{fee.assetType}</TableCell>
                      <TableCell>
                        <Badge variant={fee.active ? "success" : "destructive"}>
                          {fee.active ? "Active" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(fee.lastModified).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // Fix: Make sure we're setting the correct type here
                              const typedFee = fee as Fee;
                              setSelectedFee(typedFee);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleFeeStatus(fee.id, fee.active)}
                          >
                            {fee.active ? (
                              <XIcon className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Dialog open={!!selectedFee} onOpenChange={(open) => !open && setSelectedFee(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Fee</DialogTitle>
                    <DialogDescription>
                      Modify the fee details below.
                    </DialogDescription>
                  </DialogHeader>
                  {selectedFee && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="updateFeeName" className="text-right">
                          Fee Name
                        </Label>
                        <Input 
                          id="updateFeeName" 
                          className="col-span-3" 
                          defaultValue={selectedFee.name}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="updateFeeType" className="text-right">
                          Fee Type
                        </Label>
                        <Select defaultValue={selectedFee.type}>
                          <SelectTrigger id="updateFeeType" className="col-span-3">
                            <SelectValue placeholder="Select fee type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flat">Flat Fee</SelectItem>
                            <SelectItem value="percentage">Percentage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="updateFeeValue" className="text-right">
                          Value
                        </Label>
                        <div className="col-span-3 flex items-center">
                          <Input 
                            id="updateFeeValue" 
                            type="number"
                            defaultValue={selectedFee.value} 
                          />
                          <span className="ml-2">
                            {selectedFee.type === "percentage" ? "%" : "USD"}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="updateAssetType" className="text-right">
                          Asset Type
                        </Label>
                        <Select defaultValue={selectedFee.assetType}>
                          <SelectTrigger id="updateAssetType" className="col-span-3">
                            <SelectValue placeholder="Select asset type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                            <SelectItem value="USDT">Tether (USDT)</SelectItem>
                            <SelectItem value="ALL">All Cryptocurrencies</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="updateFeeStatus" className="text-right">
                          Status
                        </Label>
                        <Select defaultValue={selectedFee.active ? "active" : "inactive"}>
                          <SelectTrigger id="updateFeeStatus" className="col-span-3">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedFee(null)}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleUpdateFee(selectedFee!.id)}>
                      Update Fee
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Revenue Analytics</CardTitle>
              <CardDescription>
                Visualizations of fee revenue across different periods and assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue (30d)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,289.23</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">↑ 12.5%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Fee Per Transaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3.75</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-500">↓ 0.8%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Fee Waivers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,458.90</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">↑ 5.2%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly fee revenue chart */}
              <div>
                <h3 className="text-lg font-medium mb-2">Monthly Fee Revenue</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feeRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Fee distribution by asset */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Fee Distribution by Asset</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={feeDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {feeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value, name) => [`$${value}`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Fee Type Distribution</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fee Type</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Transaction Fee</TableCell>
                        <TableCell>$28,340.50</TableCell>
                        <TableCell>62.6%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Withdrawal Fee</TableCell>
                        <TableCell>$8,945.32</TableCell>
                        <TableCell>19.8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Exchange Fee</TableCell>
                        <TableCell>$5,672.90</TableCell>
                        <TableCell>12.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Other Fees</TableCell>
                        <TableCell>$2,330.51</TableCell>
                        <TableCell>5.1%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeeControl;
