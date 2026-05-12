import { useEffect, useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import ConsultationDetailModal from "./ConsultationDetail";
import ConsultationSlotsPage from "./ConsultationSlotsPage";
import { toast } from "react-toastify";
import { Plus, X } from "lucide-react";

const statusColors = {
  unread: "bg-yellow-100 text-yellow-700",
  read: "bg-green-100 text-green-700",
  pending: "bg-blue-100 text-blue-700",
};

const FILTERS = ["All", "Unread", "Read"];

const ConsultationsPage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showSlotsModal, setShowSlotsModal] = useState(false);

  const fetchConsultations = async (filter) => {
    setLoading(true);
    try {
      let url = "/consultations";
      if (filter === "Unread") url = "/consultations/filter/unread";
      else if (filter === "Read") url = "/consultations/filter/read";

      const res = await axiosInstance.get(url);
      const inner = res.data?.data;
      const list = inner?.data ?? inner ?? [];
      setConsultations(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      setConsultations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations(activeFilter);
  }, [activeFilter]);

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid consultation ID");
      return;
    }
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p>Is consultation ko delete karna chahte ho?</p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                closeToast();
                setDeletingId(id);
                try {
                  await axiosInstance.delete(`/consultations/${id}`);
                  setConsultations((prev) => prev.filter((c) => c.id !== id));
                  toast.success("Consultation deleted successfully");
                } catch (err) {
                  console.error("Delete failed", err);
                  toast.error("Failed to delete consultation");
                } finally {
                  setDeletingId(null);
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => {
                closeToast();
                toast.info("Delete cancelled");
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!id) return;
    try {
      await axiosInstance.patch(`/consultations/${id}/status`, { status: newStatus });
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleView = (row) => {
    setSelectedConsultation(row);
    if (row.status === "unread") {
      handleStatusChange(row.id, "read");
      setSelectedConsultation({ ...row, status: "read" });
    }
  };

  const columns = [
    {
      key: "fullName",
      label: "Name",
      width: "15%",
      render: (row) => (
        <p className="text-sm font-medium text-[#1e293b]">{row.fullName}</p>
      ),
    },
    {
      key: "email",
      label: "Email",
      width: "20%",
      render: (row) => (
        <p className="text-xs text-[#64748b] break-all">{row.email}</p>
      ),
    },
    {
      key: "consultationType",
      label: "Type",
      width: "15%",
      render: (row) => (
        <span className="text-sm text-[#1e293b]">{row.consultationType}</span>
      ),
    },
    {
      key: "selectedDate",
      label: "Date & Time",
      width: "14%",
      render: (row) => (
        <div>
          <p className="text-sm text-[#1e293b]">{row.selectedDate}</p>
          <p className="text-xs text-[#64748b]">{row.selectedTime}</p>
        </div>
      ),
    },
    {
      key: "destination",
      label: "Destination",
      width: "10%",
      render: (row) => (
        <span className="text-sm text-[#1e293b] truncate block">
          {row.destination || "—"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "16%",
      render: (row) => (
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            statusColors[row.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "10%",
      render: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleView(row)}
            title="View Details"
            className="text-[#64748b] hover:text-[#1e293b] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <button
            onClick={() => handleDelete(row.id)}
            disabled={deletingId === row.id}
            title="Delete"
            className="text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
          >
            {deletingId === row.id ? (
              <span className="text-xs text-red-400">...</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M3 7h18"
                />
              </svg>
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-5">
      {/* Consultation Detail Modal */}
      <ConsultationDetailModal
        consultation={selectedConsultation}
        onClose={() => setSelectedConsultation(null)}
      />

      {/* ── Slots Manager Modal ── */}
      {showSlotsModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 backdrop-blur-sm">
          {/* On mobile: full screen. On sm+: right panel up to max-w-xl */}
          <div className="bg-white h-full w-full sm:max-w-xl shadow-2xl overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#e2e8f0] sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-base font-semibold text-[#1e293b]">
                  Manage Booking Slots
                </h2>
                <p className="text-xs text-[#64748b]">
                  Dates aur times add/remove karo
                </p>
              </div>
              <button
                onClick={() => setShowSlotsModal(false)}
                className="text-[#94a3b8] hover:text-[#1e293b] transition-colors p-1 rounded-lg hover:bg-[#f1f5f9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slots Page Content */}
            <div className="flex-1 overflow-y-auto">
              <ConsultationSlotsPage />
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#1e293b]">Consultations</h1>
          <p className="text-sm text-[#64748b]">
            {consultations.length} record{consultations.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          {/* Manage Slots Button */}
          <button
            onClick={() => setShowSlotsModal(true)}
            className="flex items-center justify-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0d3f73] transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Manage Slots
          </button>

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-[#f1f5f9] p-1 rounded-lg w-full sm:w-auto">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-1 sm:flex-none text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeFilter === f
                    ? "bg-white text-[#1e293b] shadow-sm"
                    : "text-[#64748b] hover:text-[#1e293b]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table — horizontally scrollable on small screens */}
      <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
        <div className="min-w-[640px]">
          <AdminTable
            columns={columns}
            rows={consultations.map((c) => ({ ...c, _key: c.id }))}
            loading={loading}
            emptyText="Koi consultation nahi mili."
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultationsPage;