import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { 
  fetchCandidates,
  uploadCandidate,
  updateCandidateStatus
} from "../store/slices/candidatesSlice";

export default function SourcingShortlistingPage() {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector((s) => s.candidates || {});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
  });

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

  return (
    <div>
      <div className="card">
        <h3>Sourcing & Shortlisting</h3>
        <form onSubmit={onSubmit} className="row" style={{ flexWrap: "wrap", gap: 12 }}>
          <input
            placeholder="Candidate name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="Position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,.rtf"
            onChange={(e) => setForm({ ...form, resume: e.target.files?.[0] || null })}
          />
          <Button disabled={loading}>Upload Candidate</Button>
        </form>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Candidates</h3>
        </div>
        <div className="enhanced-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 20, color: "#64748b" }}>
                    No candidates
                  </td>
                </tr>
              )}
              {items.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>
                  <td>{c.status}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'SHORTLISTED' } }))}>Shortlist</Button>
                      <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'TECH_PASS', technical: { status: 'PASS', date: new Date() } } }))}>Tech</Button>
                      <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'HR_PASS', hr: { status: 'PASS', date: new Date() } } }))}>HR</Button>
                      <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'ASSIGNMENT_PENDING', assignment: { status: 'PENDING' } } }))}>Assignment</Button>
                      <Button onClick={() => dispatch(updateCandidateStatus({ id: c._id, update: { status: 'REJECTED' } }))}>Reject</Button>
                      <Button onClick={() => {
                        const date = prompt('Enter Date of Joining (YYYY-MM-DD)')
                        if (date) dispatch(updateCandidateStatus({ id: c._id, update: { status: 'JOINED', dateOfJoining: date } }))
                      }}>DOJ</Button>
                    </div>
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


