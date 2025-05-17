
import { useState, useEffect } from "react";

interface UseUserSearchProps {
  users: any[];
  searchQuery: string;
  statusFilter: string;
}

export function useUserSearch({ users, searchQuery, statusFilter }: UseUserSearchProps) {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      const filtered = users.filter((user) => {
        // Filter by search query
        const matchesQuery = searchQuery 
          ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.kobPayId && user.kobPayId.toLowerCase().includes(searchQuery.toLowerCase()))
          : true;
        
        // Filter by status
        let matchesStatus = true;
        if (statusFilter !== "all") {
          if (statusFilter === "verified" || statusFilter === "pending") {
            matchesStatus = user.kycStatus === statusFilter;
          } else {
            matchesStatus = user.accountStatus === statusFilter;
          }
        }
        
        return matchesQuery && matchesStatus;
      });
      
      setFilteredUsers(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [users, searchQuery, statusFilter]);
  
  return { filteredUsers, isLoading };
}
