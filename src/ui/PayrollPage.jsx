import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/usersSlice";
import {
  createAllocation,
  fetchAllocations,
} from "../store/slices/payrollSlice";

export default function PayrollPage() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.list);

  console.log(users, "USERS");
  const payroll = useSelector((s) => s.payroll);
  const [selectedUser, setSelectedUser] = useState("");
  const [form, setForm] = useState({
    ctc: 0,
    basic: 0,
    hra: 0,
    allowances: 0,
    deductions: 0,
    effectiveFrom: "",
  });

  useEffect(() => {
    if (!users.length) dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) dispatch(fetchAllocations(selectedUser));
  }, [selectedUser]);

  const allocations = useMemo(
    () => payroll.byUser[selectedUser] || [],
    [payroll, selectedUser]
  );

  const submit = (e) => {
    e.preventDefault();
    dispatch(createAllocation({ ...form, user: selectedUser }));
  };

  return (
    <div>
      <div className="card">
        <h3>Allocate Payroll</h3>
        <div className="row" style={{ marginBottom: 12 }}>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select user</option>
            {users?.data?.map((u) => (
              <option key={u._id} value={u._id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
          </select>
        </div>
        {!!selectedUser && (
          <form
            className="row"
            onSubmit={submit}
            style={{ flexWrap: "wrap", gap: 12 }}
          >
            <input
              type="number"
              placeholder="CTC"
              onChange={(e) =>
                setForm({ ...form, ctc: Number(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="Basic"
              onChange={(e) =>
                setForm({ ...form, basic: Number(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="HRA"
              onChange={(e) =>
                setForm({ ...form, hra: Number(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="Allowances"
              onChange={(e) =>
                setForm({ ...form, allowances: Number(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="Deductions"
              onChange={(e) =>
                setForm({ ...form, deductions: Number(e.target.value) })
              }
            />
            <input
              type="date"
              onChange={(e) =>
                setForm({ ...form, effectiveFrom: e.target.value })
              }
            />
            <button disabled={payroll.loading}>Save Allocation</button>
          </form>
        )}
      </div>

      {!!selectedUser && (
        <div className="card">
          <h3>Allocations</h3>
          <table>
            <thead>
              <tr>
                <th>Effective From</th>
                <th>CTC</th>
                <th>Basic</th>
                <th>HRA</th>
                <th>Allowances</th>
                <th>Deductions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((a) => (
                <tr key={a._id}>
                  <td>{new Date(a.effectiveFrom).toLocaleDateString()}</td>
                  <td>{a.ctc}</td>
                  <td>{a.basic}</td>
                  <td>{a.hra}</td>
                  <td>{a.allowances}</td>
                  <td>{a.deductions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
