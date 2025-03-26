import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Home, Package, MessageSquare, Book, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type SidebarLinkProps = {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

export function Sidebar() {
  const { user } = useAuth();
  
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 flex-col border-r bg-card/50 backdrop-blur-sm">
      <div className="p-4 border-b">
        <Link 
          to="/" 
          className="flex items-center font-semibold text-xl tracking-tight text-frontera-700 transition-transform hover:scale-[1.02]"
        >
          Frontera
        </Link>
      </div>

      <div className="flex flex-col gap-1 p-4">
        <SidebarLink to="/dashboard" icon={Home}>Dashboard</SidebarLink>
        <SidebarLink to="/inventory" icon={Package}>Inventory</SidebarLink>
        <SidebarLink to="/tracts" icon={MessageSquare}>Tracts</SidebarLink>
        <SidebarLink to="/resources" icon={Book}>Resources</SidebarLink>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-accent transition-colors">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Preparedness Lvl 2</span>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-2" side="right" align="end">
            <div className="flex flex-col gap-1">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button 
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors w-full text-left text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>
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
