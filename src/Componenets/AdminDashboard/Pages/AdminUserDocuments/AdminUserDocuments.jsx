import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingStatus(id);
    try {
      await axiosInstance.patch(`/user-documents/${id}/status`, { status });
      await fetchDocuments();
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
      await fetchDocuments();
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

  const columns = [
    {
      key: "name",
      label: "Document Name",
      width: "25%",
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
      width: "20%",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm text-[#0f172a] font-medium">
            {row.userId?.firstName} {row.userId?.lastName}
          </span>
          <span className="text-xs text-[#64748b]">{row.userId?.email}</span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Upload Date",
      width: "15%",
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
      width: "10%",
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">User Documents</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage and review student uploaded documents</p>
        </div>
      </div>

      <AdminTable
        columns={columns}
        rows={documents.map((d) => ({ ...d, _key: d.id }))}
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