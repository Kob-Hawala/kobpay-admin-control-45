
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { AdminNavigation } from "./navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export function Sidebar({ isSidebarOpen }: SidebarProps) {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isMobile) {
      // Prevent default prevents the immediate navigation to allow the sidebar to close first
      e.preventDefault();
      // Use setTimeout to delay navigation until after state updates
      setTimeout(() => navigate(path), 100);
    }
  };
  
  return (
    <div
      className={`fixed md:relative z-40 h-full transition-all duration-300 ease-in-out transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        ${isMobile ? "w-[80%] max-w-[280px]" : "w-64"} 
        md:translate-x-0 
        ${isSidebarOpen && !isMobile ? "md:w-64" : "md:w-16"} 
        bg-sidebar border-r border-border`}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className={`px-4 py-6 flex items-center ${!isSidebarOpen && !isMobile ? "justify-center" : ""}`}>
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              K
            </div>
            {(isSidebarOpen || isMobile) && (
              <span className="text-xl font-bold text-sidebar-foreground">
                KOB HAWALA
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide py-4">
          <AdminNavigation collapsed={!isSidebarOpen && !isMobile} />
        </div>

        {/* User section - show full on mobile regardless of state */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            {(isSidebarOpen || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-4 w-4 text-sidebar-foreground dark:text-gray-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Security</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
