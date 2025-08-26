import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Table from "../components/Table";
import Button from "../components/Button";
import "./styles.css";

const requisitionColumns = [
  { header: "Requisition ID", accessor: "requisitionId" },
  { header: "Position", accessor: "position" },
  { header: "Department", accessor: "department" },
  { header: "Priority", accessor: "priority" },
  { header: "Status", accessor: "status" },
];

const mockData = [
  {
    id: 1,
    requisitionId: "REQ-001",
    position: "Software Engineer",
    department: "Engineering",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    requisitionId: "REQ-002",
    position: "HR Manager",
    department: "HR",
    priority: "Medium",
    status: "Approved",
  },
];

export default function RequisitionFormsPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  if (type === "new") {
    const validationSchema = Yup.object({
      position: Yup.string().required("Position is required"),
      department: Yup.string().required("Department is required"),
      priority: Yup.string().required("Priority is required"),
    });

    const formik = useFormik({
      initialValues: {
        position: "",
        department: "",
        priority: "medium",
        description: "",
        requirements: "",
        budget: "",
        timeline: "",
        status: "draft",
      },
      validationSchema,
      onSubmit: (values) => {
        // TODO: Replace with API call
        console.log("Create Requisition:", values);
        navigate("/workforce/requisition-forms");
      },
    });

    return (
      <div className="requisition-forms">
        <div
          className="page-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>New Requisition Form</h2>
            <p>Create a new recruitment requisition</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate("/workforce/requisition-forms")}
          >
            Back
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="requisition-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">Position *</label>
                <input
                  id="position"
                  name="position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g., Senior Software Engineer"
                />
                {formik.touched.position && formik.errors.position && (
                  <div className="login-error">{formik.errors.position}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                </select>
                {formik.touched.department && formik.errors.department && (
                  <div className="login-error">{formik.errors.department}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="priority">Priority *</label>
                <select
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                {formik.touched.priority && formik.errors.priority && (
                  <div className="login-error">{formik.errors.priority}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="timeline">Timeline</label>
                <input
                  id="timeline"
                  name="timeline"
                  value={formik.values.timeline}
                  onChange={formik.handleChange}
                  placeholder="e.g., 30 days"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Job Details</h3>
            <div className="form-group">
              <label htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows="4"
                placeholder="Describe the role and responsibilities"
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formik.values.requirements}
                onChange={formik.handleChange}
                rows="3"
                placeholder="List key requirements and qualifications"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Budget & Approval</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="budget">Budget Range</label>
                <input
                  id="budget"
                  name="budget"
                  value={formik.values.budget}
                  onChange={formik.handleChange}
                  placeholder="e.g., ₹8,00,000 - ₹12,00,000"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/workforce/requisition-forms")}
            >
              Cancel
            </Button>
            <Button type="submit">Create Requisition</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="requisition-forms">
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Requisition Forms</h2>
          <p>List of recruitment requisitions</p>
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
          onClick={() => navigate("/workforce/requisition-forms/new")}
        >
          New
        </Button>
      </div>

      <Table
        columns={requisitionColumns}
        data={mockData}
        enableColumnPicker
        enableResize
        statusKey="status"
      />
    </div>
  );
}
