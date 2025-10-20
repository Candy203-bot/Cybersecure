import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, AlertTriangle, BookOpen, Users, Shield, FileText } from "lucide-react";

interface RecommendationsPageProps {
  score: number;
  tier: number;
  tierName: string;
  responses: any[];
  onNavigate: (page: string) => void;
}

export function RecommendationsPage({ score, tier, tierName, responses, onNavigate }: RecommendationsPageProps) {
  const getRecommendations = () => {
    const recs = [];
    const noResponses = responses.filter(r => r.answer === "No");

    // General recommendations based on score
    if (score < 40) {
      recs.push({
        priority: "High",
        icon: AlertTriangle,
        title: "Immediate Action Required",
        description: "Your compliance score indicates significant gaps. Consider hiring a cybersecurity consultant.",
        actions: [
          "Conduct a comprehensive security audit",
          "Develop a cybersecurity roadmap",
          "Allocate budget for security improvements"
        ]
      });
    }

    if (score < 60) {
      recs.push({
        priority: "High",
        icon: Shield,
        title: "Strengthen Security Policies",
        description: "Implement formal cybersecurity policies and procedures.",
        actions: [
          "Create a written cybersecurity policy",
          "Establish incident response procedures",
          "Define roles and responsibilities"
        ]
      });
    }

    // Specific recommendations based on non-compliant areas
    const needsPasswordPolicy = noResponses.some(r => r.question.toLowerCase().includes("password"));
    if (needsPasswordPolicy) {
      recs.push({
        priority: "High",
        icon: Shield,
        title: "Implement Strong Password Policies",
        description: "Passwords are your first line of defense against unauthorized access.",
        actions: [
          "Require passwords with minimum 12 characters",
          "Enable multi-factor authentication (MFA)",
          "Use a password manager",
          "Enforce regular password changes"
        ]
      });
    }

    const needsBackup = noResponses.some(r => r.question.toLowerCase().includes("backup"));
    if (needsBackup) {
      recs.push({
        priority: "High",
        icon: FileText,
        title: "Establish Data Backup Process",
        description: "Regular backups protect against data loss from ransomware, hardware failure, or human error.",
        actions: [
          "Implement the 3-2-1 backup rule (3 copies, 2 different media, 1 offsite)",
          "Automate daily backups",
          "Test backup restoration regularly",
          "Encrypt backup data"
        ]
      });
    }

    const needsTraining = noResponses.some(r => r.question.toLowerCase().includes("training") || r.question.toLowerCase().includes("aware"));
    if (needsTraining) {
      recs.push({
        priority: "Medium",
        icon: Users,
        title: "Employee Security Awareness Training",
        description: "Human error is a leading cause of security breaches. Train your team regularly.",
        actions: [
          "Conduct quarterly security awareness sessions",
          "Train staff to recognize phishing emails",
          "Create security guidelines documentation",
          "Run simulated phishing tests"
        ]
      });
    }

    const needsAntivirus = noResponses.some(r => r.question.toLowerCase().includes("antivirus"));
    if (needsAntivirus) {
      recs.push({
        priority: "High",
        icon: Shield,
        title: "Install Antivirus Protection",
        description: "Antivirus software is essential for protecting against malware and ransomware.",
        actions: [
          "Deploy enterprise-grade antivirus on all devices",
          "Enable real-time scanning",
          "Schedule regular system scans",
          "Keep antivirus definitions updated"
        ]
      });
    }

    const needsSSL = noResponses.some(r => r.question.toLowerCase().includes("https") || r.question.toLowerCase().includes("ssl"));
    if (needsSSL) {
      recs.push({
        priority: "High",
        icon: Shield,
        title: "Secure Your Website with HTTPS",
        description: "SSL/TLS encryption protects data transmitted between your website and users.",
        actions: [
          "Obtain an SSL certificate (free options available)",
          "Configure HTTPS on your web server",
          "Redirect all HTTP traffic to HTTPS",
          "Update internal links to use HTTPS"
        ]
      });
    }

    // Add general best practices
    recs.push({
      priority: "Medium",
      icon: BookOpen,
      title: "Stay Informed on Regulations",
      description: "Botswana's cybersecurity landscape is evolving. Stay updated on compliance requirements.",
      actions: [
        "Subscribe to BOCRA updates",
        "Review Data Protection Act requirements annually",
        "Join local cybersecurity associations",
        "Attend compliance workshops"
      ]
    });

    if (tier >= 2) {
      recs.push({
        priority: "Medium",
        icon: FileText,
        title: "Document Your Security Measures",
        description: "Documentation is crucial for demonstrating compliance and maintaining consistency.",
        actions: [
          "Create a data protection policy",
          "Document network architecture",
          "Maintain an asset inventory",
          "Keep records of security incidents"
        ]
      });
    }

    return recs.slice(0, 6); // Return top 6 recommendations
  };

  const recommendations = getRecommendations();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-primary text-white mb-4">{tierName}</Badge>
          <h1 className="text-primary mb-2">Recommendations</h1>
          <p className="text-gray-600">
            Personalized guidance to improve your cybersecurity compliance
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-gray-700">Your Score:</span>
            <span className="text-primary">{score}%</span>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-6 mb-8">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{rec.title}</h3>
                      <Badge className={`${getPriorityColor(rec.priority)} text-white text-xs`}>
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {rec.description}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-gray-900 mb-3">Action Steps:</h4>
                      <ul className="space-y-2">
                        {rec.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Resources Section */}
        <Card className="p-6 bg-blue-50 border-blue-200 mb-6">
          <h3 className="text-gray-900 mb-4">Additional Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-gray-900">Government Resources</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Botswana Communications Regulatory Authority (BOCRA)</li>
                <li>• Data Protection Office</li>
                <li>• Ministry of Communications</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-gray-900">Support Services</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Local cybersecurity consultants</li>
                <li>• IT security training providers</li>
                <li>• Compliance audit services</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => onNavigate('dashboard')}
            className="bg-primary hover:bg-blue-800"
          >
            Return to Dashboard
          </Button>
          <Button
            onClick={() => onNavigate('tier-assessment')}
            variant="outline"
          >
            Retake Assessment
          </Button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 text-center p-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <h4 className="text-gray-900 mb-2">Need Expert Assistance?</h4>
          <p className="text-gray-600 mb-4">
            Consider consulting with a cybersecurity professional to implement these recommendations
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-blue-50">
            Contact a Consultant
          </Button>
        </div>
      </div>
    </div>
  );
}
