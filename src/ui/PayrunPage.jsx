import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Table from "../components/Table";
import {
  fetchPayruns,
  generatePayrun,
  processPayrun,
} from "../store/slices/payrunSlice";

export default function PayrunPage() {
  const dispatch = useDispatch();
  const { list = { data: [] }, loading } = useSelector((s) => s.payrun);
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
          <Input type="number" name="periodMonth" label="Month" min="1" max="12" value={form.periodMonth} onChange={(e) => setForm({ ...form, periodMonth: e.target.value })} />
          <Input type="number" name="periodYear" label="Year" min="2000" value={form.periodYear} onChange={(e) => setForm({ ...form, periodYear: e.target.value })} />
          <button disabled={loading}>Generate</button>
        </form>
      </div>

      <div className="card">
        <h3>Payruns</h3>
        {loading ? (
          <p>Loading payruns...</p>
        ) : (list?.data || []).length === 0 ? (
          <p>No payruns found.</p>
        ) : (
          <Table
            columns={[
              { header: "Period", key: "period", render: (p) => `${p.periodMonth}/${p.periodYear}` },
              { header: "Status", accessor: "status" },
              { header: "Items", render: (p) => p.items?.length || 0 },
              { header: "Action", render: (p) => (
                p.status === "DRAFT" ? (
                  <button onClick={() => dispatch(processPayrun(p._id))} disabled={loading}>Process</button>
                ) : null
              )},
            ]}
            data={(list?.data || [])}
          />
        )}
      </div>
    </div>
  );
}
