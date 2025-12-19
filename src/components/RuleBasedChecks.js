import React from 'react';
import './RuleBasedChecks.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'OK':
        return 'status-ok';
      case 'Warning':
        return 'status-warning';
      case 'Needs Improvement':
        return 'status-needs-improvement';
      default:
        return '';
    }
  };

  return <span className={`status-badge ${getStatusClass()}`}>{status}</span>;
};

const RuleBasedChecks = ({ proteinCheck, portionCheck, formattingCheck }) => {
  return (
    <div className="card rule-based-checks">
      <h2 className="section-title">Quality Check 1: Rule-Based Validation</h2>
      
      <div className="check-section">
        <h3 className="check-title">Protein Content Check</h3>
        <div className="check-description">
          Validates that each meal contains approximately 10-14g of protein for balanced nutrition.
        </div>
        
        <div className="meal-checks">
          {Object.keys(proteinCheck.assessments).map(mealType => (
            <div className="meal-check-item" key={mealType}>
              <div className="meal-check-header">
                <span className="meal-name">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</span>
                <StatusBadge status={proteinCheck.assessments[mealType].status} />
              </div>
              <p className="check-message">{proteinCheck.assessments[mealType].message}</p>
            </div>
          ))}
        </div>

        <div className="assumptions-section">
          <h4 className="assumptions-title">Assumptions:</h4>
          <ul className="assumptions-list">
            {proteinCheck.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="check-section">
        <h3 className="check-title">Portion Size Check</h3>
        <div className="check-description">
          Ensures all food items have clearly defined, measurable portions for accurate tracking.
        </div>
        
        <div className="overall-status">
          <StatusBadge status={portionCheck.status} />
          <p className="check-message">{portionCheck.message}</p>
        </div>

        {portionCheck.issues.length > 0 && (
          <div className="issues-list">
            <h4 className="issues-title">Missing Portions:</h4>
            {portionCheck.issues.map((issue, index) => (
              <div className="issue-item" key={index}>
                <span className="issue-meal">{issue.meal}:</span>
                <span className="issue-detail">{issue.item}</span>
              </div>
            ))}
          </div>
        )}

        {portionCheck.warnings.length > 0 && (
          <div className="warnings-list">
            <h4 className="warnings-title">Unclear Portions:</h4>
            {portionCheck.warnings.map((warning, index) => (
              <div className="warning-item" key={index}>
                <span className="warning-meal">{warning.meal}:</span>
                <span className="warning-detail">{warning.item} - "{warning.portion}"</span>
              </div>
            ))}
          </div>
        )}

        <div className="assumptions-section">
          <h4 className="assumptions-title">Assumptions:</h4>
          <ul className="assumptions-list">
            {portionCheck.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="check-section">
        <h3 className="check-title">Formatting & Consistency Check</h3>
        <div className="check-description">
          Validates proper capitalization and formatting for professional meal plan presentation.
        </div>
        
        <div className="overall-status">
          <StatusBadge status={formattingCheck.status} />
          <p className="check-message">{formattingCheck.message}</p>
        </div>

        {formattingCheck.issues.length > 0 && (
          <div className="issues-list">
            <h4 className="issues-title">Formatting Issues:</h4>
            {formattingCheck.issues.map((issue, index) => (
              <div className="issue-item" key={index}>
                <span className="issue-meal">{issue.meal}:</span>
                <span className="issue-detail">{issue.item}</span>
                <span className="issue-type">→ {issue.issue}</span>
                {issue.suggestion && (
                  <span className="issue-suggestion">Suggestion: "{issue.suggestion}"</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="assumptions-section">
          <h4 className="assumptions-title">Assumptions:</h4>
          <ul className="assumptions-list">
            {formattingCheck.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RuleBasedChecks;
