import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Database,
  Settings,
  User,
  Shield,
  File,
  LogOut,
  Bell,
  Menu,
  X,
  Filter,
  Users,
  Search,
  Key,
  Lock,
  Clock,
  Trash2,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <Database className="h-5 w-5" />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "KYC Approval",
      path: "/admin/kyc",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      label: "KOB Pay ID",
      path: "/admin/kobpay",
      icon: <Key className="h-5 w-5" />,
    },
    {
      label: "Escrow Control",
      path: "/admin/escrow",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      label: "Transactions",
      path: "/admin/transactions",
      icon: <File className="h-5 w-5" />,
    },
    {
      label: "Fee Control",
      path: "/admin/fees",
      icon: <Filter className="h-5 w-5" />,
    },
    {
      label: "Fiat Deposits",
      path: "/admin/fiat-deposits",
      icon: <File className="h-5 w-5" />,
    },
    {
      label: "Vault Transfers",
      path: "/admin/liquidity",
      icon: <Database className="h-5 w-5" />,
    },
    {
      label: "Staking",
      path: "/admin/staking",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      label: "Exchange Rates",
      path: "/admin/exchange-rates",
      icon: <Filter className="h-5 w-5" />,
    },
    {
      label: "News Feed",
      path: "/admin/news-settings",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      label: "API Settings",
      path: "/admin/api-settings",
      icon: <Key className="h-5 w-5" />,
    },
    {
      label: "Activity Logs",
      path: "/admin/logs",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 h-full transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-sidebar border-r border-border`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-4 py-6 flex items-center justify-center">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                K
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">
                KOB Pay Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide py-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  } flex items-center gap-3 px-4 py-3 rounded-md transition-colors`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Settings className="h-4 w-4" />
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

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-4 h-full flex items-center justify-between">
            <div>
              {/* Mobile sidebar already has toggle button */}
            </div>

            {/* Right side of header */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User menu (mobile only) */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Security</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
