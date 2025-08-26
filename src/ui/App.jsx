import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import UsersIndex from "../pages/UsersIndex";
import UsersNew from "../pages/UsersNew";
import PayrollPage from "./PayrollPage";
import PayrunPage from "./PayrunPage";
import SettingsPage from "./SettingsPage";
import WorkforcePlanningPage from "./WorkforcePlanningPage";
import SourcingShortlistingPage from "./SourcingShortlistingPage";
import OfferPreJoiningPage from "./OfferPreJoiningPage";
import JoiningFormalitiesPage from "./JoiningFormalitiesPage";
import ProbationPage from "./ProbationPage";
import LoginPage from "./LoginPage";
import "./styles.css";

// MUI Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((s) => s.auth || {});

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const isSettings = location.pathname.startsWith("/settings");

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
    setShowUserMenu(false);
  };

  const handleAccountSettings = () => {
    // TODO: Navigate to account settings
    console.log("Account settings clicked");
    setShowUserMenu(false);
  };

  useEffect(() => {
    //if (!token && location.pathname !== "/login") {
    // navigate("/login", { replace: true });
    //}
    //if (token && location.pathname === "/login") {
    //  navigate("/users", { replace: true });
    //}
  }, [token, location.pathname, navigate]);

  // Render bare login page without app layout/grid
  if (location.pathname === "/login") {
    return <LoginPage />;
  }

  return (
    <div className={`layout ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        className="sidebar"
        collapsed={collapsed}
        width="280px"
        collapsedWidth="80px"
      >
        <div className="sidebar-header">
          <h2>{collapsed ? "" : "HRMS"}</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        <Menu className="sidebar-menu">
          <MenuItem
            onClick={() => handleMenuClick("/users")}
            className={location.pathname.startsWith("/users") ? "active" : ""}
          >
            <div className="sibar-mono-item">
              <PersonAddIcon className="menu-icon" />
              User Creation
            </div>
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuClick("/payroll")}
            className={location.pathname === "/payroll" ? "active" : ""}
          >
            <div className="sibar-mono-item">
              <AccountBalanceWalletIcon className="menu-icon" />
              Payroll Allocation
            </div>
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuClick("/payrun")}
            className={location.pathname === "/payrun" ? "active" : ""}
          >
            <div className="sibar-mono-item">
              <ReceiptIcon className="menu-icon" />
              Payrun
            </div>
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuClick("/sourcing")}
            className={
              location.pathname.startsWith("/sourcing") ? "active" : ""
            }
          >
            <div className="sibar-mono-item">
              <PeopleIcon className="menu-icon" />
              Sourcing & Shortlisting
            </div>
          </MenuItem>

          <SubMenu
            label={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <WorkIcon className="menu-icon" />
                Onboarding
              </div>
            }
            className={
              location.pathname.startsWith("/onboarding") ? "active" : ""
            }
          >
            <MenuItem
              onClick={() => handleMenuClick("/onboarding/offer")}
              className={
                location.pathname === "/onboarding/offer" ? "active" : ""
              }
            >
              <AssignmentIcon className="menu-icon" />
              Offer & Pre-Joining
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClick("/onboarding/joining")}
              className={
                location.pathname === "/onboarding/joining" ? "active" : ""
              }
            >
              <BusinessIcon className="menu-icon" />
              Joining Formalities
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClick("/onboarding/probation")}
              className={
                location.pathname === "/onboarding/probation" ? "active" : ""
              }
            >
              <AssignmentIcon className="menu-icon" />
              Probation & Confirmation
            </MenuItem>
          </SubMenu>

          <SubMenu
            label={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <WorkIcon className="menu-icon" />
                Workforce Planning
              </div>
            }
            className={
              location.pathname.startsWith("/workforce") ? "active" : ""
            }
          >
            <MenuItem
              onClick={() => handleMenuClick("/workforce/jd-preparation")}
              className={
                location.pathname.startsWith("/workforce/jd-preparation")
                  ? "active"
                  : ""
              }
            >
              <AssignmentIcon className="menu-icon" />
              JD Preparation
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClick("/workforce/requisition-forms")}
              className={
                location.pathname.startsWith("/workforce/requisition-forms")
                  ? "active"
                  : ""
              }
            >
              <AssignmentIcon className="menu-icon" />
              Requisition Forms
            </MenuItem>
          </SubMenu>

          <SubMenu
            label={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <SettingsIcon className="menu-icon" />
                Settings
              </div>
            }
            className={isSettings ? "active" : ""}
          >
            <MenuItem
              onClick={() => handleMenuClick("/settings/masters")}
              className={
                location.pathname === "/settings/masters" ? "active" : ""
              }
            >
              <TuneIcon className="menu-icon" />
              Masters
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClick("/settings/configurations")}
              className={
                location.pathname === "/settings/configurations" ? "active" : ""
              }
            >
              <TuneIcon className="menu-icon" />
              Configurations
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClick("/settings/others")}
              className={
                location.pathname === "/settings/others" ? "active" : ""
              }
            >
              <MoreHorizIcon className="menu-icon" />
              Others
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <main className="content">
        <header className="main-header">
          <div className="header-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <button className="search-button">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>

            <div className="header-actions">
              <div className="notifications">
                <button className="notification-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  <span className="notification-badge">4</span>
                </button>
              </div>

              <div className="user-profile">
                <button
                  className="user-profile-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="user-avatar">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <span className="user-name">Admin User</span>
                  <svg
                    className={`dropdown-arrow ${
                      showUserMenu ? "rotated" : ""
                    }`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={handleAccountSettings}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      Account Settings
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={token ? <UsersIndex /> : <Navigate to="/login" replace />}
          />
          <Route path="/users" element={<UsersIndex />} />
          <Route path="/users/new" element={<UsersNew />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/payrun" element={<PayrunPage />} />
          <Route path="/sourcing" element={<SourcingShortlistingPage />} />
          <Route path="/onboarding/offer" element={<OfferPreJoiningPage />} />
          <Route
            path="/onboarding/joining"
            element={<JoiningFormalitiesPage />}
          />
          <Route path="/onboarding/probation" element={<ProbationPage />} />
          <Route path="/workforce" element={<WorkforcePlanningPage />} />
          <Route path="/workforce/*" element={<WorkforcePlanningPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/masters" element={<SettingsPage />} />
          <Route path="/settings/configurations" element={<SettingsPage />} />
          <Route path="/settings/others" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
