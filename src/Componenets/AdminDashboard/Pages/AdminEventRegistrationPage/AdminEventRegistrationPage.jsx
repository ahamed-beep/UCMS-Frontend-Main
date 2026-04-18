import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useRegistrations } from "./Hook/useRegistrations";
import { DetailModal } from "./DetailModal";
import AdminTable from "../../../../ResuableUi/AdminTable";
import { statusColor } from "./Constant/AdminEventRegistrationConstant";
import axiosInstance from "../../../../Api/axiosInstance";

const AdminRegistrationsPage = () => {
  const { registrations, loading, page, setPage, total, limit, refetch } = useRegistrations();
  const [viewReg, setViewReg] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/registrations/${id}`);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete registration.");
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    {
      key: "name", label: "Attendee", width: "18%",
      render: (row) => (
        <div>
          <div className="text-sm font-semibold text-[#0f172a]">{row.fullName}</div>
        </div>
      ),
    },
    {
      key: "event", label: "Event", width: "20%",
      render: (row) => (
        <div className="text-xs text-[#374151]">
          {typeof row.eventId === "object"
            ? <><div className="font-medium truncate">{row.eventId?.title}</div><div className="text-[#64748b]">{row.eventId?.tag}</div></>
            : <span className="text-[#64748b]">—</span>
          }
        </div>
      ),
    },
    {
      key: "email", label: "Email", width: "18%",
      render: (row) => (
        <div className="text-xs wrap-break-word text-[#374151]">
          {row.email}
        </div>
      ),
    },
    {
      key: "phone", label: "Phone", width: "12%",
      render: (row) => (
        <div className="text-xs wrap-break-word text-[#374151]">
          {row.phone}
        </div>
      ),
    },
  
    {
      key: "attendees", label: "Attendees", width: "8%",
      render: (row) => (
        <div className="text-xs text-[#374151] text-center">{row.attendees}</div>
      ),
    },
    {
      key: "status", label: "Status", width: "12%",
      render: (row) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[row.status] || "bg-gray-100 text-gray-500"}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "actions", label: "Actions", width: "10%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setViewReg(row)} className="text-[#64748b] hover:text-[#0f172a] transition-colors">
            <Eye size={15} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            disabled={deletingId === row.id}
            className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a]">Registrations</h1>
          <p className="text-sm text-[#64748b] mt-0.5">{total} total registrations</p>
        </div>
      </div>

      <AdminTable
        columns={columns}
        rows={registrations.map(r => ({ ...r, _key: r.id }))}
        loading={loading}
        emptyText="No registrations found."
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-[#64748b]">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-[#f8fafc] disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-[#f8fafc] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {viewReg && (
        <DetailModal
          reg={viewReg}
          onClose={() => setViewReg(null)}
          onStatusUpdated={() => { refetch(); setViewReg(null); }}
        />
      )}
    </div>
  );
};

export default AdminRegistrationsPage;