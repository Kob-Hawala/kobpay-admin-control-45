
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileSidebarToggleProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function MobileSidebarToggle({ isSidebarOpen, toggleSidebar }: MobileSidebarToggleProps) {
  const isMobile = useIsMobile();
  
  // Only show on mobile
  if (!isMobile) return null;
  
  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="rounded-full bg-background/80 backdrop-blur-sm"
      >
        {isSidebarOpen ? <X className="h-5 w-5 text-foreground dark:text-gray-100" /> : <Menu className="h-5 w-5 text-foreground dark:text-gray-100" />}
      </Button>
    </div>
  );
}
