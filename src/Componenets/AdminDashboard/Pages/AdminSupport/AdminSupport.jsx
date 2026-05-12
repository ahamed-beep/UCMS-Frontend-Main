import { useEffect, useState, useMemo } from "react";
import { Trash2, X, Eye } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const statusStyles = {
  pending: "bg-[#FEF9C2] text-[#A65F00]",
  resolved: "bg-[#DCFCE7] text-[#008236]",
};

const DetailModal = ({ open, onClose, item }) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Support Request Detail</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Full Name</span>
            <span className="text-sm text-[#0f172a] font-medium">{item.fullName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Email</span>
            <span className="text-sm text-[#0f172a]">{item.email}</span>
          </div>
          {item.courses?.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[#64748b]">Enrolled Courses</span>
              <div className="flex flex-wrap gap-1.5">
                {item.courses.map((c) => (
                  <span
                    key={c.id}
                    className="text-xs px-2 py-1 bg-[#EFF6FF] text-[#1d4ed8] rounded-full"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Subject</span>
            <span className="text-sm text-[#0f172a] font-medium">{item.subject}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Message</span>
            <span className="text-sm text-[#334155] leading-relaxed bg-[#f8fafc] rounded-xl p-3">
              {item.message}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Status</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit capitalize ${statusStyles[item.status]}`}>
              {item.status}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Submitted</span>
            <span className="text-sm text-[#64748b]">
              {new Date(item.createdAt).toLocaleDateString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminSupport = () => {
  const [requests, setRequests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get("/support");
      setRequests(res.data.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    axiosInstance.get("/courses").then((res) => {
      setCourses(res.data.data ?? []);
    }).catch(() => {});
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingStatus(id);
    try {
      await axiosInstance.patch(`/support/${id}/status`, { status });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async (item) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/support/${item.id}`);
      setRequests((prev) => prev.filter((r) => r.id !== item.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return requests.filter((r) => {
      const matchesSearch =
        !q ||
        r.fullName?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.subject?.toLowerCase().includes(q);

      const matchesCourse =
        !courseFilter ||
        (r.courses ?? []).some((c) => c.id === courseFilter);

      return matchesSearch && matchesCourse;
    });
  }, [requests, search, courseFilter]);

  const columns = [
    {
      key: "fullName",
      label: "Name",
      width: "18%",
      render: (row) => (
        <span className="font-medium text-sm text-[#0f172a]">{row.fullName}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      width: "20%",
      render: (row) => (
        <span className="text-sm wrap-break-word break-after-all text-[#334155]">{row.email}</span>
      ),
    },
   
    {
      key: "subject",
      label: "Subject",
      width: "18%",
      render: (row) => (
        <span className="text-sm text-[#334155] truncate block max-w-[140px]">
          {row.subject}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date",
      width: "10%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">
          {new Date(row.createdAt).toLocaleDateString("en-US")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "10%",
      render: (row) => (
        <select
          value={row.status}
          disabled={updatingStatus === row.id}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer capitalize ${statusStyles[row.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "6%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDetailItem(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b]"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Support Requests</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage student support messages</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
          />
        </div>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="w-full sm:w-52 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] text-[#475569] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
        >
          <option value="">All courses</option>
          {courses.map((c) => (
            <option key={c.id ?? c._id} value={c.id ?? c._id}>{c.title}</option>
          ))}
        </select>
      </div>

      <AdminTable
        columns={columns}
        rows={filtered.map((r) => ({ ...r, _key: r.id }))}
        loading={loading}
        emptyText="No support requests found."
      />

      <DetailModal
        open={!!detailItem}
        onClose={() => setDetailItem(null)}
        item={detailItem}
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName={deleteTarget?.subject}
      />
    </div>
  );
};

export default AdminSupport;