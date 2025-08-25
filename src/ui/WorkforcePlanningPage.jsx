import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import JDPreparationPage from './JDPreparationPage';
import RequisitionFormsPage from './RequisitionFormsPage';
import './styles.css';

export default function WorkforcePlanningPage() {
  return (
    <div className="workforce-planning">
      <div className="workforce-header">
        <h1>Workforce Planning</h1>
        <p>Manage workforce requirements, job descriptions, and recruitment processes</p>
      </div>
      
      <div className="workforce-nav">
        <NavLink to="/workforce/jd-preparation" className="nav-card">
          <h3>JD Preparation</h3>
          <p>Create and manage job descriptions</p>
        </NavLink>
        <NavLink to="/workforce/requisition-forms" className="nav-card">
          <h3>Requisition Forms</h3>
          <p>Manage recruitment requisitions and approvals</p>
        </NavLink>
      </div>

      <div className="workforce-content">
        <Routes>
          <Route path="jd-preparation" element={<JDPreparationPage />} />
          <Route path="requisition-forms" element={<RequisitionFormsPage />} />
          <Route path="*" element={
            <div className="workforce-overview">
              <h2>Workforce Planning Overview</h2>
              <div className="feature-grid">
                <div className="feature-item">
                  <h3>Identify Manpower Needs</h3>
                  <p>Analyze department requirements and identify staffing gaps</p>
                </div>
                <div className="feature-item">
                  <h3>Job Description Management</h3>
                  <p>Create comprehensive job descriptions within the system</p>
                </div>
                <div className="feature-item">
                  <h3>Requisition Workflow</h3>
                  <p>Multi-level approval workflow for recruitment requests</p>
                </div>
                <div className="feature-item">
                  <h3>Tracking & Visibility</h3>
                  <p>Unique requisition IDs and team visibility</p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}
