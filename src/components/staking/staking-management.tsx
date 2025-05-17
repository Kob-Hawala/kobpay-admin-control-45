
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search, Plus, Check, X, Lock, Unlock, Calendar, Package } from "lucide-react";
import { mockStakingPlans, mockUserStakes, mockStakingMetrics, StakingPlan, UserStake } from "@/data/mock-staking-data";

export default function StakingManagement() {
  const [plans, setPlans] = useState<StakingPlan[]>(mockStakingPlans);
  const [stakes, setStakes] = useState<UserStake[]>(mockUserStakes);
  const [metrics] = useState(mockStakingMetrics);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  
  const [editingPlan, setEditingPlan] = useState<StakingPlan | null>(null);
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<StakingPlan>>({
    name: "",
    asset: "BTC",
    lockDuration: 30,
    yieldPercentage: 5,
    minAmount: 0.1,
    active: true,
  });
  
  const [cancelStake, setCancelStake] = useState<UserStake | null>(null);
  const [completeStake, setCompleteStake] = useState<UserStake | null>(null);
  
  // Filter stakes
  const filteredStakes = stakes.filter((stake) => {
    const matchesSearch = 
      stake.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stake.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stake.planName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? stake.status === statusFilter : true;
    const matchesAsset = assetFilter ? stake.asset === assetFilter : true;
    
    return matchesSearch && matchesStatus && matchesAsset;
  });

  // Unique lists for filters
  const uniqueAssets = [...new Set([...plans.map(p => p.asset), ...stakes.map(s => s.asset)])];

  // Handle save plan
  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      toast.success(`Staking plan "${editingPlan.name}" updated successfully`);
      setEditingPlan(null);
    }
  };
  
  // Handle add new plan
  const handleAddPlan = () => {
    const id = `plan-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
    
    const newPlanEntry: StakingPlan = {
      id,
      name: newPlan.name || "New Plan",
      asset: newPlan.asset || "BTC",
      lockDuration: Number(newPlan.lockDuration) || 30,
      yieldPercentage: Number(newPlan.yieldPercentage) || 5,
      minAmount: Number(newPlan.minAmount) || 0.1,
      active: newPlan.active !== undefined ? newPlan.active : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPlans([...plans, newPlanEntry]);
    setShowNewPlanDialog(false);
    setNewPlan({
      name: "",
      asset: "BTC",
      lockDuration: 30,
      yieldPercentage: 5,
      minAmount: 0.1,
      active: true,
    });
    
    toast.success("New staking plan created successfully");
  };
  
  // Handle toggle plan status
  const handleTogglePlanStatus = (plan: StakingPlan) => {
    const updatedPlan = { ...plan, active: !plan.active, updatedAt: new Date().toISOString() };
    setPlans(plans.map(p => p.id === plan.id ? updatedPlan : p));
    
    toast.success(`Plan "${plan.name}" ${updatedPlan.active ? 'activated' : 'deactivated'}`);
  };
  
  // Handle cancel stake
  const handleCancelStake = () => {
    if (cancelStake) {
      const updatedStake = {
        ...cancelStake,
        status: "cancelled" as const,
        remainingDays: 0
      };
      
      setStakes(stakes.map(s => s.id === updatedStake.id ? updatedStake : s));
      toast.success(`Stake for ${cancelStake.userName} has been cancelled`);
      setCancelStake(null);
    }
  };
  
  // Handle complete stake
  const handleCompleteStake = () => {
    if (completeStake) {
      const updatedStake = {
        ...completeStake,
        status: "completed" as const,
        remainingDays: 0
      };
      
      setStakes(stakes.map(s => s.id === updatedStake.id ? updatedStake : s));
      toast.success(`Stake for ${completeStake.userName} has been completed`);
      setCompleteStake(null);
    }
  };
  
  // Calculate total staked value across all assets
  const calculateTotalStakedValue = () => {
    let total = 0;
    Object.entries(metrics.totalStaked).forEach(([asset, amount]) => {
      // This is a simplified calculation. In a real app, you'd use current market prices
      switch (asset) {
        case 'BTC': total += amount * 70000; break; // Example BTC price
        case 'ETH': total += amount * 3500; break;  // Example ETH price
        case 'USDT': 
        case 'USDC': total += amount; break;        // Stablecoins
        case 'SOL': total += amount * 150; break;   // Example SOL price
        default: break;
      }
    });
    return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staked Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateTotalStakedValue()}</div>
            <p className="text-xs text-muted-foreground">
              Across all assets and users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeStakes} active stakes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yield Paid</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.entries(metrics.totalYieldPaid)
                .filter(([asset]) => asset === 'BTC')
                .map(([, amount]) => `${amount} BTC`)}
            </div>
            <p className="text-xs text-muted-foreground">
              + various other assets
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Stakes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completedStakes}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.cancelledStakes} cancelled stakes
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Staking Plans</TabsTrigger>
          <TabsTrigger value="stakes">User Stakes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-lg font-semibold">
              Manage Staking Plans
            </div>
            <Button onClick={() => setShowNewPlanDialog(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add New Plan
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Yield %</TableHead>
                    <TableHead>Min Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{plan.asset}</TableCell>
                      <TableCell>{plan.lockDuration} days</TableCell>
                      <TableCell>{plan.yieldPercentage}%</TableCell>
                      <TableCell>{plan.minAmount} {plan.asset}</TableCell>
                      <TableCell>
                        <Badge className={plan.active ? "bg-green-500" : "bg-gray-500"}>
                          {plan.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingPlan(plan)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant={plan.active ? "destructive" : "default"}
                            size="sm"
                            onClick={() => handleTogglePlanStatus(plan)}
                          >
                            {plan.active ? 'Deactivate' : 'Activate'}
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
        
        <TabsContent value="stakes" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stakes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Select 
                value={statusFilter || "none"} 
                onValueChange={(value) => setStatusFilter(value === "none" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={assetFilter || "none"} 
                onValueChange={(value) => setAssetFilter(value === "none" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All assets</SelectItem>
                  {uniqueAssets.map(asset => (
                    <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Yield Earned</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStakes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        No stakes found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStakes.map((stake) => (
                      <TableRow key={stake.id}>
                        <TableCell>
                          <div className="font-medium">{stake.userName}</div>
                          <div className="text-xs text-muted-foreground">{stake.userId}</div>
                        </TableCell>
                        <TableCell>{stake.planName}</TableCell>
                        <TableCell>{stake.amount} {stake.asset}</TableCell>
                        <TableCell>{new Date(stake.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(stake.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              stake.status === 'active' ? "bg-green-500" :
                              stake.status === 'completed' ? "bg-blue-500" :
                              "bg-red-500"
                            }
                          >
                            {stake.status.charAt(0).toUpperCase() + stake.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{stake.yieldEarned} {stake.asset}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {stake.status === 'active' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-orange-500"
                                  onClick={() => setCancelStake(stake)}
                                >
                                  <X className="h-4 w-4 mr-1" /> Cancel
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-500"
                                  onClick={() => setCompleteStake(stake)}
                                >
                                  <Check className="h-4 w-4 mr-1" /> Complete
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Plan Dialog */}
      <Dialog open={!!editingPlan} onOpenChange={(open) => !open && setEditingPlan(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staking Plan</DialogTitle>
            <DialogDescription>
              Make changes to the staking plan parameters.
            </DialogDescription>
          </DialogHeader>
          
          {editingPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="asset">Asset</Label>
                  <Select 
                    value={editingPlan.asset} 
                    onValueChange={(value) => setEditingPlan({...editingPlan, asset: value})}
                  >
                    <SelectTrigger id="asset">
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="SOL">SOL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lockDuration">Lock Duration (days)</Label>
                  <Input
                    id="lockDuration"
                    type="number"
                    value={editingPlan.lockDuration}
                    onChange={(e) => setEditingPlan({...editingPlan, lockDuration: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="yieldPercentage">Yield Percentage</Label>
                  <Input
                    id="yieldPercentage"
                    type="number"
                    value={editingPlan.yieldPercentage}
                    onChange={(e) => setEditingPlan({...editingPlan, yieldPercentage: Number(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minAmount">Minimum Amount</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    step="0.01"
                    value={editingPlan.minAmount}
                    onChange={(e) => setEditingPlan({...editingPlan, minAmount: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="active">Active</Label>
                <input
                  id="active"
                  type="checkbox"
                  checked={editingPlan.active}
                  onChange={(e) => setEditingPlan({...editingPlan, active: e.target.checked})}
                  className="ml-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
            <Button onClick={handleSavePlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Plan Dialog */}
      <Dialog open={showNewPlanDialog} onOpenChange={setShowNewPlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Staking Plan</DialogTitle>
            <DialogDescription>
              Define the parameters for a new staking plan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-name">Plan Name</Label>
              <Input
                id="new-name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-asset">Asset</Label>
                <Select 
                  value={newPlan.asset} 
                  onValueChange={(value) => setNewPlan({...newPlan, asset: value})}
                >
                  <SelectTrigger id="new-asset">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="SOL">SOL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-lockDuration">Lock Duration (days)</Label>
                <Input
                  id="new-lockDuration"
                  type="number"
                  value={newPlan.lockDuration}
                  onChange={(e) => setNewPlan({...newPlan, lockDuration: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-yieldPercentage">Yield Percentage</Label>
                <Input
                  id="new-yieldPercentage"
                  type="number"
                  value={newPlan.yieldPercentage}
                  onChange={(e) => setNewPlan({...newPlan, yieldPercentage: Number(e.target.value)})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-minAmount">Minimum Amount</Label>
                <Input
                  id="new-minAmount"
                  type="number"
                  step="0.01"
                  value={newPlan.minAmount}
                  onChange={(e) => setNewPlan({...newPlan, minAmount: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="new-active">Active</Label>
              <input
                id="new-active"
                type="checkbox"
                checked={newPlan.active}
                onChange={(e) => setNewPlan({...newPlan, active: e.target.checked})}
                className="ml-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPlanDialog(false)}>Cancel</Button>
            <Button onClick={handleAddPlan} disabled={!newPlan.name}>Create Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Stake Dialog */}
      <Dialog open={!!cancelStake} onOpenChange={() => setCancelStake(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Stake</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this stake? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {cancelStake && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User</Label>
                  <div className="font-medium">{cancelStake.userName}</div>
                </div>
                <div>
                  <Label>Plan</Label>
                  <div className="font-medium">{cancelStake.planName}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <div className="font-medium">{cancelStake.amount} {cancelStake.asset}</div>
                </div>
                <div>
                  <Label>Yield Earned</Label>
                  <div className="font-medium">{cancelStake.yieldEarned} {cancelStake.asset}</div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelStake(null)}>No, Keep Stake</Button>
            <Button variant="destructive" onClick={handleCancelStake}>
              Yes, Cancel Stake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Complete Stake Dialog */}
      <Dialog open={!!completeStake} onOpenChange={() => setCompleteStake(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Stake Early</DialogTitle>
            <DialogDescription>
              Are you sure you want to complete this stake before its end date? The user will receive their current yield.
            </DialogDescription>
          </DialogHeader>
          
          {completeStake && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User</Label>
                  <div className="font-medium">{completeStake.userName}</div>
                </div>
                <div>
                  <Label>Plan</Label>
                  <div className="font-medium">{completeStake.planName}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <div className="font-medium">{completeStake.amount} {completeStake.asset}</div>
                </div>
                <div>
                  <Label>Yield Earned</Label>
                  <div className="font-medium">{completeStake.yieldEarned} {completeStake.asset}</div>
                </div>
              </div>
              <div>
                <Label>Remaining Time</Label>
                <div className="font-medium">{completeStake.remainingDays} days</div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteStake(null)}>Cancel</Button>
            <Button onClick={handleCompleteStake}>
              Complete Stake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
