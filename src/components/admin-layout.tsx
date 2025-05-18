
import React, { useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>

      <style>
        {`
        /* Ensure dark mode support for form elements */
        .dark input,
        .dark textarea,
        .dark select,
        .dark [class*="select-trigger"],
        .dark [class*="select-content"] {
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
          border-color: hsl(var(--border));
        }
        
        /* Fix sidebar icon visibility */
        .dark [data-collapsed] svg {
          color: hsl(var(--foreground));
        }
        
        /* Hover states for sidebar icons */
        .dark [data-collapsed] a:hover svg,
        .dark [data-collapsed] button:hover svg {
          color: hsl(var(--primary));
        }
        `}
      </style>
    </div>
  );
};

export default AdminLayout;
