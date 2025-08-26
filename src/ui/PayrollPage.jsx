import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/usersSlice";
import { createAllocation, fetchAllocations } from "../store/slices/payrollSlice";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

export default function PayrollPage() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.list || { data: [] });

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
    if (!users?.data?.length) dispatch(fetchUsers());
  }, [dispatch, users?.data?.length]);

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
          <Dropdown
            label="Select user"
            name="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            data={(users?.data || []).map((u) => ({ name: `${u.firstName} ${u.lastName}`, value: u._id }))}
            displayName="name"
            displayValue="value"
            searchFields={["name"]}
            placeholder="Select user"
          />
        </div>
        {!!selectedUser && (
          <form className="row" onSubmit={submit} style={{ flexWrap: "wrap", gap: 12 }}>
            <Input type="number" name="ctc" label="CTC" placeholder="CTC" onChange={(e) => setForm({ ...form, ctc: Number(e.target.value) })} />
            <Input type="number" name="basic" label="Basic" placeholder="Basic" onChange={(e) => setForm({ ...form, basic: Number(e.target.value) })} />
            <Input type="number" name="hra" label="HRA" placeholder="HRA" onChange={(e) => setForm({ ...form, hra: Number(e.target.value) })} />
            <Input type="number" name="allowances" label="Allowances" placeholder="Allowances" onChange={(e) => setForm({ ...form, allowances: Number(e.target.value) })} />
            <Input type="number" name="deductions" label="Deductions" placeholder="Deductions" onChange={(e) => setForm({ ...form, deductions: Number(e.target.value) })} />
            <Input type="date" name="effectiveFrom" label="Effective From" onChange={(e) => setForm({ ...form, effectiveFrom: e.target.value })} />
            <button disabled={payroll.loading}>Save Allocation</button>
          </form>
        )}
      </div>

      {!!selectedUser && (
        <div className="card">
          <h3>Allocations</h3>
          {payroll.loading ? (
            <p>Loading allocations...</p>
          ) : allocations.length === 0 ? (
            <p>No allocations found for this user.</p>
          ) : (
            <Table
              columns={[
                { header: "Effective From", key: "effectiveFrom", render: (a) => new Date(a.effectiveFrom).toLocaleDateString() },
                { header: "CTC", accessor: "ctc" },
                { header: "Basic", accessor: "basic" },
                { header: "HRA", accessor: "hra" },
                { header: "Allowances", accessor: "allowances" },
                { header: "Deductions", accessor: "deductions" },
              ]}
              data={allocations}
            />
          )}
        </div>
      )}
    </div>
  );
}
