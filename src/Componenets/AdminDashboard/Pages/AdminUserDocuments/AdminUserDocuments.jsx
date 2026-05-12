import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import { FileText, Trash2 } from "lucide-react";

const statusOptions = ["Pending", "Under Review", "Approved", "Resubmit Required"];

const statusStyles = {
  Pending: "bg-[#F3F4F6] text-[#6A7282]",
  "Under Review": "bg-[#FEF9C2] text-[#A65F00]",
  Approved: "bg-[#DCFCE7] text-[#008236]",
  "Resubmit Required": "bg-[#FFE2E2] text-[#C10007]",
};

const AdminUserDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [studentFilter, setStudentFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await axiosInstance.get("/user-documents");
      setDocuments(res.data.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDocuments(); }, []);

  const students = useMemo(() => {
    const seen = new Set();
    return documents
      .filter((d) => {
        const id = d.userId?.id ?? d.userId?.toString();
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map((d) => ({
        id: d.userId?.id ?? d.userId?.toString(),
        label: `${d.userId?.firstName ?? ""} ${d.userId?.lastName ?? ""}`.trim(),
      }));
  }, [documents]);

  const courses = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const d of documents) {
      for (const c of d.courses ?? []) {
        if (!seen.has(c.id)) {
          seen.add(c.id);
          result.push(c);
        }
      }
    }
    return result;
  }, [documents]);

  const handleStatusChange = async (id, status) => {
    setUpdatingStatus(id);
    try {
      await axiosInstance.patch(`/user-documents/${id}/status`, { status });
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async (doc) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/user-documents/${doc.id}`);
      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US");
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return documents.filter((d) => {
      const fullName = `${d.userId?.firstName ?? ""} ${d.userId?.lastName ?? ""}`.toLowerCase();
      const email = (d.userId?.emailId ?? d.userId?.email ?? "").toLowerCase();
      const docUserId = d.userId?.id ?? d.userId?.toString();

      const matchesSearch =
        !q || fullName.includes(q) || email.includes(q) || d.name?.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || d.status === statusFilter;
      const matchesStudent = !studentFilter || docUserId === studentFilter;
      const matchesCourse =
        !courseFilter || (d.courses ?? []).some((c) => c.id === courseFilter);

      return matchesSearch && matchesStatus && matchesStudent && matchesCourse;
    });
  }, [documents, search, statusFilter, studentFilter, courseFilter]);

  const columns = [
    {
      key: "name",
      label: "Document Name",
      width: "22%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#0F4C8A] shrink-0" />
          <span className="font-medium text-sm text-[#0f172a] truncate">{row.name}</span>
        </div>
      ),
    },
    {
      key: "user",
      label: "Student",
      width: "22%",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm text-[#0f172a] font-medium">
            {row.userId?.firstName} {row.userId?.lastName}
          </span>
          <span className="text-xs text-[#64748b]">
            {row.userId?.emailId ?? row.userId?.email}
          </span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Upload Date",
      width: "13%",
      render: (row) => (
        <span className="text-sm text-[#334155]">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      key: "size",
      label: "Size",
      width: "10%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">{row.fileSize}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "20%",
      render: (row) => (
        <select
          value={row.status}
          disabled={updatingStatus === row.id}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${statusStyles[row.status]}`}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "13%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b]"
          >
            <FileText className="w-3.5 h-3.5" />
          </a>
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
          <h1 className="text-2xl font-bold text-[#0f172a]">User Documents</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage and review student uploaded documents</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
        <div className="relative w-full sm:w-60">
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
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
          />
        </div>

     

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] text-[#475569] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
        >
          <option value="">All courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] text-[#475569] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <AdminTable
        columns={columns}
        rows={filtered.map((d) => ({ ...d, _key: d.id }))}
        loading={loading}
        emptyText="No documents found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName={deleteTarget?.name}
      />
    </div>
  );
};

export default AdminUserDocuments;