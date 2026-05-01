import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import MaterialFormModal from "./MaterialFormModal";
import MaterialViewModal from "./MaterialViewModal";

const TYPE_BADGE = {
  video: "bg-blue-100 text-blue-700",
  pdf: "bg-red-100 text-red-700",
  presentation: "bg-yellow-100 text-yellow-700",
};

const AdminMaterials = ({ courseId }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/courses/${courseId}/materials`);
      setMaterials(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMaterials(); }, [courseId]);

  const handleDelete = async (material) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/courses/${courseId}/materials/${material.id}`);
      setMaterials((prev) => prev.filter((m) => m.id !== material.id));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "title", label: "Title", width: "35%",
      render: (r) => <span className="font-medium text-[#0f172a] text-sm">{r.title}</span>,
    },
    {
      key: "sub", label: "Sub", width: "20%",
      render: (r) => <span className="text-sm text-[#334155]">{r.sub ?? "—"}</span>,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a]">Materials</h1>
          <p className="text-sm text-[#64748b] mt-0.5">Manage materials for this course</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Material
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={materials.map((m) => ({ ...m, _key: m.id }))}
        loading={loading}
        emptyText="No materials found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title}
      />

      {showForm && (
        <MaterialFormModal
          courseId={courseId}
          material={editTarget}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
          onSaved={fetchMaterials}
        />
      )}

      {showView && (
        <MaterialViewModal material={showView} onClose={() => setShowView(null)} />
      )}
    </div>
  );
};

export default AdminMaterials;