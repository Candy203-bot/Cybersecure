import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface TierAssessmentPageProps {
  tier: number;
  tierName: string;
  onNavigate: (page: string) => void;
  onAssessmentComplete: (score: number, responses: any[]) => void;
}

/* --------------------  Cleaned Tier-Based Questions -------------------- */
const tierQuestions = {
  1: [
    { id: "T1Q1", question: "Do you use strong passwords to protect business devices?", requiresEvidence: false, category: "Access Control" },
    { id: "T1Q2", question: "Do you regularly update your mobile apps and systems?", requiresEvidence: false, category: "System Maintenance" },
    { id: "T1Q3", question: "Do you avoid sharing sensitive business data over public Wi-Fi?", requiresEvidence: false, category: "Data Protection" },
    { id: "T1Q4", question: "Are staff aware of basic online security practices (e.g., phishing)?", requiresEvidence: false, category: "Staff Awareness" },
    { id: "T1Q5", question: "Do you keep a backup of important business information?", requiresEvidence: true, category: "Data Backup" },
    { id: "T1Q6", question: "Do you have basic internal rules or policies on how data should be handled?", requiresEvidence: true, category: "Structure & Policy" }
  ],
  2: [
    { id: "T2Q1", question: "Do you store customer information digitally in a controlled environment?", requiresEvidence: true, category: "Data Storage" },
    { id: "T2Q2", question: "Is sensitive data (like customer info) encrypted or password-protected?", requiresEvidence: true, category: "Data Security" },
    { id: "T2Q3", question: "Do you have antivirus or endpoint protection installed on all devices?", requiresEvidence: false, category: "System Security" },
    { id: "T2Q4", question: "Have employees received training on how to handle company or client data?", requiresEvidence: false, category: "Staff Training" },
    { id: "T2Q5", question: "Do you have a process for regular data backups?", requiresEvidence: true, category: "Data Backup" },
    { id: "T2Q6", question: "Do you have written guidelines for reporting cyber incidents or suspicious activity?", requiresEvidence: true, category: "Incident Response" },
    { id: "T2Q7", question: "Do you have clear job roles or structure for managing IT and data?", requiresEvidence: true, category: "Organizational Structure" }
  ],
  3: [
    { id: "T3Q1", question: "Does your business website use HTTPS for secure access?", requiresEvidence: true, category: "Web Security" },
    { id: "T3Q2", question: "Do you have a written cybersecurity policy for staff and management?", requiresEvidence: true, category: "Governance" },
    { id: "T3Q3", question: "Are online payments processed through secure, verified systems?", requiresEvidence: true, category: "Payment Security" },
    { id: "T3Q4", question: "Do you have a plan for how to respond to security incidents (like data breaches)?", requiresEvidence: true, category: "Incident Response" },
    { id: "T3Q5", question: "Do you assign user roles or access permissions for internal systems?", requiresEvidence: false, category: "Access Control" },
    { id: "T3Q6", question: "Do you keep documentation of your IT setup and internal procedures?", requiresEvidence: true, category: "Structure & Documentation" },
    { id: "T3Q7", question: "Do you perform regular security reviews or internal audits?", requiresEvidence: true, category: "Audit & Review" },
    { id: "T3Q8", question: "Do you maintain data backup logs or system maintenance records?", requiresEvidence: true, category: "Backup & Maintenance" }
  ]
};

export function TierAssessmentPage({
  tier,
  tierName,
  onNavigate,
  onAssessmentComplete,
}: TierAssessmentPageProps) {
  const questions = tierQuestions[tier as keyof typeof tierQuestions] || tierQuestions[1];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  /* --------------------  Navigation Logic -------------------- */
  const handleNext = () => {
    if (!currentAnswer) {
      toast.error("Please select an answer before continuing.");
      return;
    }

    if (question.requiresEvidence && currentAnswer === "Yes" && !evidenceFile) {
      toast.warning("Please upload evidence such as internal guidelines or backup logs.");
      return;
    }

    const response = {
      questionId: question.id,
      question: question.question,
      answer: currentAnswer,
      evidenceProvided: !!evidenceFile,
      category: question.category,
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer("");
      setEvidenceFile(null);
    } else {
      calculateScore(newResponses);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousResponse = responses[currentQuestion - 1];
      setCurrentAnswer(previousResponse?.answer || "");
      setResponses(responses.slice(0, -1));
    }
  };

  /* --------------------  Score Calculation -------------------- */
  const calculateScore = (finalResponses: any[]) => {
    const yesCount = finalResponses.filter((r) => r.answer === "Yes").length;
    const score = Math.round((yesCount / questions.length) * 100);

    toast.success("Assessment complete!");
    onAssessmentComplete(score, finalResponses);
    onNavigate("results");
  };

  /* --------------------  File Upload -------------------- */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setEvidenceFile(file);
      toast.success("Evidence uploaded successfully");
    }
  };

  /* --------------------  Render -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge className="bg-primary text-white mb-4">{tierName}</Badge>
          <h1 className="text-primary mb-2 text-2xl font-semibold">
            Cybersecurity Assessment
          </h1>
          <p className="text-gray-600">
            Answer the following questions and upload supporting evidence where applicable.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-primary font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-lg">
          <div className="mb-4">
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              {question.category}
            </Badge>
          </div>

          <h3 className="text-gray-900 mb-6 font-medium">
            {question.question}
          </h3>

          <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="Yes" id="yes" />
                <Label htmlFor="yes" className="flex-1 cursor-pointer">
                  Yes
                </Label>
                {currentAnswer === "Yes" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="No" id="no" />
                <Label htmlFor="no" className="flex-1 cursor-pointer">
                  No
                </Label>
                {currentAnswer === "No" && (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          </RadioGroup>

          {/* Evidence Upload */}
          {question.requiresEvidence && currentAnswer === "Yes" && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3 mb-3">
                <Upload className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Upload Evidence</h4>
                  <p className="text-gray-600 mb-3 text-sm">
                    Attach documents such as <strong>data backup logs</strong>,
                    <strong> internal guidelines</strong>, or{" "}
                    <strong>security policy screenshots</strong>.
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-blue-800 cursor-pointer"
                  />
                  {evidenceFile && (
                    <p className="text-green-600 mt-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {evidenceFile.name} uploaded
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-blue-800"
            >
              {currentQuestion === questions.length - 1
                ? "Submit Assessment"
                : "Next Question"}
            </Button>
          </div>
        </Card>

        {/* Save Progress */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => toast.info("Progress saved successfully")}
            className="text-primary"
          >
            Save Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
Changing from sooner@2.0.2 to just sonner
