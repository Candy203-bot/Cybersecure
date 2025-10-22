import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { TierClassificationPage } from "./components/TierClassificationPage";
import { TierAssessmentPage } from "./components/TierAssessmentPage";
import { ResultsPage } from "./components/ResultsPage";
import { RecommendationsPage } from "./components/RecommendationsPage";
import { DashboardPage } from "./components/DashboardPage";
import { Navigation } from "./components/Navigation";

export function AppRouter() {
  const [page, setPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ businessName: string; email: string } | null>(null);
  const [tier, setTier] = useState<number | null>(null);
  const [tierName, setTierName] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [responses, setResponses] = useState<any[]>([]);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUser({ businessName: "Sample Business", email });
    setPage("dashboard");
  };

  const handleRegister = (businessName: string, email: string) => {
    setUser({ businessName, email });
  };

  const handleTierClassified = (tier: number, name: string) => {
    setTier(tier);
    setTierName(name);
    setPage("tier-assessment");
  };

  const handleAssessmentComplete = (score: number, responses: any[]) => {
    setScore(score);
    setResponses(responses);
    setPage("results");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPage("home");
  };

  return (
    <div>
      <Navigation
        currentPage={page}
        onNavigate={setPage}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      {page === "home" && <HomePage onNavigate={setPage} />}
      {page === "login" && <LoginPage onNavigate={setPage} onLogin={handleLogin} />}
      {page === "register" && (
        <RegistrationPage onNavigate={setPage} onRegister={handleRegister} />
      )}
      {page === "tier-classification" && (
        <TierClassificationPage
          onNavigate={setPage}
          onTierClassified={handleTierClassified}
        />
      )}
      {page === "tier-assessment" && tier && (
        <TierAssessmentPage
          tier={tier}
          tierName={tierName}
          onNavigate={setPage}
          onAssessmentComplete={handleAssessmentComplete}
        />
      )}
      {page === "results" && (
        <ResultsPage
          score={score ?? 0}
          tier={tier ?? 1}
          tierName={tierName}
          responses={responses}
          onNavigate={setPage}
        />
      )}
      {page === "recommendations" && (
        <RecommendationsPage
          score={score ?? 0}
          tier={tier ?? 1}
          tierName={tierName}
          responses={responses}
          onNavigate={setPage}
        />
      )}
      {page === "dashboard" && user && (
        <DashboardPage
          businessName={user.businessName}
          email={user.email}
          tier={tier ?? 1}
          tierName={tierName || "Tier 1 - Basic Digital Presence"}
          lastScore={score ?? 0}
          assessmentDate={new Date().toISOString()}
          onNavigate={setPage}
        />
      )}
    </div>
  );
}
add AppRouter for the navigation flow
