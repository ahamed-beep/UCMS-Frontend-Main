import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, FileText, Hash, Calendar, MessageSquare } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import CreateAssignmentModal from "./CreateAssignmentModal";
import EditAssignmentModal from "./EditAssignmentModal";
import SubmissionsModal from "./SubmissionsModal";

export default function AdminLectureAssignments({ lectureId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [viewSubmissions, setViewSubmissions] = useState(null);

  useEffect(() => {
    if (!lectureId) return;
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/lectures/${lectureId}/assignments`);
        setAssignments(res.data?.data ?? res.data ?? []);
      } catch {
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [lectureId]);

  const handleDelete = async (assignment) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/lectures/${lectureId}/assignments/${assignment.id}`);
      setAssignments((prev) => prev.filter((a) => a.id !== assignment.id));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpdated = (updated) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === updated.id ? { ...a, ...updated } : a))
    );
  };

  const columns = [
    {
      key: "order",
      label: "#",
      width: "60px",
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-xs text-[#64748b] truncate">
          <Hash className="w-3 h-3" />{row.order ?? 0}
        </span>
      ),
    },
    {
      key: "title",
      label: "Title",
      width: "200px",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <FileText className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <span className="text-sm font-medium text-[#0f172a] truncate">{row.title}</span>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      width: "200px",
      render: (row) => (
        <span className="text-xs text-[#64748b] truncate block max-w-[180px]">
          {row.description || "—"}
        </span>
      ),
    },
    {
      key: "dueDate",
      label: "Due Date",
      width: "140px",
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-xs text-[#334155] break-all">
          <Calendar className="w-3 h-3 text-[#94a3b8]" />
          {row.dueDate
            ? new Date(row.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "—"}
        </span>
      ),
    },
    {
      key: "submissions",
      label: "Submissions",
      width: "120px",
      render: (row) => (
        <button
          onClick={() => setViewSubmissions(row)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors"
        >
          <MessageSquare className="w-3 h-3" /> View
        </button>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "90px",
      render: (row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditTarget(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[#0f172a] text-sm wrap-break-word">Lecture Assignments</h3>
          <p className="text-xs text-[#64748b] mt-0.5">
            {assignments.length} assignment{assignments.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Assignment
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={assignments.map((a, i) => ({ ...a, _key: a.id ?? i }))}
        loading={loading}
        emptyText="No assignments added to this lecture yet."
      />

      {showCreate && (
        <CreateAssignmentModal
          lectureId={lectureId}
          onClose={() => setShowCreate(false)}
          onCreated={(a) => setAssignments((prev) => [...prev, a])}
        />
      )}

      {editTarget && (
        <EditAssignmentModal
          lectureId={lectureId}
          assignment={editTarget}
          onClose={() => setEditTarget(null)}
          onUpdated={handleUpdated}
        />
      )}

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title ?? ""}
      />

      {viewSubmissions && (
        <SubmissionsModal
          assignment={viewSubmissions}
          lectureId={lectureId}
          onClose={() => setViewSubmissions(null)}
        />
      )}
    </div>
  );
}