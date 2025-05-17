
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileSidebarToggleProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function MobileSidebarToggle({ isSidebarOpen, toggleSidebar }: MobileSidebarToggleProps) {
  return (
    <div className="fixed top-4 left-4 md:hidden z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="rounded-full bg-background/80 backdrop-blur-sm"
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
}
