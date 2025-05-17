import React, { useState } from "react";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { 
  Form, FormField, FormItem, FormLabel, 
  FormControl, FormMessage, FormDescription 
} from "@/components/ui/form";
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { Edit, Trash2, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { CustomPagination } from "./pagination/CustomPagination";

// Mock data for payment methods
const mockPaymentMethods = [
  {
    id: "pm_1",
    name: "Bank Transfer",
    type: "Bank",
    enabled: true,
    supportedCurrencies: ["USD", "EUR", "GBP"],
    processingTime: "1-2 business days"
  },
  {
    id: "pm_2",
    name: "Mobile Money",
    type: "Mobile",
    enabled: true,
    supportedCurrencies: ["USD", "GHS", "KES"],
    processingTime: "Instant"
  },
  {
    id: "pm_3",
    name: "Cash Deposit",
    type: "Cash",
    enabled: false,
    supportedCurrencies: ["USD", "EUR"],
    processingTime: "Varies"
  },
  {
    id: "pm_4",
    name: "Wise",
    type: "Online Transfer",
    enabled: true,
    supportedCurrencies: ["USD", "EUR", "GBP", "AUD"],
    processingTime: "1-2 business days"
  },
  {
    id: "pm_5",
    name: "PayPal",
    type: "Digital Wallet",
    enabled: false,
    supportedCurrencies: ["USD", "EUR"],
    processingTime: "Instant"
  }
];

type FormValues = {
  id?: string;
  name: string;
  type: string;
  enabled: boolean;
  supportedCurrencies: string;
  processingTime: string;
};

const P2PPaymentMethodsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      type: "",
      enabled: true,
      supportedCurrencies: "",
      processingTime: ""
    }
  });

  const handleToggleStatus = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id 
          ? { ...method, enabled: !method.enabled } 
          : method
      )
    );
  };

  const handleAddMethod = () => {
    setCurrentMethod(null);
    form.reset({
      name: "",
      type: "",
      enabled: true,
      supportedCurrencies: "",
      processingTime: ""
    });
    setIsEditing(false);
    setIsAddDialogOpen(true);
  };

  const handleEditMethod = (method: any) => {
    setCurrentMethod(method);
    form.reset({
      id: method.id,
      name: method.name,
      type: method.type,
      enabled: method.enabled,
      supportedCurrencies: method.supportedCurrencies.join(", "),
      processingTime: method.processingTime
    });
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const onSubmit = (values: FormValues) => {
    const currencies = values.supportedCurrencies.split(",").map(c => c.trim());
    
    if (isEditing && currentMethod) {
      setPaymentMethods(prev => 
        prev.map(method => 
          method.id === currentMethod.id 
            ? { 
                ...method, 
                name: values.name,
                type: values.type,
                enabled: values.enabled,
                supportedCurrencies: currencies,
                processingTime: values.processingTime
              } 
            : method
        )
      );
    } else {
      const newMethod = {
        id: `pm_${Date.now()}`,
        name: values.name,
        type: values.type,
        enabled: values.enabled,
        supportedCurrencies: currencies,
        processingTime: values.processingTime
      };
      
      setPaymentMethods(prev => [...prev, newMethod]);
    }
    
    setIsAddDialogOpen(false);
  };

  const filteredMethods = paymentMethods.filter(method => {
    const matchesSearch = searchQuery === "" || 
      method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <Button onClick={handleAddMethod}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <Input
              placeholder="Search payment methods..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Supported Currencies</TableHead>
                  <TableHead>Processing Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMethods.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No payment methods found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMethods.map(method => (
                    <TableRow key={method.id}>
                      <TableCell className="font-medium">{method.name}</TableCell>
                      <TableCell>{method.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={method.enabled} 
                            onCheckedChange={() => handleToggleStatus(method.id)} 
                          />
                          <span>{method.enabled ? "Enabled" : "Disabled"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {method.supportedCurrencies.map(currency => (
                            <Badge key={currency} variant="outline">{currency}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{method.processingTime}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditMethod(method)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteMethod(method.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <CustomPagination 
            currentPage={currentPage}
            totalPages={1}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>

      {/* Add/Edit Payment Method Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bank Transfer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bank, Mobile, Cash" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supportedCurrencies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supported Currencies</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. USD, EUR, GBP" {...field} />
                    </FormControl>
                    <FormDescription>
                      Separate currencies with commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="processingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Processing Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Instant, 1-2 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enabled</FormLabel>
                      <FormDescription>
                        Payment method will be available for users
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="sm:justify-start">
                <Button type="submit">
                  {isEditing ? "Save Changes" : "Add Method"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default P2PPaymentMethodsTab;
