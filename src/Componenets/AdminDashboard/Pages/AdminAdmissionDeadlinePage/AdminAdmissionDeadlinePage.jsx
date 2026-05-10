import { useState, useEffect } from "react";
import { Eye, Trash2, Pencil } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DetailModal from "./DetailModal";
import EditModal from "./EditModal";

const AdminAdmissionDeadlinePage = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewRecord, setViewRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchDeadlines = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admission-deadlines/admin");
      setDeadlines(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch deadlines", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this deadline?")) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/admission-deadlines/${id}`);
      fetchDeadlines();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    {
      key: "university", label: "University", width: "25%",
      render: (row) => (
        <div className="text-sm font-semibold text-[#0f172a] wrap-anywhere">{row.university}</div>
      ),
    },
    {
      key: "program", label: "Program", width: "18%",
      render: (row) => (
        <div className="text-xs text-[#374151] wrap-anywhere">{row.program}</div>
      ),
    },
    {
      key: "deadline", label: "Deadline", width: "18%",
      render: (row) => (
        <div className={`text-xs font-semibold ${row.deadlineColor}`}>{row.deadline}</div>
      ),
    },
    {
      key: "intake", label: "Intake", width: "15%",
      render: (row) => (
        <div className="text-xs text-[#374151]">{row.intake}</div>
      ),
    },
    {
      key: "status", label: "Status", width: "12%",
      render: (row) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions", label: "Actions", width: "12%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setViewRecord(row)} className="text-[#64748b] hover:text-[#0f172a] transition-colors">
            <Eye size={15} />
          </button>
          <button onClick={() => setEditRecord(row)} className="text-[#64748b] hover:text-[#193CB8] transition-colors">
            <Pencil size={15} />
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
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#0f172a] wrap-break-word">Admission Deadlines</h1>
        <p className="text-sm text-[#64748b] mt-0.5 break-all">{deadlines.length} total records</p>
      </div>

      <AdminTable
        columns={columns}
        rows={deadlines.map((r) => ({ ...r, _key: r.id }))}
        loading={loading}
        emptyText="No admission deadlines found."
      />

      {viewRecord && (
        <DetailModal record={viewRecord} onClose={() => setViewRecord(null)} />
      )}

      {editRecord && (
        <EditModal
          record={editRecord}
          onClose={() => setEditRecord(null)}
          onUpdated={() => { fetchDeadlines(); setEditRecord(null); }}
        />
      )}
    </div>
  );
};

export default AdminAdmissionDeadlinePage;