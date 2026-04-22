import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import axiosInstance from "../../../Api/axiosInstance";
import UpcomingClassForm from "./UpcomingClassForm";
import UpcomingClassDetailModal from "./UpcomingClassDetailModal";
import DeleteModal from "../../../ResuableUi/DeleteModal";
import AdminTable from "../../../ResuableUi/AdminTable";

const STATUS_COLORS = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  completed: "bg-blue-100 text-blue-700",
};

const ManageUpcomingClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10 });

  const fetchClasses = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/upcoming-classes", {
        params: { page, limit: pagination.limit },
      });
      setClasses(res.data.data.data);
      setPagination((p) => ({ ...p, total: res.data.data.total, page }));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreate = async (payload) => {
    setFormLoading(true);
    try {
      await axiosInstance.post("/upcoming-classes", payload);
      setFormMode(null);
      fetchClasses(pagination.page);
    } catch {
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (payload) => {
    setFormLoading(true);
    try {
      await axiosInstance.patch(`/upcoming-classes/${selected.id}`, payload);
      setFormMode(null);
      setSelected(null);
      fetchClasses(pagination.page);
    } catch {
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (item) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/upcoming-classes/${item.id}`);
      setDeleteTarget(null);
      fetchClasses(pagination.page);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const columns = [
    {
      key: "title",
      label: "Title",
      width: "25%",
      render: (row) => (
        <span className="text-sm font-medium text-[#0f172a] line-clamp-1">{row.title}</span>
      ),
    },
  
    {
      key: "type",
      label: "Type",
      width: "10%",
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-[#1447E6] bg-[#DBEAFE]">
          {row.type}
        </span>
      ),
    },
    {
      key: "mode",
      label: "Mode",
      width: "10%",
      render: (row) => (
        <span className="text-sm text-[#64748b] capitalize">{row.mode}</span>
      ),
    },
    {
      key: "spots",
      label: "Spots Left",
      width: "12%",
      render: (row) => (
        <span className="text-sm text-[#FF6B35] font-medium">{row.spotsLeft} / {row.totalSpots}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "12%",
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[row.status] ?? "bg-gray-100 text-gray-600"}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "17%",
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
            Upcoming Classes
          </h1>
          <p className="mt-1 text-sm text-[#64748b]">Manage IELTS / PTE upcoming classes</p>
        </div>
        <div>
<div className=" flex mt-3 md:mt-0" >

        <button
          onClick={() => { setSelected(null); setFormMode("create"); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-white text-sm font-medium hover:bg-blue-900 transition-colors"
          >
          <Plus className="w-4 h-4" />
          Add Class
        </button>
              </div>
            </div>
      </div>

      <AdminTable
        columns={columns}
        rows={classes}
        loading={loading}
        emptyText="No upcoming classes found."
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-[#64748b]">
            Showing {classes.length} of {pagination.total} classes
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => fetchClasses(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => fetchClasses(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <UpcomingClassForm
        mode={formMode}
        selected={selected}
        onClose={() => { setFormMode(null); setSelected(null); }}
        onSubmit={formMode === "create" ? handleCreate : handleEdit}
        loading={formLoading}
      />

      <UpcomingClassDetailModal
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

export default ManageUpcomingClasses;