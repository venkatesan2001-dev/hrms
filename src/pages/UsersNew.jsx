import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../store/slices/usersSlice'
import { fetchRoles } from '../store/slices/rolesSlice'

export default function UsersNew() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: roles } = useSelector(s => s.roles)
  const { loading } = useSelector(s => s.users)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeCode: '',
    role: ''
  })

  useEffect(() => {
    dispatch(fetchRoles({ page: 1, limit: 100 }))
  }, [dispatch])

  const submit = (e) => {
    e.preventDefault()
    dispatch(createUser(form))
    navigate('/users')
  }

  return (
    <div className="card">
      <h3>New User</h3>
      <form onSubmit={submit} className="row" style={{ flexWrap: 'wrap', gap: 12 }}>
        <input placeholder="First name" value={form.firstName} onChange={(e)=>setForm({...form, firstName: e.target.value})} required />
        <input placeholder="Last name" value={form.lastName} onChange={(e)=>setForm({...form, lastName: e.target.value})} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required />
        <input placeholder="Employee Code" value={form.employeeCode} onChange={(e)=>setForm({...form, employeeCode: e.target.value})} required />
        <select value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})} required>
          <option value="">Select Role</option>
          {roles.map(r => (
            <option key={r._id} value={r.name}>{r.name}</option>
          ))}
        </select>
        <div style={{ display:'flex', gap: 8 }}>
          <button className="btn-secondary" type="button" onClick={()=>navigate('/users')}>Cancel</button>
          <button className="btn-primary" disabled={loading} type="submit">Save User</button>
        </div>
      </form>
    </div>
  )
}


