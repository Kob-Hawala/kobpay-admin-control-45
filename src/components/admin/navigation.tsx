
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
  Store
} from "lucide-react";
import React from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export function AdminNavigation() {
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
      label: "P2P Trading",
      path: "/admin/p2p",
      icon: <Store className="h-5 w-5" />,
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

  return (
    <>
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
    </>
  );
}
