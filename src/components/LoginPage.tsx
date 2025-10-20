import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Mock login - in real app would validate credentials
    toast.success("Login successful!");
    onLogin(email);
    onNavigate('dashboard');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      <Card className="w-full max-w-md p-8 space-y-6 shadow-xl">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-primary text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center">Log in to access your dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input-background border-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input-background border-gray-200"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => toast.info("Password reset feature coming soon")}
            className="text-primary hover:underline"
          >
            Forgot Password?
          </button>

          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-blue-800 py-6"
          >
            Log In
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center pt-4 border-t">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => onNavigate('register')}
              className="text-primary hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
