
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Package, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Clock, 
  Unlock, 
  AlertTriangle,
  Edit
} from "lucide-react";
import { toast } from "sonner";
import { 
  mockStakingPlans, 
  mockUserStakes, 
  mockStakingMetrics,
  StakingPlan,
  UserStake
} from "@/data/mock-staking-data";

export default function StakingManagement() {
  const [plans, setPlans] = useState<StakingPlan[]>(mockStakingPlans);
  const [stakes, setStakes] = useState<UserStake[]>(mockUserStakes);
  const [metrics] = useState(mockStakingMetrics);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [showEndStakeDialog, setShowEndStakeDialog] = useState(false);
  const [showEndAllStakesDialog, setShowEndAllStakesDialog] = useState(false);
  const [editingPlan, setEditingPlan] = useState<StakingPlan | null>(null);
  const [selectedStake, setSelectedStake] = useState<UserStake | null>(null);
  
  const [newPlan, setNewPlan] = useState<Partial<StakingPlan>>({
    name: "",
    asset: "BTC",
    lockDuration: 30,
    yieldPercentage: 5,
    minAmount: 0.1,
    active: true
  });

  // Unique assets for filtering
  const uniqueAssets = [...new Set(plans.map(plan => plan.asset))];
  
  // Filter stakes
  const filteredStakes = stakes.filter(stake => {
    const matchesSearch = 
      stake.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stake.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAsset = assetFilter ? stake.asset === assetFilter : true;
    const matchesStatus = statusFilter ? stake.status === statusFilter : true;
    
    return matchesSearch && matchesAsset && matchesStatus;
  });

  // Create or update a staking plan
  const handleSavePlan = () => {
    if (editingPlan) {
      // Update existing plan
      const updatedPlans = plans.map(plan => 
        plan.id === editingPlan.id 
          ? { 
              ...editingPlan, 
              ...newPlan,
              updatedAt: new Date().toISOString() 
            } 
          : plan
      );
      
      setPlans(updatedPlans);
      toast.success(`Plan "${newPlan.name}" updated successfully`);
    } else {
      // Create new plan
      const newPlanEntry: StakingPlan = {
        id: `plan-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        name: newPlan.name || "",
        asset: newPlan.asset || "BTC",
        lockDuration: newPlan.lockDuration || 30,
        yieldPercentage: newPlan.yieldPercentage || 5,
        minAmount: newPlan.minAmount || 0.1,
        active: newPlan.active === undefined ? true : newPlan.active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setPlans([newPlanEntry, ...plans]);
      toast.success(`Plan "${newPlanEntry.name}" created successfully`);
    }
    
    setShowPlanDialog(false);
    setEditingPlan(null);
    setNewPlan({
      name: "",
      asset: "BTC",
      lockDuration: 30,
      yieldPercentage: 5,
      minAmount: 0.1,
      active: true
    });
  };

  // Toggle plan active status
  const togglePlanStatus = (planId: string) => {
    const updatedPlans = plans.map(plan => 
      plan.id === planId 
        ? { ...plan, active: !plan.active, updatedAt: new Date().toISOString() } 
        : plan
    );
    
    setPlans(updatedPlans);
    
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      toast.success(`Plan "${plan.name}" ${plan.active ? 'disabled' : 'activated'} successfully`);
    }
  };

  // Edit an existing plan
  const handleEditPlan = (plan: StakingPlan) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name,
      asset: plan.asset,
      lockDuration: plan.lockDuration,
      yieldPercentage: plan.yieldPercentage,
      minAmount: plan.minAmount,
      active: plan.active
    });
    setShowPlanDialog(true);
  };

  // Delete a plan
  const handleDeletePlan = (planId: string) => {
    const planToDelete = plans.find(p => p.id === planId);
    
    // Check if there are active stakes for this plan
    const hasActiveStakes = stakes.some(stake => stake.planId === planId && stake.status === "active");
    
    if (hasActiveStakes) {
      toast.error("Cannot delete plan with active stakes");
      return;
    }
    
    setPlans(plans.filter(plan => plan.id !== planId));
    
    if (planToDelete) {
      toast.success(`Plan "${planToDelete.name}" deleted successfully`);
    }
  };

  // End a single stake
  const handleEndStake = () => {
    if (selectedStake) {
      const updatedStakes = stakes.map(stake => 
        stake.id === selectedStake.id 
          ? { ...stake, status: "cancelled", remainingDays: 0 } 
          : stake
      );
      
      setStakes(updatedStakes);
      toast.success(`Stake ${selectedStake.id} for ${selectedStake.userName} has been cancelled`);
      setSelectedStake(null);
      setShowEndStakeDialog(false);
    }
  };

  // End all stakes (admin action)
  const handleEndAllStakes = () => {
    const updatedStakes = stakes.map(stake => 
      stake.status === "active" 
        ? { ...stake, status: "cancelled", remainingDays: 0 } 
        : stake
    );
    
    setStakes(updatedStakes);
    toast.success("All active stakes have been cancelled");
    setShowEndAllStakesDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="plans">
        <TabsList>
          <TabsTrigger value="plans">
            <Package className="h-4 w-4 mr-2" />
            Staking Plans
          </TabsTrigger>
          <TabsTrigger value="stakes">
            <Users className="h-4 w-4 mr-2" />
            User Stakes
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <Filter className="h-4 w-4 mr-2" />
            Staking Metrics
          </TabsTrigger>
        </TabsList>
        
        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Staking Plans</h3>
            <Button onClick={() => setShowPlanDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Plan
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Lock Period</TableHead>
                    <TableHead>APR</TableHead>
                    <TableHead>Min Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No staking plans available
                      </TableCell>
                    </TableRow>
                  ) : (
                    plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">
                          {plan.name}
                        </TableCell>
                        <TableCell>{plan.asset}</TableCell>
                        <TableCell>{plan.lockDuration} days</TableCell>
                        <TableCell>{plan.yieldPercentage}%</TableCell>
                        <TableCell>
                          {plan.minAmount} {plan.asset}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={plan.active}
                            onCheckedChange={() => togglePlanStatus(plan.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPlan(plan)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeletePlan(plan.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
        
        {/* Stakes Tab */}
        <TabsContent value="stakes" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
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
              
              <Button 
                variant="destructive"
                onClick={() => setShowEndAllStakesDialog(true)}
              >
                <Unlock className="h-4 w-4 mr-2" />
                End All Stakes
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Stakes</CardTitle>
              <CardDescription>
                View and manage individual staking positions by users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Yield Earned</TableHead>
                    <TableHead>Status</TableHead>
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
                        <TableCell>
                          {stake.amount} {stake.asset}
                        </TableCell>
                        <TableCell>
                          {new Date(stake.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {stake.status === "active" ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {stake.remainingDays} days
                            </div>
                          ) : (
                            "Ended"
                          )}
                        </TableCell>
                        <TableCell>
                          {stake.yieldEarned} {stake.asset}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(stake.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          {stake.status === "active" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-500 hover:text-amber-700"
                              onClick={() => {
                                setSelectedStake(stake);
                                setShowEndStakeDialog(true);
                              }}
                            >
                              <Unlock className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6 mt-6">
          <h3 className="text-lg font-medium">Staking Platform Metrics</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.totalUsers}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Stakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.activeStakes}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completed Stakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.completedStakes}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cancelled Stakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.cancelledStakes}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Staked by Asset</CardTitle>
                <CardDescription>
                  Current staking amounts across assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(metrics.totalStaked).map(([asset, amount]) => (
                      <TableRow key={asset}>
                        <TableCell className="font-medium">{asset}</TableCell>
                        <TableCell className="text-right">{amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Total Yield Paid</CardTitle>
                <CardDescription>
                  Total yield distributed to stakers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(metrics.totalYieldPaid).map(([asset, amount]) => (
                      <TableRow key={asset}>
                        <TableCell className="font-medium">{asset}</TableCell>
                        <TableCell className="text-right">{amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Staking Plans Distribution</CardTitle>
              <CardDescription>
                Active staking plans and participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Active Stakes</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => {
                    const planStakes = stakes.filter(s => s.planId === plan.id && s.status === "active");
                    const totalValue = planStakes.reduce((sum, stake) => sum + stake.amount, 0);
                    
                    return (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>{plan.asset}</TableCell>
                        <TableCell>{planStakes.length}</TableCell>
                        <TableCell>{totalValue.toLocaleString()} {plan.asset}</TableCell>
                        <TableCell>
                          {plan.active ? (
                            <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                          ) : (
                            <Badge variant="outline">Disabled</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Create/Edit Plan Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? "Edit Staking Plan" : "Create New Staking Plan"}
            </DialogTitle>
            <DialogDescription>
              {editingPlan 
                ? "Update the details of the staking plan." 
                : "Configure a new staking plan for users."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                placeholder="Enter plan name"
                value={newPlan.name || ""}
                onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="asset">Asset</Label>
                <Select 
                  value={newPlan.asset} 
                  onValueChange={(value) => setNewPlan({...newPlan, asset: value})}
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
                  min="1"
                  placeholder="Enter lock duration"
                  value={newPlan.lockDuration || ""}
                  onChange={(e) => setNewPlan({
                    ...newPlan, 
                    lockDuration: parseInt(e.target.value) || 0
                  })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="yieldPercentage">Yield Percentage (%)</Label>
                <Input
                  id="yieldPercentage"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter yield percentage"
                  value={newPlan.yieldPercentage || ""}
                  onChange={(e) => setNewPlan({
                    ...newPlan, 
                    yieldPercentage: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="minAmount">Minimum Amount</Label>
                <Input
                  id="minAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter minimum amount"
                  value={newPlan.minAmount || ""}
                  onChange={(e) => setNewPlan({
                    ...newPlan, 
                    minAmount: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newPlan.active}
                onCheckedChange={(checked) => setNewPlan({...newPlan, active: checked})}
              />
              <Label htmlFor="active">Plan Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowPlanDialog(false);
              setEditingPlan(null);
              setNewPlan({
                name: "",
                asset: "BTC",
                lockDuration: 30,
                yieldPercentage: 5,
                minAmount: 0.1,
                active: true
              });
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePlan}
              disabled={!newPlan.name || !newPlan.lockDuration || !newPlan.yieldPercentage}
            >
              {editingPlan ? "Update Plan" : "Create Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* End Stake Dialog */}
      <Dialog open={showEndStakeDialog} onOpenChange={setShowEndStakeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End User Stake</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this staking position? This will cancel the stake and release funds.
            </DialogDescription>
          </DialogHeader>
          
          {selectedStake && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">User:</div>
                  <div className="font-medium">{selectedStake.userName}</div>
                  
                  <div className="text-muted-foreground">Plan:</div>
                  <div className="font-medium">{selectedStake.planName}</div>
                  
                  <div className="text-muted-foreground">Amount:</div>
                  <div className="font-medium">
                    {selectedStake.amount} {selectedStake.asset}
                  </div>
                  
                  <div className="text-muted-foreground">Start Date:</div>
                  <div className="font-medium">
                    {new Date(selectedStake.startDate).toLocaleDateString()}
                  </div>
                  
                  <div className="text-muted-foreground">Yield Earned:</div>
                  <div className="font-medium">
                    {selectedStake.yieldEarned} {selectedStake.asset}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900 p-3 rounded-md">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm text-yellow-800 dark:text-yellow-300">
                  This action cannot be undone and may affect user experience.
                </span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEndStakeDialog(false);
              setSelectedStake(null);
            }}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleEndStake}
            >
              <Unlock className="h-4 w-4 mr-2" />
              End Stake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* End All Stakes Dialog */}
      <Dialog open={showEndAllStakesDialog} onOpenChange={setShowEndAllStakesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End All Active Stakes</DialogTitle>
            <DialogDescription>
              WARNING: This will cancel ALL active staking positions and release funds to users immediately.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-2 bg-red-100 dark:bg-red-900 p-3 rounded-md mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-800 dark:text-red-300">
                This is an emergency action that will affect all users. Please confirm carefully.
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-muted-foreground">Active stakes:</p>
              <p className="font-medium">{stakes.filter(s => s.status === "active").length}</p>
              
              <p className="text-muted-foreground">Total staked value affected:</p>
              <div className="space-y-1">
                {Object.entries(
                  stakes
                    .filter(s => s.status === "active")
                    .reduce((acc: Record<string, number>, stake) => {
                      acc[stake.asset] = (acc[stake.asset] || 0) + stake.amount;
                      return acc;
                    }, {})
                ).map(([asset, amount]) => (
                  <p key={asset} className="font-medium">
                    {amount.toLocaleString()} {asset}
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEndAllStakesDialog(false);
            }}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleEndAllStakes}
            >
              <Unlock className="h-4 w-4 mr-2" />
              End All Stakes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
