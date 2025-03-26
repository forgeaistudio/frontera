
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="font-semibold text-xl tracking-tight text-frontera-700 transition-transform hover:scale-[1.02] mr-6"
          >
            Frontera
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/tracts">Tracts</NavLink>
            <NavLink to="/resources">Resources</NavLink>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" className="hidden md:flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                JD
              </span>
              <span className="hidden lg:inline-block">Profile</span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-card border-b border-border animate-in">
          <nav className="flex flex-col space-y-1 pb-3">
            <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</MobileNavLink>
            <MobileNavLink to="/inventory" onClick={() => setIsMenuOpen(false)}>Inventory</MobileNavLink>
            <MobileNavLink to="/tracts" onClick={() => setIsMenuOpen(false)}>Tracts</MobileNavLink>
            <MobileNavLink to="/resources" onClick={() => setIsMenuOpen(false)}>Resources</MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, onClick, children }: { to: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center px-3 py-2 text-sm hover:bg-accent rounded-md"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
