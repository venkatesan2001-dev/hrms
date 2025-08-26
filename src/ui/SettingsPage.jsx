import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "../components/Table";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, createRole } from "../store/slices/rolesSlice";
import { useLocation } from "react-router-dom";

export default function SettingsPage() {
  const location = useLocation();
  const path = location.pathname;
  const initialSection = path.includes("/settings/masters")
    ? "master"
    : path.includes("/settings/configurations")
    ? "configuration"
    : path.includes("/settings/others")
    ? "others"
    : "master";

  const [section, setSection] = useState(initialSection);
  const [masterTab, setMasterTab] = useState("departments");
  const [themeColor, setThemeColor] = useState('#10b981');

  useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);
  useEffect(() => {
    // fetch theme color
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/settings/theme`)
      .then((r) => r.json())
      .then((res) => {
        if (res && res.color) {
          setThemeColor(res.color);
          document.documentElement.style.setProperty('--sidebar-color', res.color);
        }
      })
      .catch(() => {});
  }, []);

  const saveTheme = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/settings/theme`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: themeColor })
    })
      .then((r) => r.json())
      .then((res) => {
        const color = res?.color || themeColor;
        document.documentElement.style.setProperty('--sidebar-color', color);
      })
      .catch(() => {});
  }

  const [departments, setDepartments] = useState([]);

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    description: "",
    status: "active",
  });

  const dispatch = useDispatch();
  const { items: roles, loading: rolesLoading } = useSelector((s) => s.roles);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  useEffect(() => {
    if (section === "master" && masterTab === "roles") {
      dispatch(fetchRoles({ page: 1, limit: 100 }));
    }
  }, [section, masterTab, dispatch]);

  const deptColumns = [
    { header: "Code", accessor: "code" },
    { header: "Department", accessor: "name" },
    { header: "Description", accessor: "description" },
    {
      header: "Status",
      key: "status",
      render: (d) => (
        <span
          className={`status-badge ${
            d.status === "active" ? "status-approved" : "status-draft"
          }`}
        >
          {d.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: () => (
        <button
          className="btn-secondary"
          style={{ fontSize: 12, padding: "4px 8px" }}
        >
          Edit
        </button>
      ),
    },
  ];

  const roleColumns = [
    { header: "Role", accessor: "name" },
    { header: "Description", accessor: "description" },
    {
      header: "Status",
      key: "isActive",
      render: (r) => (
        <span
          className={`status-badge ${
            r.isActive ? "status-approved" : "status-draft"
          }`}
        >
          {r.isActive ? "active" : "inactive"}
        </span>
      ),
    },
  ];

  const addDepartment = (e) => {
    e.preventDefault();
    if (!newDepartment.name || !newDepartment.code) return;
    setDepartments((prev) => [
      ...prev,
      { ...newDepartment, id: prev.length + 1 },
    ]);
    setNewDepartment({ name: "", code: "", description: "", status: "active" });
    setShowDeptModal(false);
  };

  const addRole = (e) => {
    e.preventDefault();
    if (!newRole.name) return;
    dispatch(createRole(newRole));
    setNewRole({ name: "", description: "" });
    setShowRoleModal(false);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage system configuration and master data</p>
      </div>

      <div className="settings-content">
        <div className="settings-main" style={{ width: "100%" }}>
          {section === "master" && (
            <div className="master-tabs">
              <div className="section-header" style={{ gap: 12 }}>
                <div
                  className="settings-master-tabs"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 4fr",
                    gap: 16,
                    width: "100%",
                  }}
                >
                  <div
                    className="settings-tabs-column"
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <button
                      className={`settings-nav-item ${
                        masterTab === "departments" ? "active" : ""
                      }`}
                      onClick={() => setMasterTab("departments")}
                    >
                      Departments
                    </button>
                    <button
                      className={`settings-nav-item ${
                        masterTab === "roles" ? "active" : ""
                      }`}
                      onClick={() => setMasterTab("roles")}
                    >
                      Roles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "configuration" && (
            <div className="general-settings">
              <h2>Configuration</h2>
              <p>System configuration options.</p>
            </div>
          )}

          {section === "others" && (
            <div className="security-settings">
              <h2>Others</h2>
              <p>Other settings.</p>
              <div className="card" style={{ marginTop: 16 }}>
                <h3>Theme</h3>
                <form onSubmit={saveTheme} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
                  <label>Sidebar color</label>
                  <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="submit" className="btn-primary">Save</button>
                    <button type="button" className="btn-secondary" onClick={() => document.documentElement.style.setProperty('--sidebar-color', themeColor)}>Preview</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="settings-table-column">
          {masterTab === "departments" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 12,
                }}
              >
                <Button onClick={() => setShowDeptModal(true)}>
                  New Department
                </Button>
              </div>
              <Table columns={deptColumns} data={departments} />
            </div>
          )}

          {masterTab === "roles" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 12,
                }}
              >
                <Button onClick={() => setShowRoleModal(true)}>New Role</Button>
              </div>
              <Table
                columns={roleColumns}
                data={roles}
                emptyText={rolesLoading ? "Loading..." : "No roles found"}
              />
            </div>
          )}
        </div>
      </div>

      {showDeptModal && (
        <div className="modal-backdrop" onClick={() => setShowDeptModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>New Department</h3>
            <form onSubmit={addDepartment}>
              <div className="form-row">
                <div className="form-group">
                  <label>Department Name *</label>
                  <input
                    value={newDepartment.name}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Code *</label>
                  <input
                    value={newDepartment.code}
                    onChange={(e) =>
                      setNewDepartment({
                        ...newDepartment,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newDepartment.description}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowDeptModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRoleModal && (
        <div className="modal-backdrop" onClick={() => setShowRoleModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>New Role</h3>
            <form onSubmit={addRole}>
              <div className="form-row">
                <div className="form-group">
                  <label>Role Name *</label>
                  <input
                    value={newRole.name}
                    onChange={(e) =>
                      setNewRole({
                        ...newRole,
                        name: e.target.value.toUpperCase(),
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowRoleModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
