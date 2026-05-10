import { useState, useEffect, useCallback } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import CourseFormModal from "./CourseFormModal";
import CourseViewModal from "./CourseViewModal";

const AdminCourses = ({ onSelectCourse = () => {} }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/courses");
      setCourses(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (course) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/courses/${course.id}`);
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "title", label: "Title", width: "25%",
      render: (r) => <span className="font-medium text-[#0f172a] text-sm truncate block">{r.title}</span>,
    },
    {
      key: "teacher", label: "Teacher", width: "15%",
      render: (r) => <span className="text-sm text-[#334155] truncate block">{r.teacher}</span>,
    },
    {
      key: "hours", label: "Hours", width: "10%",
      render: (r) => <span className="text-sm text-[#334155] truncate block">{r.hours}h</span>,
    },
    {
      key: "status", label: "Status", width: "15%",
      render: (r) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${r.status === "completed" ? "bg-green-100 text-green-700" : r.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
          {r.status}
        </span>
      ),
    },

    {
      key: "actions", label: "Actions", width: "20%",
      render: (r) => (
        
        <div className="flex items-center gap-2">
            <button
  onClick={() => onSelectCourse(r)}
  className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-100 hover:bg-blue-50 text-blue-500"
  title="Manage Modules"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
</button>
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
      <div className="flex flex-col sm:flex-row gap-1 md:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-anywhere">Courses</h1>
          <p className="text-sm text-[#64748b] mt-0.5 wrap-break-word">Manage all courses</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={courses.map((c) => ({ ...c, _key: c.id }))}
        loading={loading}
        emptyText="No courses found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title}
      />

      {showForm && (
        <CourseFormModal
          course={editTarget}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
          onSaved={fetchCourses}
        />
      )}

      {showView && (
        <CourseViewModal course={showView} onClose={() => setShowView(null)} />
      )}
    </div>
  );
};

export default AdminCourses;