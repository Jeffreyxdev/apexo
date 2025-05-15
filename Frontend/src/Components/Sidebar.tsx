
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../Components/ui/button";
import { Separator } from "../Components/ui/separator";
import { 
  Briefcase, 
  FileText, 
  User, 
  Search, 
  LayoutDashboard,
  Menu,
  X,
  BookOpen
} from "lucide-react";
import { cn } from "../lib/utils";
import { useIsMobile } from "../hooks/use-mobile";

const navItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: "/",
  },
  {
    title: "Search Jobs",
    icon: <Search className="h-5 w-5" />,
    path: "/search",
  },
  {
    title: "Resume Builder",
    icon: <FileText className="h-5 w-5" />,
    path: "/resume-builder",
  },
  {
    title: "Job Tracker",
    icon: <Briefcase className="h-5 w-5" />,
    path: "/job-tracker",
  },
  {
    title: "Interview Prep",
    icon: <BookOpen className="h-5 w-5" />,
    path: "/interview-prep",
  },
  {
    title: "Profile",
    icon: <User className="h-5 w-5" />,
    path: "/profile",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full shadow-md bg-white"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>
      
      {/* Sidebar Backdrop for Mobile */}
      {!collapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "h-screen bg-sidebar fixed z-50 transition-all duration-300",
          collapsed ? "-translate-x-full" : "translate-x-0",
          isMobile ? "w-[270px]" : "w-[270px] lg:w-[270px]"
        )}
      >
        <div className="flex flex-col h-full px-4">
          {/* Logo */}
          <div className="flex items-center justify-center h-20">
            <Link to="/" onClick={isMobile ? toggleSidebar : undefined}>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 chase-gradient rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-lg">C</span>
                </div>
                <h1 className="text-xl font-bold text-white">Chase.AI</h1>
              </div>
            </Link>
          </div>
          
          <Separator className="bg-sidebar-border my-2" />
          
          {/* Navigation */}
          <nav className="flex-1 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link 
                    to={item.path} 
                    onClick={isMobile ? toggleSidebar : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                      location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary font-medium"
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* AI Assistant Button */}
          <div className="mb-8">
            <Button 
              className="w-full chase-gradient text-white border-none" 
              onClick={() => {
                // Open AI assistant
                if (isMobile) toggleSidebar();
              }}
            >
              <div className="mr-2 h-4 w-4 rounded-full bg-white animate-pulse-slow"></div>
              AI Assistant
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
