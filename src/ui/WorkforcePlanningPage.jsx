import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import JDPreparationPage from './JDPreparationPage';
import RequisitionFormsPage from './RequisitionFormsPage';
import './styles.css';

export default function WorkforcePlanningPage() {
  const location = useLocation();
  const hideCards = location.pathname.startsWith('/workforce/jd-preparation') || location.pathname.startsWith('/workforce/requisition-forms');
  return (
    <div className="workforce-planning">
      <div className="workforce-header">
        <h1>Workforce Planning</h1>
        <p>Manage workforce requirements, job descriptions, and recruitment processes</p>
      </div>
      
      {!hideCards && (
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
      )}

      <div className="workforce-content">
        <Routes>
          <Route path="jd-preparation" element={<JDPreparationPage />} />
          <Route path="jd-preparation/:type" element={<JDPreparationPage />} />
          <Route path="requisition-forms" element={<RequisitionFormsPage />} />
          <Route path="requisition-forms/:type" element={<RequisitionFormsPage />} />
        </Routes>
      </div>
    </div>
  );
}
