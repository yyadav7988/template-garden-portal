
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, LayoutDashboard, FileImage, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: FileImage,
      label: "Templates",
      href: "/templates",
    },
    {
      icon: Plus,
      label: "New Template",
      href: "/templates/new",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar text-sidebar-foreground p-4 space-y-6">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground">TG</span>
          </div>
          <h1 className="text-xl font-semibold">Template Garden</h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 rounded-md">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-sidebar-foreground/70">admin@templategarden.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground">TG</span>
          </div>
          <h1 className="text-xl font-semibold">Template Garden</h1>
        </div>
        {/* Mobile menu button would go here */}
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10">
        <nav className="flex justify-around">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "flex flex-col items-center py-3 px-2 text-xs",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon size={20} />
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
