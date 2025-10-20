import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Shield, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Clock, 
  Award,
  RefreshCw,
  User
} from "lucide-react";

interface DashboardPageProps {
  businessName: string;
  email: string;
  tier: number;
  tierName: string;
  lastScore: number;
  assessmentDate: string;
  onNavigate: (page: string) => void;
}

export function DashboardPage({ 
  businessName, 
  email, 
  tier, 
  tierName, 
  lastScore, 
  assessmentDate,
  onNavigate 
}: DashboardPageProps) {
  const getScoreStatus = () => {
    if (lastScore >= 80) return { label: "Excellent", color: "text-green-600", bgColor: "bg-green-50" };
    if (lastScore >= 60) return { label: "Good", color: "text-blue-600", bgColor: "bg-blue-50" };
    if (lastScore >= 40) return { label: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    return { label: "Needs Work", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const scoreStatus = getScoreStatus();

  const mockHistory = [
    { date: assessmentDate, score: lastScore, status: scoreStatus.label },
    { date: "2025-09-15", score: lastScore - 10, status: "Fair" },
    { date: "2025-08-01", score: lastScore - 20, status: "Needs Work" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-primary">Dashboard</h1>
          </div>
          <p className="text-gray-600">Welcome back, {businessName}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Business Tier</span>
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl text-primary mb-1">Tier {tier}</div>
            <div className="text-gray-500 text-sm">{tierName.split(' - ')[1]}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Latest Score</span>
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div className={`text-2xl ${scoreStatus.color} mb-1`}>{lastScore}%</div>
            <div className={`text-sm ${scoreStatus.color}`}>{scoreStatus.label}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Last Assessment</span>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl text-gray-900 mb-1">{new Date(assessmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div className="text-gray-500 text-sm">{new Date(assessmentDate).getFullYear()}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Improvement</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl text-green-600 mb-1">+{lastScore - (mockHistory[1]?.score || lastScore - 10)}%</div>
            <div className="text-gray-500 text-sm">Since last time</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status Card */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Compliance Status</h2>
              <div className={`p-6 rounded-lg ${scoreStatus.bgColor} mb-4`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl text-gray-900 mb-1">{lastScore}%</div>
                    <div className={scoreStatus.color}>{scoreStatus.label} Compliance</div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Shield className={`w-10 h-10 ${scoreStatus.color}`} />
                  </div>
                </div>
                <Progress value={lastScore} className="h-3 mb-3" />
                <p className="text-gray-600">
                  {lastScore >= 80 
                    ? "Your business demonstrates strong cybersecurity compliance. Keep up the good work!" 
                    : lastScore >= 60 
                    ? "You're on the right track. Review recommendations to improve your score."
                    : "There are important gaps to address. Start with high-priority recommendations."}
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => onNavigate('tier-assessment')}
                  className="bg-primary hover:bg-blue-800 gap-2 flex-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Start New Assessment
                </Button>
                <Button 
                  onClick={() => onNavigate('results')}
                  variant="outline"
                  className="flex-1"
                >
                  View Last Results
                </Button>
              </div>
            </Card>

            {/* Assessment History */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Assessment History</h3>
              <div className="space-y-3">
                {mockHistory.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-gray-900">Assessment {mockHistory.length - index}</div>
                        <div className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-gray-900">{item.score}%</div>
                      <div className="text-gray-500 text-sm">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Business Profile */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-gray-900">Business Profile</h3>
                  <Badge className="bg-primary text-white mt-1">Tier {tier}</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-gray-500 text-sm">Business Name</div>
                  <div className="text-gray-900">{businessName}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Email</div>
                  <div className="text-gray-900">{email}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Classification</div>
                  <div className="text-gray-900">{tierName.split(' - ')[1]}</div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => onNavigate('tier-classification')}
              >
                Update Classification
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate('recommendations')}
                >
                  <TrendingUp className="w-4 h-4" />
                  View Recommendations
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate('results')}
                >
                  <FileText className="w-4 h-4" />
                  Download Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => alert("Support resources coming soon")}
                >
                  <Shield className="w-4 h-4" />
                  Security Resources
                </Button>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="text-gray-900 mb-2">💡 Quick Tip</h4>
              <p className="text-gray-600 text-sm">
                Regular assessments help you track progress and maintain compliance. We recommend conducting assessments quarterly.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
