
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import { mockLogsData } from "@/data/mock-logs-data";

export default function ActivityLogsViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter logs based on search term and type
  const filteredLogs = mockLogsData.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || log.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export logs to CSV
  const exportToCSV = () => {
    const headers = ["Date", "Time", "Admin", "Action", "Type", "Details", "IP Address"];
    const rows = filteredLogs.map(log => [
      format(new Date(log.timestamp), "yyyy-MM-dd"),
      format(new Date(log.timestamp), "HH:mm:ss"),
      log.adminUser,
      log.action,
      log.type,
      log.details,
      log.ipAddress
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `admin_logs_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
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
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="user">User Management</SelectItem>
              <SelectItem value="transaction">Transaction</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            Activity logs for administrative actions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date & Time</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead className="hidden md:table-cell">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {format(new Date(log.timestamp), "MMM d, yyyy HH:mm:ss")}
                </TableCell>
                <TableCell>{log.adminUser}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      log.action.toLowerCase().includes("login") ? "outline" :
                      log.action.toLowerCase().includes("update") ? "secondary" :
                      log.action.toLowerCase().includes("delete") ? "destructive" : "default"
                    }>
                      {log.action}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{log.type}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                  {log.details}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {log.ipAddress}
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
              disabled={currentPage === totalPages || totalPages === 0}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
