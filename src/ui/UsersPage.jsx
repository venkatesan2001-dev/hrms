import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, deleteUser, fetchUsers } from '../store/slices/usersSlice'

export default function UsersPage() {
  const dispatch = useDispatch()
  const { list, loading } = useSelector(s => s.users)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', employeeCode: '', role: 'EMPLOYEE' })

  useEffect(() => { dispatch(fetchUsers()) }, [dispatch])

  const submit = (e) => {
    e.preventDefault()
    dispatch(createUser(form))
    setForm({ firstName: '', lastName: '', email: '', employeeCode: '', role: 'EMPLOYEE' })
  }

  return (
    <div>
      <div className="card">
        <h3>Create User</h3>
        <form onSubmit={submit} className="row" style={{ flexWrap: 'wrap', gap: 12 }}>
          <input placeholder="First name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
          <input placeholder="Last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Employee Code" value={form.employeeCode} onChange={e => setForm({ ...form, employeeCode: e.target.value })} required />
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button disabled={loading}>Create</button>
        </form>
      </div>

      <div className="card">
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Code</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(u => (
              <tr key={u._id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.employeeCode}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => dispatch(deleteUser(u._id))} disabled={loading}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


