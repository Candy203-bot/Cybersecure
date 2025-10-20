import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface TierClassificationPageProps {
  onNavigate: (page: string) => void;
  onTierClassified: (tier: number, tierName: string) => void;
}

const questions = [
  {
    id: 1,
    question: "Does your business have a website?",
    options: ["Yes", "No"],
    tierWeight: { Yes: 3, No: 1 }
  },
  {
    id: 2,
    question: "Do you store customer data electronically?",
    options: ["Yes", "No"],
    tierWeight: { Yes: 2, No: 0 }
  },
  {
    id: 3,
    question: "Do you process online payments?",
    options: ["Yes", "No"],
    tierWeight: { Yes: 3, No: 0 }
  },
  {
    id: 4,
    question: "Does your business use cloud services or databases?",
    options: ["Yes", "No"],
    tierWeight: { Yes: 3, No: 0 }
  },
  {
    id: 5,
    question: "How many employees use digital tools in your business?",
    options: ["1-5", "6-20", "20+"],
    tierWeight: { "1-5": 1, "6-20": 2, "20+": 3 }
  },
  {
    id: 6,
    question: "Do you have an internal IT infrastructure or network?",
    options: ["Yes", "No"],
    tierWeight: { Yes: 3, No: 1 }
  }
];

export function TierClassificationPage({ onNavigate, onTierClassified }: TierClassificationPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer");
      return;
    }

    const newAnswers = { ...answers, [questions[currentQuestion].id]: selectedAnswer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[questions[currentQuestion + 1].id] || "");
    } else {
      // Calculate tier
      calculateTier(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const calculateTier = (finalAnswers: Record<number, string>) => {
    let totalScore = 0;
    
    questions.forEach(q => {
      const answer = finalAnswers[q.id];
      if (answer && q.tierWeight[answer as keyof typeof q.tierWeight]) {
        totalScore += q.tierWeight[answer as keyof typeof q.tierWeight];
      }
    });

    const maxScore = questions.reduce((sum, q) => {
      const maxValue = Math.max(...Object.values(q.tierWeight));
      return sum + maxValue;
    }, 0);

    const percentage = (totalScore / maxScore) * 100;

    let tier = 1;
    let tierName = "";

    if (percentage <= 35) {
      tier = 1;
      tierName = "Tier 1 - Basic Digital Presence";
    } else if (percentage <= 70) {
      tier = 2;
      tierName = "Tier 2 - Moderate Digital Integration";
    } else {
      tier = 3;
      tierName = "Tier 3 - Advanced Digital Operations";
    }

    toast.success(`Classification complete! You are ${tierName}`);
    onTierClassified(tier, tierName);
    onNavigate('tier-assessment');
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-primary mb-2">Business Tier Classification</h1>
          <p className="text-gray-600">
            Answer these questions to determine your cybersecurity assessment level
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-lg">
          <h3 className="text-gray-900 mb-6">{question.question}</h3>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-4">
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                  {selectedAnswer === option && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>

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
              {currentQuestion === questions.length - 1 ? "Complete Classification" : "Next"}
            </Button>
          </div>
        </Card>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h4 className="text-gray-900 mb-2">Understanding Tiers</h4>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Tier 1:</strong> Basic digital presence with minimal online operations</li>
            <li>• <strong>Tier 2:</strong> Moderate digital tools and customer data handling</li>
            <li>• <strong>Tier 3:</strong> Advanced operations with websites, databases, and payment systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
