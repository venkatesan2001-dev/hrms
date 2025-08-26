import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { createUser, deleteUser, fetchUsers } from "../store/slices/usersSlice";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { items, pagination, loading } = useSelector((s) => s.users);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeCode: "",
    role: "EMPLOYEE",
  });

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(createUser(form));
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      employeeCode: "",
      role: "EMPLOYEE",
    });
  };

  const users = items || [];
  const total = pagination?.totalDocs || 0;

  return (
    <div>
      <div className="card">
        <h3>Create User</h3>
        <form onSubmit={submit} className="row" style={{ flexWrap: "wrap", gap: 12 }}>
          <Input label="First name" name="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
          <Input label="Last name" name="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          <Input type="email" label="Email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Employee Code" name="employeeCode" value={form.employeeCode} onChange={(e) => setForm({ ...form, employeeCode: e.target.value })} required />
          <Dropdown
            label="Role"
            name="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            data={[{ label: 'EMPLOYEE', value: 'EMPLOYEE' }, { label: 'MANAGER', value: 'MANAGER' }, { label: 'ADMIN', value: 'ADMIN' }]}
            displayName="label"
            displayValue="value"
            searchFields={["label"]}
            placeholder="Select role"
          />
          <Button disabled={loading}>Create</Button>
        </form>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Users</h3>
          <div className="pagination-info">Total records: {total}</div>
        </div>
        <div className="enhanced-table">
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
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 20, color: '#64748b' }}>
                    No records found
                  </td>
                </tr>
              )}
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    {u.firstName} {u.lastName}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.employeeCode}</td>
                  <td>{u.role}</td>
                  <td>
                    <Button
                      onClick={() => dispatch(deleteUser(u._id))}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
