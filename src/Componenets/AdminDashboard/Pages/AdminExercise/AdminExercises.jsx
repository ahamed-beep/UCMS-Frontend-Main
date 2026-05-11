import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import ExerciseFormModal from "./ExerciseFormModal";
import ExerciseViewModal from "./ExerciseViewModal";

const typeStyles = {
  writing: "bg-blue-100 text-blue-700",
  reading: "bg-green-100 text-green-700",
  listening: "bg-purple-100 text-purple-700",
  speaking: "bg-orange-100 text-orange-700",
};

const AdminExercises = ({ courseId }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/courses/${courseId}/exercises`);
      setExercises(data.data ?? []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExercises(); }, [courseId]);

  const handleDelete = async (exercise) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/courses/${courseId}/exercises/${exercise.id ?? exercise._id}`);
      setExercises((prev) => prev.filter((e) => (e.id ?? e._id) !== (exercise.id ?? exercise._id)));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "title", label: "Title", width: "30%",
      render: (r) => <span className="font-medium text-[#0f172a] text-sm">{r.title}</span>,
    },
    {
      key: "type", label: "Type", width: "15%",
      render: (r) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${typeStyles[r.type] ?? "bg-gray-100 text-gray-600"}`}>
          {r.type ?? "—"}
        </span>
      ),
    },
    {
      key: "instructions", label: "Instructions", width: "30%",
      render: (r) => (
        <span className="text-sm text-[#334155] line-clamp-1">{r.instructions ?? "—"}</span>
      ),
    },
    {
      key: "options", label: "Options", width: "10%",
      render: (r) => (
        <span className="text-sm text-[#334155]">{r.options?.length ?? 0}</span>
      ),
    },
    {
      key: "actions", label: "Actions", width: "15%",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowView(r)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setEditTarget(r); setShowForm(true); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(r)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a]">Practice Exercises</h1>
          <p className="text-sm text-[#64748b] mt-0.5">Manage writing, reading, listening & speaking exercises</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Exercise
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={exercises.map((e) => ({ ...e, _key: e.id ?? e._id }))}
        loading={loading}
        emptyText="No exercises found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title}
      />

      {showForm && (
        <ExerciseFormModal
          courseId={courseId}
          exercise={editTarget}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
          onSaved={fetchExercises}
        />
      )}

      {showView && (
        <ExerciseViewModal exercise={showView} onClose={() => setShowView(null)} />
      )}
    </div>
  );
};

export default AdminExercises;