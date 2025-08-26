import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../store/slices/usersSlice";
import { fetchRoles } from "../store/slices/rolesSlice";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";

export default function UsersNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: roles } = useSelector((s) => s.roles);
  const { loading } = useSelector((s) => s.users);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeCode: "",
    role: "ADMIN",
  });

  useEffect(() => {
    dispatch(fetchRoles({ page: 1, limit: 100 }));
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(createUser(form));
    navigate("/users");
  };

  return (
    <div className="card">
      <h3>New User</h3>
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
          data={roles.map((r) => ({ label: r.name, value: r.name }))}
          displayName="label"
          displayValue="value"
          searchFields={["label"]}
          placeholder="Select Role"
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-secondary"
            type="button"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
          <button className="btn-primary" disabled={loading} type="submit">
            Save User
          </button>
        </div>
      </form>
    </div>
  );
}
