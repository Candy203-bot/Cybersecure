import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-4 py-2 rounded-full">
              <Shield className="w-5 h-5" />
              <span>Trusted by SMEs in Botswana</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl text-primary">
              Assess your cybersecurity readiness today
            </h1>
            
            <p className="text-gray-600 text-lg">
              CyberSecure is a comprehensive compliance assessment tool designed specifically for Small and Medium Enterprises (SMEs) in Botswana. Evaluate your business against national cybersecurity regulations and get actionable recommendations to improve your security posture.
            </p>

            <div className="flex gap-4">
              <Button 
                onClick={() => onNavigate('register')}
                className="bg-primary hover:bg-blue-800 px-8 py-6"
              >
                Sign Up
              </Button>
              <Button 
                onClick={() => onNavigate('login')}
                variant="outline"
                className="px-8 py-6 border-primary text-primary hover:bg-blue-50"
              >
                Log In
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-blue-300/20 rounded-3xl blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1696013910376-c56f76dd8178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2hpZWxkJTIwbG9ja3xlbnwxfHx8fDE3NjA5NDQxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cybersecurity"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-center text-gray-900 mb-12">
            Why Choose CyberSecure?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-gray-900 mb-2">Tailored Assessment</h3>
              <p className="text-gray-600">
                Questions adapted to your business tier and digital presence level
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-gray-900 mb-2">Compliance Ready</h3>
              <p className="text-gray-600">
                Aligned with Botswana's Data Protection Act and cybersecurity regulations
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-gray-900 mb-2">Actionable Insights</h3>
              <p className="text-gray-600">
                Get clear recommendations to strengthen your cybersecurity posture
              </p>
            </Card>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-24 bg-white rounded-3xl p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-gray-900">About CyberSecure</h2>
            <p className="text-gray-600">
              CyberSecure helps SMEs in Botswana navigate the complex landscape of cybersecurity compliance. 
              Our intelligent assessment system categorizes your business into one of three tiers based on your 
              digital operations, then provides a customized evaluation aligned with relevant regulations including 
              the Data Protection Act (2024), Cybercrime Act (2018), and Electronic Transactions Act (2014).
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h3 className="text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Contact us for support or more information about our services
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-blue-50">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
