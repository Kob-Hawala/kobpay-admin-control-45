
import { useState } from "react";
import { Sidebar } from "./admin/sidebar";
import { Header } from "./admin/header";
import { MobileSidebarToggle } from "./admin/mobile-sidebar-toggle";
import { Toaster } from "sonner";
import { DesktopHamburgerMenu, MobileHamburgerMenu } from "./admin/hamburger-menu";
import RealtimeEvents from "./realtime/realtime-events";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

      {/* Mobile hamburger menu */}
      <div className="md:hidden absolute top-3 left-3 z-50">
        <MobileHamburgerMenu />
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Desktop hamburger menu - can be toggled in the header */}
        <div className="hidden md:block">
          <DesktopHamburgerMenu />
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
