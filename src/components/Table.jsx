import React, { useMemo, useState, useRef } from "react";

export default function Table({
  columns = [],
  data = [],
  emptyText = "No records found",
  page = 1,
  perPage = 10,
  total = 0,
  onPageChange,
  onPerPageChange,
  enableColumnPicker = false,
  enableResize = false,
  statusKey,
  size = "medium", // 'small' | 'medium'
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState(() =>
    columns.map((c) => c.key || c.accessor || c.header)
  );
  const allKeys = useMemo(
    () => columns.map((c) => c.key || c.accessor || c.header),
    [columns]
  );
  const visibleColumns = useMemo(
    () =>
      columns.filter((c) =>
        visibleKeys.includes(c.key || c.accessor || c.header)
      ),
    [columns, visibleKeys]
  );
  const [colWidths, setColWidths] = useState({});
  const resizeStateRef = useRef({
    active: false,
    key: null,
    startX: 0,
    startW: 0,
  });
  const [hoveredKey, setHoveredKey] = useState(null);
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const startResize = (e, key) => {
    if (!enableResize) return;
    const th = e.currentTarget.parentElement;
    const rect = th.getBoundingClientRect();
    resizeStateRef.current = {
      active: true,
      key,
      startX: e.clientX,
      startW: rect.width,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopResize);
  };

  const onMouseMove = (e) => {
    const st = resizeStateRef.current;
    if (!st.active || !st.key) return;
    const delta = e.clientX - st.startX;
    const newW = Math.max(60, st.startW + delta);
    setColWidths((w) => ({ ...w, [st.key]: newW }));
  };

  const stopResize = () => {
    resizeStateRef.current = { active: false, key: null, startX: 0, startW: 0 };
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopResize);
  };

  const renderStatus = (value) => {
    const v = String(value ?? "").toLowerCase();
    const cls =
      v === "approved"
        ? "status-approved"
        : v === "pending"
        ? "status-pending"
        : v === "rejected"
        ? "status-rejected"
        : v === "draft"
        ? "status-draft"
        : v === "open"
        ? "status-pending"
        : "";
    return <span className={`status-badge ${cls}`}>{String(value ?? "")}</span>;
  };

  const renderCell = (col, row) => {
    if (typeof col.render === "function") return col.render(row);
    const val = row[col.accessor];
    if (
      col.status ||
      (statusKey && (col.key === statusKey || col.accessor === statusKey))
    ) {
      return renderStatus(val);
    }
    return val;
  };
  const sortedData = useMemo(() => {
    if (!sort.key) return data;
    const col = columns.find(
      (c) => (c.key || c.accessor || c.header) === sort.key
    );
    const acc = col?.accessor;
    if (!acc) return data;
    const copy = [...(data || [])];
    copy.sort((a, b) => {
      const av = a[acc];
      const bv = b[acc];
      if (av == null && bv == null) return 0;
      if (av == null) return sort.dir === "asc" ? -1 : 1;
      if (bv == null) return sort.dir === "asc" ? 1 : -1;
      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as < bs) return sort.dir === "asc" ? -1 : 1;
      if (as > bs) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sort, columns]);

  const cellPadding = size === "small" ? 10 : 16;
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total || data.length);
  return (
    <div className="enhanced-table">
      {(enableColumnPicker || enableResize) && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: 8,
          }}
        >
          {enableResize && (
            <button className="btn-secondary" onClick={() => setColWidths({})}>
              Reset widths
            </button>
          )}
          {enableColumnPicker && (
            <div style={{ position: "relative" }}>
              <button
                className="btn-secondary"
                onClick={() => setPickerOpen((s) => !s)}
              >
                Columns
              </button>
              {pickerOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: 8,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                    padding: 8,
                    zIndex: 10,
                    minWidth: 220,
                    maxHeight: 260,
                    overflow: "auto",
                  }}
                >
                  {columns.map((col) => {
                    const key = col.key || col.accessor || col.header;
                    const selected = visibleKeys.includes(key);
                    return (
                      <div
                        key={key}
                        onClick={() =>
                          setVisibleKeys((v) =>
                            v.includes(key)
                              ? v.filter((k) => k !== key)
                              : [...v, key]
                          )
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          padding: "6px 8px",
                          background: selected ? "#ecfeff" : "#fff",
                          color: selected ? "#0e7490" : "#111827",
                        }}
                      >
                        <span>{col.header}</span>
                        {selected && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th
              style={{
                background:
                  "linear-gradient(180deg, var(--table-header-bg, #f9fafb), #f3f4f6)",
                color: "#111827",
                position: "relative",
              }}
            >
              S.no
            </th>
            {visibleColumns.map((col) => {
              const key = col.key || col.accessor || col.header;
              const width = colWidths[key] ? { width: colWidths[key] } : {};
              return (
                <th
                  key={key}
                  style={{
                    background:
                      "linear-gradient(180deg, var(--table-header-bg, #f9fafb), #f3f4f6)",
                    color: "#111827",
                    position: "relative",
                    ...width,
                  }}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  <span
                    onClick={() => {
                      if (!col.accessor || col.sortable === false) return;
                      setSort((s) => {
                        const nextDir =
                          s.key === key && s.dir === "asc" ? "desc" : "asc";
                        return { key, dir: nextDir };
                      });
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      userSelect: "none",
                      cursor:
                        col.accessor && col.sortable !== false
                          ? "pointer"
                          : "default",
                      paddingRight: 14,
                    }}
                  >
                    {col.header}
                    {sort.key === key && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        {sort.dir === "asc" ? (
                          <polyline points="6,14 12,8 18,14"></polyline>
                        ) : (
                          <polyline points="6,10 12,16 18,10"></polyline>
                        )}
                      </svg>
                    )}
                  </span>
                  {enableResize && (
                    <div
                      onMouseDown={(e) => startResize(e, key)}
                      style={{
                        position: "absolute",
                        right: -2,
                        top: "50%",
                        transform: "translateY(-50%)",
                        height: 16,
                        width: 4,
                        cursor: "col-resize",
                        borderRadius: 2,
                        background:
                          hoveredKey === key ? "#3b82f633" : "#94a3b820",
                        boxShadow:
                          hoveredKey === key
                            ? "0 0 0 2px #bfdbfe66"
                            : "none",
                      }}
                    />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) && (
            <tr>
              <td
                colSpan={visibleColumns.length + 1}
                style={{ textAlign: "center", padding: 20, color: "#64748b" }}
              >
                {emptyText}
              </td>
            </tr>
          )}
          {sortedData?.map((row, idx) => (
            <tr
              key={row._id || row.id || idx}
              style={{ background: idx % 2 === 0 ? "whitesmoke" : "#ffffff" }}
            >
              <td style={{ padding: cellPadding }}>
                {(page - 1) * perPage + idx + 1}
              </td>
              {visibleColumns.map((col) => {
                const key = col.key || col.accessor || col.header;
                const width = colWidths[key] ? { width: colWidths[key] } : {};
                return (
                  <td key={key} style={{ padding: cellPadding, ...width }}>
                    {renderCell(col, row)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 12,
        }}
      >
        <div>
          <label style={{ marginRight: 8 }}>Per page</label>
          <select
            value={perPage}
            onChange={(e) =>
              onPerPageChange && onPerPageChange(Number(e.target.value))
            }
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div style={{ color: "#64748b" }}>
          Total: {total || data.length} | Showing{" "}
          {total ? `${start}-${end}` : data.length}
        </div>
      </div>
    </div>
  );
}
