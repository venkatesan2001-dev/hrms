import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Dropdown({
  label,
  name,
  value,
  onChange,
  data = [],
  displayName = "label",
  displayValue = "value",
  searchFields = ["label"],
  placeholder = "Select...",
  error,
  disabled,
  renderValue,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const [placement, setPlacement] = useState('bottom');

  const selectedItem = useMemo(
    () => data.find((d) => d?.[displayValue] === value),
    [data, displayValue, value]
  );

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((item) =>
      searchFields.some((f) =>
        String(item?.[f] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [data, query, searchFields]);

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open || !containerRef.current) return;
    const compute = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const spaceBelow = viewportH - rect.bottom;
      const spaceAbove = rect.top;
      const desired = 110;
      if (spaceBelow < Math.min(200, desired) && spaceAbove > spaceBelow) {
        setPlacement('top');
      } else {
        setPlacement('bottom');
      }
    };
    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('scroll', compute, true);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('scroll', compute, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const idx = filtered.findIndex((i) => i?.[displayValue] === value);
    if (idx >= 0) {
      const el = listRef.current.children[idx];
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const viewTop = listRef.current.scrollTop;
        const viewBottom = viewTop + listRef.current.clientHeight;
        if (top < viewTop) {
          listRef.current.scrollTop = top;
        } else if (top + height > viewBottom) {
          listRef.current.scrollTop = top - listRef.current.clientHeight + height;
        }
      }
    }
  }, [open, filtered, value, displayValue]);

  const handleSelect = (item) => {
    onChange &&
      onChange({ target: { name, value: item?.[displayValue] } }, item);
    setOpen(false);
  };

  return (
    <div className="form-group" ref={containerRef} style={{ position: 'relative' }}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((s) => !s)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          border: "2px solid #e2e8f0",
          borderRadius: 8,
          cursor: disabled ? "not-allowed" : "pointer",
          background: disabled ? "#f3f4f6" : "#fff",
        }}
      >
        <div style={{ color: selectedItem ? "#111827" : "#9ca3af" }}>
          {selectedItem
            ? renderValue
              ? renderValue(selectedItem)
              : selectedItem?.[displayName]
            : placeholder}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            zIndex: 50,
            marginTop: placement === 'bottom' ? 8 : 0,
            marginBottom: placement === 'top' ? 8 : 0,
            top: placement === 'bottom' ? '100%' : 'auto',
            bottom: placement === 'top' ? '100%' : 'auto',
            left: 0,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            width: "min(480px, 100%)",
            maxHeight: 280,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 8, borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "10px 36px 10px 12px",
                  border: "2px solid #e2e8f0",
                  borderRadius: 8,
                  outline: "none",
                }}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear"
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    padding: 4,
                    color: "#6b7280",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              ) : (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div ref={listRef} style={{ maxHeight: 230, overflowY: "auto" }}>
            {filtered.length === 0 && (
              <div style={{ padding: 12, color: "#64748b" }}>No results</div>
            )}
            {filtered.map((item) => {
              const isSelected = item?.[displayValue] === value;
              return (
                <div
                  key={String(item?.[displayValue])}
                  onClick={() => handleSelect(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    cursor: "pointer",
                    background: isSelected ? "#ecfeff" : "#fff",
                    color: isSelected ? "#0e7490" : "#111827",
                  }}
                >
                  <span>{String(item?.[displayName] ?? "")}</span>
                  {isSelected && (
                    <svg
                      width="16"
                      height="16"
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
        </div>
      )}
      {error && <div className="login-error">{error}</div>}
    </div>
  );
}
