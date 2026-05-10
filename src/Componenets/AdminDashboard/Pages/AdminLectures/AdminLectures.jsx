import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2, BookOpen } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import LectureFormModal from "./LectureFormModal";
import LectureViewModal from "./LectureViewModal";

const AdminLectures = ({ moduleId, onSelectLecture }) => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/modules/${moduleId}/lectures`);
      setLectures(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLectures(); }, [moduleId]);

  const handleDelete = async (lecture) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/modules/${moduleId}/lectures/${lecture.id}`);
      setLectures((prev) => prev.filter((l) => l.id !== lecture.id));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const TYPE_BADGE = {
    video: "bg-blue-100 text-blue-700",
    doc: "bg-yellow-100 text-yellow-700",
    quiz: "bg-purple-100 text-purple-700",
  };

  const columns = [
    {
      key: "order", label: "#", width: "5%",
      render: (r) => <span className="text-sm text-[#64748b] truncate block">{r.order}</span>,
    },
    {
      key: "title", label: "Title", width: "30%",
      render: (r) => <span className="font-medium text-[#0f172a] text-sm truncate block">{r.title}</span>,
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
      key: "duration", label: "Duration", width: "15%",
      render: (r) => <span className="text-sm text-[#334155] truncate block">{r.duration ?? "—"}</span>,
    },
    {
      key: "actions", label: "Actions", width: "25%",
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
          {onSelectLecture && (
            <button
              onClick={() => onSelectLecture({ id: r.id, title: r.title })}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-100 hover:bg-blue-50 text-[#0F4C8A]"
              title="Manage Quizzes"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-break-word">Lectures</h1>
          <p className="text-sm text-[#64748b] mt-0.5 wrap-break-word">Manage lectures for this module</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Lecture
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={lectures.map((l) => ({ ...l, _key: l.id }))}
        loading={loading}
        emptyText="No lectures found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title}
      />

      {showForm && (
        <LectureFormModal
          moduleId={moduleId}
          lecture={editTarget}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
          onSaved={fetchLectures}
        />
      )}

      {showView && (
        <LectureViewModal lecture={showView} onClose={() => setShowView(null)} />
      )}
    </div>
  );
};

export default AdminLectures;