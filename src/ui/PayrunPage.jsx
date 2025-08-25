import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayruns,
  generatePayrun,
  processPayrun,
} from "../store/slices/payrunSlice";

export default function PayrunPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.payrun);
  const [form, setForm] = useState({
    periodMonth: new Date().getMonth() + 1,
    periodYear: new Date().getFullYear(),
  });

  useEffect(() => {
    dispatch(fetchPayruns());
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      generatePayrun({
        periodMonth: Number(form.periodMonth),
        periodYear: Number(form.periodYear),
      })
    );
  };

  return (
    <div>
      <div className="card">
        <h3>Generate Payrun</h3>
        <form className="row" onSubmit={submit}>
          <input
            type="number"
            min="1"
            max="12"
            value={form.periodMonth}
            onChange={(e) => setForm({ ...form, periodMonth: e.target.value })}
          />
          <input
            type="number"
            min="2000"
            value={form.periodYear}
            onChange={(e) => setForm({ ...form, periodYear: e.target.value })}
          />
          <button disabled={loading}>Generate</button>
        </form>
      </div>

      <div className="card">
        <h3>Payruns</h3>
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Status</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.data.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.periodMonth}/{p.periodYear}
                </td>
                <td>{p.status}</td>
                <td>{p.items?.length || 0}</td>
                <td>
                  {p.status === "DRAFT" && (
                    <button
                      onClick={() => dispatch(processPayrun(p._id))}
                      disabled={loading}
                    >
                      Process
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
