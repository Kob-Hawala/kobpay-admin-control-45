
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "./user-menu";
import { useAuth } from "@/providers/auth-provider";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          {/* Desktop hamburger menu */}
          <Button 
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 hidden md:flex"
          >
            <Menu className="h-5 w-5 text-foreground dark:text-gray-100" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Right side of header */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-foreground dark:text-gray-100" />
          </Button>

          {/* User menu (desktop only) */}
          <div className="hidden md:block">
            <UserMenu user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
