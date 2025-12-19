import React, { useState } from 'react';
import './AIAssistedCheck.css';

const AIAssistedCheck = ({ aiCheckResult }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showRawOutput, setShowRawOutput] = useState(false);

  return (
    <div className="card ai-assisted-check">
      <h2 className="section-title">Quality Check 2: AI-Assisted Plan Fit Analysis</h2>
      
      <div className="ai-description">
        <p>
          This check uses AI to assess whether the meal plan is a reasonable fit for the client's 
          specific condition, goals, and logged symptoms. The AI output is interpreted and summarized 
          for clarity.
        </p>
      </div>

      <div className="prompt-section">
        <button 
          className="toggle-button"
          onClick={() => setShowPrompt(!showPrompt)}
        >
          {showPrompt ? '▼' : '▶'} View AI Prompt Logic
        </button>
        {showPrompt && (
          <div className="prompt-content">
            <pre>{aiCheckResult.prompt}</pre>
          </div>
        )}
      </div>

      <div className="interpretation-section">
        <h3 className="subsection-title">Summary Assessment</h3>
        <p className="interpretation-text">{aiCheckResult.interpretation}</p>
      </div>

      {aiCheckResult.confirmations.length > 0 && (
        <div className="confirmations-section">
          <h3 className="subsection-title">✓ Positive Alignments</h3>
          <div className="confirmations-list">
            {aiCheckResult.confirmations.map((confirmation, index) => (
              <div className="confirmation-item" key={index}>
                <div className="confirmation-area">{confirmation.area}</div>
                <div className="confirmation-detail">{confirmation.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {aiCheckResult.concerns.length > 0 && (
        <div className="concerns-section">
          <h3 className="subsection-title">⚠ Areas for Consideration</h3>
          <div className="concerns-list">
            {aiCheckResult.concerns.map((concern, index) => (
              <div className="concern-item" key={index}>
                <div className="concern-area">{concern.area}</div>
                <div className="concern-detail">{concern.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="raw-output-section">
        <button 
          className="toggle-button"
          onClick={() => setShowRawOutput(!showRawOutput)}
        >
          {showRawOutput ? '▼' : '▶'} View Raw AI Output
        </button>
        {showRawOutput && (
          <div className="raw-output-content">
            <pre>{aiCheckResult.rawAIOutput}</pre>
          </div>
        )}
      </div>

      <div className="ai-note">
        <strong>Note:</strong> This analysis is for quality control purposes only and does not constitute 
        medical advice. It helps health coaches identify logical inconsistencies or areas that may need 
        discussion with the client.
      </div>
    </div>
  );
};

export default AIAssistedCheck;
