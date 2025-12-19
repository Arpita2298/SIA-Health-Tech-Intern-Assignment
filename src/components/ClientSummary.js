import React from 'react';
import './ClientSummary.css';

const ClientSummary = ({ client }) => {
  return (
    <div className="card client-summary">
      <h2 className="section-title">Client Summary</h2>
      <div className="client-info">
        <div className="info-row">
          <span className="label">Age:</span>
          <span className="value">{client.age} years</span>
        </div>
        <div className="info-row">
          <span className="label">Condition:</span>
          <span className="value condition-badge">{client.condition}</span>
        </div>
        {client.weight && (
          <div className="info-row">
            <span className="label">Weight:</span>
            <span className="value">{client.weight}</span>
          </div>
        )}
        {client.height && (
          <div className="info-row">
            <span className="label">Height:</span>
            <span className="value">{client.height}</span>
          </div>
        )}
      </div>

      {client.primarySymptoms && (
        <div className="info-section">
          <h3 className="subsection-title">Primary Symptoms</h3>
          <p className="primary-symptoms">{client.primarySymptoms}</p>
        </div>
      )}

      <div className="info-section">
        <h3 className="subsection-title">Duration & Key Symptoms</h3>
        <ul className="symptom-list">
          {client.symptoms.map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>
      </div>

      {client.concerns && (
        <div className="info-section">
          <h3 className="subsection-title">Health Concerns</h3>
          <p className="concerns-text">{client.concerns}</p>
        </div>
      )}

      <div className="info-section">
        <h3 className="subsection-title">Goals</h3>
        <ul className="goal-list">
          {client.goals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>

      <div className="info-section">
        <h3 className="subsection-title">Medical Notes</h3>
        <p className="medical-notes">{client.medicalNotes}</p>
      </div>
    </div>
  );
};

export default ClientSummary;
