import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import CourseModuleFormModal from "./CourseModuleFormModal";
import CourseModuleViewModal from "./CourseModuleViewModal";

const AdminCourseModules = ({ courseId, onSelectModule = () => {} }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/courses/${courseId}/modules`);
      setModules(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchModules(); }, [courseId]);

  const handleDelete = async (module) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/courses/${courseId}/modules/${module.id}`);
      setModules((prev) => prev.filter((m) => m.id !== module.id));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "order", label: "#", width: "5%",
      render: (r) => <span className="text-sm text-[#64748b] truncate block">{r.order}</span>,
    },
    {
      key: "title", label: "Title", width: "35%",
      render: (r) => <span className="font-medium text-[#0f172a] text-sm truncate block">{r.title}</span>,
    },
    {
      key: "hours", label: "Hours", width: "15%",
      render: (r) => <span className="text-sm text-[#334155] truncate block">{r.hours ? `${r.hours}h` : "—"}</span>,
    },
    
    {
      key: "actions", label: "Actions", width: "20%",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setShowView(r)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
            <Eye className="w-4 h-4" />
          </button>
          <button
  onClick={() => onSelectModule(r)}
  className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-100 hover:bg-blue-50 text-blue-500"
  title="Manage Lectures"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14" />
    <rect x="3" y="6" width="12" height="12" rx="2" />
  </svg>
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
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-break-word">Course Modules</h1>
          <p className="text-sm text-[#64748b] mt-0.5 wrap-break-word">Manage modules for this course</p>
        </div>
        <div className=" flex mt-3" >

        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
          >
          <Plus className="w-4 h-4" /> Add Module
        </button>
            </div>
      </div>

      <AdminTable
        columns={columns}
        rows={modules.map((m) => ({ ...m, _key: m.id }))}
        loading={loading}
        emptyText="No modules found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title}
      />

      {showForm && (
        <CourseModuleFormModal
          courseId={courseId}
          module={editTarget}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
          onSaved={fetchModules}
        />
      )}

      {showView && (
        <CourseModuleViewModal module={showView} onClose={() => setShowView(null)} />
      )}
    </div>
  );
};

export default AdminCourseModules;