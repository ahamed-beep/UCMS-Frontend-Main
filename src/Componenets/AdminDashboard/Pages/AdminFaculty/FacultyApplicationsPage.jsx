import { useState, useEffect } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import DetailModal from "./DetailModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const STATUS_OPTIONS = ["pending", "reviewed", "accepted", "rejected"];

const STATUS_STYLES = {
  pending:  { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
  reviewed: { bg: "#dbeafe", color: "#1e40af", label: "Under Review" },
  accepted: { bg: "#dcfce7", color: "#166534", label: "Accepted" },
  rejected: { bg: "#fee2e2", color: "#991b1b", label: "Rejected" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] ?? { bg: "#f1f5f9", color: "#475569", label: status };
  return (
    <span
      style={{ background: s.bg, color: s.color }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
    >
      {s.label}
    </span>
  );
};

export default function FacultyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, loading: false });
  const [detailModal, setDetailModal] = useState({ open: false, application: null });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

const fetchApplications = async () => {
  setLoading(true);
  try {
    const res = await axiosInstance.get("/faculty-applications");
    
    // Log the full response to confirm actual shape
    console.log("Full response:", res.data);
    
    // Adjust this based on what you see in the log above
    const applicationsData = res.data?.data?.data    // if double-wrapped
      ?? res.data?.data                              // if single-wrapped
      ?? [];

    const formattedData = applicationsData.map(app => ({
      ...app,
      _id: app.id ?? app._id,
    }));

    setApplications(formattedData);
  } catch (error) {
    console.error("Failed to load applications:", error);
    showToast("Failed to load applications.", "error");
    setApplications([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchApplications();
  }, []);

const handleStatusChange = async (id, status) => {
  setStatusLoading((prev) => ({ ...prev, [id]: true }));
  try {
    const res = await axiosInstance.patch(`/faculty-applications/${id}/status`, { status });
    setApplications((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: res.data?.data?.status ?? status } : a))
    );
    showToast("Status updated successfully.");
  } catch {
    showToast("Failed to update status.", "error");
  } finally {
    setStatusLoading((prev) => ({ ...prev, [id]: false }));
  }
};
const handleDelete = async () => {
  setDeleteModal((prev) => ({ ...prev, loading: true }));
  try {
    await axiosInstance.delete(`/faculty-applications/${deleteModal.id}`);
    setApplications((prev) => prev.filter((a) => a._id !== deleteModal.id));
    showToast("Application deleted.");
  } catch {
    showToast("Failed to delete application.", "error");
  } finally {
    setDeleteModal({ open: false, id: null, loading: false });
  }
};
  const columns = [
    {
      key: "fullName",
      label: "Applicant",
      width: "22%",
      render: (row) => (
        <div>
          <p className="text-sm font-medium flex-wrap text-[#0f172a] break-all">{row.fullName}</p>
          <p className="text-xs flex-wrap wrap-break-word text-[#94a3b8] break-all">{row.email}</p>
        </div>
      ),
    },
    {
      key: "position",
      label: "Position / Institution",
      width: "22%",
      render: (row) => (
        <div>
          <p className="text-sm text-[#334155] break-all">{row.currentJobPosition}</p>
          <p className="text-xs text-[#94a3b8] break-all">{row.institutionAffiliation}</p>
        </div>
      ),
    },
    {
      key: "qualification",
      label: "Qualification",
      width: "15%",
      render: (row) => (
        <div>
          <p className="text-sm text-[#334155] break-all">{row.highestQualification}</p>
          <p className="text-xs text-[#94a3b8] break-all">{row.yearsOfExperience} yrs exp</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "18%",
      render: (row) => (
        <div className="relative">
          <select
            value={row.status}
        disabled={!!statusLoading[row.id]}   
        onChange={(e) => handleStatusChange(row.id, e.target.value)}
            className="appearance-none  flex text-xs font-semibold rounded-full pl-3  py-1 border-0 cursor-pointer focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-60"
            style={{
              background: STATUS_STYLES[row.status]?.bg ?? "#f1f5f9",
              color: STATUS_STYLES[row.status]?.color ?? "#475569",
            }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_STYLES[s]?.label ?? s}
              </option>
            ))}
          </select>
         {statusLoading[row.id]  && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </span>
          )}
        </div>
      ),
    },
    {
      key: "appliedAt",
      label: "Applied",
      width: "12%",
      render: (row) => (
        <span className="text-xs text-[#94a3b8]">
          {new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "11%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
         onClick={() => setDetailModal({ open: true, application: row })}
            title="View Details"
            className="p-1.5 rounded-lg text-[#64748b] hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            onClick={() => setDeleteModal({ open: true, id: row._id, loading: false })}
            title="Delete"
            className="p-1.5 rounded-lg text-[#64748b] hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
            toast.type === "error" ? "bg-red-500 text-white" : "bg-[#0f172a] text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row items-start justify-between">
        <div >
          <h1 className="text-xl md:mr-4 font-semibold text-[#0f172a] wrap-break-word">Faculty Applications</h1>
          <p className="text-sm text-[#94a3b8] mt-0.5">
            {applications.length} total application{applications.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div>
           
        <div className="flex flex-col w-full md:mt-0 mt-5 md:flex-row gap-2">
          {STATUS_OPTIONS.map((s) => {
            const count = applications.filter((a) => a.status === s).length;
            return (
              <div
                key={s}
                className="px-3 py-3 rounded-lg text-xs font-medium"
                style={{ background: STATUS_STYLES[s]?.bg, color: STATUS_STYLES[s]?.color }}
              >
                {STATUS_STYLES[s]?.label}: {count}
              </div>
            );
          })}
        </div>
         </div>
      </div>

      <AdminTable
        columns={columns}
    rows={applications.map((a) => ({ ...a, _key: a.id }))}
        loading={loading}
        emptyText="No faculty applications found."
      />

      <ConfirmDeleteModal
        open={deleteModal.open}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null, loading: false })}
        loading={deleteModal.loading}
      />

      <DetailModal
        open={detailModal.open}
      application={detailModal.application}
        onClose={() => setDetailModal({ open: false, application: null })}
      />
    </div>
  );
}