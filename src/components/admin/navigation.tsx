import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Database,
  Settings,
  User,
  Shield,
  File,
  Filter,
  Key,
  Lock,
  Clock,
  Eye,
  Store,
  Bell,
  MessageSquare,
} from "lucide-react";
import React from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface AdminNavigationProps {
  collapsed?: boolean;
}

export function AdminNavigation({ collapsed = false }: AdminNavigationProps) {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <Database className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <User className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "KYC Approval",
      path: "/admin/kyc",
      icon: <Shield className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "KOB Pay ID",
      path: "/admin/kobpay",
      icon: <Key className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "P2P Trading",
      path: "/admin/p2p",
      icon: <Store className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Notifications",
      path: "/admin/notifications",
      icon: <Bell className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Messaging",
      path: "/admin/messaging",
      icon: <MessageSquare className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Escrow Control",
      path: "/admin/escrow",
      icon: <Lock className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Transactions",
      path: "/admin/transactions",
      icon: <File className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Fee Control",
      path: "/admin/fees",
      icon: <Filter className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Fiat Deposits",
      path: "/admin/fiat-deposits",
      icon: <File className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Vault Transfers",
      path: "/admin/liquidity",
      icon: <Database className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Staking",
      path: "/admin/staking",
      icon: <Calendar className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Exchange Rates",
      path: "/admin/exchange-rates",
      icon: <Filter className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "News Feed",
      path: "/admin/news-settings",
      icon: <Eye className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "API Settings",
      path: "/admin/api-settings",
      icon: <Key className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Activity Logs",
      path: "/admin/logs",
      icon: <Clock className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5 text-sidebar-foreground dark:text-gray-200" />,
    },
  ];

  return (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            // Removed title prop to avoid type issue; rely on tooltip or aria-label for accessibility
            aria-label={item.label} // Added for accessibility
            className={`${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground dark:bg-primary/10"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 dark:text-gray-200 dark:hover:bg-primary/5"
            } flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {React.cloneElement(item.icon as React.ReactElement, {
              className: `h-5 w-5 ${
                isActive ? "text-sidebar-accent-foreground dark:text-primary" : "text-sidebar-foreground dark:text-gray-200"
              }`,
            })}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );
      })}
    </>
  );
}