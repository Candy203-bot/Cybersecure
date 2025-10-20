import { Button } from "./ui/button";
import { Shield, Home, LayoutDashboard, ArrowLeft } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogout?: () => void;
}

export function Navigation({ currentPage, onNavigate, isAuthenticated, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-primary font-semibold">CyberSecure</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {currentPage !== 'home' && (
              <Button 
                variant="ghost" 
                onClick={() => window.history.length > 1 ? window.history.back() : onNavigate('home')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>

            {isAuthenticated && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate('dashboard')}
                  className="gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
