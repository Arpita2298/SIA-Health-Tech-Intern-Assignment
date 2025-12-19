import React, { useState, useEffect } from 'react';
import './App.css';
import ClientSummary from './components/ClientSummary';
import MealPlan from './components/MealPlan';
import RuleBasedChecks from './components/RuleBasedChecks';
import AIAssistedCheck from './components/AIAssistedCheck';
import { clientData, mealPlanData } from './data/mockData';
import { 
  checkProteinContent, 
  checkPortionSizes, 
  checkFormattingAndTypos,
  performAIAssistedCheck 
} from './utils/qualityChecks';

function App() {
  const [proteinCheckResult, setProteinCheckResult] = useState(null);
  const [portionCheckResult, setPortionCheckResult] = useState(null);
  const [formattingCheckResult, setFormattingCheckResult] = useState(null);
  const [aiCheckResult, setAICheckResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const proteinResult = checkProteinContent(mealPlanData);
    setProteinCheckResult(proteinResult);
    
    const portionResult = checkPortionSizes(mealPlanData);
    setPortionCheckResult(portionResult);
    
    const formattingResult = checkFormattingAndTypos(mealPlanData);
    setFormattingCheckResult(formattingResult);
    
    const aiResult = performAIAssistedCheck(clientData, mealPlanData);
    setAICheckResult(aiResult);
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Running quality checks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">SIA Health - Meal Plan Quality Checker</h1>
          <p className="app-subtitle">Internal tool for health coaches to review meal plans</p>
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard-container">
          <ClientSummary client={clientData} />
          
          <MealPlan mealPlan={mealPlanData} />
          
          <RuleBasedChecks 
            proteinCheck={proteinCheckResult}
            portionCheck={portionCheckResult}
            formattingCheck={formattingCheckResult}
          />
          
          <AIAssistedCheck aiCheckResult={aiCheckResult} />
        </div>
      </main>

      <footer className="app-footer">
        <p>SIA Health © 2025 - Internal Quality Control Tool</p>
      </footer>
    </div>
  );
}

export default App;
