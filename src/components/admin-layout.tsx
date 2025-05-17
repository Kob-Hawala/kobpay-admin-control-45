
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./admin/sidebar";
import { Header } from "./admin/header";
import { MobileSidebarToggle } from "./admin/mobile-sidebar-toggle";
import { Toaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import RealtimeEvents from "./realtime/realtime-events";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle clicking outside the sidebar on mobile to close it
  const handleContentClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Real-time events handler (invisible component) */}
      <RealtimeEvents />

      {/* Toast notifications provider */}
      <Toaster position="top-right" richColors closeButton />

      {/* Mobile sidebar toggle */}
      <MobileSidebarToggle 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Main content */}
      <div 
        className="flex-1 flex flex-col h-full overflow-hidden"
        onClick={handleContentClick}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
