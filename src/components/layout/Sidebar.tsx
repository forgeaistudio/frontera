
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Package, MessageSquare, Book, User } from "lucide-react";

type SidebarLinkProps = {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

export function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 flex-col border-r bg-card/50 backdrop-blur-sm">
      <div className="flex flex-col gap-1 p-4">
        <SidebarLink to="/dashboard" icon={Home}>Dashboard</SidebarLink>
        <SidebarLink to="/inventory" icon={Package}>Inventory</SidebarLink>
        <SidebarLink to="/tracts" icon={MessageSquare}>Tracts</SidebarLink>
        <SidebarLink to="/resources" icon={Book}>Resources</SidebarLink>
        <SidebarLink to="/profile" icon={User}>Profile</SidebarLink>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Preparedness Lvl 2</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon: Icon, children }: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 transition-all",
          isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </Button>
    </Link>
  );
}
