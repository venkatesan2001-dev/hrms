import React from 'react'

export default function Table({ columns = [], data = [], emptyText = 'No records found', footer = null }) {
  return (
    <div className="enhanced-table">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key || col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) && (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: 20, color: '#64748b' }}>
                {emptyText}
              </td>
            </tr>
          )}
          {data?.map((row, idx) => (
            <tr key={row._id || row.id || idx}>
              {columns.map((col) => (
                <td key={col.key || col.header}>
                  {typeof col.render === 'function' ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footer}
    </div>
  )
}
