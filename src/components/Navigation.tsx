import React from "react";
import { Button } from "./ui/button";
import { Shield, Home, LayoutDashboard, ArrowLeft } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogout?: () => void;
}

export function Navigation({
  currentPage,
  onNavigate,
  isAuthenticated,
  onLogout,
}: NavigationProps) {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigate("home");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => onNavigate("home")}
          >
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-primary font-semibold text-lg tracking-wide">
              CyberSecure
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {currentPage !== "home" && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="gap-2 text-gray-700 hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() => onNavigate("home")}
              className={`gap-2 ${
                currentPage === "home"
                  ? "text-primary font-medium"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Button>

            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("dashboard")}
                  className={`gap-2 ${
                    currentPage === "dashboard"
                      ? "text-primary font-medium"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={onLogout}
                  className="border-primary text-primary hover:bg-blue-50"
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

