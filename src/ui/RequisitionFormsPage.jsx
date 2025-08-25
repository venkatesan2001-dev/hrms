import React, { useState } from 'react';
import './styles.css';

export default function RequisitionFormsPage() {
  const [requisitionForm, setRequisitionForm] = useState({
    requisitionId: '',
    jobTitle: '',
    department: '',
    numberOfPositions: 1,
    urgency: 'normal',
    budget: '',
    justification: '',
    requirements: '',
    preferredStartDate: '',
    status: 'draft',
    approvers: []
  });

  const [requisitions, setRequisitions] = useState([
    {
      id: 'REQ-2024-001',
      jobTitle: 'Senior Software Engineer',
      department: 'Engineering',
      positions: 2,
      status: 'pending',
      createdDate: '2024-01-15',
      urgency: 'high'
    },
    {
      id: 'REQ-2024-002',
      jobTitle: 'Marketing Manager',
      department: 'Marketing',
      positions: 1,
      status: 'approved',
      createdDate: '2024-01-10',
      urgency: 'normal'
    }
  ]);

  const generateRequisitionId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REQ-${year}-${randomNum}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequisitionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequisition = {
      ...requisitionForm,
      id: requisitionForm.requisitionId || generateRequisitionId(),
      createdDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setRequisitions(prev => [newRequisition, ...prev]);
    setRequisitionForm({
      requisitionId: '',
      jobTitle: '',
      department: '',
      numberOfPositions: 1,
      urgency: 'normal',
      budget: '',
      justification: '',
      requirements: '',
      preferredStartDate: '',
      status: 'draft',
      approvers: []
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      case 'draft': return 'status-draft';
      default: return '';
    }
  };

  return (
    <div className="requisition-forms">
      <div className="page-header">
        <h2>Requisition Forms</h2>
        <p>Create and manage recruitment requisitions with multi-level approval workflow</p>
      </div>

      <div className="requisition-content">
        <div className="requisition-form-section">
          <h3>Create New Requisition</h3>
          <form onSubmit={handleSubmit} className="requisition-form">
            <div className="form-section">
              <h4>Basic Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="requisitionId">Requisition ID</label>
                  <input
                    type="text"
                    id="requisitionId"
                    name="requisitionId"
                    value={requisitionForm.requisitionId}
                    onChange={handleInputChange}
                    placeholder="Auto-generated if left empty"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title *</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={requisitionForm.jobTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <select
                    id="department"
                    name="department"
                    value={requisitionForm.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="hr">Human Resources</option>
                    <option value="finance">Finance</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="numberOfPositions">Number of Positions *</label>
                  <input
                    type="number"
                    id="numberOfPositions"
                    name="numberOfPositions"
                    value={requisitionForm.numberOfPositions}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="urgency">Urgency Level</label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={requisitionForm.urgency}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="preferredStartDate">Preferred Start Date</label>
                  <input
                    type="date"
                    id="preferredStartDate"
                    name="preferredStartDate"
                    value={requisitionForm.preferredStartDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Justification & Requirements</h4>
              <div className="form-group">
                <label htmlFor="justification">Business Justification *</label>
                <textarea
                  id="justification"
                  name="justification"
                  value={requisitionForm.justification}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  placeholder="Explain why this position is needed and the business impact"
                />
              </div>

              <div className="form-group">
                <label htmlFor="requirements">Position Requirements</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={requisitionForm.requirements}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Key requirements and qualifications for the position"
                />
              </div>

              <div className="form-group">
                <label htmlFor="budget">Budget Range</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={requisitionForm.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary">
                Save as Draft
              </button>
              <button type="submit" className="btn-primary">
                Submit Requisition
              </button>
            </div>
          </form>
        </div>

        <div className="requisition-list-section">
          <h3>Requisition History</h3>
          <div className="enhanced-table">
            <table>
              <thead>
                <tr>
                  <th>Requisition ID</th>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Positions</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Urgency</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.map((req) => (
                  <tr key={req.id}>
                    <td className="requisition-id">{req.id}</td>
                    <td>{req.jobTitle}</td>
                    <td>{req.department}</td>
                    <td>{req.positions}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>{req.createdDate}</td>
                    <td>
                      <span className={`urgency-badge urgency-${req.urgency}`}>
                        {req.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
