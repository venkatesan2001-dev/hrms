import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Table from '../components/Table';
import Button from '../components/Button';
import './styles.css';

const jdColumns = [
  { header: 'Title', accessor: 'jobTitle' },
  { header: 'Department', accessor: 'department' },
  { header: 'Location', accessor: 'location' },
  { header: 'Type', accessor: 'employmentType' },
  { header: 'Status', accessor: 'status' }
];

const mockData = [
  { id: 1, jobTitle: 'Software Engineer', department: 'engineering', location: 'Chennai', employmentType: 'full-time', status: 'draft' },
  { id: 2, jobTitle: 'HR Executive', department: 'hr', location: 'Bangalore', employmentType: 'full-time', status: 'approved' }
];

export default function JDPreparationPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job Title is required'),
    department: Yup.string().required('Department is required'),
    employmentType: Yup.string().required('Employment Type is required')
  });

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: Replace with API call
      console.log('Create JD:', values);
      navigate('/workforce/jd-preparation');
    }
  });

  if (type === 'new') {
    return (
      <div className="jd-preparation">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>New Job Description</h2>
            <p>Create a new job description</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/workforce/jd-preparation')}>Back</Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="jd-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title *</label>
                <input id="jobTitle" name="jobTitle" value={formik.values.jobTitle} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="e.g., Senior Software Engineer" />
                {formik.touched.jobTitle && formik.errors.jobTitle && (<div className="login-error">{formik.errors.jobTitle}</div>)}
              </div>
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select id="department" name="department" value={formik.values.department} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                </select>
                {formik.touched.department && formik.errors.department && (<div className="login-error">{formik.errors.department}</div>)}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input id="location" name="location" value={formik.values.location} onChange={formik.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="employmentType">Employment Type</label>
                <select id="employmentType" name="employmentType" value={formik.values.employmentType} onChange={formik.handleChange}>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
                {formik.touched.employmentType && formik.errors.employmentType && (<div className="login-error">{formik.errors.employmentType}</div>)}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Requirements & Qualifications</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experienceLevel">Experience Level</label>
                <select id="experienceLevel" name="experienceLevel" value={formik.values.experienceLevel} onChange={formik.handleChange}>
                  <option value="">Select Experience</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6-10 years)</option>
                  <option value="lead">Lead/Manager (10+ years)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="education">Education</label>
                <input id="education" name="education" value={formik.values.education} onChange={formik.handleChange} placeholder="e.g., Bachelor's in Computer Science" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">Required Skills</label>
              <textarea id="skills" name="skills" value={formik.values.skills} onChange={formik.handleChange} rows="3" placeholder="List key skills and technologies required for this position" />
            </div>
          </div>

          <div className="form-section">
            <h3>Job Details</h3>
            <div className="form-group">
              <label htmlFor="responsibilities">Key Responsibilities</label>
              <textarea id="responsibilities" name="responsibilities" value={formik.values.responsibilities} onChange={formik.handleChange} rows="4" placeholder="Describe the main responsibilities and duties for this role" />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Additional Requirements</label>
              <textarea id="requirements" name="requirements" value={formik.values.requirements} onChange={formik.handleChange} rows="3" placeholder="Any additional requirements or qualifications" />
            </div>
          </div>

          <div className="form-section">
            <h3>Compensation & Benefits</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="salaryRange">Salary Range</label>
                <input id="salaryRange" name="salaryRange" value={formik.values.salaryRange} onChange={formik.handleChange} placeholder="e.g., ₹8,00,000 - ₹12,00,000" />
              </div>
              <div className="form-group">
                <label htmlFor="benefits">Benefits</label>
                <input id="benefits" name="benefits" value={formik.values.benefits} onChange={formik.handleChange} placeholder="e.g., Health, Dental, PF" />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => navigate('/workforce/jd-preparation')}>Cancel</Button>
            <Button type="submit">Create Job Description</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="jd-preparation">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Job Description Preparation</h2>
          <p>List of job descriptions</p>
        </div>
        <Button 
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
          className='btn-primary-with-icon'
          onClick={() => navigate('/workforce/jd-preparation/new')}
        >
          New
        </Button>
      </div>

      <Table columns={jdColumns} data={mockData} />
    </div>
  );
}
