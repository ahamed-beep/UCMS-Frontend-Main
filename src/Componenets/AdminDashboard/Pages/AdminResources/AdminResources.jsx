import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import ResourceFormModal from "./ResourceFormModal";
import ResourceViewModal from "./ResourceViewModal";

const TYPE_BADGE = {
  pdf: "bg-red-100 text-red-700",
  doc: "bg-blue-100 text-blue-700",
  spreadsheet: "bg-green-100 text-green-700",
  other: "bg-gray-100 text-gray-600",
};

const AdminResources = ({ moduleId }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/modules/${moduleId}/resources`);
      setResources(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResources(); }, [moduleId]);

  const handleDelete = async (resource) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/modules/${moduleId}/resources/${resource.id}`);
      setResources((prev) => prev.filter((r) => r.id !== resource.id));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "name", label: "Name", width: "35%",
      render: (r) => <span className="font-medium text-[#0f172a] text-sm truncate block">{r.name}</span>,
    },
    {
      key: "meta", label: "Meta", width: "20%",
      render: (r) => <span className="text-sm text-[#334155] truncate block">{r.meta ?? "—"}</span>,
    },
    {
      key: "type", label: "Type", width: "15%",
      render: (r) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${TYPE_BADGE[r.type] ?? "bg-gray-100 text-gray-600"}`}>
          {r.type}
        </span>
      ),
    },
    {
      key: "actions", label: "Actions", width: "20%",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setShowView(r)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => { setEditTarget(r); setShowForm(true); }} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeleteTarget(r)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row gap-2 md:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-anywhere">Resources</h1>
          <p className="text-sm text-[#64748b] mt-0.5 wrap-break-word">Manage resources for this module</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Resource
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={resources.map((r) => ({ ...r, _key: r.id }))}
        loading={loading}
        emptyText="No resources found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.name}
      />

      {showForm && (
        <ResourceFormModal
          moduleId={moduleId}
          resource={editTarget}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
          onSaved={fetchResources}
        />
      )}

      {showView && (
        <ResourceViewModal resource={showView} onClose={() => setShowView(null)} />
      )}
    </div>
  );
};

export default AdminResources;