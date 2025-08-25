import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, fetchUsers } from "../store/slices/usersSlice";
import Table from "../components/Table";

export default function UsersIndex() {
  const dispatch = useDispatch();
  const { items, pagination, loading } = useSelector((s) => s.users);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  console.log(import.meta.env.VITE_API_BASE_URL, "ENV");

  const columns = [
    {
      header: "Name",
      key: "name",
      render: (u) => `${u.firstName} ${u.lastName}`,
    },
    { header: "Email", accessor: "email" },
    { header: "Code", accessor: "employeeCode" },
    { header: "Role", accessor: "role" },
    {
      header: "",
      key: "actions",
      render: (u) => (
        <button
          onClick={() => dispatch(deleteUser(u._id))}
          disabled={loading}
          style={{ background: "#ef4444", color: "#fff" }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Users</h3>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="pagination-info">
            Total records: {pagination?.totalDocs || 0}
          </div>
          <Link to="/users/new">
            <button className="btn-primary">New User</button>
          </Link>
        </div>
      </div>

      <Table columns={columns} data={items || []} />
    </div>
  );
}
