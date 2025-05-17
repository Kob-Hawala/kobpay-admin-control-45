
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, User, Settings, FileText, AlertTriangle, DollarSign, Users, Shield, BarChart4 } from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/admin/dashboard' },
  { label: 'Users', icon: <Users className="h-5 w-5" />, href: '/admin/users' },
  { label: 'Transactions', icon: <DollarSign className="h-5 w-5" />, href: '/admin/transactions' },
  { label: 'KYC', icon: <Shield className="h-5 w-5" />, href: '/admin/kyc' },
  { label: 'Logs', icon: <FileText className="h-5 w-5" />, href: '/admin/logs' },
  { label: 'Analytics', icon: <BarChart4 className="h-5 w-5" />, href: '/admin/analytics' },
  { label: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/admin/settings' },
];

export function HamburgerMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const handleNavigate = (href: string) => {
    navigate(href);
    setOpen(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h2 className="text-lg font-semibold">KOB HAWALA</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 pb-8">
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start gap-2"
                  onClick={() => handleNavigate(item.href)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>
            
            <div className="mt-8 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@kobhawala.com</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => console.log("Logout")}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default HamburgerMenu;
