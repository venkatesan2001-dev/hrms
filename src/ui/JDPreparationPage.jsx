import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Table from "../components/Table";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import "./styles.css";

const jdColumns = [
  { header: "Title", accessor: "jobTitle" },
  { header: "Department", accessor: "department" },
  { header: "Location", accessor: "location" },
  { header: "Type", accessor: "employmentType" },
  { header: "Status", accessor: "status" },
];

const mockData = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    department: "engineering",
    location: "Chennai",
    employmentType: "full-time",
    status: "draft",
  },
  {
    id: 2,
    jobTitle: "HR Executive",
    department: "hr",
    location: "Bangalore",
    employmentType: "full-time",
    status: "approved",
  },
];

export default function JDPreparationPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Job Title is required"),
    department: Yup.string().required("Department is required"),
    employmentType: Yup.string().required("Employment Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      department: "",
      location: "",
      employmentType: "full-time",
      experienceLevel: "",
      education: "",
      skills: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
      salaryRange: "",
      status: "draft",
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: Replace with API call
      console.log("Create JD:", values);
      navigate("/workforce/jd-preparation");
    },
  });

  if (type === "new") {
    return (
      <div className="jd-preparation">
        <div
          className="page-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>New Job Description</h2>
            <p>Create a new job description</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate("/workforce/jd-preparation")}
          >
            Back
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="jd-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <Input
                label="Job Title *"
                name="jobTitle"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., Senior Software Engineer"
                error={formik.touched.jobTitle && formik.errors.jobTitle}
              />
              <div className="form-group">
                <Dropdown
                  label="Department *"
                  name="department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  data={[
                    { value: "engineering", label: "Engineering" },
                    { value: "marketing", label: "Marketing" },
                    { value: "sales", label: "Sales" },
                    { value: "hr", label: "Human Resources" },
                    { value: "finance", label: "Finance" },
                    { value: "operations", label: "Operations" },
                  ]}
                  error={formik.touched.department && formik.errors.department}
                />
              </div>
            </div>

            <div className="form-row">
              <Input
                label="Location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
              <div className="form-group">
                <Dropdown
                  label="Employment Type"
                  name="employmentType"
                  value={formik.values.employmentType}
                  onChange={formik.handleChange}
                  options={[
                    { value: "full-time", label: "Full-time" },
                    { value: "part-time", label: "Part-time" },
                    { value: "contract", label: "Contract" },
                    { value: "internship", label: "Internship" },
                  ]}
                  error={
                    formik.touched.employmentType &&
                    formik.errors.employmentType
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Requirements & Qualifications</h3>
            <div className="form-row">
              <Dropdown
                label="Experience Level"
                name="experienceLevel"
                value={formik.values.experienceLevel}
                onChange={formik.handleChange}
                options={[
                  { value: "", label: "Select Experience" },
                  { value: "entry", label: "Entry Level (0-2 years)" },
                  { value: "mid", label: "Mid Level (3-5 years)" },
                  { value: "senior", label: "Senior Level (6-10 years)" },
                  { value: "lead", label: "Lead/Manager (10+ years)" },
                ]}
              />
              <Input
                label="Education"
                name="education"
                value={formik.values.education}
                onChange={formik.handleChange}
                placeholder="e.g., Bachelor's in Computer Science"
              />
            </div>

            <Input
              as="textarea"
              rows={3}
              label="Required Skills"
              name="skills"
              value={formik.values.skills}
              onChange={formik.handleChange}
              placeholder="List key skills and technologies required for this position"
            />
          </div>

          <div className="form-section">
            <h3>Job Details</h3>
            <Input
              as="textarea"
              rows={4}
              label="Key Responsibilities"
              name="responsibilities"
              value={formik.values.responsibilities}
              onChange={formik.handleChange}
              placeholder="Describe the main responsibilities and duties for this role"
            />

            <Input
              as="textarea"
              rows={3}
              label="Additional Requirements"
              name="requirements"
              value={formik.values.requirements}
              onChange={formik.handleChange}
              placeholder="Any additional requirements or qualifications"
            />
          </div>

          <div className="form-section">
            <h3>Compensation & Benefits</h3>
            <div className="form-row">
              <Input
                label="Salary Range"
                name="salaryRange"
                value={formik.values.salaryRange}
                onChange={formik.handleChange}
                placeholder="e.g., ₹8,00,000 - ₹12,00,000"
              />
              <Input
                label="Benefits"
                name="benefits"
                value={formik.values.benefits}
                onChange={formik.handleChange}
                placeholder="e.g., Health, Dental, PF"
              />
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/workforce/jd-preparation")}
            >
              Cancel
            </Button>
            <Button type="submit">Create Job Description</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="jd-preparation">
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Job Description Preparation</h2>
          <p>List of job descriptions</p>
        </div>
        <Button
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
          className="btn-primary-with-icon"
          onClick={() => navigate("/workforce/jd-preparation/new")}
        >
          New
        </Button>
      </div>

      <Table columns={jdColumns} data={mockData} />
    </div>
  );
}
