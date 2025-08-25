import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  Sidebar, 
  Menu, 
  MenuItem, 
  SubMenu
} from 'react-pro-sidebar'
import UsersIndex from '../pages/UsersIndex'
import UsersNew from '../pages/UsersNew'
import PayrollPage from './PayrollPage'
import PayrunPage from './PayrunPage'
import SettingsPage from './SettingsPage'
import WorkforcePlanningPage from './WorkforcePlanningPage'
import './styles.css'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = (path) => {
    navigate(path)
  }

  const isSettings = location.pathname.startsWith('/settings')

  return (
    <div className={`layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar 
        className="sidebar" 
        collapsed={collapsed}
        width="280px"
        collapsedWidth="80px"
      >
        <div className="sidebar-header">
          <h2>{collapsed ? 'HR' : 'HRMS'}</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>
        
        <Menu className="sidebar-menu">
          <MenuItem 
            onClick={() => handleMenuClick('/users')}
            className={location.pathname.startsWith('/users') ? 'active' : ''}
          >
            User Creation
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleMenuClick('/payroll')}
            className={location.pathname === '/payroll' ? 'active' : ''}
          >
            Payroll Allocation
          </MenuItem>
          
          <MenuItem 
            onClick={() => handleMenuClick('/payrun')}
            className={location.pathname === '/payrun' ? 'active' : ''}
          >
            Payrun
          </MenuItem>

          <SubMenu 
            label="Workforce Planning" 
            className={location.pathname.startsWith('/workforce') ? 'active' : ''}
          >
            <MenuItem 
              onClick={() => handleMenuClick('/workforce')}
              className={location.pathname === '/workforce' ? 'active' : ''}
            >
              Overview
            </MenuItem>
            <MenuItem 
              onClick={() => handleMenuClick('/workforce/jd-preparation')}
              className={location.pathname === '/workforce/jd-preparation' ? 'active' : ''}
            >
              JD Preparation
            </MenuItem>
            <MenuItem 
              onClick={() => handleMenuClick('/workforce/requisition-forms')}
              className={location.pathname === '/workforce/requisition-forms' ? 'active' : ''}
            >
              Requisition Forms
            </MenuItem>
          </SubMenu>
          
          <SubMenu 
            label="Settings" 
            className={isSettings ? 'active' : ''}
          >
            <MenuItem 
              onClick={() => handleMenuClick('/settings/masters')}
              className={location.pathname === '/settings/masters' ? 'active' : ''}
            >
              Masters
            </MenuItem>
            <MenuItem 
              onClick={() => handleMenuClick('/settings/configurations')}
              className={location.pathname === '/settings/configurations' ? 'active' : ''}
            >
              Configurations
            </MenuItem>
            <MenuItem 
              onClick={() => handleMenuClick('/settings/others')}
              className={location.pathname === '/settings/others' ? 'active' : ''}
            >
              Others
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <main className="content">
        <Routes>
          <Route path="/" element={<UsersIndex />} />
          <Route path="/users" element={<UsersIndex />} />
          <Route path="/users/new" element={<UsersNew />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/payrun" element={<PayrunPage />} />
          <Route path="/workforce" element={<WorkforcePlanningPage />} />
          <Route path="/workforce/*" element={<WorkforcePlanningPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/masters" element={<SettingsPage />} />
          <Route path="/settings/configurations" element={<SettingsPage />} />
          <Route path="/settings/others" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}
