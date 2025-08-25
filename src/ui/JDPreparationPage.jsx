import React, { useState } from 'react';
import './styles.css';

export default function JDPreparationPage() {
  const [jdForm, setJdForm] = useState({
    jobTitle: '',
    department: '',
    location: '',
    employmentType: 'full-time',
    experienceLevel: '',
    education: '',
    skills: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    salaryRange: '',
    status: 'draft'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJdForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('JD Form submitted:', jdForm);
    // TODO: Add API call to save JD
  };

  return (
    <div className="jd-preparation">
      <div className="page-header">
        <h2>Job Description Preparation</h2>
        <p>Create comprehensive job descriptions for workforce planning</p>
      </div>

      <form onSubmit={handleSubmit} className="jd-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title *</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={jdForm.jobTitle}
                onChange={handleInputChange}
                required
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={jdForm.department}
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={jdForm.location}
                onChange={handleInputChange}
                placeholder="e.g., New York, NY"
              />
            </div>
            <div className="form-group">
              <label htmlFor="employmentType">Employment Type</label>
              <select
                id="employmentType"
                name="employmentType"
                value={jdForm.employmentType}
                onChange={handleInputChange}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Requirements & Qualifications</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experienceLevel">Experience Level</label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={jdForm.experienceLevel}
                onChange={handleInputChange}
              >
                <option value="">Select Experience</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6-10 years)</option>
                <option value="lead">Lead/Manager (10+ years)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="education">Education</label>
              <input
                type="text"
                id="education"
                name="education"
                value={jdForm.education}
                onChange={handleInputChange}
                placeholder="e.g., Bachelor's in Computer Science"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="skills">Required Skills</label>
            <textarea
              id="skills"
              name="skills"
              value={jdForm.skills}
              onChange={handleInputChange}
              rows="3"
              placeholder="List key skills and technologies required for this position"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Job Details</h3>
          <div className="form-group">
            <label htmlFor="responsibilities">Key Responsibilities</label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={jdForm.responsibilities}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe the main responsibilities and duties for this role"
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Additional Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              value={jdForm.requirements}
              onChange={handleInputChange}
              rows="3"
              placeholder="Any additional requirements or qualifications"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Compensation & Benefits</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salaryRange">Salary Range</label>
              <input
                type="text"
                id="salaryRange"
                name="salaryRange"
                value={jdForm.salaryRange}
                onChange={handleInputChange}
                placeholder="e.g., $80,000 - $120,000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="benefits">Benefits</label>
              <input
                type="text"
                id="benefits"
                name="benefits"
                value={jdForm.benefits}
                onChange={handleInputChange}
                placeholder="e.g., Health, Dental, 401k"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">
            Save as Draft
          </button>
          <button type="submit" className="btn-primary">
            Create Job Description
          </button>
        </div>
      </form>
    </div>
  );
}
