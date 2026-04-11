const AdminTable = ({ columns, rows, loading, emptyText = "No data found." }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#64748b] text-sm gap-2">
        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Loading...
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="bg-[#f8fafc]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-xs font-medium text-[#64748b] px-4 py-3 whitespace-nowrap"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-sm text-[#64748b] py-10">
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row._key ?? i} className="border-t border-gray-100 hover:bg-[#f8fafc] transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;