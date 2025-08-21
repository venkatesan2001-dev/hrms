import { Routes, Route, NavLink } from 'react-router-dom'
import UsersPage from './UsersPage'
import PayrollPage from './PayrollPage'
import PayrunPage from './PayrunPage'
import SettingsPage from './SettingsPage'
import './styles.css'

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>HRMS</h2>
        <nav>
          <NavLink to="/users">User Creation</NavLink>
          <NavLink to="/payroll">Payroll Allocation</NavLink>
          <NavLink to="/payrun">Payrun</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/payrun" element={<PayrunPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}


