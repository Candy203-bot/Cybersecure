import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { TierClassificationPage } from "./components/TierClassificationPage";
import { TierAssessmentPage } from "./components/TierAssessmentPage";
import { ResultsPage } from "./components/ResultsPage";
import { RecommendationsPage } from "./components/RecommendationsPage";
import { DashboardPage } from "./components/DashboardPage";
import { Toaster } from "./components/ui/sonner";
import "./styles/globals.css";

type Page = 'home' | 'login' | 'register' | 'tier-classification' | 'tier-assessment' | 'results' | 'recommendations' | 'dashboard';

interface UserData {
  businessName: string;
  email: string;
  tier: number;
  tierName: string;
  lastScore: number;
  lastAssessmentDate: string;
  responses: any[];
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    businessName: '',
    email: '',
    tier: 1,
    tierName: 'Tier 1 - Basic Digital Presence',
    lastScore: 0,
    lastAssessmentDate: new Date().toISOString().split('T')[0],
    responses: []
  });

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserData(prev => ({ ...prev, email }));
  };

  const handleRegister = (businessName: string, email: string) => {
    setIsAuthenticated(true);
    setUserData(prev => ({ 
      ...prev, 
      businessName, 
      email,
      lastAssessmentDate: new Date().toISOString().split('T')[0]
    }));
  };

  const handleTierClassified = (tier: number, tierName: string) => {
    setUserData(prev => ({ ...prev, tier, tierName }));
  };

  const handleAssessmentComplete = (score: number, responses: any[]) => {
    setUserData(prev => ({ 
      ...prev, 
      lastScore: score, 
      responses,
      lastAssessmentDate: new Date().toISOString().split('T')[0]
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData({
      businessName: '',
      email: '',
      tier: 1,
      tierName: 'Tier 1 - Basic Digital Presence',
      lastScore: 0,
      lastAssessmentDate: new Date().toISOString().split('T')[0],
      responses: []
    });
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onNavigate={handleNavigate} 
          onLogin={handleLogin}
        />
      )}
      
      {currentPage === 'register' && (
        <RegistrationPage 
          onNavigate={handleNavigate}
          onRegister={handleRegister}
        />
      )}
      
      {currentPage === 'tier-classification' && (
        <TierClassificationPage 
          onNavigate={handleNavigate}
          onTierClassified={handleTierClassified}
        />
      )}
      
      {currentPage === 'tier-assessment' && (
        <TierAssessmentPage 
          tier={userData.tier}
          tierName={userData.tierName}
          onNavigate={handleNavigate}
          onAssessmentComplete={handleAssessmentComplete}
        />
      )}
      
      {currentPage === 'results' && (
        <ResultsPage 
          score={userData.lastScore}
          tier={userData.tier}
          tierName={userData.tierName}
          responses={userData.responses}
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === 'recommendations' && (
        <RecommendationsPage 
          score={userData.lastScore}
          tier={userData.tier}
          tierName={userData.tierName}
          responses={userData.responses}
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === 'dashboard' && isAuthenticated && (
        <DashboardPage 
          businessName={userData.businessName}
          email={userData.email}
          tier={userData.tier}
          tierName={userData.tierName}
          lastScore={userData.lastScore}
          assessmentDate={userData.lastAssessmentDate}
          onNavigate={handleNavigate}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;
