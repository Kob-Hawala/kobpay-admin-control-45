
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ApplicationFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const ApplicationFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter 
}: ApplicationFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2 flex-1 min-w-[240px]">
        <Search className="h-4 w-4" />
        <Input
          placeholder="Search by user ID or email..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>
      
      <div>
        <select 
          className="px-3 py-2 rounded-md border border-input"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};
