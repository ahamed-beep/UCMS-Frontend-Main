import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import IeltsResourceDetailModal from "./IeltsResourceDetailModal";
import IeltsResourceForm from "./IeltsResourceForm";
import AdminTable from "../../../../ResuableUi/AdminTable";

const ManageIeltsResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10 });

  const fetchResources = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/ielts-resources", {
        params: { page, limit: pagination.limit },
      });
      setResources(res.data.data.data);
      setPagination((p) => ({ ...p, total: res.data.data.total, page }));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      await axiosInstance.post("/ielts-resources", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormMode(null);
      fetchResources(pagination.page);
    } catch {
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (formData) => {
    setFormLoading(true);
    try {
      await axiosInstance.patch(`/ielts-resources/${selected.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormMode(null);
      setSelected(null);
      fetchResources(pagination.page);
    } catch {
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (resource) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/ielts-resources/${resource.id}`);
      setDeleteTarget(null);
      fetchResources(pagination.page);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });

  const columns = [
    {
      key: "title",
      label: "Title",
      width: "35%",
      render: (row) => (
        <span className="text-sm font-medium text-[#0f172a] line-clamp-1">{row.title}</span>
      ),
    },
    {
      key: "tag",
      label: "Tag",
      width: "10%",
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-[#1447E6] bg-[#DBEAFE]">
          {row.tag}
        </span>
      ),
    },
    {
      key: "downloads",
      label: "Downloads",
      width: "12%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">{row.downloads?.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "12%",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  
    {
      key: "actions",
      label: "Actions",
      width: "16%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDetailTarget(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setSelected(row); setFormMode("edit"); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#0f172a]">
            IELTS / PTE Resources
          </h1>
          <p className="mt-1 text-sm text-[#64748b]">Manage downloadable resources for students</p>
        </div>
        <div className="flex md:mt-0 mt-3" >

        <button
          onClick={() => { setSelected(null); setFormMode("create"); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          >
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
            </div>
      </div>

      <AdminTable
        columns={columns}
        rows={resources}
        loading={loading}
        emptyText="No IELTS resources found."
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-[#64748b]">
            Showing {resources.length} of {pagination.total} resources
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => fetchResources(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => fetchResources(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <IeltsResourceForm
        mode={formMode}
        selected={selected}
        onClose={() => { setFormMode(null); setSelected(null); }}
        onSubmit={formMode === "create" ? handleCreate : handleEdit}
        loading={formLoading}
      />

      <IeltsResourceDetailModal
        selected={detailTarget}
        onClose={() => setDetailTarget(null)}
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title}
      />
    </div>
  );
};

export default ManageIeltsResources;