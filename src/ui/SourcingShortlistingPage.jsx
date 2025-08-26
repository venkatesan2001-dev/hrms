import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import { fetchCandidates, uploadCandidate, updateCandidateStatus } from "../store/slices/candidatesSlice";

export default function SourcingShortlistingPage() {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector((s) => s.candidates || {});

  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", resume: null });

  useEffect(() => {
    dispatch(fetchCandidates({ page: 1, limit: 10 }))
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (form.resume instanceof File) payload.resume = form.resume;
    dispatch(uploadCandidate(payload));
    setForm({ name: "", email: "", phone: "", position: "", resume: null });
  };

  const positionOptions = useMemo(() => {
    const base = ["Software Engineer", "HR Executive", "Product Manager", "QA Engineer", "Designer"]; // fallback
    const dynamic = Array.from(new Set((items || []).map(i => i.position).filter(Boolean)));
    return (dynamic.length ? dynamic : base).map(p => ({ label: p, value: p }));
  }, [items]);

  return (
    <div>
      <div className="card">
        <h3>Sourcing & Shortlisting</h3>
        <form onSubmit={onSubmit} className="row" style={{ flexWrap: "wrap", gap: 12 }}>
          <Input label="Candidate name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input type="email" label="Email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Phone" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Dropdown
            label="Position"
            name="position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            data={positionOptions}
            displayName="label"
            displayValue="value"
            searchFields={["label"]}
            placeholder="Select position"
          />
          <Input type="file" label="Resume" accept=".pdf,.doc,.docx,.rtf" onChange={(e) => setForm({ ...form, resume: e.target.files?.[0] || null })} />
          <Button disabled={loading}>Upload Candidate</Button>
        </form>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Candidates</h3>
        </div>
        <Table
          enableColumnPicker
          enableResize
          statusKey="status"
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone", accessor: "phone" },
            { header: "Position", accessor: "position" },
            { header: "Status", accessor: "status", status: true },
            { header: "Actions", key: "actions", render: (c) => (
              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'SHORTLISTED' } }))}>Shortlist</Button>
                <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'TECH_PASS', technical: { status: 'PASS', date: new Date() } } }))}>Tech</Button>
                <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'HR_PASS', hr: { status: 'PASS', date: new Date() } } }))}>HR</Button>
                <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'ASSIGNMENT_PENDING', assignment: { status: 'PENDING' } } }))}>Assignment</Button>
                <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'REJECTED' } }))}>Reject</Button>
                <Button onClick={() => { const date = prompt('Enter Date of Joining (YYYY-MM-DD)'); if (date) dispatch(updateCandidateStatus({ id: c._id, update: { status: 'JOINED', dateOfJoining: date } })) }}>DOJ</Button>
              </div>
            ) },
          ]}
          data={items}
        />
      </div>
    </div>
  );
}


